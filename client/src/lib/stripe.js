import { loadStripe } from '@stripe/stripe-js';

// Single Stripe instance for the app. Loaded lazily from the publishable key.
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = publishableKey
  ? loadStripe(publishableKey)
  : null;

// Base URL for the Express API. In dev, Vite proxies /api to :3001, so an
// empty base works; VITE_API_URL lets you point at an absolute host.
export const API_URL = import.meta.env.VITE_API_URL || '';
