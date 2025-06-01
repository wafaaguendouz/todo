import React, { useEffect } from 'react';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  size = 'medium',
  title,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [visible, onClose]);

  if (!visible) return null;

  const sizeStyles = {
    small: { width: '400px' },
    medium: { width: '600px' },
    large: { width: '800px' },
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--background-color, #ffffff)',
          borderRadius: '8px',
          padding: '20px',
          ...sizeStyles[size],
          maxHeight: '90vh',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div
            style={{
              marginBottom: '16px',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: 'var(--text-color, #212529)',
            }}
          >
            {title}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
