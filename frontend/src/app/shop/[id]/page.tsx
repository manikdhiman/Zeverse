'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '../../../../src/context/CartContext'; // Correct depth path fix
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  const productID = params.id;

  useEffect(() => {
    if (!productID) return;
    fetch(`http://127.0.0.1:8000/api/products/${productID}`)
      .then((res) => {
        if (!res.ok) throw new Error('Artisan piece profile missing.');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productID]);

  const handleAddClick = () => {
    if (!product) return;
    for (let i = 0; i < purchaseQuantity; i++) {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    }
    router.push('/cart');
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px 20px', fontWeight: '600' }}>Inspecting artisan engineering matrices...</div>;
  if (error || !product) return <div style={{ textAlign: 'center', padding: '100px 20px' }}><h2>Piece Not Found</h2><Link href="/shop" className="btn-primary">Return to Catalog</Link></div>;

  return (
    <div>
      <div style={{ maxWidth: '1100px', margin: '20px auto 0 auto', padding: '0 20px', fontSize: '13px', color: 'gray' }}>
        <Link href="/">Home</Link> / <Link href="/shop">Shop All</Link> / <span style={{ color: 'var(--primary-color)' }}>{product.name}</span>
      </div>
      <div className="details-container">
        <div className="details-gallery">
          <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '550px', objectFit: 'cover', borderRadius: '4px' }} />
        </div>
        <div className="details-content">
          <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'gray', letterSpacing: '2px' }}>Collection - {product.category}</span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', margin: '10px 0' }}>{product.name}</h1>
          <p style={{ fontSize: '22px', fontWeight: '500', marginBottom: '30px' }}>₹{product.price}</p>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', marginBottom: '25px' }} />
          
          <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'gray' }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CCC', borderRadius: '4px', backgroundColor: 'white' }}>
              <button onClick={() => setPurchaseQuantity(prev => Math.max(1, prev - 1))} style={{ padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer' }}>-</button>
              <span style={{ minWidth: '30px', textAlign: 'center' }}>{purchaseQuantity}</span>
              <button onClick={() => setPurchaseQuantity(prev => prev + 1)} style={{ padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer' }}>+</button>
            </div>
          </div>

          <button className="btn-primary" onClick={handleAddClick} style={{ width: '100%', padding: '16px', textTransform: 'uppercase', marginBottom: '40px' }}>Add to Bag & Review Cart →</button>

          <h3 style={{ color: 'var(--primary-color)', fontSize: '18px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>Product Specifications</h3>
          <table className="specs-table">
            <tbody>
              <tr><td>Composition</td><td>{product.material}</td></tr>
              <tr><td>Dimensions</td><td>{product.size}</td></tr>
              <tr><td>Care Rules</td><td>{product.care}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}