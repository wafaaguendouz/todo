import React from 'react';
import logo from '../assets/todo.svg';
import { useNavigate } from 'react-router-dom';
import Switch from './common/Switch';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  isDark: boolean;
  handleThemeChange: (isDark: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, handleThemeChange }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--spacing-md)',
        backgroundColor: 'var(--background-color)',
        borderBottom: '1px solid var(--border-color)',
        height: '64px',
      }}
    >
      <img
        src={logo}
        width={100}
        height={100}
        alt="Todo application logo"
        onClick={handleLogoClick}
        style={{
          cursor: 'pointer',
          filter: isDark ? 'invert(1)' : 'none',
        }}
        aria-label="Navigate to Home"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleLogoClick();
          }
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Switch
          checked={isDark}
          onValueChange={handleThemeChange}
          ariaLabel="Toggle Dark Mode"
        >
          Dark mode
        </Switch>
      </div>
    </header>
  );
};

export default Header;
