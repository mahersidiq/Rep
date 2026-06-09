import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { stripePromise, API_URL } from '../lib/stripe.js';
import { useCart } from '../context/CartContext.jsx';

// Stripe CardElement styling to match the design system.
const cardElementOptions = {
  style: {
    base: {
      color: '#F0F0F0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '15px',
      '::placeholder': { color: '#888888' },
    },
    invalid: { color: '#ff6b6b' },
  },
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [status, setStatus] = useState('idle'); // idle | processing | error
  const [error, setError] = useState('');

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!stripe || !elements) return;
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setStatus('processing');

    try {
      // 1. Create a PaymentIntent on the server.
      const res = await fetch(`${API_URL}/api/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: subtotal, currency: 'usd' }),
      });

      if (!res.ok) throw new Error('Could not start payment.');
      const { clientSecret } = await res.json();

      // 2. Confirm the card payment with Stripe.
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: form.name,
            email: form.email,
            address: {
              line1: form.address,
              city: form.city,
              state: form.state,
              postal_code: form.zip,
            },
          },
        },
      });

      if (result.error) {
        setStatus('error');
        setError(result.error.message || 'Payment failed.');
        return;
      }

      if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        // 3. Success — capture an order summary, clear cart, redirect.
        const order = {
          items,
          subtotal,
          email: form.email,
          name: form.name,
          date: new Date().toISOString(),
          paymentId: result.paymentIntent.id,
        };
        try {
          sessionStorage.setItem('rep_last_order', JSON.stringify(order));
        } catch (_) {
          /* ignore */
        }
        clearCart();
        navigate('/order-confirmation');
      }
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong.');
    }
  };

  const processing = status === 'processing';

  return (
    <form onSubmit={handleSubmit}>
      <div className="checkout-grid" style={styles.grid}>
        {/* Left: details + payment */}
        <div>
          <h3 style={styles.colTitle}>Contact</h3>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              className="input"
              value={form.name}
              onChange={onChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>

          <h3 style={{ ...styles.colTitle, marginTop: 32 }}>Shipping address</h3>
          <div className="field">
            <label htmlFor="address">Street address</label>
            <input
              id="address"
              name="address"
              className="input"
              value={form.address}
              onChange={onChange}
              required
            />
          </div>
          <div style={styles.cityRow}>
            <div className="field" style={{ flex: 2 }}>
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                className="input"
                value={form.city}
                onChange={onChange}
                required
              />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                className="input"
                value={form.state}
                onChange={onChange}
                required
              />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label htmlFor="zip">ZIP</label>
              <input
                id="zip"
                name="zip"
                className="input"
                value={form.zip}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <h3 style={{ ...styles.colTitle, marginTop: 32 }}>Payment</h3>
          <div className="field">
            <label>Card details</label>
            <div className="StripeElement">
              <CardElement options={cardElementOptions} />
            </div>
          </div>
          <p className="text-secondary" style={styles.testNote}>
            Test mode — use card 4242 4242 4242 4242, any future date, any CVC.
          </p>
        </div>

        {/* Right: order summary */}
        <div className="card" style={styles.summary}>
          <h3 style={styles.colTitle}>Order summary</h3>

          {items.length === 0 ? (
            <p className="text-secondary">
              Your cart is empty.{' '}
              <Link to="/products" style={{ color: '#C8E000' }}>
                Shop products
              </Link>
            </p>
          ) : (
            <>
              <div style={styles.lines}>
                {items.map((it) => (
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
                <span className="text-secondary">Total</span>
                <span style={styles.total}>${subtotal.toFixed(2)}</span>
              </div>

              {error && <p style={styles.error}>{error}</p>}

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={!stripe || processing}
              >
                {processing ? 'Processing…' : `Place Order · $${subtotal.toFixed(2)}`}
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default function Checkout() {
  const { items } = useCart();

  return (
    <section className="section" style={{ borderTop: 'none' }}>
      <div className="container">
        <div className="section-label">Checkout</div>
        <h2 className="section-title" style={{ marginBottom: 32 }}>
          Complete your order
        </h2>

        {!stripePromise ? (
          <div className="card">
            <p className="text-secondary">
              Stripe is not configured. Set{' '}
              <code style={{ color: '#C8E000' }}>
                VITE_STRIPE_PUBLISHABLE_KEY
              </code>{' '}
              in <code style={{ color: '#C8E000' }}>client/.env</code> to enable
              checkout.
            </p>
          </div>
        ) : (
          <Elements stripe={stripePromise}>
            <CheckoutForm key={items.length} />
          </Elements>
        )}
      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 360px',
    gap: 48,
    alignItems: 'start',
  },
  colTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  cityRow: {
    display: 'flex',
    gap: 12,
  },
  testNote: {
    fontSize: 12,
    marginTop: 8,
  },
  summary: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    position: 'sticky',
    top: 88,
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
    fontSize: 22,
    fontWeight: 500,
  },
  error: {
    color: '#ff6b6b',
    fontSize: 14,
  },
};
