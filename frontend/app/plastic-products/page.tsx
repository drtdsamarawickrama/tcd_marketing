"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryHero from "@/components/CategoryHero";

// Plastic products mock data
const PLASTIC_PRODUCTS = [
  { id: 1, name: "Premium Plastic 5-Drawer Storage Cabinet", price: "Rs. 18,500", rating: 5, imageBg: "from-blue-50 to-indigo-100", badge: "Best Seller" },
  { id: 2, name: "Heavy Duty Plastic Armchair", price: "Rs. 3,800", rating: 4, imageBg: "from-sky-50 to-blue-100" },
  { id: 3, name: "Plastic Rattan Pattern Storage Box 50L", price: "Rs. 5,200", oldPrice: "Rs. 6,000", rating: 4, imageBg: "from-teal-50 to-emerald-100", badge: "Sale" },
  { id: 4, name: "Kid's Playtime Plastic Table & Chair Set", price: "Rs. 9,500", rating: 5, imageBg: "from-rose-50 to-pink-100" },
  { id: 5, name: "Premium Quality Shoe Rack (4-Tier)", price: "Rs. 6,800", rating: 4, imageBg: "from-neutral-100 to-stone-200" },
];

export default function PlasticProductsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
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
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Explore Plastic Products</h2>
            <span className="text-xs font-semibold text-zinc-500 bg-zinc-200 px-3 py-1 rounded-full">
              {PLASTIC_PRODUCTS.length} Items Found
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {PLASTIC_PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                name={prod.name}
                price={prod.price}
                oldPrice={prod.oldPrice}
                rating={prod.rating}
                imageBg={prod.imageBg}
                badge={prod.badge}
                icon="🧺"
              />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
