"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import styles from './page.module.css';

export default function Home() {
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // 🧭 TRIGGER SCROLL DETECTION INTERFACE
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        console.error('Error fallback context active:', err);
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
      
      {/* 🧭 PREMIUM INLINE INJECTED DYNAMIC NAVBAR OVERLAY */}
      <nav className={isScrolled ? styles.navContainerScrolled : styles.navContainer}>
        <div style={{ display: 'flex', gap: '30px' }}>
          <Link href="/shop" style={{ textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '2px', uppercase: 'true', color: isScrolled ? 'var(--primary-color)' : '#ffffff', fontWeight: 500 }}>SHOP</Link>
          <Link href="/track" style={{ textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '2px', uppercase: 'true', color: isScrolled ? 'var(--primary-color)' : '#ffffff', fontWeight: 500 }}>TRACK</Link>
        </div>
        
        <Link href="/" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem', color: isScrolled ? 'var(--primary-color)' : 'var(--accent-color)', letterSpacing: '4px', transition: 'color 0.3s' }}>ZEVERSE</h1>
          <span style={{ display: 'block', fontSize: '7px', letterSpacing: '3px', color: isScrolled ? 'var(--accent-dark)' : 'rgba(255,255,255,0.7)' }}>PREMIUM STATEMENT JEWELRY</span>
        </Link>

        <div style={{ display: 'flex', gap: '25px', alignItems: 'center', fontSize: '0.85rem', color: isScrolled ? 'var(--primary-color)' : '#ffffff' }}>
          <span style={{ letterSpacing: '1px' }}>👜 BAG (0)</span>
          <span style={{ color: 'var(--accent-dark)', fontWeight: 600 }}>👑 CUSTOMER</span>
        </div>
      </nav>

      {/* 1. HERO SECTION (MOVABLE PARALLAX ACCELERATION) */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroSubtitle} style={{ color: 'var(--accent-color)', fontWeight: 500 }}>
            ✧ THE ARCHIVAL REGAL COLLECTION ✧
          </span>
          <h2 className={styles.heroTitle} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, color: '#ffffff' }}>
            A Little Extra Sparkle,<br />For Everyday Moments.
          </h2>
          <p className={styles.heroText} style={{ color: '#ffffff', opacity: 0.9 }}>
            Hand-poured resin, sculpted clay, and anti-tarnish premium metals. Crafted mindfully for the bold, the bohemian, and the beautiful.
          </p>
          <div className={styles.heroActions}>
            <Link href="/shop" className="btn-primary" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--primary-color)', borderColor: 'var(--accent-color)' }}>
              Explore Vault
            </Link>
            <Link href="/shop?collection=Everyday%20Luxe" className="btn-secondary" style={{ borderColor: '#ffffff', color: '#ffffff' }}>
              Everyday Luxe
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SYSTEM */}
      <section style={{ padding: '80px max(20px, calc((100% - 1200px)/2))', backgroundColor: 'var(--accent-light)' }}>
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>Shop By Category</h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent-dark)', marginTop: '5px' }}>
            Curated shapes engineered for sophisticated silhouettes
          </p>
          <div style={{ backgroundColor: 'var(--border-color)', height: '1px', width: '80px', margin: '15px auto 0' }}></div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
          gap: '30px',
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
              alignItems: 'center', 
              textDecoration: 'none',
              padding: '15px',
              backgroundColor: 'var(--bg-pure)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px'
            }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--border-color)', marginBottom: '15px' }}>
                <img src={cat.img} alt={cat.name} className="circle-window-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--primary-color)', letterSpacing: '1px', textTransform: 'uppercase' }}>{cat.name}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BESTSELLERS */}
      <section style={{ backgroundColor: 'var(--accent-light)', paddingBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>The Fan Favorites</h2>
          <div style={{ backgroundColor: 'var(--border-color)', height: '1px', width: '80px', margin: '15px auto' }}></div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center' }}>Loading luxury collection...</div>
        ) : (
          <div className={styles.productGrid}>
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}