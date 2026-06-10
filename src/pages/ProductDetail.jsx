import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckIcon } from "../components/Icons";
import ProductVisual from "../components/ProductVisual";
import { products } from "../data/products";

export default function ProductDetail({ addToCart }) {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId) || products[0];
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="page">
      <section className="product-detail">
        <div className="container product-detail__grid">
          <div className="product-detail__visual">
            <span className="product-detail__index">REP / {product.line.toUpperCase()}</span>
            <ProductVisual
              flavor={product.flavor}
              line={product.line}
              size="detail"
            />
          </div>
          <div className="product-detail__copy">
            <Link className="back-link" to="/products">
              Back to products
            </Link>
            <p className="eyebrow">{product.callout}</p>
            <h1>{product.name}</h1>
            <p className="product-detail__price">${product.price.toFixed(2)}</p>
            <p className="product-detail__lead">{product.note}</p>
            <ul className="detail-list">
              <li><CheckIcon size={18} /> {product.caffeine}</li>
              <li><CheckIcon size={18} /> {product.nicotine}</li>
              <li><CheckIcon size={18} /> {product.pouches} pouches per can</li>
              <li><CheckIcon size={18} /> Redosable mid-workout</li>
            </ul>
            {product.restricted && (
              <div className="compliance-box">
                <strong>21+ PRODUCT</strong>
                <p>
                  This product contains nicotine. Nicotine is an addictive chemical.
                  Age verification is required.
                </p>
              </div>
            )}
            <div className="detail-purchase">
              <div className="quantity quantity--large">
                <button onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((value) => value + 1)}>+</button>
              </div>
              <button
                className="button button--primary button--full"
                onClick={() => addToCart(product, quantity)}
              >
                Add to cart - ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
            <p className="shipping-note">Free shipping on orders $50+. Ships in 1-2 business days.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
