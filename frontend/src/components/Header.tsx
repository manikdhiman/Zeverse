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
      {/* 👑 COMPLIMENTARY SHIPPING OVERHEAD BAR IN MAROON STRIP */}
      <div style={{
        width: '100%',
        backgroundColor: '#6c171e', 
        color: '#f4dabf',           
        textAlign: 'center',
        padding: '10px 10px',
        fontSize: '0.7rem',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        fontWeight: 500,
        position: shouldBeTransparent ? 'absolute' : 'relative',
        top: 0,
        left: 0,
        zIndex: 100000
      }}>
        COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹15,000
      </div>

      {/* 🧭 MASTER SEAMLESS HOVER FLUID NAVBAR */}
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
        boxShadow: shouldBeTransparent ? 'none' : '0 15px 40px rgba(13, 61, 58, 0.08)',
        borderBottom: shouldBeTransparent ? 'none' : '1px solid rgba(13, 61, 58, 0.1)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 999999
      }}>
        {/* Left Open Navigation Cluster Links */}
        <div style={{ display: 'flex', gap: '35px', alignItems: 'center' }}>
          <Link href="/shop" style={{ textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '2.5px', color: shouldBeTransparent ? '#ffffff' : 'var(--primary-color)', fontWeight: 500, textShadow: shouldBeTransparent ? '0 2px 4px rgba(0,0,0,0.3)' : 'none' }}>SHOP</Link>
          <Link href="/track" style={{ textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '2.5px', color: shouldBeTransparent ? '#ffffff' : 'var(--primary-color)', fontWeight: 500, textShadow: shouldBeTransparent ? '0 2px 4px rgba(0,0,0,0.3)' : 'none' }}>TRACK</Link>
          <Link href="/about" style={{ textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '2.5px', color: shouldBeTransparent ? '#ffffff' : 'var(--primary-color)', fontWeight: 500, textShadow: shouldBeTransparent ? '0 2px 4px rgba(0,0,0,0.3)' : 'none' }}>OUR STORY</Link>
        </div>
        
        {/* Absolute Centered Brand Mark Label */}
        <Link href="/" style={{ textDecoration: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <h1 style={{ margin: 0, fontSize: shouldBeTransparent ? '2.5rem' : '2.1rem', color: shouldBeTransparent ? '#ffffff' : 'var(--primary-color)', letterSpacing: '6px', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', textShadow: shouldBeTransparent ? '0 2px 8px rgba(0,0,0,0.4)' : 'none' }}>Zeverse</h1>
        </Link>

        {/* Right Feature Nodes Context */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center', fontSize: '0.85rem', color: shouldBeTransparent ? '#ffffff' : 'var(--primary-color)', fontWeight: 500, textShadow: shouldBeTransparent ? '0 2px 4px rgba(0,0,0,0.3)' : 'none' }}>
          <Link href="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>SEARCH</Link>
          <Link href="/login" style={{ textDecoration: 'none', color: shouldBeTransparent ? '#ffffff' : 'var(--secondary-maroon)' }}>👤 LOGIN</Link>
          <Link href="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>BAG (0)</Link>
        </div>
      </nav>
      
      {!shouldBeTransparent && <div style={{ height: '110px', width: '100%' }}></div>}
    </>
  );
}