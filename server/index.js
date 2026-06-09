require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
const PORT = process.env.PORT || 3001;

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// CORS: allow local dev and production domain.
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (e.g. server-to-server, curl).
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // Allow any vercel.app preview/production domain.
      if (/\.vercel\.app$/.test(new URL(origin).hostname)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
  })
);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// POST /api/create-payment-intent
// Body: { amount: number (in dollars), currency: 'usd' }
// Returns: { clientSecret }
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      // Stripe expects the amount in the smallest currency unit (cents).
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Error creating payment intent:', err.message);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Only listen when run directly (not when imported by Vercel serverless).
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`REP server listening on port ${PORT}`);
  });
}

module.exports = app;
