import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('rep_last_order');
      if (raw) setOrder(JSON.parse(raw));
    } catch (_) {
      /* ignore */
    }
  }, []);

  return (
    <section className="section" style={{ borderTop: 'none' }}>
      <div className="container" style={styles.wrap}>
        <div className="tag tag-accent" style={{ marginBottom: 20 }}>
          Order confirmed
        </div>
        <h1 style={styles.title}>Thank you{order ? `, ${order.name}` : ''}.</h1>
        <p className="text-secondary" style={styles.sub}>
          Your order is in. We've sent a confirmation
          {order?.email ? ` to ${order.email}` : ''}. Time to train.
        </p>

        {order && (
          <div className="card" style={styles.card}>
            <div style={styles.cardHead}>
              <span style={styles.colTitle}>Order summary</span>
              {order.paymentId && (
                <span className="text-secondary" style={styles.ref}>
                  Ref: {order.paymentId.slice(-8)}
                </span>
              )}
            </div>

            <div style={styles.lines}>
              {order.items.map((it) => (
                <div key={it.id} style={styles.line}>
                  <div>
                    <div style={styles.lineName}>{it.name}</div>
                    <div className="text-secondary" style={styles.lineMeta}>
                      {it.flavor} × {it.quantity}
                    </div>
                  </div>
                  <span>${(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={styles.totalRow}>
              <span className="text-secondary">Total paid</span>
              <span style={styles.total}>${order.subtotal.toFixed(2)}</span>
            </div>
          </div>
        )}

        <Link to="/products" className="btn btn-primary" style={{ marginTop: 32 }}>
          Back to shop
        </Link>
      </div>
    </section>
  );
}

const styles = {
  wrap: {
    maxWidth: 560,
  },
  title: {
    fontSize: 36,
    marginBottom: 12,
  },
  sub: {
    fontSize: 16,
    marginBottom: 32,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  cardHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  colTitle: {
    fontSize: 18,
    fontWeight: 500,
  },
  ref: {
    fontSize: 12,
  },
  lines: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  line: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 12,
    fontSize: 14,
  },
  lineName: {
    fontWeight: 500,
  },
  lineMeta: {
    fontSize: 12,
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: 16,
    borderTop: '1px solid #1A1A1A',
  },
  total: {
    fontSize: 20,
    fontWeight: 500,
  },
};
