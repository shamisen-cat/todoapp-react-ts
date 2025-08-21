import { ApiErrorResponseSchema } from '@api/schemas';

import type { ApiErrorResponse } from '@api/types';

/**
 * ApiErrorResponseの型ガード関数
 *
 * @param data 検証対象のオブジェクト
 */
export function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
  return ApiErrorResponseSchema.safeParse(data).success;
}
