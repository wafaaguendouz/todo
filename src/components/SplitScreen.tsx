import React from 'react';

interface SplitScreenProps {
  children: React.ReactNode;
  size?: number;
}

const SplitScreen: React.FC<SplitScreenProps> = ({ children, size = 25 }) => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
      }}
    >
      {React.Children.map(children, (child, index) => {
        if (index === 0) {
          return (
            <div
              style={{
                width: `${size}%`,
                height: '100%',
                overflow: 'auto',
              }}
            >
              {child}
            </div>
          );
        }
        return (
          <div
            style={{
              width: `${100 - size}%`,
              height: '100%',
              overflow: 'auto',
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default SplitScreen;
