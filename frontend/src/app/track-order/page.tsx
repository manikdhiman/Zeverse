'use client';

import React, { useState } from 'react';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrackingSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    setError(null);
    setOrderData(null);

    try {
      // Points to your local FastAPI tracking server port
      const response = await fetch(`http://127.0.0.1:8000/api/orders/track/${orderNumber.trim()}`);
      
      if (!response.ok) {
        throw new Error('This tracking reference code does not match our vault registry.');
      }

      const data = await response.json();
      setOrderData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Defining the editorial steps for our progress timeline matrix
  const trackingStages = [
    { level: 1, title: 'Order Manifested', desc: 'Artisan selection confirmed & packaging initialized.' },
    { level: 2, title: 'Quality Audited', desc: 'Passed anti-tarnish microscopic reflection inspection.' },
    { level: 3, title: 'In Transit', desc: 'Handed over to luxury premium insured courier.' },
    { level: 4, title: 'Delivered', desc: 'Statement pieces received at customer identity destination.' },
  ];

  const currentStage = orderData ? orderData.current_stage : 0;

  return (
    <div style={{ maxWidth: '850px', margin: '60px auto 100px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      
      {/* Page Header Headers */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#ab8e4e', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
          Logistics Portal
        </span>
        <h1 style={{ fontFamily: 'serif', color: '#0f3c2b', fontSize: '2.5rem', fontWeight: 400, margin: 0, letterSpacing: '1px' }}>
          Track Your Statement Pieces
        </h1>
        <p style={{ color: '#777', fontSize: '13px', marginTop: '10px', letterSpacing: '0.5px' }}>
          Enter your unique invoice reference token to track your curated parcel in real time.
        </p>
      </div>

      {/* Minimalist Search Input Bar */}
      <form onSubmit={handleTrackingSearch} style={{ maxWidth: '550px', margin: '0 auto 50px auto', display: 'flex', gap: '15px' }}>
        <input 
          type="text"
          required
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="e.g., ZV-2026-84921"
          style={{ 
            flex: 1, 
            padding: '16px 20px', 
            border: '1px solid #ddd', 
            fontSize: '14px', 
            outline: 'none', 
            fontFamily: 'sans-serif',
            letterSpacing: '1px',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#0f3c2b'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        <button 
          type="submit"
          disabled={loading}
          style={{ 
            backgroundColor: '#0f3c2b', 
            color: '#dbb968', 
            border: 'none', 
            padding: '0 30px', 
            textTransform: 'uppercase', 
            letterSpacing: '1px', 
            fontSize: '11px', 
            fontWeight: 600, 
            cursor: 'pointer' 
          }}
        >
          {loading ? 'Scanning...' : 'Locate Parcel'}
        </button>
      </form>

      {/* Error Output Banner */}
      {error && (
        <div style={{ color: '#C53030', backgroundColor: '#FFF5F5', padding: '15px', borderRadius: '0', fontSize: '13px', borderLeft: '3px solid #E53E3E', textAlign: 'center', maxWidth: '550px', margin: '0 auto' }}>
          ✦ {error}
        </div>
      )}

      {/* LIVE TIMELINE TRACKING RESULTS CONTAINER */}
      {orderData && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #f2f2f2', padding: '40px', boxShadow: '0 15px 35px rgba(0,0,0,0.02)' }}>
          
          {/* Metadata Grid Header Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderBottom: '1px solid #eee', paddingBottom: '25px', marginBottom: '40px' }}>
            <div>
              <span style={{ fontSize: '10px', uppercase: 'true', color: '#999', display: 'block', letterSpacing: '1px' }}>TRACKING REFERENCE</span>
              <strong style={{ fontSize: '16px', color: '#0f3c2b', fontFamily: 'serif' }}>{orderData.order_number}</strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10px', uppercase: 'true', color: '#999', display: 'block', letterSpacing: '1px' }}>ESTIMATED DESTINATION DEPLOYMENT</span>
              <strong style={{ fontSize: '14px', color: '#111' }}>Premium Insured Carrier Route</strong>
            </div>
          </div>

          {/* Stepper Timeline Graphics Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', position: 'relative', paddingLeft: '40px' }}>
            
            {/* The structural background connection wire string path line */}
            <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', backgroundColor: '#eee', zIndex: 1 }} />
            
            {/* Active progress wire string overlay path line highlight */}
            <div style={{ 
              position: 'absolute', 
              left: '11px', 
              top: '10px', 
              height: `${((currentStage - 1) / (trackingStages.length - 1)) * 100}%`, 
              width: '2px', 
              backgroundColor: '#0f3c2b', 
              zIndex: 2,
              transition: 'height 0.5s ease-in-out'
            }} />

            {trackingStages.map((stage) => {
              const isPassed = currentStage >= stage.level;
              const isCurrent = currentStage === stage.level;

              return (
                <div key={stage.level} style={{ display: 'flex', gap: '25px', alignItems: 'flex-start', position: 'relative', zIndex: 3 }}>
                  
                  {/* Circular Node Indicators */}
                  <div style={{ 
                    marginLeft: '-40px',
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    backgroundColor: isPassed ? '#0f3c2b' : '#fff', 
                    border: isPassed ? 'none' : '2px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    color: isPassed ? '#dbb968' : '#aaa',
                    fontWeight: 'bold',
                    boxShadow: isCurrent ? '0 0 0 5px rgba(15, 60, 43, 0.15)' : 'none',
                    transition: 'all 0.3s'
                  }}>
                    {isPassed ? '✓' : stage.level}
                  </div>

                  {/* Text Description Copy Content Blocks */}
                  <div>
                    <h4 style={{ 
                      margin: '0 0 4px 0', 
                      fontSize: '15px', 
                      fontFamily: 'serif', 
                      color: isPassed ? '#0f3c2b' : '#999',
                      fontWeight: isCurrent ? 700 : 400
                    }}>
                      {stage.title} {isCurrent && <span style={{ fontSize: '10px', color: '#ab8e4e', backgroundColor: '#fcf8ee', padding: '2px 8px', marginLeft: '10px', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Station</span>}
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', color: isPassed ? '#555' : '#bbb', lineHeight: '1.4' }}>
                      {stage.desc}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

        </div>
      )}

    </div>
  );
}