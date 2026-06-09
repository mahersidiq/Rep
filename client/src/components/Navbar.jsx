import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { itemCount, openCart } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // On the home page, "Formula" / "How it works" scroll to anchors.
  // Elsewhere, route home first then scroll.
  const goToAnchor = (id) => {
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#' + id);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <header style={styles.header}>
      <div className="container" style={styles.inner}>
        <Link to="/" style={styles.logo}>
          REP
        </Link>

        <nav style={styles.nav}>
          <Link to="/products" style={styles.link}>
            Products
          </Link>
          <button style={styles.linkBtn} onClick={() => goToAnchor('formula')}>
            Formula
          </button>
          <button
            style={styles.linkBtn}
            onClick={() => goToAnchor('how-it-works')}
          >
            How it works
          </button>
        </nav>

        <div style={styles.right}>
          <button
            className="btn"
            style={styles.cartBtn}
            onClick={openCart}
            aria-label="Open cart"
          >
            Cart{itemCount > 0 ? ` (${itemCount})` : ''}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/products')}
          >
            Buy Now
          </button>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: '#0A0A0A',
    borderBottom: '1px solid #1A1A1A',
  },
  inner: {
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
  },
  logo: {
    color: '#C8E000',
    fontWeight: 500,
    fontSize: 22,
    letterSpacing: '0.04em',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
  },
  link: {
    color: '#888888',
    fontWeight: 400,
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#888888',
    cursor: 'pointer',
    padding: 0,
    fontWeight: 400,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  cartBtn: {
    padding: '8px 14px',
  },
};
