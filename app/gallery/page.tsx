"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Gallery mock data database with tags matching categories
const GALLERY_ITEMS = [
  { id: 1, title: "Modern Luxury Bedroom", category: "bedroom", description: "Solid Teak King Bed & matching Wardrobes in natural wood finish.", gradient: "from-amber-200 to-amber-400" },
  { id: 2, title: "Royal Velvet Living Setup", category: "living", description: "L-shaped high-density foam sofa with polished wooden frame.", gradient: "from-slate-200 to-indigo-300" },
  { id: 3, title: "6-Seater Mahogany Dining", category: "dining", description: "Tempered glass top table with premium cushioned dining chairs.", gradient: "from-orange-200 to-amber-300" },
  { id: 4, title: "Urban Executive Office Suite", category: "office", description: "Ergonomic high-back swivel chairs with modular desk layout.", gradient: "from-slate-300 to-slate-500" },
  { id: 5, title: "Kids Bed & Play Station", category: "bedroom", description: "Vibrant dual-color bunk beds built with environment-safe plastic panels.", gradient: "from-pink-100 to-sky-200" },
  { id: 6, title: "Colombo Flagship Showroom", category: "showrooms", description: "Premium space showcasing our latest imported electronic products.", gradient: "from-red-100 to-amber-200" },
  { id: 7, title: "Minimalist Scandinavian Lounge", category: "living", description: "Fabric upholstery accent armchairs with solid beechwood legs.", gradient: "from-zinc-200 to-stone-400" },
  { id: 8, title: "Kandy Mountain View Showroom", category: "showrooms", description: "Over two floors of bedroom sets, dining layouts, and electrics.", gradient: "from-teal-100 to-emerald-200" },
];

export default function GalleryPage() {
  // Mobile navigation state matching layout Header
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active gallery category tag
  const [activeFilter, setActiveFilter] = useState("all");

  // Filters display items according to active tag selection
  const filteredItems = activeFilter === "all" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      {/* Shared Header component */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* Banner Section - fades in on load */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-950 text-white py-16 px-4 text-center animate-fade-in">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="text-amber-500 text-xs font-black tracking-widest uppercase">
              Design & Inspiration
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Inspiration Gallery</h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Explore our beautiful showroom displays, real-life home layouts, and customized room setups to spark ideas for your living spaces.
            </p>
          </div>
        </section>

        {/* Gallery grid & Filter buttons */}
        <section className="max-w-7xl mx-auto px-4 py-12 space-y-10">
          
          {/* Tab Filter Button Bar - slides up */}
          <div className="flex flex-wrap gap-2 justify-center items-center animate-slide-up">
            {["all", "living", "bedroom", "dining", "office", "showrooms"].map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                  activeFilter === filter 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'bg-zinc-200 text-slate-700 hover:bg-zinc-300'
                }`}
              >
                {filter === "all" ? "View All" : filter}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full animate-scale-up animation-fill-both"
              >
                {/* Visual Gradient Display matching category theme */}
                <div className={`h-48 bg-gradient-to-tr ${item.gradient} flex items-center justify-center p-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <span className="text-4xl transform group-hover:scale-110 transition duration-300 pointer-events-none drop-shadow-sm">
                    {item.category === "bedroom" && "🛏️"}
                    {item.category === "living" && "🛋️"}
                    {item.category === "dining" && "🍽️"}
                    {item.category === "office" && "💼"}
                    {item.category === "showrooms" && "🏪"}
                  </span>
                </div>

                {/* Details layout */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">
                      {item.category}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-tight group-hover:text-red-600 transition">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-100 mt-4 flex items-center justify-between text-[11px] font-bold text-slate-800">
                    <span>Inquire Setup</span>
                    <span className="text-red-600 group-hover:translate-x-1 transition duration-150">→</span>
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
