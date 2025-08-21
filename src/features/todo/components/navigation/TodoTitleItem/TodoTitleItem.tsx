import { Trash2 } from 'lucide-react';

import { TodoCompletedButton } from '@todo/components/ui';

import styles from './TodoTitleItem.module.scss';

import type { Todo } from '@todo/types';

type TodoTitleItemProps = {
  editing: boolean;
  deleting: boolean;
  todo: Todo;
  onClickTitle: () => void;
  onClickCompleted: () => void;
  onClickDelete: () => void;
};

const buttonSize = 18;

/**
 * To-doタイトル
 *
 * @param editing          To-do更新の処理状態
 * @param deleting         To-do削除の処理状態
 * @param todo             To-doデータ
 * @param onClickTitle     To-doタイトルのコールバック
 * @param onClickCompleted To-do完了状態ボタンのコールバック
 * @param onClickDelete    To-do削除ボタンのコールバック
 */
export const TodoTitleItem = ({
  editing,
  deleting,
  todo,
  onClickTitle,
  onClickCompleted,
  onClickDelete,
}: TodoTitleItemProps) => (
  <li
    key={todo.id}
    title={todo.title}
    className={styles.itemContainer}
  >
    <TodoCompletedButton
      completed={todo.completed}
      disabled={editing}
      onClick={onClickCompleted}
      buttonSize={buttonSize}
    />

    <div
      onClick={onClickTitle}
      className={styles.title}
    >
      {todo.title}
    </div>

    <button
      onClick={onClickDelete}
      disabled={deleting}
      className={styles.deleteButton}
    >
      <Trash2 size={buttonSize} />
    </button>
  </li>
);
