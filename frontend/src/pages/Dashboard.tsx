import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    { 
      title: 'AI Orchestrator', 
      description: 'Natural language AI requests',
      icon: '🤖', 
      link: '/generate',
      primary: true
    },
    { 
      title: 'Generate Images', 
      description: 'Create images from text prompts',
      icon: '🎨', 
      link: '/generate'
    },
    { 
      title: 'Edit Images', 
      description: 'Enhance and modify existing images',
      icon: '✨', 
      link: '/editor'
    },
    { 
      title: 'My Favorites', 
      description: 'View saved creations',
      icon: '❤️', 
      link: '/favorites'
    },
  ];

  const recentStats = [
    { label: 'Images Generated', value: '24', trend: '+12%' },
    { label: 'Images Edited', value: '8', trend: '+5%' },
    { label: 'Favorites Saved', value: '16', trend: '+8%' },
    { label: 'Projects Created', value: '6', trend: '+2%' },
  ];

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xxl)', paddingBottom: 'var(--spacing-xxl)' }}>
      <div className="fade-in">
        <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>
          Welcome back, {user?.name}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xxl)' }}>
          What would you like to create today?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="slide-up" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>Quick Actions</h2>
        <div className="grid grid-2">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} style={{ textDecoration: 'none' }}>
              <div className={`card ${action.primary ? 'primary-action' : ''}`} style={{ 
                cursor: 'pointer',
                transition: 'all 150ms ease',
                ...(action.primary && {
                  borderColor: 'var(--color-primary)',
                  backgroundColor: '#DEECF9'
                })
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-lg)' }}>
                  <div style={{ 
                    fontSize: '32px',
                    minWidth: '48px',
                    textAlign: 'center'
                  }}>
                    {action.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      marginBottom: 'var(--spacing-sm)',
                      color: action.primary ? 'var(--color-primary)' : 'var(--color-text-primary)'
                    }}>
                      {action.title}
                    </h3>
                    <p style={{ 
                      color: 'var(--color-text-secondary)',
                      fontSize: '14px'
                    }}>
                      {action.description}
                    </p>
                    {action.primary && (
                      <div className="status-processing mt-md" style={{ display: 'inline-block' }}>
                        New Feature
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="slide-up" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>Activity Overview</h2>
        <div className="grid grid-4">
          {recentStats.map((stat, index) => (
            <div key={index} className="card text-center">
              <h3 style={{ 
                fontSize: '24px', 
                color: 'var(--color-primary)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                {stat.value}
              </h3>
              <p style={{ 
                marginBottom: 'var(--spacing-xs)',
                fontSize: '14px'
              }}>
                {stat.label}
              </p>
              <span className="status-success" style={{ fontSize: '12px' }}>
                {stat.trend}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="slide-up">
        <div className="flex-between mb-xl">
          <h2>Recent Activity</h2>
          <Link to="/favorites">
            <button className="btn btn-secondary">View All</button>
          </Link>
        </div>
        
        <div className="card">
          <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            <p>Your recent creations will appear here</p>
            <Link to="/generate" style={{ marginTop: 'var(--spacing-md)', display: 'inline-block' }}>
              <button className="btn btn-primary">Create Your First Image</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Access */}
      {user?.role === 'admin' && (
        <div className="slide-up mt-xxl">
          <div className="card" style={{ 
            borderColor: 'var(--color-error)',
            backgroundColor: '#FDE7E9'
          }}>
            <div className="flex-between">
              <div>
                <h3 style={{ color: 'var(--color-error)', marginBottom: 'var(--spacing-sm)' }}>
                  Administrator Access
                </h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Manage users, view system statistics, and monitor application health
                </p>
              </div>
              <Link to="/admin">
                <button className="btn btn-destructive">
                  Admin Panel
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;