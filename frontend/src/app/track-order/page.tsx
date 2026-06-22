'use client';

import React, { useState } from 'react';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackedData, setTrackedData] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/orders/track/${orderNumber.trim()}`);
      if (!response.ok) {
        throw new Error('Not found');
      }
      const data = await response.json();
      setTrackedData(data);
    } catch (err) {
      setTrackedData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '0 20px' }}>
      <div className="track-card">
        <span style={{ color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', fontWeight: '600' }}>Fulfillment Registry</span>
        <h1 style={{ color: 'var(--primary-color)', fontSize: '2.5rem', marginTop: '5px' }}>Track Your Statement</h1>
        
        <form onSubmit={handleTrackSubmit} className="search-bar-row">
          <input 
            type="text"
            placeholder="e.g., ZV-2026-58392"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
            className="form-input"
            style={{ margin: 0, height: '48px' }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '0 30px', height: '48px' }}>Locate Bag</button>
        </form>

        {loading && <div style={{ color: 'var(--primary-color)', fontWeight: '600', textAlign: 'center' }}>Searching database vaults...</div>}

        {hasSearched && !loading && (
          <div>
            {trackedData ? (
              <div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', marginBottom: '30px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '30px', backgroundColor: 'var(--bg-light)', padding: '15px', borderRadius: '4px' }}>
                  <div>
                    <span style={{ color: 'gray', display: 'block', fontSize: '12px' }}>Order Identifier</span>
                    <strong style={{ color: 'var(--primary-color)' }}>{trackedData.order_number}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'gray', display: 'block', fontSize: '12px' }}>Total Amount</span>
                    <strong>₹{trackedData.total_payable}</strong>
                  </div>
                </div>

                <div className="timeline-track">
                  <div className={`timeline-step-node ${trackedData.current_stage >= 1 ? 'active' : ''}`}>
                    <h4 style={{ fontSize: '16px', color: 'var(--primary-color)' }}>Order Confirmed & Payment Verified</h4>
                    <p style={{ fontSize: '13px', color: 'gray' }}>Receipt logged permanently inside server memory structures.</p>
                  </div>
                  <div className={`timeline-step-node ${trackedData.current_stage >= 2 ? 'active' : ''}`}>
                    <h4 style={{ fontSize: '16px', color: 'var(--primary-color)' }}>Handcrafted Curations Packaged</h4>
                  </div>
                  <div className={`timeline-step-node ${trackedData.current_stage >= 3 ? 'active' : ''}`}>
                    <h4 style={{ fontSize: '16px', color: 'var(--primary-color)' }}>Handed over to Express Courier</h4>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 10px', backgroundColor: '#FFF5F5', border: '1px solid #FFD3D3', borderRadius: '4px', color: '#C53030' }}>
                <p style={{ fontWeight: '600' }}>Tracking Reference Code Not Recognized</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}