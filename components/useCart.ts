import { useState, useEffect, useCallback } from "react";

// Cart item structure stored in localStorage
export interface CartItem {
  id: number;
  name: string;
  price: string;       // Display price string e.g. "Rs. 89,000"
  image: string | null;
  icon: string;
  category: string;
  quantity: number;
}

// Build a user-specific localStorage key so each user has their own cart
function getCartKey(userId: number | null): string {
  return userId ? `tcd_cart_user_${userId}` : "tcd_cart_guest";
}

// Helper: parse price string to number for calculations e.g. "Rs. 89,000" → 89000
function parsePriceNumber(priceStr: string): number {
  const cleaned = priceStr.replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
}

/**
 * useCart - Custom React hook for managing shopping cart via localStorage.
 * Cart is user-specific: each logged-in user has their own cart key.
 * Guest cart is stored separately and can be merged on login.
 */
export function useCart(userId: number | null) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartKey = getCartKey(userId);

  // Load cart from localStorage when userId changes (login/logout)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(cartKey);
      if (saved) {
        setCartItems(JSON.parse(saved));
      } else {
        setCartItems([]); // New user / empty cart
      }
    } catch {
      setCartItems([]);
    }
  }, [cartKey]);

  // Save cart to localStorage whenever items change
  function saveCart(items: CartItem[]) {
    setCartItems(items);
    localStorage.setItem(cartKey, JSON.stringify(items));
  }

  // Add a product to cart - if already exists, increase quantity
  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setCartItems(prev => {
      const existing = prev.find(c => c.id === item.id);
      let updated: CartItem[];

      if (existing) {
        // Already in cart - increment quantity
        updated = prev.map(c =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        // New item - add with quantity 1
        updated = [...prev, { ...item, quantity: 1 }];
      }

      localStorage.setItem(cartKey, JSON.stringify(updated));
      return updated;
    });
  }, [cartKey]);

  // Remove a single item from cart by product id
  const removeFromCart = useCallback((id: number) => {
    setCartItems(prev => {
      const updated = prev.filter(c => c.id !== id);
      localStorage.setItem(cartKey, JSON.stringify(updated));
      return updated;
    });
  }, [cartKey]);

  // Update quantity of a specific cart item (min 1)
  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, quantity } : c);
      localStorage.setItem(cartKey, JSON.stringify(updated));
      return updated;
    });
  }, [cartKey]);

  // Clear all items from cart
  const clearCart = useCallback(() => {
    localStorage.removeItem(cartKey);
    setCartItems([]);
  }, [cartKey]);

  // Check if a specific product is already in the cart
  const isInCart = useCallback((id: number) => {
    return cartItems.some(c => c.id === id);
  }, [cartItems]);

  // Total number of items (sum of all quantities)
  const cartCount = cartItems.reduce((sum, c) => sum + c.quantity, 0);

  // Total price value (sum of all item prices * quantities)
  const cartTotal = cartItems.reduce((sum, c) => {
    return sum + parsePriceNumber(c.price) * c.quantity;
  }, 0);

  return {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
  };
}
