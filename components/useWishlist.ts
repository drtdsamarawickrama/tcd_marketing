import { useState, useEffect, useCallback } from "react";
import { BACKEND_URL } from "./apiConfig";

// Wishlist item structure stored in localStorage & Database
export interface WishlistItem {
  id: number;
  name: string;
  price: string;       // Display price string e.g. "Rs. 89,000"
  image: string | null;
  icon: string;
  category: string;
}

// Build user-specific localStorage key
function getWishlistKey(userId: number | null): string {
  return userId ? `tcd_wishlist_user_${userId}` : "tcd_wishlist_guest";
}

/**
 * useWishlist - Custom hook to manage the user's wishlist in localStorage & Database.
 * Wishlist is stored dynamically depending on if user is logged in or a guest.
 */
export function useWishlist(userId: number | null) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const wishlistKey = getWishlistKey(userId);

  // Load wishlist from DB/localStorage on userId change
  useEffect(() => {
    if (userId) {
      // Sync from DB
      fetch(`${BACKEND_URL}/api/sync_wishlist.php?user_id=${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setWishlistItems(data.data);
            localStorage.setItem(wishlistKey, JSON.stringify(data.data));
          } else {
            const saved = localStorage.getItem(wishlistKey);
            if (saved) setWishlistItems(JSON.parse(saved));
          }
        })
        .catch(() => {
          const saved = localStorage.getItem(wishlistKey);
          if (saved) setWishlistItems(JSON.parse(saved));
        });
    } else {
      // Guest: load from local storage
      try {
        const saved = localStorage.getItem(wishlistKey);
        if (saved) {
          setWishlistItems(JSON.parse(saved));
        } else {
          setWishlistItems([]);
        }
      } catch {
        setWishlistItems([]);
      }
    }
  }, [wishlistKey, userId]);

  // Toggle item in wishlist (adds if not present, removes if present)
  const toggleWishlist = useCallback((item: WishlistItem) => {
    setWishlistItems(prev => {
      const exists = prev.some(w => w.id === item.id);
      let updated: WishlistItem[];

      if (exists) {
        updated = prev.filter(w => w.id !== item.id);
      } else {
        updated = [...prev, item];
      }

      localStorage.setItem(wishlistKey, JSON.stringify(updated));

      // Sync to database if logged in
      if (userId) {
        fetch(`${BACKEND_URL}/api/sync_wishlist.php?user_id=${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "toggle", item_id: item.id })
        }).catch(err => console.error("Wishlist sync failed:", err));
      }

      return updated;
    });
  }, [wishlistKey, userId]);

  // Check if a specific product is in the wishlist
  const isInWishlist = useCallback((id: number) => {
    return wishlistItems.some(w => w.id === id);
  }, [wishlistItems]);

  // Total items in wishlist
  const wishlistCount = wishlistItems.length;

  return {
    wishlistItems,
    wishlistCount,
    toggleWishlist,
    isInWishlist,
  };
}