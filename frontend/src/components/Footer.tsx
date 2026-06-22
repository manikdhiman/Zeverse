"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      // Mock newsletter signup
      setSubmitted(true);
      setNewsletterEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* About column */}
        <div className={styles.columnAbout}>
          <h2 className={styles.logo}>ZEVERSE</h2>
          <p className={styles.aboutText}>
            Handcrafted, quirky, and premium jewelry designed to make you feel unique. We believe in adding 'a little extra' sparkle to your everyday moments with anti-tarnish, hypoallergenic creations.
          </p>
          <div className={styles.socials}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8 22a9 9 0 0 1-2.36-10.43c.48-1.12 1.25-2.07 2.22-2.77C9.37 7.74 11.23 7 13.2 7c2.4 0 4.6 1.1 5.9 3.03A8.98 8.98 0 0 1 13 22c-1.3 0-2.5-.27-3.62-.75A17.9 17.9 0 0 1 8 22z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </a>
          </div>
        </div>

        {/* Links columns */}
        <div className={styles.columnLinks}>
          <h3>Quick Links</h3>
          <Link href="/shop">Shop All</Link>
          <Link href="/track-order">Track Your Order</Link>
          <Link href="/about">Our Story</Link>
          <Link href="/contact">Get in Touch</Link>
          <Link href="/faqs">FAQs</Link>
        </div>

        <div className={styles.columnLinks}>
          <h3>Shop categories</h3>
          <Link href="/shop?category=Earrings">Statement Earrings</Link>
          <Link href="/shop?category=Neckpieces">Necklaces & Chokers</Link>
          <Link href="/shop?category=Rings">Chunky Rings</Link>
          <Link href="/shop?category=Cuffs%20%26%20Bracelets">Cuffs & Bangles</Link>
          <Link href="/shop?category=Brooches">Artistic Brooches</Link>
        </div>

        {/* Newsletter column */}
        <div className={styles.columnNewsletter}>
          <h3>Stay in the Loop</h3>
          <p>Subscribe to receive styling guides, new collection launches, and exclusive member discounts.</p>
          <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
              className={styles.newsletterInput}
            />
            <button type="submit" className={styles.newsletterBtn}>
              Join
            </button>
          </form>
          {submitted && <p className={styles.successMsg}>✦ Thank you! Welcome to the Zeverse Circle. ✦</p>}
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Zeverse Jewelry. All Rights Reserved.
          </p>
          <div className={styles.paymentIcons}>
            <span>UPI</span>
            <span>Cards</span>
            <span>Net Banking</span>
            <span>COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
