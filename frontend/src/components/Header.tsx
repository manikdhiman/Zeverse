"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for premium floating header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transitions
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      {/* Top Banner Ticker */}
      <div className={styles.topBanner}>
        <div className={styles.tickerText}>
          ✦ GET FREE SHIPPING ON ORDERS ABOVE ₹999 ✦ HANDCRAFTED ANTI-TARNISH JEWELRY ✦ 10% OFF ON FIRST PURCHASE (CODE: ZEV10) ✦
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={styles.mainNav}>
        <div className={styles.navContainer}>
          {/* Mobile Menu Toggle */}
          <button className={styles.mobileToggle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <span className={mobileMenuOpen ? styles.open : ''}></span>
            <span className={mobileMenuOpen ? styles.open : ''}></span>
            <span className={mobileMenuOpen ? styles.open : ''}></span>
          </button>

          {/* Left Menus (Desktop) */}
          <nav className={styles.desktopNavLeft}>
            <Link href="/" className={pathname === '/' ? styles.active : ''}>
              Home
            </Link>
            
            {/* Products Dropdown */}
            <div className={styles.dropdown}>
              <Link href="/shop" className={`${styles.dropdownTrigger} ${pathname.startsWith('/shop') ? styles.active : ''}`}>
                Shop Jewelry ▾
              </Link>
              <div className={styles.dropdownMenu}>
                <Link href="/shop">All Products</Link>
                <Link href="/shop?category=Earrings">Earrings</Link>
                <Link href="/shop?category=Neckpieces">Neckpieces</Link>
                <Link href="/shop?category=Rings">Rings</Link>
                <Link href="/shop?category=Cuffs%20%26%20Bracelets">Cuffs & Bracelets</Link>
                <Link href="/shop?category=Brooches">Brooches</Link>
              </div>
            </div>

            {/* Collections Dropdown */}
            <div className={styles.dropdown}>
              <span className={styles.dropdownTrigger}>Collections ▾</span>
              <div className={styles.dropdownMenu}>
                <Link href="/shop?collection=Everyday%20Luxe">Everyday Luxe</Link>
                <Link href="/shop?collection=Festive">Festive Collection</Link>
                <Link href="/shop?collection=Wedding">Wedding Special</Link>
                <Link href="/shop?collection=Beach%20Vacation">Beach Vacation</Link>
              </div>
            </div>
          </nav>

          {/* Logo Center */}
          <div className={styles.logoCenter}>
            <Link href="/">
              <h1>ZEVERSE</h1>
            </Link>
          </div>

          {/* Right Action Items (Desktop) */}
          <div className={styles.navRight}>
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchBtn} aria-label="Search">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </form>

            {/* Static pages link */}
            <nav className={styles.desktopNavRight}>
              <Link href="/track-order" className={pathname === '/track-order' ? styles.active : ''}>
                Track Order
              </Link>
              <Link href="/about" className={pathname === '/about' ? styles.active : ''}>
                Our Story
              </Link>
            </nav>

            {/* Shopping Bag Button */}
            <button className={styles.cartIconBtn} onClick={() => setIsCartOpen(true)} aria-label="Cart drawer">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && <span className={styles.cartCountBadge}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <form onSubmit={handleSearchSubmit} className={styles.mobileSearchForm}>
            <input
              type="text"
              placeholder="Search Zeverse..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Go</button>
          </form>
          
          <Link href="/">Home</Link>
          <hr />
          
          <span className={styles.mobileSectionTitle}>Shop By Product</span>
          <Link href="/shop">- All Products</Link>
          <div className="dropdown-menu">
          <Link href="/shop/earrings">Earrings</Link>
          <Link href="/shop/neckpieces">Neckpieces</Link>
          <Link href="/shop/rings">Rings</Link>
          </div>
          <hr />

          <span className={styles.mobileSectionTitle}>Shop By Collection</span>
          <Link href="/shop?collection=Everyday%20Luxe">- Everyday Luxe</Link>
          <Link href="/shop?collection=Festive">- Festive Collection</Link>
          <Link href="/shop?collection=Wedding">- Wedding Special</Link>
          <Link href="/shop?collection=Beach%20Vacation">- Beach Vacation</Link>
          <hr />

          <Link href="/track-order">Track Order</Link>
          <Link href="/about">Our Story</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
