"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import styles from './page.module.css';

export default function Home() {
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
        console.error('Local backup loop:', err);
        const mock = [
          { id: 1, name: "Sunny Resin Daisy Drop Earrings", price: 349.00, images: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80", rating: 4.8 }
        ];
        setBestsellers(mock);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.main}>
      
      {/* 👑 PREMIUM IMAGE_22886a.JPG MATCH HERO CANVAS */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroSubtitle}>NEW — THE VERDANT EDIT</span>
          <h2 className={styles.heroTitle}>Heirlooms for the everyday.</h2>
          <p className={styles.heroText}>
            Fine jewellery designed in India — in recycled 18k gold and responsibly sourced emeralds. Built to be worn, layered, and loved for a lifetime.
          </p>
          
          {/* ✅ FIXED: High-contrast luxury sharp button elements */}
          <div className={styles.heroActions}>
            <Link href="/shop" className="btn-luxury-solid">Shop The Edit</Link>
            <Link href="/about" className="btn-luxury-text-link">Our Story</Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES RECTANGLE SYSTEM */}
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
            <Link href={cat.query} key={idx} className="luxury-hover-card" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-pure)', border: '1px solid #e5dcc7', padding: '12px', borderRadius: '0px', textDecoration: 'none' }}>
              <div style={{ width: '100%', height: '260px', overflow: 'hidden', position: 'relative', marginBottom: '15px' }}>
                <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-color)', letterSpacing: '1.5px', textTransform: 'uppercase', textAlign: 'center' }}>{cat.name}</h4>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}