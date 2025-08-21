/**
 * 作成リクエストデータの型
 *
 * プロパティ:
 * - title: タイトル
 */
export interface CreateTodoRequest {
  title: string;
}

/**
 * 更新リクエストデータの型
 *
 * プロパティ:
 * - id:        ID
 * - title:     タイトル
 * - completed: 完了状態（true: 完了、false: 未完了）
 */
export interface UpdateTodoRequest {
  id: string;
  title?: string;
  completed?: boolean;
}

/**
 * 削除リクエストデータの型
 *
 * プロパティ:
 * - id: ID
 */
export interface DeleteTodoRequest {
  id: string;
}
