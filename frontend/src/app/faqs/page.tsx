"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './faqs.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQsPage() {
  const faqs: FAQItem[] = [
    {
      question: "What materials do you use for Zeverse jewelry?",
      answer: "We use high-grade, skin-friendly materials. Our metal pieces are primarily made of lead-free, nickel-free brass plated in 18k gold or rhodium. Our quirky collections utilize eco-friendly, lightweight UV resin, polymer clay, or reclaimed hardwood. All earring posts are made of hypoallergenic surgical stainless steel."
    },
    {
      question: "What does 'anti-tarnish' mean?",
      answer: "Standard fashion jewelry oxidizes when exposed to oxygen, humidity, or sweat, turning dark. Zeverse jewelry undergoes a specialized double-polishing process where a micro-thin, medical-grade protective seal is applied over the metal. This barrier shields the jewelry, allowing it to retain its gold luster and resist tarnishing for a much longer duration."
    },
    {
      question: "How long does shipping take?",
      answer: "Orders are dispatched from our studio within 24-48 hours. Delivery takes 3 to 5 business days for major metro cities and 5 to 7 business days for regional locations. You can check your delivery milestone at any time using our Track Order tool."
    },
    {
      question: "Do you offer free shipping?",
      answer: "Yes, we offer free shipping across India for all orders above ₹999. For orders below this threshold, a flat delivery fee of ₹99 is added at checkout."
    },
    {
      question: "What is your return and exchange policy?",
      answer: "Due to hygiene reasons, we do not accept returns on earrings unless they arrive damaged during transit. For other items, we support a 7-day exchange window. If you receive a damaged or wrong product, please email support@zeverse.com with photo evidence within 48 hours of delivery, and we will dispatch a replacement immediately."
    },
    {
      question: "Do you take bulk or customized wedding favors orders?",
      answer: "Yes! We specialize in crafting custom-themed hampers, personalized jewelry, and bulk collections for weddings, bridesmaids, festivals, and corporate gifts. Please fill out our contact form or email us at support@zeverse.com to discuss custom bulk pricing."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Frequently Asked Questions</h2>
      <div className={styles.titleDivider}></div>

      <div className={styles.layout}>
        {/* FAQs Accordions list */}
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={`${styles.faqCard} ${openIndex === index ? styles.faqCardOpen : ''}`}>
              <button className={styles.faqHeader} onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className={styles.faqContent}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA help card */}
        <div className={styles.helpCard}>
          <h3>Still Have Questions?</h3>
          <p>If you couldn't find what you were looking for, feel free to drop us a line directly. Our support circle is always here to help.</p>
          <Link href="/contact" className="btn-primary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
