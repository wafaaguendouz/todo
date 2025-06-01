import TaskList from '../components/TaskList';
import { useTasks } from '../hooks/useTasksContext';
const Today: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const today = new Date();
  const todayTasks = tasks.filter(
    (task) =>
      task.dueDate.getDate() === today.getDate() &&
      task.dueDate.getMonth() === today.getMonth() &&
      task.dueDate.getFullYear() === today.getFullYear()
  );
  return (
    <TaskList
      title="Today"
      noTasks="No tasks available for today. Click 'Add Task' to add some!"
      tasks={todayTasks}
      addTask={addTask}
      updateTask={updateTask}
      deleteTask={deleteTask}
    />
  );
};

export default Today;
