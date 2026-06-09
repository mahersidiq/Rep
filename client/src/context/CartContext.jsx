import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'rep_cart';

// Cart item shape: { id, name, price, quantity, flavor, sku }
// `id` is a composite key (sku + flavor + pack) so the same SKU in
// different flavors/packs are tracked as separate line items.

const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { items: action.payload };

    case 'ADD_ITEM': {
      const incoming = action.payload;
      const existing = state.items.find((it) => it.id === incoming.id);
      if (existing) {
        return {
          items: state.items.map((it) =>
            it.id === incoming.id
              ? { ...it, quantity: it.quantity + incoming.quantity }
              : it
          ),
        };
      }
      return { items: [...state.items, incoming] };
    }

    case 'REMOVE_ITEM':
      return { items: state.items.filter((it) => it.id !== action.payload) };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return { items: state.items.filter((it) => it.id !== id) };
      }
      return {
        items: state.items.map((it) =>
          it.id === id ? { ...it, quantity } : it
        ),
      };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { items: JSON.parse(raw) };
  } catch (e) {
    // Corrupt storage — start clean.
  }
  return initialState;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, loadInitial);
  // Drawer open/close is pure UI state, kept here so any page can trigger it.
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist to localStorage on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) {
      // Storage full or unavailable — ignore.
    }
  }, [state.items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    setIsCartOpen(true);
  };
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const itemCount = state.items.reduce((sum, it) => sum + it.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, it) => sum + it.price * it.quantity,
    0
  );

  const value = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    isCartOpen,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
