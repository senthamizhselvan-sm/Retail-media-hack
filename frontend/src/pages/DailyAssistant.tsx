import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface DailyAdvice {
  category: string;
  title: string;
  advice: string;
  icon: string;
  priority: 'high' | 'medium' | 'low';
}

const DailyAssistant: React.FC = () => {
  const { user } = useAuth();
  const [currentAdvice, setCurrentAdvice] = useState<DailyAdvice[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const categories = [
    { id: 'all', name: 'All Advice', icon: '📋' },
    { id: 'stock', name: 'Stock Placement', icon: '📦' },
    { id: 'visibility', name: 'Visibility Tips', icon: '👁️' },
    { id: 'psychology', name: 'Selling Psychology', icon: '🧠' },
    { id: 'timing', name: 'Timing Tips', icon: '⏰' }
  ];

  const generateDailyAdvice = (): DailyAdvice[] => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const hour = today.getHours();

    const advicePool: DailyAdvice[] = [
      {
        category: 'stock',
        title: 'Morning Stock Arrangement',
        advice: 'Place high-demand items like tea, biscuits, and milk at eye level. Keep impulse items near the counter.',
        icon: '📦',
        priority: 'high'
      },
      {
        category: 'visibility',
        title: 'Shop Front Visibility',
        advice: 'Clean your shop front and arrange colorful items in the window. First impression matters for new customers.',
        icon: '👁️',
        priority: 'high'
      },
      {
        category: 'psychology',
        title: 'Customer Greeting',
        advice: 'Greet customers with a smile and ask "What do you need today?" instead of just waiting silently.',
        icon: '🧠',
        priority: 'medium'
      },
      {
        category: 'timing',
        title: isWeekend ? 'Weekend Rush Preparation' : 'Weekday Strategy',
        advice: isWeekend 
          ? 'Weekends bring families. Stock up on snacks, cold drinks, and household items.'
          : 'Weekdays are for essentials. Focus on daily needs like milk, bread, and vegetables.',
        icon: '⏰',
        priority: 'high'
      },
      {
        category: 'stock',
        title: 'Seasonal Placement',
        advice: 'Move seasonal items to prominent positions. In summer, highlight cold drinks and ice cream.',
        icon: '📦',
        priority: 'medium'
      },
      {
        category: 'psychology',
        title: 'Bundle Suggestions',
        advice: 'When someone buys tea, suggest sugar or biscuits. Natural combinations increase sales.',
        icon: '🧠',
        priority: 'medium'
      },
      {
        category: 'visibility',
        title: 'Price Display',
        advice: 'Write prices clearly in large numbers. Customers should see prices without asking.',
        icon: '👁️',
        priority: 'high'
      },
      {
        category: 'timing',
        title: hour < 12 ? 'Morning Rush Tips' : hour < 17 ? 'Afternoon Strategy' : 'Evening Preparation',
        advice: hour < 12 
          ? 'Morning customers want quick service. Keep breakfast items and newspapers ready.'
          : hour < 17 
          ? 'Afternoon is slow time. Use it to organize stock and clean displays.'
          : 'Evening brings working people. Stock ready-to-eat items and cold drinks.',
        icon: '⏰',
        priority: 'high'
      }
    ];

    return advicePool.sort(() => Math.random() - 0.5).slice(0, 5);
  };

  useEffect(() => {
    setCurrentAdvice(generateDailyAdvice());
  }, []);

  const filteredAdvice = selectedCategory === 'all' 
    ? currentAdvice 
    : currentAdvice.filter(advice => advice.category === selectedCategory);

  const playAdvice = (advice: DailyAdvice) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(`${advice.title}. ${advice.advice}`);
      utterance.lang = 'en-IN';
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const playAllAdvice = () => {
    if ('speechSynthesis' in window && filteredAdvice.length > 0) {
      setIsPlaying(true);
      const allAdviceText = filteredAdvice
        .map(advice => `${advice.title}. ${advice.advice}`)
        .join('. Next tip. ');
      
      const utterance = new SpeechSynthesisUtterance(`Here are your daily business tips. ${allAdviceText}`);
      utterance.lang = 'en-IN';
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xxl)', paddingBottom: 'var(--spacing-xxl)' }}>
      <div className="fade-in">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
          <div>
            <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>
              Daily Business Assistant
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Smart advice to grow your business, {user?.name}
            </p>
          </div>
          
          <button 
            onClick={playAllAdvice}
            disabled={isPlaying}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}
          >
            {isPlaying ? '🔊' : '🎵'} {isPlaying ? 'Playing...' : 'Play All Tips'}
          </button>
        </div>

        {/* Category Filter */}
        <div className="card slide-up" style={{ marginBottom: 'var(--spacing-xxl)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Advice Categories</h3>
          
          <div style={{ 
            display: 'flex', 
            gap: 'var(--spacing-sm)', 
            flexWrap: 'wrap' 
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--spacing-xs)',
                  fontSize: '14px'
                }}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Advice Cards */}
        <div style={{ 
          display: 'grid', 
          gap: 'var(--spacing-lg)' 
        }}>
          {filteredAdvice.map((advice, index) => (
            <div key={index} className="card slide-up" style={{ 
              border: `2px solid ${getPriorityColor(advice.priority)}20`,
              borderLeft: `4px solid ${getPriorityColor(advice.priority)}`
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-lg)' }}>
                <div style={{ 
                  fontSize: '48px',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>
                  {advice.icon}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                    <h3 style={{ margin: 0 }}>{advice.title}</h3>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: 'white',
                      backgroundColor: getPriorityColor(advice.priority)
                    }}>
                      {advice.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <p style={{ 
                    color: 'var(--color-text-secondary)', 
                    lineHeight: '1.6',
                    marginBottom: 'var(--spacing-md)'
                  }}>
                    {advice.advice}
                  </p>
                  
                  <button 
                    onClick={() => playAdvice(advice)}
                    disabled={isPlaying}
                    className="btn btn-secondary"
                    style={{ 
                      fontSize: '14px',
                      padding: '8px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-xs)'
                    }}
                  >
                    🔊 Listen to this tip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAdvice.length === 0 && (
          <div className="card slide-up" style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
            <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-md)' }}>📋</div>
            <h3>No advice available for this category</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Try selecting a different category or check back tomorrow for fresh tips.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyAssistant;