import {
  dynamicViewModeUnionSchema,
  staticViewModeUnionSchema,
} from '@view-mode/schemas';

import type { DynamicViewModeUnion, StaticViewModeUnion } from '@view-mode/types';

/**
 * 静的表示モードの型ガード関数
 *
 * @template S 静的表示タイプのユニオン型
 * @param obj 検証対象のオブジェクト
 */
export function isStaticViewModeUnion<S extends string>(
  obj: unknown,
): obj is StaticViewModeUnion<S> {
  return staticViewModeUnionSchema.safeParse(obj).success;
}

/**
 * 動的表示モードの型ガード関数
 *
 * @template D 動的表示タイプのユニオン型
 * @param obj 検証対象のオブジェクト
 */
export function isDynamicViewModeUnion<D extends string>(
  obj: unknown,
): obj is DynamicViewModeUnion<D> {
  return dynamicViewModeUnionSchema.safeParse(obj).success;
}

/**
 * 表示モードの型ガード関数
 *
 * @template S 静的表示モードのユニオン型
 * @template D 動的表示モードのユニオン型
 * @param obj 検証対象のオブジェクト
 */
export function isViewModeUnion<S extends string, D extends string>(
  obj: unknown,
): obj is StaticViewModeUnion<S> | DynamicViewModeUnion<D> {
  return isStaticViewModeUnion<S>(obj) || isDynamicViewModeUnion<D>(obj);
}
