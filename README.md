# REP Storefront

Premium Vite + React storefront concept for REP performance pouches.

## Run locally

```bash
npm install
npm run dev
```

Create a production bundle with:

```bash
npm run build
```

## Structure

- `src/pages/Home.jsx` contains the ordered homepage experience.
- `src/data/products.js` is the product catalog source.
- `src/components/ProductVisual.jsx` renders the product photography.
- `src/components/CartDrawer.jsx` contains cart behavior and controls.
- `src/styles.css` contains the complete responsive visual system.

Product photography lives in `public/images/`. The base shot is the Original
Citrus can (`rep-can.webp`); Mint and Berry variants are derived with a CSS
hue-rotate filter (`.product-visual--mint` / `.product-visual--berry` in
`src/styles.css`). Drop in per-flavor photos and remove those filters once
final photography for every SKU is available.

## Stripe checkout

Add these environment variables in Vercel before accepting orders:

```text
VITE_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
```

Card details are rendered by Stripe Elements and never pass through the React
application. The serverless payment endpoint recalculates totals from the
approved product catalog before creating a PaymentIntent.
