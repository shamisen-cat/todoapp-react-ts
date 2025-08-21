import { Content, Navigation } from '@todo/components';

import styles from './TodoApp.module.scss';

import type { ResponseWithETag } from '@api/types';
import type { ContentViewModeUnion, Todo } from '@todo/types';

type ViewModeProps = {
  viewMode: ContentViewModeUnion;
  onClickCreate: () => void;
  onClickTitle: (id: string) => void;
  onClickEdit: () => void;
};

type TodoItemProps = {
  itemLoading: boolean;
  todoWithETag: ResponseWithETag<Todo> | null;
  onClickReloadTodo: () => void;
};

type TodoListProps = {
  listLoading: boolean;
  todoList: ResponseWithETag<Todo>[];
  currentPage: number;
  totalPages: number;
  onClickPrevious: () => void;
  onClickNext: () => void;
};

type TodoCreateProps = {
  creating: boolean;
  newTitle: string;
  setNewTitle: (title: string) => void;
  onCreateSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

type TodoEditProps = {
  editing: boolean;
  editingTitle: string | undefined;
  editingCompleted: boolean | undefined;
  setEditingTitle: (title: string) => void;
  setEditingCompleted: (completed: boolean) => void;
  onEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClickCompleted: () => void;
  onClickCompletedNav: (todoWithETag: ResponseWithETag<Todo>) => void;
};

type TodoDeleteProps = {
  deleting: boolean;
  onClickDelete: () => void;
  onClickDeleteNav: (id: string, etag: string) => void;
};

type TodoAppProps =
  & ViewModeProps
  & TodoItemProps
  & TodoListProps
  & TodoCreateProps
  & TodoEditProps
  & TodoDeleteProps;

/**
 * To-doアプリケーション
 *
 * @param viewMode            表示モード
 * @param onClickCreate       To-do作成ボタンのコールバック
 * @param onClickTitle        To-doタイトルのコールバック
 * @param onClickEdit         To-do編集ボタンのコールバック
 *
 * @param itemLoading         To-do取得の処理状態
 * @param todoWithETag        To-doデータとETag
 * @param onClickReloadTodo   To-do再読み込みボタンのコールバック
 *
 * @param listLoading         To-doリスト取得の処理状態
 * @param todoList            To-doリスト
 * @param currentPage         ページ番号
 * @param totalPages          総ページ数
 * @param onClickPrevious     前のページボタンのコールバック
 * @param onClickNext         次のページボタンのコールバック
 *
 * @param creating            To-do作成の処理状態
 * @param newTitle            作成中のタイトル
 * @param setNewTitle         作成中のタイトルを設定するコールバック
 * @param onCreateSubmit      To-do作成フォーム送信のコールバック
 *
 * @param editing             To-do更新の処理状態
 * @param editingTitle        編集中のタイトル
 * @param editingCompleted    編集中の完了状態（true: 完了、false: 未完了、undefined: 変更なし）
 * @param setEditingTitle     編集中のタイトルを設定するコールバック
 * @param setEditingCompleted 編集中の完了状態を設定するコールバック
 * @param onEditSubmit        To-do編集フォーム送信のコールバック
 * @param onClickCompleted    To-do完了状態ボタンのコールバック
 * @param onClickCompletedNav ナビゲーションのTo-do完了状態ボタンのコールバック
 *
 * @param deleting            To-do削除の処理状態
 * @param onClickDelete       To-do削除ボタンのコールバック
 * @param onClickDeleteNav    ナビゲーションのTo-do削除ボタンのコールバック
 */
export const TodoApp = ({
  // --- コンテンツ表示 ---
  viewMode,
  onClickCreate,
  onClickTitle,
  onClickEdit,

  // --- To-do ---
  itemLoading,
  todoWithETag,
  onClickReloadTodo,

  // --- To-doリスト ---
  listLoading,
  todoList,
  currentPage,
  totalPages,
  onClickPrevious,
  onClickNext,

  // --- To-do作成 ---
  creating,
  newTitle,
  setNewTitle,
  onCreateSubmit,

  // --- To-do更新 ---
  editing,
  editingTitle,
  editingCompleted,
  setEditingTitle,
  setEditingCompleted,
  onEditSubmit,
  onClickCompleted,
  onClickCompletedNav,

  // --- To-do削除 ---
  deleting,
  onClickDelete,
  onClickDeleteNav,
}: TodoAppProps) => {
  // --- ナビゲーション ---
  const navViewModeProps = {
    onClickCreate,
    onClickTitle: (id: string) => onClickTitle(id),
  };

  const navTodoListProps = {
    loading: listLoading,
    todoList,
    currentPage,
    totalPages,
    onClickPrevious,
    onClickNext,
  };

  const navTodoEditProps = {
    editing,
    onClickCompleted: (
      todoWithETag: ResponseWithETag<Todo>,
    ) => onClickCompletedNav(todoWithETag),
  };

  const navTodoDeleteProps = {
    deleting,
    onClickDelete: (id: string, etag: string) => onClickDeleteNav(id, etag),
  };

  // --- コンテンツ ---
  const viewModeProps = {
    viewMode,
    onClickEdit,
  };

  const todoItemProps = {
    itemLoading,
    todo: todoWithETag?.data ?? null,
    onClickReloadTodo,
  };

  const todoCreateProps = {
    creating,
    newTitle,
    setNewTitle,
    onCreateSubmit: (e: React.FormEvent<HTMLFormElement>) => onCreateSubmit(e),
  };

  const todoEditProps = {
    editing,
    editingTitle,
    editingCompleted,
    setEditingTitle,
    setEditingCompleted,
    onEditSubmit: (e: React.FormEvent<HTMLFormElement>) => onEditSubmit(e),
    onClickCompleted,
  };

  const todoDeleteProps = {
    deleting,
    onClickDelete,
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.navigationContainer}>
        <Navigation
          { ...navViewModeProps }
          { ...navTodoListProps }
          { ...navTodoEditProps }
          { ...navTodoDeleteProps }
        />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <Content
            { ...viewModeProps }
            { ...todoItemProps }
            { ...todoCreateProps }
            { ...todoEditProps }
            { ...todoDeleteProps }
          />
        </div>
      </div>
    </div>
  );
};
