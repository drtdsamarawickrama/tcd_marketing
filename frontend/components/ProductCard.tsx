import React from "react";

// Props structure for reusable ProductCard
interface ProductCardProps {
  name: string;
  price: string;
  oldPrice?: string;
  rating: number;
  imageBg: string;
  badge?: string;
  icon?: string; // Emoji representing the product category (optional)
  image?: string; // Optional image URL for the product
}

export default function ProductCard({ name, price, oldPrice, rating, imageBg, badge, icon, image }: ProductCardProps) {
  return (
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
      
      {/* Product Image Area */}
      <div className={`h-52 bg-gradient-to-br ${imageBg} relative flex items-center justify-center overflow-hidden`}>
        {badge && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-xs tracking-wider">
            {badge}
          </span>
        )}
        
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
          <button className="bg-white text-slate-800 font-extrabold text-xs px-4 py-2 rounded-md hover:bg-slate-100 shadow-md">
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-800 group-hover:text-red-600 transition min-h-[48px] line-clamp-2">
            {name}
          </h3>
          <div className="flex gap-0.5 text-amber-500 mt-2 text-sm">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < rating ? "★" : "☆"}</span>
            ))}
          </div>
        </div>

        {/* Price & Cart button row */}
        <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
          <div>
            {oldPrice && (
              <span className="text-xs text-zinc-400 line-through block">{oldPrice}</span>
            )}
            <span className="text-lg font-black text-red-600">{price}</span>
          </div>
          <button className="bg-slate-900 text-white p-2.5 rounded-md hover:bg-red-600 transition duration-150">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}
