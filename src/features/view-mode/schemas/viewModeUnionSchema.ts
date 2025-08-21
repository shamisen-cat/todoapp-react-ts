import { z } from 'zod';

/**
 * 静的表示モードのユニオン型のスキーマ
 *
 * プロパティ:
 * - type: 静的表示タイプのユニオン型
 */
export const staticViewModeUnionSchema = z
  .object({
    type: z.string(),
  })
  .refine(
    (data) => !('target' in data),
    { message: `StaticViewMode validation failed: Property 'target' should not exist` },
  );

/**
 * 動的表示モードのユニオン型のスキーマ
 *
 * プロパティ:
 * - type:   動的表示タイプのユニオン型
 * - target: 表示対象
 */
export const dynamicViewModeUnionSchema = z
  .object({
    type: z.string(),
    target: z.string(),
  });

/**
 * 表示モードのユニオン型のスキーマ
 */
export const viewModeUnionSchema = z.union([
  staticViewModeUnionSchema,
  dynamicViewModeUnionSchema,
]);
