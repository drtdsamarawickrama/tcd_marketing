"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryHero from "@/components/CategoryHero";

// Budget products mock data
const BUDGET_PRODUCTS = [
  { id: 1, name: "Solid Wood Queen Bed Frame (Budget Deal)", price: "Rs. 45,000", oldPrice: "Rs. 52,000", rating: 4, imageBg: "from-amber-100 to-yellow-200", badge: "Super Deal" },
  { id: 2, name: "Eco Foam Comfort Mattress 6x3", price: "Rs. 12,500", rating: 4, imageBg: "from-sky-50 to-neutral-200" },
  { id: 3, name: "Compact 2-Door Wardrobe (Economic Melamine)", price: "Rs. 28,000", oldPrice: "Rs. 32,500", rating: 4, imageBg: "from-orange-50 to-amber-100", badge: "Price Drop" },
  { id: 4, name: "Basic Office Desk with Drawer", price: "Rs. 14,500", rating: 4, imageBg: "from-slate-100 to-zinc-200" },
  { id: 5, name: "Simple 3-Tier Plastic Storage Drawer", price: "Rs. 7,200", rating: 5, imageBg: "from-indigo-50 to-blue-100" },
  { id: 6, name: "Innovex Table Fan 16\" (Eco Save)", price: "Rs. 8,500", rating: 4, imageBg: "from-slate-100 to-neutral-200" },
];

export default function BudgetItemsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              {BUDGET_PRODUCTS.length} Items Found
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {BUDGET_PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                name={prod.name}
                price={prod.price}
                oldPrice={prod.oldPrice}
                rating={prod.rating}
                imageBg={prod.imageBg}
                badge={prod.badge}
                icon="🏷️"
              />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
