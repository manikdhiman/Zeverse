"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import styles from './page.module.css';

export default function Home() {
  const [bestsellers, setBestsellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch bestsellers (ratings >= 4.6)
  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('API down');
        return res.json();
      })
      .then((data) => {
        // Filter bestsellers on frontend for simplicity
        const sorted = data
          .filter((p: any) => p.rating >= 4.6)
          .slice(0, 4);
        setBestsellers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching bestsellers, using mock fallback:', err);
        // Fallback mock items in case Python backend is launching
        const mockFallback = [
          {
            id: 1,
            name: "Sunny Resin Daisy Drop Earrings",
            description: "Brighten up your day with these quirky handcrafted yellow resin daisy earrings.",
            price: 349.00,
            images: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80",
            category: "Earrings",
            collection: "Everyday Luxe",
            rating: 4.8,
            stock: 15
          },
          {
            id: 4,
            name: "Chunky Clay Floral Choker",
            description: "Make a bold statement with this hand-sculpted colorful polymer clay choker.",
            price: 799.00,
            images: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
            category: "Neckpieces",
            collection: "Beach Vacation",
            rating: 4.9,
            stock: 5
          },
          {
            id: 5,
            name: "Heritage Emerald Bead Necklace",
            description: "A magnificent multilayered green bead neckpiece embedded with traditional gold spacers.",
            price: 1299.00,
            images: "https://images.unsplash.com/photo-1611085583191-a3b1a30a5a40?w=800&auto=format&fit=crop&q=80",
            category: "Neckpieces",
            collection: "Wedding",
            rating: 4.7,
            stock: 10
          },
          {
            id: 9,
            name: "Whimsical Peacock Enamel Brooch",
            description: "Add a touch of majestic art to your blazers, saris, or coats.",
            price: 449.00,
            images: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800&auto=format&fit=crop&q=80",
            category: "Brooches",
            collection: "Festive",
            rating: 4.7,
            stock: 14
          }
        ];
        setBestsellers(mockFallback);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.main}>
      {/* 1. HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroSubtitle}>✧ Handcrafted & Quirky Jewelry ✧</span>
          <h2 className={styles.heroTitle}>A Little Extra Sparkle,<br />For Everyday Moments.</h2>
          <p className={styles.heroText}>
            Hand-poured resin, sculpted clay, and anti-tarnish premium metals. Crafted mindfully for the bold, the bohemian, and the beautiful.
          </p>
          <div className={styles.heroActions}>
            <Link href="/shop" className="btn-primary">
              Explore Shop
            </Link>
            <Link href="/shop?collection=Everyday%20Luxe" className="btn-secondary" style={{ borderColor: '#ffffff', color: '#ffffff' }}>
              Everyday Luxe
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY QUICK LINKS */}
      <section className={styles.categories}>
        <div className={styles.sectionHeader}>
          <h2>Shop By Category</h2>
          <div className={styles.titleDivider}></div>
        </div>
        <div className={styles.categoryGrid}>
          {[
            { name: "Earrings", img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Earrings" },
            { name: "Neckpieces", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Neckpieces" },
            { name: "Rings", img: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Rings" },
            { name: "Cuffs", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Cuffs%20%26%20Bracelets" },
            { name: "Brooches", img: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=400&auto=format&fit=crop&q=60", query: "/shop?category=Brooches" },
          ].map((cat, idx) => (
            <Link href={cat.query} key={idx} className={styles.categoryCard}>
              <div className={styles.circleImage}>
                <img src={cat.img} alt={cat.name} />
              </div>
              <h4>{cat.name}</h4>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BESTSELLERS */}
      <section className={styles.bestsellers}>
        <div className={styles.sectionHeader}>
          <h2>The Fan Favorites</h2>
          <p>Our most-loved pieces, chosen by you.</p>
          <div className={styles.titleDivider}></div>
        </div>

        {loading ? (
          <div className={styles.loader}>Loading jewelry...</div>
        ) : (
          <div className={styles.productGrid}>
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className={styles.viewAllRow}>
          <Link href="/shop" className="btn-secondary">
            View All Jewelry
          </Link>
        </div>
      </section>

      {/* 4. BRAND USPs / VALUES */}
      <section className={styles.usps}>
        <div className={styles.uspContainer}>
          <div className={styles.uspCard}>
            <span className={styles.uspIcon}>🌿</span>
            <h3>Handcrafted Details</h3>
            <p>Each jewelry piece is carefully poured, painted, and polished by hand, making every design uniquely yours.</p>
          </div>
          <div className={styles.uspCard}>
            <span className={styles.uspIcon}>✨</span>
            <h3>Anti-Tarnish Polish</h3>
            <p>Finished with premium protective layers to keep your jewelry glowing and bright through daily wear.</p>
          </div>
          <div className={styles.uspCard}>
            <span className={styles.uspIcon}>🎨</span>
            <h3>Quirky & Fun</h3>
            <p>From retro shapes to bold statements, add a fun touch that reflects your playful personality.</p>
          </div>
          <div className={styles.uspCard}>
            <span className={styles.uspIcon}>🌸</span>
            <h3>Skin-Friendly Metals</h3>
            <p>Made with hypoallergenic materials, completely free of lead, nickel, and cadmium, safe for all day use.</p>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className={styles.testimonials}>
        <div className={styles.sectionHeader}>
          <h2>Overheard from our Circle</h2>
          <div className={styles.titleDivider}></div>
        </div>
        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonial}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.quote}>"The Daisy drop earrings are insanely light and cute! I get compliments every single time I wear them out. Highly recommend!"</p>
            <span className={styles.author}>— Ananya K.</span>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.quote}>"Absolutely in love with the Emerald Bead piece. It completed my cousin's wedding outfit beautifully. Packaging was lovely too!"</p>
            <span className={styles.author}>— Rohan S.</span>
          </div>
          <div className={styles.testimonial}>
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.quote}>"Anti-tarnish claim is 100% true. I've worn the Crescent moon ring daily for a month and it still shines gold."</p>
            <span className={styles.author}>— Priya D.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
