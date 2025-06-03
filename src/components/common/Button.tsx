import React, { useState } from 'react';
import Icon from './Icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  elevated?: boolean;
  color?: 'primary' | 'secondary' | 'danger' | 'task';
  icon?: string;
  iconPosition?: 'prefix' | 'suffix';
}

const Button: React.FC<ButtonProps> = ({
  children,
  elevated,
  color = 'primary',
  icon,
  iconPosition,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const baseStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor:
      color === 'primary'
        ? isActive
          ? 'var(--primary-color-dark, #0056b3)'
          : isHovered
          ? 'var(--primary-color-hover, #0056b3)'
          : 'var(--primary-color)'
        : color === 'secondary'
        ? isActive
          ? 'var(--secondary-color-dark, #5a6268)'
          : isHovered
          ? 'var(--secondary-color-hover, #5a6268)'
          : 'var(--secondary-color)'
        : color === 'danger'
        ? isActive
          ? 'var(--danger-color-dark, #bd2130)'
          : isHovered
          ? 'var(--danger-color-hover, #bd2130)'
          : 'var(--danger-color)'
        : color === 'task'
        ? isActive
          ? 'var(--light-color)'
          : isHovered
          ? 'var(--light-color)'
          : 'var(--background-color)'
        : 'var(--primary-color)',
    color:
      color === 'task'
        ? 'var(--text-color)'
        : color === 'primary'
        ? 'white'
        : color === 'secondary'
        ? 'var(--text-color)'
        : undefined,

    boxShadow: elevated ? 'var(--shadow-sm)' : 'none',
    border: color === 'task' ? '1px solid var(--border-color)' : 'none',
    fontSize: '14px',
    width: color === 'task' ? '100%' : undefined,
    fontWeight: color === 'task' ? 'bold' : undefined,
    justifyContent: color === 'task' ? 'flex-start' : undefined,
    transition: 'background-color 0.2s, border-color 0.2s, transform 0.2s',
    transform: isActive
      ? 'scale(0.98)'
      : isHovered
      ? 'scale(1.02)'
      : 'scale(1)',
    ...style,
  };

  return (
    <button
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      {...props}
    >
      {icon && iconPosition === 'prefix' && <Icon name={icon} size={20} />}
      {children}
      {icon && iconPosition === 'suffix' && <Icon name={icon} size={20} />}
    </button>
  );
};

export default Button;
