import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  const businessFeatures = [
    {
      title: 'Business Command Center',
      description: 'Monitor your shop\'s daily health with smart indicators and voice summaries',
      icon: '🏠',
    },
    {
      title: 'Daily Business Assistant',
      description: 'Get AI-powered advice for stock placement, visibility, and selling psychology',
      icon: '📊',
    },
    {
      title: 'Smart Offer Planning',
      description: 'Plan strategic offers around festivals, salary cycles, and market rush days',
      icon: '📅',
    },
    {
      title: 'Customer Communication',
      description: 'WhatsApp reply templates in English, Tamil, and Hindi for all situations',
      icon: '💬',
    },
    {
      title: 'Competitor Awareness',
      description: 'Track competitor prices and get smart positioning advice',
      icon: '🎯',
    },
    {
      title: 'Brand Memory & Trust',
      description: 'Maintain consistent brand identity across all business communications',
      icon: '🏪',
    },
  ];

  const marketingFeatures = [
    {
      title: 'AI Image Generation',
      description: 'Create professional marketing images from text prompts',
      icon: '🎨',
    },
    {
      title: 'Smart Image Editor',
      description: 'Edit and enhance images with AI-powered tools',
      icon: '✨',
    },
    {
      title: 'Multiple Languages',
      description: 'Generate content in English, Tamil, and Hindi',
      icon: '🌍',
    },
    {
      title: 'Professional Quality',
      description: 'Enterprise-grade results for small business needs',
      icon: '⚡',
    },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <div className="content-container" style={{ paddingTop: 'var(--spacing-xxl)', paddingBottom: 'var(--spacing-xxl)' }}>
        <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>
            RetailGen AI - Complete Business Operating System
          </h1>
          <p style={{ 
            fontSize: '20px', 
            color: 'var(--color-text-primary)', 
            marginBottom: 'var(--spacing-md)',
            fontWeight: 600
          }}>
            Beyond Ads. Beyond Pricing. A Complete Business System.
          </p>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--color-text-secondary)', 
            marginBottom: 'var(--spacing-xxl)',
            lineHeight: '1.6'
          }}>
            RetailGen AI is not just a marketing tool. It is a complete business operating system 
            for Indian small vendors. From daily business advice to customer communication, 
            competitor analysis to brand management - everything you need to grow your business.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-lg)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register">
              <button className="btn btn-primary" style={{ padding: '0 var(--spacing-xl)' }}>
                Get Started
              </button>
            </Link>
            <Link to="/login">
              <button className="btn btn-secondary" style={{ padding: '0 var(--spacing-xl)' }}>
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Business Operating System Section */}
      <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-xxl) 0' }}>
        <div className="content-container">
          <div className="text-center mb-xxl">
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>
              Complete Business Operating System
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
              Everything you need to run and grow your small business
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: 'var(--spacing-xl)' 
          }}>
            {businessFeatures.map((feature, index) => (
              <div key={index} className="card">
                <div style={{ 
                  fontSize: '32px', 
                  marginBottom: 'var(--spacing-md)',
                  display: 'block'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marketing Tools Section */}
      <div className="content-container" style={{ padding: 'var(--spacing-xxl) 0' }}>
        <div className="text-center mb-xxl">
          <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>
            AI-Powered Marketing Tools
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
            Create professional marketing materials with advanced AI
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 'var(--spacing-lg)' 
        }}>
          {marketingFeatures.map((feature, index) => (
            <div key={index} className="card text-center">
              <div style={{ 
                fontSize: '48px', 
                marginBottom: 'var(--spacing-lg)',
                display: 'block'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
                {feature.title}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Gallery */}
      <div className="content-container" style={{ padding: 'var(--spacing-xxl) 0' }}>
        <div className="text-center mb-xxl">
          <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>
            AI-Generated Examples
          </h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            See what our AI can create for your business
          </p>
        </div>
        
        <div className="image-gallery">
          {[
            { seed: 'marketing-poster', title: 'Marketing Poster' },
            { seed: 'product-banner', title: 'Product Banner' },
            { seed: 'social-media', title: 'Social Media Post' },
            { seed: 'brochure-design', title: 'Brochure Design' }
          ].map((item, index) => (
            <div key={index} className="image-item">
              <img
                src={`https://picsum.photos/seed/${item.seed}/400/300`}
                alt={item.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: 'var(--spacing-md)' }}>
                <h3 style={{ fontSize: '16px' }}>{item.title}</h3>
                <p className="caption">Generated with AI</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-xxl) 0' }}>
        <div className="content-container text-center">
          <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>
            Ready to transform your creative workflow?
          </h2>
          <p style={{ 
            color: 'var(--color-text-secondary)', 
            marginBottom: 'var(--spacing-xl)',
            fontSize: '16px'
          }}>
            Join thousands of businesses already using PixCraft AI
          </p>
          <Link to="/register">
            <button className="btn btn-primary" style={{ padding: '0 var(--spacing-xxl)' }}>
              Start Creating Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;