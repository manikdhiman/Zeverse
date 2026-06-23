import React from 'react';
import Link from 'next/link';

export default function ShopRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: '1440px', margin: '20px auto 0 auto', padding: '0 40px', fontFamily: 'sans-serif' }}>
      
      {/* Centralized Global Back Button */}
      <div style={{ padding: '20px 0 10px 0' }}>
        <Link 
          href="/" 
          style={{ 
            textDecoration: 'none', 
            color: '#ab8e4e', 
            fontSize: '12px', 
            letterSpacing: '1.5px', 
            textTransform: 'uppercase', 
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          ← Return to Home
        </Link>
      </div>

      {/* Renders the child sub-directories smoothly */}
      {children}
      
    </div>
  );
}