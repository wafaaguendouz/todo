import React from 'react';

interface TypographyProps {
  variant?: 'title1' | 'title2' | 'title3' | 'title4' | 'body1' | 'body2';
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  children,
  style,
}) => {
  const variantStyles: Record<string, React.CSSProperties> = {
    title1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      lineHeight: 1.2,
      marginBottom: '1rem',
    },
    title2: {
      fontSize: '2rem',
      fontWeight: 'bold',
      lineHeight: 1.2,
      marginBottom: '0.875rem',
    },
    title3: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      lineHeight: 1.2,
      marginBottom: '0.75rem',
    },
    title4: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      lineHeight: 1.2,
      marginBottom: '0.625rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      marginBottom: '0.5rem',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      marginBottom: '0.375rem',
    },
  };

  const Component = variant.startsWith('title') ? 'h1' : 'p';

  return (
    <Component
      style={{
        color: 'var(--text-color, #212529)',
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

export default Typography;
