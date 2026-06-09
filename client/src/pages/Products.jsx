import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, packOptions, getUnitPrice } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

function ProductRow({ product }) {
  const { addItem } = useCart();
  const [flavor, setFlavor] = useState(product.flavors[0]);
  const [packQty, setPackQty] = useState(1);

  const unitPrice = getUnitPrice(product, packQty);
  const lineTotal = unitPrice * packQty;

  const handleAdd = () => {
    addItem({
      id: `${product.id}-${flavor}-${packQty}`,
      name:
        packQty > 1 ? `${product.name} (${packQty}-pack)` : product.name,
      price: unitPrice,
      quantity: packQty,
      flavor,
      sku: product.id,
    });
  };

  return (
    <div className="card product-row" style={styles.row}>
      <div style={styles.rowMain}>
        <div style={styles.rowHead}>
          <h3 style={styles.name}>{product.name}</h3>
          {product.nicotine ? (
            <span className="tag tag-accent">3mg nicotine</span>
          ) : (
            <span className="tag">Nicotine-free</span>
          )}
        </div>
        <p className="text-secondary" style={styles.tagline}>
          {product.tagline} · {product.pouchCount} pouches
        </p>
        <p className="text-secondary" style={styles.desc}>
          {product.description}
        </p>
        <Link to={`/products/${product.slug}`} style={styles.detail}>
          View full details →
        </Link>
      </div>

      <div style={styles.config}>
        {/* Flavor selector (UI only) */}
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

        {/* Quantity / pack selector */}
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
                  style={opt.qty === packQty ? styles.optActive : styles.opt}
                >
                  {opt.label} · ${each.toFixed(2)}/ea
                </button>
              );
            })}
          </div>
        </div>

        <div style={styles.priceLine}>
          <span className="text-secondary" style={{ fontSize: 13 }}>
            Total
          </span>
          <span style={styles.price}>${lineTotal.toFixed(2)}</span>
        </div>

        <button className="btn btn-primary btn-block" onClick={handleAdd}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default function Products() {
  const [filter, setFilter] = useState('both'); // 'original' | 'plus' | 'both'

  const visible = products.filter((p) => {
    if (filter === 'both') return true;
    return p.slug === filter;
  });

  const filters = [
    { key: 'both', label: 'Both' },
    { key: 'original', label: 'Original' },
    { key: 'plus', label: 'Plus' },
  ];

  return (
    <section className="section" style={{ borderTop: 'none' }}>
      <div className="container">
        <div className="section-label">Shop</div>
        <h2 className="section-title">All products</h2>

        {/* Filter toggle */}
        <div style={styles.filters}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="btn"
              style={filter === f.key ? styles.filterActive : undefined}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={styles.list}>
          {visible.map((p) => (
            <ProductRow key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  filters: {
    display: 'flex',
    gap: 10,
    margin: '24px 0 32px',
    flexWrap: 'wrap',
  },
  filterActive: {
    borderColor: '#C8E000',
    color: '#C8E000',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: 32,
  },
  rowMain: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  rowHead: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    fontSize: 24,
  },
  tagline: {
    fontSize: 14,
  },
  desc: {
    fontSize: 14,
  },
  detail: {
    color: '#C8E000',
    fontSize: 14,
    fontWeight: 500,
    marginTop: 4,
  },
  config: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
    borderLeft: '1px solid #1A1A1A',
    paddingLeft: 32,
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
  priceLine: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 24,
    fontWeight: 500,
  },
};
