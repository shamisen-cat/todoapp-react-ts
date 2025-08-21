/**
 * 中断エラーの型ガード関数
 *
 * @param err 検証対象の例外オブジェクト
 */
export function isAbortError(
  err: unknown,
): err is { name: 'AbortError' | 'CanceledError' } {
  if (
    err === null ||
    typeof err !== 'object' ||
    Array.isArray(err) ||
    typeof err === 'function'
  ) {
    return false;
  }

  if (!('name' in err)) {
    return false;
  }

  const name = (err as { name?: unknown }).name;

  if (typeof name !== 'string') {
    return false;
  }

  return name === 'AbortError' || name === 'CanceledError';
}
