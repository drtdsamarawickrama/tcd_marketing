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
  "office-tables": "Office Tables",
  "executive-tables": "Executive Tables",
  "conference-tables": "Conference & Discussion Tables",
  "cupboards-racks": "Cupboards & Racks",
  "steel-furniture": "Steel Furniture",
  "study-desks": "Study Desks & Computer Tables",
  "workstations": "Workstations",
  "reception-counters": "Reception Counters",
  "chairs-series": "Office Chairs By Series",
  "chairs-models": "All Office Chair Models",
  "lobby-seaters": "Lobby Seaters",
  "waiting-chairs": "Waiting Chairs",
  "safes-doors": "Safes & Fire Resistant Doors",
  "lockers-safes": "Safety Lockers & Strong Box"
};

function OfficeFurnitureContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { products, loading, error } = useProducts("office-furniture");
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
      if (sub === "office-tables") {
        return name.includes("table") && name.includes("office");
      }
      if (sub === "executive-tables") {
        return name.includes("executive") && name.includes("desk");
      }
      if (sub === "conference-tables") {
        return name.includes("conference") || name.includes("discussion");
      }
      if (sub === "cupboards-racks") {
        return name.includes("cupboard") || name.includes("rack") || name.includes("cabinet");
      }
      if (sub === "steel-furniture") {
        return name.includes("steel") || name.includes("metal");
      }
      if (sub === "study-desks") {
        return name.includes("study") || name.includes("computer") || name.includes("desk");
      }
      if (sub === "workstations") {
        return name.includes("workstation");
      }
      if (sub === "reception-counters") {
        return name.includes("reception") || name.includes("counter");
      }
      if (sub === "chairs-series" || sub === "chairs-models") {
        return name.includes("chair");
      }
      if (sub === "lobby-seaters") {
        return name.includes("lobby") || name.includes("seating");
      }
      if (sub === "waiting-chairs") {
        return name.includes("waiting") && name.includes("chair");
      }
      if (sub === "safes-doors") {
        return name.includes("safe") || name.includes("door");
      }
      if (sub === "lockers-safes") {
        return name.includes("locker") || name.includes("box") || name.includes("safe");
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
          title="Office Furniture Solutions"
          subtitle="Workplace Essentials"
          description="Boost productivity with ergonomic staff chairs, spacious L-shaped executive workstations, filing cabinets, and office storage shelves."
          bgGradient="from-slate-700 to-slate-900"
          badgeBg="bg-slate-800/40"
          badgeTextColor="text-slate-300"
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
                  onClick={() => router.push("/office-furniture")} 
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
              {subcategory ? `Explore ${activeLabel}` : "Explore Office Furniture"}
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
                <span className="text-4xl block mb-2">🏢</span>
                No products found under <span className="font-semibold text-slate-700">"{activeLabel || "Office Furniture"}"</span>.
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

export default function OfficeFurniturePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 text-slate-500">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mr-3"></span>
        Loading page...
      </div>
    }>
      <OfficeFurnitureContent />
    </Suspense>
  );
}
