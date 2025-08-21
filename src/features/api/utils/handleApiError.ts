import axios from 'axios';

import { isApiErrorResponse } from '@api/guards';
import log from '@logger';

/**
 * APIで発生する例外をハンドリングし、UIのメッセージを返す関数
 *
 * @param err             例外オブジェクト
 * @param fallbackMessage エラー内容が特定できない場合のエラーメッセージ
 * @returns エラーメッセージ
 */
export function handleApiError(err: unknown, fallbackMessage: string): string {
  if (!axios.isAxiosError(err)) {
    log.error('[API Error] Unexpected error occurred:', err);

    return fallbackMessage;
  }

  if (!err.response) {
    log.error('[API Error] No response received from server:', err);

    return 'サーバーに接続できませんでした';
  }

  const data = err.response.data;

  if (!isApiErrorResponse(data)) {
    log.error('[API Error] Unexpected API response format:', data);

    return fallbackMessage;
  }

  switch (data.errorCode) {
    case 'TODO-400-ARG':
    case 'SYS-400-VALIDATION':
      log.warn(`[${data.errorCode}] ${data.title}: ${data.detail}`);

      return '入力内容に誤りがあります';

    case 'TODO-404':
      log.warn(`[${data.errorCode}] ${data.title}: ${data.detail}`);

      return '指定されたTo-doが見つかりませんでした';

    case 'SYS-412-ETAG':
      log.warn(`[${data.errorCode}] ${data.title}: ${data.detail}`);

      return 'データが更新されています';

    case 'SYS-500-ETAG':
    case 'SYS-500':
      log.error(`[${data.errorCode}] ${data.title}: ${data.detail}`);

      return 'サーバーで予期せぬエラーが発生しました';

    default:
      log.error(`[API Error] Unhandled 'errorCode' received: ${data.errorCode}`, data);

      return fallbackMessage;
  }
}
