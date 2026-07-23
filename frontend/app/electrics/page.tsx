"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryHero from "@/components/CategoryHero";

// Electrics/Appliances products mock data
const ELECTRICS_PRODUCTS = [
  { id: 1, name: "Innovex 32\" Smart Android LED TV", price: "Rs. 58,500", rating: 4, imageBg: "from-slate-800 to-slate-900 text-white", badge: "Best Buy" },
  { id: 2, name: "Innovex Double Door Refrigerator 220L", price: "Rs. 135,000", rating: 5, imageBg: "from-sky-100 to-sky-200", badge: "Free Delivery" },
  { id: 3, name: "Innovex Fully Auto Washing Machine 7kg", price: "Rs. 95,000", oldPrice: "Rs. 108,000", rating: 5, imageBg: "from-blue-50 to-blue-200", badge: "-12% Off" },
  { id: 4, name: "Innovex Microwave Oven 20L", price: "Rs. 24,000", rating: 4, imageBg: "from-slate-200 to-neutral-300" },
  { id: 5, name: "Innovex 43\" Full HD Smart TV", price: "Rs. 98,000", oldPrice: "Rs. 110,000", rating: 5, imageBg: "from-slate-700 to-stone-900 text-white", badge: "Sale" },
  { id: 6, name: "Innovex Single Door Fridge 170L", price: "Rs. 79,500", rating: 4, imageBg: "from-teal-50 to-cyan-100" },
];

export default function ElectricsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main className="flex-grow">
        
        {/* Shared Hero Banner component */}
        <CategoryHero
          title="Electrics & Home Appliances"
          subtitle="Smart Home Electronics"
          description="Upgrade your living standard with Innovex smart LED TVs, energy-efficient refrigerators, fully automatic washing machines, and kitchen microwave ovens."
          bgGradient="from-blue-700 to-indigo-950"
          badgeBg="bg-indigo-900/30"
          badgeTextColor="text-indigo-200"
        />

        {/* Product Catalog Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Explore Electrics Range</h2>
            <span className="text-xs font-semibold text-zinc-500 bg-zinc-200 px-3 py-1 rounded-full">
              {ELECTRICS_PRODUCTS.length} Items Found
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {ELECTRICS_PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                name={prod.name}
                price={prod.price}
                oldPrice={prod.oldPrice}
                rating={prod.rating}
                imageBg={prod.imageBg}
                badge={prod.badge}
                icon={prod.name.includes("TV") ? "📺" : prod.name.includes("Fridge") || prod.name.includes("Refr") ? "🧊" : prod.name.includes("Microw") ? "🔌" : "🧺"}
              />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
