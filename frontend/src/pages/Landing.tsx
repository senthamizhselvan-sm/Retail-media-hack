import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  const features = [
    {
      title: 'AI Image Generation',
      description: 'Create professional images from text prompts using advanced AI technology',
      icon: '🎨',
    },
    {
      title: 'Smart Editor',
      description: 'Edit and enhance images with AI-powered tools and intelligent processing',
      icon: '✨',
    },
    {
      title: 'Multiple Styles',
      description: 'Choose from various artistic styles and professional formats',
      icon: '🖼️',
    },
    {
      title: 'Fast Processing',
      description: 'Generate professional marketing creatives in seconds, not hours',
      icon: '⚡',
    },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <div className="content-container" style={{ paddingTop: 'var(--spacing-xxl)', paddingBottom: 'var(--spacing-xxl)' }}>
        <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>
            Create Professional Marketing Creatives with AI
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--color-text-secondary)', 
            marginBottom: 'var(--spacing-xxl)',
            lineHeight: '1.6'
          }}>
            Transform your creative production with intelligent AI-powered tools. 
            Generate professional marketing materials without needing a design team.
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

      {/* Features Section */}
      <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-xxl) 0' }}>
        <div className="content-container">
          <div className="text-center mb-xxl">
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>
              Everything you need for creative production
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
              Professional-grade AI tools designed for modern marketing teams
            </p>
          </div>
          
          <div className="grid grid-4">
            {features.map((feature, index) => (
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