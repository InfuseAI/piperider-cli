import { ChakraProps, Flex, Text, Tooltip } from '@chakra-ui/react';
import { schemaMetaDescriptions } from '../../../sdlc/schema-meta';
import { ColumnSchema } from '../../../sdlc/single-report-schema';
import { NO_VALUE } from '../ColumnCard/ColumnTypeDetail/constants';

interface Props {
  name: string;
  firstSlot?: string | number;
  secondSlot?: string | number | null;
  firstSlotWidth?: string;
  secondSlotWidth?: string;
  metakey?: keyof ColumnSchema;
  reverse?: boolean;
  tooltipValues?: { firstSlot?: number | string; secondSlot?: number | string };
}
export function MetricsInfo({
  name,
  firstSlot,
  secondSlot,
  firstSlotWidth = '100px',
  secondSlotWidth = '100px',
  metakey,
  reverse,
  tooltipValues,
  ...props
}: Props & ChakraProps) {
  const metaDescription = schemaMetaDescriptions[metakey || ''];
  const { width } = props;
  const isTargetNull = secondSlot === null;
  // console.log(tooltipValues);

  return (
    <Flex>
      <Tooltip
        label={metaDescription}
        isDisabled={!Boolean(metaDescription)}
        placement={'top'}
      >
        <Text width={width || '5em'} fontWeight={700}>
          {name}
        </Text>
      </Tooltip>
      <Flex
        gap={{ lg: 5, md: 1 }}
        flexDirection={reverse ? 'row-reverse' : 'row'}
      >
        <Tooltip
          label={tooltipValues?.firstSlot}
          isDisabled={!Boolean(tooltipValues?.firstSlot)}
          placement={'top'}
        >
          <Text textAlign="right" width={firstSlotWidth} noOfLines={1}>
            {firstSlot}
          </Text>
        </Tooltip>

        {/* Show when target is specified as `null` */}
        {/* Hide when target is `undefined` */}
        {(secondSlot || isTargetNull) && (
          <Tooltip
            label={tooltipValues?.secondSlot}
            isDisabled={!Boolean(tooltipValues?.secondSlot)}
            placement={'top'}
          >
            <Text textAlign="right" width={secondSlotWidth}>
              {secondSlot || NO_VALUE}
            </Text>
          </Tooltip>
        )}
      </Flex>
    </Flex>
  );
}