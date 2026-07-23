"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryHero from "@/components/CategoryHero";

// Bedroom products mock data
const BEDROOM_PRODUCTS = [
  { id: 1, name: "Solid Wood King Bedroom Set Bed", price: "Rs. 89,000", oldPrice: "Rs. 98,000", rating: 5, imageBg: "from-amber-200 to-amber-300", badge: "Sale" },
  { id: 2, name: "Premium Teak 4-Door Wardrobe", price: "Rs. 135,000", rating: 5, imageBg: "from-amber-300 to-orange-300" },
  { id: 3, name: "Elegant Dressing Table with Vanity Mirror", price: "Rs. 32,500", rating: 4, imageBg: "from-amber-100 to-stone-200" },
  { id: 4, name: "Bedside Drawer Cupboard", price: "Rs. 14,000", oldPrice: "Rs. 16,500", rating: 4, imageBg: "from-amber-50 to-stone-100" },
  { id: 5, name: "Spring Mattress Luxury Edition 6x5", price: "Rs. 45,000", rating: 5, imageBg: "from-sky-50 to-sky-100", badge: "New" },
  { id: 6, name: "Mahogany Chest of 5 Drawers", price: "Rs. 58,000", rating: 5, imageBg: "from-orange-100 to-amber-200" },
];

export default function BedroomPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      {/* Shared Header component */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main className="flex-grow">
        
        {/* Shared Hero Banner component */}
        <CategoryHero
          title="Bedroom Sanctuaries"
          subtitle="Furniture Collections"
          description="Create your perfect sleeping space with solid wood bed frames, spacious closets, elegant dressing tables, and orthopedic spring mattresses."
          bgGradient="from-amber-800 to-amber-950"
          badgeBg="bg-amber-900/30"
          badgeTextColor="text-amber-200"
        />

        {/* Product Catalog Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Explore Bedroom Collection</h2>
            <span className="text-xs font-semibold text-zinc-500 bg-zinc-200 px-3 py-1 rounded-full">
              {BEDROOM_PRODUCTS.length} Items Found
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {BEDROOM_PRODUCTS.map((prod) => (
              <ProductCard
                key={prod.id}
                name={prod.name}
                price={prod.price}
                oldPrice={prod.oldPrice}
                rating={prod.rating}
                imageBg={prod.imageBg}
                badge={prod.badge}
                icon="🛏️"
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
