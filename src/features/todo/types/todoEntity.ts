/**
 * To-doの型
 *
 * プロパティ:
 * - id:        ID
 * - title:     タイトル
 * - completed: 完了状態（true: 完了、false: 未完了）
 * - createdAt: 作成日時
 * - updatedAt: 更新日時
 */
export interface Todo {
  readonly id: string;
  readonly title: string;
  readonly completed: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}
