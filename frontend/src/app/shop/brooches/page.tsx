'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BroochesCollectionPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching the overall product collection from your backend server
    fetch('http://127.0.0.1:8000/api/products')
      .then((res) => res.json())
      .then((data) => {
        // Filter elements to only display items belonging to the brooches collection segment
        const broochItems = data.filter((item: any) => item.category === 'brooches');
        setProducts(broochItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching catalog data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontFamily: 'serif', color: '#0f3c2b', letterSpacing: '1px' }}>
        Opening Brooches Curation Vault...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1440px', margin: '40px auto 80px auto', padding: '0 40px', fontFamily: 'sans-serif' }}>
      
      {/* Editorial Luxury Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '60px', borderBottom: '1px solid #f2f2f2', paddingBottom: '40px' }}>
        <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#ab8e4e', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
          Couture Accents
        </span>
        <h1 style={{ fontFamily: 'serif', color: '#0f3c2b', fontSize: '2.8rem', fontWeight: 400, margin: 0, letterSpacing: '2px' }}>
          The Brooches Edition
        </h1>
        <p style={{ color: '#666', fontSize: '14px', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0 auto', lineHeight: '1.6' }}>
          Sculptured lapel masterpieces, hand-painted glass enamels, and antique crest configurations crafted to pin down your identity statement.
        </p>
      </div>

      {/* Structured Minimalist Product Gallery Grid */}
      {products.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'gray', padding: '40px', fontFamily: 'serif', italic: 'true' }}>
          This specific curation is currently transitioning back into active vault production.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px 30px' }}>
          {products.map((item) => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* Product Frame Link Wrap */}
              <Link href={`/shop/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '100%', height: '420px', backgroundColor: '#fdfdfd', overflow: 'hidden', border: '1px solid #f9f9f9', marginBottom: '18px', position: 'relative' }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                
                {/* Content Label Output Meta */}
                <div style={{ padding: '0 5px' }}>
                  <h3 style={{ fontFamily: 'serif', fontSize: '18px', color: '#0f3c2b', margin: '0 0 6px 0', fontWeight: 400, letterSpacing: '0.5px' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '14px', fontWeight: 500, margin: 0, color: '#111' }}>
                    ₹{item.price}
                  </p>
                </div>
              </Link>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}