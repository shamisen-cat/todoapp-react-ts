import { useCallback, useEffect, useRef, useState } from 'react';

import { isAbortError } from '@api/guards';
import { handleApiError } from '@api/utils';
import { fetchTodoFromApi } from '@todo/utils';

import type { ResponseWithETag } from '@api/types';
import type { Todo } from '@todo/types';

type UseTodoResult = {
  loading: boolean;
  error: string | null;
  todoWithETag: ResponseWithETag<Todo> | null;
  fetchTodo: () => Promise<void>;
};

/**
 * To-doを管理するフック
 *
 * @param id 取得対象のID
 * @returns To-doの状態と操作
 * - loading:      処理状態
 * - error:        エラー
 * - todoWithETag: 取得結果のTo-doとETag
 * - fetchTodo:    To-doを取得する関数
 */
export const useTodo = (id: string): UseTodoResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [todoWithETag, setTodoWithETag] = useState<ResponseWithETag<Todo> | null>(null);

  // AbortControllerを保持する参照
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchTodo = useCallback(async (): Promise<void> => {
    if (!id) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const response = await fetchTodoFromApi(id, { signal: controller.signal });
      setTodoWithETag(response);

    } catch (err: unknown) {
      if (isAbortError(err)) {
        return;
      }

      setError(handleApiError(err, 'To-doの取得に失敗しました'));

    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTodo();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [fetchTodo]);

  return { loading, error, todoWithETag, fetchTodo };
};
