"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import styles from './page.module.css';

export default function Home() {
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // 🧭 HIGH PERFORMANCE TRANSITION MATRIX: Hardware-accelerated window listener
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

  useEffect(() => {
    const API_ENDPOINT = 'https://zeverse-backend.onrender.com/api/products';
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.filter((p: any) => p.rating >= 4.6).slice(0, 4);
        setBestsellers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Local engine standby recovery initialization:', err);
        const mock = [
          { id: 1, name: "Sunny Resin Daisy Drop Earrings", price: 349.00, images: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80", rating: 4.8 }
        ];
        setBestsellers(mock);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.main}>
      
      {/* 👑 COMPLIMENTARY SHIPPING PROMO ANNOUNCEMENT STRIP */}
      <div className={styles.promoBar}>
        COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹15,000
      </div>

      {/* 🧭 SINGLE MASTER INTERACTIVE NAV LAYER: Eliminates layout stutter/jumping bugs */}
      <nav className={`${styles.masterNavbar} ${isScrolled ? styles.masterNavbarScrolled : styles.masterNavbarInitial}`}>
        
        {/* 1. Dynamic Left Links Cluster */}
        <div style={{ display: 'flex', gap: '35px', alignItems: 'center' }}>
          <Link href="/shop" style={{ textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2.5px', color: isScrolled ? 'var(--primary-color)' : '#ffffff', fontWeight: 600, transition: 'color 0.3s', textShadow: isScrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.3)' }}>SHOP</Link>
          <Link href="/track" style={{ textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2.5px', color: isScrolled ? 'var(--primary-color)' : '#ffffff', fontWeight: 600, transition: 'color 0.3s', textShadow: isScrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.3)' }}>TRACK</Link>
          <Link href="/story" style={{ textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2.5px', color: isScrolled ? 'var(--primary-color)' : '#ffffff', fontWeight: 600, transition: 'color 0.3s', textShadow: isScrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.3)' }}>OUR STORY</Link>
        </div>
        
        {/* 2. Absolute Centered Luxury Typography Brand Label */}
        <Link href="/" style={{ textDecoration: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <h1 style={{ margin: 0, fontSize: isScrolled ? '1.9rem' : '2.3rem', color: isScrolled ? 'var(--primary-color)' : '#ffffff', letterSpacing: '6px', fontWeight: 400, fontFamily: 'var(--font-serif)', transition: 'all 0.4s cubic-bezier(0.2, 1, 0.2, 1)', textShadow: isScrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.4)' }}>Zeverse</h1>
        </Link>

        {/* 3. Right Functional Action Node Clusters */}
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center', fontSize: '0.8rem', color: isScrolled ? 'var(--primary-color)' : '#ffffff', fontWeight: 600, transition: 'color 0.3s', textShadow: isScrolled ? 'none' : '0 2px 4px rgba(0,0,0,0.3)' }}>
          <Link href="/shop" style={{ textDecoration: 'none', color: isScrolled ? 'var(--primary-color)' : '#ffffff', transition: 'color 0.3s' }}>
            
          </Link>
          <Link href="/login" style={{ textDecoration: 'none', color: isScrolled ? 'var(--accent-dark)' : '#ffffff', transition: 'color 0.3s', letterSpacing: '1px' }}>👤 LOGIN</Link>
          <Link href="/cart" style={{ textDecoration: 'none', color: isScrolled ? 'var(--primary-color)' : '#ffffff', transition: 'color 0.3s', letterSpacing: '1px' }}>BAG (0)</Link>
        </div>
      </nav>

      {/* 1. HERO ARCHITECTURE BLOCK */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroSubtitle}>NEW — THE VERDANT EDIT</span>
          <h2 className={styles.heroTitle}>Heirlooms for the everyday.</h2>
          <p className={styles.heroText}>
            Fine jewellery designed in India — in recycled 18k gold and responsibly sourced emeralds. Built to be worn, layered, and loved for a lifetime.
          </p>
          <div className={styles.heroActions}>
            <Link href="/shop" className="btn-luxury-solid">Shop The Edit</Link>
            <Link href="/story" className="btn-luxury-text" style={{ borderBottom: '1px solid #ffffff', paddingBottom: '4px' }}>Our Story</Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES RECTANGLE TILES */}
      <section style={{ padding: '120px max(20px, calc((100% - 1200px)/2))', backgroundColor: 'var(--accent-light)' }}>
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', letterSpacing: '2px' }}>Shop By Category</h2>
          <div style={{ backgroundColor: '#e5dcc7', height: '1px', width: '80px', margin: '20px auto 0' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', width: '100%' }}>
          {[
            { name: "Rings", img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Rings" },
            { name: "Necklaces", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Neckpieces" },
            { name: "Earrings", img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Earrings" },
            { name: "Bracelets", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Cuffs%20%26%20Bracelets" }
          ].map((cat, idx) => (
            <Link href={cat.query} key={idx} className="luxury-hover-card" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-pure)', border: '1px solid #e5dcc7', padding: '12px', borderRadius: '0px' }}>
              <div style={{ width: '100%', height: '260px', overflow: 'hidden', position: 'relative', marginBottom: '15px' }}>
                <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-color)', letterSpacing: '1.5px', textTransform: 'uppercase', textAlign: 'center' }}>{cat.name}</h4>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}