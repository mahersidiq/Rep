import { Link } from "react-router-dom";
import ProductVisual from "./ProductVisual";

export default function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <Link className="product-card__visual" to={`/products/${product.id}`}>
        <span className="product-card__flavor">{product.flavor}</span>
        <ProductVisual flavor={product.flavor} line={product.line} size="card" />
      </Link>
      <div className="product-card__body">
        <p className="eyebrow">{product.callout}</p>
        <Link className="product-card__title" to={`/products/${product.id}`}>
          {product.name}
        </Link>
        <div className="product-card__meta">
          <span>{product.pouches} Pouches</span>
          <strong>${product.price.toFixed(2)}</strong>
        </div>
        <button className="button button--full button--dark" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}
