import { useState } from 'react';

import { isDynamicViewModeUnion, isStaticViewModeUnion } from '@view-mode/guards';

import type {
  DynamicViewModeUnion,
  StaticViewModeUnion,
  ViewModeUnion,
} from '@view-mode/types';

type UseViewModeResult<S extends string, D extends string> = {
  viewMode: ViewModeUnion<S, D>;
  changeViewMode: (mode: ViewModeUnion<S, D>) => void;
};

/**
 * 表示を管理するフック
 *
 * @template S 静的表示タイプのユニオン型
 * @template D 動的表示タイプのユニオン型
 * @param InitialViewType  初期表示タイプ
 * @param staticViewTypes  静的表示タイプのユニオン配列
 * @param dynamicViewTypes 動的表示タイプのユニオン配列
 * @returns 表示の状態と操作
 * - viewMode:       現在の表示
 * - changeViewMode: 表示を変更する関数
 */
export const useViewMode = <S extends string, D extends string>(
  InitialViewType: S,
  staticViewTypes: readonly S[],
  dynamicViewTypes: readonly D[],
): UseViewModeResult<S, D> => {
  const [viewMode, setViewMode] = useState<ViewModeUnion<S, D>>({
    type: InitialViewType,
  });

  const setStaticViewMode = (mode: StaticViewModeUnion<S>): void => {
    setViewMode({ type: mode.type });
  };

  const setDynamicViewMode = (mode: DynamicViewModeUnion<D>): void => {
    setViewMode({ type: mode.type, target: mode.target });
  };

  const changeViewMode = (mode: ViewModeUnion<S, D>): void => {
    if (
      isStaticViewModeUnion<S>(mode) &&
      staticViewTypes.includes(mode.type)
    ) {
      setStaticViewMode({ type: mode.type });
    }

    if (
      isDynamicViewModeUnion<D>(mode) &&
      dynamicViewTypes.includes(mode.type)
    ) {
      setDynamicViewMode({ type: mode.type, target: mode.target });
    }
  };

  return { viewMode, changeViewMode };
};
