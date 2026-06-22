'use client';

import React, { useState } from 'react';
import { useCart } from '../../../src/context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedOrderNum, setGeneratedOrderNum] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postalCode: '', paymentMethod: 'cod'
  });

  const shippingFee = cartTotal >= 999 ? 0 : 99;
  const finalTotal = cartTotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const executeRealOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Build payload matching backend schemas requirements
    const orderPayload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postal_code: formData.postalCode,
      total_payable: finalTotal
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        throw new Error('Failed to save order details to server.');
      }

      const data = await response.json();
      setGeneratedOrderNum(data.order_number);
      setIsSubmitted(true);
      clearCart();
    } catch (err: any) {
      setError(err.message || 'Something went wrong while connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-card">
        <span style={{ fontSize: '64px', display: 'block', marginBottom: '20px' }}>👑</span>
        <h1 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Thank You For Your Order!</h1>
        <p style={{ fontSize: '16px', color: '#333', marginBottom: '20px' }}>
          Your statement pieces are officially locked into our master database.
        </p>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '4px', border: '1px solid var(--border-color)', marginBottom: '30px' }}>
          <span style={{ fontSize: '13px', textTransform: 'uppercase', color: 'gray', display: 'block', marginBottom: '5px' }}>Your Order Tracking Number</span>
          <strong style={{ fontSize: '22px', color: 'var(--primary-color)', letterSpacing: '1px' }}>{generatedOrderNum}</strong>
        </div>
        <Link href="/shop" className="btn-primary" style={{ display: 'inline-block' }}>Continue Exploring Zeverse</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>Your Bag is Empty</h2>
        <Link href="/shop" className="btn-primary">Browse Catalog</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto 0 auto', padding: '0 20px' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '30px', fontSize: '2.5rem' }}>Checkout</h1>
      {error && <div style={{ color: '#C53030', backgroundColor: '#FFF5F5', padding: '15px', marginBottom: '20px', border: '1px solid #FFD3D3', borderRadius: '4px' }}>{error}</div>}
      
      <form onSubmit={executeRealOrder} className="checkout-layout">
        <div className="checkout-form-section">
          <h3 style={{ color: 'var(--primary-color)', fontSize: '20px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Shipping Details</h3>
          <div className="form-group-row">
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '13px', color: 'gray' }}>First Name</label>
              <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="form-input" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '13px', color: 'gray' }}>Last Name</label>
              <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="form-input" />
            </div>
          </div>
          <div className="form-group-row">
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '13px', color: 'gray' }}>Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="form-input" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '13px', color: 'gray' }}>Phone Number</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="form-input" />
            </div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '13px', color: 'gray' }}>Street Address</label>
            <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="form-input" />
          </div>
          <div className="form-group-row">
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '13px', color: 'gray' }}>City</label>
              <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="form-input" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '13px', color: 'gray' }}>Postal Code / PIN</label>
              <input type="text" name="postalCode" required value={formData.postalCode} onChange={handleInputChange} className="form-input" />
            </div>
          </div>
          <h3 style={{ color: 'var(--primary-color)', fontSize: '20px', marginTop: '40px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Payment Method</h3>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className="form-input" style={{ height: '45px' }}>
            <option value="cod">Cash on Delivery (COD)</option>
          </select>
        </div>

        <div style={{ flex: 1, minWidth: '300px', background: 'var(--bg-light)', padding: '30px', borderRadius: '4px', border: '1px solid var(--border-color)', height: 'fit-content' }}>
          <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '600', color: 'var(--primary-color)', marginBottom: '30px' }}>
            <span>Total Payable</span>
            <span>₹{finalTotal}</span>
          </div>
          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '15px' }}>
            {loading ? 'Processing Order...' : 'Complete Order →'}
          </button>
        </div>
      </form>
    </div>
  );
}