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
  "bedroom-suites": "Bedroom Suites",
  "beds": "Beds",
  "upholstered-beds": "Upholstered Beds",
  "bedside-cupboards": "Bedside Cupboards & Bench",
  "wardrobes": "Wardrobes",
  "modular-wardrobe": "Modular Wardrobe",
  "dressing-tables": "Dressing Tables",
  "clothes-racks": "Clothes Racks",
  "shoe-racks": "Shoe Racks & Storage",
  "iron-tables": "Iron Tables",
  "spring-mattresses": "Spring Mattresses",
  "foam-mattresses": "Foam Mattresses",
  "pillows-protectors": "Pillows & Mattress Protectors"
};

function BedroomContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { products, loading, error } = useProducts("bedroom");
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
      if (sub === "bedroom-suites") {
        return name.includes("suite") || name.includes("bedroom set");
      }
      if (sub === "beds" || sub === "upholstered-beds") {
        return name.includes("bed") && !name.includes("bedside") && !name.includes("sheet") && !name.includes("mattress");
      }
      if (sub === "bedside-cupboards") {
        return name.includes("bedside") || name.includes("cupboard") || name.includes("bench");
      }
      if (sub === "wardrobes" || sub === "modular-wardrobe") {
        return name.includes("wardrobe") || name.includes("closet") || name.includes("almirah");
      }
      if (sub === "dressing-tables") {
        return name.includes("dressing") || name.includes("vanity");
      }
      if (sub === "clothes-racks") {
        return name.includes("clothes") || name.includes("hanger") || name.includes("rack");
      }
      if (sub === "shoe-racks") {
        return name.includes("shoe");
      }
      if (sub === "iron-tables") {
        return name.includes("iron") || name.includes("press") || name.includes("table");
      }
      if (sub === "spring-mattresses") {
        return name.includes("spring") && name.includes("mattress");
      }
      if (sub === "foam-mattresses") {
        return name.includes("foam") && name.includes("mattress");
      }
      if (sub === "pillows-protectors") {
        return name.includes("pillow") || name.includes("protector") || name.includes("sheet");
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
          title="Bedroom Sanctuaries"
          subtitle="Furniture Collections"
          description="Create your perfect sleeping space with solid wood bed frames, spacious closets, elegant dressing tables, and orthopedic spring mattresses."
          bgGradient="from-amber-800 to-amber-950"
          badgeBg="bg-amber-900/30"
          badgeTextColor="text-amber-200"
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
                  onClick={() => router.push("/bedroom")} 
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
              {subcategory ? `Explore ${activeLabel}` : "Explore Bedroom Collection"}
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
                <span className="text-4xl block mb-2">🛏️</span>
                No products found under <span className="font-semibold text-slate-700">"{activeLabel || "Bedroom"}"</span>.
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

export default function BedroomPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 text-slate-500">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mr-3"></span>
        Loading page...
      </div>
    }>
      <BedroomContent />
    </Suspense>
  );
}
