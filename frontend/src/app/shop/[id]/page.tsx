'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '../../../context/CartContext';

export default function ProductInspectPage() {
  const params = useParams();
  const id = params?.id;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`https://zeverse-backend.onrender.com/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Statement piece registry details could not be parsed.');
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleBagInsertion = () => {
    if (!product) return;
    
    // Global context engine communication array insertion
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });

    // Trigger premium visual feedback banner interaction
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontFamily: 'serif', color: '#0f3c2b', letterSpacing: '1px' }}>
        Retrieving Masterpiece Metrics from Vault...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontFamily: 'sans-serif', color: '#C53030' }}>
        ✦ {error || 'Requested item could not be found inside active archive collections.'}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto 100px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'start' }}>
        
        {/* Left Side: Editorial Image Framework Container */}
        <div style={{ width: '100%', height: '550px', backgroundColor: '#fdfdfd', border: '1px solid #f5f5f5', overflow: 'hidden' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        {/* Right Side: Product Details & Metrics */}
        <div style={{ padding: '10px 0' }}>
          <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#ab8e4e', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            ZEVERSE Couture Collective
          </span>
          
          <h1 style={{ fontFamily: 'serif', fontSize: '2.5rem', color: '#0f3c2b', margin: '0 0 15px 0', fontWeight: 400, letterSpacing: '0.5px', lineHeight: '1.2' }}>
            {product.name}
          </h1>
          
          <p style={{ fontSize: '22px', fontWeight: 500, color: '#111', margin: '0 0 30px 0' }}>
            ₹{product.price}
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

          {/* Collapsible Meta Block Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#777', margin: '0 0 6px 0', letterSpacing: '1px' }}>Material Integrity</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#333', lineHeight: '1.5' }}>{product.material || 'Premium anti-tarnish plating.'}</p>
            </div>

            <div>
              <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#777', margin: '0 0 6px 0', letterSpacing: '1px' }}>Proportional Scale</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#333', lineHeight: '1.5' }}>{product.size || 'Artisanal scale standard size.'}</p>
            </div>

            <div>
              <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#777', margin: '0 0 6px 0', letterSpacing: '1px' }}>Care Protocols</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.5', fontStyle: 'italic' }}>{product.care || 'Wipe gently with clean micro cloth.'}</p>
            </div>
          </div>

          {/* Interactive Actions CTA */}
          <div style={{ position: 'relative' }}>
            <button 
              style={{ 
                marginTop: '40px',
                width: '100%', 
                backgroundColor: '#0f3c2b', 
                color: '#dbb968', 
                border: 'none', 
                padding: '16px', 
                textTransform: 'uppercase', 
                letterSpacing: '2px', 
                fontSize: '12px', 
                fontWeight: 600, 
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(15, 60, 43, 0.1)',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              onClick={handleBagInsertion}
            >
              Acquire Statement Piece
            </button>

            {/* Micro Confirmation Pop Banner */}
            {addedMessage && (
              <div style={{ position: 'absolute', top: '110%', left: 0, width: '100%', backgroundColor: '#E6F4EA', color: '#137333', padding: '12px', fontSize: '12px', textAlign: 'center', fontWeight: 500, border: '1px solid #CEEAD6', boxSizing: 'border-box' }}>
                ✦ Artisan Design Linked Perfectly To Your Global Shopping Bag!
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}