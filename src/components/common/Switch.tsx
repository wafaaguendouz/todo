import React from 'react';

interface SwitchProps {
  checked: boolean;
  onValueChange: (checked: boolean) => void;
  children?: React.ReactNode;
  ariaLabel?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onValueChange,
  children,
  ariaLabel,
}) => {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '40px',
          height: '20px',
          backgroundColor: checked
            ? 'var(--primary-color, #007bff)'
            : 'var(--border-color, #ced4da)',
          borderRadius: '20px',
          transition: 'background-color 0.2s',
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onValueChange(e.target.checked)}
          style={{
            opacity: 0,
            width: 0,
            height: 0,
            position: 'absolute',
          }}
          aria-label={ariaLabel}
        />
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: checked ? '22px' : '2px',
            width: '16px',
            height: '16px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: 'left 0.2s',
          }}
        />
      </div>
      {children}
    </label>
  );
};

export default Switch;
