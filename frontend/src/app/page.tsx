"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_ENDPOINT = 'https://zeverse-backend.onrender.com/api/products';
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.filter((p: any) => p.rating >= 4.5).slice(0, 4);
        setBestsellers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Resilient Recovery Engine Triggered:', err);
        // Robust mock dataset matching categories perfectly
        const mockFallback = [
          { id: 1, name: "Empress Emerald AD Choker Set", price: "2,499", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80", tag: "AD EARRINGS & SETS" },
          { id: 2, name: "Baroque Coastal Anti-Tarnish Cuffs", price: "1,199", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&auto=format&fit=crop&q=80", tag: "ANTI-TARNISH" },
          { id: 3, name: "Neo-Traditional Terracotta Jhumkas", price: "899", img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&auto=format&fit=crop&q=80", tag: "HERITAGE JEWELLERY" },
          { id: 4, name: "Seoul Pastel Polymer Clay Drops", price: "649", img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&auto=format&fit=crop&q=80", tag: "KOREAN / QUIRKY" }
        ];
        setBestsellers(mockFallback);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.main}>
      
      {/* 👑 SECTION 1: MASTER HERO RECTANGLE CANVAS */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroSubtitle}>NEW ARRIVALS — THE VERDANT EDIT</span>
          <h2 className={styles.heroTitle}>Heirlooms for the everyday.</h2>
          <p className={styles.heroText}>
            Fine luxury jewellery designed in India — engineered with anti-tarnish protective coatings, premium AD settings, and hand-molded polymer elements.
          </p>
          <div className={styles.heroActions}>
            <Link href="/shop" className="btn-luxury-solid">Shop The Edit</Link>
            <Link href="/about" className="btn-luxury-text-link">Our Story</Link>
          </div>
        </div>
      </section>

      {/* 🆕 SECTION 2: THE NEW LAUNCHES SPOTLIGHT MARQUEE ROW */}
      <section className={styles.sectionPadding}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>JUST RELEASED</span>
          <h2 className={styles.sectionTitle}>The New Launches</h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.extendedGrid}>
          {[
            { title: "Western Minimalist Drops", desc: "Sleek daily silhouettes", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=80", path: "/shop?category=Western" },
            { title: "Heritage Revival Chokers", desc: "Royal traditional aesthetics", img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&auto=format&fit=crop&q=80", path: "/shop?category=Heritage" },
            { title: "Anti-Tarnish Statement Rings", desc: "Waterproof daily essentials", img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&auto=format&fit=crop&q=80", path: "/shop?category=Rings" }
          ].map((item, idx) => (
            <div key={idx} className={styles.premiumCard}>
              <div className={styles.imageWrapper}>
                <img src={item.img} alt={item.title} className={styles.zoomImage} />
                <span className={styles.cardBadge}>NEW IN</span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
              <Link href={item.path} className={styles.cardLink}>Explore Collection →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* 🌿 SECTION 3: THE HIGH-FASHION DYNAMIC DOCK MATRIX (ALL ACCESSORIES) */}
      <section style={{ backgroundColor: 'rgba(13, 61, 58, 0.04)', padding: '100px max(20px, calc((100% - 1200px)/2))' }}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>CURATED CATEGORIES</span>
          <h2 className={styles.sectionTitle}>Shop By Accessory Aesthetic</h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.categoryGrid}>
          {[
            { name: "Cuffs & Bracelets", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", query: "Cuffs" },
            { name: "Western Earrings", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80", query: "Western" },
            { name: "Korean Accents", img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80", query: "Korean" },
            { name: "Anti-Tarnish Shield", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", query: "AntiTarnish" },
            { name: "AD Sparkling Solitaires", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80", query: "AD" },
            { name: "Quirky & Statement", img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&q=80", query: "Quirky" },
            { name: "Traditional Jhumkas", img: "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?w=400&q=80", query: "Traditional" },
            { name: "Heritage Masterpieces", img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80", query: "Heritage" },
            { name: "Luxury Rings", img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&q=80", query: "Rings" },
            { name: "Sculpted Neckpieces", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", query: "Neckpieces" }
          ].map((cat, idx) => (
            <Link href={`/shop?category=${cat.query}`} key={idx} className={styles.categoryTile}>
              <div className={styles.tileImageContainer}>
                <img src={cat.img} alt={cat.name} className={styles.tileImage} />
                <div className={styles.tileOverlay}>
                  <span className={styles.tileName}>{cat.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🏆 SECTION 4: THE BESTSELLERS LIVE PIPELINE STREAM */}
      <section className={styles.sectionPadding}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>CUSTOMER FAVOURITES</span>
          <h2 className={styles.sectionTitle}>The Zeverse Bestsellers</h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.extendedGrid}>
          {bestsellers.map((product) => (
            <div key={product.id} className={styles.productDisplayCard}>
              <div className={styles.productImageWrapper}>
                <img src={product.img} alt={product.name} className={product.id === 1 ? styles.customImageCenter : styles.zoomImage} />
                <span className={styles.bestsellerBadge}>🔥 TOP RATIO</span>
              </div>
              <div style={{ marginTop: '16px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--secondary-maroon)', letterSpacing: '1px', fontWeight: 600, textTransform: 'uppercase' }}>{product.tag}</span>
                <h4 style={{ fontSize: '1.1rem', margin: '6px 0', color: 'var(--primary-color)', lineHeight: '1.4' }}>{product.name}</h4>
                <p style={{ fontSize: '1rem', color: 'var(--primary-color)', fontWeight: 600 }}>₹{product.price}.00</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}