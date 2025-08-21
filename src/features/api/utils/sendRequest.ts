import axios from 'axios';

import type { PageResponse, ResponseWithETag } from '@api/types';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * AxiosのHTTPリクエスト関数
 *
 * @template T レスポンスデータの型
 * @param config Axiosのオプション設定
 * @returns AxiosのレスポンスデータPromise
 */
export const sendRequest = async <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const axiosResponse = await axios.request<T>(config);

  return axiosResponse;
};

/**
 * ETagを含むレスポンスデータを取得するHTTPリクエスト関数
 *
 * @template T レスポンスデータの型
 * @param config Axiosのオプション設定
 * @returns ETagを含むレスポンスデータPromise
 */
export const requestResponseWithETag = async <T>(
  config: AxiosRequestConfig,
): Promise<ResponseWithETag<T>> => {
  const response = await sendRequest<T>(config);

  return {
    data: response.data,
    etag: response.headers['etag'],
  };
};

/**
 * ETagを含むデータのページレスポンスを取得するHTTPリクエスト関数
 *
 * @template T レスポンスデータの型
 * @param config Axiosのオプション設定
 * @returns ETagを含むデータのページレスポンスPromise
 */
export const requestPageResponseWithETag = async <T>(
  config: AxiosRequestConfig,
): Promise<PageResponse<T>> => {
  const response = await sendRequest<PageResponse<T>>(config);

  return {
    content: response.data.content,
    totalPages: response.data.totalPages,
  };
};
