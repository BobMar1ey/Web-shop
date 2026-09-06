import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "./data";

const ShopContext = createContext(null);
const KEY = "shop-state-v1";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function ShopProvider({ children }) {
  const saved = load();
  const [cart, setCart] = useState(saved.cart || []);
  const [wishlist, setWishlist] = useState(saved.wishlist || []);
  const [compare, setCompare] = useState(saved.compare || []);
  const [user, setUser] = useState(saved.user || null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, compare, user }));
  }, [cart, wishlist, compare, user]);

  const cartItems = useMemo(
    () =>
      cart
        .map((line) => {
          const product = products.find((p) => p.id === line.id);
          return product ? { ...product, qty: line.qty } : null;
        })
        .filter(Boolean),
    [cart]
  );

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (id, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
  };

  const setQty = (id, qty) => {
    setCart((prev) =>
      qty < 1 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((l) => l.id !== id));
  const clearCart = () => setCart([]);

  const toggleWish = (id) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleCompare = (id) =>
    setCompare((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id].slice(-4)));

  const value = {
    cart,
    cartItems,
    cartCount,
    subtotal,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWish,
    compare,
    toggleCompare,
    user,
    setUser,
    searchOpen,
    setSearchOpen,
    query,
    setQuery,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  return useContext(ShopContext);
}
