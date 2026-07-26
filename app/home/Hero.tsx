"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BACKEND_URL } from "@/components/apiConfig";

// TypeScript interface matching the banners DB table columns
interface Banner {
  id: number;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  tag: string | null;
  button_text: string;
  link_url: string | null;
  image: string | null;
  bg_gradient: string;
  sort_order: number;
  is_active: number;
}

// Fallback static slides shown when DB has no banners or API fails
const FALLBACK_SLIDES: Banner[] = [
  {
    id: 1, title: "Luxury Sofa Collection", subtitle: "Up to 20% Off",
    description: "Transform your living room with premium comfort and elegant designs made to last.",
    tag: "LIVING ROOM FURNITURE", button_text: "Shop Sofa Sets", link_url: "/living-room",
    image: null, bg_gradient: "from-rose-600 to-red-700", sort_order: 1, is_active: 1,
  },
  {
    id: 2, title: "Innovex Home Appliances", subtitle: "Smart Living, Best Price",
    description: "Upgrade your home with energy-efficient washing machines, refrigerators, and TVs.",
    tag: "INNOVEX EXCLUSIVES", button_text: "Explore Electronics", link_url: "/electrics",
    image: null, bg_gradient: "from-blue-600 to-indigo-800", sort_order: 2, is_active: 1,
  },
  {
    id: 3, title: "Solid Wood Bedroom Sets", subtitle: "Elegant & Durable",
    description: "Create your dream sanctuary with solid wood beds, large wardrobes, and dressing tables.",
    tag: "BEDROOM FURNITURE", button_text: "View Bedroom Range", link_url: "/bedroom",
    image: null, bg_gradient: "from-amber-700 to-amber-900", sort_order: 3, is_active: 1,
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState<Banner[]>(FALLBACK_SLIDES); // Start with fallbacks

  // Fetch active banners from backend API on mount
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/get_banners.php`)
      .then(res => res.json())
      .then(res => {
        // If API returns valid banners use them, otherwise keep fallbacks
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setSlides(res.data);
        }
      })
      .catch(() => {
        // Silent fail - keep using fallback slides
      });
  }, []);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[280px] sm:h-[400px] md:h-[500px] overflow-hidden bg-slate-900 text-white">
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${
            idx === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Main background is always a rich styled gradient for high contrast readability */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg_gradient}`}></div>

          {/* Slide Content Grid */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full py-6">
            
            {/* Left side text descriptors */}
            <div className="space-y-3 sm:space-y-4">
              {/* Pill tag badge */}
              {slide.tag && (
                <span className="inline-block bg-white/20 text-white px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md">
                  {slide.tag}
                </span>
              )}
              {/* Main title */}
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-none drop-shadow-md">
                {slide.title || "Welcome to TCD Marketing"}
              </h1>
              {/* Yellow subtitle tagline */}
              {slide.subtitle && (
                <p className="text-xl sm:text-2xl font-bold text-yellow-300 drop-shadow-sm">
                  {slide.subtitle}
                </p>
              )}
              {/* Body description text */}
              {slide.description && (
                <p className="text-sm sm:text-base text-zinc-100 max-w-md hidden sm:block leading-relaxed">
                  {slide.description}
                </p>
              )}
              {/* CTA Button - links to configured URL */}
              <div className="pt-2">
                {slide.link_url ? (
                  <Link
                    href={slide.link_url}
                    className="inline-block bg-white text-slate-900 px-6 py-3 text-sm sm:text-base font-black rounded-xl hover:bg-slate-100 shadow-xl hover:shadow-white/10 transform hover:-translate-y-0.5 active:scale-98 transition duration-150"
                  >
                    {slide.button_text}
                  </Link>
                ) : (
                  <button className="bg-white text-slate-900 px-6 py-3 text-sm sm:text-base font-black rounded-xl hover:bg-slate-100 shadow-xl transform hover:-translate-y-0.5 active:scale-98 transition duration-150">
                    {slide.button_text}
                  </button>
                )}
              </div>
            </div>

            {/* Right side - Premium floating product showcase */}
            <div className="hidden md:flex justify-center items-center">
              {slide.image ? (
                // Premium product showcase frame with glow and dramatic shadow
                <div className="relative group">
                  {/* Outer ambient glow ring behind image */}
                  <div className="absolute -inset-3 rounded-[2rem] bg-white/15 blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
                  {/* Bottom dramatic drop shadow layer */}
                  <div className="absolute -bottom-4 left-4 right-4 h-16 bg-black/40 blur-2xl rounded-full"></div>
                  {/* Main image showcase frame */}
                  <div className="relative w-[420px] h-[300px] md:h-[340px] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/20 transform hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500">
                    <img
                      src={slide.image}
                      alt={slide.title || "Banner Image"}
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle shine overlay gliding from top-left to bottom */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </div>
              ) : (
                // Fallback decorative card if banner image is not specified
                <div className="relative group">
                  <div className="absolute -inset-3 rounded-[2rem] bg-white/10 blur-xl opacity-60 group-hover:opacity-90 transition duration-500"></div>
                  <div className="absolute -bottom-4 left-4 right-4 h-12 bg-black/30 blur-2xl rounded-full"></div>
                  <div className="relative w-80 h-80 rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-lg flex flex-col items-center justify-center p-8 text-center shadow-[0_30px_60px_rgba(0,0,0,0.4)] ring-1 ring-white/10 overflow-hidden transform hover:scale-105 hover:-translate-y-1 transition-all duration-500">
                    <div className="w-56 h-56 rounded-full bg-white/15 filter blur-2xl absolute -top-10 -left-10"></div>
                    <span className="text-8xl relative z-10">🛋️</span>
                    <p className="text-white text-sm font-black tracking-widest uppercase mt-5 relative z-10">TCD MARKETING</p>
                    <p className="text-[10px] text-white/50 tracking-wider font-semibold uppercase mt-1 relative z-10">Comfort & Quality Guarantee</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicator dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-150 ${
              idx === activeSlide ? "bg-white w-6" : "bg-white/40 w-2.5"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
