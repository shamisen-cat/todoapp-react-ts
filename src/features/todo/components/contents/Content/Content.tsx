import { CONTENT_VIEW, ID_CONTENT_VIEW } from '@shared/constants';
import { TodoCreateForm, TodoEditForm, TodoItem } from '@todo/components';
import { throwOnInvalidViewType } from '@view-mode/utils';

import type { ContentViewModeUnion, Todo } from '@todo/types';

type ViewModeProps = {
  viewMode: ContentViewModeUnion;
  onClickEdit: () => void;
};

type TodoItemProps = {
  itemLoading: boolean;
  todo: Todo | null;
  onClickReloadTodo: () => void;
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
};

type TodoDeleteProps = {
  deleting: boolean;
  onClickDelete: () => void;
};

type ContentProps =
  & ViewModeProps
  & TodoItemProps
  & TodoCreateProps
  & TodoEditProps
  & TodoDeleteProps;

/**
 * コンテンツ
 *
 * @param viewMode            表示モード
 * @param onClickEdit         To-do編集ボタンのコールバック
 *
 * @param itemLoading         To-do取得の処理状態
 * @param todo                To-doデータ
 * @param onClickReloadTodo   To-doを再読み込みボタンのコールバック
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
 *
 * @param deleting            To-do削除の処理状態
 * @param onClickDelete       To-do削除ボタンクリックのコールバック
 */
export const Content = ({
  // --- コンテンツ表示 ---
  viewMode,
  onClickEdit,

  // --- To-do ---
  itemLoading,
  todo,
  onClickReloadTodo,

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

  // --- To-do削除 ---
  deleting,
  onClickDelete,
}: ContentProps) => {
  const todoItemProps = {
    loading: itemLoading,
    editing,
    deleting,
    todo,
    onClickReload: onClickReloadTodo,
    onClickCompleted,
    onClickEdit,
    onClickDelete,
  };

  const todoCreateFormProps = {
    creating,
    title: newTitle,
    setTitle: setNewTitle,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => onCreateSubmit(e),
  };

  const todoEditFormProps = {
    loading: itemLoading,
    editing,
    todo,
    title: editingTitle,
    completed: editingCompleted,
    setTitle: setEditingTitle,
    setCompleted: setEditingCompleted,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => onEditSubmit(e),
  };

  switch (viewMode.type) {
    // 初期表示
    case CONTENT_VIEW.NONE:
      return <h1>TodoApp Sample</h1>;

    // To-doの表示
    case ID_CONTENT_VIEW.TODO:
      return <TodoItem { ...todoItemProps } />;

    // To-do作成フォーム
    case CONTENT_VIEW.CREATE:
      return <TodoCreateForm { ...todoCreateFormProps } />;

    // To-do編集フォーム
    case ID_CONTENT_VIEW.EDIT:
      return <TodoEditForm { ...todoEditFormProps } />;

    // エラー表示
    case CONTENT_VIEW.ERROR:
      return <h1>エラーが発生しました</h1>;

    default:
      return throwOnInvalidViewType(viewMode);
  }
};
