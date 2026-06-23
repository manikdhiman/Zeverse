'use client';

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  // Form State Configurations
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    shippingAddress: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card' // Default premium digital transaction anchor
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const executeOrderSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    try {
      // Mocking luxury bank payment clearance latency
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const response = await fetch('http://127.0.0.1:8000/api/orders/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_info: formData,
          items: cart,
          total_payable: cartTotal + 150 // Including signature secure shipping metrics
        })
      });

      if (response.ok) {
        clearCart(); // Flush local cache on clearance success
        alert('✦ Vault Allocation Confirmed! Your order has been securely processed.');
        router.push('/'); // Redirect smoothly back to gallery showroom
      } else {
        alert('Payment settlement gateway timed out. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Network connectivity lost during financial verification.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px', fontFamily: 'serif' }}>
        <h2 style={{ color: '#0f3c2b', fontWeight: 400, fontSize: '2rem' }}>Your Shopping Bag is Empty</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px', fontFamily: 'sans-serif' }}>You must add artisan statement pieces before access to the checkout vault is granted.</p>
        <Link href="/shop" style={{ backgroundColor: '#0f3c2b', color: '#dbb968', textDecoration: 'none', padding: '14px 30px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, fontFamily: 'sans-serif' }}>
          Return To Showroom
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1300px', margin: '40px auto 100px auto', padding: '0 40px', fontFamily: 'sans-serif' }}>
      
      <h1 style={{ fontFamily: 'serif', color: '#0f3c2b', fontSize: '2.5rem', fontWeight: 400, marginBottom: '40px', letterSpacing: '1px' }}>
        Secure Vault Checkout
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Premium Shipping and Billing Formulation */}
        <form onSubmit={executeOrderSubmission} style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
          
          {/* Section 1: Customer Identity Metrics */}
          <div>
            <h3 style={{ fontFamily: 'serif', color: '#0f3c2b', fontSize: '1.2rem', fontWeight: 400, margin: '0 0 20px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              1. Customer Identity
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#111', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Full Name</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="Manik Dhiman" style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', fontSize: '14px' }} onFocus={(e) => e.target.style.borderBottom = '1px solid #0f3c2b'} onBlur={(e) => e.target.style.borderBottom = '1px solid #ddd'} />
              </div>
              <div>
                <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#111', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Mobile Reference</label>
                <input type="tel" name="phoneNumber" required value={formData.phoneNumber} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', fontSize: '14px' }} onFocus={(e) => e.target.style.borderBottom = '1px solid #0f3c2b'} onBlur={(e) => e.target.style.borderBottom = '1px solid #ddd'} />
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#111', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Email Address (For Secure Invoice Delivery)</label>
              <input type="email" name="emailAddress" required value={formData.emailAddress} onChange={handleInputChange} placeholder="manik@luxury.com" style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', fontSize: '14px' }} onFocus={(e) => e.target.style.borderBottom = '1px solid #0f3c2b'} onBlur={(e) => e.target.style.borderBottom = '1px solid #ddd'} />
            </div>
          </div>

          {/* Section 2: Logistics Route Curation */}
          <div>
            <h3 style={{ fontFamily: 'serif', color: '#0f3c2b', fontSize: '1.2rem', fontWeight: 400, margin: '0 0 20px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              2. Shipping Destination
            </h3>
            <div>
              <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#111', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Street Address Portfolio</label>
              <textarea name="shippingAddress" required rows={2} value={formData.shippingAddress} onChange={handleInputChange} placeholder="Apartment, Suite, Block, Landmark, Street" style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', fontSize: '14px', resize: 'none', fontFamily: 'sans-serif' }} onFocus={(e) => e.target.style.borderBottom = '1px solid #0f3c2b'} onBlur={(e) => e.target.style.borderBottom = '1px solid #ddd'} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
              <div>
                <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#111', fontWeight: 600, display: 'block', marginBottom: '8px' }}>City</label>
                <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="New Delhi" style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', fontSize: '14px' }} onFocus={(e) => e.target.style.borderBottom = '1px solid #0f3c2b'} onBlur={(e) => e.target.style.borderBottom = '1px solid #ddd'} />
              </div>
              <div>
                <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#111', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Postal Code (PIN)</label>
                <input type="text" name="postalCode" required value={formData.postalCode} onChange={handleInputChange} placeholder="110001" style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', fontSize: '14px' }} onFocus={(e) => e.target.style.borderBottom = '1px solid #0f3c2b'} onBlur={(e) => e.target.style.borderBottom = '1px solid #ddd'} />
              </div>
            </div>
          </div>

          {/* Section 3: Financial Settlement Channel */}
          <div>
            <h3 style={{ fontFamily: 'serif', color: '#0f3c2b', fontSize: '1.2rem', fontWeight: 400, margin: '0 0 20px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              3. Payment Protocol
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid #0f3c2b', backgroundColor: formData.paymentMethod === 'card' ? '#fcf8ee' : '#fff', cursor: 'pointer' }}>
                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} style={{ accentColor: '#0f3c2b' }} />
                <div>
                  <strong style={{ fontSize: '13px', display: 'block', color: '#0f3c2b' }}>Premium Credit / Debit Cards</strong>
                  <span style={{ fontSize: '11px', color: '#666' }}>Visa, Mastercard, American Express secure encryption portal.</span>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid #eee', opacity: 0.6, cursor: 'not-allowed' }}>
                <input type="radio" name="paymentMethod" value="upi" disabled style={{ accentColor: '#0f3c2b' }} />
                <div>
                  <strong style={{ fontSize: '13px', display: 'block', color: '#888' }}>Instant UPI Verification (Unavailable)</strong>
                  <span style={{ fontSize: '11px', color: '#999' }}>Direct settlement via secure QR framework.</span>
                </div>
              </label>
            </div>
          </div>

          {/* Master Checkout CTA Trigger */}
          <button type="submit" disabled={isProcessing} style={{ width: '100%', backgroundColor: '#0f3c2b', color: '#dbb968', border: 'none', padding: '18px', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', fontWeight: 600, cursor: isProcessing ? 'not-allowed' : 'pointer', marginTop: '10px', boxShadow: '0 4px 20px rgba(15, 60, 43, 0.15)' }}>
            {isProcessing ? 'Verifying Financial Allocation...' : `Authorize Settlement — ₹${cartTotal + 150}`}
          </button>

        </form>

        {/* RIGHT COLUMN: Sticky Real-time Order Summary Panel */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #f2f2f2', padding: '30px', position: 'sticky', top: '120px', boxShadow: '0 10px 30px rgba(0,0,0,0.01)' }}>
          <h3 style={{ fontFamily: 'serif', color: '#0f3c2b', fontSize: '1.3rem', fontWeight: 400, margin: '0 0 20px 0', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            Your Allocation
          </h3>

          {/* Loop over structural shopping bag items inside global context state memory */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '260px', overflowY: 'auto', marginBottom: '25px', paddingRight: '5px' }}>
            {cart.map((item: any) => (
              <div key={item.id} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: '55px', height: '65px', objectFit: 'cover', border: '1px solid #f5f5f5' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: 'serif', fontSize: '14px', color: '#0f3c2b', margin: '0 0 4px 0', fontWeight: 400 }}>{item.name}</h4>
                  <span style={{ fontSize: '11px', color: '#777' }}>Qty: {item.quantity}</span>
                </div>
                <strong style={{ fontSize: '13px', color: '#111' }}>Key: ₹{item.price * item.quantity}</strong>
              </div>
            ))}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '20px' }} />

          {/* Price Metrics Summary Matrix */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555' }}>
              <span>Subtotal Curation Valuation</span>
              <span>₹{cartTotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555' }}>
              <span>Insured Priority Shipping</span>
              <span>₹150</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', color: '#0f3c2b' }}>
              <span style={{ fontFamily: 'serif' }}>Total Collective Payable</span>
              <span>₹{cartTotal + 150}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}