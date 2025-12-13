import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: 'small' | 'medium';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ showLabel = true, size = 'medium' }) => {
  const { theme, toggleTheme } = useTheme();

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: size === 'small' ? 'var(--spacing-sm)' : 'var(--spacing-md)',
    padding: size === 'small' ? 'var(--spacing-sm) var(--spacing-md)' : 'var(--spacing-md) var(--spacing-lg)',
    background: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    color: 'var(--color-text-primary)',
    cursor: 'pointer',
    fontSize: size === 'small' ? '12px' : '14px',
    fontWeight: 600,
    fontFamily: 'var(--font-family)',
    transition: 'all 150ms ease',
  };

  const iconStyle = {
    fontSize: size === 'small' ? '16px' : '18px',
    lineHeight: 1,
  };

  return (
    <button
      onClick={toggleTheme}
      style={buttonStyle}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
    >
      <span style={iconStyle}>
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      {showLabel && (
        <span>
          {theme === 'light' ? 'Dark' : 'Light'} Theme
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;