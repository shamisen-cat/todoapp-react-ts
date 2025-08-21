import { MAX_TITLE_LENGTH } from '@shared/constants';

import styles from './TodoCreateForm.module.scss';

type TodoCreateFormProps = {
  creating: boolean;
  title: string;
  setTitle: (title: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

/**
 * To-do作成フォーム
 *
 * @param creating To-do作成の処理状態
 * @param title    作成中のタイトル
 * @param setTitle 作成中のタイトルを設定する関数
 * @param onSubmit To-do作成フォーム送信のコールバック
 */
export const TodoCreateForm = ({
  creating,
  title,
  setTitle,
  onSubmit,
}: TodoCreateFormProps) => {
  if (creating) {
    return <div>To-doを作成中...</div>
  }

  return (
    <div className={styles.createContainer}>
      <form
        onSubmit={(e) => onSubmit(e)}
        className={styles.formContainer}
      >
        <textarea
          id="title"
          value={title}
          maxLength={MAX_TITLE_LENGTH}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.title}
          placeholder="タイトルを入力してください"
          rows={4}
        />

        <button
          type="submit"
          disabled={creating || !title.trim()}
          className={styles.submitButton}
        >
          保存
        </button>
      </form>
    </div>
  );
};
