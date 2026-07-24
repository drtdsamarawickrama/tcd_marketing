import { useState, useEffect } from "react";
import { BACKEND_URL } from "./apiConfig";

// Definition matching the structure returned by PHP get_items.php API
export interface Product {
  id: number;
  category: string;
  name: string;
  price: string;
  old_price?: string | null;
  rating: number;
  image_bg: string;
  badge?: string | null;
  image?: string | null;
  tag?: string | null; // Featured Placement Tag ('best', 'new', 'offer')
  subcategory?: string | null; // Optional subcategory (e.g. 'sofa-sets')
  icon: string;
  description?: string | null;
  dimensions?: string | null;
  warranty?: string | null;
  additional_images?: string | null; // JSON string containing array of gallery image URLs
}

/**
 * Custom React hook to fetch product list dynamically from the backend DB
 * Supports filtering by category if specified, otherwise retrieves all products.
 */
export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Construct request URL
    const url = category 
      ? `${BACKEND_URL}/api/get_items.php?category=${encodeURIComponent(category)}`
      : `${BACKEND_URL}/api/get_items.php`;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        } else {
          setError(data.message || "Failed to retrieve product data.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to connect to backend api get_items.php:", err);
        setError(err.message || "Connection to API failed.");
        setLoading(false);
      });
  }, [category]);

  return { products, loading, error };
}
