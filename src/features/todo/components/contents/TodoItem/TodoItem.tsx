import { Pencil, RefreshCw, Trash2 } from 'lucide-react';

import { TodoCompletedButton } from '@todo/components';

import styles from './TodoItem.module.scss';

import type { Todo } from '@todo/types';

type TodoItemProps = {
  loading: boolean;
  editing: boolean;
  deleting: boolean;
  todo: Todo | null;
  onClickCompleted: () => void;
  onClickReload: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
};

/**
 * To-doの表示
 *
 * @param loading           To-do取得の処理状態
 * @param editing           To-do更新の処理状態
 * @param deleting          To-do削除の処理状態
 * @param todo              To-doデータ
 * @param onClickCompleted  To-do完了状態ボタンのコールバック
 * @param onClickReload     To-do再読み込みボタンのコールバック
 * @param onClickEdit       To-do編集ボタンのコールバック
 * @param onClickDelete     To-do削除ボタンのコールバック
 */
export const TodoItem = ({
  loading,
  editing,
  deleting,
  todo,
  onClickCompleted,
  onClickReload,
  onClickEdit,
  onClickDelete,
}: TodoItemProps) => {
  if (loading) {
    return <div>To-doを読み込み中...</div>;
  }

  if (!todo) {
    return <div>指定されたTo-doが見つかりません</div>;
  }

  const buttonSize = 20;

  return (
    <div className={styles.todoContainer}>
      <div className={styles.actionContainer}>
        <div className={styles.leftActionContainer}>
          <TodoCompletedButton
            completed={todo.completed}
            disabled={editing}
            onClick={onClickCompleted}
            buttonSize={buttonSize}
          />

          <span className={styles.completed}>
            {todo.completed ? '完了' : '未完了'}
          </span>
        </div>

        <div className={styles.rightActionContainer}>
          <button
            onClick={onClickReload}
            disabled={loading}
            className={styles.actionButton}
          >
            <RefreshCw size={buttonSize} />
          </button>

          <button
            onClick={onClickEdit}
            disabled={editing}
            className={styles.actionButton}
          >
            <Pencil size={buttonSize} />
          </button>

          <button
            onClick={onClickDelete}
            disabled={deleting}
            className={styles.actionButton}
          >
            <Trash2 size={buttonSize} />
          </button>
        </div>
      </div>

      <hr />

      <h1 className={styles.title}>{todo.title}</h1>

      <div className={styles.timestamps}>
        <div className={styles.date}>作成日時: {todo.createdAt.slice(0, 10)}</div>
        <div className={styles.date}>更新日時: {todo.updatedAt.slice(0, 10)}</div>
      </div>
    </div>
  );
};
