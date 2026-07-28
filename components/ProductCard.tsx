import React from "react";
import Link from "next/link";
import { useAuth } from "./useAuth";
import { useWishlist } from "./useWishlist";

// Props structure for reusable ProductCard
interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  oldPrice?: string | null;
  rating: number;
  imageBg: string;
  badge?: string | null;
  icon?: string | null; // Emoji representing the product category (optional)
  image?: string | null; // Optional image URL for the product
  category?: string;     // Product category for wishlist (optional)
}

export default function ProductCard({ id, name, price, oldPrice, rating, imageBg, badge, icon, image, category = "furniture" }: ProductCardProps) {
  const { user } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist(user?.id ?? null);
  const isWishlisted = isInWishlist(id);

  return (
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative">
      
      {/* Product Image Area linked to details */}
      <Link href={`/product/${id}`} className="block cursor-pointer">
        <div className={`h-52 bg-gradient-to-br ${imageBg} relative flex items-center justify-center overflow-hidden`}>
          {badge && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-xs tracking-wider z-10">
              {badge}
            </span>
          )}

          {/* Floating Heart Icon for Wishlist Toggle */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist({ id, name, price, image: image || null, icon: icon || "🛋️", category });
            }}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-1.5 rounded-full border border-slate-200 hover:scale-110 transition duration-150 z-20"
            title="Toggle Wishlist"
          >
            <svg
              className={`w-4 h-4 transition ${isWishlisted ? "fill-red-600 stroke-red-600 text-red-600" : "text-slate-500 hover:text-red-600"}`}
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          
          {/* If image is provided, show the image; otherwise, fallback to the emoji icon */}
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-200" 
            />
          ) : (
            icon && <span className="text-6xl group-hover:scale-115 transition duration-200">{icon}</span>
          )}

          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200">
            <span className="bg-white text-slate-800 font-extrabold text-xs px-4 py-2 rounded-md hover:bg-slate-100 shadow-md">
              View Details
            </span>
          </div>
        </div>
      </Link>

      {/* Product Info details */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <Link href={`/product/${id}`} className="block hover:underline group-hover:text-red-600 transition">
            <h3 className="text-base font-bold text-slate-800 min-h-[48px] line-clamp-2">
              {name}
            </h3>
          </Link>
          <div className="flex gap-0.5 text-amber-500 mt-2 text-sm">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < rating ? "★" : "☆"}</span>
            ))}
          </div>
        </div>

        {/* Price & Action button row */}
        <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
          <div>
            {oldPrice && (
              <span className="text-xs text-zinc-400 line-through block">{oldPrice}</span>
            )}
            <span className="text-lg font-black text-red-600">{price}</span>
          </div>
          <Link href={`/product/${id}`} className="bg-slate-900 text-white p-2.5 rounded-md hover:bg-red-600 transition duration-150 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

    </div>
  );
}
