import React from 'react';
import Icon from '../../common/Icon';

interface MenuListItemProps {
  name: string;
  iconName: string;
  taskCount: number;
  categoryColor?: string;
  onClick: () => void;
  isActive?: boolean;
  useColorCircle?: boolean;
  className?: string;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const MenuListItem: React.FC<MenuListItemProps> = ({
  name,
  iconName,
  taskCount,
  categoryColor = 'inherit',
  onClick,
  isActive = false,
  useColorCircle = false,
  className,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
}) => {
  return (
    <div
      onClick={onClick}
      role="menuitem"
      className={`menu-list-item ${isActive ? 'active' : ''} ${
        className || ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {useColorCircle ? (
        <div
          className="color-circle"
          style={{
            backgroundColor: categoryColor || '#6c757d',
          }}
        />
      ) : (
        <Icon name={iconName} color="var(--text-color)" className="icon" />
      )}
      <div className="content">
        <span className="menu-link">{name}</span>
        {taskCount > 0 && <span className="task-count">{taskCount}</span>}
      </div>
    </div>
  );
};

export default MenuListItem;
