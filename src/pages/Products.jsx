import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const filters = [
  ["all", "All"],
  ["Original", "Original · Nicotine-Free"],
  ["Plus", "Plus · 3mg Nicotine"],
];

export default function Products({ addToCart }) {
  const [activeLine, setActiveLine] = useState("all");
  const visible =
    activeLine === "all"
      ? products
      : products.filter((product) => product.line === activeLine);

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div>
            <p className="eyebrow">The full lineup</p>
            <h1>Pick your performance.</h1>
          </div>
          <p>
            Original for nicotine-free output. Plus for adult nicotine users
            who want to turn the dial.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div aria-label="Filter products by line" className="filter-row" role="group">
            {filters.map(([value, label]) => (
              <button
                aria-pressed={activeLine === value}
                className={`filter-chip ${activeLine === value ? "is-active" : ""}`}
                key={value}
                onClick={() => setActiveLine(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="product-grid product-grid--all">
            {visible.map((product) => (
              <ProductCard addToCart={addToCart} key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
