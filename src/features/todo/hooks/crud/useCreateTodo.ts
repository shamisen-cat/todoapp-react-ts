import { useState } from 'react';

import { handleApiError } from '@api/utils';
import { createTodoViaApi } from '@todo/utils';

import type { CreateTodoRequest } from '@todo/types';

type UseCreateTodoResult = {
  creating: boolean;
  error: string | null;
  newTitle: string;
  setNewTitle: (title: string) => void;
  createTodo: (request: CreateTodoRequest) => Promise<string | null>;
};

/**
 * To-do作成を管理するフック
 *
 * @returns To-do作成の状態と操作
 * - creating:    処理状態
 * - error:       エラー
 * - newTitle:    作成中のタイトル
 * - setNewTitle: 作成中のタイトルを設定する関数
 * - createTodo:  To-doを作成する関数
 */
export const useCreateTodo = (): UseCreateTodoResult => {
  const [creating, setCreating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const createTodo = async (request: CreateTodoRequest): Promise<string | null> => {
    setCreating(true);
    setError(null);

    try {
      if (!request.title.trim()) {
        setError('タイトルを入力してください');

        return null;
      }

      const response = await createTodoViaApi(request);
      setNewTitle('');

      return response.data.id;

    } catch (err: unknown) {
      setError(handleApiError(err, 'To-doの作成に失敗しました'));

      return null;

    } finally {
      setCreating(false);
    }
  };

  return { creating, error, newTitle, setNewTitle, createTodo };
};
