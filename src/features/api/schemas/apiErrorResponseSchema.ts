import { z } from 'zod';

/**
 * APIから返却されるエラーレスポンスのスキーマ
 *
 * プロパティ:
 * - status:    HTTPステータスコード
 * - errorCode: エラーコード
 * - title:     エラーメッセージ
 * - detail:    エラーの詳細
 */
export const ApiErrorResponseSchema = z.object({
  status: z.number(),
  errorCode: z.string(),
  title: z.string(),
  detail: z.string(),
});
