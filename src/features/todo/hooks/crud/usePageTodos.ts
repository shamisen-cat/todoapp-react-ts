import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { handleApiError } from '@api/utils';
import { PAGE_SIZE } from '@shared/constants';
import { usePage } from '@shared/hooks';
import { fetchPageTodosFromApi } from '@todo/utils';

import type { PageResponse, ResponseWithETag } from '@api/types';
import type { Todo } from '@todo/types';

type UsePageTodosResult = {
  loading: boolean;
  error: string | null;
  todoList: ResponseWithETag<Todo>[];
  currentPage: number;
  totalPages: number;
  goPreviousPage: () => void;
  goNextPage: () => void;
  changePage: (page: number) => void;
};

/**
 * To-doリストとページデータを管理するフック
 *
 * @returns To-doリストとページデータの状態と操作
 * - loading:        処理状態
 * - error:          エラー
 * - todoList:       To-doリスト
 * - currentPage:    ページ番号
 * - totalPages:     総ページ数
 * - goPreviousPage: 前のページに移動する関数
 * - goNextPage:     次のページに移動する関数
 * - changePage:     指定されたページに更新する関数
 */
export const usePageTodos = (): UsePageTodosResult => {
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const fetcher = async (page: number): Promise<PageResponse<Todo>> => {
    return await fetchPageTodosFromApi(page, PAGE_SIZE);
  };

  const { isLoading, isValidating, error, data, mutate } = useSWR(
    ['/todos', currentPage],
    () => fetcher(currentPage),
    { keepPreviousData: true, revalidateOnFocus: false }
  );

  const { goPreviousPage, goNextPage, goToPage } = usePage({
    totalPages: data?.totalPages ?? 1,
    currentPage,
    setCurrentPage,
  });

  const changePage = (page: number): void => {
    if (page === currentPage) {
      mutate();
    } else {
      goToPage(page);
    }
  };

  useEffect(() => {
    if (error) {
      setLoadingError(handleApiError(error, 'To-doリストの取得に失敗しました'));
    } else {
      setLoadingError(null);
    }
  }, [error]);

  return {
    loading: isLoading || isValidating,
    error: loadingError,
    todoList: data?.content ?? [],
    currentPage,
    totalPages: data?.totalPages ?? 1,
    goPreviousPage,
    goNextPage,
    changePage,
  };
};
