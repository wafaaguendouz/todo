import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { TaskCategory } from '../common/types';
import * as Constants from '../common/constants';
import { initialTasks } from '../common/initialData';

export interface TaskCategoryContextType {
  categories: TaskCategory[];
  addNewCategory: (newList: { name: string; color: string }) => void;
  setCategories: React.Dispatch<React.SetStateAction<TaskCategory[]>>;
}

export const TaskCategoryContext = createContext<
  TaskCategoryContextType | undefined
>(undefined);

export const TaskCategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<TaskCategory[]>(() => {
    // Initialize categories with task counts from initial tasks
    return Constants.PERSONAL_CATEGORIES.map((category) => ({
      ...category,
      taskCount: initialTasks.filter(
        (task) => task.belongingListName === category.name
      ).length,
    }));
  });

  const addNewCategory = (newList: { name: string; color: string }) => {
    const newCategory: TaskCategory = {
      url: `/lists/${newList.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: newList.name,
      categoryColor: newList.color,
      taskCount: 0,
    };
    setCategories([...categories, newCategory]);
  };

  return (
    <TaskCategoryContext.Provider
      value={{ categories, addNewCategory, setCategories }}
    >
      {children}
    </TaskCategoryContext.Provider>
  );
};
