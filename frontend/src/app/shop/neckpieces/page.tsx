'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NeckpiecesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(3000);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p: any) => p.category.toLowerCase() === 'neckpieces');
        setProducts(filtered);
        setLoading(false);
      });
  }, []);

  const displayedProducts = products.filter((p) => p.price <= maxPrice);

  if (loading) return <div style={{ textAlign: 'center', padding: '15px', color: '#0f3c2b' }}>LOADING NECKPIECES VAULT...</div>;

  return (
    <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto', padding: '60px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #111', paddingBottom: '20px', marginBottom: '40px' }}>
        <div>
          <span style={{ fontSize: '11px', letterSpacing: '3px', color: 'gray', textTransform: 'uppercase' }}>Zeverse Artisan Series</span>
          <h1 style={{ color: '#0f3c2b', fontSize: '3rem', fontFamily: 'serif', margin: '10px 0 0 0', fontWeight: 'normal' }}>Luxury Neckpieces</h1>
        </div>
        <div style={{ width: '300px', paddingBottom: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: '#111' }}>
            <span>Filter Max Price:</span>
            <span>₹{maxPrice}</span>
          </div>
          <input type="range" min="300" max="3000" step="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: '100%', accentColor: '#0f3c2b' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '50px 40px' }}>
        {displayedProducts.map((product) => (
          <div key={product.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100%', height: '480px', overflow: 'hidden', backgroundColor: '#f9f9f9', marginBottom: '20px' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '0 10px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#111', fontSize: '20px', fontFamily: 'serif' }}>{product.name}</h4>
              <p style={{ margin: '0 0 20px 0', fontWeight: '600', fontSize: '16px', color: '#0f3c2b' }}>₹{product.price}</p>
              <Link href={`/shop/${product.id}`} style={{ display: 'block', textAlign: 'center', backgroundColor: '#0f3c2b', color: '#fff', textDecoration: 'none', padding: '15px' }}>
                Inspect Piece →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}