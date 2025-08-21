import { CircleAlert, CircleCheck } from "lucide-react";

import styles from "./TodoCompletedButton.module.scss";

type TodoCompletedButtonProps = {
  completed: boolean;
  disabled: boolean;
  onClick: () => void;
  buttonSize?: number;
};

/**
 * To-do完了状態ボタン
 *
 * @param completed  To-doの完了状態（true: 完了、false: 未完了）
 * @param disabled   ボタンの無効化
 * @param onClick    コールバック
 * @param buttonSize ボタンのサイズ
 */
export const TodoCompletedButton = ({
  completed,
  disabled,
  onClick,
  buttonSize = 24,
}: TodoCompletedButtonProps) => {
  const props = { disabled, onClick }

  return completed ? (
    <button
      className={styles.completed}
      { ...props }
    >
      <CircleCheck size={buttonSize} />
    </button>
  ) : (
    <button
      className={styles.incomplete}
      { ...props }
    >
      <CircleAlert size={buttonSize} />
    </button>
  );
};
