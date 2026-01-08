import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface CompetitorPrice {
  id: string;
  product: string;
  myPrice: number;
  competitorPrice: number;
  competitorName: string;
  dateAdded: string;
  status: 'cheaper' | 'same' | 'premium';
}

const CompetitorAwareness: React.FC = () => {
  const { } = useAuth();
  const [competitorPrices, setCompetitorPrices] = useState<CompetitorPrice[]>([]);
  const [newProduct, setNewProduct] = useState('');
  const [newMyPrice, setNewMyPrice] = useState('');
  const [newCompetitorPrice, setNewCompetitorPrice] = useState('');
  const [newCompetitorName, setNewCompetitorName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<CompetitorPrice | null>(null);

  const addComparison = () => {
    if (!newProduct || !newMyPrice || !newCompetitorPrice || !newCompetitorName) return;

    const myPrice = parseFloat(newMyPrice);
    const compPrice = parseFloat(newCompetitorPrice);
    
    let status: 'cheaper' | 'same' | 'premium';
    if (myPrice < compPrice) status = 'cheaper';
    else if (myPrice === compPrice) status = 'same';
    else status = 'premium';

    const newComparison: CompetitorPrice = {
      id: Date.now().toString(),
      product: newProduct,
      myPrice,
      competitorPrice: compPrice,
      competitorName: newCompetitorName,
      dateAdded: new Date().toISOString().split('T')[0],
      status
    };

    setCompetitorPrices([...competitorPrices, newComparison]);
    
    // Reset form
    setNewProduct('');
    setNewMyPrice('');
    setNewCompetitorPrice('');
    setNewCompetitorName('');
  };

  const deleteComparison = (id: string) => {
    setCompetitorPrices(competitorPrices.filter(comp => comp.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'cheaper': return '#10B981';
      case 'same': return '#F59E0B';
      case 'premium': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'cheaper': return '📉';
      case 'same': return '📊';
      case 'premium': return '📈';
      default: return '📊';
    }
  };

  const generateAIAdvice = (comparison: CompetitorPrice): string => {
    const priceDiff = Math.abs(comparison.myPrice - comparison.competitorPrice);
    const percentDiff = ((priceDiff / comparison.competitorPrice) * 100).toFixed(1);

    switch (comparison.status) {
      case 'cheaper':
        return `Great! You're ₹${priceDiff} (${percentDiff}%) cheaper than ${comparison.competitorName}. You can highlight this competitive advantage to customers. Consider promoting this price difference.`;
      
      case 'same':
        return `You're at the same price as ${comparison.competitorName}. Focus on better service, quality, or convenience to win customers. Consider small value-adds like free delivery or better packaging.`;
      
      case 'premium':
        if (parseFloat(percentDiff) > 20) {
          return `You're ₹${priceDiff} (${percentDiff}%) higher than ${comparison.competitorName}. This is significant. Consider if you can reduce the price or emphasize superior quality/service to justify the premium.`;
        } else {
          return `You're ₹${priceDiff} (${percentDiff}%) higher than ${comparison.competitorName}. This small premium is acceptable if you offer better quality or service. Communicate your value proposition clearly.`;
        }
      
      default:
        return 'Monitor this price regularly to stay competitive.';
    }
  };

  const generateCustomerResponse = (comparison: CompetitorPrice): string => {
    switch (comparison.status) {
      case 'cheaper':
        return `"We offer the best price in the area! ${comparison.product} is available for just ₹${comparison.myPrice}, which is ₹${(comparison.competitorPrice - comparison.myPrice).toFixed(2)} less than other shops."`;
      
      case 'same':
        return `"Our price for ${comparison.product} is ₹${comparison.myPrice}, same as others, but we provide better quality and service. We also offer free home delivery for orders above ₹200."`;
      
      case 'premium':
        return `"${comparison.product} is ₹${comparison.myPrice}. We maintain premium quality and freshness. Our customers choose us for reliability and better service, which is worth the small difference."`;
      
      default:
        return `"${comparison.product} is available for ₹${comparison.myPrice}. We ensure best quality and service."`;
    }
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--spacing-xxl)', paddingBottom: 'var(--spacing-xxl)' }}>
      <div className="fade-in">
        <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>
          Competitor Awareness Panel
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xxl)' }}>
          Track competitor prices and get smart positioning advice
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xxl)' }}>
          {/* Add New Comparison */}
          <div className="card slide-up">
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Add Price Comparison</h2>
            
            <div className="form-group">
              <label className="label">Product Name</label>
              <input
                type="text"
                className="input"
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="e.g., Rice (1kg), Milk (1L), Sugar (1kg)"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="label">Your Price (₹)</label>
                <input
                  type="number"
                  className="input"
                  value={newMyPrice}
                  onChange={(e) => setNewMyPrice(e.target.value)}
                  placeholder="0"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label className="label">Competitor Price (₹)</label>
                <input
                  type="number"
                  className="input"
                  value={newCompetitorPrice}
                  onChange={(e) => setNewCompetitorPrice(e.target.value)}
                  placeholder="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label">Competitor Shop Name</label>
              <input
                type="text"
                className="input"
                value={newCompetitorName}
                onChange={(e) => setNewCompetitorName(e.target.value)}
                placeholder="e.g., Sharma Store, Local Mart"
              />
            </div>

            <button 
              onClick={addComparison}
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={!newProduct || !newMyPrice || !newCompetitorPrice || !newCompetitorName}
            >
              📊 Add Comparison
            </button>
          </div>

          {/* Price Overview */}
          <div className="card slide-up">
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Price Position Overview</h2>
            
            {competitorPrices.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-md)' }}>📊</div>
                <h3>No comparisons yet</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Add your first price comparison to get started with competitive analysis.
                </p>
              </div>
            ) : (
              <>
                {/* Summary Stats */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: 'var(--spacing-md)',
                  marginBottom: 'var(--spacing-lg)'
                }}>
                  <div style={{ textAlign: 'center', padding: 'var(--spacing-md)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius)' }}>
                    <div style={{ fontSize: '24px', color: '#10B981', fontWeight: 'bold' }}>
                      {competitorPrices.filter(p => p.status === 'cheaper').length}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Cheaper</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 'var(--spacing-md)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius)' }}>
                    <div style={{ fontSize: '24px', color: '#F59E0B', fontWeight: 'bold' }}>
                      {competitorPrices.filter(p => p.status === 'same').length}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Same Price</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: 'var(--spacing-md)', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius)' }}>
                    <div style={{ fontSize: '24px', color: '#EF4444', fontWeight: 'bold' }}>
                      {competitorPrices.filter(p => p.status === 'premium').length}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Premium</div>
                  </div>
                </div>

                {/* Recent Comparisons */}
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {competitorPrices.slice(-5).reverse().map(comparison => (
                    <div key={comparison.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: 'var(--spacing-sm)',
                      marginBottom: 'var(--spacing-sm)',
                      backgroundColor: 'var(--color-background)',
                      borderRadius: 'var(--border-radius)',
                      border: `2px solid ${getStatusColor(comparison.status)}20`,
                      borderLeft: `4px solid ${getStatusColor(comparison.status)}`
                    }}>
                      <div style={{ fontSize: '24px', marginRight: 'var(--spacing-sm)' }}>
                        {getStatusIcon(comparison.status)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '14px' }}>{comparison.product}</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                          You: ₹{comparison.myPrice} | {comparison.competitorName}: ₹{comparison.competitorPrice}
                        </p>
                      </div>
                      <button 
                        onClick={() => setSelectedProduct(comparison)}
                        className="btn btn-secondary"
                        style={{ fontSize: '12px', padding: '4px 8px' }}
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Detailed Analysis */}
        {selectedProduct && (
          <div className="card slide-up" style={{ marginTop: 'var(--spacing-xxl)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-lg)' }}>
              <h2>Detailed Analysis: {selectedProduct.product}</h2>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="btn btn-secondary"
              >
                ✕ Close
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xxl)' }}>
              {/* Price Comparison */}
              <div>
                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Price Comparison</h3>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'var(--spacing-lg)',
                  marginBottom: 'var(--spacing-lg)'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3B82F6' }}>
                      ₹{selectedProduct.myPrice}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Your Price</div>
                  </div>
                  <div style={{ fontSize: '24px' }}>vs</div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#EF4444' }}>
                      ₹{selectedProduct.competitorPrice}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                      {selectedProduct.competitorName}
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: getStatusColor(selectedProduct.status) + '20',
                  borderRadius: 'var(--border-radius)',
                  border: `2px solid ${getStatusColor(selectedProduct.status)}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                    <span style={{ fontSize: '24px' }}>{getStatusIcon(selectedProduct.status)}</span>
                    <h4 style={{ margin: 0, color: getStatusColor(selectedProduct.status) }}>
                      You are {selectedProduct.status === 'cheaper' ? 'CHEAPER' : selectedProduct.status === 'same' ? 'SAME PRICE' : 'PREMIUM'}
                    </h4>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px' }}>
                    Difference: ₹{Math.abs(selectedProduct.myPrice - selectedProduct.competitorPrice).toFixed(2)} 
                    ({(Math.abs(selectedProduct.myPrice - selectedProduct.competitorPrice) / selectedProduct.competitorPrice * 100).toFixed(1)}%)
                  </p>
                </div>
              </div>

              {/* AI Advice */}
              <div>
                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>🤖 AI Strategy Advice</h3>
                <div style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--color-background)',
                  borderRadius: 'var(--border-radius)',
                  marginBottom: 'var(--spacing-lg)',
                  lineHeight: '1.6'
                }}>
                  {generateAIAdvice(selectedProduct)}
                </div>

                <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>💬 Suggested Customer Response</h4>
                <div style={{
                  padding: 'var(--spacing-md)',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--border-radius)',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  {generateCustomerResponse(selectedProduct)}
                </div>
                
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                  <button 
                    onClick={() => navigator.clipboard.writeText(generateCustomerResponse(selectedProduct))}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    📋 Copy Response
                  </button>
                  <button 
                    onClick={() => deleteComparison(selectedProduct.id)}
                    className="btn btn-secondary"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Comparisons List */}
        {competitorPrices.length > 0 && (
          <div className="card slide-up" style={{ marginTop: 'var(--spacing-xxl)' }}>
            <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>All Price Comparisons</h2>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                    <th style={{ padding: 'var(--spacing-sm)', textAlign: 'left' }}>Product</th>
                    <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>Your Price</th>
                    <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>Competitor</th>
                    <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>Comp. Price</th>
                    <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>Status</th>
                    <th style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorPrices.map(comparison => (
                    <tr key={comparison.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: 'var(--spacing-sm)' }}>{comparison.product}</td>
                      <td style={{ padding: 'var(--spacing-sm)', textAlign: 'center', fontWeight: 'bold' }}>
                        ₹{comparison.myPrice}
                      </td>
                      <td style={{ padding: 'var(--spacing-sm)', textAlign: 'center', fontSize: '14px' }}>
                        {comparison.competitorName}
                      </td>
                      <td style={{ padding: 'var(--spacing-sm)', textAlign: 'center', fontWeight: 'bold' }}>
                        ₹{comparison.competitorPrice}
                      </td>
                      <td style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: getStatusColor(comparison.status)
                        }}>
                          {comparison.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: 'var(--spacing-sm)', textAlign: 'center' }}>
                        <button 
                          onClick={() => setSelectedProduct(comparison)}
                          className="btn btn-secondary"
                          style={{ fontSize: '12px', padding: '4px 8px', marginRight: 'var(--spacing-xs)' }}
                        >
                          View
                        </button>
                        <button 
                          onClick={() => deleteComparison(comparison.id)}
                          className="btn btn-secondary"
                          style={{ fontSize: '12px', padding: '4px 8px' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitorAwareness;