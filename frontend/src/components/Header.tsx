"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldBeTransparent = isHome && !isScrolled;

  return (
    <>
      {/* Dynamic font face style booster for Didot Regular */}
      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/didot');
        .didot-font {
          font-family: 'Didot', 'Didot LT STD', 'GF_Didot', serif !important;
        }
      `}</style>

      {/* COMPLIMENTARY SHIPPING BAR OVERHEAD */}
      <div style={{
        width: '100%',
        backgroundColor: '#0b2217',
        color: '#ffffff',
        textAling: 'center',
        padding: '10px 10px',
        fontSize: '0.7rem',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        fontWeight: 500,
        position: shouldBeTransparent ? 'absolute' : 'relative',
        textAlign: 'center',
        top: 0,
        left: 0,
        zIndex: 100000
      }}>
        COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹15,000
      </div>

      {/* 🧭 NAV CONFIGURATION LAYER */}
      <nav style={{
        position: shouldBeTransparent ? 'absolute' : 'fixed',
        top: shouldBeTransparent ? '40px' : '0',
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: shouldBeTransparent ? '25px 50px' : '16px 50px',
        backgroundColor: shouldBeTransparent ? 'transparent' : '#ffffff',
        boxShadow: shouldBeTransparent ? 'none' : '0 15px 40px rgba(18, 53, 36, 0.08)',
        borderBottom: shouldBeTransparent ? 'none' : '1px solid #e5dcc7',
        transition: 'all 0.5s cubic-bezier(0.2, 1, 0.2, 1)',
        zIndex: 999999
      }}>
        {/* Left Cluster Links */}
        <div style={{ display: 'flex', gap: '35px', alignItems: 'center' }}>
          <Link href="/shop" className="didot-font" style={{ textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '2.5px', color: shouldBeTransparent ? '#ffffff' : 'var(--primary-color)', fontWeight: 500, textShadow: shouldBeTransparent ? '0 2px 4px rgba(0,0,0,0.3)' : 'none' }}>SHOP</Link>
          <Link href="/track-order" className="didot-font" style={{ textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '2.5px', color: shouldBeTransparent ? '#ffffff' : 'var(--primary-color)', fontWeight: 500, textShadow: shouldBeTransparent ? '0 2px 4px rgba(0,0,0,0.3)' : 'none' }}>TRACK</Link>
          
          {/* ✅ FIXED ROUTE: Pointed straight to '/about' instead of '/story' to kill the 404 error */}
          <Link href="/about" className="didot-font" style={{ textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '2.5px', color: shouldBeTransparent ? '#ffffff' : 'var(--primary-color)', fontWeight: 500, textShadow: shouldBeTransparent ? '0 2px 4px rgba(0,0,0,0.3)' : 'none' }}>OUR STORY</Link>
        </div>
        
        {/* Center Title Logo */}
        <Link href="/" style={{ textDecoration: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <h1 className="didot-font" style={{ margin: 0, fontSize: shouldBeTransparent ? '2.5rem' : '2.1rem', color: shouldBeTransparent ? '#ffffff' : 'var(--primary-color)', letterSpacing: '6px', fontWeight: 'normal', transition: 'all 0.4s cubic-bezier(0.2, 1, 0.2, 1)', textShadow: shouldBeTransparent ? '0 2px 8px rgba(0,0,0,0.4)' : 'none' }}>Zeverse</h1>
        </Link>

        {/* Right Feature Set */}
        <div className="didot-font" style={{ display: 'flex', gap: '30px', alignItems: 'center', fontSize: '0.85rem', color: shouldBeTransparent ? '#ffffff' : 'var(--primary-color)', fontWeight: 500, textShadow: shouldBeTransparent ? '0 2px 4px rgba(0,0,0,0.3)' : 'none' }}>
          <Link href="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>SEARCH</Link>
          <Link href="/login" style={{ textDecoration: 'none', color: shouldBeTransparent ? '#ffffff' : 'var(--accent-dark)' }}>👤 LOGIN</Link>
          <Link href="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>BAG (0)</Link>
        </div>
      </nav>
      
      {!shouldBeTransparent && <div style={{ height: '110px', width: '100%' }}></div>}
    </>
  );
}