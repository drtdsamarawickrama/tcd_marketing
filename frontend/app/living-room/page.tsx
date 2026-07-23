"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryHero from "@/components/CategoryHero";

// Living room products mock data
const LIVING_PRODUCTS = [
  { id: 1, name: "Antoni 3-Seater Premium Sofa", price: "Rs. 145,000", oldPrice: "Rs. 165,000", rating: 5, imageBg: "from-amber-100 to-orange-200", badge: "Best Seller" },
  { id: 2, name: "Luxury Recliner Armchair", price: "Rs. 48,000", rating: 4, imageBg: "from-amber-50 to-orange-100" },
  { id: 3, name: "Modern TV Console Cabinet", price: "Rs. 38,500", oldPrice: "Rs. 42,000", rating: 5, imageBg: "from-stone-200 to-stone-300", badge: "Sale" },
  { id: 4, name: "Solid Wood Nest of Coffee Tables", price: "Rs. 24,000", rating: 4, imageBg: "from-amber-200 to-yellow-100" },
  { id: 5, name: "Classic Chesterfield Fabric Sofa Set", price: "Rs. 185,000", rating: 5, imageBg: "from-rose-100 to-rose-200" },
  { id: 6, name: "Premium Glass Top Center Table", price: "Rs. 29,500", rating: 4, imageBg: "from-slate-200 to-zinc-300" },
];

export default function LivingRoomPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      {/* Shared Header component */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main className="flex-grow">
        
        {/* Shared Hero Banner component */}
        <CategoryHero
          title="Living Room Comforts"
          subtitle="Furniture Collections"
          description="Transform your living room with TCD Marketing's luxury sofas, ergonomic armchairs, coffee tables, and contemporary TV consoles."
          bgGradient="from-rose-700 to-red-800"
          badgeBg="bg-red-900/30"
          badgeTextColor="text-red-200"
        />

        {/* Product Catalog Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Explore Living Room Range</h2>
            <span className="text-xs font-semibold text-zinc-500 bg-zinc-200 px-3 py-1 rounded-full">
              {LIVING_PRODUCTS.length} Items Found
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {LIVING_PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                name={prod.name}
                price={prod.price}
                oldPrice={prod.oldPrice}
                rating={prod.rating}
                imageBg={prod.imageBg}
                badge={prod.badge}
                icon="🛋️"
              />
            ))}
          </div>
        </section>

      </main>

      {/* Shared Footer component */}
      <Footer />
    </div>
  );
}
