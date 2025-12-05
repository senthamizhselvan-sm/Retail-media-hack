'use client'

import { useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Call API service - FIXED: Use login, not signup
      const response = await api.login(email, password)
      
      // Store user data
      localStorage.setItem('creativeUser', JSON.stringify(response.user))
      localStorage.setItem('authToken', response.token)
      
      // Redirect to dashboard
      window.location.href = '/dashboard'
      
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please try again.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Back to Home */}
        <Link href="/" className="back-home">
          ← Back to Home
        </Link>

        {/* Auth Card */}
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <div className="logo-icon">CG</div>
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your CreativeGenius account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-btn">
              Sign In
            </button>

            <div className="divider">
              <span>Or continue with</span>
            </div>

            <button type="button" className="google-btn">
              <svg className="google-icon" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="auth-footer">
              <p>
                Don't have an account?{' '}
                <Link href="/signup" className="auth-link">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }
        
        .auth-container {
          width: 100%;
          max-width: 440px;
        }
        
        .back-home {
          display: inline-block;
          color: white;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 20px;
          transition: opacity 0.3s ease;
        }
        
        .back-home:hover {
          opacity: 0.8;
        }
        
        .auth-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .auth-logo {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .logo-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 24px;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        }
        
        .auth-title {
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }
        
        .auth-subtitle {
          color: #6b7280;
          font-size: 16px;
        }
        
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .form-group label {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }
        
        .form-group input {
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        
        .form-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          color: #6b7280;
        }
        
        .checkbox input {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }
        
        .forgot-password {
          color: #667eea;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
        }
        
        .forgot-password:hover {
          text-decoration: underline;
        }
        
        .auth-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 14px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .auth-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        
        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          color: #9ca3af;
          font-size: 14px;
        }
        
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .divider span {
          padding: 0 16px;
        }
        
        .google-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: white;
          border: 2px solid #e5e7eb;
          padding: 12px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .google-btn:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }
        
        .google-icon {
          width: 20px;
          height: 20px;
        }
        
        .auth-footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }
        
        .auth-footer p {
          color: #6b7280;
          font-size: 15px;
        }
        
        .auth-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }
        
        .auth-link:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 480px) {
          .auth-card {
            padding: 30px 20px;
          }
          
          .auth-title {
            font-size: 24px;
          }
          
          .form-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  )
}