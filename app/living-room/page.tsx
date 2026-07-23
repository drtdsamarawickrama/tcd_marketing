"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        
        {/* Banner Section */}
        <section className="bg-gradient-to-r from-rose-700 to-red-800 text-white py-16 px-6 shadow-inner">
          <div className="max-w-7xl mx-auto space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-red-200 bg-red-900/30 px-3 py-1 rounded-full">
              Furniture Collections
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Living Room Comforts
            </h1>
            <p className="max-w-xl text-sm md:text-base text-zinc-100">
              Transform your living room with TCD Marketing's luxury sofas, ergonomic armchairs, coffee tables, and contemporary TV consoles.
            </p>
          </div>
        </section>

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
              <div key={prod.id} className="bg-white border border-zinc-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
                
                {/* Product Visual */}
                <div className={`h-52 bg-gradient-to-br ${prod.imageBg} relative flex items-center justify-center overflow-hidden`}>
                  {prod.badge && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-xs tracking-wider">
                      {prod.badge}
                    </span>
                  )}
                  <span className="text-6xl group-hover:scale-115 transition duration-200">🛋️</span>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200">
                    <button className="bg-white text-slate-800 font-extrabold text-xs px-4 py-2 rounded-md hover:bg-slate-100 shadow-md">
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-red-600 transition min-h-[48px] line-clamp-2">
                      {prod.name}
                    </h3>
                    <div className="flex gap-0.5 text-amber-500 mt-2 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < prod.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      {prod.oldPrice && (
                        <span className="text-xs text-zinc-400 line-through block">{prod.oldPrice}</span>
                      )}
                      <span className="text-lg font-black text-red-600">{prod.price}</span>
                    </div>
                    <button className="bg-slate-900 text-white p-2.5 rounded-md hover:bg-red-600 transition duration-150">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Shared Footer component */}
      <Footer />
    </div>
  );
}
