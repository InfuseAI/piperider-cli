import os.path

from rich.console import Console

from piperider_cli.configuration import Configuration
from piperider_cli.error import RecipeConfigException
from piperider_cli.recipes import select_recipe_file, RecipeConfiguration, execute_recipe_configuration
from piperider_cli.recipes.default_recipe_generator import generate_default_recipe, show_recipe_content

console = Console()


class RecipeExecutor:
    @staticmethod
    def exec(recipe_name: str, auto_generate_default_recipe: bool = True, select: tuple = None, modified: bool = False,
             base_branch: str = None, skip_datasource_connection: bool = False, debug=False) -> RecipeConfiguration:
        config = Configuration.instance()
        recipe_path = select_recipe_file(recipe_name)

        if recipe_name and (select or modified or base_branch):
            console.print(
                "[[bold yellow]Warning[/bold yellow]] "
                "The recipe will be ignored when '--select', '--modified', '--base-branch', "
                "or '--skip-datasource' is provided."
            )
        if not skip_datasource_connection and select:
            console.print(
                f"[[bold green]Select[/bold green]] Manually select the dbt nodes to run by '{','.join(select)}'")
        if recipe_path is None or select or modified or base_branch or skip_datasource_connection:
            if auto_generate_default_recipe:
                dbt_project_path = None
                if config.dataSources and config.dataSources[0].args.get('dbt'):
                    dbt_project_path = os.path.relpath(config.dataSources[0].args.get('dbt', {}).get('projectDir'))
                # generate a default recipe
                console.rule("Recipe executor: generate recipe")
                options = dict(base_branch=base_branch, skip_datasource_connection=skip_datasource_connection)
                if select:
                    options['select'] = select
                recipe = generate_default_recipe(overwrite_existing=False,
                                                 dbt_project_path=dbt_project_path,
                                                 options=options)
                if recipe is None:
                    raise RecipeConfigException(
                        message='Default recipe generation failed.',
                        hint='Please provide a recipe file or feedback an issue to us'
                    )
                show_recipe_content(recipe)
            else:
                raise FileNotFoundError(f"Cannot find the recipe '{recipe_name}'")
        else:
            recipe = RecipeConfiguration.load(recipe_path)

        options = dict(skip_datasource_connection=skip_datasource_connection, select=select)
        execute_recipe_configuration(recipe, options, debug=debug)

        return recipe
