import React from 'react';
import Icon from './Icon';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  ariaLabel?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  ariaLabel,
  style,
  ...props
}) => {
  return (
    <button
      style={{
        background: 'none',
        border: 'none',
        padding: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-color, #212529)',
        borderRadius: '50%',
        transition: 'background-color 0.2s',
        ...style,
      }}
      aria-label={ariaLabel}
      {...props}
    >
      <Icon name={icon} size={24} />
    </button>
  );
};

export default IconButton;
