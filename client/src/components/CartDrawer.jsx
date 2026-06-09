import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
  } = useCart();
  const navigate = useNavigate();

  const goToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          ...styles.overlay,
          opacity: isCartOpen ? 1 : 0,
          pointerEvents: isCartOpen ? 'auto' : 'none',
        }}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        style={{
          ...styles.drawer,
          transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
        aria-hidden={!isCartOpen}
      >
        <div style={styles.header}>
          <span style={styles.title}>Your cart</span>
          <button style={styles.close} onClick={closeCart} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div style={styles.body}>
          {items.length === 0 ? (
            <p className="text-secondary">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} style={styles.item}>
                <div style={styles.itemInfo}>
                  <span style={styles.itemName}>{it.name}</span>
                  <span className="text-secondary" style={styles.itemMeta}>
                    {it.flavor} · ${it.price.toFixed(2)} each
                  </span>
                  <div style={styles.qtyRow}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => updateQuantity(it.id, it.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span style={styles.qty}>{it.quantity}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => updateQuantity(it.id, it.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div style={styles.itemRight}>
                  <span style={styles.lineTotal}>
                    ${(it.price * it.quantity).toFixed(2)}
                  </span>
                  <button
                    style={styles.remove}
                    onClick={() => removeItem(it.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={styles.footer}>
          <div style={styles.subtotalRow}>
            <span className="text-secondary">Subtotal</span>
            <span style={styles.subtotal}>${subtotal.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-primary btn-block"
            onClick={goToCheckout}
            disabled={items.length === 0}
          >
            Go to Checkout
          </button>
        </div>
      </aside>
    </>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex: 90,
    transition: 'opacity 0.2s ease',
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100%',
    width: 'min(400px, 100%)',
    background: '#0A0A0A',
    borderLeft: '1px solid #1A1A1A',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.25s ease',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid #1A1A1A',
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  close: {
    background: 'none',
    border: 'none',
    color: '#888888',
    fontSize: 16,
    cursor: 'pointer',
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 12,
    paddingBottom: 16,
    borderBottom: '1px solid #1A1A1A',
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  itemName: {
    fontWeight: 500,
  },
  itemMeta: {
    fontSize: 13,
  },
  qtyRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    border: '1px solid #1A1A1A',
    borderRadius: 4,
    background: 'transparent',
    color: '#F0F0F0',
    cursor: 'pointer',
    lineHeight: 1,
  },
  qty: {
    minWidth: 20,
    textAlign: 'center',
  },
  itemRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  lineTotal: {
    fontWeight: 500,
  },
  remove: {
    background: 'none',
    border: 'none',
    color: '#888888',
    fontSize: 12,
    cursor: 'pointer',
    padding: 0,
  },
  footer: {
    padding: '20px 24px',
    borderTop: '1px solid #1A1A1A',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  subtotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  subtotal: {
    fontSize: 20,
    fontWeight: 500,
  },
};
