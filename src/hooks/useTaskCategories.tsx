import { useContext } from 'react';
import { TaskCategoryContext } from '../contexts/TaskCategoryContext';
import type { TaskCategoryContextType } from '../contexts/TaskCategoryContext';

export const useTaskCategories = (): TaskCategoryContextType => {
  const context = useContext(TaskCategoryContext);
  if (!context) {
    throw new Error(
      'useTaskCategories must be used within a TaskCategoryProvider'
    );
  }
  return context;
};
