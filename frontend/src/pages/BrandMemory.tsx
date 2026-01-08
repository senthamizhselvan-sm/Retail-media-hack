import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface BrandSettings {
  shopName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  language: 'english' | 'tamil' | 'hindi';
  tone: 'formal' | 'friendly' | 'professional';
  tagline: string;
  address: string;
  phone: string;
  isLocked: boolean;
}

const BrandMemory: React.FC = () => {
  const { user } = useAuth();
  const [brandSettings, setBrandSettings] = useState<BrandSettings>({
    shopName: '',
    logo: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    language: 'english',
    tone: 'friendly',
    tagline: '',
    address: '',
    phone: '',
    isLocked: false
  });
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Load saved brand settings from localStorage
    const saved = localStorage.getItem('brandSettings');
    if (saved) {
      setBrandSettings(JSON.parse(saved));
    }
  }, []);

  const saveBrandSettings = () => {
    localStorage.setItem('brandSettings', JSON.stringify(brandSettings));
    // Here you would also save to backend
    alert('Brand settings saved successfully!');
  };

  const lockBrandSettings = () => {
    const updatedSettings = { ...brandSettings, isLocked: true };
    setBrandSettings(updatedSettings);
    localStorage.setItem('brandSettings', JSON.stringify(updatedSettings));
    alert('Brand settings locked! This will ensure consistency across all your marketing materials.');
  };

  const unlockBrandSettings = () => {
    const updatedSettings = { ...brandSettings, isLocked: false };
    setBrandSettings(updatedSettings);
    localStorage.setItem('brandSettings', JSON.stringify(updatedSettings));
  };

  const resetBrandSettings = () => {
    if (window.confirm('Are you sure you want to reset all brand settings?')) {
      const defaultSettings: BrandSettings = {
        shopName: '',
        logo: '',
        primaryColor: '#3B82F6',
        secondaryColor: '#10B981',
        language: 'english',
        tone: 'friendly',
        tagline: '',
        address: '',
        phone: '',
        isLocked: false
      };
      setBrandSettings(defaultSettings);
      localStorage.removeItem('brandSettings');
    }
  };

  const generateSampleContent = () => {
    const samples = {
      english: {
        formal: `Welcome to ${brandSettings.shopName}. We provide quality products with professional service. ${brandSettings.tagline}`,
        friendly: `Hi! Welcome to ${brandSettings.shopName}! 😊 We're here to help you with the best products. ${brandSettings.tagline}`,
        professional: `${brandSettings.shopName} - Your trusted partner for quality products. ${brandSettings.tagline}`
      },
      tamil: {
        formal: `${brandSettings.shopName} இல் உங்களை வரவேற்கிறோம். தரமான பொருட்கள் மற்றும் சேவை வழங்குகிறோம்.`,
        friendly: `வணக்கம்! ${brandSettings.shopName} இல் உங்களை வரவேற்கிறோம்! 😊 சிறந்த பொருட்களுடன் உங்களுக்கு சேவை செய்ய தயாராக உள்ளோம்.`,
        professional: `${brandSettings.shopName} - தரமான பொருட்களுக்கான உங்கள் நம்பகமான கூட்டாளர்.`
      },
      hindi: {
        formal: `${brandSettings.shopName} में आपका स्वागत है। हम गुणवत्तापूर्ण उत्पाद और पेशेवर सेवा प्रदान करते हैं।`,
        friendly: `नमस्ते! ${brandSettings.shopName} में आपका स्वागत है! 😊 हम आपको बेहतरीन उत्पादों के साथ सेवा देने के लिए तैयार हैं।`,
        professional: `${brandSettings.shopName} - गुणवत्तापूर्ण उत्पादों के लिए आपका विश्वसनीय साझीदार।`
      }
    };

    return samples[brandSettings.language][brandSettings.tone];
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xxl)', paddingBottom: 'var(--spacing-xxl)' }}>
      <div className="fade-in">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
          <div>
            <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>
              Brand Memory & Trust Mode
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Create consistent brand identity across all your business communications
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
            <button 
              onClick={() => setPreviewMode(!previewMode)}
              className={previewMode ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              {previewMode ? '📝 Edit Mode' : '👁️ Preview Mode'}
            </button>
            
            {brandSettings.isLocked ? (
              <button 
                onClick={unlockBrandSettings}
                className="btn btn-secondary"
                style={{ color: '#EF4444' }}
              >
                🔓 Unlock Settings
              </button>
            ) : (
              <button 
                onClick={lockBrandSettings}
                className="btn btn-primary"
                disabled={!brandSettings.shopName}
              >
                🔒 Lock Brand
              </button>
            )}
          </div>
        </div>

        {brandSettings.isLocked && (
          <div style={{
            padding: 'var(--spacing-md)',
            backgroundColor: '#10B98120',
            border: '2px solid #10B981',
            borderRadius: 'var(--border-radius)',
            marginBottom: 'var(--spacing-xxl)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)'
          }}>
            <span style={{ fontSize: '24px' }}>🔒</span>
            <div>
              <h3 style={{ margin: 0, color: '#10B981' }}>Brand Settings Locked</h3>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Your brand identity is protected. All future marketing materials will use these consistent settings.
              </p>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: previewMode ? '1fr' : '1fr 1fr', gap: 'var(--spacing-xxl)' }}>
          {/* Settings Panel */}
          {!previewMode && (
            <div>
              {/* Basic Information */}
              <div className="card slide-up" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Basic Information</h2>
                
                <div className="form-group">
                  <label className="label">Shop Name *</label>
                  <input
                    type="text"
                    className="input"
                    value={brandSettings.shopName}
                    onChange={(e) => setBrandSettings({...brandSettings, shopName: e.target.value})}
                    placeholder="Enter your shop name"
                    disabled={brandSettings.isLocked}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Tagline</label>
                  <input
                    type="text"
                    className="input"
                    value={brandSettings.tagline}
                    onChange={(e) => setBrandSettings({...brandSettings, tagline: e.target.value})}
                    placeholder="e.g., Quality Products, Best Prices"
                    disabled={brandSettings.isLocked}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Logo URL</label>
                  <input
                    type="url"
                    className="input"
                    value={brandSettings.logo}
                    onChange={(e) => setBrandSettings({...brandSettings, logo: e.target.value})}
                    placeholder="https://example.com/logo.png"
                    disabled={brandSettings.isLocked}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="label">Address</label>
                    <input
                      type="text"
                      className="input"
                      value={brandSettings.address}
                      onChange={(e) => setBrandSettings({...brandSettings, address: e.target.value})}
                      placeholder="Shop address"
                      disabled={brandSettings.isLocked}
                    />
                  </div>
                  <div className="form-group">
                    <label className="label">Phone</label>
                    <input
                      type="tel"
                      className="input"
                      value={brandSettings.phone}
                      onChange={(e) => setBrandSettings({...brandSettings, phone: e.target.value})}
                      placeholder="Phone number"
                      disabled={brandSettings.isLocked}
                    />
                  </div>
                </div>
              </div>

              {/* Brand Style */}
              <div className="card slide-up" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Brand Style</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="label">Primary Color</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                      <input
                        type="color"
                        value={brandSettings.primaryColor}
                        onChange={(e) => setBrandSettings({...brandSettings, primaryColor: e.target.value})}
                        disabled={brandSettings.isLocked}
                        style={{ width: '50px', height: '40px', border: 'none', borderRadius: '4px' }}
                      />
                      <input
                        type="text"
                        className="input"
                        value={brandSettings.primaryColor}
                        onChange={(e) => setBrandSettings({...brandSettings, primaryColor: e.target.value})}
                        disabled={brandSettings.isLocked}
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="label">Secondary Color</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                      <input
                        type="color"
                        value={brandSettings.secondaryColor}
                        onChange={(e) => setBrandSettings({...brandSettings, secondaryColor: e.target.value})}
                        disabled={brandSettings.isLocked}
                        style={{ width: '50px', height: '40px', border: 'none', borderRadius: '4px' }}
                      />
                      <input
                        type="text"
                        className="input"
                        value={brandSettings.secondaryColor}
                        onChange={(e) => setBrandSettings({...brandSettings, secondaryColor: e.target.value})}
                        disabled={brandSettings.isLocked}
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="label">Preferred Language</label>
                    <select
                      className="input"
                      value={brandSettings.language}
                      onChange={(e) => setBrandSettings({...brandSettings, language: e.target.value as any})}
                      disabled={brandSettings.isLocked}
                    >
                      <option value="english">English</option>
                      <option value="tamil">தமிழ் (Tamil)</option>
                      <option value="hindi">हिंदी (Hindi)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="label">Communication Tone</label>
                    <select
                      className="input"
                      value={brandSettings.tone}
                      onChange={(e) => setBrandSettings({...brandSettings, tone: e.target.value as any})}
                      disabled={brandSettings.isLocked}
                    >
                      <option value="formal">Formal</option>
                      <option value="friendly">Friendly</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {!brandSettings.isLocked && (
                <div className="card slide-up">
                  <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <button 
                      onClick={saveBrandSettings}
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                    >
                      💾 Save Settings
                    </button>
                    <button 
                      onClick={resetBrandSettings}
                      className="btn btn-secondary"
                    >
                      🔄 Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Preview Panel */}
          <div className={previewMode ? '' : ''}>
            <div className="card slide-up" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Brand Preview</h2>
              
              {/* Business Card Preview */}
              <div style={{
                padding: 'var(--spacing-xl)',
                background: `linear-gradient(135deg, ${brandSettings.primaryColor}, ${brandSettings.secondaryColor})`,
                borderRadius: 'var(--border-radius)',
                color: 'white',
                marginBottom: 'var(--spacing-lg)',
                textAlign: 'center'
              }}>
                {brandSettings.logo && (
                  <img 
                    src={brandSettings.logo} 
                    alt="Logo" 
                    style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: 'var(--spacing-md)' }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                <h2 style={{ margin: 0, marginBottom: 'var(--spacing-sm)' }}>
                  {brandSettings.shopName || 'Your Shop Name'}
                </h2>
                {brandSettings.tagline && (
                  <p style={{ margin: 0, opacity: 0.9, fontSize: '14px', marginBottom: 'var(--spacing-sm)' }}>
                    {brandSettings.tagline}
                  </p>
                )}
                {brandSettings.address && (
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
                    📍 {brandSettings.address}
                  </p>
                )}
                {brandSettings.phone && (
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
                    📞 {brandSettings.phone}
                  </p>
                )}
              </div>

              {/* Sample Content */}
              <div>
                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Sample Marketing Content</h3>
                <div style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--color-background)',
                  borderRadius: 'var(--border-radius)',
                  border: `2px solid ${brandSettings.primaryColor}20`,
                  borderLeft: `4px solid ${brandSettings.primaryColor}`,
                  lineHeight: '1.6'
                }}>
                  {generateSampleContent()}
                </div>
              </div>
            </div>

            {/* Brand Consistency Indicator */}
            <div className="card slide-up">
              <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Brand Consistency Status</h3>
              
              <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                {[
                  { item: 'Shop Name', status: brandSettings.shopName ? 'complete' : 'missing', value: brandSettings.shopName },
                  { item: 'Brand Colors', status: 'complete', value: `${brandSettings.primaryColor}, ${brandSettings.secondaryColor}` },
                  { item: 'Language', status: 'complete', value: brandSettings.language },
                  { item: 'Communication Tone', status: 'complete', value: brandSettings.tone },
                  { item: 'Logo', status: brandSettings.logo ? 'complete' : 'optional', value: brandSettings.logo ? 'Set' : 'Not set' },
                  { item: 'Contact Info', status: brandSettings.address && brandSettings.phone ? 'complete' : 'partial', value: `${brandSettings.address ? '✓' : '✗'} Address, ${brandSettings.phone ? '✓' : '✗'} Phone` }
                ].map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 'var(--spacing-sm)',
                    backgroundColor: 'var(--color-background)',
                    borderRadius: 'var(--border-radius)',
                    border: `2px solid ${
                      item.status === 'complete' ? '#10B981' : 
                      item.status === 'partial' ? '#F59E0B' : 
                      item.status === 'optional' ? '#6B7280' : '#EF4444'
                    }20`
                  }}>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      backgroundColor: 
                        item.status === 'complete' ? '#10B981' : 
                        item.status === 'partial' ? '#F59E0B' : 
                        item.status === 'optional' ? '#6B7280' : '#EF4444',
                      marginRight: 'var(--spacing-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {item.status === 'complete' ? '✓' : 
                       item.status === 'partial' ? '!' : 
                       item.status === 'optional' ? '?' : '✗'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '14px' }}>{item.item}</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ 
                marginTop: 'var(--spacing-lg)', 
                padding: 'var(--spacing-md)', 
                backgroundColor: brandSettings.isLocked ? '#10B98120' : '#F59E0B20',
                borderRadius: 'var(--border-radius)',
                textAlign: 'center'
              }}>
                <h4 style={{ margin: 0, marginBottom: 'var(--spacing-xs)', color: brandSettings.isLocked ? '#10B981' : '#F59E0B' }}>
                  {brandSettings.isLocked ? '🔒 Brand Locked' : '⚠️ Brand Unlocked'}
                </h4>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                  {brandSettings.isLocked 
                    ? 'Your brand identity is protected and will be applied consistently across all materials.'
                    : 'Lock your brand settings to ensure consistency across all your marketing materials.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandMemory;