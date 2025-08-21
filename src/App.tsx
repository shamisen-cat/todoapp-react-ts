import { useCallback, useEffect } from 'react';

import { CONTENT_VIEW, ID_CONTENT_VIEW } from '@shared/constants';
import { TodoApp } from '@todo/components';
import {
  useClickCompleted,
  useClickDelete,
  useCreateSubmit,
  useCreateTodo,
  useDeleteTodo,
  useEditSubmit,
  usePageTodos,
  useTodo,
  useUpdateTodo,
} from '@todo/hooks';
import { isDynamicViewModeUnion } from '@view-mode/guards';
import { useViewMode } from '@view-mode/hooks';

import type { ResponseWithETag } from '@api/types';
import type { Todo } from '@todo/types';

export const App = () => {
  // --- コンテンツ表示の管理 ---
  const { viewMode, changeViewMode } = useViewMode(
    CONTENT_VIEW.NONE,
    Object.values(CONTENT_VIEW),
    Object.values(ID_CONTENT_VIEW),
  );

  const target = isDynamicViewModeUnion(viewMode) ? viewMode.target : '';

  // --- To-doの管理 ---
  const { loading: itemLoading, todoWithETag, fetchTodo: reloadTodo } = useTodo(
    target ?? undefined,
  );

  useEffect(() => {
    if (target) {
      reloadTodo();
    }
  }, [target, reloadTodo]);

  // --- To-doリストの管理 ---
  const {
    loading: listLoading,
    todoList,
    currentPage,
    totalPages,
    goPreviousPage,
    goNextPage,
    changePage,
  } = usePageTodos();

  // --- To-do作成の管理 ---
  const { creating, newTitle, setNewTitle, createTodo } = useCreateTodo();

  const { handleCreateSubmit } = useCreateSubmit({
    newTitle,
    createTodo,
    changeViewMode,
    changePage,
  });

  // --- To-do更新の管理 ---
  const {
    editing,
    editingTitle,
    editingCompleted,
    setEditingTitle,
    setEditingCompleted,
    updateTodo,
  } = useUpdateTodo();

  const { handleEditSubmit } = useEditSubmit({
    todoWithETag,
    editingTitle,
    editingCompleted,
    updateTodo,
    reloadTodo,
    changeViewMode,
    changePage,
  });

  const { handleClickCompleted, handleClickCompletedNav } = useClickCompleted({
    viewMode,
    todoWithETag,
    todoList,
    currentPage,
    updateTodo,
    reloadTodo,
    changeViewMode,
    changePage,
  });

  // --- To-do削除の管理 ---
  const { deleting, deleteTodo } = useDeleteTodo();

  const { handleClickDelete, handleClickDeleteNav } = useClickDelete({
    viewMode,
    todoWithETag,
    todoList,
    currentPage,
    deleteTodo,
    changeViewMode,
    changePage,
  });

  // --- useCallback ---
  const handleClickTitle = useCallback((id: string) => {
    changeViewMode({ type: ID_CONTENT_VIEW.TODO, target: id });
  }, [changeViewMode]);

  const handleClickEdit = useCallback((id: string | null) => {
    if (id !== null) {
      changeViewMode({ type: ID_CONTENT_VIEW.EDIT, target: id });
    }
  }, [changeViewMode]);

  // --- Props ---
  const contentViewProps = {
    viewMode,
    onClickCreate: () => {
      setNewTitle('');
      changeViewMode({ type: CONTENT_VIEW.CREATE });
    },
    onClickTitle: (id: string) => handleClickTitle(id),
    onClickEdit: () => handleClickEdit(todoWithETag?.data.id ?? null),
  };

  const todoItemProps = {
    itemLoading,
    todoWithETag: todoWithETag ?? null,
    onClickReloadTodo: reloadTodo,
  };

  const todoListProps = {
    listLoading,
    todoList,
    currentPage,
    totalPages,
    onClickPrevious: goPreviousPage,
    onClickNext: goNextPage,
  };

  const todoCreateProps = {
    creating,
    newTitle,
    setNewTitle,
    onCreateSubmit: (e: React.FormEvent<HTMLFormElement>) => handleCreateSubmit(e),
  };

  const todoEditProps = {
    editing,
    editingTitle,
    editingCompleted,
    setEditingTitle,
    setEditingCompleted,
    onEditSubmit: (e: React.FormEvent<HTMLFormElement>) => handleEditSubmit(e),
    onClickCompleted: handleClickCompleted,
    onClickCompletedNav: (
      todoWithETag: ResponseWithETag<Todo>,
    ) => handleClickCompletedNav(todoWithETag),
  };

  const todoDeleteProps = {
    deleting,
    onClickDelete: handleClickDelete,
    onClickDeleteNav: (id: string, etag: string) => handleClickDeleteNav(id, etag),
  };

  return (
    <TodoApp
      { ...contentViewProps }
      { ...todoItemProps }
      { ...todoListProps }
      { ...todoCreateProps }
      { ...todoEditProps }
      { ...todoDeleteProps }
    />
  );
}
