"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

export const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer if clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isCartOpen && drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.drawer} slide-in-left`} ref={drawerRef}>
        <div className={styles.header}>
          <h2>Shopping Bag ({cartCount})</h2>
          <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)} aria-label="Close cart">
            &times;
          </button>
        </div>

        <div className={styles.content}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p>Your bag is empty.</p>
              <Link href="/shop" className="btn-primary" style={{ marginTop: '20px' }} onClick={() => setIsCartOpen(false)}>
                Shop Best Sellers
              </Link>
            </div>
          ) : (
            <div className={styles.itemsList}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.item}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <span className={styles.itemCategory}>{item.category}</span>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <div className={styles.itemPrice}>₹{item.price.toFixed(2)}</div>
                    
                    <div className={styles.quantityControls}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <strong>₹{cartTotal.toFixed(2)}</strong>
            </div>
            <p className={styles.shippingNote}>Shipping & taxes calculated at checkout.</p>
            <div className={styles.actionBtns}>
              <Link href="/cart" className="btn-secondary" onClick={() => setIsCartOpen(false)}>
                View Bag
              </Link>
              <Link href="/checkout" className="btn-primary" onClick={() => setIsCartOpen(false)}>
                Checkout Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartDrawer;
