"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import styles from './page.module.css';

export default function Home() {
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamic environment endpoint tracking
  useEffect(() => {
    const API_ENDPOINT = process.env.NODE_ENV === 'production' 
      ? 'https://zeverse-backend.onrender.com/api/products'
      : 'https://zeverse-backend.onrender.com/api/products'; // Uses production pipeline cluster

    fetch(API_ENDPOINT)
      .then((res) => {
        if (!res.ok) throw new Error('API down');
        return res.json();
      })
      .then((data) => {
        const sorted = data
          .filter((p: any) => p.rating >= 4.6)
          .slice(0, 4);
        setBestsellers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching bestsellers, using mock fallback:', err);
        const mockFallback = [
          {
            id: 1,
            name: "Sunny Resin Daisy Drop Earrings",
            description: "Brighten up your day with these quirky handcrafted yellow resin daisy earrings.",
            price: 349.00,
            images: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80",
            category: "Earrings",
            collection: "Everyday Luxe",
            rating: 4.8,
            stock: 15
          },
          {
            id: 4,
            name: "Chunky Clay Floral Choker",
            description: "Make a bold statement with this hand-sculpted colorful polymer clay choker.",
            price: 799.00,
            images: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
            category: "Neckpieces",
            collection: "Beach Vacation",
            rating: 4.9,
            stock: 5
          },
          {
            id: 5,
            name: "Heritage Emerald Bead Necklace",
            description: "A magnificent multilayered green bead neckpiece embedded with traditional gold spacers.",
            price: 1299.00,
            images: "https://images.unsplash.com/photo-1611085583191-a3b1a30a5a40?w=800&auto=format&fit=crop&q=80",
            category: "Neckpieces",
            collection: "Wedding",
            rating: 4.7,
            stock: 10
          },
          {
            id: 9,
            name: "Whimsical Peacock Enamel Brooch",
            description: "Add a touch of majestic art to your blazers, saris, or coats.",
            price: 449.00,
            images: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
            category: "Brooches",
            collection: "Festive",
            rating: 4.7,
            stock: 14
          }
        ];
        setBestsellers(mockFallback);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.main}>
      {/* 1. HERO SECTION */}
      <section className={styles.hero} style={{ position: 'relative', overflow: 'hidden' }}>
        <div className={`${styles.heroContent} reveal-on-scroll`}>
          <span className={styles.heroSubtitle} style={{ color: 'var(--accent-dark)', fontWeight: 500, letterSpacing: '4px' }}>
            ✧ THE ARCHIVAL REGAL COLLECTION ✧
          </span>
          <h2 className={styles.heroTitle} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
            A Little Extra Sparkle,<br />For Everyday Moments.
          </h2>
          <p className={styles.heroText} style={{ opacity: 0.85, fontStyle: 'normal' }}>
            Hand-poured resin, sculpted clay, and anti-tarnish premium metals. Crafted mindfully for the bold, the bohemian, and the beautiful.
          </p>
          <div className={styles.heroActions}>
            <Link href="/shop" className="btn-primary">
              Explore Vault
            </Link>
            <Link href="/shop?collection=Everyday%20Luxe" className="btn-secondary" style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}>
              Everyday Luxe
            </Link>
          </div>
        </div>
      </section>

      {/* 2. UPGRADED CATEGORY SYSTEM (6-Column Balanced Architecture No Empty Spaces) */}
      <section className={`${styles.categories} reveal-on-scroll`} style={{ padding: '80px max(20px, calc((100% - 1200px)/2))' }}>
        <div className={styles.sectionHeader} style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>Shop By Category</h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent-dark)', marginTop: '5px' }}>
            Curated shapes engineered for sophisticated silhouettes
          </p>
          <div className={styles.titleDivider} style={{ backgroundColor: 'var(--border-color)', height: '1px', width: '80px', margin: '15px auto 0' }}></div>
        </div>

        {/* Symmetric Grid Integration */}
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
              <div style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                overflow: 'hidden',
                border: '2px solid var(--border-color)',
                boxShadow: '0 8px 20px rgba(6,28,25,0.04)',
                marginBottom: '15px'
              }}>
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="circle-window-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <h4 style={{ 
                fontFamily: 'var(--font-sans)', 
                fontSize: '0.9rem', 
                fontWeight: 500, 
                color: 'var(--primary-color)',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>{cat.name}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BESTSELLERS */}
      <section className={styles.bestsellers}>
        <div className={styles.sectionHeader}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>The Fan Favorites</h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--accent-dark)' }}>
            Our most-loved pieces, chosen by you.
          </p>
          <div className={styles.titleDivider}></div>
        </div>

        {loading ? (
          <div className={styles.loader}>Loading luxury collection...</div>
        ) : (
          <div className={styles.productGrid}>
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className={styles.viewAllRow}>
          <Link href="/shop" className="btn-secondary">
            View All Jewelry
          </Link>
        </div>
      </section>

      {/* 4. BRAND USPs / VALUES */}
      <section className={styles.usps} style={{ backgroundColor: 'var(--primary-color)', color: '#fff', padding: '80px 20px' }}>
        <div className={styles.uspContainer}>
          <div className={styles.uspCard}>
            <span className={styles.uspIcon} style={{ color: 'var(--accent-color)' }}>🌿</span>
            <h3 style={{ color: 'var(--accent-color)' }}>Handcrafted Details</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Each jewelry piece is carefully poured, painted, and polished by hand, making every design uniquely yours.</p>
          </div>
          <div className={styles.uspCard}>
            <span className={styles.uspIcon} style={{ color: 'var(--accent-color)' }}>✨</span>
            <h3 style={{ color: 'var(--accent-color)' }}>Anti-Tarnish Polish</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Finished with premium protective layers to keep your jewelry glowing and bright through daily wear.</p>
          </div>
          <div className={styles.uspCard}>
            <span className={styles.uspIcon} style={{ color: 'var(--accent-color)' }}>