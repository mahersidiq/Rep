import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CartIcon, MenuIcon, CloseIcon } from "./Icons";
import CartDrawer from "./CartDrawer";

export default function Layout({ children, cartApi }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const itemCount = cartApi.cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const sectionLink = (id) => (location.pathname === "/" ? `#${id}` : `/#${id}`);

  return (
    <div className="site-shell">
      <div className="notice-bar">
        <span>Free shipping on orders $50+</span>
        <span className="notice-bar__warning">
          REP Plus contains nicotine. Nicotine is an addictive chemical. 21+ only.
        </span>
      </div>

      <header className={`navbar ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container navbar__inner">
          <Link aria-label="REP home" className="logo" to="/">
            REP<span>.</span>
          </Link>

          <nav className={`nav-links ${mobileOpen ? "is-open" : ""}`}>
            <NavLink to="/products">Products</NavLink>
            <a href={sectionLink("formula")}>Formula</a>
            <a href={sectionLink("how-it-works")}>How It Works</a>
          </nav>

          <div className="navbar__actions">
            <button
              aria-label={`Open cart with ${itemCount} items`}
              className="cart-button"
              onClick={() => cartApi.setCartOpen(true)}
            >
              <CartIcon />
              <span>Cart</span>
              <b>{itemCount}</b>
            </button>
            <Link className="button button--primary navbar__buy" to="/products">
              Buy now
            </Link>
            <button
              aria-label="Toggle menu"
              className="icon-button mobile-menu"
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="container footer__main">
          <Link className="logo" to="/">
            REP<span>.</span>
          </Link>
          <nav className="footer__links">
            <Link to="/products">Products</Link>
            <a href={sectionLink("formula")}>Formula</a>
            <a href="mailto:training@rep.example">Contact</a>
          </nav>
          <strong>PERFORMANCE YOU CAN FEEL.</strong>
        </div>
        <div className="container footer__bottom">
          <span>© 2026 REP. All rights reserved.</span>
          <span>Made for training. Not for compromise.</span>
        </div>
      </footer>

      <CartDrawer
        cart={cartApi.cart}
        isOpen={cartApi.cartOpen}
        onClose={() => cartApi.setCartOpen(false)}
        removeFromCart={cartApi.removeFromCart}
        updateQuantity={cartApi.updateQuantity}
      />
    </div>
  );
}
