"use client";

import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/components/useProducts";

// Featured products section component rendering Best Sellers, New Arrivals, and Special Offers

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<"best" | "new" | "offer">("best");
  const { products, loading, error } = useProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 bg-white rounded-xl border border-zinc-200 shadow-xs mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-zinc-200 pb-4 mb-8 gap-4">
        <h2 className="text-2xl font-black text-slate-800">Featured Products</h2>
        
        <div className="flex bg-zinc-100 p-1 rounded-lg">
          {[
            { id: "best", label: "Best Sellers" },
            { id: "new", label: "New Arrivals" },
            { id: "offer", label: "Special Offers" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "best" | "new" | "offer")}
              className={`px-4 py-2 text-xs sm:text-sm font-extrabold rounded-md transition-all duration-150 ${
                activeTab === tab.id
                  ? "bg-red-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-12 flex justify-center items-center text-slate-500 font-medium">
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mr-3"></span>
            Loading products...
          </div>
        ) : error ? (
          <div className="col-span-full py-12 text-center text-red-500 font-medium">
            Error loading products: {error}
          </div>
        ) : products.filter((p) => p.tag === activeTab).length === 0 ? (
          <div className="col-span-full py-12 text-center text-zinc-400 font-medium">
            No products found for this tab.
          </div>
        ) : (
          products
            .filter((p) => p.tag === activeTab)
            .map((prod) => (
              <ProductCard
                key={prod.id}
                id={prod.id}
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
  );
}
