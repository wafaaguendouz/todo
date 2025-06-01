import { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import type { TaskContextType } from '../contexts/TaskContext';

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
