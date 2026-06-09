import { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartApi = useMemo(
    () => ({
      cart,
      cartOpen,
      setCartOpen,
      addToCart(product, quantity = 1) {
        setCart((current) => {
          const existing = current.find((item) => item.id === product.id);
          if (existing) {
            return current.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            );
          }
          return [...current, { ...product, quantity }];
        });
        setCartOpen(true);
      },
      removeFromCart(id) {
        setCart((current) => current.filter((item) => item.id !== id));
      },
      updateQuantity(id, quantity) {
        if (quantity <= 0) {
          setCart((current) => current.filter((item) => item.id !== id));
          return;
        }
        setCart((current) =>
          current.map((item) => (item.id === id ? { ...item, quantity } : item)),
        );
      },
      clearCart() {
        setCart([]);
      },
    }),
    [cart, cartOpen],
  );

  return (
    <Layout cartApi={cartApi}>
      <Routes>
        <Route path="/" element={<Home addToCart={cartApi.addToCart} />} />
        <Route path="/products" element={<Products addToCart={cartApi.addToCart} />} />
        <Route
          path="/products/:productId"
          element={<ProductDetail addToCart={cartApi.addToCart} />}
        />
        <Route path="/checkout" element={<Checkout cartApi={cartApi} />} />
        <Route path="/order-confirmation" element={<Confirmation />} />
        <Route path="*" element={<Home addToCart={cartApi.addToCart} />} />
      </Routes>
    </Layout>
  );
}
