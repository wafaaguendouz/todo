import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: 'outlined' | 'filled';
  assistiveText?: string;
  validity?: 'valid' | 'invalid';
  onValueChange?: (value: string) => void;
  controlled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  variant = 'outlined',
  assistiveText,
  validity,
  onValueChange,
  controlled,
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '4px',
    border: `1px solid ${
      validity === 'invalid'
        ? 'var(--error-color, #dc3545)'
        : 'var(--border-color, #ced4da)'
    }`,
    backgroundColor:
      variant === 'filled' ? 'var(--input-bg-color, #f8f9fa)' : 'transparent',
    ...style,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {
      onValueChange(e.target.value);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: '4px',
            color: 'var(--text-color, #212529)',
          }}
        >
          {label}
        </label>
      )}
      <input style={baseStyle} onChange={handleChange} {...props} />
      {assistiveText && (
        <span
          style={{
            fontSize: '0.875rem',
            color:
              validity === 'invalid'
                ? 'var(--error-color, #dc3545)'
                : 'var(--text-muted, #6c757d)',
            marginTop: '4px',
            display: 'block',
          }}
        >
          {assistiveText}
        </span>
      )}
    </div>
  );
};

export default Input;
