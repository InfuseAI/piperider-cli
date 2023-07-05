import collections
import math
from dataclasses import dataclass
from datetime import timedelta
from enum import Enum
from io import StringIO
from typing import Callable, Dict, List, Optional

from dbt.contracts.graph.manifest import Manifest

from piperider_cli.dbt.list_task import (
    list_changes_in_unique_id,
    list_modified_with_downstream, list_resources_unique_id_from_manifest,
    load_manifest,
)
from piperider_cli.dbt.markdown import MarkdownTable
from piperider_cli.reports import ChangedColumnsTableEntryElement, JoinedTables
from piperider_cli.reports import Styles


class ChangeType(Enum):
    ADDED = "added"
    REMOVED = "removed"
    MODIFIED = "modified"
    IMPLICIT = "implicit"
    IGNORED = "ignored"

    @property
    def icon_url(self) -> str:
        base_url = "https://raw.githubusercontent.com/InfuseAI/piperider/main/images/icons"

        if self.value == 'added':
            return base_url + "/icon-diff-delta-plus%402x.png"
        if self.value == 'removed':
            return base_url + "/icon-diff-delta-minus%402x.png"
        if self.value == 'modified':
            return base_url + "/icon-diff-delta-explicit%402x.png"
        if self.value == 'implicit':
            return base_url + "/icon-diff-delta-implicit%402x.png"
        return ""

    @property
    def icon_image_tag(self) -> str:
        url = self.icon_url
        if url == "":
            return ""
        return f"""<img src="{url}" width="16px">"""

    def display_changes(self, b, t, format_text: str, *, converter: Callable = None):
        if self != self.MODIFIED:
            raise ValueError("Only modified type has display for changes")
        color = "green" if t > b else "red"
        sign = "↑" if t > b else "↓"
        diff = t - b
        if converter:
            return format_text % dict(value=converter(t), color=color, sign=sign, diff=diff)
        return format_text % dict(value=t, color=color, sign=sign, diff=diff)


class ResourceType(Enum):
    MODEL = "model"
    METRIC = "metric"

    @classmethod
    def of(cls, resource_type: str):
        if resource_type == cls.MODEL.value:
            return cls.MODEL
        if resource_type == cls.METRIC.value:
            return cls.METRIC
        raise NotImplementedError(f"no such type: {resource_type}")


@dataclass
class ChangeUnit:
    change_type: ChangeType
    resource_type: ResourceType
    unique_id: str

    @property
    def table_name(self) -> str:
        if self.resource_type == ResourceType.MODEL:
            return self.unique_id.split(".")[-1]
        raise ValueError("It is non sense to get table_name for a non-model resource")


class SummaryAggregate:
    display_name: str
    resource_type: str
    total: int

    explicit_changeset: List[ChangeUnit] = None

    # TODO discovery the downstream of added by "dbt list --select model_name+"
    # it mixed resources with "model" and "metric"
    modified_with_downstream: List[ChangeUnit] = None

    # value changes from profiling data
    diffs: List[str] = None

    def __init__(self, display_name: str):
        self.display_name = display_name
        if self.display_name == 'Models':
            self.resource_type = 'model'
        elif self.display_name == 'Metrics':
            self.resource_type = 'metric'
        else:
            raise ValueError(f'Unknown type for {display_name}')

    @property
    def explicit_changes(self) -> int:
        """
        the code changes
        """
        self._ensure_initialized()
        return len(self.explicit_changeset)

    @property
    def impacted(self) -> int:
        """
        any code changes and all downstream
        """
        self._ensure_initialized()

        # TODO discovery the downstream of added by "dbt list --select model_name+"

        code_changes: List[str] = [x.unique_id for x in self.explicit_changeset]
        modified: List[str] = [x.unique_id for x in self.modified_with_downstream if
                               x.resource_type.value == self.resource_type]
        return len(set(modified + code_changes))

    @property
    def implicit_changes(self) -> int:
        """
        all value changes excluding the code changes
        """
        self._ensure_initialized()
        code_changes: List[str] = [x.unique_id for x in self.explicit_changeset]
        return len(set(self.diffs) - set(code_changes))

    @property
    def implicit_changeset(self) -> List[ChangeUnit]:
        self._ensure_initialized()
        code_changes: List[str] = [x.unique_id for x in self.explicit_changeset]
        ids = set(self.diffs) - set(code_changes)

        def _t(x: ChangeUnit):
            x.change_type = ChangeType.IMPLICIT
            return x

        return [_t(x) for x in self.modified_with_downstream if x.unique_id in ids]

    def _ensure_initialized(self):
        if self.explicit_changeset is None:
            raise ValueError('explicit_changeset is not initialized')
        if self.modified_with_downstream is None:
            raise ValueError('modified_with_downstream is not initialized')


class MetricsChangeView:
    def __init__(self, name: str):
        self.name = name
        self.metric_group: str = None
        self.base_data: Optional[List] = None
        self.target_data: Optional[List] = None
        self.change_type = None

    def update_status(self):
        # added, removed, edited, no changes
        if self.base_data is None and self.target_data is not None:
            self.change_type = "added"
            return

        if self.base_data is not None and self.target_data is None:
            self.change_type = "removed"
            return

        if self.base_data == self.target_data:
            self.change_type = "no-changes"
        else:
            self.change_type = "edited"


class LookUpTable:

    def __init__(self, c: "SummaryChangeSet"):
        self.c: "SummaryChangeSet" = c

        self.path_mapping = self._build_path_mapping()
        self.base_execution, self.target_execution = self._build_dbt_time_mapping()
        self.base_tests, self.target_tests = self._build_tests_mapping()
        self._sorted_weights: Dict[str, int] = self._build_sorting_parameters()

    def _build_path_mapping(self) -> Dict[str, str]:
        m = dict()
        for x in self.c.target_resources + self.c.base_resources:
            unique_id, resource_path = x.get('unique_id'), x.get('original_file_path')
            if unique_id not in m:
                m[unique_id] = resource_path

        return m

    def path(self, unique_id: str):
        return self.path_mapping.get(unique_id)

    def tests(self, unique_id: str):
        return sum(self.base_tests.get(unique_id, dict(passed=0, failed=0)).values()), \
            sum(self.target_tests.get(unique_id, dict(passed=0, failed=0)).values())

    def failed_tests(self, unique_id: str):
        return self.base_tests.get(unique_id, dict(passed=0, failed=0)).get('failed'), \
            self.target_tests.get(unique_id, dict(passed=0, failed=0)).get('failed')

    def _build_dbt_time_mapping(self):
        base_execution = {x.get('unique_id'): x.get('execution_time') for x in
                          self.c.base.get('dbt', {}).get('run_results', {}).get('results', [])}
        target_execution = {x.get('unique_id'): x.get('execution_time') for x in
                            self.c.target.get('dbt', {}).get('run_results', {}).get('results', [])}

        return base_execution, target_execution

    def execution_time(self, unique_id: str):
        return self.base_execution.get(unique_id), self.target_execution.get(unique_id)

    @staticmethod
    def to_human_readable(seconds: float):
        if seconds is None:
            return "-"

        return str(timedelta(seconds=seconds))[:-4]

    def _build_tests_mapping(self):
        from collections import Counter
        # convert test results to (table_name, pass_or_not): count form
        b = Counter([(x.get('table'), x.get('status')) for x in self.c.base.get('tests', [])])
        t = Counter([(x.get('table'), x.get('status')) for x in self.c.target.get('tests', [])])

        def as_dict(c: Counter):
            m = dict()
            for (table, status), v in c.items():
                if table not in m:
                    m[table] = dict(passed=0, failed=0)

                if status == 'passed':
                    m[table]['passed'] += v
                else:
                    m[table]['failed'] += v
            return m

        return as_dict(b), as_dict(t)

    def _build_sorting_parameters(self):
        from piperider_cli import dbtutil
        from piperider_cli.dbt.sorting import topological_sort

        g1 = dbtutil.prepare_topological_graph(self.c.base.get('dbt', {}).get('manifest', {}))
        g2 = dbtutil.prepare_topological_graph(self.c.target.get('dbt', {}).get('manifest', {}))

        # TODO is it good enough?
        g = {**g1, **g2}

        sorted_parameters = topological_sort(g, len(list(g.keys())))
        weights = dict()
        for x in sorted_parameters:
            weights[x] = len(weights)
        return weights

    def sort(self, changeset: List[ChangeUnit]) -> List[ChangeUnit]:
        from functools import cmp_to_key
        def callback(a: ChangeUnit, b: ChangeUnit) -> int:
            av = self._sorted_weights[a.unique_id]
            bv = self._sorted_weights[b.unique_id]

            if av == bv:
                return 0

            if av < bv:
                return -1

            if av > bv:
                return 1

        return sorted(changeset, key=cmp_to_key(callback))


class SummaryChangeSet:
    def __init__(self, base: Dict, target: Dict):
        self.base: Dict = base
        self.target: Dict = target
        self.base_manifest: Manifest = self._m(base)
        self.target_manifest: Manifest = self._m(target)
        self.tables = JoinedTables(self.base, self.target)

        # resources in this format [{unique_id, name, resource_type}]
        self.base_resources = list_resources_unique_id_from_manifest(self.base_manifest)
        self.target_resources = list_resources_unique_id_from_manifest(self.target_manifest)

        self.mapper = LookUpTable(self)

        self.modified_models_and_metrics_with_downstream = \
            list_modified_with_downstream(self.base_manifest, self.target_manifest)

        self.models = SummaryAggregate('Models')
        self.metrics = SummaryAggregate('Metrics')

        # TODO the execute should be merged into each aggregate
        self.execute()

    def _m(self, run: Dict):
        manifest = run.get("dbt", {}).get("manifest", {})
        if manifest == {}:
            raise ValueError("Cannot find .dbt.manifest in run data")
        return load_manifest(manifest)

    def get_url(self):
        return ""

    def execute(self):
        self.models.explicit_changeset = self.find_explicit_changes('model')
        self.update_models_value_changes()

        self.metrics.explicit_changeset = self.find_explicit_changes('metric')
        self.update_metrics_value_changes()

        # configure the modified + downstream
        modified_with_downstream = [ChangeUnit(unique_id=x.get('unique_id'), change_type=ChangeType.IGNORED,
                                               resource_type=ResourceType.of(x.get('resource_type')))
                                    for x in self.modified_models_and_metrics_with_downstream]
        self.models.modified_with_downstream = modified_with_downstream
        self.metrics.modified_with_downstream = modified_with_downstream

        # update total values
        self.models.total = len([x for x in self.target_resources if x.get('resource_type') == 'model'])
        self.metrics.total = len([x for x in self.target_resources if x.get('resource_type') == 'metric'])

    def find_explicit_changes(self, resource_type_filter: str):
        base_resources = [x.get("unique_id") for x in self.base_resources if
                          x.get('resource_type') == resource_type_filter]
        target_resources = [x.get("unique_id") for x in self.target_resources if
                            x.get('resource_type') == resource_type_filter]

        resource_in_both = list(set(base_resources).intersection(target_resources))
        # exclude added and removed by intersection with common resources
        modified = [
            x.get("unique_id")
            for x in list_changes_in_unique_id(
                self.base_manifest, self.target_manifest, True
            )
        ]

        def as_unit(unique_id: str, change_type: ChangeType):
            return ChangeUnit(unique_id=unique_id, change_type=change_type,
                              resource_type=ResourceType.of(resource_type_filter))

        modified = [as_unit(x, ChangeType.MODIFIED) for x in list(set(modified).intersection(resource_in_both))]
        added = [as_unit(x, ChangeType.ADDED) for x in list(set(target_resources) - set(base_resources))]
        removed = [as_unit(x, ChangeType.REMOVED) for x in list(set(base_resources) - set(target_resources))]
        return added + removed + modified

    def update_models_value_changes(self):
        # list implicit changes and exclude added and removed tables
        diffs = []

        for table_name, ref_id, b, t in self.tables.table_data_iterator():
            r1, r2 = self.tables.row_counts(table_name)
            c1, c2 = self.tables.column_counts(table_name)
            both_profiled = not math.isnan(r1) and not math.isnan(r2)
            if both_profiled:
                if r1 == r2 and c1 == c2 and not self.has_changed(b, t):
                    pass
                else:
                    if ref_id:
                        diffs.append(ref_id)
                    else:
                        resolved_id = self.resolve_unique_id(table_name, "model")
                        assert resolved_id is not None
                        diffs.append(resolved_id)
            else:
                if self.has_changed(b, t):
                    if ref_id:
                        diffs.append(ref_id)
                    else:
                        resolved_id = self.resolve_unique_id(table_name, "model")
                        assert resolved_id is not None
                        diffs.append(resolved_id)

        self.models.diffs = list(set(diffs))

    def update_metrics_value_changes(self):
        # exclude added and removed
        metrics_b = {x.get("name"): x for x in self.base.get("metrics", {})}
        metrics_t = {x.get("name"): x for x in self.target.get("metrics", {})}

        diffs = []
        for x in set(list(metrics_b.keys()) + list(metrics_t.keys())):
            if x in metrics_b and x in metrics_t:
                if metrics_b.get(x) != metrics_t.get(x):
                    ref_id = metrics_t.get(x).get("ref_id")
                    if ref_id:
                        diffs.append(ref_id)
                    else:
                        # resolve the unique id for the legacy report
                        metric_name = metrics_t.get(x).get("headers")[-1]
                        ref_id = self.resolve_unique_id(metric_name, "metric")
                        assert ref_id is not None
                        diffs.append(ref_id)

        self.metrics.diffs = list(set(diffs))

    def has_changed(self, p1: Dict, p2: Dict):
        """
        p1 and p2 are table profiled data
        """

        from piperider_cli.reports import ColumnChangeView

        base_cols: Dict[str, Dict] = p1.get("columns")
        target_cols: Dict[str, Dict] = p2.get("columns")

        if base_cols is None or target_cols is None:
            return True

        for k in base_cols:
            if ColumnChangeView(base_cols.get(k)) != ColumnChangeView(
                    target_cols.get(k)
            ):
                return True

        return False

    def resolve_unique_id(self, resource_name: str, resource_type: str):
        for entry in self.base_resources + self.target_resources:
            if entry.get("resource_type") == resource_type and entry.get("name") == resource_name:
                return entry.get("unique_id")

    def generate_markdown(self):
        # ref: https://gist.github.com/popcornylu/7a9f68c1ea80f09ba9c780d2026ce71e
        output = StringIO()

        def out_func(message: str):
            print(message, file=output)

        out_func("")

        self.generate_summary_section(out_func)
        self.generate_models_section(out_func)

        # TODO generate metrics list
        self.generate_metrics_section(out_func)

        # TODO generate test overview
        self.generate_tests_section(out_func)

        # TODO write to json file
        print(output.getvalue())

    def generate_summary_section(self, out: Callable[[str], None]) -> None:
        out("# Comparison Summary")
        mt = MarkdownTable(headers=['Resource', 'Total', 'Explicit Changes', 'Impacted', 'Implicit Changes'])
        mt.add_row([self.models.display_name, self.models.total, self.models.explicit_changes, self.models.impacted,
                    self.models.implicit_changes])
        mt.add_row([self.metrics.display_name, self.metrics.total, self.metrics.explicit_changes, self.metrics.impacted,
                    self.metrics.implicit_changes])

        out(mt.build())

    def generate_models_section(self, out: Callable[[str], None]) -> None:
        out("# Models")
        m = self.models
        changeset = self.mapper.sort(m.explicit_changeset + m.implicit_changeset)

        column_header = """
        Columns <br> <img src="https://raw.githubusercontent.com/InfuseAI/piperider/main/images/icons/icon-diff-delta-plus%402x.png" width="10px"> <img src="https://raw.githubusercontent.com/InfuseAI/piperider/main/images/icons/icon-diff-delta-minus%402x.png" width="10px"> <img src="https://raw.githubusercontent.com/InfuseAI/piperider/main/images/icons/icon-diff-delta-explicit%402x.png" width="10px">
        """.strip()

        "Rows | Dbt Time | Failed Tests | All Tests"

        mt = MarkdownTable(headers=['', 'Model', column_header, 'Rows', 'Dbt Time', 'Failed Tests', 'All Tests'])

        def cols(c: ChangeUnit):
            counts = self.tables.column_counts(table_name=c.table_name)
            if c.change_type == ChangeType.ADDED:
                _, t = counts
                return t
            if c.change_type == ChangeType.REMOVED:
                b, _ = counts
                return f"~~{b}~~"
            if c.change_type == ChangeType.MODIFIED:
                b, t = counts
                """
                example:
                16 ($\color{green}{\text{ 1 }}$ / $\color{red}{\text{ 1 }}$ / $\color{orange}{\text{ 5 }}$)
                """

                changes = list(self.tables.columns_changed_iterator(None, c.table_name))

                def col_state(c: ChangedColumnsTableEntryElement):
                    if c.base_view is not None and c.target_view is not None:
                        return ChangeType.MODIFIED
                    if c.base_view is None:
                        return ChangeType.ADDED
                    if c.target_view is None:
                        return ChangeType.REMOVED
                    raise ValueError("Cannot be here")

                stat = [col_state(x) for x in changes]
                from collections import Counter
                counter = Counter(stat)
                param = dict(value=t,
                             added=counter.get(ChangeType.ADDED, 0),
                             removed=counter.get(ChangeType.REMOVED, 0),
                             modified=counter.get(ChangeType.MODIFIED, 0),
                             )

                output = r"%(value)s ($\color{green}{\text{ %(added)s }}$ /" \
                         r" $\color{red}{\text{ %(removed)s }}$ /" \
                         r" $\color{orange}{\text{ %(modified)s }}$)" % param
                return output

            return 'columns'

        def rows(c: ChangeUnit):
            rows = self.tables.row_counts(table_name=c.table_name)
            if c.change_type == ChangeType.ADDED:
                _, t = rows
                return t
            if c.change_type == ChangeType.REMOVED:
                b, _ = rows
                return f"~~{b}~~"
            if c.change_type == ChangeType.MODIFIED:
                b, t = rows
                """
                example:
                997 $\color{green}{\text{ (↑ 20) }}$
                97 $\color{red}{\text{ (↓ -2) }}$
                """
                text = r'%(value)s $\color{%(color)s}{\text{ (%(sign)s %(diff)s) }}$'
                return ChangeType.MODIFIED.display_changes(b, t, text)
            return 'rows'

        def dbt_time(c: ChangeUnit):
            b, t = self.mapper.execution_time(c.unique_id)
            if c.change_type == ChangeType.ADDED:
                return LookUpTable.to_human_readable(t)

            if c.change_type == ChangeType.REMOVED:
                return ""
            if c.change_type == ChangeType.MODIFIED:
                """
                example:
                0:00:00.16 $\color{green}{\text{ (↓ 0.05) }}$
                """
                text = r'%(value)s $\color{%(color)s}{\text{ (%(sign)s %(diff).2f) }}$'
                return ChangeType.MODIFIED.display_changes(b, t, text, converter=LookUpTable.to_human_readable)

            return 'dbt-time'

        def failed_tests(c: ChangeUnit):
            _, all_t = self.mapper.tests(c.unique_id)
            b, t = self.mapper.failed_tests(c.unique_id)
            if c.change_type == ChangeType.ADDED:
                if all_t == 0:
                    return "-"
                return t
            if c.change_type == ChangeType.REMOVED:
                return ""
            if c.change_type == ChangeType.MODIFIED:
                if all_t == 0:
                    return "-"
                if b == t:
                    return f"{t}"
                text = r'%(value)s ($\color{%(color)s}{\text{ (%(sign)s %(diff)s) }}$)'
                return ChangeType.MODIFIED.display_changes(b, t, text)
            return "failed tests"

        def all_tests(c: ChangeUnit):
            b, t = self.mapper.tests(c.unique_id)
            if c.change_type == ChangeType.ADDED:
                if t == 0:
                    return "-"
                return t
            if c.change_type == ChangeType.REMOVED:
                return ""
            if c.change_type == ChangeType.MODIFIED:
                if t == 0:
                    return "-"
                if b == t:
                    return f"{t}"
                text = r'%(value)s ($\color{%(color)s}{\text{ (%(sign)s %(diff)s) }}$)'
                return ChangeType.MODIFIED.display_changes(b, t, text)
            return "all tests"

        for c in changeset:
            mt.add_row(
                [c.change_type.icon_image_tag,
                 self.mapper.path(c.unique_id), cols(c), rows(c), dbt_time(c), failed_tests(c),
                 all_tests(c)])

        out(mt.build())

    def generate_metrics_section(self, out: Callable[[str], None]) -> None:
        out("# Metrics")
        base_metrics = self.base.get('metrics', [])
        target_metrics = self.target.get('metrics', [])
        if not target_metrics:
            return

        metrics_labels = {v.name: v.label for v in self.base_manifest.metrics.values()}
        metrics_labels.update({v.name: v.label for v in self.target_manifest.metrics.values()})

        joined_metrics: Dict[str, MetricsChangeView] = collections.OrderedDict()
        metric_names = sorted(
            list(
                set(
                    [x.get('name') for x in base_metrics] + [x.get('name') for x in target_metrics]
                )
            )
        )

        for name in metric_names:
            joined_metrics[name] = MetricsChangeView(name)

        for metric in base_metrics:
            name = metric.get("name")
            m: MetricsChangeView = joined_metrics[name]
            m.metric_group = metric.get("headers")[1]
            m.base_data = metric.get("data")

        for metric in target_metrics:
            name = metric.get("name")
            m: MetricsChangeView = joined_metrics[name]
            m.metric_group = metric.get("headers")[1]
            m.target_data = metric.get("data")

        # added, removed, edited, no changes
        for m in joined_metrics.values():
            m.update_status()

        def state_icon(unique_id: str):
            for change_unit in self.metrics.explicit_changeset:
                if change_unit.unique_id == unique_id:
                    return change_unit.change_type.icon_image_tag

            for change_unit in self.metrics.implicit_changeset:
                if change_unit.unique_id == unique_id:
                    return change_unit.change_type.icon_image_tag

            return ""

        metrics_summary = {}
        for m in joined_metrics.values():
            label = metrics_labels[m.metric_group]
            if label not in metrics_summary:
                metrics_summary[label] = {'total': 0, 'no-changes': 0, 'edited': 0, 'added': 0, 'removed': 0}

            metrics_summary[label][m.change_type] += 1
            metrics_summary[label]['total'] += 1
            metrics_summary[label]['state_icon'] = state_icon(m.metric_group)

        if not metrics_summary:
            out("")

        mt = MarkdownTable(headers=['', 'Metric', f"Queries <br> total ({Styles.latex_orange('change')})"])
        for label, v in metrics_summary.items():
            chagned = f"({Styles.latex_orange(str(v['edited']))})" if v['edited'] > 0 else ""
            mt.add_row([v['state_icon'], label, f"{v['total']} {chagned}"])

        out(mt.build())

    def generate_tests_section(self, out: Callable[[str], None]) -> None:
        out("# Test Results")

    def build_path_mapping(self) -> Dict[str, str]:
        m = dict()

        for x in self.target_resources + self.base_resources:
            unique_id, resource_path = x.get('unique_id'), x.get('original_file_path')
            if unique_id not in m:
                m[unique_id] = resource_path

        return m


class ChangeSet:
    def __init__(self, base: Dict, target: Dict):
        self.base: Dict = base
        self.target: Dict = target
        self.base_manifest: Manifest = self._m(base)
        self.target_manifest: Manifest = self._m(target)

        # resources in this format [{unique_id, name, resource_type}]
        self.base_resources = list_resources_unique_id_from_manifest(self.base_manifest)
        self.target_resources = list_resources_unique_id_from_manifest(
            self.target_manifest
        )

        self.explicit_changes = sorted(self._do_list_explicit_changes())

    def _m(self, run: Dict):
        manifest = run.get("dbt", {}).get("manifest", {})
        if manifest == {}:
            raise ValueError("Cannot find .dbt.manifest in run data")
        return load_manifest(manifest)

    def resolve_unique_id(self, resource_name: str, resource_type: str):
        for entry in self.base_resources + self.target_resources:
            if entry.get("resource_type") == resource_type and entry.get("name") == resource_name:
                return entry.get("unique_id")

    def _do_list_explicit_changes(self):
        base_resources = [x.get("unique_id") for x in self.base_resources]
        target_resources = [x.get("unique_id") for x in self.target_resources]

        resource_in_both = list(set(base_resources).intersection(target_resources))
        # exclude added and removed by intersection with common resources
        output = [
            x.get("unique_id")
            for x in list_changes_in_unique_id(
                self.base_manifest, self.target_manifest, True
            )
        ]
        output = list(set(output).intersection(resource_in_both))

        return output

    def list_explicit_changes(self):
        return self.explicit_changes

    def _metrics_implicit_changes(self):
        # exclude added and removed
        metrics_b = {x.get("name"): x for x in self.base.get("metrics", {})}
        metrics_t = {x.get("name"): x for x in self.target.get("metrics", {})}

        diffs = []
        for x in set(list(metrics_b.keys()) + list(metrics_t.keys())):
            if x in metrics_b and x in metrics_t:
                if metrics_b.get(x) != metrics_t.get(x):
                    ref_id = metrics_t.get(x).get("ref_id")
                    if ref_id:
                        diffs.append(ref_id)
                    else:
                        # resolve the unique id for the legacy report
                        metric_name = metrics_t.get(x).get("headers")[-1]
                        ref_id = self.resolve_unique_id(metric_name, "metric")
                        assert ref_id is not None
                        diffs.append(ref_id)

        implicit = list(set(diffs))
        return list(set(implicit) - set(self.explicit_changes))

    def _table_implicit_changes(self):
        # list implicit changes and exclude added and removed tables
        from piperider_cli.reports import JoinedTables

        diffs = []

        tables = JoinedTables(self.base, self.target)
        for table_name, ref_id, b, t in tables.table_data_iterator():
            r1, r2 = tables.row_counts(table_name)
            c1, c2 = tables.column_counts(table_name)
            both_profiled = not math.isnan(r1) and not math.isnan(r2)
            if both_profiled:
                if r1 == r2 and c1 == c2 and not self.has_changed(b, t):
                    pass
                else:
                    if ref_id:
                        diffs.append(ref_id)
                    else:
                        resolved_id = self.resolve_unique_id(table_name, "model")
                        assert resolved_id is not None
                        diffs.append(resolved_id)

        return diffs

    def list_implicit_changes(self):
        table_implicit = self._table_implicit_changes()
        metric_implicit = self._metrics_implicit_changes()
        filtered_explicit = sorted(
            list(set(table_implicit + metric_implicit) - set(self.explicit_changes))
        )
        return filtered_explicit

    def has_changed(self, p1: Dict, p2: Dict):
        """
        p1 and p2 are table profiled data
        """

        from piperider_cli.reports import ColumnChangeView

        base_cols: Dict[str, Dict] = p1.get("columns")
        target_cols: Dict[str, Dict] = p2.get("columns")

        for k in base_cols:
            if ColumnChangeView(base_cols.get(k)) != ColumnChangeView(
                    target_cols.get(k)
            ):
                return True

        return False