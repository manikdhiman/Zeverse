"use client";

import React, { useState } from 'react';
import styles from './track.module.css';

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setOrder(null);

    try {
      const response = await fetch(`http://localhost:8000/api/orders/${orderNumber.trim().toUpperCase()}`);
      if (!response.ok) {
        throw new Error('Order not found. Please verify your Tracking number.');
      }
      const data = await response.json();
      setOrder(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to search order details.');
    } finally {
      setLoading(false);
    }
  };

  // Parse items list from string
  const parseItems = (itemsStr: string) => {
    try {
      return JSON.parse(itemsStr);
    } catch (e) {
      return [];
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Track Your Order</h2>
      <div className={styles.titleDivider}></div>

      {/* Tracking Form */}
      <form onSubmit={handleTrackSubmit} className={styles.form}>
        <p className={styles.instruction}>
          Enter the 8-character Order Number (e.g. ZEV-XXXX-XXXX) printed on your invoice or thank-you screen to check delivery progress.
        </p>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            required
            placeholder="e.g. ZEV-4F8A3B12"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="input-field"
            style={{ textTransform: 'uppercase' }}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Track'}
          </button>
        </div>
        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      </form>

      {/* Tracking Results Dashboard */}
      {order && (
        <div className={styles.dashboard}>
          <div className={styles.summaryHeader}>
            <div>
              <h3>Order {order.order_number}</h3>
              <p>Placed on: {new Date(order.created_at).toLocaleDateString('en-IN')}</p>
            </div>
            <div className={styles.statusBox}>
              Status: <span className={styles.statusBadge}>{order.status}</span>
            </div>
          </div>

          {/* Delivery progress tracker visual layout */}
          <div className={styles.trackerVisual}>
            <div className={`${styles.step} ${styles.completed}`}>
              <div className={styles.stepCircle}>✓</div>
              <span>Confirmed</span>
            </div>
            <div className={`${styles.step} ${['shipped', 'delivered'].includes(order.status.toLowerCase()) ? styles.completed : ''}`}>
              <div className={styles.stepCircle}>
                {['shipped', 'delivered'].includes(order.status.toLowerCase()) ? '✓' : '2'}
              </div>
              <span>Shipped</span>
            </div>
            <div className={`${styles.step} ${order.status.toLowerCase() === 'delivered' ? styles.completed : ''}`}>
              <div className={styles.stepCircle}>
                {order.status.toLowerCase() === 'delivered' ? '✓' : '3'}
              </div>
              <span>Out for Delivery</span>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            {/* Customer & Address recap */}
            <div className={styles.recapCard}>
              <h4>Shipping Details</h4>
              <p><strong>Customer Name:</strong> {order.customer_name}</p>
              <p><strong>Phone Number:</strong> {order.phone}</p>
              <p><strong>Shipping Address:</strong> {order.address}</p>
            </div>

            {/* Items list recap */}
            <div className={styles.recapCard}>
              <h4>Order items ({parseItems(order.items).length})</h4>
              <div className={styles.itemsList}>
                {parseItems(order.items).map((item: any) => (
                  <div key={item.id} className={styles.itemRow}>
                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                    <div className={styles.itemInfo}>
                      <h5>{item.name}</h5>
                      <span>Qty: {item.quantity} • ₹{item.price.toFixed(2)}</span>
                    </div>
                    <strong>₹{(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                ))}
              </div>
              <div className={styles.totalRow}>
                <span>Total Amount paid:</span>
                <strong>₹{order.total_amount.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
