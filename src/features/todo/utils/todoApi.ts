import {
  requestPageResponseWithETag,
  requestResponseWithETag,
  sendRequest,
} from '@api/utils';
import { API_BASE_URL } from '@shared/constants';

import type {
  AxiosRequestOptions,
  PageResponse,
  RequestWithHeaders,
  ResponseWithETag,
} from '@api/types';
import type {
  CreateTodoRequest,
  DeleteTodoRequest,
  Todo,
  UpdateTodoRequest,
} from '@todo/types';

/**
 * 指定されたページ番号と表示件数のTo-doリストとページデータのレスポンスを取得する関数
 *
 * @param page    ページ番号
 * @param size    表示件数
 * @param options Axiosのオプション設定
 * @returns ETagを含むTo-doリストとページデータのレスポンスPromise
 */
export async function fetchPageTodosFromApi(
  page: number,
  size: number,
  options?: AxiosRequestOptions,
): Promise<PageResponse<Todo>> {
  const response = await requestPageResponseWithETag<Todo>(
    {
      method: 'get',
      url: `${API_BASE_URL}/todos?page=${page}&size=${size}`,
      signal: options?.signal,
    },
  );

  return response;
}

/**
 * 指定されたIDのTo-doを取得する関数
 *
 * @param id      取得対象のID
 * @param options Axiosのオプション設定
 * @returns To-doとETagのレスポンスPromise
 */
export async function fetchTodoFromApi(
  id: string,
  options?: AxiosRequestOptions,
): Promise<ResponseWithETag<Todo>> {
  const response = await requestResponseWithETag<Todo>(
    {
      method: 'get',
      url: `${API_BASE_URL}/todos/${id}`,
      signal: options?.signal,
    },
  );

  return response;
}

/**
 * To-doを作成する関数
 *
 * @param requestData To-do作成リクエストデータ
 * @returns To-doとETagのレスポンスPromise
 */
export async function createTodoViaApi(
  requestData: CreateTodoRequest,
): Promise<ResponseWithETag<Todo>> {
  const response = await requestResponseWithETag<Todo>(
    {
      method: 'post',
      url: `${API_BASE_URL}/todos`,
      data: requestData,
    },
  );

  return response;
}

/**
 * 指定されたIDのTo-doを更新する関数
 *
 * @param request ヘッダ情報を含むTo-do更新リクエスト
 * @returns To-doとETagのレスポンスPromise
 */
export async function updateTodoViaApi(
  request: RequestWithHeaders<UpdateTodoRequest>,
): Promise<ResponseWithETag<Todo>> {
  const data = request.data;
  const headers = request.headers;

  const response = await requestResponseWithETag<Todo>(
    {
      method: 'put',
      url: `${API_BASE_URL}/todos/${data.id}`,
      data,
      headers,
    },
  );

  return response;
}

/**
 * 指定されたIDのTo-doを削除する関数
 *
 * @param request ヘッダ情報を含むTo-do削除リクエスト
 */
export async function deleteTodoViaApi(
  request: RequestWithHeaders<DeleteTodoRequest>,
): Promise<void> {
  const data = request.data;
  const headers = request.headers;

  await sendRequest<void>(
    {
      method: 'delete',
      url: `${API_BASE_URL}/todos/${data.id}`,
      headers,
    },
  );
}
