import { MAX_TITLE_LENGTH } from '@shared/constants';

import styles from './TodoEditForm.module.scss';

import type { Todo } from '@todo/types';

type TodoEditFormProps = {
  loading: boolean,
  editing: boolean,
  todo: Todo | null,
  title: string | undefined,
  completed: boolean | undefined,
  setTitle: (title: string) => void,
  setCompleted: (completed: boolean) => void,
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
};

/**
 * To-do編集フォーム
 *
 * @param loading      To-do取得の処理状態
 * @param editing      To-do編集の処理状態
 * @param todo         To-doデータ
 * @param title        編集中のタイトル
 * @param completed    編集中の完了状態
 * @param setTitle     編集中のタイトルを設定する関数
 * @param setCompleted 編集中の完了状態を設定する関数
 * @param onSubmit     To-do編集フォーム送信のコールバック
 */
export const TodoEditForm = ({
  loading,
  editing,
  todo,
  title,
  completed,
  setTitle,
  setCompleted,
  onSubmit,
}: TodoEditFormProps) => {
  if (loading) {
    return <div>To-doを読み込み中...</div>;
  }

  if (editing) {
    return <div>To-doを更新中...</div>;
  }

  if (!todo) {
    return <div>指定されたTo-doが見つかりません</div>;
  }

  return (
    <div className={styles.editContainer}>
      <form
        onSubmit={(e) => onSubmit(e)}
        className={styles.formContainer}
      >
        <div className={styles.completed}>
          <input
            id="completed"
            type="checkbox"
            checked={completed ?? todo.completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className={styles.checkbox}
          />
          <label
            htmlFor="completed"
            className={styles.label}
          >
            完了
          </label>
        </div>

        <textarea
          id="title"
          value={title || todo.title}
          maxLength={MAX_TITLE_LENGTH}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.title}
          placeholder="タイトルを入力してください"
          rows={4}
        />

        <button
          type="submit"
          disabled={editing}
          className={styles.submitButton}
        >
          保存
        </button>
      </form>
    </div>
  );
};
