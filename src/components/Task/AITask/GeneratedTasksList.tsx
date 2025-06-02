import React from 'react';
import Input from '../../common/Input';
import type { GeneratedTask } from './types';

interface GeneratedTasksListProps {
  tasks: GeneratedTask[];
  onTaskUpdate: (
    index: number,
    field: keyof GeneratedTask,
    value: string | Date
  ) => void;
}

const GeneratedTasksList: React.FC<GeneratedTasksListProps> = ({
  tasks,
  onTaskUpdate,
}) => {
  if (tasks.length === 0) return null;

  return (
    <div className="generated-tasks">
      <h3>Generated Tasks</h3>
      {tasks.map((task, index) => (
        <div key={index} className="generated-task">
          <Input
            type="text"
            value={task.title}
            onChange={(e) => onTaskUpdate(index, 'title', e.target.value)}
            className="task-title"
          />
          <Input
            type="textarea"
            value={task.description}
            onChange={(e) => onTaskUpdate(index, 'description', e.target.value)}
            className="task-description"
          />
          <input
            type="date"
            value={task.dueDate.toISOString().split('T')[0]}
            onChange={(e) =>
              onTaskUpdate(index, 'dueDate', new Date(e.target.value))
            }
            className="task-date"
          />
        </div>
      ))}
    </div>
  );
};

export default GeneratedTasksList;
