import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Typography from '../../common/Typography';
import MenuListItem from './MenuListItem';
import type { TaskCategory } from '../../../common/types';

interface ListsSectionProps {
  categories: TaskCategory[];
  onAddNewList: () => void;
}

const ListsSection: React.FC<ListsSectionProps> = ({
  categories,
  onAddNewList,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="menu-section">
      <Typography variant="title4">Lists</Typography>
      <div role="menu">
        {categories.map((category) => (
          <MenuListItem
            key={category.name}
            name={category.name}
            iconName=""
            categoryColor={category.categoryColor}
            taskCount={category.taskCount}
            onClick={() => navigate(category.url)}
            isActive={location.pathname === category.url}
            useColorCircle={true}
          />
        ))}
        <MenuListItem
          name="Add new list"
          iconName="add"
          taskCount={0}
          onClick={onAddNewList}
          className="add-list-item"
        />
      </div>
    </div>
  );
};

export default ListsSection;
