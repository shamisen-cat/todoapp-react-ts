/**
 * 無効な表示タイプの識別子が指定された場合にエラーをスローする関数
 *
 * @param type 無効な表示タイプの識別子
 */
export function throwOnInvalidViewType(type: never): never {
  throw new Error(`Unexpected view type: ${JSON.stringify(type)}`);
}
