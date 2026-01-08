import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface PlanningEvent {
  date: string;
  type: 'festival' | 'salary' | 'market' | 'custom';
  name: string;
  impact: 'high' | 'medium' | 'low';
  suggestion: string;
}

interface OfferPlan {
  id: string;
  name: string;
  targetDate: string;
  discountRange: string;
  products: string[];
  status: 'planned' | 'locked' | 'active';
  aiSuggestion: string;
}

const OfferPlanning: React.FC = () => {
  const { } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState<PlanningEvent[]>([]);
  const [offerPlans, setOfferPlans] = useState<OfferPlan[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showPlanModal, setShowPlanModal] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];



  useEffect(() => {
    const generateMonthlyEvents = (): PlanningEvent[] => {
      const events: PlanningEvent[] = [];
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      // Festival days (sample for different months)
      const festivals = {
        0: [{ day: 26, name: 'Republic Day' }], // January
        2: [{ day: 8, name: 'Holi' }], // March
        7: [{ day: 15, name: 'Independence Day' }], // August
        9: [{ day: 2, name: 'Gandhi Jayanti' }, { day: 24, name: 'Diwali' }], // October
        10: [{ day: 12, name: 'Diwali' }, { day: 19, name: 'Bhai Dooj' }] // November
      };

      // Add festivals
      if (festivals[currentMonth as keyof typeof festivals]) {
        festivals[currentMonth as keyof typeof festivals].forEach(festival => {
          events.push({
            date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(festival.day).padStart(2, '0')}`,
            type: 'festival',
            name: festival.name,
            impact: 'high',
            suggestion: `High demand expected. Stock festive items and increase visibility.`
          });
        });
      }

      // Salary cycles (1st, 15th, 30th)
      [1, 15, Math.min(30, daysInMonth)].forEach(day => {
        events.push({
          date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          type: 'salary',
          name: day === 1 ? 'Month Start - Salary Day' : day === 15 ? 'Mid-Month Salary' : 'Month End',
          impact: 'medium',
          suggestion: `Increased purchasing power. Good time for premium product offers.`
        });
      });

      // Market rush days (weekends)
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        if (date.getDay() === 0 || date.getDay() === 6) { // Sunday or Saturday
          events.push({
            date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
            type: 'market',
            name: date.getDay() === 0 ? 'Sunday Market' : 'Saturday Rush',
            impact: 'medium',
            suggestion: `Weekend shoppers. Focus on family packs and bulk offers.`
          });
        }
      }

      return events.sort((a, b) => a.date.localeCompare(b.date));
    };

    setEvents(generateMonthlyEvents());
  }, [currentMonth, currentYear]);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'festival': return '#EF4444';
      case 'salary': return '#10B981';
      case 'market': return '#3B82F6';
      case 'custom': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const generateAISuggestion = (date: string): string => {
    const event = events.find(e => e.date === date);
    if (!event) return 'Consider running a general promotion to boost sales.';

    switch (event.type) {
      case 'festival':
        return `Festival season! Offer 10-20% discounts on sweets, decorative items, and gift packs. Create festive bundles.`;
      case 'salary':
        return `Salary day advantage! Promote premium products with 5-15% discounts. Focus on monthly essentials.`;
      case 'market':
        return `Weekend rush! Offer family packs and bulk discounts. 'Buy 2 Get 1' works well on weekends.`;
      default:
        return `Regular day promotion. Consider 5-10% discount on fast-moving items to maintain momentum.`;
    }
  };

  const createOfferPlan = () => {
    if (!selectedDate) return;

    const newPlan: OfferPlan = {
      id: Date.now().toString(),
      name: `Offer Plan - ${new Date(selectedDate).toLocaleDateString()}`,
      targetDate: selectedDate,
      discountRange: '5-15%',
      products: ['General Items'],
      status: 'planned',
      aiSuggestion: generateAISuggestion(selectedDate)
    };

    setOfferPlans([...offerPlans, newPlan]);
    setShowPlanModal(false);
    setSelectedDate('');
  };

  const lockPlan = (planId: string) => {
    setOfferPlans(offerPlans.map(plan => 
      plan.id === planId ? { ...plan, status: 'locked' } : plan
    ));
  };

  const deletePlan = (planId: string) => {
    setOfferPlans(offerPlans.filter(plan => plan.id !== planId));
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xxl)', paddingBottom: 'var(--spacing-xxl)' }}>
      <div className="fade-in">
        <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>
          Smart Offer Planning Studio
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xxl)' }}>
          Plan your offers strategically for maximum impact
        </p>

        {/* Month Navigation */}
        <div className="card slide-up" style={{ marginBottom: 'var(--spacing-xxl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
            <h2>Planning Calendar</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
              <button 
                onClick={() => setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)}
                className="btn btn-secondary"
              >
                ← Previous
              </button>
              <h3>{monthNames[currentMonth]} {currentYear}</h3>
              <button 
                onClick={() => setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)}
                className="btn btn-secondary"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Events Timeline */}
          <div style={{ 
            display: 'grid', 
            gap: 'var(--spacing-md)',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {events.map((event, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--color-background)',
                borderRadius: 'var(--border-radius)',
                border: `2px solid ${getEventColor(event.type)}20`,
                borderLeft: `4px solid ${getEventColor(event.type)}`
              }}>
                <div style={{ minWidth: '80px', fontWeight: 'bold' }}>
                  {new Date(event.date).getDate()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xs)' }}>
                    <h4 style={{ margin: 0 }}>{event.name}</h4>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: 'white',
                      backgroundColor: getImpactColor(event.impact)
                    }}>
                      {event.impact.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ 
                    fontSize: '14px', 
                    color: 'var(--color-text-secondary)', 
                    margin: 0 
                  }}>
                    {event.suggestion}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setSelectedDate(event.date);
                    setShowPlanModal(true);
                  }}
                  className="btn btn-primary"
                  style={{ fontSize: '14px' }}
                >
                  Plan Offer
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Offer Plans */}
        <div className="card slide-up">
          <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Your Offer Plans</h2>
          
          {offerPlans.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
              <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-md)' }}>📅</div>
              <h3>No offer plans yet</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Select a date from the calendar above to create your first offer plan.
              </p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gap: 'var(--spacing-lg)' 
            }}>
              {offerPlans.map(plan => (
                <div key={plan.id} style={{
                  padding: 'var(--spacing-lg)',
                  backgroundColor: 'var(--color-background)',
                  borderRadius: 'var(--border-radius)',
                  border: `2px solid ${plan.status === 'locked' ? '#10B981' : '#F59E0B'}20`,
                  borderLeft: `4px solid ${plan.status === 'locked' ? '#10B981' : '#F59E0B'}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                    <div>
                      <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>{plan.name}</h3>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                        Target Date: {new Date(plan.targetDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: 'white',
                      backgroundColor: plan.status === 'locked' ? '#10B981' : '#F59E0B'
                    }}>
                      {plan.status.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <h4>AI Suggestion:</h4>
                    <p style={{ 
                      color: 'var(--color-text-secondary)', 
                      fontStyle: 'italic',
                      lineHeight: '1.6'
                    }}>
                      {plan.aiSuggestion}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    {plan.status === 'planned' && (
                      <button 
                        onClick={() => lockPlan(plan.id)}
                        className="btn btn-primary"
                        style={{ fontSize: '14px' }}
                      >
                        🔒 Lock Plan
                      </button>
                    )}
                    <button 
                      onClick={() => deletePlan(plan.id)}
                      className="btn btn-secondary"
                      style={{ fontSize: '14px' }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Plan Modal */}
        {showPlanModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div className="card" style={{ 
              width: '90%', 
              maxWidth: '500px',
              margin: 0
            }}>
              <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>
                Create Offer Plan for {selectedDate ? new Date(selectedDate).toLocaleDateString() : ''}
              </h3>
              
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h4>AI Recommendation:</h4>
                <p style={{ 
                  color: 'var(--color-text-secondary)', 
                  fontStyle: 'italic',
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--color-background)',
                  borderRadius: 'var(--border-radius)',
                  lineHeight: '1.6'
                }}>
                  {generateAISuggestion(selectedDate)}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <button 
                  onClick={createOfferPlan}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Create Plan
                </button>
                <button 
                  onClick={() => {
                    setShowPlanModal(false);
                    setSelectedDate('');
                  }}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferPlanning;