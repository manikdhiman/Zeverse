'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { user, logoutUser } = useAuth();
  const { cart } = useCart();

  const totalCartItems = cart ? cart.reduce((total: number, item: any) => total + item.quantity, 0) : 0;

  return (
    <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #f2f2f2', position: 'sticky', top: 0, zIndex: 1000, fontFamily: 'serif' }}>
      {/* Premium Promotional Top Ribbon */}
      <div style={{ backgroundColor: '#0f3c2b', color: '#dbb968', fontSize: '11px', textAlign: 'center', padding: '10px 20px', letterSpacing: '2px', fontWeight: 400, textTransform: 'uppercase' }}>
        ✦ FREE SHIPPING ON LUXURY ORDERS ABOVE ₹999 ✦ ANTI-TARNISH GUARANTEE ✦
      </div>

      {/* Main Structural Navigation Bar */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '25px 40px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
        
        {/* LEFT COLUMN: Main Navigation Links */}
        <nav style={{ display: 'flex', gap: '25px', fontSize: '12px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
          <Link href="/shop" style={{ color: '#444', textDecoration: 'none' }}>Shop</Link>
          <Link href="/track-order" style={{ color: '#444', textDecoration: 'none' }}>Track</Link>
          <Link href="/about" style={{ color: '#444', textDecoration: 'none' }}>Our Story</Link>
        </nav>

        {/* CENTER COLUMN: Perfectly Centered Editorial Branding Header */}
        <div style={{ textAlign: 'center' }}>
          <Link href="/" style={{ color: '#0f3c2b', textDecoration: 'none', fontSize: '2.6rem', letterSpacing: '8px', fontWeight: 700, display: 'block' }}>
            ZEVERSE
          </Link>
          <span style={{ display: 'block', fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#ab8e4e', marginTop: '4px', fontFamily: 'sans-serif', fontWeight: 500 }}>
            Premium Statement Jewelry
          </span>
        </div>

        {/* RIGHT COLUMN: Shopping Bag sitting right next to Login */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '30px', fontFamily: 'sans-serif', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          
          {/* Shopping Bag Icon - Left of Login */}
          <Link href="/cart" style={{ color: '#111', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
            <span style={{ fontSize: '18px', fontWeight: 300 }}>👜</span>
            <span style={{ fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', color: '#111', fontWeight: 500 }}>Bag</span>
            {totalCartItems > 0 && (
              <span style={{ backgroundColor: '#0f3c2b', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginLeft: '-2px' }}>
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* Secure Identity Profile / Vault Action Portal */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: '#0f3c2b', fontWeight: 600, textTransform: 'none', fontFamily: 'serif', fontSize: '14px' }}>
                👑 {user.email.split('@')[0]}
              </span>
              <button 
                onClick={logoutUser} 
                style={{ background: 'none', border: '1px solid #0f3c2b', padding: '6px 14px', fontSize: '10px', letterSpacing: '1px', cursor: 'pointer', color: '#0f3c2b', textTransform: 'uppercase', fontWeight: 600 }}
              >
                Exit Vault
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              style={{ color: '#111', textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid #111', paddingBottom: '2px' }}
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}