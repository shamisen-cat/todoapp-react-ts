/** APIのベースURL */
export const API_BASE_URL = '/api';

/** 1ページあたりの表示件数 */
export const PAGE_SIZE = 10;

/** タイトルの最大文字数 */
export const MAX_TITLE_LENGTH = 100;

/** コンテンツ表示の識別子 */
export const CONTENT_VIEW = {
  NONE: 'none',
  CREATE: 'create',
  ERROR: 'error',
} as const;

/** IDを含むコンテンツ表示の識別子 */
export const ID_CONTENT_VIEW = {
  TODO: 'todo',
  EDIT: 'edit',
} as const;
