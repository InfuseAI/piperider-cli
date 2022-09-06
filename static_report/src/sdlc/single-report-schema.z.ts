// Generated by ts-to-zod
import { z } from 'zod';

export const distributionSchema = z.object({
  type: z.string(),
  labels: z.array(z.string().nullable()),
  counts: z.array(z.number()),
  bin_edges: z.array(z.union([z.number(), z.string()])).optional(),
});

export const histogramSchema = z.object({
  labels: z.array(z.string().nullable()),
  counts: z.array(z.number()),
  bin_edges: z.array(z.union([z.number(), z.string()])),
});

export const topkSchema = z.object({
  values: z.array(z.union([z.string(), z.number()])),
  counts: z.array(z.number()),
});

export const assertionTestSchema = z.object({
  name: z.string(),
  status: z.union([z.literal('passed'), z.literal('failed')]),
  parameters: z.record(z.unknown()).optional(),
  tags: z.array(z.string()).optional(),
  expected: z.unknown().optional(),
  actual: z.unknown().optional(),
});

export const dbtAssertionResultSchema = z.object({
  tests: z.array(assertionTestSchema),
  columns: z.record(z.array(assertionTestSchema)),
});

export const dataSourceSchema = z.object({
  name: z.string(),
  type: z.string(),
});

export const columnSchemaSchema = z.object({
  total: z.number().optional(),
  nulls: z.number().optional(),
  non_nulls: z.number().optional(),
  distinct: z.number().optional(),
  duplicates: z.number().optional(),
  non_duplicates: z.number().optional(),
  distribution: distributionSchema.optional(),
  histogram: histogramSchema.optional(),
  topk: topkSchema.optional(),
  name: z.string(),
  description: z.string().optional(),
  type: z.union([
    z.literal('string'),
    z.literal('numeric'),
    z.literal('integer'),
    z.literal('datetime'),
    z.literal('boolean'),
    z.literal('other'),
  ]),
  schema_type: z.string(),
  valids: z.number().optional(),
  invalids: z.number().optional(),
  zeros: z.number().optional(),
  negatives: z.number().optional(),
  positives: z.number().optional(),
  zero_length: z.number().optional(),
  non_zero_length: z.number().optional(),
  trues: z.number().optional(),
  falses: z.number().optional(),
  profile_duration: z.string().optional(),
  elapsed_milli: z.number().optional(),
  sum: z.number().optional(),
  avg: z.number().optional(),
  stddev: z.number().optional(),
  min: z.union([z.string(), z.number()]).optional(),
  max: z.union([z.string(), z.number()]).optional(),
  p5: z.number().optional(),
  p25: z.number().optional(),
  p50: z.number().optional(),
  p75: z.number().optional(),
  p95: z.number().optional(),
});

export const pipeRiderAssertionResultSchema = z.object({
  tests: z.array(assertionTestSchema),
  columns: z.record(z.array(assertionTestSchema)),
});

export const tableSchemaSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  row_count: z.number().optional(),
  created: z.string().optional(),
  last_altered: z.string().optional(),
  bytes: z.number().optional(),
  freshness: z.number().optional(),
  col_count: z.number().optional(),
  columns: z.record(columnSchemaSchema),
  piperider_assertion_result: pipeRiderAssertionResultSchema.nullable(),
  dbt_assertion_result: dbtAssertionResultSchema.optional().nullable(),
});

export const singleReportSchemaSchema = z.object({
  tables: z.record(tableSchemaSchema),
  id: z.string(),
  project_id: z.string().optional(),
  user_id: z.string().optional(),
  version: z.string().optional(),
  metadata_version: z.string().optional(),
  created_at: z.string(),
  datasource: dataSourceSchema,
});
