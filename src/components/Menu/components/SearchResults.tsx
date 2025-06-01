import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Typography from '../../common/Typography';
import MenuListItem from './MenuListItem';
import type { Task } from '../../../common/types';

interface SearchResultsProps {
  filteredTasks: Task[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ filteredTasks }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!filteredTasks.length) {
    return <Typography variant="body1">No tasks found</Typography>;
  }

  return (
    <div className="menu-section">
      <Typography variant="title4">Search Results</Typography>
      <div role="menu">
        {filteredTasks.map((task) => (
          <MenuListItem
            key={task.id}
            name={`${task.title} (${task.belongingListName})`}
            iconName="task"
            taskCount={0}
            onClick={() => navigate(`/tasks/${task.id}`)}
            isActive={location.pathname === `/tasks/${task.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
