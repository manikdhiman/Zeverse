"use client";

import React, { useState } from 'react';

// 👑 EXPLICIT DEFAULT EXPORT COMPONENT FOR NEXT.JS ROUTER SYSTEM
export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    
    if (orderId.trim() !== "") {
      setTrackingData({
        id: orderId,
        status: "In Transit",
        carrier: "BlueDart Luxury Logistics",
        estimatedDelivery: "July 04, 2026",
        currentLocation: "Delhi Hub Sorting Facility",
        history: [
          { date: "June 28, 2026", time: "10:30 AM", detail: "Package item packed and anti-tarnish sealed at Mumbai Vault Warehouse." },
          { date: "June 29, 2026", time: "02:15 PM", detail: "Dispatched and scanned at regional sorting hub node." }
        ]
      });
    } else {
      setTrackingData(null);
    }
  };

  return (
    <div style={{
      padding: '80px max(40px, calc((100% - 1000px) / 2)) 120px',
      backgroundColor: 'var(--accent-cream)',
      minHeight: '85vh',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary-color)', letterSpacing: '3px', margin: 0 }}>Track Your Order</h1>
        <div style={{ backgroundColor: 'rgba(13, 61, 58, 0.2)', height: '1px', width: '80px', margin: '20px auto 0' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'start' }}>
        
        {/* Left Side Control Panel */}
        <div style={{ 
          backgroundColor: '#ffffff', 
          border: '1px solid var(--border-color)', 
          padding: '40px',
          boxShadow: '0 15px 40px rgba(13, 61, 58, 0.04)'
        }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '24px', color: 'var(--primary-color)', margin: 0 }}>Logistics Retrieval</h3>
          <form onSubmit={handleTrackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Order Reference Token</label>
              <input 
                type="text" 
                required
                placeholder="e.g., ZEV-78920-IN"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                style={{
                  padding: '14px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--accent-cream)',
                  fontSize: '1rem',
                  outline: 'none',
                  color: 'var(--primary-color)'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Registered Email</label>
              <input 
                type="email" 
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '14px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--accent-cream)',
                  fontSize: '1rem',
                  outline: 'none',
                  color: 'var(--primary-color)'
                }}
              />
            </div>

            <button type="submit" className="btn-luxury-solid" style={{ width: '100%', marginTop: '10px' }}>
              Verify Status
            </button>
          </form>
        </div>

        {/* Right Side Results Display */}
        <div style={{ width: '100%' }}>
          {!searched ? (
            <div style={{ 
              border: '2px dashed var(--border-color)', 
              padding: '60px 30px', 
              textAlign: 'center',
              color: 'var(--primary-color)',
              opacity: 0.7
            }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '15px' }}>📦</span>
              <p style={{ fontSize: '1.1rem' }}>Provide credentials on the left deck control terminal to retrieve pipeline mapping tracking metrics details.</p>
            </div>
          ) : trackingData ? (
            <div style={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid var(--border-color)', 
              padding: '40px',
              boxShadow: '0 15px 40px rgba(13, 61, 58, 0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--secondary-maroon)', fontWeight: 600, letterSpacing: '1px' }}>DELIVERY PIPELINE</span>
                  <h4 style={{ fontSize: '1.8rem', color: 'var(--primary-color)', margin: 0 }}>{trackingData.status}</h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>ESTIMATED TIME</span>
                  <p style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>{trackingData.estimatedDelivery}</p>
                </div>
              </div>

              <div style={{ marginBottom: '30px', fontSize: '1rem', lineHeight: '1.6' }}>
                <p style={{ margin: '0 0 6px' }}><strong>Logistics Partner:</strong> {trackingData.carrier}</p>
                <p style={{ margin: 0 }}><strong>Current Allocation Point:</strong> {trackingData.currentLocation}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid var(--primary-color)' }}>
                {trackingData.history.map((item: any, i: number) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <div style={{ 
                      position: 'absolute', 
                      left: '-27px', 
                      top: '4px', 
                      width: '12px', 
                      height: '12px', 
                      backgroundColor: i === 0 ? 'var(--secondary-maroon)' : 'var(--primary-color)', 
                      borderRadius: '50%' 
                    }}></div>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{item.date} — {item.time}</span>
                    <p style={{ fontSize: '0.95rem', margin: '4px 0 0', opacity: 0.9 }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--border-color)', padding: '40px', textAlign: 'center' }}>
              <p style={{ color: 'var(--secondary-maroon)', fontWeight: 600, margin: 0 }}>Zero datasets located matching tracking database query variables.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}