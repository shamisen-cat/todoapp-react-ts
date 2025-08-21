import { useState } from "react";

import log from '@logger';
import { CONTENT_VIEW, ID_CONTENT_VIEW, MAX_TITLE_LENGTH } from "@shared/constants";

import type { ResponseWithETag } from "@api/types";
import type { ContentViewModeUnion, Todo, UpdateTodoRequest } from "@todo/types";

type UseEditSubmitProps = {
  todoWithETag: ResponseWithETag<Todo> | null;
  editingTitle: string | undefined;
  editingCompleted: boolean | undefined;
  updateTodo: (
    todoWithETag: ResponseWithETag<Todo>,
    request: UpdateTodoRequest,
  ) => Promise<string | null>;
  reloadTodo: () => void;
  changeViewMode: (mode: ContentViewModeUnion) => void;
  changePage: (page: number) => void;
};

/**
 * To-do編集フォーム送信を管理するフック
 *
 * @param todoWithETag     編集対象のTo-doとETag
 * @param editingTitle     編集中のタイトル
 * @param editingCompleted 編集中の完了状態（true: 完了、false: 未完了、undefined: 変更なし）
 * @param updateTodo       To-doを更新する関数
 * @param reloadTodo       To-doを再読み込みする関数
 * @param changeViewMode   表示を変更する関数
 * @param changePage       指定されたページに移動する関数
 * @returns To-do編集フォーム送信の状態と操作
 * - editing:          処理状態
 * - error:            エラー
 * - handleEditSubmit: To-do編集フォーム送信のイベントハンドラ
 */
export const useEditSubmit = ({
  todoWithETag,
  editingTitle,
  editingCompleted,
  updateTodo,
  reloadTodo,
  changeViewMode,
  changePage,
}: UseEditSubmitProps) => {
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEditSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    setEditing(true);
    setError(null);

    try {
      event.preventDefault();

      if (!todoWithETag) {
        setError("更新対象のTo-doが見つかりませんでした。");

        return;
      }

      const todo = todoWithETag.data;
      const trimmed = editingTitle?.trim();

      if (!trimmed && editingCompleted === todo.completed) {
        setError("タイトルを入力してください");

        return;

      } else if (trimmed && trimmed.length > MAX_TITLE_LENGTH) {
        setError(`タイトルは${MAX_TITLE_LENGTH}文字以内で入力してください`);

        return;
      }

      const request: UpdateTodoRequest = {
        id: todo.id,
        title: trimmed || todo.title,
        completed: editingCompleted,
      };
      const editedId = await updateTodo(todoWithETag, request);

      if (!editedId) {
        setError("To-doの更新に失敗しました");

        return;
      }

      changeViewMode({ type: ID_CONTENT_VIEW.TODO, target: editedId });
      reloadTodo();
      changePage(0);

    } catch (err) {
      log.error('[EDIT SUBMIT] Unexpected error occurred:', err);
      changeViewMode({ type: CONTENT_VIEW.ERROR });

    } finally {
      setEditing(false);
    }
  };

  return { editing, error, handleEditSubmit };
};
