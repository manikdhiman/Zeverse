'use client';

import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckoutVerification = () => {
    if (!user) {
      // User is offline -> send them directly to the identity lock gateway page
      router.push('/login?redirect=/checkout');
    } else {
      // User session matches perfectly -> forward them straight to the packaging processing layout
      router.push('/checkout');
    }
  };

  // Safe fallback array instantiation check
  const activeCartItems = cart || [];

  return (
    <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontFamily: 'serif', color: '#0f3c2b', fontSize: '2.5rem', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
        Your Shopping Bag
      </h1>

      {activeCartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <p style={{ color: 'gray', fontSize: '16px', marginBottom: '25px' }}>Your curated collection bag is currently empty.</p>
          <Link href="/shop" style={{ backgroundColor: '#0f3c2b', color: '#fff', textDecoration: 'none', padding: '15px 30px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '13px' }}>
            Explore Statement Collections
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '50px', alignItems: 'flex-start' }}>
          
          {/* List of Added Jewelry Items */}
          <div style={{ flex: 1 }}>
            {activeCartItems.map((item: any) => (
              <div key={item.id} style={{ display: 'flex', gap: '20px', padding: '20px 0', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: '90px', height: '110px', objectFit: 'cover', backgroundColor: '#f9f9f9' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#0f3c2b', fontSize: '16px' }}>{item.name}</h4>
                  <p style={{ margin: '0 0 10px 0', fontWeight: '600', fontSize: '14px' }}>₹{item.price}</p>
                  
                  {/* Quantity Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '2px 8px', cursor: 'pointer' }}>-</button>
                    <span style={{ fontSize: '14px' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '2px 8px', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  style={{ background: 'none', border: 'none', color: '#C53030', cursor: 'pointer', fontSize: '14px' }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Payment Summary Panel Box */}
          <div style={{ width: '380px', backgroundColor: '#f9f9f9', padding: '30px', border: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#0f3c2b', fontSize: '18px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '15px' }}>
              <span>Subtotal Amount:</span>
              <span style={{ fontWeight: '600' }}>`₹{cartTotal}`</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '15px' }}>
              <span>Standard Insured Courier:</span>
              <span style={{ color: '#0f3c2b', fontWeight: '600' }}>FREE</span>
            </div>
            <button 
              onClick={handleCheckoutVerification} 
              style={{ width: '100%', display: 'block', textAlign: 'center', backgroundColor: '#0f3c2b', color: '#fff', border: 'none', padding: '15px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}
            >
              Proceed to Secure Checkout →
            </button>
          </div>

        </div>
      )}
    </div>
  );
}