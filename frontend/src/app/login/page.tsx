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
      const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
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
    <div style={{ maxWidth: '420px', margin: '100px auto', padding: '40px 30px', border: '1px solid #eee', backgroundColor: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <span style={{ fontSize: '11px', letterSpacing: '2px', color: 'gray', textTransform: 'uppercase' }}>Secure Gateway</span>
        <h2 style={{ color: '#0f3c2b', fontFamily: 'serif', fontSize: '2rem', margin: '5px 0' }}>Vault Identity</h2>
      </div>

      {error && <div style={{ color: '#C53030', backgroundColor: '#FFF5F5', padding: '12px', marginBottom: '20px', border: '1px solid #FFD3D3', fontSize: '14px' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ fontSize: '12px', color: 'gray', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>Email Profile</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: 'gray', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>Secure Pin / Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" disabled={loading} style={{ backgroundColor: '#0f3c2b', color: '#fff', border: 'none', padding: '15px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '13px', cursor: 'pointer', marginTop: '10px' }}>
          {loading ? 'Authenticating Matrix...' : 'Open Account Vault →'}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading authorization profile...</div>}>
      <LoginContent />
    </Suspense>
  );
}