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

  // Sync with URL categories smoothly
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

  // Update URL without a hard page reload when someone updates the sidebar category
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

  if (loading) return <div style={{ textAlign: 'center', padding: '100px 20px', color: '#0f3c2b', fontWeight: '600', letterSpacing: '1px' }}>LOADING COLLECTION VAULTS...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '100px 20px', color: '#C53030' }}><h3>Backend Server Offline</h3><p>Make sure FastAPI is running on port 8000!</p></div>;

  return (
    <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      {/* Title Header matching the luxury aesthetic */}
      <div style={{ marginBottom: '40px', borderBottom: '1px solid #eaeaea', paddingBottom: '20px' }}>
        <span style={{ fontSize: '11px', letterSpacing: '2px', color: 'gray', textTransform: 'uppercase' }}>Zeverse Curated Catalog</span>
        <h1 style={{ color: '#0f3c2b', fontSize: '2.4rem', margin: '5px 0 0 0', fontWeight: 'normal', textTransform: 'capitalize' }}>
          {selectedCategory === 'all' ? 'Shop All Collections' : `${selectedCategory}`}
        </h1>
      </div>
      
      <div style={{ display: 'flex', gap: '50px', alignItems: 'flex-start' }}>
        
        {/* SIDEBAR FILTERS (Cleaned up, zero radio buttons) */}
        <aside style={{ width: '240px', flexShrink: 0, position: 'sticky', top: '20px' }}>
          
          {/* Text Search Field */}
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px', color: '#0f3c2b', fontWeight: '600' }}>Search Design</h3>
            <input 
              type="text" 
              placeholder="Type to search..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '0px', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
            />
          </div>
          
          {/* Interactive Navigation List */}
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '15px', color: '#0f3c2b', fontWeight: '600' }}>Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {['all', 'earrings', 'neckpieces', 'rings', 'brooches'].map((cat) => {
                const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    style={{
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      padding: '10px 0',
                      fontSize: '14px',
                      textTransform: 'capitalize',
                      cursor: 'pointer',
                      color: isActive ? '#0f3c2b' : '#666',
                      fontWeight: isActive ? '600' : 'normal',
                      borderBottom: isActive ? '1px solid #0f3c2b' : '1px solid transparent',
                      transition: 'all 0.2s ease',
                      width: 'fit-content'
                    }}
                  >
                    {cat === 'all' ? 'View All Items' : cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing Controls Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#0f3c2b', fontWeight: '600', margin: 0 }}>Max Price</h3>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f3c2b' }}>₹{maxPrice}</span>
            </div>
            <input 
              type="range" 
              min="300" 
              max="3000" 
              step="50" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))} 
              style={{ width: '100%', accentColor: '#0f3c2b', cursor: 'pointer' }} 
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'gray', marginTop: '5px' }}>
              <span>₹300</span>
              <span>₹3,000</span>
            </div>
          </div>
        </aside>

        {/* PRODUCTS CATALOG DISPLAY GRID */}
        <main style={{ flex: 1 }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'gray', fontSize: '15px' }}>
              No statement pieces found matching your current filters.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px 30px' }}>
              {filteredProducts.map((product) => (
                <div key={product.id} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
                  
                  {/* Image Frame */}
                  <div style={{ width: '100%', height: '360px', overflow: 'hidden', backgroundColor: '#f9f9f9', marginBottom: '15px', position: 'relative' }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  
                  {/* Label Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'gray', letterSpacing: '1px', marginBottom: '4px' }}>{product.category}</span>
                    <h4 style={{ margin: '0 0 6px 0', color: '#111', fontSize: '16px', fontWeight: '500', minHeight: '44px', lineHeight: '1.4' }}>{product.name}</h4>
                    <p style={{ margin: '0 0 15px 0', fontWeight: '600', fontSize: '15px', color: '#111' }}>₹{product.price}</p>
                    
                    <Link 
                      href={`/shop/${product.id}`} 
                      style={{ display: 'block', textAlign: 'center', backgroundColor: '#0f3c2b', color: '#fff', textDecoration: 'none', padding: '12px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '500', marginTop: 'auto' }}
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
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px' }}>Syncing collection grids...</div>}>
      <ShopContent />
    </Suspense>
  );
}