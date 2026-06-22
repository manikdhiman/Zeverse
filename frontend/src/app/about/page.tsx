import React from 'react';
import Link from 'next/link';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Our Story</h2>
      <div className={styles.titleDivider}></div>

      <div className={styles.layout}>
        {/* Story Intro */}
        <section className={styles.introSection}>
          <div className={styles.introText}>
            <h3>Crafting Joy, One Detail at a Time</h3>
            <p>
              Zeverse was born out of a simple philosophy: **wearable art shouldn't be boring**. We felt that standard jewelry was either too generic or too heavy. We wanted something lightweight, skin-friendly, and packed with personality.
            </p>
            <p>
              So, we started hand-pouring resin, painting terracotta jhumkas, and shaping colorful polymer clay necklaces right on our desk. What began as a personal hobby soon blossomed into a community of people who love adding that "little extra" sparkle to their everyday outfits.
            </p>
          </div>
          <div className={styles.introImageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&auto=format&fit=crop&q=80" 
              alt="Crafting jewelry workspace" 
              className={styles.introImage}
            />
          </div>
        </section>

        {/* Process Steps */}
        <section className={styles.processSection}>
          <h3>The Zeverse Process</h3>
          <div className={styles.processGrid}>
            <div className={styles.processCard}>
              <div className={styles.stepNum}>01</div>
              <h4>Mindful Design</h4>
              <p>We sketch and plan out each piece, drawing inspiration from retro elements, coastal vacations, and traditional heritage patterns.</p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.stepNum}>02</div>
              <h4>Handmade Casting</h4>
              <p>Each design is individually molded using eco-friendly resin, clay, or brass, resulting in minor quirks that make them unique.</p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.stepNum}>03</div>
              <h4>Double Polish</h4>
              <p>We seal each piece with a special anti-tarnish protective coating, ensuring they stay bright, durable, and rust-free.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <h3>Ready to Find Your Match?</h3>
          <p>Explore our curated collections of earrings, neckpieces, rings, and more.</p>
          <Link href="/shop" className="btn-primary" style={{ marginTop: '16px' }}>
            Shop the Collections
          </Link>
        </section>
      </div>
    </div>
  );
}
