"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// About Us Page component for TCD Marketing
export default function AboutUsPage() {
  // Local state to manage the mobile menu open/close behavior in the Header
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      {/* 1. Header component shared across pages */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* 2. Main Content Area */}
      <main className="flex-grow">
        
        {/* Banner section with a rich dark gradient and description */}
        <section className="bg-gradient-to-r from-slate-800 to-slate-950 text-white py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="text-red-500 text-xs font-black tracking-widest uppercase">
              Establishment & Growth
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">About TCD Marketing</h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Sri Lanka's leading marketing partner for premium home furniture, electric appliances, and complete lifestyle solutions.
            </p>
          </div>
        </section>

        {/* Brand identity overview section */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-red-50 text-red-600 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Our Journey
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
              Shaping Better Living for Sri Lankan Homes
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              TCD Marketing stands at the forefront of the retail and corporate furniture and appliance space. Building upon decades of market trust, we represent a legacy of quality, durability, and contemporary styling. 
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              From sophisticated living room sets and ergonomic bedroom suites to reliable home electric appliances under global brand standards, we offer a comprehensive showroom network and a robust online channel designed to exceed modern expectations.
            </p>
          </div>
          
          {/* Custom graphic card matching the theme */}
          <div className="bg-gradient-to-tr from-red-600 to-amber-500 p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between min-h-[300px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl transform translate-x-12 -translate-y-12 group-hover:scale-110 transition duration-300"></div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Our Vision</span>
              <p className="text-xl md:text-2xl font-bold mt-4 leading-normal">
                "To be the premier lifestyle provider in Sri Lanka, enriching homes with affordable, high-quality, and modern solutions."
              </p>
            </div>
            <div className="pt-6 border-t border-white/20 mt-6 flex justify-between items-center">
              <span className="text-xs font-extrabold tracking-wider uppercase">TCD Marketing</span>
              <span className="text-3xl">🏠</span>
            </div>
          </div>
        </section>

        {/* Mission and Values Section */}
        <section className="bg-zinc-100 py-16 px-4 border-t border-b border-zinc-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">What Drives Us Forward</h2>
              <p className="text-slate-500 text-xs md:text-sm mt-2">
                Our operations are guided by core promises to deliver outstanding customer care and top-tier product quality.
              </p>
            </div>

            {/* Core Pillars grid with hover micro-animations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Quality Assurance */}
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center text-xl font-bold mb-4">🛡️</div>
                <h3 className="font-extrabold text-slate-900 text-sm mb-2">Quality Assurance</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  We handpick and test every single item, ensuring wood durability and strict electrical compliance parameters.
                </p>
              </div>

              {/* Card 2: Customer Satisfaction */}
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200">
                <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center text-xl font-bold mb-4">🤝</div>
                <h3 className="font-extrabold text-slate-900 text-sm mb-2">Customer Care</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Our friendly showroom personnel and active call support line are always ready to assist you.
                </p>
              </div>

              {/* Card 3: Islandwide Network */}
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl font-bold mb-4">🚚</div>
                <h3 className="font-extrabold text-slate-900 text-sm mb-2">Safe Delivery</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Direct dispatch systems that deliver purchases intact to your doorstep in any district of Sri Lanka.
                </p>
              </div>

              {/* Card 4: Affordable Pricing */}
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-200">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-xl font-bold mb-4">💎</div>
                <h3 className="font-extrabold text-slate-900 text-sm mb-2">Affordable Luxury</h3>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Bringing top-tier furniture and smart solutions to homes without exceeding standard household budgets.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Milestones timeline section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Key Milestones</h2>
            <p className="text-slate-500 text-xs md:text-sm mt-2">
              A quick review of how we have evolved to serve you better over the years.
            </p>
          </div>

          {/* Timeline UI layout */}
          <div className="relative border-l-2 border-zinc-200 max-w-3xl mx-auto pl-6 md:pl-8 space-y-10 py-2">
            
            {/* Timeline item 1 */}
            <div className="relative">
              <span className="absolute -left-[35px] md:-left-[43px] top-1.5 bg-red-600 w-4 h-4 rounded-full border-4 border-white shadow-sm"></span>
              <span className="text-xs font-black text-red-600 uppercase tracking-widest">2018</span>
              <h3 className="font-extrabold text-slate-950 text-sm mt-1">Inception & Showroom Setup</h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                TCD Marketing launched its first operations, focusing on custom furniture distribution and regional supply management.
              </p>
            </div>

            {/* Timeline item 2 */}
            <div className="relative">
              <span className="absolute -left-[35px] md:-left-[43px] top-1.5 bg-zinc-300 w-4 h-4 rounded-full border-4 border-white shadow-sm"></span>
              <span className="text-xs font-black text-zinc-600 uppercase tracking-widest">2021</span>
              <h3 className="font-extrabold text-slate-950 text-sm mt-1">Electronics & Appliances Expansion</h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Partnered with global standards to deliver high-quality smart TVs, washing machines, and refrigerator products.
              </p>
            </div>

            {/* Timeline item 3 */}
            <div className="relative">
              <span className="absolute -left-[35px] md:-left-[43px] top-1.5 bg-zinc-300 w-4 h-4 rounded-full border-4 border-white shadow-sm"></span>
              <span className="text-xs font-black text-zinc-600 uppercase tracking-widest">2025</span>
              <h3 className="font-extrabold text-slate-950 text-sm mt-1">E-Commerce & Digital Showrooms</h3>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                Rolled out safe online shopping, island-wide ordering tracking, and custom inquiry portals for all users.
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* 3. Footer component shared across pages */}
      <Footer />
    </div>
  );
}
