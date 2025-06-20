import React, { useState } from 'react';
import type { Task } from '../common/types';
import TaskComponent from './Task/Task';
import AITaskComponent from './Task/AITask';
import Button from './common/Button';
import IconButton from './common/IconButton';
import Typography from './common/Typography';
import './TaskList.scss';
import { Plus, WandSparkles } from 'lucide-react';

interface TaskListProps {
  tasks?: Task[];
  filterTasks?: (task: Task) => boolean;
  title: string;
  noTasks?: string;
  addTask: (
    taskTitle: string,
    dueDate: Date,
    description: string,
    list: string
  ) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks = [],
  addTask,
  updateTask,
  noTasks,
  deleteTask,
  filterTasks = () => true,
  title,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  const openModal = (task?: Task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentTask(undefined);
    setIsModalOpen(false);
  };

  const openAIModal = () => {
    setIsAIModalOpen(true);
  };

  const closeAIModal = () => {
    setIsAIModalOpen(false);
  };

  const localAddTask = (
    taskTitle: string,
    dueDate: Date,
    description: string,
    list: string
  ) => {
    addTask(taskTitle, dueDate, description, list);
    if (!isAIModalOpen) {
      closeModal();
    }
  };

  const localUpdateTask = (updatedTask: Task) => {
    updateTask(updatedTask);
    closeModal();
  };

  const localConfirmDelete = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  // Filter tasks based on the filter function
  const filteredTasks = tasks.filter(filterTasks);

  return (
    <div className="task-list">
      <div className="task-list-header">
        <Typography variant="title4">{title}</Typography>
        <div className="task-actions">
          <Button
            className="add-task-button"
            color="task"
            onClick={() => openModal()}
            aria-label="Add new task"
            iconPosition="prefix"
          >
            <Plus color="var(--text-color)" size="14px" />
            Add new task
          </Button>
          <Button
            className="add-ai-task-button"
            color="primary"
            onClick={openAIModal}
            aria-label="Add task with AI"
            iconPosition="prefix"
          >
            <WandSparkles color="white" size="14px" /> Add with AI
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <TaskComponent
          closeModal={closeModal}
          addTask={localAddTask}
          updateTask={localUpdateTask}
          task={currentTask}
        />
      )}

      {isAIModalOpen && (
        <AITaskComponent closeModal={closeAIModal} addTask={localAddTask} />
      )}

      {filteredTasks.length > 0 ? (
        <div className="tasks-container">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                className="checkbox"
                checked={task.isCompleted}
                aria-label={`Toggle task completion: ${task.title}`}
                onChange={() => {
                  updateTask({ ...task, isCompleted: !task.isCompleted });
                }}
              />
              <div
                className={`task-content ${
                  task.isCompleted ? 'completed' : ''
                }`}
                onClick={() => openModal(task)}
              >
                {task.title}
              </div>
              <div className="task-actions">
                <IconButton
                  icon="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(task);
                  }}
                  aria-label={`Edit task: ${task.title}`}
                  style={{ color: 'var(--text-muted)' }}
                />
                <IconButton
                  icon="trash"
                  onClick={(e) => {
                    e.stopPropagation();
                    localConfirmDelete(task.id);
                  }}
                  aria-label={`Delete task: ${task.title}`}
                  style={{ color: 'var(--text-muted)' }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Typography
          variant="body1"
          style={{ paddingTop: '16px' }}
          aria-live="polite"
        >
          {noTasks}
        </Typography>
      )}
    </div>
  );
};

export default TaskList;
