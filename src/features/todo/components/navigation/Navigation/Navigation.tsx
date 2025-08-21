import { TodoTitleList } from '@todo/components';

import styles from './Navigation.module.scss';

import type { ResponseWithETag } from '@api/types';
import type { Todo } from '@todo/types';

type ViewModeProps = {
  onClickCreate: () => void;
  onClickTitle: (id: string) => void;
};

type TodoListProps = {
  loading: boolean;
  todoList: ResponseWithETag<Todo>[];
  currentPage: number;
  totalPages: number;
  onClickPrevious: () => void;
  onClickNext: () => void;
};

type TodoEditProps = {
  editing: boolean;
  onClickCompleted: (todoWithETag: ResponseWithETag<Todo>) => void;
};

type TodoDeleteProps = {
  deleting: boolean;
  onClickDelete: (id: string, etag: string) => void;
};

type NavigationProps =
  & ViewModeProps
  & TodoListProps
  & TodoEditProps
  & TodoDeleteProps;

/**
 * ナビゲーション
 *
 * @param onClickCreate    To-do新規作成ボタンのコールバック
 * @param onClickTitle     To-doタイトルのコールバック
 *
 * @param loading          To-doリスト取得の処理状態
 * @param todoList         To-doリスト
 * @param currentPage      ページ番号
 * @param totalPages       総ページ数
 * @param onClickPrevious  前のページボタンのコールバック
 * @param onClickNext      次のページボタンのコールバック
 *
 * @param editing          To-do編集の処理状態
 * @param onClickCompleted To-do完了状態ボタンのコールバック
 *
 * @param deleting         To-do削除の処理状態
 * @param onClickDelete    To-do削除ボタンのコールバック
 */
export const Navigation = ({
  // コンテンツ表示
  onClickCreate,
  onClickTitle,

  // To-doリスト
  loading,
  todoList,
  currentPage,
  totalPages,
  onClickPrevious,
  onClickNext,

  // To-do更新
  editing,
  onClickCompleted,

  // To-do削除
  deleting,
  onClickDelete,
}: NavigationProps) => {
  const viewModeProps = {
    onClickTitle: (id: string) => onClickTitle(id),
  };

  const todoTitleListProps = {
    loading,
    todoList,
  };

  const todoEditProps = {
    editing,
    onClickCompleted: (
      todoWithETag: ResponseWithETag<Todo>,
    ) => onClickCompleted(todoWithETag),
  };

  const todoDeleteProps = {
    deleting,
    onClickDelete: (id: string, etag: string) => onClickDelete(id, etag),
  };

  const pageButtonProps = {
    currentPage,
    totalPages,
    onClickPrevious,
    onClickNext,
  };

  return (
    <nav className={styles.navigationContainer}>
      <h1>Action Items</h1>

      <button
        onClick={onClickCreate}
        className={styles.createButton}
      >
        + 新規作成
      </button>

      <TodoTitleList
        { ...viewModeProps }
        { ...todoTitleListProps }
        { ...todoEditProps }
        { ...todoDeleteProps }
        { ...pageButtonProps }
      />
    </nav>
  );
};
