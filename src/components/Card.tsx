import React from 'react';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--background-color)',
        borderRadius: '8px',
        boxShadow: 'var(--shadow-sm)',
        padding: '1rem',
        height: '100%',
        border: '1px solid var(--border-color)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
