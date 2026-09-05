"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  productId: string;
  size: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (productId: string, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "norlabs-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load any previously saved cart once, on mount. localStorage isn't
  // available during server rendering, so this can only happen after
  // mount — an effect is the standard hydration-safe pattern here.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(JSON.parse(stored));
    }
    setHydrated(true);
  }, []);

  // Persist on every change, but only after the initial load above has
  // run — otherwise this would fire first with the empty initial state
  // and immediately overwrite whatever was saved.
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addToCart(productId: string, size: string, quantity = 1) {
    setItems((current) => {
      const existing = current.find(
        (item) => item.productId === productId && item.size === size,
      );
      if (existing) {
        return current.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { productId, size, quantity }];
    });
  }

  function removeFromCart(productId: string, size: string) {
    setItems((current) =>
      current.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    );
  }

  function updateQuantity(productId: string, size: string, quantity: number) {
    setItems((current) =>
      current.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item,
      ),
    );
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
