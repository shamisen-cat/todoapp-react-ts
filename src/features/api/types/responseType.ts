/**
 * ETagを含むレスポンスの型
 *
 * @template T レスポンスデータの型
 *
 * プロパティ:
 * - data: レスポンスデータ
 * - etag: ETag
 */
export interface ResponseWithETag<T> {
  readonly data: T;
  readonly etag: string;
}

/**
 * ページレスポンスの型
 *
 * @template T レスポンスデータの型
 *
 * プロパティ:
 * - content:    ETagを含むレスポンスデータの配列
 * - totalPages: 総ページ数
 */
export interface PageResponse<T> {
  readonly content: ResponseWithETag<T>[];
  readonly totalPages: number;
}
