"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryHero from "@/components/CategoryHero";

// Dining products mock data
const DINING_PRODUCTS = [
  { id: 1, name: "Classic 6-Seater Mahogany Dining Set", price: "Rs. 175,000", rating: 5, imageBg: "from-amber-100 to-amber-200", badge: "Best Seller" },
  { id: 2, name: "Modern 4-Seater Glass Dining Table", price: "Rs. 95,000", oldPrice: "Rs. 110,000", rating: 4, imageBg: "from-slate-100 to-stone-200", badge: "Sale" },
  { id: 3, name: "Luxury Solid Oak Dining Chair", price: "Rs. 18,500", rating: 5, imageBg: "from-amber-50 to-orange-100" },
  { id: 4, name: "Compact 2-Seater Dining Set", price: "Rs. 52,000", rating: 4, imageBg: "from-yellow-50 to-amber-100" },
  { id: 5, name: "Mahogany Sideboard Buffet Cabinet", price: "Rs. 85,000", rating: 5, imageBg: "from-amber-200 to-amber-300", badge: "Premium" },
];

export default function DiningPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main className="flex-grow">
        
        {/* Shared Hero Banner component */}
        <CategoryHero
          title="Elegant Dining Sets"
          subtitle="Dining Collections"
          description="Gather your family around premium dining sets, tables, chairs, and buffet cabinets crafted with top-quality teak, mahogany, and modern materials."
          bgGradient="from-amber-700 to-orange-800"
          badgeBg="bg-orange-900/30"
          badgeTextColor="text-orange-200"
        />

        {/* Product Catalog Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Explore Dining Range</h2>
            <span className="text-xs font-semibold text-zinc-500 bg-zinc-200 px-3 py-1 rounded-full">
              {DINING_PRODUCTS.length} Items Found
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {DINING_PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                name={prod.name}
                price={prod.price}
                oldPrice={prod.oldPrice}
                rating={prod.rating}
                imageBg={prod.imageBg}
                badge={prod.badge}
                icon="🍽️"
              />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
