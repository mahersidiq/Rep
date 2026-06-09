import { useState } from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import ProductVisual from "../components/ProductVisual";
import { stripePromise } from "../lib/stripe";

const cardOptions = {
  hidePostalCode: true,
  style: {
    base: {
      color: "#f0f0f0",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      fontSize: "15px",
      "::placeholder": { color: "#777777" },
    },
    invalid: {
      color: "#ff7474",
    },
  },
};

export default function Checkout({ cartApi }) {
  if (!stripePromise) {
    return (
      <CheckoutShell cartApi={cartApi}>
        <div className="stripe-notice">
          <strong>Stripe setup required</strong>
          <p>
            Add <code>VITE_STRIPE_PUBLISHABLE_KEY</code> and
            <code> STRIPE_SECRET_KEY</code> in Vercel before accepting orders.
          </p>
        </div>
      </CheckoutShell>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cartApi={cartApi} />
    </Elements>
  );
}

function CheckoutForm({ cartApi }) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [adultConfirmed, setAdultConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const containsRestricted = cartApi.cart.some((item) => item.restricted);
  const subtotal = getSubtotal(cartApi.cart);
  const shipping = getShipping(subtotal);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!stripe || !elements || cartApi.cart.length === 0) return;
    if (containsRestricted && !adultConfirmed) {
      setError("Confirm that you are 21 or older to purchase REP Plus.");
      return;
    }

    setProcessing(true);
    const form = new FormData(event.currentTarget);

    try {
      const paymentResponse = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartApi.cart.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });

      const payment = await paymentResponse.json();
      if (!paymentResponse.ok || !payment.clientSecret) {
        throw new Error(payment.error || "Unable to start payment.");
      }

      const result = await stripe.confirmCardPayment(payment.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${form.get("firstName")} ${form.get("lastName")}`.trim(),
            email: form.get("email"),
            address: {
              line1: form.get("address"),
              city: form.get("city"),
              state: form.get("state"),
              postal_code: form.get("zip"),
              country: "US",
            },
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message || "Payment failed.");
      }

      if (result.paymentIntent?.status === "succeeded") {
        sessionStorage.setItem(
          "rep_last_order",
          JSON.stringify({
            paymentId: result.paymentIntent.id,
            email: form.get("email"),
            total: subtotal + shipping,
          }),
        );
        cartApi.clearCart();
        navigate("/order-confirmation");
      }
    } catch (paymentError) {
      setError(paymentError.message || "Payment failed. Try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <CheckoutShell cartApi={cartApi}>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="checkout-heading">
          <p className="eyebrow">Secure checkout</p>
          <h1>Finish the set.</h1>
        </div>
        <fieldset>
          <legend>Contact</legend>
          <label>
            Email
            <input name="email" required type="email" placeholder="you@example.com" />
          </label>
        </fieldset>
        <fieldset>
          <legend>Shipping</legend>
          <div className="form-grid">
            <label>
              First name
              <input name="firstName" required />
            </label>
            <label>
              Last name
              <input name="lastName" required />
            </label>
          </div>
          <label>
            Address
            <input name="address" required />
          </label>
          <div className="form-grid form-grid--three">
            <label>
              City
              <input name="city" required />
            </label>
            <label>
              State
              <input maxLength="2" name="state" placeholder="IL" required />
            </label>
            <label>
              ZIP
              <input inputMode="numeric" name="zip" required />
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Payment</legend>
          <label>
            Card details
            <div className="stripe-card">
              <CardElement options={cardOptions} />
            </div>
          </label>
        </fieldset>
        {containsRestricted && (
          <label className="age-confirm">
            <input
              checked={adultConfirmed}
              onChange={(event) => setAdultConfirmed(event.target.checked)}
              type="checkbox"
            />
            <span>
              I confirm that I am 21 or older and understand that REP Plus
              contains nicotine, an addictive chemical.
            </span>
          </label>
        )}
        {error && <p className="checkout-error">{error}</p>}
        <button
          className="button button--primary button--full button--checkout"
          disabled={
            processing ||
            !stripe ||
            cartApi.cart.length === 0 ||
            (containsRestricted && !adultConfirmed)
          }
          type="submit"
        >
          {processing
            ? "Processing..."
            : `Place order - $${(subtotal + shipping).toFixed(2)}`}
        </button>
      </form>
    </CheckoutShell>
  );
}

function CheckoutShell({ cartApi, children }) {
  const subtotal = getSubtotal(cartApi.cart);
  const shipping = getShipping(subtotal);

  return (
    <div className="page checkout-page">
      <div className="container checkout-grid">
        <div>{children}</div>
        <OrderSummary
          cart={cartApi.cart}
          shipping={shipping}
          subtotal={subtotal}
        />
      </div>
    </div>
  );
}

function OrderSummary({ cart, shipping, subtotal }) {
  return (
    <aside className="order-summary">
      <p className="eyebrow">Order summary</p>
      {cart.length === 0 ? (
        <div className="order-empty">
          <h2>No products yet.</h2>
          <p>Add a REP can before heading to checkout.</p>
        </div>
      ) : (
        cart.map((item) => (
          <div className="order-item" key={item.id}>
            <div className="order-item__visual">
              <ProductVisual flavor={item.flavor} line={item.line} size="mini" />
              <span>{item.quantity}</span>
            </div>
            <div>
              <strong>{item.name}</strong>
              <p>{item.callout}</p>
            </div>
            <strong>${(item.price * item.quantity).toFixed(2)}</strong>
          </div>
        ))
      )}
      <div className="order-totals">
        <div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
        <div>
          <span>Shipping</span>
          <strong>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</strong>
        </div>
        <div className="order-total">
          <span>Total</span>
          <strong>${(subtotal + shipping).toFixed(2)}</strong>
        </div>
      </div>
    </aside>
  );
}

function getSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getShipping(subtotal) {
  return subtotal >= 50 || subtotal === 0 ? 0 : 5.99;
}
