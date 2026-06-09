// Hardcoded product catalog. Two SKUs only.
export const products = [
  {
    id: 'rep-original',
    name: 'REP Original',
    slug: 'original',
    tagline: 'Nicotine-free performance',
    description:
      'A clean, nicotine-free performance pouch built for training. Caffeine, aminos, and pump ingredients that kick in fast and ride smooth — no crash, no jitters.',
    price: 9.99,
    multipack: { 3: 8.5, 5: 8.0 },
    flavors: ['Citrus', 'Mint', 'Berry'],
    pouchCount: 15,
    nicotine: false,
    feel:
      'Clean lift within minutes. Focused, steady energy that holds through your whole session. No nicotine, no buzz — just drive. You feel switched-on, not wired.',
  },
  {
    id: 'rep-plus',
    name: 'REP Plus',
    slug: 'plus',
    tagline: 'With 3mg nicotine',
    description:
      'Everything in Original plus 3mg of nicotine for an extra edge. The same performance formula with a sharper, more intense onset for experienced users.',
    price: 18.99,
    multipack: { 3: 16.5, 5: 15.5 },
    flavors: ['Citrus', 'Mint', 'Berry'],
    pouchCount: 15,
    nicotine: true,
    feel:
      'Sharper and more intense than Original. The nicotine adds a pointed alertness on top of the performance base. Best for users already comfortable with nicotine. Strong onset, locked-in focus.',
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

// Returns per-unit price for a given pack quantity.
export function getUnitPrice(product, packQty) {
  if (packQty >= 5 && product.multipack[5]) return product.multipack[5];
  if (packQty >= 3 && product.multipack[3]) return product.multipack[3];
  return product.price;
}

// Pack options shown in selectors.
export const packOptions = [
  { qty: 1, label: 'Single' },
  { qty: 3, label: '3-pack' },
  { qty: 5, label: '5-pack' },
];
