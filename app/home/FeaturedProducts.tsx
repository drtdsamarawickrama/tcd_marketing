"use client";

import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  rating: number;
  imageBg: string;
  badge?: string;
  tag: "best" | "new" | "offer";
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Antoni 3-Seater Premium Sofa", category: "Furniture", price: "Rs. 145,000", oldPrice: "Rs. 165,000", rating: 5, imageBg: "from-amber-100 to-orange-200", badge: "Best Seller", tag: "best" },
  { id: 2, name: "Innovex 32\" Smart Android TV", category: "Appliances", price: "Rs. 58,500", rating: 4, imageBg: "from-slate-800 to-slate-900 text-white", tag: "new" },
  { id: 3, name: "Solid Wood King Bedroom Set Bed", category: "Furniture", price: "Rs. 89,000", oldPrice: "Rs. 98,000", rating: 5, imageBg: "from-amber-200 to-amber-300", badge: "Sale", tag: "offer" },
  { id: 4, name: "Innovex Double Door Refrigerator 220L", category: "Appliances", price: "Rs. 135,000", rating: 5, imageBg: "from-teal-50 to-teal-100", badge: "Free Shipping", tag: "best" },
  { id: 5, name: "Executive Ergonomic Office Chair", category: "Office", price: "Rs. 32,500", rating: 4, imageBg: "from-zinc-100 to-zinc-200", tag: "new" },
  { id: 6, name: "Innovex Fully Auto Washing Machine 7kg", category: "Appliances", price: "Rs. 95,000", oldPrice: "Rs. 108,000", rating: 5, imageBg: "from-blue-50 to-blue-100", badge: "-12% Off", tag: "offer" },
  { id: 7, name: "Classic 6-Seater Mahogany Dining Set", category: "Furniture", price: "Rs. 175,000", rating: 5, imageBg: "from-amber-100 to-amber-200", tag: "best" },
  { id: 8, name: "Innovex Microwave Oven 20L", category: "Appliances", price: "Rs. 24,000", rating: 4, imageBg: "from-neutral-100 to-stone-200", tag: "new" },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<"best" | "new" | "offer">("best");

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
        {PRODUCTS.filter(p => p.tag === activeTab).map((prod) => (
          <div key={prod.id} className="border border-zinc-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
            
            <div className={`h-48 bg-gradient-to-br ${prod.imageBg} relative flex items-center justify-center overflow-hidden`}>
              {prod.badge && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-xs tracking-wider">
                  {prod.badge}
                </span>
              )}
              <span className="text-5xl group-hover:scale-110 transition duration-200">
                {prod.category === "Furniture" ? "🛋️" : prod.name.includes("TV") ? "📺" : prod.name.includes("Refr") ? "🧊" : prod.name.includes("Chair") ? "🪑" : "🔌"}
              </span>
              
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200">
                <button className="bg-white text-slate-800 font-extrabold text-xs px-4 py-2 rounded-md hover:bg-slate-100 shadow-md">
                  View Details
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">{prod.category}</span>
                <h3 className="text-sm font-bold text-slate-800 mt-1 line-clamp-2 min-h-[40px] group-hover:text-red-600 transition">
                  {prod.name}
                </h3>
                
                <div className="flex gap-0.5 text-amber-500 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < prod.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                <div>
                  {prod.oldPrice && (
                    <span className="text-xs text-zinc-400 line-through block">{prod.oldPrice}</span>
                  )}
                  <span className="text-base font-black text-red-600">{prod.price}</span>
                </div>
                <button className="bg-slate-900 text-white p-2 rounded-md hover:bg-red-600 transition duration-150">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
