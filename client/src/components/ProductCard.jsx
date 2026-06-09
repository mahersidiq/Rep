import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    const flavor = product.flavors[0];
    addItem({
      id: `${product.id}-${flavor}-1`,
      name: product.name,
      price: product.price,
      quantity: 1,
      flavor,
      sku: product.id,
    });
  };

  return (
    <div className="card" style={styles.card}>
      <div>
        <div style={styles.head}>
          <h3 style={styles.name}>{product.name}</h3>
          {product.nicotine ? (
            <span className="tag tag-accent">3mg nicotine</span>
          ) : (
            <span className="tag">Nicotine-free</span>
          )}
        </div>

        <p className="text-secondary" style={styles.desc}>
          {product.description}
        </p>

        <div style={styles.tags}>
          {product.flavors.map((f) => (
            <span className="tag" key={f}>
              {f}
            </span>
          ))}
          <span className="tag">{product.pouchCount} pouches</span>
        </div>

        <div style={styles.priceRow}>
          <span style={styles.price}>${product.price.toFixed(2)}</span>
          <span className="text-secondary" style={styles.multipack}>
            3-pack ${product.multipack[3].toFixed(2)}/ea · 5-pack $
            {product.multipack[5].toFixed(2)}/ea
          </span>
        </div>
      </div>

      <div style={styles.actions}>
        <button className="btn btn-primary btn-block" onClick={handleAdd}>
          Add to cart
        </button>
        <Link
          to={`/products/${product.slug}`}
          className="btn btn-block"
          style={styles.detailLink}
        >
          View details
        </Link>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 24,
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
  },
  desc: {
    fontSize: 14,
    marginBottom: 16,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  priceRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: 500,
  },
  multipack: {
    fontSize: 13,
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  detailLink: {
    textDecoration: 'none',
  },
};
