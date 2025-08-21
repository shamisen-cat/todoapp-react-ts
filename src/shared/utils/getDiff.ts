/**
 * プロパティの差分を抽出する関数
 *
 * @template T 対象オブジェクトの型
 * @template O 比較オブジェクトの型
 * @param target 対象オブジェクト
 * @param origin 比較オブジェクト
 * @param keys   抽出対象プロパティの配列
 * @returns 抽出結果のプロパティ
 */
export function getDiff<T extends object, O extends object>(
  target: Partial<T>,
  origin: O,
  keys: (keyof T & keyof O)[],
): Partial<T> {
  const diff: Partial<T> = {};

  keys.forEach((key) => {
    if (
      target[key] !== undefined &&
      target[key] !== origin[key]
    ) {
      diff[key] = target[key];
    }
  });

  return diff;
}
