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
  "plastic-chairs": "Plastic Chairs",
  "plastic-tables": "Plastic Tables",
  "plastic-cupboards": "Plastic Cupboards",
  "household": "Household",
  "pvc-doors": "PVC Doors & Frames"
};

function PlasticProductsContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { products, loading, error } = useProducts("plastic-products");
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
      if (sub === "plastic-chairs") {
        return name.includes("chair") && name.includes("plastic");
      }
      if (sub === "plastic-tables") {
        return name.includes("table") && name.includes("plastic");
      }
      if (sub === "plastic-cupboards") {
        return (name.includes("cupboard") || name.includes("drawer") || name.includes("cabinet")) && name.includes("plastic");
      }
      if (sub === "household") {
        return name.includes("household") || name.includes("rack") || name.includes("basket") || name.includes("bucket");
      }
      if (sub === "pvc-doors") {
        return name.includes("door") || name.includes("pvc") || name.includes("frame");
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
          title="Plastic Storage & Furniture"
          subtitle="Durable Household Items"
          description="Browse durable, lightweight plastic drawers, multi-purpose storage cabinets, heavy-duty armchairs, and children's study table packages."
          bgGradient="from-blue-600 to-teal-700"
          badgeBg="bg-teal-900/30"
          badgeTextColor="text-teal-100"
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
                  onClick={() => router.push("/plastic-products")} 
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
              {subcategory ? `Explore ${activeLabel}` : "Explore Plastic Products"}
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
                <span className="text-4xl block mb-2">📦</span>
                No products found under <span className="font-semibold text-slate-700">"{activeLabel || "Plastic Products"}"</span>.
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

export default function PlasticProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 text-slate-500">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mr-3"></span>
        Loading page...
      </div>
    }>
      <PlasticProductsContent />
    </Suspense>
  );
}
