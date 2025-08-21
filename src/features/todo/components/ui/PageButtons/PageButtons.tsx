import styles from './PageButtons.module.scss';

type PageButtonsProps = {
  currentPage: number;
  totalPages: number;
  onClickPrevious: () => void;
  onClickNext: () => void;
};

/**
 * ページボタン
 *
 * @param currentPage     ページ番号
 * @param totalPages      総ページ数
 * @param onClickPrevious 前のページボタンのコールバック
 * @param onClickNext     次のページボタンのコールバック
 */
export const PageButtons = ({
  currentPage,
  totalPages,
  onClickPrevious,
  onClickNext,
}: PageButtonsProps) => (
  <div className={styles.pageButtons}>
    <button
      onClick={onClickPrevious}
      disabled={currentPage === 0}
      className={styles.pageButton}
    >
      Prev
    </button>

    <span className={styles.pageNumber}>{currentPage + 1} / {totalPages}</span>

    <button
      onClick={onClickNext}
      disabled={currentPage >= totalPages - 1}
      className={styles.pageButton}
    >
      Next
    </button>
  </div>
);
