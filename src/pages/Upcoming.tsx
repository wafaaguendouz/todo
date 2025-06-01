import type { Task } from '../common/types';
import { useEffect, useState } from 'react';
import { useTasks } from '../hooks/useTasksContext';
import TaskList from '../components/TaskList';

const Upcoming = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const filtered = tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate >= tomorrow;
    });
    setFilteredTasks(filtered);
  }, [tasks]);

  return (
    <TaskList
      title="Upcoming Tasks"
      tasks={filteredTasks}
      noTasks="No upcoming tasks available. Click 'Add Task' to add some!"
      addTask={addTask}
      updateTask={updateTask}
      deleteTask={deleteTask}
    />
  );
};

export default Upcoming;
