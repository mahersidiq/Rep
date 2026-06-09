# REP — Performance Pouches

E-commerce site for **REP**, a gym-specific performance pouch brand.

Two SKUs:

- **REP Original** — nicotine-free performance, **$9.99**
- **REP Plus** — with 3mg nicotine, **$18.99**

Built with Vite + React 18, React Router v6, Stripe, and an Express backend.
No Shopify, no CSS frameworks, no third-party cart libraries.

## Tech stack

| Layer    | Tech                                                  |
| -------- | ----------------------------------------------------- |
| Frontend | Vite, React 18, React Router v6                       |
| Payments | `@stripe/stripe-js`, `@stripe/react-stripe-js`        |
| Backend  | Express.js (single Stripe payment-intent endpoint)    |
| Deploy   | Vercel (`vercel.json` included)                       |
| State    | `CartContext` (`useContext` + `useReducer`), localStorage |

## Project structure

```
/
├── client/                 # Vite + React app
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── components/      # Navbar, Footer, ProductCard, CartDrawer, IngredientGrid
│       ├── pages/           # Home, Products, ProductDetail, Checkout, OrderConfirmation
│       ├── context/         # CartContext.jsx
│       ├── data/            # products.js, formula.js
│       ├── lib/             # stripe.js
│       ├── styles/          # global.css
│       ├── App.jsx
│       └── main.jsx
├── server/                 # Express + Stripe
│   └── index.js
├── scripts/dev.js          # runs client + server together
├── vercel.json
└── package.json            # root convenience scripts
```

## Environment variables

### Client (`client/.env`)

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:3001
```

### Server (`server/.env`)

```
STRIPE_SECRET_KEY=sk_test_...
PORT=3001
CLIENT_URL=http://localhost:5173
```

Copy the provided examples to get started:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

## Setup & local development

Install dependencies for both apps:

```bash
npm run install:all
# or individually:
#   npm install --prefix client
#   npm install --prefix server
```

Run the client and server together:

```bash
npm run dev
```

This starts:

- **Client** — Vite dev server at <http://localhost:5173>
- **Server** — Express API at <http://localhost:3001>

Or run them separately in two terminals:

```bash
npm run dev:server
npm run dev:client
```

The Vite dev server proxies `/api/*` to the Express server, so the frontend
works whether you point `VITE_API_URL` at `http://localhost:3001` or leave it
empty.

## Stripe test key setup

1. Create a Stripe account at <https://dashboard.stripe.com>.
2. Make sure you're in **Test mode** (toggle in the dashboard).
3. Go to **Developers → API keys**.
4. Copy the **Publishable key** (`pk_test_...`) into
   `client/.env` as `VITE_STRIPE_PUBLISHABLE_KEY`.
5. Copy the **Secret key** (`sk_test_...`) into
   `server/.env` as `STRIPE_SECRET_KEY`.

### Test card

Use Stripe's test card at checkout:

- Number: `4242 4242 4242 4242`
- Expiry: any future date
- CVC: any 3 digits
- ZIP: any 5 digits

## Deployment (Vercel)

The included `vercel.json` builds both the Express API and the Vite client,
routing `/api/*` to the server and everything else to the client build.

1. Push this repo to GitHub.
2. In Vercel, **Import Project** and select the repo.
3. Add the environment variables in **Project Settings → Environment Variables**:
   - `STRIPE_SECRET_KEY` (server)
   - `VITE_STRIPE_PUBLISHABLE_KEY` (client — exposed to the browser)
   - Optionally `CLIENT_URL` set to your production domain for CORS.
4. Deploy. Vercel reads `vercel.json` and builds both targets.

> The server reads `STRIPE_SECRET_KEY` from the environment and never exposes
> it to the client. CORS allows `localhost`, your `CLIENT_URL`, and any
> `*.vercel.app` domain.

## Product & formula data

All product and formula data is hardcoded:

- `client/src/data/products.js` — the two SKUs, pricing, multipacks, flavors.
- `client/src/data/formula.js` — the 8-ingredient formula and the
  "how it works" timeline.

## Design system

| Token            | Value                                   |
| ---------------- | --------------------------------------- |
| Background       | `#0A0A0A`                               |
| Text primary     | `#F0F0F0`                               |
| Text secondary   | `#888888`                               |
| Accent           | `#C8E000`                               |
| Border           | `#1A1A1A`                               |
| Font             | `system-ui, -apple-system, sans-serif`  |
| Font weights     | 400, 500                                |
| Radius           | 4px (buttons/tags), 6px (cards)         |

No gradients, no shadows, no blur.
