import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Task } from '../common/types';
import { TaskCategoryContext } from './TaskCategoryContext';
import { initialTasks } from '../common/initialData';

export interface TaskContextType {
  tasks: Task[];
  addTask: (
    taskTitle: string,
    dueDate: Date,
    description: string,
    listName: string
  ) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const categoryContext = useContext(TaskCategoryContext);
  if (!categoryContext) {
    throw new Error('TaskProvider must be used within a TaskCategoryProvider');
  }
  const { categories, setCategories } = categoryContext;

  const addTask = (
    taskTitle: string,
    dueDate: Date,
    description: string,
    listName: string
  ) => {
    const newTask: Task = {
      id: uuidv4(),
      title: taskTitle,
      dueDate,
      description,
      belongingListName: listName,
      isCompleted: false,
    };
    const listCopy = [...categories];
    const listToUpdate = listCopy.find(
      (list) => newTask.belongingListName === list.name
    );
    if (listToUpdate) {
      listToUpdate.taskCount++;
    }
    setTasks([...tasks, newTask]);
    setCategories(listCopy);
  };

  // Update a task
  const updateTask = (updatedTask: Task) => {
    const originalTask = tasks.find((task) => task.id === updatedTask.id);
    if (originalTask) {
      const listCopy = [...categories];
      const listToUpdate = listCopy.find(
        (list) => originalTask.belongingListName === list.name
      );
      if (listToUpdate) {
        listToUpdate.taskCount--;
      }
      const updatedList = listCopy.find(
        (list) => updatedTask.belongingListName === list.name
      );
      if (updatedList) {
        updatedList.taskCount++;
      }
      setCategories(listCopy);
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    }
  };

  // Delete a task
  const deleteTask = (taskId: string) => {
    setTasks(
      tasks.filter((task) => {
        return task.id !== taskId;
      })
    );
    const listCopy = [...categories];
    const listToUpdate = listCopy.find((list) => {
      const task = tasks.find((task) => task.id === taskId);
      return task ? task.belongingListName === list.name : false;
    });
    if (listToUpdate) {
      listToUpdate.taskCount--;
    }
  };
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
