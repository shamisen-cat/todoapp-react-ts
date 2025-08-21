import { useState } from "react";

import log from '@logger';
import { CONTENT_VIEW, ID_CONTENT_VIEW, MAX_TITLE_LENGTH } from "@shared/constants";

import type { ContentViewModeUnion, CreateTodoRequest } from "@todo/types";

type UseCreateSubmitProps = {
  newTitle: string;
  createTodo: (request: CreateTodoRequest) => Promise<string | null>;
  changeViewMode: (mode: ContentViewModeUnion) => void;
  changePage: (page: number) => void;
};

/**
 * To-do作成フォーム送信を管理するフック
 *
 * @param newTitle       作成中のタイトル
 * @param createTodo     To-doを作成する関数
 * @param changeViewMode 表示を変更する関数
 * @param changePage     指定されたページに移動する関数
 * @return To-do作成フォーム送信の状態と操作
 * - creating:           処理状態
 * - error:              エラー
 * - handleCreateSubmit: To-do作成フォーム送信のイベントハンドラ
 */
export const useCreateSubmit = ({
  newTitle,
  createTodo,
  changeViewMode,
  changePage,
}: UseCreateSubmitProps) => {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    setCreating(true);
    setError(null);

    try {
      event.preventDefault();

      const trimmed = newTitle?.trim();

      if (!trimmed) {
        setError("タイトルを入力してください");

        return;

      } else if (trimmed.length > MAX_TITLE_LENGTH) {
        setError(`タイトルは${MAX_TITLE_LENGTH}文字以内で入力してください`);

        return;
      }

      const request: CreateTodoRequest = { title: trimmed };
      const createdId = await createTodo(request);

      if (!createdId) {
        setError("To-doの作成に失敗しました");

        return;
      }

      changeViewMode({ type: ID_CONTENT_VIEW.TODO, target: createdId });
      changePage(0);

    } catch (err) {
      log.error('[CREATE SUBMIT] Unexpected error occurred:', err);
      changeViewMode({ type: CONTENT_VIEW.ERROR });

    } finally {
      setCreating(false);
    }
  };

  return { creating, error, handleCreateSubmit };
};
