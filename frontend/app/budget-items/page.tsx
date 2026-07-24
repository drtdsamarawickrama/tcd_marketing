"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryHero from "@/components/CategoryHero";
import { useProducts } from "@/components/useProducts";

export default function BudgetItemsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { products, loading, error } = useProducts("budget-items");

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main className="flex-grow">
        
        {/* Shared Hero Banner component */}
        <CategoryHero
          title="Budget Furniture & Items"
          subtitle="Best Prices Guaranteed"
          description="Discover low-price beds, cupboards, eco mattresses, study tables, and simple home appliances without compromising TCD quality."
          bgGradient="from-lime-600 to-lime-800"
          badgeBg="bg-lime-900/30"
          badgeTextColor="text-lime-100"
        />

        {/* Product Catalog Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Explore Budget Items</h2>
            <span className="text-xs font-semibold text-zinc-500 bg-zinc-200 px-3 py-1 rounded-full">
              {loading ? "..." : `${products.length} Items Found`}
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
            ) : products.length === 0 ? (
              <div className="col-span-full py-12 text-center text-zinc-400 font-medium">
                No products found in this category.
              </div>
            ) : (
              products.map((prod) => (
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

      <Footer />
    </div>
  );
}
