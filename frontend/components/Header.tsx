"use client";

import React from "react";

// Props definition matching index.tsx state
interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  return (
    <>
      {/* 1. TOP LITTLE NOTIFICATION BAR - Styled Light Gray with Centered Links */}
      <div className="bg-zinc-100 border-b border-zinc-200 text-slate-600 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex gap-4 items-center font-normal">
            <span>📞 Call Center: +94 11 7 654 654</span>
            <span className="hidden md:inline text-zinc-300">|</span>
            <span className="hidden md:inline">🕒 Hours: 9.00 AM - 6.00 PM</span>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3 items-center text-[11px] font-medium text-slate-700">
            <a href="/about-us" className="hover:text-red-600 transition">About Us</a>
            <span className="text-zinc-300">|</span>
            <a href="/corporate-inquiry" className="hover:text-red-600 transition">Corporate Inquiry</a>
            <span className="text-zinc-300">|</span>
            <a href="/gallery" className="hover:text-red-600 transition">Gallery</a>
            <span className="text-zinc-300">|</span>
            <a href="/contact-us" className="hover:text-red-600 transition">Contact Us</a>
            <span className="text-zinc-300">|</span>
            <div className="flex gap-1.5 ml-1">
              <span className="font-semibold text-red-600 cursor-pointer">EN</span>
              <span className="text-slate-400 hover:text-red-600 cursor-pointer">සිං</span>
              <span className="text-slate-400 hover:text-red-600 cursor-pointer">தமிழ்</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER & NAVIGATION */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Logo image loading custom logo.jpeg from public directory */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <a href="/" className="flex items-center">
              <img 
                src="/logo.jpeg" 
                alt="TCD Marketing Logo" 
                className="h-14 w-auto object-contain rounded-md hover:scale-102 transition duration-200"
              />
            </a>
            <div className="hidden lg:flex flex-col border-l border-zinc-200 pl-4">
              <span className="text-[10px] font-black tracking-widest text-slate-800">HOME SOLUTIONS | ELECTRICS | FURNITURE</span>
              <span className="text-[8px] font-extrabold tracking-wider text-red-600 mt-0.5 uppercase">Smart Solutions, Better Living</span>
            </div>
            {/* Mobile menu hamburger toggle button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-800 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Search bar input container */}
          <div className="w-full md:max-w-xl relative">
            <input 
              type="text" 
              placeholder="Search for furniture, sofas, washing machines, TVs..."
              className="w-full pl-4 pr-12 py-2.5 bg-zinc-100 border border-transparent rounded-full focus:outline-none focus:bg-white focus:border-red-500 transition duration-150 text-sm shadow-inner"
            />
            <div className="absolute right-4 top-2.5 text-slate-500 hover:text-red-600 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Navigation Profile, Wishlist, Cart links - Custom layout matching TCD / Damro */}
          <div className="hidden md:flex items-center gap-6">
            {/* LOGIN Button */}
            <a href="#" className="flex items-center gap-2 text-slate-800 hover:text-red-600 transition group">
              <div className="border border-zinc-200 p-1.5 rounded-full group-hover:border-red-500 transition">
                <svg className="w-5 h-5 text-slate-600 group-hover:text-red-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-xs font-black tracking-wide uppercase text-slate-900 group-hover:text-red-600">LOGIN</span>
            </a>

            {/* WISHLIST Button */}
            <a href="#" className="flex items-center gap-2 text-slate-800 hover:text-red-600 transition group">
              <div className="border border-zinc-200 p-1.5 rounded-full group-hover:border-red-500 transition">
                <svg className="w-5 h-5 text-slate-600 group-hover:text-red-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-xs font-black tracking-wide uppercase text-slate-900 group-hover:text-red-600">WISHLIST</span>
            </a>

            {/* CART Button */}
            <a href="#" className="flex items-center gap-3 text-slate-800 hover:text-red-600 transition group">
              <div className="relative border border-zinc-200 p-1.5 rounded-full group-hover:border-red-500 transition">
                <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-black rounded-xs px-1 py-0.5 min-w-[15px] h-3.5 flex items-center justify-center">
                  0
                </span>
                <svg className="w-5 h-5 text-teal-600 group-hover:text-red-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold text-slate-400 uppercase leading-none">CART</span>
                <span className="text-xs font-black text-slate-900 mt-1 leading-none">Rs. 0.00</span>
              </div>
            </a>
          </div>

        </div>

        {/* Categories secondary navbar - Linked dynamically to app route folders */}
        <nav className={`bg-zinc-50 border-t border-b border-zinc-200 ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          <div className="max-w-7xl mx-auto">
            <ul className="flex flex-col md:flex-row md:items-center text-sm font-medium text-slate-800">
              <li className="px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/" className="block">Home</a>
              </li>
              <li className="px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/living-room" className="block">Living Room</a>
              </li>
              <li className="px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/bedroom" className="block">Bedroom</a>
              </li>
              <li className="px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/dining" className="block">Dining</a>
              </li>
              <li className="px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/office-furniture" className="block">Office Furniture</a>
              </li>
              <li className="px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/plastic-products" className="block">Plastic Products</a>
              </li>
              <li className="px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/electrics" className="block">Electrics</a>
              </li>
              {/* Highlighted item matching image */}
              <li className="bg-[#b5d614] px-6 py-3 text-slate-950 font-bold hover:bg-[#a4c212] transition duration-150">
                <a href="/budget-items" className="block">Budget Items</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
