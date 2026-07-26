"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/app/home/Hero";
import Categories from "@/app/home/Categories";
import FeaturedProducts from "@/app/home/FeaturedProducts";
import Promos from "@/app/home/Promos";
import TrustFactors from "@/app/home/TrustFactors";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      {/* Shared Header across all page routes */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main className="flex-grow">
        {/* Home specific banner slides */}
        <Hero />
        {/* Home specific category list */}
        <Categories />
        {/* Home specific showcase grid */}
        <FeaturedProducts />
        {/* Home specific promotional grid */}
        <Promos />
        {/* Home specific value badges */}
        <TrustFactors />
      </main>
      
      {/* Shared Footer across all page routes */}
      <Footer />
    </div>
  );
}
