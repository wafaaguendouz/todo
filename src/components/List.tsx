import { useParams } from 'react-router-dom';
import type { Task } from '../common/types';
import { useTasks } from '../hooks/useTasksContext';
import { useTaskCategories } from '../hooks/useTaskCategories';
import TaskList from './TaskList';
import { useState, useEffect } from 'react';

const List = () => {
  const { categoryUrl } = useParams();
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const { categories } = useTaskCategories();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    const category = categories.find(
      (cat) => cat.url === `/lists/${categoryUrl}`
    );
    if (category) {
      const filtered = tasks.filter(
        (task) => task.belongingListName === category.name
      );
      setFilteredTasks(filtered);
    }
  }, [categoryUrl, categories, tasks]);

  const category = categories.find(
    (cat) => cat.url === `/lists/${categoryUrl}`
  );

  return (
    <TaskList
      title={category?.name || 'List'}
      tasks={filteredTasks}
      noTasks="No tasks in this list. Click 'Add Task' to add some!"
      addTask={addTask}
      updateTask={updateTask}
      deleteTask={deleteTask}
    />
  );
};

export default List;
