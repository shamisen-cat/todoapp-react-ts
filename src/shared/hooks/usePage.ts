import { useCallback } from 'react';

type UsePageProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

type UsePageResult = {
  goPreviousPage: () => void;
  goNextPage: () => void;
  goToPage: (page: number) => void;
};

/**
 * ページ操作を提供するフック
 *
 * @param currentPage    ページ番号
 * @param totalPages     総ページ数
 * @param setCurrentPage ページ番号を設定する関数
 * @returns ページ操作
 * - goPreviousPage: 前のページに移動する関数
 * - goNextPage:     次のページに移動する関数
 * - goToPage:       指定されたページに移動する関数
 */
export const usePage = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: UsePageProps): UsePageResult => {
  const goPreviousPage = useCallback((): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, setCurrentPage]);

  const goNextPage = useCallback((): void => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(Math.min(currentPage + 1, totalPages - 1));
    }
  }, [currentPage, totalPages, setCurrentPage]);

  const goToPage = useCallback((page: number): void => {
    const safePage = Math.max(0, Math.min(page, totalPages - 1));

    if (safePage !== currentPage) {
      setCurrentPage(safePage);
    }
  }, [currentPage, totalPages, setCurrentPage]);

  return { goPreviousPage, goNextPage, goToPage };
};
