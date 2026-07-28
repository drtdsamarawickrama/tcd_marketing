import { useState, useEffect, useCallback } from "react";
import { BACKEND_URL } from "./apiConfig";

// Cart item structure stored in localStorage & Database
export interface CartItem {
  id: number;
  name: string;
  price: string;       // Display price string e.g. "Rs. 89,000"
  image: string | null;
  icon: string;
  category: string;
  quantity: number;
}

// Build a user-specific localStorage key so each user has their own cart cache
function getCartKey(userId: number | null): string {
  return userId ? `tcd_cart_user_${userId}` : "tcd_cart_guest";
}

// Helper: parse price string to number for calculations e.g. "Rs. 89,000" → 89000
function parsePriceNumber(priceStr: string): number {
  const cleaned = priceStr.replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
}

/**
 * useCart - Custom React hook for managing shopping cart via localStorage & Database.
 * Cart is user-specific: each logged-in user has their cart synced to the DB.
 */
export function useCart(userId: number | null) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartKey = getCartKey(userId);

  // Load cart from DB/localStorage when userId changes
  useEffect(() => {
    if (userId) {
      // Sync from DB
      fetch(`${BACKEND_URL}/api/sync_cart.php?user_id=${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setCartItems(data.data);
            localStorage.setItem(cartKey, JSON.stringify(data.data));
          } else {
            const saved = localStorage.getItem(cartKey);
            if (saved) setCartItems(JSON.parse(saved));
          }
        })
        .catch(() => {
          const saved = localStorage.getItem(cartKey);
          if (saved) setCartItems(JSON.parse(saved));
        });
    } else {
      // Guest: load from local storage
      try {
        const saved = localStorage.getItem(cartKey);
        if (saved) {
          setCartItems(JSON.parse(saved));
        } else {
          setCartItems([]);
        }
      } catch {
        setCartItems([]);
      }
    }
  }, [cartKey, userId]);

  // Add a product to cart - if already exists, increase quantity
  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setCartItems(prev => {
      const existing = prev.find(c => c.id === item.id);
      let updated: CartItem[];

      if (existing) {
        updated = prev.map(c =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        updated = [...prev, { ...item, quantity: 1 }];
      }

      localStorage.setItem(cartKey, JSON.stringify(updated));

      // Sync to database if logged in
      if (userId) {
        fetch(`${BACKEND_URL}/api/sync_cart.php?user_id=${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "add", item_id: item.id, quantity: 1 })
        }).catch(err => console.error("Cart sync failed:", err));
      }

      return updated;
    });
  }, [cartKey, userId]);

  // Remove a single item from cart by product id
  const removeFromCart = useCallback((id: number) => {
    setCartItems(prev => {
      const updated = prev.filter(c => c.id !== id);
      localStorage.setItem(cartKey, JSON.stringify(updated));

      // Sync deletion to database if logged in
      if (userId) {
        fetch(`${BACKEND_URL}/api/sync_cart.php?user_id=${userId}&item_id=${id}`, {
          method: "DELETE"
        }).catch(err => console.error("Cart deletion sync failed:", err));
      }

      return updated;
    });
  }, [cartKey, userId]);

  // Update quantity of a specific cart item (min 1)
  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, quantity } : c);
      localStorage.setItem(cartKey, JSON.stringify(updated));

      // Sync updated quantity to database if logged in
      if (userId) {
        fetch(`${BACKEND_URL}/api/sync_cart.php?user_id=${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "update", item_id: id, quantity })
        }).catch(err => console.error("Cart update sync failed:", err));
      }

      return updated;
    });
  }, [cartKey, userId]);

  // Clear all items from cart
  const clearCart = useCallback(() => {
    localStorage.removeItem(cartKey);
    setCartItems([]);

    // Sync clear to database if logged in
    if (userId) {
      fetch(`${BACKEND_URL}/api/sync_cart.php?user_id=${userId}`, {
        method: "DELETE"
      }).catch(err => console.error("Cart clear sync failed:", err));
    }
  }, [cartKey, userId]);

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
