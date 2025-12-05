'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api, mockStats, mockCreatives } from '@/lib/api'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState(mockStats)
  const [creatives, setCreatives] = useState(mockCreatives)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('creativeUser')
    if (!storedUser) {
      router.push('/login')
      return
    }
    
    setUser(JSON.parse(storedUser))
    
    // In real app, fetch data from API
    // api.getDashboardStats().then(setStats)
    // api.getRecentCreatives().then(setCreatives)
  }, [router])

  const handleLogout = async () => {
    setLoading(true)
    try {
      await api.logout()
      localStorage.removeItem('creativeUser')
      localStorage.removeItem('authToken')
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCreative = async () => {
    setLoading(true)
    try {
      const newCreative = await api.createCreative({
        title: 'New Creative',
        platform: 'Amazon',
        thumbnail: 'https://via.placeholder.com/300x200'
      })
      setCreatives([newCreative, ...creatives])
      alert('Creative created! Check the first item in the list.')
    } catch (error) {
      console.error('Create failed:', error)
      alert('Failed to create creative')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCreative = async (id: number) => {
    if (!confirm('Delete this creative?')) return
    
    setLoading(true)
    try {
      await api.deleteCreative(id)
      setCreatives(creatives.filter(c => c.id !== id))
      alert('Creative deleted!')
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Failed to delete creative')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link href="/">
                <span className="logo-icon">🎨</span>
                <span className="logo-text">CreativeGenius</span>
              </Link>
            </div>

            <div className="user-menu">
              <div className="user-info">
                <div className="avatar">{user.name.charAt(0)}</div>
                <span className="username">{user.name}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="logout-btn"
                disabled={loading}
              >
                {loading ? '...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1>Welcome back, {user.name}! 👋</h1>
            <p>Here's what's happening with your creatives</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">✨</div>
              <div className="stat-content">
                <h3>{stats.creativesGenerated}</h3>
                <p>Creatives Generated</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-content">
                <h3>{stats.streakDays} days</h3>
                <p>Current Streak</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <h3>{stats.xpPoints}</h3>
                <p>XP Points</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <h3>{stats.badges.length}</h3>
                <p>Badges Earned</p>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="actions-section">
            <button 
              onClick={handleCreateCreative} 
              className="create-btn"
              disabled={loading}
            >
              🎨 Create New Creative
            </button>
            <Link href="/editor" className="editor-link">
              ⚡ Go to Editor
            </Link>
          </div>

          {/* Recent Creatives */}
          <div className="creatives-section">
            <h2>Recent Creatives</h2>
            
            <div className="creatives-grid">
              {creatives.map(creative => (
                <div key={creative.id} className="creative-card">
                  <div className="creative-header">
                    <span className={`status-badge ${creative.status}`}>
                      {creative.status}
                    </span>
                    <span className="platform">{creative.platform}</span>
                  </div>
                  
                  <div className="creative-body">
                    <h4>{creative.title}</h4>
                    <p className="date">Created {creative.date}</p>
                  </div>
                  
                  <div className="creative-actions">
                    <button className="action-btn view-btn">👁️ View</button>
                    <button className="action-btn edit-btn">✏️ Edit</button>
                    <button 
                      onClick={() => handleDeleteCreative(creative.id)} 
                      className="action-btn delete-btn"
                      disabled={loading}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Integration Info */}
          <div className="integration-info">
            <h3>📋 Backend Integration Points</h3>
            <div className="endpoints-list">
              <div className="endpoint">
                <code>POST /api/auth/login</code>
                <span>Replace mock login in api.ts</span>
              </div>
              <div className="endpoint">
                <code>POST /api/auth/signup</code>
                <span>Replace mock signup in api.ts</span>
              </div>
              <div className="endpoint">
                <code>GET /api/dashboard/stats</code>
                <span>Replace getDashboardStats in api.ts</span>
              </div>
              <div className="endpoint">
                <code>GET /api/creatives</code>
                <span>Replace getRecentCreatives in api.ts</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          background: #f8fafc;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Header */
        .header {
          background: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          padding: 15px 0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo a {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #1f2937;
        }

        .logo-icon {
          font-size: 24px;
        }

        .logo-text {
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }

        .username {
          font-weight: 600;
          color: #374151;
        }

        .logout-btn {
          padding: 8px 16px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.3s;
        }

        .logout-btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .logout-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Main Content */
        .main-content {
          padding: 40px 0;
        }

        .welcome-section {
          margin-bottom: 40px;
        }

        .welcome-section h1 {
          font-size: 32px;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .welcome-section p {
          color: #6b7280;
          font-size: 18px;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .stat-icon {
          font-size: 32px;
        }

        .stat-content h3 {
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 4px 0;
        }

        .stat-content p {
          color: #6b7280;
          margin: 0;
        }

        /* Actions Section */
        .actions-section {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .create-btn {
          padding: 14px 28px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .create-btn:hover:not(:disabled) {
          transform: translateY(-3px);
        }

        .create-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .editor-link {
          padding: 14px 28px;
          background: white;
          border: 2px solid #667eea;
          color: #667eea;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
        }

        .editor-link:hover {
          background: #667eea;
          color: white;
        }

        /* Creatives Section */
        .creatives-section {
          margin-bottom: 40px;
        }

        .creatives-section h2 {
          font-size: 24px;
          color: #1f2937;
          margin-bottom: 20px;
        }

        .creatives-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .creative-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .creative-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-badge.approved {
          background: #d1fae5;
          color: #059669;
        }

        .status-badge.pending {
          background: #fef3c7;
          color: #d97706;
        }

        .status-badge.rejected {
          background: #fee2e2;
          color: #dc2626;
        }

        .platform {
          color: #6b7280;
          font-size: 14px;
          font-weight: 600;
        }

        .creative-body h4 {
          font-size: 18px;
          color: #1f2937;
          margin: 0 0 8px 0;
        }

        .date {
          color: #9ca3af;
          font-size: 14px;
          margin: 0;
        }

        .creative-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .action-btn {
          flex: 1;
          padding: 8px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: opacity 0.3s;
        }

        .view-btn { background: #dbeafe; color: #1d4ed8; }
        .edit-btn { background: #f3e8ff; color: #7c3aed; }
        .delete-btn { background: #fee2e2; color: #dc2626; }

        .action-btn:hover:not(:disabled) {
          opacity: 0.8;
        }

        .action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Integration Info */
        .integration-info {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .integration-info h3 {
          color: #1f2937;
          margin-bottom: 20px;
        }

        .endpoints-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .endpoint {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 12px;
          background: #f3f4f6;
          border-radius: 8px;
        }

        .endpoint code {
          background: #1f2937;
          color: #f3f4f6;
          padding: 6px 12px;
          border-radius: 4px;
          font-family: monospace;
          min-width: 200px;
        }

        .endpoint span {
          color: #6b7280;
          font-size: 14px;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          font-size: 18px;
          color: #667eea;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 15px;
          }

          .actions-section {
            flex-direction: column;
          }

          .endpoint {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .endpoint code {
            min-width: auto;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}