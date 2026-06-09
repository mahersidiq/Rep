import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, packOptions, getUnitPrice } from '../data/products.js';
import { formula } from '../data/formula.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();

  const [flavor, setFlavor] = useState(product?.flavors[0]);
  const [packQty, setPackQty] = useState(1);

  if (!product) {
    return (
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container">
          <h2 className="section-title">Product not found</h2>
          <Link to="/products" className="btn" style={{ marginTop: 16 }}>
            Back to products
          </Link>
        </div>
      </section>
    );
  }

  const unitPrice = getUnitPrice(product, packQty);
  const lineTotal = unitPrice * packQty;

  const handleAdd = () => {
    addItem({
      id: `${product.id}-${flavor}-${packQty}`,
      name: packQty > 1 ? `${product.name} (${packQty}-pack)` : product.name,
      price: unitPrice,
      quantity: packQty,
      flavor,
      sku: product.id,
    });
  };

  return (
    <section className="section" style={{ borderTop: 'none' }}>
      <div className="container">
        <Link to="/products" style={styles.back}>
          ← All products
        </Link>

        <div className="detail-grid" style={styles.grid}>
          {/* Left: info */}
          <div>
            <div style={styles.head}>
              <h1 style={styles.name}>{product.name}</h1>
              {product.nicotine ? (
                <span className="tag tag-accent">3mg nicotine</span>
              ) : (
                <span className="tag">Nicotine-free</span>
              )}
            </div>
            <p className="text-secondary" style={styles.tagline}>
              {product.tagline} · {product.pouchCount} pouches per can
            </p>
            <p style={styles.desc}>{product.description}</p>

            {/* Honest feel description */}
            <div style={styles.feelBlock}>
              <div className="section-label">The honest feel</div>
              <p className="text-secondary" style={styles.feel}>
                {product.feel}
              </p>
            </div>

            {/* Ingredient breakdown table */}
            <div style={{ marginTop: 40 }}>
              <div className="section-label">Ingredient breakdown</div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Ingredient</th>
                    <th style={styles.th}>Dose</th>
                    <th style={styles.th}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {formula.map((ing) => (
                    <tr key={ing.name}>
                      <td style={styles.td}>{ing.name}</td>
                      <td style={{ ...styles.td, color: '#C8E000' }}>
                        {ing.dose}
                      </td>
                      <td style={{ ...styles.td, color: '#888888' }}>
                        {ing.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: buy box */}
          <div className="card buy-box" style={styles.buyBox}>
            <div style={styles.priceTop}>
              <span style={styles.price}>${unitPrice.toFixed(2)}</span>
              <span className="text-secondary" style={{ fontSize: 13 }}>
                per can{packQty > 1 ? ` · ${packQty}-pack` : ''}
              </span>
            </div>

            <div>
              <div style={styles.optLabel}>Flavor</div>
              <div style={styles.optRow}>
                {product.flavors.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFlavor(f)}
                    className="tag"
                    style={f === flavor ? styles.optActive : styles.opt}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={styles.optLabel}>Quantity</div>
              <div style={styles.optRow}>
                {packOptions.map((opt) => {
                  const each = getUnitPrice(product, opt.qty);
                  return (
                    <button
                      key={opt.qty}
                      onClick={() => setPackQty(opt.qty)}
                      className="tag"
                      style={
                        opt.qty === packQty ? styles.optActive : styles.opt
                      }
                    >
                      {opt.label} · ${each.toFixed(2)}/ea
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={styles.totalRow}>
              <span className="text-secondary">Total</span>
              <span style={styles.total}>${lineTotal.toFixed(2)}</span>
            </div>

            <button className="btn btn-primary btn-block" onClick={handleAdd}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  back: {
    color: '#888888',
    fontSize: 14,
    display: 'inline-block',
    marginBottom: 32,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: 48,
    alignItems: 'start',
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  name: {
    fontSize: 36,
  },
  tagline: {
    fontSize: 15,
    marginBottom: 20,
  },
  desc: {
    fontSize: 16,
    maxWidth: 560,
  },
  feelBlock: {
    marginTop: 32,
    paddingTop: 24,
    borderTop: '1px solid #1A1A1A',
  },
  feel: {
    fontSize: 15,
    maxWidth: 560,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 16,
    fontSize: 14,
  },
  th: {
    textAlign: 'left',
    padding: '10px 12px',
    borderBottom: '1px solid #1A1A1A',
    color: '#888888',
    fontWeight: 500,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #1A1A1A',
  },
  buyBox: {
    position: 'sticky',
    top: 88,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  priceTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: 500,
  },
  optLabel: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 8,
  },
  optRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  opt: {
    cursor: 'pointer',
    background: 'transparent',
  },
  optActive: {
    cursor: 'pointer',
    background: 'transparent',
    borderColor: '#C8E000',
    color: '#C8E000',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: 16,
    borderTop: '1px solid #1A1A1A',
  },
  total: {
    fontSize: 22,
    fontWeight: 500,
  },
};
