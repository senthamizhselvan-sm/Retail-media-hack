import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const BusinessHome: React.FC = () => {
  const { user } = useAuth();
  const [businessHealth, setBusinessHealth] = useState<'Low' | 'Normal' | 'High'>('Normal');
  const [footfallTrend, setFootfallTrend] = useState<'Up' | 'Stable' | 'Down'>('Stable');
  const [priceStatus, setPriceStatus] = useState<'Competitive' | 'Premium' | 'Low'>('Competitive');
  const [offerFreshness, setOfferFreshness] = useState<'Fresh' | 'Aging' | 'Stale'>('Fresh');

  const playVoiceSummary = () => {
    const summary = `Today business looks ${businessHealth.toLowerCase()}. ${
      footfallTrend === 'Up' ? 'Customer footfall is increasing.' : 
      footfallTrend === 'Down' ? 'Customer footfall needs attention.' : 
      'Customer footfall is stable.'
    } Your prices are ${priceStatus.toLowerCase()}. ${
      offerFreshness === 'Fresh' ? 'Your offers are fresh and attractive.' :
      offerFreshness === 'Aging' ? 'Consider updating your offers soon.' :
      'Time to create new offers.'
    }`;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(summary);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'High': case 'Up': case 'Fresh': case 'Competitive': return '#10B981';
      case 'Normal': case 'Stable': case 'Premium': case 'Aging': return '#F59E0B';
      case 'Low': case 'Down': case 'Stale': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'High': case 'Up': case 'Fresh': case 'Competitive': return '📈';
      case 'Normal': case 'Stable': case 'Premium': case 'Aging': return '📊';
      case 'Low': case 'Down': case 'Stale': return '📉';
      default: return '📊';
    }
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xxl)', paddingBottom: 'var(--spacing-xxl)' }}>
      <div className="fade-in">
        <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>
          Business Command Center
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xxl)' }}>
          How is your shop doing today, {user?.name}?
        </p>

        {/* Business Health Overview */}
        <div className="card slide-up" style={{ marginBottom: 'var(--spacing-xxl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
            <h2>Today's Business Health</h2>
            <button 
              onClick={playVoiceSummary}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}
            >
              🔊 Voice Summary
            </button>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 'var(--spacing-lg)' 
          }}>
            {/* Overall Health */}
            <div style={{
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--border-radius)',
              border: `2px solid ${getHealthColor(businessHealth)}`,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-sm)' }}>
                {getHealthIcon(businessHealth)}
              </div>
              <h3 style={{ color: getHealthColor(businessHealth), marginBottom: 'var(--spacing-xs)' }}>
                {businessHealth}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Overall Business Health
              </p>
            </div>

            {/* Footfall Trend */}
            <div style={{
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--border-radius)',
              border: `2px solid ${getHealthColor(footfallTrend)}`,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-sm)' }}>
                👥
              </div>
              <h3 style={{ color: getHealthColor(footfallTrend), marginBottom: 'var(--spacing-xs)' }}>
                {footfallTrend}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Customer Footfall
              </p>
            </div>

            {/* Price Competitiveness */}
            <div style={{
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--border-radius)',
              border: `2px solid ${getHealthColor(priceStatus)}`,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-sm)' }}>
                💰
              </div>
              <h3 style={{ color: getHealthColor(priceStatus), marginBottom: 'var(--spacing-xs)' }}>
                {priceStatus}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Price Position
              </p>
            </div>

            {/* Offer Freshness */}
            <div style={{
              padding: 'var(--spacing-lg)',
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--border-radius)',
              border: `2px solid ${getHealthColor(offerFreshness)}`,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-sm)' }}>
                🎯
              </div>
              <h3 style={{ color: getHealthColor(offerFreshness), marginBottom: 'var(--spacing-xs)' }}>
                {offerFreshness}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Offer Status
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card slide-up">
          <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Quick Business Actions</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 'var(--spacing-md)' 
          }}>
            <button 
              className="btn btn-primary"
              style={{ padding: 'var(--spacing-lg)', height: 'auto', flexDirection: 'column', gap: 'var(--spacing-sm)' }}
            >
              <span style={{ fontSize: '24px' }}>📊</span>
              <span>Check Daily Advice</span>
            </button>

            <button 
              className="btn btn-secondary"
              style={{ padding: 'var(--spacing-lg)', height: 'auto', flexDirection: 'column', gap: 'var(--spacing-sm)' }}
            >
              <span style={{ fontSize: '24px' }}>📅</span>
              <span>Plan Offers</span>
            </button>

            <button 
              className="btn btn-secondary"
              style={{ padding: 'var(--spacing-lg)', height: 'auto', flexDirection: 'column', gap: 'var(--spacing-sm)' }}
            >
              <span style={{ fontSize: '24px' }}>💬</span>
              <span>Customer Replies</span>
            </button>

            <button 
              className="btn btn-secondary"
              style={{ padding: 'var(--spacing-lg)', height: 'auto', flexDirection: 'column', gap: 'var(--spacing-sm)' }}
            >
              <span style={{ fontSize: '24px' }}>🏪</span>
              <span>Brand Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessHome;