"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Interactive showcase page to demonstrate all custom animations in real time
export default function AnimationsShowcase() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // States to trigger re-playing the animations in the grid
  const [playFade, setPlayFade] = useState(true);
  const [playSlide, setPlaySlide] = useState(true);
  const [playScale, setPlayScale] = useState(true);

  // Helper to re-trigger animation by resetting state
  function triggerAnimation(setter: React.Dispatch<React.SetStateAction<boolean>>) {
    setter(false);
    setTimeout(() => setter(true), 50);
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      {/* Shared Header */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Page Header */}
        <div className="border-b border-zinc-200 pb-6 mb-12 animate-fade-in">
          <span className="text-xs font-bold text-red-600 tracking-widest uppercase">Style Guide</span>
          <h1 className="text-4xl font-black text-slate-800 mt-2">Animations Showcase</h1>
          <p className="text-slate-600 text-sm mt-2 max-w-2xl leading-relaxed">
            Interactive playground to test and preview all custom motion effects, entrance animations, and micro-interactions built into the TCD Marketing platform.
          </p>
        </div>

        {/* SECTION 1: Core Entrance Animations Demo */}
        <section className="mb-16">
          <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
            <span>✨</span> Core Entrance Effects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fade In Demo Box */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs flex flex-col justify-between h-64">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Fade In Effect</h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                  Gradual opacity fade-in transition used on layouts, banner images, and static page loads.
                </p>
                {playFade && (
                  <div className="w-full bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg text-xs font-bold text-red-600 animate-fade-in">
                    👋 Hello! I just faded in smoothly.
                  </div>
                )}
              </div>
              <button 
                onClick={() => triggerAnimation(setPlayFade)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded-lg self-start transition"
              >
                Replay Animation
              </button>
            </div>

            {/* Slide Up Demo Box */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs flex flex-col justify-between h-64">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Slide Up Effect</h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                  Cubic-bezier curves to slide elements upwards, used for list item grid arrivals.
                </p>
                {playSlide && (
                  <div className="w-full bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg text-xs font-bold text-blue-600 animate-slide-up">
                    🚀 Upwards we go!
                  </div>
                )}
              </div>
              <button 
                onClick={() => triggerAnimation(setPlaySlide)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded-lg self-start transition"
              >
                Replay Animation
              </button>
            </div>

            {/* Scale Up Demo Box */}
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs flex flex-col justify-between h-64">
              <div>
                <h3 className="font-bold text-slate-800 mb-2">Scale Up Effect</h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                  Spring-like scaling bounce effect, perfect for CTA buttons, product cards, and floating badges.
                </p>
                {playScale && (
                  <div className="w-full bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg text-xs font-bold text-green-600 animate-scale-up">
                    💥 Popped up nicely!
                  </div>
                )}
              </div>
              <button 
                onClick={() => triggerAnimation(setPlayScale)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 px-4 rounded-lg self-start transition"
              >
                Replay Animation
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: Hover Micro-interactions Demo */}
        <section className="mb-16">
          <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
            <span>🖱️</span> Hover Micro-interactions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Interactive Lift/Scale Box */}
            <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-xs flex flex-col items-center justify-center text-center group cursor-pointer hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
              <span className="text-5xl group-hover:scale-120 transition-transform duration-300">🛋️</span>
              <h3 className="font-black text-slate-800 mt-4 group-hover:text-red-600 transition-colors">Hover Lift & Scale</h3>
              <p className="text-zinc-500 text-xs max-w-xs mt-2 leading-relaxed">
                Hovering over this box triggers a smooth `-translate-y` lift, custom shadow blur, and scales up the icon.
              </p>
            </div>

            {/* Glowing Ring Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-pointer">
              {/* Animated glow ring behind */}
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 opacity-20 blur-lg group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"></div>
              
              <div className="relative z-10 text-white">
                <span className="text-5xl animate-float inline-block">📺</span>
                <h3 className="font-black mt-4 text-yellow-300">Ambient Glow Loop</h3>
                <p className="text-zinc-400 text-xs max-w-xs mt-2 leading-relaxed">
                  Utilizes a loop float animation while adding a rich, colorful backglow on hover.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Live Component Integration */}
        <section className="mb-12">
          <h2 className="text-xl font-extrabold text-slate-800 mb-6 flex items-center gap-2">
            <span>🛍️</span> Applied to Product Cards
          </h2>
          
          <div className="max-w-sm">
            <ProductCard 
              id={999}
              name="Antoni Premium 3-Seater Sofa (Animations Demo)"
              price="Rs. 145,000"
              oldPrice="Rs. 165,000"
              rating={5}
              imageBg="from-amber-100 to-orange-200"
              badge="Best Seller"
              icon="🛋️"
            />
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
