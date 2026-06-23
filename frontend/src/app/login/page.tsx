'use client';
import React, { useState, Suspense } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginContent() {
  const { loginUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/shop';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Make sure it looks exactly like this for local testing:
const response = await fetch('https://zeverse-backend.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
  });
      

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Authentication matching failed.');
      }

      const data = await response.json();
      loginUser({ email: data.email, token: data.access_token });
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '60px auto', 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      backgroundColor: '#fff', 
      boxShadow: '0 20px 40px rgba(0,0,0,0.04)', 
      minHeight: '550px',
      border: '1px solid #f2f2f2'
    }}>
      
      {/* LEFT PANEL: Deep Emerald Velvet Luxury Mood Panel */}
      <div style={{ 
        backgroundColor: '#0f3c2b', 
        padding: '50px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative overlay hint */}
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(219, 185, 104, 0.1)' }} />
        
        <div>
          <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#dbb968', display: 'block', marginBottom: '15px', fontFamily: 'sans-serif' }}>
            The Vault Identity
          </span>
          <h2 style={{ fontFamily: 'serif', fontSize: '2.5rem', fontWeight: 400, margin: 0, letterSpacing: '2px', lineHeight: '1.2' }}>
            Elevate Your <br />Statement
          </h2>
        </div>

        <div>
          <p style={{ fontFamily: 'serif', fontSize: '14px', italic: 'true', color: '#dbb968', margin: '0 0 8px 0', letterSpacing: '1px' }}>
            “Jewelry is not ordinary accessory; it is an extension of identity.”
          </p>
          <span style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            — ZEVERSE EDITORIAL
          </span>
        </div>
      </div>

      {/* RIGHT PANEL: Crisp White Minimalist Form */}
      <div style={{ padding: '60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: '35px' }}>
          <h3 style={{ fontFamily: 'serif', fontSize: '1.8rem', color: '#0f3c2b', margin: '0 0 6px 0', letterSpacing: '1px' }}>
            Welcome Back
          </h3>
          <p style={{ fontFamily: 'sans-serif', fontSize: '12px', color: '#777', margin: 0, letterSpacing: '0.5px' }}>
            Access your secure profile vault portfolio.
          </p>
        </div>

        {error && (
          <div style={{ 
            color: '#C53030', 
            backgroundColor: '#FFF5F5', 
            padding: '12px 15px', 
            marginBottom: '25px', 
            borderLeft: '3px solid #E53E3E', 
            fontSize: '12px',
            fontFamily: 'sans-serif'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ fontFamily: 'sans-serif', fontSize: '10px', color: '#111', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              Email Address
            </label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="name@luxury.com"
              style={{ width: '100%', padding: '14px 0', border: 'none', borderBottom: '1px solid #ddd', boxSizing: 'border-box', outline: 'none', fontSize: '14px', transition: 'border-color 0.2s', fontFamily: 'sans-serif' }} 
              onFocus={(e) => e.target.style.borderBottom = '1px solid #0f3c2b'}
              onBlur={(e) => e.target.style.borderBottom = '1px solid #ddd'}
            />
          </div>

          <div>
            <label style={{ fontFamily: 'sans-serif', fontSize: '10px', color: '#111', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              Secure Password
            </label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              style={{ width: '100%', padding: '14px 0', border: 'none', borderBottom: '1px solid #ddd', boxSizing: 'border-box', outline: 'none', fontSize: '14px', transition: 'border-color 0.2s', fontFamily: 'sans-serif' }} 
              onFocus={(e) => e.target.style.borderBottom = '1px solid #0f3c2b'}
              onBlur={(e) => e.target.style.borderBottom = '1px solid #ddd'}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              backgroundColor: '#0f3c2b', 
              color: '#dbb968', 
              border: 'none', 
              padding: '16px', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              fontSize: '11px', 
              fontWeight: 600,
              cursor: 'pointer', 
              marginTop: '15px',
              fontFamily: 'sans-serif',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            {loading ? 'Verifying Credentials...' : 'Sign In To Account Vault'}
          </button>
        </form>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px', fontFamily: 'serif', color: '#0f3c2b' }}>Loading luxury profile...</div>}>
      <LoginContent />
    </Suspense>
  );
}