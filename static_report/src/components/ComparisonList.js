import {
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Link } from 'wouter';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';

import { getReportAsserationStatusCounts } from '../utils';
import { joinBykey } from '../utils/comparisonReport';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function formatTime(time) {
  return format(new Date(time), 'yyyy/MM/dd HH:mm:ss');
}

export function ComparisonReportList({ data }) {
  const { base, input } = data;

  const tables = joinBykey(base.tables, input.tables);

  useDocumentTitle('Report List');

  const f = (value) => (value !== undefined ? value : '-');

  return (
    <Flex direction={'column'} minH={'100vh'} width={'100%'}>
      <Flex
        border={'1px solid'}
        borderColor={'gray.300'}
        bg={'white'}
        borderRadius={'md'}
        p={6}
        my={10}
        mx={'10%'}
        direction={'column'}
      >
        <Flex direction="column" gap={4}>
          <Heading>Comparison Summary</Heading>
          <TableContainer>
            <Table variant={'simple'}>
              <Thead>
                <Tr>
                  <Th width={'10%'} />
                  <Th width={'45%'}>Base</Th>
                  <Th width={'45%'}>Input</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>ID</Td>
                  <Td>{base.id}</Td>
                  <Td>{input.id}</Td>
                </Tr>
                <Tr>
                  <Td>Created At</Td>
                  <Td>{formatTime(base.created_at)}</Td>
                  <Td>{formatTime(input.created_at)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <Heading size={'lg'}>Tables</Heading>
          <TableContainer>
            <Table variant={'simple'}>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Passed</Th>
                  <Th>Failed</Th>
                  <Th>Rows</Th>
                  <Th>Columns</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.keys(tables).map((key) => {
                  const table = tables[key];
                  const baseOverview = getReportAsserationStatusCounts(
                    table.base?.assertion_results,
                  );
                  const inputOverview = getReportAsserationStatusCounts(
                    table.input?.assertion_results,
                  );

                  return (
                    <Link key={nanoid()} href={`/tables/${key}`}>
                      <Tr
                        cursor={'pointer'}
                        _hover={{ bgColor: 'blackAlpha.50' }}
                      >
                        <Td>{key}</Td>
                        <Td>
                          {f(baseOverview?.passed)}
                          {' | '}
                          {f(inputOverview?.passed)}
                        </Td>
                        <Td>
                          {f(baseOverview?.failed)}
                          {' | '}
                          {f(inputOverview?.failed)}
                        </Td>
                        <Td>
                          {f(table.base?.row_count)}
                          {' | '}
                          {f(table.input?.row_count)}
                        </Td>
                        <Td>
                          {f(table.base?.col_count)}
                          {' | '}
                          {f(table.input?.col_count)}
                        </Td>
                      </Tr>
                    </Link>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Flex>
  );
}
