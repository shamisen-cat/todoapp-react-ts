import { useCallback, useState } from "react";

import log from '@logger';
import { CONTENT_VIEW } from "@shared/constants";
import { isDynamicViewModeUnion } from "@view-mode/guards";

import type { ResponseWithETag } from "@api/types";
import type { ContentViewModeUnion, Todo } from "@todo/types";

type UseClickDeleteProps = {
  viewMode: ContentViewModeUnion;
  todoWithETag: ResponseWithETag<Todo> | null;
  todoList: ResponseWithETag<Todo>[] | null;
  currentPage: number;
  deleteTodo: (id: string, etag: string) => Promise<boolean>;
  changeViewMode: (viewMode: ContentViewModeUnion) => void;
  changePage: (page: number) => void;
};

/**
 * To-do削除ボタンを管理するフック
 *
 * @param viewMode       表示モード
 * @param currentPage    ページ番号
 * @param todoList       To-doリスト
 * @param todoWithETag   削除対象のTo-doとETag
 * @param deleteTodo     To-doを削除する関数
 * @param changeViewMode 表示を変更する関数
 * @param changePage     指定された番号のページに移動する関数
 * @returns To-do削除ボタンの状態と操作
 * - deleting:             処理状態
 * - error:                エラー
 * - handleClickDelete:    To-do削除ボタンのハンドラ
 * - handleClickDeleteNav: ナビゲーションのTo-do削除ボタンのハンドラ
 */
export const useClickDelete = ({
  viewMode,
  todoWithETag,
  todoList,
  currentPage,
  deleteTodo,
  changeViewMode,
  changePage,
}: UseClickDeleteProps) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  type DeleteResult = { success: boolean; isCurrentView: boolean };

  const executeDelete = useCallback(async (
    id: string,
    etag: string,
  ): Promise<DeleteResult> => {
    const result = await deleteTodo(id, etag);

    if (!result) {
      return { success: false, isCurrentView: false };
    }

    return {
      success: true,
      isCurrentView: isDynamicViewModeUnion(viewMode) && id === viewMode.target,
    };

  }, [viewMode, deleteTodo]);

  async function handleClickDelete(): Promise<void> {
    setDeleting(true);
    setError(null);

    try {
      if (!todoList || todoList.length === 0) {
        setError('現在のページにTo-doがありませんでした');

        return;
      }

      if (!todoWithETag) {
        setError('削除対象のTo-doが見つかりませんでした');

        return;
      }

      const { data: todo, etag } = todoWithETag;
      const { success, isCurrentView } = await executeDelete(todo.id, etag);

      if (!success) {
        setError('To-doの削除に失敗しました');

        return;
      };

      if (isCurrentView) {
        changeViewMode({ type: CONTENT_VIEW.NONE });
      }

      if (todoList.some(item => item.data.id === todo.id)) {
        changePage(currentPage);
      }

    } catch (err) {
      log.error('[CONTENT DELETE] Unexpected error occurred:', err);
      changeViewMode({ type: CONTENT_VIEW.ERROR });

    } finally {
      setDeleting(false);
    }
  };

  async function handleClickDeleteNav(id: string, etag: string): Promise<void> {
    setDeleting(true);
    setError(null);

    try {
      const { success, isCurrentView } = await executeDelete(id, etag);

      if (!success) {
        setError('To-doの削除に失敗しました');

        return;
      };

      if (isCurrentView) {
        changeViewMode({ type: CONTENT_VIEW.NONE });
      }

      changePage(currentPage);

    } catch (err) {
      log.error('[NAVIGATION DELETE] Unexpected error occurred:', err);
      changeViewMode({ type: CONTENT_VIEW.ERROR });

    } finally {
      setDeleting(false);
    }
  };

  return { deleting, error, handleClickDelete, handleClickDeleteNav };
};
