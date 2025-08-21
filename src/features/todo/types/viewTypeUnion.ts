import type { CONTENT_VIEW, ID_CONTENT_VIEW } from '@shared/constants';
import type { ViewModeUnion } from '@view-mode/types';

/**
 * コンテンツ表示のユニオン型
 */
export type ContentViewUnion = typeof CONTENT_VIEW[keyof typeof CONTENT_VIEW];

/**
 * 動的表示タイプのユニオン型
 */
export type IdContentViewUnion = typeof ID_CONTENT_VIEW[keyof typeof ID_CONTENT_VIEW];

/**
 * 表示モードのユニオン型
 */
export type ContentViewModeUnion = ViewModeUnion<ContentViewUnion, IdContentViewUnion>;
