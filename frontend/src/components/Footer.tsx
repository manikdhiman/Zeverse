"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#123524', /* Strict Pantone 19-5220 Botanical Green Deep Layer */
      padding: '80px max(40px, calc((100% - 1300px)/2)) 40px',
      borderTop: '1px solid rgba(229, 220, 199, 0.15)',
      width: '100%'
    }}>
      {/* 4-Column Grid Structure with High-Contrast Typography Mapping */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
        marginBottom: '60px'
      }}>
        
        {/* Column 1: Brand Info Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '2rem', 
            color: '#dfba6b', /* Imperial Warm Gold Branding Label */
            letterSpacing: '3px',
            margin: 0
          }}>ZEVERSE</h2>
          <p style={{ 
            fontSize: '0.9rem', 
            lineHeight: '1.6', 
            color: 'rgba(255, 255, 255, 0.85)', /* ✅ FIXED: Changed from dark green text to readable pristine high contrast white */
            maxWidth: '280px'
          }}>
            Handcrafted, quirky, and premium jewelry designed to make you feel unique. We believe in adding 'a little extra' sparkle to your everyday moments with anti-tarnish, hypoallergenic creations.
          </p>
        </div>

        {/* Column 2: Quick Links Links Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h4 style={{ fontSize: '1rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#dfba6b', fontWeight: 600 }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/shop" style={{ textDecoration: 'none', fontSize: '0.9rem', color: '#ffffff', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>Shop All</Link>
            <Link href="/track" style={{ textDecoration: 'none', fontSize: '0.9rem', color: '#ffffff', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>Track Your Order</Link>
            <Link href="/story" style={{ textDecoration: 'none', fontSize: '0.9rem', color: '#ffffff', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>Our Story</Link>
            <Link href="/contact" style={{ textDecoration: 'none', fontSize: '0.9rem', color: '#ffffff', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>Get in Touch</Link>
            <Link href="/faqs" style={{ textDecoration: 'none', fontSize: '0.9rem', color: '#ffffff', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>FAQs</Link>
          </div>
        </div>

        {/* Column 3: Shop Categories Grid Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h4 style={{ fontSize: '1rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#dfba6b', fontWeight: 600 }}>Shop Categories</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/shop?category=Earrings" style={{ textDecoration: 'none', fontSize: '0.9rem', color: '#ffffff', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>Statement Earrings</Link>
            <Link href="/shop?category=Neckpieces" style={{ textDecoration: 'none', fontSize: '0.9rem', color: '#ffffff', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>Necklaces & Chokers</Link>
            <Link href="/shop?category=Rings" style={{ textDecoration: 'none', fontSize: '0.9rem', color: '#ffffff', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>Chunky Rings</Link>
            <Link href="/shop?category=Cuffs%20%26%20Bracelets" style={{ textDecoration: 'none', fontSize: '0.9rem', color: '#ffffff', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>Cuffs & Bangles</Link>
            <Link href="/shop?category=Brooches" style={{ textDecoration: 'none', fontSize: '0.9rem', color: '#ffffff', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#dfba6b'} onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}>Artistic Brooches</Link>
          </div>
        </div>

        {/* Column 4: Newsletter Box Integration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h4 style={{ fontSize: '1rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#dfba6b', fontWeight: 600 }}>Stay in the Loop</h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'rgba(255, 255, 255, 0.85)' }}>
            Subscribe to receive styling guides, new collection launches, and exclusive member discounts.
          </p>
          
          <div style={{ display: 'flex', width: '100%', marginTop: '10px' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={{
                flex: 1,
                padding: '14px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(229, 220, 199, 0.3)',
                borderRight: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                outline: 'none',
                borderRadius: '0px'
              }} 
            />
            <button style={{
              padding: '0 24px',
              backgroundColor: '#bfa37a', /* Golden Accent Sand Trigger */
              color: '#123524',
              border: '1px solid #bfa37a',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '0px',
              transition: 'var(--transition-royal)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#123524'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#bfa37a'; e.currentTarget.style.color = '#123524'; e.currentTarget.style.borderColor = '#bfa37a'; }}
            >
              JOIN
            </button>
          </div>
        </div>

      </div>

      {/* Low Ground Meta Strip Separator */}
      <div style={{
        borderTop: '1px solid rgba(229, 220, 199, 0.1)',
        paddingTop: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>
          © {new Date().getFullYear()} Zeverse Jewelry. All Rights Reserved.
        </span>
        
        {/* Payment Gateways Badges Mocks */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {['UPI', 'Cards', 'Net Banking', 'COD'].map((method, i) => (
            <span key={i} style={{
              fontSize: '0.7rem',
              color: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(229, 220, 199, 0.2)',
              padding: '4px 10px',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>{method}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}