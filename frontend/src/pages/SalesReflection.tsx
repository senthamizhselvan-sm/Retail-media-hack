import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface DailySalesEntry {
  date: string;
  salesRating: 1 | 2 | 3 | 4 | 5;
  notes: string;
  aiTip: string;
}

const SalesReflection: React.FC = () => {
  const { } = useAuth();
  const [todayEntry, setTodayEntry] = useState<DailySalesEntry | null>(null);
  const [salesHistory, setSalesHistory] = useState<DailySalesEntry[]>([]);
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [currentNotes, setCurrentNotes] = useState('');
  const [showTrend, setShowTrend] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Load sales history from localStorage
    const saved = localStorage.getItem('salesHistory');
    if (saved) {
      const history = JSON.parse(saved);
      setSalesHistory(history);
      
      // Check if today's entry exists
      const todayExists = history.find((entry: DailySalesEntry) => entry.date === today);
      if (todayExists) {
        setTodayEntry(todayExists);
        setCurrentRating(todayExists.salesRating);
        setCurrentNotes(todayExists.notes);
      }
    }
  }, [today]);

  const generateAITip = (rating: number, notes: string): string => {
    const tips = {
      1: [ // Very Poor
        "Don't worry, every business has tough days. Focus on customer service and product visibility tomorrow.",
        "Consider checking your product prices against competitors. Sometimes small adjustments help.",
        "Try rearranging your shop display. Put popular items at eye level.",
        "Weather or local events might have affected footfall. Tomorrow is a new opportunity."
      ],
      2: [ // Poor
        "Below average day. Consider what might have caused low sales - was it timing, weather, or competition?",
        "Try offering small discounts on slow-moving items to create customer interest.",
        "Check if your shop looks inviting from outside. First impressions matter a lot.",
        "Consider asking regular customers what they need. Direct feedback is valuable."
      ],
      3: [ // Average
        "Average day! You're maintaining steady business. Look for small improvements to push higher.",
        "Try bundling related products together. 'Buy tea, get sugar at discount' works well.",
        "Consider extending hours slightly during peak times to catch more customers.",
        "Regular customers are your strength. Ask them to recommend you to friends."
      ],
      4: [ // Good
        "Good sales day! You're doing something right. Try to identify what worked well today.",
        "Build on this success. If certain products sold well, stock more of them tomorrow.",
        "Great momentum! Consider introducing a loyalty program for regular customers.",
        "You're above average. Focus on consistency to maintain this performance level."
      ],
      5: [ // Excellent
        "Excellent day! Analyze what made today special and try to replicate it.",
        "Outstanding performance! Consider if you can handle increased stock for such busy days.",
        "Perfect day! Share your success strategy with other shop owners - good karma returns.",
        "Amazing sales! Plan for similar busy days by ensuring adequate stock and help."
      ]
    };

    const ratingTips = tips[rating as keyof typeof tips];
    let selectedTip = ratingTips[Math.floor(Math.random() * ratingTips.length)];

    // Add contextual advice based on notes
    if (notes.toLowerCase().includes('busy') || notes.toLowerCase().includes('crowd')) {
      selectedTip += " Since it was busy, consider having help during peak hours.";
    }
    if (notes.toLowerCase().includes('rain') || notes.toLowerCase().includes('weather')) {
      selectedTip += " Weather affects sales. Stock weather-appropriate items.";
    }
    if (notes.toLowerCase().includes('festival') || notes.toLowerCase().includes('celebration')) {
      selectedTip += " Festival seasons are great opportunities. Plan ahead for next celebrations.";
    }
    if (notes.toLowerCase().includes('competitor') || notes.toLowerCase().includes('competition')) {
      selectedTip += " Keep an eye on competitor activities and differentiate your service.";
    }

    return selectedTip;
  };

  const saveTodayEntry = () => {
    if (currentRating === 0) return;

    const aiTip = generateAITip(currentRating, currentNotes);
    
    const newEntry: DailySalesEntry = {
      date: today,
      salesRating: currentRating as 1 | 2 | 3 | 4 | 5,
      notes: currentNotes,
      aiTip
    };

    let updatedHistory = salesHistory.filter(entry => entry.date !== today);
    updatedHistory.push(newEntry);
    updatedHistory.sort((a, b) => b.date.localeCompare(a.date));

    setSalesHistory(updatedHistory);
    setTodayEntry(newEntry);
    localStorage.setItem('salesHistory', JSON.stringify(updatedHistory));
  };

  const getRatingEmoji = (rating: number) => {
    const emojis = ['', '😞', '😕', '😐', '😊', '🤩'];
    return emojis[rating];
  };

  const getRatingText = (rating: number) => {
    const texts = ['', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'];
    return texts[rating];
  };

  const getRatingColor = (rating: number) => {
    const colors = ['', '#EF4444', '#F59E0B', '#6B7280', '#10B981', '#8B5CF6'];
    return colors[rating];
  };

  const calculateWeeklyTrend = () => {
    const lastWeek = salesHistory.slice(0, 7);
    if (lastWeek.length < 2) return null;

    const average = lastWeek.reduce((sum, entry) => sum + entry.salesRating, 0) / lastWeek.length;
    const trend = lastWeek[0].salesRating - lastWeek[lastWeek.length - 1].salesRating;
    
    return {
      average: average.toFixed(1),
      trend: trend > 0 ? 'improving' : trend < 0 ? 'declining' : 'stable',
      trendValue: Math.abs(trend).toFixed(1)
    };
  };

  const weeklyTrend = calculateWeeklyTrend();

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xxl)', paddingBottom: 'var(--spacing-xxl)' }}>
      <div className="fade-in">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
          <div>
            <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>
              Sales Reflection & Learning
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Daily reflection to improve your business thinking
            </p>
          </div>
          
          <button 
            onClick={() => setShowTrend(!showTrend)}
            className={showTrend ? 'btn btn-primary' : 'btn btn-secondary'}
          >
            {showTrend ? '📝 Today\'s Entry' : '📊 View Trends'}
          </button>
        </div>

        {!showTrend ? (
          <>
            {/* Today's Entry */}
            <div className="card slide-up" style={{ marginBottom: 'var(--spacing-xxl)' }}>
              <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>
                How was today's sales? ({new Date().toLocaleDateString()})
              </h2>
              
              {todayEntry ? (
                <div>
                  <div style={{
                    padding: 'var(--spacing-lg)',
                    backgroundColor: getRatingColor(todayEntry.salesRating) + '20',
                    borderRadius: 'var(--border-radius)',
                    border: `2px solid ${getRatingColor(todayEntry.salesRating)}`,
                    marginBottom: 'var(--spacing-lg)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                      <span style={{ fontSize: '48px' }}>{getRatingEmoji(todayEntry.salesRating)}</span>
                      <div>
                        <h3 style={{ margin: 0, color: getRatingColor(todayEntry.salesRating) }}>
                          {getRatingText(todayEntry.salesRating)} Day
                        </h3>
                        <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                          Rating: {todayEntry.salesRating}/5
                        </p>
                      </div>
                    </div>
                    
                    {todayEntry.notes && (
                      <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <h4>Your Notes:</h4>
                        <p style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>
                          "{todayEntry.notes}"
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <h4>🤖 AI Learning Tip:</h4>
                      <p style={{ lineHeight: '1.6' }}>{todayEntry.aiTip}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setTodayEntry(null);
                      setCurrentRating(0);
                      setCurrentNotes('');
                    }}
                    className="btn btn-secondary"
                  >
                    ✏️ Edit Today's Entry
                  </button>
                </div>
              ) : (
                <div>
                  {/* Rating Selection */}
                  <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Rate your sales today:</h3>
                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => setCurrentRating(rating)}
                          style={{
                            padding: 'var(--spacing-lg)',
                            borderRadius: 'var(--border-radius)',
                            border: currentRating === rating ? `3px solid ${getRatingColor(rating)}` : '2px solid var(--color-border)',
                            backgroundColor: currentRating === rating ? getRatingColor(rating) + '20' : 'var(--color-surface)',
                            cursor: 'pointer',
                            textAlign: 'center',
                            minWidth: '80px'
                          }}
                        >
                          <div style={{ fontSize: '32px', marginBottom: 'var(--spacing-xs)' }}>
                            {getRatingEmoji(rating)}
                          </div>
                          <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
                            {getRatingText(rating)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {currentRating > 0 && (
                    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
                        What happened today? (Optional)
                      </h3>
                      <textarea
                        className="textarea"
                        value={currentNotes}
                        onChange={(e) => setCurrentNotes(e.target.value)}
                        placeholder="e.g., 'Very busy morning, rain in evening', 'New competitor opened nearby', 'Festival rush', 'Regular customers came'..."
                        rows={3}
                      />
                    </div>
                  )}

                  {/* Save Button */}
                  {currentRating > 0 && (
                    <button 
                      onClick={saveTodayEntry}
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                    >
                      💾 Save Today's Reflection
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Recent History */}
            {salesHistory.length > 0 && (
              <div className="card slide-up">
                <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Recent Sales History</h2>
                
                <div style={{ display: 'grid', gap: 'var(--spacing-md)', maxHeight: '400px', overflowY: 'auto' }}>
                  {salesHistory.slice(0, 7).map(entry => (
                    <div key={entry.date} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: 'var(--spacing-md)',
                      backgroundColor: 'var(--color-background)',
                      borderRadius: 'var(--border-radius)',
                      border: `2px solid ${getRatingColor(entry.salesRating)}20`,
                      borderLeft: `4px solid ${getRatingColor(entry.salesRating)}`
                    }}>
                      <div style={{ minWidth: '100px', fontSize: '14px', fontWeight: 'bold' }}>
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                      <div style={{ fontSize: '24px', marginRight: 'var(--spacing-sm)' }}>
                        {getRatingEmoji(entry.salesRating)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '14px' }}>
                          {getRatingText(entry.salesRating)} ({entry.salesRating}/5)
                        </h4>
                        {entry.notes && (
                          <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                            "{entry.notes}"
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Trends View */
          <div>
            {/* Weekly Trend */}
            {weeklyTrend && (
              <div className="card slide-up" style={{ marginBottom: 'var(--spacing-xxl)' }}>
                <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Weekly Performance Trend</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-lg)' }}>
                  <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius)' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3B82F6' }}>
                      {weeklyTrend.average}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                      Average Rating
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius)' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: weeklyTrend.trend === 'improving' ? '#10B981' : weeklyTrend.trend === 'declining' ? '#EF4444' : '#F59E0B' }}>
                      {weeklyTrend.trend === 'improving' ? '📈' : weeklyTrend.trend === 'declining' ? '📉' : '📊'}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                      {weeklyTrend.trend.charAt(0).toUpperCase() + weeklyTrend.trend.slice(1)}
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center', padding: 'var(--spacing-lg)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius)' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8B5CF6' }}>
                      {salesHistory.length}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                      Days Tracked
                    </div>
                  </div>
                </div>

                {/* AI Trend Analysis */}
                <div style={{
                  marginTop: 'var(--spacing-lg)',
                  padding: 'var(--spacing-lg)',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--border-radius)'
                }}>
                  <h3>🤖 AI Trend Analysis</h3>
                  <p style={{ lineHeight: '1.6' }}>
                    {weeklyTrend.trend === 'improving' 
                      ? `Great progress! Your sales are improving. Your average rating of ${weeklyTrend.average}/5 shows consistent growth. Keep doing what's working and look for opportunities to maintain this upward trend.`
                      : weeklyTrend.trend === 'declining'
                      ? `Your sales trend is declining slightly. Don't worry - this is normal in business. Review what worked during your better days and try to replicate those strategies. Focus on customer service and product visibility.`
                      : `Your sales are stable with an average of ${weeklyTrend.average}/5. Consistency is good! Now look for small improvements to push your performance higher. Consider trying new strategies on slower days.`
                    }
                  </p>
                </div>
              </div>
            )}

            {/* All History */}
            <div className="card slide-up">
              <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Complete Sales History</h2>
              
              {salesHistory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
                  <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-md)' }}>📊</div>
                  <h3>No sales data yet</h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Start tracking your daily sales to see trends and get AI insights.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
                  {salesHistory.map(entry => (
                    <div key={entry.date} style={{
                      display: 'grid',
                      gridTemplateColumns: '100px 60px 1fr 2fr',
                      alignItems: 'center',
                      padding: 'var(--spacing-sm)',
                      backgroundColor: 'var(--color-background)',
                      borderRadius: 'var(--border-radius)',
                      gap: 'var(--spacing-md)'
                    }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                        <span>{getRatingEmoji(entry.salesRating)}</span>
                        <span style={{ fontSize: '12px' }}>{entry.salesRating}/5</span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                        {entry.notes || 'No notes'}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                        {entry.aiTip.substring(0, 100)}...
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesReflection;