import { useCallback, useState } from "react";

import log from '@logger';
import { CONTENT_VIEW } from "@shared/constants";
import { isDynamicViewModeUnion } from "@view-mode/guards";

import type { ResponseWithETag } from "@api/types";
import type { ContentViewModeUnion, Todo, UpdateTodoRequest } from "@todo/types";

type UseClickCompletedProps = {
  viewMode: ContentViewModeUnion,
  todoWithETag: ResponseWithETag<Todo> | null;
  todoList: ResponseWithETag<Todo>[] | null;
  currentPage: number;
  updateTodo: (
    todoWithETag: ResponseWithETag<Todo>,
    request: UpdateTodoRequest,
  ) => Promise<string | null>;
  changeViewMode: (viewMode: ContentViewModeUnion) => void;
  changePage: (page: number) => void;
  reloadTodo: () => void;
};

/**
 * To-do完了状態ボタンを管理するフック
 *
 * @param viewMode       表示モード
 * @param todoWithETag   更新対象のTo-doとETag
 * @param todoList       To-doリスト
 * @param currentPage    ページ番号
 * @param updateTodo     To-doを更新する関数
 * @param reloadTodo     To-doを再読み込みする関数
 * @param changeViewMode 表示を変更する関数
 * @param changePage     指定されたページに移動する関数
 * @returns To-do完了状態ボタンの状態と操作
 * - switching:               処理状態
 * - error:                   エラー
 * - handleClickCompleted:    To-do完了状態ボタンのハンドラ
 * - handleClickCompletedNav: ナビゲーションの完了状態ボタンのハンドラ
 */
export const useClickCompleted = ({
  viewMode,
  todoWithETag,
  todoList,
  currentPage,
  updateTodo,
  reloadTodo,
  changeViewMode,
  changePage,
}: UseClickCompletedProps) => {
  const [switching, setSwitching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  type EditResult = { editedId: string | null, isCurrentView: boolean }

  const executeSwitchCompleted = useCallback(async (
    origin: ResponseWithETag<Todo>,
  ): Promise<EditResult> => {
    const request = {
      id: origin.data.id,
      title: origin.data.title,
      completed: !origin.data.completed,
    };
    const editedId = await updateTodo(origin, request);

    return {
      editedId,
      isCurrentView: isDynamicViewModeUnion(viewMode) && editedId === viewMode.target,
    };

  }, [updateTodo, viewMode]);

  async function handleClickCompleted(): Promise<void> {
    setSwitching(true);
    setError(null);

    try {
      if (!todoList || todoList.length === 0) {
        setError('現在のページにTo-doがありませんでした');

        return;
      }

      if (!todoWithETag) {
        setError('更新対象のTo-doが見つかりませんでした');

        return;
      }

      const { editedId, isCurrentView } = await executeSwitchCompleted(todoWithETag);

      if (!editedId) {
        setError('To-doの更新に失敗しました');

        return;
      }

      if (isCurrentView) {
        reloadTodo();
      }

      if (todoList.some(item => item.data.id === todoWithETag.data.id)) {
        changePage(currentPage);
      }

    } catch (err) {
      log.error('[CONTENT COMPLETED] Unexpected error occurred:', err);
      changeViewMode({ type: CONTENT_VIEW.ERROR });

    } finally {
      setSwitching(false);
    }
  }

  async function handleClickCompletedNav(
    origin: ResponseWithETag<Todo>,
  ): Promise<void> {
    setSwitching(true);
    setError(null);

    try {
      const { editedId, isCurrentView } = await executeSwitchCompleted(origin);

      if (!editedId) {
        setError('To-doの更新に失敗しました');

        return;
      }

      if (isCurrentView) {
        reloadTodo();
      }

      changePage(currentPage);

    } catch (err) {
      log.error('[NAV COMPLETED] Unexpected error occurred:', err);
      changeViewMode({ type: CONTENT_VIEW.ERROR });

    } finally {
      setSwitching(false);
    }
  };

  return { switching, error, handleClickCompleted, handleClickCompletedNav };
};
