import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container flex-between">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 style={{ color: 'var(--color-text-primary)' }}>
            PixCraft AI
          </h2>
        </Link>

        <div style={{ display: 'flex', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                style={{ 
                  color: 'var(--color-text-primary)', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                Dashboard
              </Link>
              <Link 
                to="/generate" 
                style={{ 
                  color: 'var(--color-text-primary)', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                Generate
              </Link>
              <Link 
                to="/editor" 
                style={{ 
                  color: 'var(--color-text-primary)', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                Editor
              </Link>
              <Link 
                to="/favorites" 
                style={{ 
                  color: 'var(--color-text-primary)', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                Favorites
              </Link>
              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  style={{ 
                    color: 'var(--color-text-primary)', 
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: 600
                  }}
                >
                  Admin
                </Link>
              )}
              <Link 
                to="/profile" 
                style={{ 
                  color: 'var(--color-text-primary)', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                Profile
              </Link>
              
              <div style={{ 
                borderLeft: '1px solid var(--color-border)', 
                paddingLeft: 'var(--spacing-lg)',
                display: 'flex',
                gap: 'var(--spacing-md)',
                alignItems: 'center'
              }}>
                <ThemeToggle showLabel={false} size="small" />
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <ThemeToggle showLabel={false} size="small" />
              <Link 
                to="/login" 
                style={{ 
                  color: 'var(--color-text-primary)', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                Login
              </Link>
              <Link to="/register">
                <button className="btn btn-primary">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;