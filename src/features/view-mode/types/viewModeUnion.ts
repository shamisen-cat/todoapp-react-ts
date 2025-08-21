/**
 * 静的表示モードのユニオン型
 *
 * @template S 静的表示タイプのユニオン型
 *
 * プロパティ:
 * - type: 静的表示タイプ
 */
export interface StaticViewModeUnion<S extends string> {
  type: S;
}

/**
 * 動的表示モードのユニオン型
 *
 * @template D 動的表示タイプのユニオン型
 *
 * プロパティ:
 * - type:   動的表示タイプ
 * - target: 表示対象
 */
export interface DynamicViewModeUnion<D extends string> {
  type: D;
  target: string;
}

/**
 * 表示モードのユニオン型
 *
 * @template S 静的表示タイプのユニオン型
 * @template D 動的表示タイプのユニオン型
 */
export type ViewModeUnion<S extends string, D extends string> =
  | StaticViewModeUnion<S>
  | DynamicViewModeUnion<D>;
