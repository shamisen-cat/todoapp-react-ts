import type { AxiosRequestHeaders } from 'axios';

/**
 * Axiosのリクエストヘッダを含むリクエストの型
 *
 * @template T リクエストデータの型
 *
 * プロパティ:
 * - data:    リクエストデータ
 * - headers: Axiosのリクエストヘッダ
 */
export interface RequestWithHeaders<T> {
  readonly data: T;
  readonly headers: AxiosRequestHeaders;
}

/**
 * Axiosのオプション設定の型
 *
 * プロパティ:
 * - signal: AbortControllerによる中断制御シグナル
 */
export interface AxiosRequestOptions {
  readonly signal?: AbortSignal;
}
