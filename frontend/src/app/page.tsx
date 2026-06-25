"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import styles from './page.module.css';

export default function Home() {
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showStickyNav, setShowStickyNav] = useState(false);

  // 🧭 REGISTER HIGH-FIDELITY SCROLL MONITOR FOR INTERACTIVE HEADER DROP
  useEffect(() => {
    const handleScroll = () => {
      // Invisible at absolute start grid, drops fluidly right after 150px layout boundary context
      if (window.scrollY > 150) {
        setShowStickyNav(true);
      } else {
        setShowStickyNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FETCH CORE BOUTIQUE PRODUCTS WITH LIVE RECOVERY MOCKS
  useEffect(() => {
    const API_ENDPOINT = 'https://zeverse-backend.onrender.com/api/products';
    fetch(API_ENDPOINT)
      .then((res) => {
        if (!res.ok) throw new Error('API down');
        return res.json();
      })
      .then((data) => {
        const sorted = data.filter((p: any) => p.rating >= 4.6).slice(0, 4);
        setBestsellers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Local environment development matrix fallback triggered:', err);
        const mockFallback = [
          {
            id: 1,
            name: "Sunny Resin Daisy Drop Earrings",
            description: "Brighten up your day with these quirky handcrafted yellow resin daisy earrings.",
            price: 349.00,
            images: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80",
            category: "Earrings",
            rating: 4.8
          },
          {
            id: 4,
            name: "Chunky Clay Floral Choker",
            description: "Make a bold statement with this hand-sculpted colorful polymer clay choker.",
            price: 799.00,
            images: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
            category: "Neckpieces",
            rating: 4.9
          }
        ];
        setBestsellers(mockFallback);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.main}>
      
      {/* 🧭 PREMIUM REVEALING NAV: Fully Open Guest Routes (Hidden at start, slides down gracefully) */}
      {showStickyNav && (
        <nav className={styles.navContainerScrolled}>
          <div style={{ display: 'flex', gap: '35px', alignItems: 'center' }}>
            <Link href="/shop" style={{ textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--primary-color)', fontWeight: 600, textTransform: 'uppercase' }}>SHOP</Link>
            <Link href="/track" style={{ textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--primary-color)', fontWeight: 600, textTransform: 'uppercase' }}>TRACK</Link>
            <Link href="/story" style={{ textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--primary-color)', fontWeight: 600, textTransform: 'uppercase' }}>OUR STORY</Link>
          </div>
          
          <Link href="/" style={{ textDecoration: 'none', textAlign: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '1.9rem', color: 'var(--primary-color)', letterSpacing: '5px', fontWeight: 600 }}>ZEVERSE</h1>
            <span style={{ display: 'block', fontSize: '7px', letterSpacing: '4px', color: 'var(--accent-dark)', marginTop: '2px' }}>PREMIUM STATEMENT JEWELRY</span>
          </Link>

          <div style={{ display: 'flex', gap: '30px', alignItems: 'center', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-color)' }}>
            <span style={{ cursor: 'pointer', letterSpacing: '1px' }}>👜 BAG (0)</span>
            {/* Guest navigation remains 100% open, access route profiles optionally */}
            <Link href="/login" style={{ textDecoration: 'none', color: 'var(--accent-dark)', letterSpacing: '1px' }}>👤 LOGIN</Link>
            <Link href="/shop" style={{ textDecoration: 'none', color: 'var(--primary-color)', border: '1px solid var(--primary-color)', padding: '6px 14px', fontSize: '0.75rem', letterSpacing: '1px' }}>EXPLORE VAULT</Link>
          </div>
        </nav>
      )}

      {/* 1. HERO BLOCK LAYER (Edge-To-Edge Fullscreen Picture Canvas Window) */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroSubtitle}>✧ THE ARCHIVAL REGAL COLLECTION ✧</span>
          <h2 className={styles.heroTitle}>A Little Extra Sparkle,<br />For Everyday Moments.</h2>
          <p className={styles.heroText}>
            Hand-poured resin, sculpted clay, and anti-tarnish premium metals. Crafted mindfully for the bold, the bohemian, and the beautiful.
          </p>
          <div className={styles.heroActions}>
            <Link href="/shop" className="btn-primary">Explore Vault</Link>
            <Link href="/shop?collection=Everyday%20Luxe" className="btn-primary" style={{ backgroundColor: 'transparent', color: '#ffffff', borderColor: '#ffffff' }}>Everyday Luxe</Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SYSTEM - CLASSIC BOUTIQUE PORTRAIT RECTANGLES WITHOUT CORNER HOVERS */}
      <section style={{ padding: '120px max(20px, calc((100% - 1200px)/2))', backgroundColor: 'var(--accent-light)' }}>
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', letterSpacing: '2px' }}>Shop By Category</h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent-dark)', marginTop: '8px', fontSize: '1.1rem' }}>
            Curated shapes engineered for sophisticated silhouettes
          </p>
          <div style={{ backgroundColor: 'var(--border-color)', height: '1px', width: '80px', margin: '20px auto 0' }}></div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '24px',
          width: '100%'
        }}>
          {[
            { name: "Earrings", img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Earrings" },
            { name: "Neckpieces", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Neckpieces" },
            { name: "Rings", img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Rings" },
            { name: "Cuffs", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Cuffs%20%26%20Bracelets" },
            { name: "Brooches", img: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Brooches" },
            { name: "Signature Vault", img: "https://images.unsplash.com/photo-1611085583191-a3b1a30a5a40?w=400&auto=format&fit=crop&q=60", query: "/shop" },
          ].map((cat, idx) => (
            <Link href={cat.query} key={idx} className="luxury-hover-card" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              backgroundColor: 'var(--bg-pure)',
              border: '1px solid var(--border-color)',
              padding: '12px',
              borderRadius: '0px'
            }}>
              <div style={{ width: '100%', height: '240px', overflow: 'hidden', position: 'relative', marginBottom: '15px' }}>
                <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-royal)' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-color)', letterSpacing: '1.5px', textTransform: 'uppercase', textAlign: 'center', marginTop: '5px' }}>{cat.name}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FAN FAVORITES/BESTSELLERS MATRIX RE-ANCHORED */}
      <section style={{ padding: '0 max(20px, calc((100% - 1200px)/2)) 100px', backgroundColor: 'var(--accent-light)' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', letterSpacing: '2px' }}>The Fan Favorites</h2>
          <div style={{ backgroundColor: 'var(--border-color)', height: '1px', width: '80px', margin: '20px auto' }}></div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Loading archival pieces...</div>
        ) : (
          <div className={styles.productGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}