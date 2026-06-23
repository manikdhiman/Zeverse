'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import Link from 'next/link';

export default function ProductInspectPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addedMessage, setAddedMessage] = useState(false);

  // Fetch individual item metadata from FastAPI server dynamically
  useEffect(() => {
    if (!id) return;
    
    fetch(`/_/backend/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found in vault registry.');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleBagInsertion = () => {
    if (!product) return;
    
    // Add item object structure right into your global CartContext state
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });

    // Display localized premium validation message banner
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px', fontFamily: 'serif', color: '#0f3c2b', letterSpacing: '1px' }}>
        Unlocking Artisan Piece Blueprint...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px', fontFamily: 'sans-serif' }}>
        <p style={{ color: 'gray', marginBottom: '20px' }}>This specific statement design is missing from our active vault.</p>
        <Link href="/shop" style={{ backgroundColor: '#0f3c2b', color: '#fff', textDecoration: 'none', padding: '12px 25px', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Return to Showroom
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1300px', margin: '40px auto 80px auto', padding: '0 40px', fontFamily: 'sans-serif' }}>
      
      {/* Editorial Navigation Path Breadcrumbs */}
      <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#888', marginBottom: '40px' }}>
        <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link> / <Link href="/shop" style={{ color: '#888', textDecoration: 'none' }}>Shop All</Link> / <span style={{ color: '#111' }}>{product.name}</span>
      </div>

      {/* Balanced Dual Side Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '60px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Contained Premium Product Imagery Frame */}
        <div style={{ backgroundColor: '#fdfdfd', border: '1px solid #f7f7f7', overflow: 'hidden' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ 
              width: '100%', 
              maxHeight: '650px', 
              objectFit: 'cover', 
              display: 'block' 
            }} 
          />
        </div>

        {/* RIGHT COLUMN: Highly Refined Editorial Information Sidebar */}
        <div style={{ padding: '10px 0' }}>
          
          {/* Category Metric Tag */}
          <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#ab8e4e', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
            Collection — {product.category}
          </span>
          
          {/* Main Title Header */}
          <h1 style={{ fontFamily: 'serif', color: '#0f3c2b', fontSize: '2.4rem', fontWeight: 400, margin: '0 0 15px 0', letterSpacing: '1px', lineHeight: '1.2' }}>
            {product.name}
          </h1>

          {/* Luxury Curated Currency Pricing Tag */}
          <p style={{ fontSize: '1.5rem', fontWeight: 500, color: '#111', margin: '0 0 35px 0', letterSpacing: '0.5px' }}>
            ₹{product.price}
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '30px' }} />

          {/* Dynamic Add To Cart Conversion Engine Button */}
          <div style={{ position: 'relative', marginBottom: '40px' }}>
            <button 
              onClick={handleBagInsertion}
              style={{ 
                width: '100%', 
                backgroundColor: '#0f3c2b', 
                color: '#dbb968', 
                border: 'none', 
                padding: '18px', 
                textTransform: 'uppercase', 
                letterSpacing: '2px', 
                fontSize: '12px', 
                fontWeight: 600, 
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Add To Shopping Bag
            </button>

            {/* Micro Confirmation Pop Banner */}
            {addedMessage && (
              <div style={{ position: 'absolute', top: '120%', left: 0, width: '100%', backgroundColor: '#E6F4EA', color: '#137333', padding: '12px', fontSize: '12px', textAlign: 'center', fontWeight: 500, border: '1px solid #CEEAD6', boxSizing: 'border-box' }}>
                ✦ Artisan Design Linked Perfectly To Your Global Shopping Bag!
              </div>
            )}
          </div>

          {/* Product Specifications & Material Disclosures */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div>
              <h3 style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#111', margin: '0 0 6px 0', fontWeight: 600 }}>Materials Used</h3>
              <p style={{ fontSize: '13px', color: '#555', margin: 0, lineHeight: '1.6' }}>{product.material || 'Premium anti-tarnish metal alloy construction.'}</p>
            </div>

            <div>
              <h3 style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#111', margin: '0 0 6px 0', fontWeight: 600 }}>Dimension & Proportions</h3>
              <p style={{ fontSize: '13px', color: '#555', margin: 0, lineHeight: '1.6' }}>{product.size || 'Standard artisanal design sizing applies.'}</p>
            </div>

            <div>
              <h3 style={{ fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#111', margin: '0 0 6px 0', fontWeight: 600 }}>Preservation Care Guide</h3>
              <p style={{ fontSize: '13px', color: '#555', margin: 0, lineHeight: '1.6' }}>{product.care || 'Avoid harsh luxury perfumes. Polish gently with a clean dry microfiber cloth.'}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}