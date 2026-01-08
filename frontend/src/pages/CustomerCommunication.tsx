import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface ReplyTemplate {
  id: string;
  category: string;
  situation: string;
  template: string;
  language: 'english' | 'tamil' | 'hindi';
}

const CustomerCommunication: React.FC = () => {
  const { } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('price');
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'tamil' | 'hindi'>('english');
  const [customContext, setCustomContext] = useState<string>('');
  const [generatedReply, setGeneratedReply] = useState<string>('');

  const categories = [
    { id: 'price', name: 'Price Queries', icon: '💰' },
    { id: 'availability', name: 'Stock Availability', icon: '📦' },
    { id: 'delivery', name: 'Delivery Timing', icon: '🚚' },
    { id: 'discount', name: 'Discount Negotiation', icon: '🏷️' },
    { id: 'quality', name: 'Product Quality', icon: '⭐' },
    { id: 'general', name: 'General Inquiries', icon: '💬' }
  ];

  const replyTemplates: ReplyTemplate[] = [
    // Price Queries
    {
      id: '1',
      category: 'price',
      situation: 'Customer asking for price',
      template: 'Hello! The price for {product} is ₹{price}. We offer the best quality at competitive rates. Thank you!',
      language: 'english'
    },
    {
      id: '2',
      category: 'price',
      situation: 'Customer asking for price',
      template: 'வணக்கம்! {product} விலை ₹{price}. நல்ல தரத்தில் குறைந்த விலையில் கிடைக்கும். நன்றி!',
      language: 'tamil'
    },
    {
      id: '3',
      category: 'price',
      situation: 'Customer asking for price',
      template: 'नमस्ते! {product} की कीमत ₹{price} है। अच्छी गुणवत्ता में उपलब्ध है। धन्यवाद!',
      language: 'hindi'
    },

    // Availability
    {
      id: '4',
      category: 'availability',
      situation: 'Product in stock',
      template: 'Yes, {product} is available! We have fresh stock. You can visit our shop or we can arrange delivery. Thank you!',
      language: 'english'
    },
    {
      id: '5',
      category: 'availability',
      situation: 'Product in stock',
      template: 'ஆம், {product} கிடைக்கும்! புதிய ஸ்டாக் உள்ளது. கடைக்கு வரலாம் அல்லது டெலிவரி செய்யலாம். நன்றி!',
      language: 'tamil'
    },
    {
      id: '6',
      category: 'availability',
      situation: 'Product out of stock',
      template: 'Sorry, {product} is currently out of stock. Will be available by {date}. I will inform you once it arrives. Thank you for understanding!',
      language: 'english'
    },

    // Delivery
    {
      id: '7',
      category: 'delivery',
      situation: 'Delivery timing inquiry',
      template: 'We can deliver within {time} hours. Delivery charge is ₹{charge} for orders above ₹{minimum}. Free delivery for orders above ₹{free_limit}!',
      language: 'english'
    },
    {
      id: '8',
      category: 'delivery',
      situation: 'Delivery timing inquiry',
      template: '{time} மணி நேரத்தில் டெலிவரி செய்யலாம். ₹{minimum} க்கு மேல் ஆர்டர் செய்தால் ₹{charge} டெலிவரி சார்ஜ். ₹{free_limit} க்கு மேல் இலவச டெலிவரி!',
      language: 'tamil'
    },

    // Discount Negotiation
    {
      id: '9',
      category: 'discount',
      situation: 'Customer asking for discount',
      template: 'Our prices are already very competitive! For bulk orders above ₹{bulk_amount}, we can offer {discount}% discount. Thank you!',
      language: 'english'
    },
    {
      id: '10',
      category: 'discount',
      situation: 'Customer asking for discount',
      template: 'हमारी कीमतें पहले से ही बहुत अच्छी हैं! ₹{bulk_amount} से ज्यादा के ऑर्डर पर {discount}% छूट दे सकते हैं। धन्यवाद!',
      language: 'hindi'
    },

    // Quality Assurance
    {
      id: '11',
      category: 'quality',
      situation: 'Quality inquiry',
      template: 'We guarantee 100% quality! All products are fresh and checked. If any issue, we provide full replacement. Your satisfaction is our priority!',
      language: 'english'
    },

    // General
    {
      id: '12',
      category: 'general',
      situation: 'General greeting',
      template: 'Hello! Welcome to our shop. How can I help you today? We have fresh stock of all items. Thank you for choosing us!',
      language: 'english'
    }
  ];

  const filteredTemplates = replyTemplates.filter(
    template => template.category === selectedCategory && template.language === selectedLanguage
  );

  const generateContextualReply = () => {
    if (!customContext.trim()) return;

    const baseTemplate = filteredTemplates[0];
    if (!baseTemplate) return;

    // Simple AI-like contextual generation
    let contextualReply = '';
    
    if (customContext.toLowerCase().includes('urgent')) {
      contextualReply = 'I understand this is urgent. ';
    }
    
    if (customContext.toLowerCase().includes('bulk') || customContext.toLowerCase().includes('wholesale')) {
      contextualReply += 'For bulk orders, we offer special rates. ';
    }
    
    if (customContext.toLowerCase().includes('festival') || customContext.toLowerCase().includes('celebration')) {
      contextualReply += 'For festival season, we have special offers. ';
    }

    contextualReply += baseTemplate.template;
    
    // Add polite closing based on context
    if (customContext.toLowerCase().includes('complaint') || customContext.toLowerCase().includes('problem')) {
      contextualReply += ' We apologize for any inconvenience and will resolve this immediately.';
    }

    setGeneratedReply(contextualReply);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xxl)', paddingBottom: 'var(--spacing-xxl)' }}>
      <div className="fade-in">
        <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>
          Customer Communication Assistant
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xxl)' }}>
          Smart WhatsApp reply templates to handle customer queries professionally
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xxl)' }}>
          {/* Controls Panel */}
          <div>
            {/* Language Selection */}
            <div className="card slide-up" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Select Language</h3>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                {[
                  { id: 'english', name: 'English', flag: '🇬🇧' },
                  { id: 'tamil', name: 'தமிழ்', flag: '🇮🇳' },
                  { id: 'hindi', name: 'हिंदी', flag: '🇮🇳' }
                ].map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id as any)}
                    className={selectedLanguage === lang.id ? 'btn btn-primary' : 'btn btn-secondary'}
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            <div className="card slide-up" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Query Type</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-sm)' }}>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? 'btn btn-primary' : 'btn btn-secondary'}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 'var(--spacing-xs)',
                      fontSize: '14px',
                      padding: 'var(--spacing-md)'
                    }}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Context Input */}
            <div className="card slide-up">
              <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Add Context (Optional)</h3>
              <textarea
                className="textarea"
                value={customContext}
                onChange={(e) => setCustomContext(e.target.value)}
                placeholder="Describe the specific situation... (e.g., 'Customer wants bulk order for festival', 'Urgent delivery needed', 'Complaint about quality')"
                rows={4}
                style={{ marginBottom: 'var(--spacing-md)' }}
              />
              <button 
                onClick={generateContextualReply}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                🤖 Generate Smart Reply
              </button>
            </div>
          </div>

          {/* Templates Panel */}
          <div>
            {/* Generated Reply */}
            {generatedReply && (
              <div className="card slide-up" style={{ marginBottom: 'var(--spacing-lg)', border: '2px solid #10B981' }}>
                <h3 style={{ marginBottom: 'var(--spacing-md)', color: '#10B981' }}>
                  🤖 AI Generated Reply
                </h3>
                <div style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--color-background)',
                  borderRadius: 'var(--border-radius)',
                  marginBottom: 'var(--spacing-md)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6'
                }}>
                  {generatedReply}
                </div>
                <button 
                  onClick={() => copyToClipboard(generatedReply)}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  📋 Copy to WhatsApp
                </button>
              </div>
            )}

            {/* Template List */}
            <div className="card slide-up">
              <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Ready Templates</h3>
              
              {filteredTemplates.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                  <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-md)' }}>💬</div>
                  <h4>No templates available</h4>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Try selecting a different category or language.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                  {filteredTemplates.map(template => (
                    <div key={template.id} style={{
                      padding: 'var(--spacing-md)',
                      backgroundColor: 'var(--color-background)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--color-border)'
                    }}>
                      <h4 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                        {template.situation}
                      </h4>
                      <div style={{
                        padding: 'var(--spacing-sm)',
                        backgroundColor: 'var(--color-surface)',
                        borderRadius: 'var(--border-radius)',
                        marginBottom: 'var(--spacing-sm)',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}>
                        {template.template}
                      </div>
                      <button 
                        onClick={() => copyToClipboard(template.template)}
                        className="btn btn-secondary"
                        style={{ fontSize: '12px', padding: '6px 12px' }}
                      >
                        📋 Copy Template
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Usage Tips */}
        <div className="card slide-up" style={{ marginTop: 'var(--spacing-xxl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>💡 Usage Tips</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-md)' }}>
            <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius)' }}>
              <h4>🎯 Personalize</h4>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Replace {'{product}'}, {'{price}'} with actual values before sending.
              </p>
            </div>
            <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius)' }}>
              <h4>⚡ Quick Copy</h4>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                One-tap copy to clipboard, then paste directly in WhatsApp.
              </p>
            </div>
            <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius)' }}>
              <h4>🤖 Smart Context</h4>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Add context for AI to generate more relevant replies.
              </p>
            </div>
            <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius)' }}>
              <h4>🌍 Multi-Language</h4>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Switch between English, Tamil, and Hindi as needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCommunication;