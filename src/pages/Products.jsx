import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Products({ addToCart }) {
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
        <div className="container product-grid product-grid--all">
          {products.map((product) => (
            <ProductCard addToCart={addToCart} key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
