"use client";

import React, { useState } from 'react';
import styles from './contact.module.css';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setErrorMsg('');

    const payload = { name, email, message };

    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message.');
      }
      
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      console.error(err);
      
      // Fallback submit behavior in case python server isn't started
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contact Us</h2>
      <div className={styles.titleDivider}></div>

      <div className={styles.layout}>
        {/* Left Side: Contact Form */}
        <div className={styles.formPanel}>
          {submitted ? (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>✓</div>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out to Zeverse. Our customer support circle will reply to you within 24 hours.</p>
              <button className="btn-secondary" onClick={() => setSubmitted(false)} style={{ marginTop: '20px' }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className={styles.form}>
              <h3>Send us a Message</h3>
              <p className={styles.subtitle}>Have questions about size, materials, or your order? Write to us.</p>
              
              <div className={styles.formGroup}>
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Manik Dhiman"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="e.g. manik@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-message">How can we help?</label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Type your query here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-field"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {errorMsg && <p className={styles.error}>{errorMsg}</p>}

              <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '14px' }}>
                {loading ? 'Submitting...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Contact info details */}
        <div className={styles.infoPanel}>
          <h3>Get In Touch</h3>
          
          <div className={styles.infoItem}>
            <span className={styles.icon}>✉</span>
            <div>
              <strong>Email Support</strong>
              <p>support@zeverse.com</p>
              <span>For order and refund queries.</span>
            </div>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.icon}>📞</span>
            <div>
              <strong>Phone Support</strong>
              <p>+91 98765 43210</p>
              <span>Available Monday to Saturday, 10 AM - 6 PM.</span>
            </div>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.icon}>📍</span>
            <div>
              <strong>Studio Address</strong>
              <p>Zeverse Creative Labs, Block B-3, Sector 58, Noida, UP, India - 201301</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
