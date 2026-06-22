"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string;
    category: string;
    collection: string | null;
    rating: number;
    stock: number;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);

  // Parse images string
  const imageList = product.images ? product.images.split(',') : [];
  const primaryImage = imageList[0] || 'https://via.placeholder.com/400';
  const hoverImage = imageList[1] || primaryImage; // fall back to primary if only one image

  // Determine badges
  const isBestseller = product.rating >= 4.7;
  const isLimited = product.stock <= 8;

  return (
    <div 
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imageContainer}>
        {/* Badges */}
        {isBestseller && <span className={styles.badgeBestseller}>Bestseller</span>}
        {isLimited && <span className={styles.badgeLimited}>Low Stock</span>}

        <Link href={`/shop/${product.id}`}>
          <img 
            src={hovered ? hoverImage : primaryImage} 
            alt={product.name} 
            className={styles.productImage}
          />
        </Link>

        {/* Quick Add Overlay */}
        <button 
          className={`${styles.quickAddBtn} ${hovered ? styles.quickAddBtnVisible : ''}`}
          onClick={() => addToCart(product, 1)}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Quick Add +'}
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.metaRow}>
          <span className={styles.category}>{product.category}</span>
          <div className={styles.rating}>
            <span className={styles.star}>★</span>
            <span className={styles.ratingValue}>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <Link href={`/shop/${product.id}`}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>

        <div className={styles.footerRow}>
          <span className={styles.price}>₹{product.price.toFixed(2)}</span>
          <span className={styles.viewLink}>View Details →</span>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
