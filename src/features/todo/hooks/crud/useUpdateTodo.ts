import { AxiosHeaders } from 'axios';
import { useState } from 'react';

import { handleApiError } from '@api/utils';
import { getDiff } from '@shared/utils';
import { updateTodoViaApi } from '@todo/utils';

import type { ResponseWithETag } from '@api/types';
import type { Todo, UpdateTodoRequest } from '@todo/types';

type UseUpdateTodoResult = {
  editing: boolean;
  error: string | null;
  editingTitle: string | undefined;
  editingCompleted: boolean | undefined;
  setEditingTitle: (title: string) => void;
  setEditingCompleted: (completed: boolean) => void;
  updateTodo: (
    todoWithETag: ResponseWithETag<Todo>,
    request: UpdateTodoRequest,
  ) => Promise<string | null>;
};

/**
 * To-do更新を管理するフック
 *
 * @returns To-do更新の状態と操作
 * - editing:             処理状態
 * - error:               エラー
 * - editingTitle:        編集中のタイトル
 * - editingCompleted:    編集中の完了状態（true: 完了、false: 未完了、undefined: 変更なし）
 * - setEditingTitle:     編集中のタイトルを設定する関数
 * - setEditingCompleted: 編集中の完了状態を設定する関数
 * - updateTodo:          To-doを更新する関数
 */
export const useUpdateTodo = (): UseUpdateTodoResult => {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string | undefined>();
  const [editingCompleted, setEditingCompleted] = useState<boolean | undefined>();

  const updateTodo = async (
    todoWithETag: ResponseWithETag<Todo>,
    requestData: UpdateTodoRequest,
  ): Promise<string | null> => {
    setEditing(true);
    setError(null);

    try {
      const { data, etag } = todoWithETag;
      const diff = getDiff(requestData, data, ['title', 'completed']);

      if (Object.keys(diff).length === 0) {
        setError('変更された項目がありませんでした');

        return null;
      }

      const headers = new AxiosHeaders({ 'If-Match': etag });
      const response = await updateTodoViaApi({ data: requestData, headers });

      setEditingTitle(undefined);
      setEditingCompleted(undefined);

      return response.data.id;

    } catch (err: unknown) {
      setError(handleApiError(err, 'To-doの更新に失敗しました'));

      return null;

    } finally {
      setEditing(false);
    }
  };

  return {
    editing,
    error,
    editingTitle,
    editingCompleted,
    setEditingTitle,
    setEditingCompleted,
    updateTodo,
  };
};
