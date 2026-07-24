"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryHero from "@/components/CategoryHero";
import { useProducts } from "@/components/useProducts";

// Lookup mapping for query parameters to user-friendly titles
const subcategoryLabels: Record<string, string> = {
  "sofa-sets": "Sofa Sets",
  "corner-sofa": "Corner + Chaise Sofa",
  "recliner-sofa": "Recliner Sofa",
  "single-seaters": "Single Seaters",
  "ottoman": "Ottoman",
  "sofa-beds": "Sofa Beds",
  "wooden-sofa": "Wooden Sofa",
  "coffee-tables": "Coffee Tables & Side Tables",
  "tv-stands": "TV Stands & Wall Units",
  "cabinets": "Display cabinets & Sideboards",
  "shelves": "Wall Shelves & Display Stands",
  "rugs": "Rugs"
};

function LivingRoomContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { products, loading, error } = useProducts("living-room");
  const searchParams = useSearchParams();
  const router = useRouter();
  const subcategory = searchParams.get("sub");

  // Filter products locally using database subcategory field with a keyword-based fallback
  const getFilteredProducts = () => {
    if (!subcategory) return products;
    const sub = subcategory.toLowerCase();
    
    return products.filter((prod) => {
      // 1. Primary check: Database subcategory column
      if (prod.subcategory && prod.subcategory.toLowerCase() === sub) {
        return true;
      }
      
      // 2. Fallback check: Keyword matching in product name (for backward compatibility)
      if (prod.subcategory) {
        // If it has a different subcategory assigned, don't show it here
        return false;
      }
      
      const name = prod.name.toLowerCase();
      if (sub === "sofa-sets") {
        return name.includes("sofa") && !name.includes("bed") && !name.includes("wood");
      }
      if (sub === "corner-sofa") {
        return name.includes("corner") || name.includes("chaise");
      }
      if (sub === "recliner-sofa") {
        return name.includes("recliner");
      }
      if (sub === "single-seaters") {
        return name.includes("chair") || name.includes("recliner") || name.includes("single");
      }
      if (sub === "ottoman") {
        return name.includes("ottoman");
      }
      if (sub === "sofa-beds") {
        return name.includes("sofa bed") || name.includes("sofa-bed") || name.includes("bed");
      }
      if (sub === "wooden-sofa") {
        return name.includes("wooden sofa") || (name.includes("sofa") && name.includes("wood"));
      }
      if (sub === "coffee-tables") {
        return name.includes("table") || name.includes("coffee") || name.includes("center table");
      }
      if (sub === "tv-stands") {
        return name.includes("tv") || name.includes("console") || name.includes("wall unit");
      }
      if (sub === "cabinets") {
        return name.includes("cabinet") || name.includes("sideboard") || name.includes("display");
      }
      if (sub === "shelves") {
        return name.includes("shelf") || name.includes("shelves") || name.includes("stand");
      }
      if (sub === "rugs") {
        return name.includes("rug") || name.includes("rugs");
      }
      return false;
    });
  };

  const filteredProducts = getFilteredProducts();
  const activeLabel = subcategory ? subcategoryLabels[subcategory] || subcategory : "";

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      {/* Shared Header component */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main className="flex-grow">
        
        {/* Shared Hero Banner component */}
        <CategoryHero
          title="Living Room Comforts"
          subtitle="Furniture Collections"
          description="Transform your living room with TCD Marketing's luxury sofas, ergonomic armchairs, coffee tables, and contemporary TV consoles."
          bgGradient="from-rose-700 to-red-800"
          badgeBg="bg-red-900/30"
          badgeTextColor="text-red-200"
        />

        {/* Product Catalog Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          
          {/* Active Subcategory Indicator */}
          {subcategory && (
            <div className="mb-6 flex items-center gap-2 animate-fade-in">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Active Filter:</span>
              <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-1 rounded-full font-bold">
                <span>{activeLabel}</span>
                <button 
                  onClick={() => router.push("/living-room")} 
                  className="hover:text-red-900 font-extrabold focus:outline-none ml-1 text-sm leading-none"
                  title="Clear Filter"
                >
                  &times;
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">
              {subcategory ? `Explore ${activeLabel}` : "Explore Living Room Range"}
            </h2>
            <span className="text-xs font-semibold text-zinc-500 bg-zinc-200 px-3 py-1 rounded-full">
              {loading ? "..." : `${filteredProducts.length} Items Found`}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full py-12 flex justify-center items-center text-slate-500 font-medium">
                <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mr-3"></span>
                Loading products...
              </div>
            ) : error ? (
              <div className="col-span-full py-12 text-center text-red-500 font-medium">
                Error loading products: {error}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full py-12 text-center text-zinc-400 font-medium border border-dashed border-zinc-200 bg-white rounded-xl p-16">
                <span className="text-4xl block mb-2">🛋️</span>
                No products found under <span className="font-semibold text-slate-700">"{activeLabel || "Living Room"}"</span>.
              </div>
            ) : (
              filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  name={prod.name}
                  price={prod.price}
                  oldPrice={prod.old_price || undefined}
                  rating={prod.rating}
                  imageBg={prod.image_bg}
                  badge={prod.badge || undefined}
                  image={prod.image || undefined}
                  icon={prod.icon}
                />
              ))
            )}
          </div>
        </section>

      </main>

      {/* Shared Footer component */}
      <Footer />
    </div>
  );
}

export default function LivingRoomPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 text-slate-500">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mr-3"></span>
        Loading page...
      </div>
    }>
      <LivingRoomContent />
    </Suspense>
  );
}
