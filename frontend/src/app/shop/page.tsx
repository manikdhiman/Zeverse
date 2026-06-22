"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import styles from './shop.module.css';

// Separate component to handle search params, wrapped in Suspense
const ShopCatalog: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get active filters from URL parameters
  const urlCategory = searchParams.get('category') || 'All';
  const urlCollection = searchParams.get('collection') || 'All';
  const urlSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState(urlCategory);
  const [collectionFilter, setCollectionFilter] = useState(urlCollection);
  const [priceFilter, setPriceFilter] = useState<number>(2000);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [sortBy, setSortBy] = useState('featured');

  // Keep state synced with URL changes (e.g. when navbar links are clicked)
  useEffect(() => {
    setCategoryFilter(urlCategory);
    setCollectionFilter(urlCollection);
    setSearchQuery(urlSearch);
  }, [urlCategory, urlCollection, urlSearch]);

  // Fetch products based on filters
  useEffect(() => {
    setLoading(true);
    
    // Construct request query
    let queryParams = [];
    if (categoryFilter && categoryFilter !== 'All') {
      queryParams.push(`category=${encodeURIComponent(categoryFilter)}`);
    }
    if (collectionFilter && collectionFilter !== 'All') {
      queryParams.push(`collection=${encodeURIComponent(collectionFilter)}`);
    }
    if (priceFilter) {
      queryParams.push(`max_price=${priceFilter}`);
    }
    if (searchQuery) {
      queryParams.push(`search=${encodeURIComponent(searchQuery)}`);
    }
    
    const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
    
    fetch(`http://localhost:8000/api/products${queryString}`)
      .then((res) => {
        if (!res.ok) throw new Error('API down');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching filtered products, fallback used:', err);
        // Fallback mock items in case Python backend is launching
        const mockFallback = [
          { id: 1, name: "Sunny Resin Daisy Drop Earrings", description: "Yellow resin daisy earrings.", price: 349.00, images: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80", category: "Earrings", collection: "Everyday Luxe", rating: 4.8, stock: 15 },
          { id: 2, name: "Terracotta Heritage Jhumkas", description: "Hand-painted clay earrings.", price: 599.00, images: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80", category: "Earrings", collection: "Festive", rating: 4.6, stock: 8 },
          { id: 3, name: "Vintage Golden Hoop Ear Cuffs", description: "Gold plated brass ear cuffs.", price: 299.00, images: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80", category: "Earrings", collection: "Everyday Luxe", rating: 4.5, stock: 25 },
          { id: 4, name: "Chunky Clay Floral Choker", description: "Polymer clay flower choker.", price: 799.00, images: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80", category: "Neckpieces", collection: "Beach Vacation", rating: 4.9, stock: 5 },
          { id: 5, name: "Heritage Emerald Bead Necklace", description: "Beaded luxury emerald style necklace.", price: 1299.00, images: "https://images.unsplash.com/photo-1611085583191-a3b1a30a5a40?w=800&auto=format&fit=crop&q=80", category: "Neckpieces", collection: "Wedding", rating: 4.7, stock: 10 },
          { id: 6, name: "Abstract Ocean Blue Resin Ring", description: "Chunky resin ring with gold foil.", price: 399.00, images: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80", category: "Rings", collection: "Everyday Luxe", rating: 4.4, stock: 18 },
          { id: 7, name: "Crescent Moon Brass Ring", description: "Hammered brass crescent ring.", price: 249.00, images: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80", category: "Rings", collection: "Everyday Luxe", rating: 4.5, stock: 30 },
          { id: 8, name: "Hand-Carved Wooden Bangle Cuff", description: "Solid rosewood chunky bangle.", price: 499.00, images: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop&q=80", category: "Cuffs & Bracelets", collection: "Beach Vacation", rating: 4.3, stock: 12 },
          { id: 9, name: "Whimsical Peacock Enamel Brooch", description: "Handpainted vintage peacock pin.", price: 449.00, images: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800&auto=format&fit=crop&q=80", category: "Brooches", collection: "Festive", rating: 4.7, stock: 14 }
        ];

        // Apply filters locally on fallback mock data
        let filtered = mockFallback;
        if (categoryFilter && categoryFilter !== 'All') {
          filtered = filtered.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
        }
        if (collectionFilter && collectionFilter !== 'All') {
          filtered = filtered.filter(p => p.collection && p.collection.toLowerCase() === collectionFilter.toLowerCase());
        }
        if (priceFilter) {
          filtered = filtered.filter(p => p.price <= priceFilter);
        }
        if (searchQuery) {
          filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setProducts(filtered);
        setLoading(false);
      });
  }, [categoryFilter, collectionFilter, priceFilter, searchQuery]);

  // Handle local sorting
  const getSortedProducts = () => {
    let sorted = [...products];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  };

  const handleClearFilters = () => {
    setCategoryFilter('All');
    setCollectionFilter('All');
    setPriceFilter(2000);
    setSearchQuery('');
    router.push('/shop');
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className={styles.container}>
      <div className={styles.shopLayout}>
        {/* Left Sidebar Filter Section */}
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <div className={styles.sidebarHeader}>
              <h3>Filters</h3>
              <button onClick={handleClearFilters} className={styles.clearBtn}>Clear All</button>
            </div>
          </div>
          
          {/* Search Box inside sidebar */}
          <div className={styles.filterSection}>
            <h4>Search</h4>
            <div className={styles.sidebarSearch}>
              <input
                type="text"
                placeholder="Keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className={styles.filterSection}>
            <h4>Product Categories</h4>
            <div className={styles.filterOptions}>
              {['All', 'Earrings', 'Neckpieces', 'Rings', 'Cuffs & Bracelets', 'Brooches'].map((cat) => (
                <label key={cat} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="category"
                    checked={categoryFilter === cat}
                    onChange={() => setCategoryFilter(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Collection Filter */}
          <div className={styles.filterSection}>
            <h4>Curated Collections</h4>
            <div className={styles.filterOptions}>
              {['All', 'Everyday Luxe', 'Festive', 'Wedding', 'Beach Vacation'].map((coll) => (
                <label key={coll} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="collection"
                    checked={collectionFilter === coll}
                    onChange={() => setCollectionFilter(coll)}
                  />
                  <span>{coll}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className={styles.filterSection}>
            <h4>Max Price: <span className={styles.priceVal}>₹{priceFilter}</span></h4>
            <input
              type="range"
              min="200"
              max="2000"
              step="50"
              value={priceFilter}
              onChange={(e) => setPriceFilter(Number(e.target.value))}
              className={styles.priceSlider}
            />
            <div className={styles.sliderLabels}>
              <span>₹200</span>
              <span>₹2000</span>
            </div>
          </div>
        </aside>

        {/* Right Main Catalog Grid Section */}
        <section className={styles.catalog}>
          <div className={styles.catalogHeader}>
            <div className={styles.resultCount}>
              Showing <strong>{sortedProducts.length}</strong> jewelry pieces
            </div>
            
            {/* Sorting controls */}
            <div className={styles.sortWrapper}>
              <span>Sort By:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.sortSelect}>
                <option value="featured">Featured Favorites</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className={styles.loader}>Polishing gems...</div>
          ) : sortedProducts.length === 0 ? (
            <div className={styles.noResults}>
              <h3>No jewelry found matching your choices.</h3>
              <p>Try clearing some filters or searching for another keyword.</p>
              <button onClick={handleClearFilters} className="btn-primary" style={{ marginTop: '20px' }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default function Shop() {
  return (
    <Suspense fallback={<div style={{ padding: '80px', textAlignment: 'center', fontFamily: 'serif' }}>Loading Jewelry Catalog...</div>}>
      <ShopCatalog />
    </Suspense>
  );
}
