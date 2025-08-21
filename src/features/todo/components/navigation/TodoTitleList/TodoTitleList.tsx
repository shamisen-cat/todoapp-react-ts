import { PageButtons, TodoTitleItem } from '@todo/components';

import styles from './TodoTitleList.module.scss';

import type { ResponseWithETag } from '@api/types';
import type { Todo } from '@todo/types';

type TodoTitleListProps = {
  loading: boolean;
  editing: boolean;
  deleting: boolean;
  todoList: ResponseWithETag<Todo>[];
  onClickTitle: (id: string) => void;
  onClickCompleted: (todoWithETag: ResponseWithETag<Todo>) => void;
  onClickDelete: (id: string, etag: string) => void;
};

type PageButtonProps = {
  currentPage: number;
  totalPages: number;
  onClickPrevious: () => void;
  onClickNext: () => void;
};

/**
 * To-doタイトルリスト
 *
 * @param loading          To-doリスト取得の処理状態
 * @param editing          To-do更新の処理状態
 * @param deleting         To-do削除の処理状態
 * @param todoList         To-doリスト
 * @param onClickTitle     To-doタイトルのコールバック
 * @param onClickCompleted To-do完了状態ボタンのコールバック
 * @param onClickDelete    To-do削除ボタンのコールバック
 *
 * @param currentPage      ページ番号
 * @param totalPages       総ページ数
 * @param onClickPrevious  前のページボタンのコールバック
 * @param onClickNext      次のページボタンのコールバック
 */
export const TodoTitleList = ({
  loading,
  editing,
  deleting,
  todoList,
  onClickTitle,
  onClickCompleted,
  onClickDelete,

  currentPage,
  totalPages,
  onClickPrevious,
  onClickNext
}: TodoTitleListProps & PageButtonProps) => {
  if (loading) {
    return <div>To-doリストを読み込み中...</div>;
  }

  return (
    <div className={styles.titleContainer}>
      <ul className={styles.listContainer}>
        {todoList.map((response) => (
          <TodoTitleItem
            key={response.data.id}
            editing={editing}
            deleting={deleting}
            todo={response.data}
            onClickTitle={() => onClickTitle(response.data.id)}
            onClickCompleted={() => onClickCompleted(response)}
            onClickDelete={() => onClickDelete(response.data.id, response.etag)}
          />
        ))}
      </ul>

      <PageButtons
        currentPage={currentPage}
        totalPages={totalPages}
        onClickPrevious={onClickPrevious}
        onClickNext={onClickNext}
      />
    </div>
  );
};
