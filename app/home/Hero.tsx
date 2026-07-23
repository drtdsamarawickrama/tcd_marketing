"use client";

import React, { useState, useEffect } from "react";

const HERO_SLIDES = [
  {
    id: 1,
    title: "Luxury Sofa Collection",
    subtitle: "Up to 20% Off",
    description: "Transform your living room with premium comfort and elegant designs made to last.",
    bgGradient: "from-rose-600 to-red-700",
    buttonText: "Shop Sofa Sets",
    tag: "LIVING ROOM FURNITURE",
  },
  {
    id: 2,
    title: "Innovex Home Appliances",
    subtitle: "Smart Living, Best Price",
    description: "Upgrade your home with energy-efficient washing machines, refrigerators, and TVs.",
    bgGradient: "from-blue-600 to-indigo-800",
    buttonText: "Explore Electronics",
    tag: "INNOVEX EXCLUSIVES",
  },
  {
    id: 3,
    title: "Solid Wood Bedroom Sets",
    subtitle: "Elegant & Durable",
    description: "Create your dream sanctuary with solid wood beds, large wardrobes, and dressing tables.",
    bgGradient: "from-amber-700 to-amber-900",
    buttonText: "View Bedroom Range",
    tag: "BEDROOM FURNITURE",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[280px] sm:h-[400px] md:h-[500px] overflow-hidden bg-slate-900 text-white">
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} transition-opacity duration-1000 flex items-center ${
            idx === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3 sm:space-y-4">
              <span className="inline-block bg-white/20 text-white px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md">
                {slide.tag}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none">
                {slide.title}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-yellow-300">
                {slide.subtitle}
              </p>
              <p className="text-sm sm:text-base text-zinc-100 max-w-md hidden sm:block">
                {slide.description}
              </p>
              <button className="bg-white text-slate-900 px-6 py-2.5 text-sm sm:text-base font-bold rounded-lg hover:bg-slate-100 shadow-lg transform hover:-translate-y-0.5 transition duration-150">
                {slide.buttonText}
              </button>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="w-80 h-80 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg flex flex-col items-center justify-center p-8 text-center relative shadow-2xl overflow-hidden">
                <div className="w-48 h-48 rounded-full bg-white/25 filter blur-2xl absolute -top-12 -left-12"></div>
                <span className="text-7xl">🛋️</span>
                <p className="text-white text-sm font-semibold tracking-wider uppercase mt-4">TCD MARKETING PREMIUM</p>
                <p className="text-xs text-white/70">Verified Comfort & Quality Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-150 ${
              idx === activeSlide ? "bg-white w-6" : "bg-white/40"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
