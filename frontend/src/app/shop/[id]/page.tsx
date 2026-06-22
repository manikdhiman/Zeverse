"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import ProductCard from '../../../components/ProductCard';
import styles from './product-details.module.css';

interface ProductDetailProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id, 10);
  const router = useRouter();
  
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  
  // Accordion control states
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [careOpen, setCareOpen] = useState(false);

  // Fetch product data
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/products/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        const images = data.images ? data.images.split(',') : [];
        setActiveImage(images[0] || '');
        
        // Fetch related products (same category)
        return fetch(`http://localhost:8000/api/products?category=${encodeURIComponent(data.category)}`);
      })
      .then((res) => res.json())
      .then((relatedData) => {
        // Exclude current product
        const filtered = relatedData.filter((p: any) => p.id !== productId).slice(0, 4);
        setRelatedProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product details, using fallback:', err);
        // Fallback mock items
        const mockFallbackList = [
          { id: 1, name: "Sunny Resin Daisy Drop Earrings", description: "Brighten up your day with these quirky handcrafted yellow resin daisy earrings. Lightweight, anti-tarnish, and perfect for adding 'a little extra' charm to your daily casual look.", price: 349.00, images: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80,https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&auto=format&fit=crop&q=80", category: "Earrings", collection: "Everyday Luxe", rating: 4.8, stock: 15, specifications: '{"Material": "Eco-friendly Resin", "Weight": "6g per pair", "Dimensions": "4.5 cm x 2.5 cm"}' },
          { id: 2, name: "Terracotta Heritage Jhumkas", description: "Exquisite hand-painted terracotta jhumkas displaying traditional Indian patterns. Styled for wedding and festive wear.", price: 599.00, images: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80", category: "Earrings", collection: "Festive", rating: 4.6, stock: 8, specifications: '{"Material": "Natural Clay", "Weight": "12g per pair", "Dimensions": "5.5 cm"}' },
          { id: 4, name: "Chunky Clay Floral Choker", description: "Make a bold statement with this hand-sculpted clay choker.", price: 799.00, images: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80", category: "Neckpieces", collection: "Beach Vacation", rating: 4.9, stock: 5, specifications: '{"Material": "Polymer Clay", "Weight": "45g", "Dimensions": "Adjustable"}' },
          { id: 5, name: "Heritage Emerald Bead Necklace", description: "A magnificent multilayered green bead neckpiece.", price: 1299.00, images: "https://images.unsplash.com/photo-1611085583191-a3b1a30a5a40?w=800&auto=format&fit=crop&q=80", category: "Neckpieces", collection: "Wedding", rating: 4.7, stock: 10, specifications: '{"Material": "Beads, Alloy", "Weight": "85g"}' }
        ];
        
        const found = mockFallbackList.find(p => p.id === productId) || mockFallbackList[0];
        setProduct(found);
        const images = found.images ? found.images.split(',') : [];
        setActiveImage(images[0] || '');
        setRelatedProducts(mockFallbackList.filter(p => p.id !== found.id).slice(0, 4));
        setLoading(false);
      });
  }, [productId]);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  if (loading) return <div className={styles.loader}>Polishing your jewelry...</div>;
  if (!product) return <div className={styles.error}>Product not found.</div>;

  const imageList = product.images ? product.images.split(',') : [];
  
  // Parse specifications
  let parsedSpecs: Record<string, string> = {};
  try {
    if (product.specifications) {
      parsedSpecs = JSON.parse(product.specifications);
    }
  } catch (e) {
    console.error('Failed to parse specifications', e);
  }

  return (
    <div className={styles.container}>
      <div className={styles.productPanel}>
        {/* Left Side: Images Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImageWrapper}>
            <img src={activeImage} alt={product.name} className={styles.mainImage} />
          </div>
          {imageList.length > 1 && (
            <div className={styles.thumbnails}>
              {imageList.map((imgUrl: string, idx: number) => (
                <button 
                  key={idx} 
                  className={`${styles.thumbBtn} ${activeImage === imgUrl ? styles.activeThumb : ''}`}
                  onClick={() => setActiveImage(imgUrl)}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Buy Details */}
        <div className={styles.details}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link> &gt; <Link href="/shop">Shop</Link> &gt; <span>{product.name}</span>
          </div>

          <div className={styles.tags}>
            <span className={styles.categoryTag}>{product.category}</span>
            {product.collection && <span className={styles.collectionTag}>{product.collection}</span>}
          </div>

          <h2 className={styles.productName}>{product.name}</h2>
          
          <div className={styles.ratingsRow}>
            <span className={styles.stars}>★★★★★</span>
            <span className={styles.ratingVal}>{product.rating} / 5.0 Rating</span>
            <span className={styles.divider}>|</span>
            <span className={styles.stockVal}>
              {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
            </span>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>₹{product.price.toFixed(2)}</span>
            <span className={styles.taxNote}>Inclusive of all taxes</span>
          </div>

          <hr className={styles.sectionDivider} />

          {/* Quantity selector and CTAs */}
          {product.stock > 0 && (
            <div className={styles.actionsPanel}>
              <div className={styles.quantityWrapper}>
                <span>Quantity</span>
                <div className={styles.qtyControls}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1" 
                  />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button className="btn-secondary" onClick={() => addToCart(product, quantity)}>
                  Add to Bag
                </button>
                <button className="btn-primary" onClick={handleBuyNow}>
                  Buy It Now
                </button>
              </div>
            </div>
          )}

          {/* Collapsible accordions for info */}
          <div className={styles.accordions}>
            {/* Description Accordion */}
            <div className={styles.accordion}>
              <button 
                className={styles.accordionHeader} 
                onClick={() => setDescriptionOpen(!descriptionOpen)}
              >
                <span>Product Description</span>
                <span>{descriptionOpen ? '−' : '+'}</span>
              </button>
              {descriptionOpen && (
                <div className={styles.accordionContent}>
                  <p>{product.description}</p>
                </div>
              )}
            </div>

            {/* Specifications Accordion */}
            <div className={styles.accordion}>
              <button 
                className={styles.accordionHeader} 
                onClick={() => setSpecsOpen(!specsOpen)}
              >
                <span>Materials & Sizing</span>
                <span>{specsOpen ? '−' : '+'}</span>
              </button>
              {specsOpen && (
                <div className={styles.accordionContent}>
                  {Object.keys(parsedSpecs).length > 0 ? (
                    <table className={styles.specsTable}>
                      <tbody>
                        {Object.entries(parsedSpecs).map(([key, val]) => (
                          <tr key={key}>
                            <td><strong>{key}</strong></td>
                            <td>{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Standard size, handcrafted with skin-friendly materials.</p>
                  )}
                </div>
              )}
            </div>

            {/* Care Guide Accordion */}
            <div className={styles.accordion}>
              <button 
                className={styles.accordionHeader} 
                onClick={() => setCareOpen(!careOpen)}
              >
                <span>Care Instructions</span>
                <span>{careOpen ? '−' : '+'}</span>
              </button>
              {careOpen && (
                <div className={styles.accordionContent}>
                  <ul className={styles.careList}>
                    <li>Keep your jewelry dry and away from humidity or wet surfaces.</li>
                    <li>Avoid direct contact with perfumes, spray mists, and sanitizers.</li>
                    <li>Always store your pieces individually in a soft linen pouch or airtight container.</li>
                    <li>Clean after use with a soft microfiber cloth to wipe away makeup or sweat.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className={styles.relatedProducts}>
          <div className={styles.sectionHeader}>
            <h2>You May Also Like</h2>
            <div className={styles.titleDivider}></div>
          </div>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
