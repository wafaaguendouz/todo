import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Typography from '../../common/Typography';
import MenuListItem from './MenuListItem';
import { TIME_FILTERED_CATEGORIES } from '../../../common/constants';
import type { Task } from '../../../common/types';

interface TasksSectionProps {
  tasks: Task[];
  countTaskByTimeCategory: (categoryName: string) => number;
}

const TasksSection: React.FC<TasksSectionProps> = ({
  countTaskByTimeCategory,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="menu-section">
      <div id="tasks-title">
        <Typography variant="title4">Tasks</Typography>
      </div>
      <div
        role="menu"
        aria-labelledby="tasks-title"
        aria-describedby="tasks-instructions"
      >
        <span id="tasks-instructions" className="sr-only">
          Use the arrow keys to navigate tasks.
        </span>
        {TIME_FILTERED_CATEGORIES.length > 0 ? (
          TIME_FILTERED_CATEGORIES.map((category) => (
            <MenuListItem
              key={category.name}
              name={category.name}
              iconName={category.iconName}
              categoryColor={category.categoryColor}
              taskCount={countTaskByTimeCategory(category.name)}
              onClick={() => navigate(category.url)}
              isActive={location.pathname === category.url}
            />
          ))
        ) : (
          <Typography variant="body1">No tasks found</Typography>
        )}
      </div>
    </div>
  );
};

export default TasksSection;
