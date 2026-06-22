"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import styles from './cart.module.css';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Shopping Bag</h2>
      <div className={styles.titleDivider}></div>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Your bag is currently empty. Add some sparkle!</p>
          <Link href="/shop" className="btn-primary" style={{ marginTop: '20px' }}>
            Shop Jewelry
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          {/* Left panel: list of items */}
          <div className={styles.cartList}>
            <div className={styles.listHeader}>
              <span>Product Details</span>
              <span>Quantity</span>
              <span>Total Price</span>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemInfo}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <span className={styles.itemCategory}>{item.category}</span>
                    <h3 className={styles.itemName}>
                      <Link href={`/shop/${item.id}`}>{item.name}</Link>
                    </h3>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                      Remove Item
                    </button>
                  </div>
                </div>

                <div className={styles.itemQuantity}>
                  <div className={styles.qtyControls}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>

                <div className={styles.itemPrice}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                  <span className={styles.unitPrice}>₹{item.price.toFixed(2)} each</span>
                </div>
              </div>
            ))}

            <div className={styles.listActions}>
              <Link href="/shop" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                ← Continue Shopping
              </Link>
              <button className={styles.clearBtn} onClick={clearCart}>
                Clear Shopping Bag
              </button>
            </div>
          </div>

          {/* Right panel: summary of costs */}
          <div className={styles.summary}>
            <h3>Order Summary</h3>
            <div className={styles.summaryRow}>
              <span>Total Items</span>
              <span>{cartCount} items</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <strong>₹{cartTotal.toFixed(2)}</strong>
            </div>
            <div className={styles.summaryRow}>
              <span>Estimated Shipping</span>
              <span>{cartTotal >= 999 ? 'FREE' : '₹99.00'}</span>
            </div>

            <hr />

            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <strong>₹{(cartTotal >= 999 ? cartTotal : cartTotal + 99).toFixed(2)}</strong>
            </div>

            <p className={styles.checkoutNote}>
              {cartTotal >= 999 
                ? '🎉 Your order qualifies for Free Shipping!' 
                : `Spend ₹${(999 - cartTotal).toFixed(0)} more to get Free Shipping.`}
            </p>

            <Link href="/checkout" className="btn-primary" style={{ width: '100%', textAlign: 'center', marginTop: '16px' }}>
              Proceed to checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
