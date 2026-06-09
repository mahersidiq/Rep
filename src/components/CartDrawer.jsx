import { Link } from "react-router-dom";
import { CloseIcon } from "./Icons";
import ProductVisual from "./ProductVisual";

export default function CartDrawer({
  cart,
  isOpen,
  onClose,
  removeFromCart,
  updateQuantity,
}) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <button
        aria-label="Close cart"
        className={`cart-scrim ${isOpen ? "is-open" : ""}`}
        onClick={onClose}
      />
      <aside aria-hidden={!isOpen} className={`cart-drawer ${isOpen ? "is-open" : ""}`}>
        <div className="cart-drawer__header">
          <div>
            <p className="eyebrow">Your order</p>
            <h2>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>
          </div>
          <button aria-label="Close cart" className="icon-button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="cart-drawer__content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <span>REP</span>
              <h3>Your cart is empty.</h3>
              <p>Put one in before you touch the bar.</p>
              <Link className="button button--primary" onClick={onClose} to="/products">
                Shop products
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item__visual">
                  <ProductVisual flavor={item.flavor} line={item.line} size="mini" />
                </div>
                <div className="cart-item__info">
                  <strong>{item.name}</strong>
                  <span>{item.callout}</span>
                  <div className="quantity">
                    <button
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item__price">
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <p>Shipping calculated at checkout. Adult signature may be required for REP Plus.</p>
            <Link className="button button--primary button--full" onClick={onClose} to="/checkout">
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
