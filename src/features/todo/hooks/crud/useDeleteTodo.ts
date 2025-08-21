import { AxiosHeaders } from 'axios';
import { useState } from 'react';

import { handleApiError } from '@api/utils';
import { deleteTodoViaApi } from '@todo/utils';

import type { DeleteTodoRequest } from '@todo/types';

type UseDeleteTodoResult = {
  deleting: boolean;
  error: string | null;
  deleteTodo: (id: string, etag: string) => Promise<boolean>;
};

/**
 * To-do削除を管理するフック
 *
 * @returns 削除の状態と操作
 * - deleting:   処理状態
 * - error:      エラー
 * - deleteTodo: To-doを削除する関数
 */
export const useDeleteTodo = (): UseDeleteTodoResult => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTodo = async (id: string, etag: string): Promise<boolean> => {
    setDeleting(true);
    setError(null);

    try {
      const data: DeleteTodoRequest = { id };
      const headers = new AxiosHeaders({ 'If-Match': etag });
      await deleteTodoViaApi({ data, headers });

      return true;

    } catch (err: unknown) {
      setError(handleApiError(err, 'To-doの削除に失敗しました'));

      return false;

    } finally {
      setDeleting(false);
    }
  };

  return { deleting, error, deleteTodo };
};
