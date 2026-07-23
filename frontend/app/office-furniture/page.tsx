"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryHero from "@/components/CategoryHero";

// Office products mock data
const OFFICE_PRODUCTS = [
  { id: 1, name: "Executive Ergonomic High-Back Office Chair", price: "Rs. 32,500", rating: 4, imageBg: "from-zinc-100 to-zinc-200", badge: "Hot Seller" },
  { id: 2, name: "Premium L-Shaped Office Workstation Desk", price: "Rs. 78,000", oldPrice: "Rs. 85,000", rating: 5, imageBg: "from-slate-200 to-stone-300", badge: "Sale" },
  { id: 3, name: "Steel Filing Cabinet with Key Lock", price: "Rs. 45,000", rating: 4, imageBg: "from-slate-100 to-zinc-300" },
  { id: 4, name: "Ergonomic Task Staff Chair", price: "Rs. 18,500", rating: 4, imageBg: "from-neutral-100 to-zinc-200" },
  { id: 5, name: "Wooden Bookcase Filing Cupboard", price: "Rs. 55,000", rating: 5, imageBg: "from-amber-100 to-amber-200" },
];

export default function OfficeFurniturePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
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
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Explore Office Furniture</h2>
            <span className="text-xs font-semibold text-zinc-500 bg-zinc-200 px-3 py-1 rounded-full">
              {OFFICE_PRODUCTS.length} Items Found
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {OFFICE_PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                name={prod.name}
                price={prod.price}
                oldPrice={prod.oldPrice}
                rating={prod.rating}
                imageBg={prod.imageBg}
                badge={prod.badge}
                icon="💻"
              />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
