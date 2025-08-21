import { z } from 'zod';

import type { ApiErrorResponseSchema } from '@api/schemas';

/**
 * APIから返却されるエラーレスポンスの型
 */
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
