import { Text, Heading, Flex, Icon, Grid, GridItem } from '@chakra-ui/react';
import { formatDuration, intervalToDuration, subSeconds } from 'date-fns';
import { FiGrid } from 'react-icons/fi';

import {
  Comparable,
  SaferTableSchema,
  zReport,
  ZTableSchema,
} from '../../../types';
import {
  formatBytes,
  formatNumber,
  formatReportTime,
} from '../../../utils/formatters';
import { MetricsInfo } from '../Columns/ColumnMetrics/MetricsInfo';

interface Props extends Comparable {
  baseTable?: SaferTableSchema;
  targetTable?: SaferTableSchema;
}

export function TableOverview({ baseTable, targetTable, singleOnly }: Props) {
  zReport(ZTableSchema.safeParse(baseTable));
  zReport(ZTableSchema.safeParse(targetTable));

  const fallback = baseTable || targetTable;

  return (
    <Grid mb={8} gap={6} templateColumns={singleOnly ? '1fr 2fr' : '1fr 1fr'}>
      <GridItem gap={1} colSpan={2}>
        <Text color="gray.500">Table</Text>
        <Heading fontSize={24}>
          <Flex alignItems="center">
            <Icon as={FiGrid} mr={2} color={'piperider.500'} />
            {fallback?.name}
          </Flex>
        </Heading>
      </GridItem>

      <GridItem gap={2} colSpan={1} my={singleOnly ? 0 : 3}>
        {!singleOnly && (
          <MetricsInfo
            name=""
            firstSlot={'Base'}
            firstSlotWidth={'16em'}
            secondSlot={'Target'}
            secondSlotWidth={'16em'}
            fontWeight={'bold'}
            mb={3}
          />
        )}
        <MetricsInfo
          name="Row Count"
          metakey="row_count"
          firstSlot={formatNumber(baseTable?.row_count)}
          firstSlotWidth={'16em'}
          secondSlot={formatNumber(targetTable?.row_count)}
          secondSlotWidth={'16em'}
        />
        <MetricsInfo
          name="Column Count"
          metakey="col_count"
          firstSlot={formatNumber(baseTable?.col_count)}
          firstSlotWidth={'16em'}
          secondSlot={formatNumber(targetTable?.col_count)}
          secondSlotWidth={'16em'}
        />

        {/* CDW metadata */}

        {fallback?.bytes && (
          <MetricsInfo
            name="Volume Size"
            metakey="bytes"
            firstSlot={formatBytes(baseTable?.bytes)}
            firstSlotWidth={'16em'}
            secondSlot={formatBytes(targetTable?.bytes)}
            secondSlotWidth={'16em'}
            tooltipValues={{
              firstSlot: `${formatNumber(baseTable?.bytes)} bytes`,
              secondSlot: `${formatNumber(targetTable?.bytes)} bytes`,
            }}
          />
        )}

        {fallback?.created && (
          <MetricsInfo
            name="Created At"
            metakey="created"
            firstSlot={formatReportTime(baseTable?.created)}
            firstSlotWidth={'16em'}
            secondSlot={formatReportTime(targetTable?.created)}
            secondSlotWidth={'16em'}
          />
        )}
        {fallback?.last_altered && (
          <MetricsInfo
            name="Last Altered"
            metakey="last_altered"
            firstSlot={formatReportTime(baseTable?.last_altered)}
            firstSlotWidth={'16em'}
            secondSlot={formatReportTime(targetTable?.last_altered)}
            secondSlotWidth={'16em'}
          />
        )}
        {fallback?.freshness && (
          <MetricsInfo
            name="Freshness"
            metakey="freshness"
            firstSlot={formatDuration(
              intervalToDuration({
                start: subSeconds(new Date(), baseTable?.freshness || 0),
                end: new Date(),
              }),
            )}
            firstSlotWidth={'16em'}
            secondSlot={formatDuration(
              intervalToDuration({
                start: subSeconds(new Date(), targetTable?.freshness || 0),
                end: new Date(),
              }),
            )}
            secondSlotWidth={'16em'}
          />
        )}
      </GridItem>
      <GridItem colSpan={1}>
        <Text
          fontSize="sm"
          border={'1px solid lightgray'}
          p={2}
          h={'12em'}
          overflow={'auto'}
        >
          {fallback?.description}
        </Text>
      </GridItem>
    </Grid>
  );
}
