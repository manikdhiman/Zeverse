'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const urlCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSelectedCategory(urlCategory);
  }, [urlCategory]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch catalog.');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      router.push('/shop');
    } else {
      router.push(`/shop?category=${category.toLowerCase()}`);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesPrice = product.price <= maxPrice;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  if (loading) return <div style={{ textAlign: 'center', padding: '150px 20px', color: '#0f3c2b', fontWeight: '600', letterSpacing: '1px' }}>LOADING COLLECTION VAULTS...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '150px 20px', color: '#C53030' }}><h3>Backend Server Offline</h3><p>Make sure FastAPI is running on port 8000!</p></div>;

  // Check if we are looking at a specific collection or everything
  const isFilteredView = selectedCategory !== 'all';

  return (
    <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto', padding: '60px 40px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      
      {/* 1. LUXURY HEADER HEADER BLOCK */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #111', paddingBottom: '20px', marginBottom: '50px' }}>
        <div>
          <span style={{ fontSize: '11px', letterSpacing: '3px', color: 'gray', textTransform: 'uppercase' }}>Zeverse Curated Series</span>
          <h1 style={{ color: '#0f3c2b', fontSize: '3rem', fontFamily: 'serif', margin: '10px 0 0 0', fontWeight: 'normal', textTransform: 'capitalize' }}>
            {selectedCategory === 'all' ? 'Shop All Collections' : selectedCategory}
          </h1>
        </div>

        {/* Inline Slider Filter right on top to completely replace empty space */}
        <div style={{ width: '320px', paddingBottom: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', fontWeight: '500', color: '#111' }}>
            <span>Max Budget Threshold:</span>
            <span>₹{maxPrice}</span>
          </div>
          <input 
            type="range" min="300" max="3000" step="50" value={maxPrice} 
            onChange={(e) => setMaxPrice(Number(e.target.value))} 
            style={{ width: '100%', accentColor: '#0f3c2b', cursor: 'pointer' }} 
          />
        </div>
      </div>
      
      {/* 2. FLEX CONTAINER CONFIGURATION */}
      <div style={{ display: 'flex', gap: '50px', alignItems: 'flex-start' }}>
        
        {/* SIDEBAR BLOCK: Hidden completely if viewing a dedicated option category like Earrings */}
        {!isFilteredView && (
          <aside style={{ width: '240px', flexShrink: 0, position: 'sticky', top: '20px', backgroundColor: '#f9f9f9', padding: '25px 20px', borderRadius: '4px', border: '1px solid #eee' }}>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px', color: '#0f3c2b', fontWeight: '600' }}>Search Design</h3>
              <input 
                type="text" placeholder="Type to filter..." value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', outline: 'none', fontSize: '14px' }}
              />
            </div>
            
            <div>
              <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '15px', color: '#0f3c2b', fontWeight: '600' }}>Categories</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['all', 'earrings', 'neckpieces', 'rings', 'brooches'].map((cat) => (
                  <button
                    key={cat} onClick={() => handleCategoryClick(cat)}
                    style={{
                      textAlign: 'left', background: 'none', border: 'none', padding: '8px 0', fontSize: '14px',
                      textTransform: 'capitalize', cursor: 'pointer', color: '#666', width: 'fit-content'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* 3. CORE PRODUCT GRID SYSTEM */}
        <main style={{ flex: 1 }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'gray', fontSize: '15px' }}>
              No statement designs found matching this specific budget configuration.
            </div>
          ) : (
            /* Responsive layout: 3 across for all view, 4 across full-width if sidebar is hidden */
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isFilteredView ? 'repeat(auto-fill, minmax(340px, 1fr))' : 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '60px 40px' 
            }}>
              {filteredProducts.map((product) => (
                <div key={product.id} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
                  
                  {/* High Quality Large Product Picture Frame */}
                  <div style={{ width: '100%', height: '460px', overflow: 'hidden', backgroundColor: '#f9f9f9', marginBottom: '20px' }}>
                    <img 
                      src={product.image} alt={product.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  
                  {/* Label Meta Descriptions */}
                  <div style={{ padding: '0 5px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'gray', letterSpacing: '1.5px', marginBottom: '6px' }}>{product.category}</span>
                    <h4 style={{ margin: '0 0 8px 0', color: '#111', fontSize: '19px', fontWeight: '400', fontFamily: 'serif', minHeight: '52px', lineHeight: '1.3' }}>{product.name}</h4>
                    <p style={{ margin: '0 0 20px 0', fontWeight: '600', fontSize: '16px', color: '#0f3c2b' }}>₹{product.price}</p>
                    
                    <Link 
                      href={`/shop/${product.id}`} 
                      style={{ display: 'block', textAlign: 'center', backgroundColor: '#0f3c2b', color: '#fff', textDecoration: 'none', padding: '14px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '500', marginTop: 'auto' }}
                    >
                      Inspect Piece →
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '120px' }}>Synchronizing vaults...</div>}>
      <ShopContent />
    </Suspense>
  );
}