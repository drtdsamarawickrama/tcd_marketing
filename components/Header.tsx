"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

// Props definition matching index.tsx state
interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();

  // Handle logout - clear auth then redirect to home
  function handleLogout() {
    logout();
    router.push("/");
  }
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
            {/* LOGIN / USER Button - dynamic based on auth state */}
            {isLoggedIn ? (
              // Logged in: show username + logout button
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">
                  👤 {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs font-black tracking-wide uppercase text-red-600 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Logged out: show Login link
              <Link href="/login" className="flex items-center gap-2 text-slate-800 hover:text-red-600 transition group">
                <div className="border border-zinc-200 p-1.5 rounded-full group-hover:border-red-500 transition">
                  <svg className="w-5 h-5 text-slate-600 group-hover:text-red-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-xs font-black tracking-wide uppercase text-slate-900 group-hover:text-red-600">LOGIN</span>
              </Link>
            )}

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
            <CartButtonLink user={user} />
          </div>

        </div>

        {/* Categories secondary navbar - Linked dynamically to app route folders */}
        <nav className={`relative bg-zinc-50 border-t border-b border-zinc-200 ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          <div className="max-w-7xl mx-auto">
            <ul className="flex flex-col md:flex-row md:items-center text-sm font-medium text-slate-800">
              <li className="px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/" className="block">Home</a>
              </li>
              <li className="group px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/living-room" className="block">Living Room</a>
                
                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-0 right-0 w-full bg-white border-b border-zinc-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-slate-700">
                  <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8 text-left font-normal">
                    
                    {/* Column 1: Seating */}
                    <div className="col-span-3">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3">Seating</h4>
                      <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-500">
                        <li><a href="/living-room?sub=sofa-sets" className="hover:text-red-600 transition">Sofa Sets</a></li>
                        <li><a href="/living-room?sub=corner-sofa" className="hover:text-red-600 transition">Corner + Chaise Sofa</a></li>
                        <li><a href="/living-room?sub=recliner-sofa" className="hover:text-red-600 transition">Recliner Sofa</a></li>
                        <li><a href="/living-room?sub=single-seaters" className="hover:text-red-600 transition">Single Seaters</a></li>
                        <li><a href="/living-room?sub=ottoman" className="hover:text-red-600 transition">Ottoman</a></li>
                        <li><a href="/living-room?sub=sofa-beds" className="hover:text-red-600 transition">Sofa Beds</a></li>
                        <li><a href="/living-room?sub=wooden-sofa" className="hover:text-red-600 transition">Wooden Sofa</a></li>
                      </ul>
                    </div>

                    {/* Column 2: Coffee Tables, TV Stands & Rugs */}
                    <div className="col-span-4 pl-4 border-l border-zinc-100">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3">Coffee Tables, TV Stands & Rugs</h4>
                      <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-500">
                        <li><a href="/living-room?sub=coffee-tables" className="hover:text-red-600 transition">Coffee Tables & Side Tables</a></li>
                        <li><a href="/living-room?sub=tv-stands" className="hover:text-red-600 transition">TV Stands & Wall Units</a></li>
                        <li><a href="/living-room?sub=cabinets" className="hover:text-red-600 transition">Display cabinets & Sideboards</a></li>
                        <li><a href="/living-room?sub=shelves" className="hover:text-red-600 transition">Wall Shelves & Display Stands</a></li>
                        <li><a href="/living-room?sub=rugs" className="hover:text-red-600 transition">Rugs</a></li>
                      </ul>
                    </div>

                    {/* Column 3: Promo Image */}
                    <div className="col-span-5 relative h-52 rounded-lg overflow-hidden group/img shadow-inner">
                      <img 
                        src="/living-room-menu.png" 
                        alt="Living Room Promo" 
                        className="w-full h-full object-cover group-hover/img:scale-102 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end">
                        <span className="text-[10px] font-black tracking-widest text-lime-400 uppercase">EXCLUSIVE DEAL</span>
                        <h5 className="text-white text-base font-black uppercase mt-1 leading-tight">Miami Sofa Package Deals</h5>
                        <p className="text-zinc-300 text-[10px] mt-1 leading-snug">Upgrade your living space with luxury sofa designs, center tables, and consoles.</p>
                      </div>
                    </div>

                  </div>
                </div>
              </li>
              <li className="group px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/bedroom" className="block">Bedroom</a>
                
                {/* Bedroom Mega Menu Dropdown */}
                <div className="absolute top-full left-0 right-0 w-full bg-white border-b border-zinc-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-slate-700">
                  <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8 text-left font-normal">
                    
                    {/* Column 1: Bedroom Furniture */}
                    <div className="col-span-3">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3">Bedroom Furniture</h4>
                      <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-500">
                        <li><a href="/bedroom?sub=bedroom-suites" className="hover:text-red-600 transition">Bedroom Suites</a></li>
                        <li><a href="/bedroom?sub=beds" className="hover:text-red-600 transition">Beds</a></li>
                        <li><a href="/bedroom?sub=upholstered-beds" className="hover:text-red-600 transition">Upholstered Beds</a></li>
                        <li><a href="/bedroom?sub=bedside-cupboards" className="hover:text-red-600 transition">Bedside Cupboards & Bench</a></li>
                        <li><a href="/bedroom?sub=wardrobes" className="hover:text-red-600 transition">Wardrobes</a></li>
                        <li><a href="/bedroom?sub=modular-wardrobe" className="hover:text-red-600 transition">Modular Wardrobe</a></li>
                        <li><a href="/bedroom?sub=dressing-tables" className="hover:text-red-600 transition">Dressing Tables</a></li>
                        <li><a href="/bedroom?sub=clothes-racks" className="hover:text-red-600 transition">Clothes Racks</a></li>
                        <li><a href="/bedroom?sub=shoe-racks" className="hover:text-red-600 transition">Shoe Racks & Storage</a></li>
                        <li><a href="/bedroom?sub=iron-tables" className="hover:text-red-600 transition">Iron Tables</a></li>
                      </ul>
                    </div>

                    {/* Column 2: Mattress, Pillows & Bedsheet */}
                    <div className="col-span-4 pl-4 border-l border-zinc-100">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3">Mattress, Pillows & Bedsheet</h4>
                      <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-500">
                        <li><a href="/bedroom?sub=spring-mattresses" className="hover:text-red-600 transition">Spring Mattresses</a></li>
                        <li><a href="/bedroom?sub=foam-mattresses" className="hover:text-red-600 transition">Foam Mattresses</a></li>
                        <li><a href="/bedroom?sub=pillows-protectors" className="hover:text-red-600 transition">Pillows & Mattress Protectors</a></li>
                      </ul>
                    </div>

                    {/* Column 3: Promo Image */}
                    <div className="col-span-5 relative h-52 rounded-lg overflow-hidden group/img shadow-inner">
                      <img 
                        src="/bedroom-menu.png" 
                        alt="Bedroom Promo" 
                        className="w-full h-full object-cover group-hover/img:scale-102 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end">
                        <span className="text-[10px] font-black tracking-widest text-lime-400 uppercase">HOT DEALS</span>
                        <h5 className="text-white text-base font-black uppercase mt-1 leading-tight">Luxury Bedroom Suites</h5>
                        <p className="text-zinc-300 text-[10px] mt-1 leading-snug">Get the ultimate rest with premium wooden bed frames, dressers, and ortho mattresses.</p>
                      </div>
                    </div>

                  </div>
                </div>
              </li>
              <li className="group px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/dining" className="block">Dining</a>
                
                {/* Dining Mega Menu Dropdown */}
                <div className="absolute top-full left-0 right-0 w-full bg-white border-b border-zinc-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-slate-700">
                  <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8 text-left font-normal">
                    
                    {/* Column 1: Wooden Finish */}
                    <div className="col-span-3">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3">Wooden Finish</h4>
                      <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-500">
                        <li><a href="/dining?sub=wooden-sets" className="hover:text-red-600 transition">Wooden Dining Sets</a></li>
                        <li><a href="/dining?sub=wooden-chairs" className="hover:text-red-600 transition">Wooden Dining Chairs</a></li>
                        <li><a href="/dining?sub=pantry-cupboards" className="hover:text-red-600 transition">Pantry Cupboards</a></li>
                        <li><a href="/dining?sub=dining-cabinets" className="hover:text-red-600 transition">Cabinets & Sideboards</a></li>
                      </ul>
                    </div>

                    {/* Column 2: Metal Finish */}
                    <div className="col-span-4 pl-4 border-l border-zinc-100">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3">Metal Finish</h4>
                      <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-500">
                        <li><a href="/dining?sub=metal-sets" className="hover:text-red-600 transition">Metal Dining Sets</a></li>
                        <li><a href="/dining?sub=metal-chairs" className="hover:text-red-600 transition">Metal Dining Chairs</a></li>
                      </ul>
                    </div>

                    {/* Column 3: Promo Image */}
                    <div className="col-span-5 relative h-52 rounded-lg overflow-hidden group/img shadow-inner">
                      <img 
                        src="/dining-menu.png" 
                        alt="Dining Promo" 
                        className="w-full h-full object-cover group-hover/img:scale-102 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end">
                        <span className="text-[10px] font-black tracking-widest text-lime-400 uppercase">ELEGANT LIVING</span>
                        <h5 className="text-white text-base font-black uppercase mt-1 leading-tight">Mahogany Dining Sets</h5>
                        <p className="text-zinc-300 text-[10px] mt-1 leading-snug">Bring the family together around exquisite wooden dining tables and matching chairs.</p>
                      </div>
                    </div>

                  </div>
                </div>
              </li>
              <li className="group px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/office-furniture" className="block">Office Furniture</a>
                
                {/* Office Furniture Mega Menu Dropdown */}
                <div className="absolute top-full left-0 right-0 w-full bg-white border-b border-zinc-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-slate-700">
                  <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8 text-left font-normal">
                    
                    {/* Column 1: Tables, Cupboards & Racks */}
                    <div className="col-span-3">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3">Tables, Cupboards & Racks</h4>
                      <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-500">
                        <li><a href="/office-furniture?sub=office-tables" className="hover:text-red-600 transition">Office Tables</a></li>
                        <li><a href="/office-furniture?sub=executive-tables" className="hover:text-red-600 transition">Executive Tables</a></li>
                        <li><a href="/office-furniture?sub=conference-tables" className="hover:text-red-600 transition">Conference & Discussion Tables</a></li>
                        <li><a href="/office-furniture?sub=cupboards-racks" className="hover:text-red-600 transition">Cupboards & Racks</a></li>
                        <li><a href="/office-furniture?sub=steel-furniture" className="hover:text-red-600 transition">Steel Furniture</a></li>
                        <li><a href="/office-furniture?sub=study-desks" className="hover:text-red-600 transition">Study Desks & Computer Tables</a></li>
                        <li><a href="/office-furniture?sub=workstations" className="hover:text-red-600 transition">Workstations</a></li>
                        <li><a href="/office-furniture?sub=reception-counters" className="hover:text-red-600 transition">Reception Counters</a></li>
                      </ul>
                    </div>

                    {/* Column 2: Seating */}
                    <div className="col-span-3 pl-4 border-l border-zinc-100">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3">Seating</h4>
                      <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-500">
                        <li><a href="/office-furniture?sub=chairs-series" className="hover:text-red-600 transition">Office Chairs By Series</a></li>
                        <li><a href="/office-furniture?sub=chairs-models" className="hover:text-red-600 transition">All Office Chair Models</a></li>
                        <li><a href="/office-furniture?sub=lobby-seaters" className="hover:text-red-600 transition">Lobby Seaters</a></li>
                        <li><a href="/office-furniture?sub=waiting-chairs" className="hover:text-red-600 transition">Waiting Chairs</a></li>
                      </ul>
                    </div>

                    {/* Column 3: Secure Storages & Safes */}
                    <div className="col-span-2 pl-4 border-l border-zinc-100">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3">Secure Storage</h4>
                      <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-500">
                        <li><a href="/office-furniture?sub=safes-doors" className="hover:text-red-600 transition">Safes & Fire Resistant Doors</a></li>
                        <li><a href="/office-furniture?sub=lockers-safes" className="hover:text-red-600 transition">Safety Lockers & Strong Box</a></li>
                      </ul>
                    </div>

                    {/* Column 4: Promo Image */}
                    <div className="col-span-4 relative h-56 rounded-lg overflow-hidden group/img shadow-inner">
                      <img 
                        src="/office-menu.png" 
                        alt="Office Promo" 
                        className="w-full h-full object-cover group-hover/img:scale-102 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end">
                        <span className="text-[10px] font-black tracking-widest text-lime-400 uppercase">PROFESSIONAL WORKSPACE</span>
                        <h5 className="text-white text-base font-black uppercase mt-1 leading-tight">Executive Series Furniture</h5>
                        <p className="text-zinc-300 text-[10px] mt-1 leading-snug">Design a high-productivity workspace with ergonomic chairs, wood tables, and secure vaults.</p>
                      </div>
                    </div>

                  </div>
                </div>
              </li>
              <li className="group px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/plastic-products" className="block">Plastic Products</a>
                
                {/* Plastic Products Mega Menu Dropdown */}
                <div className="absolute top-full left-0 right-0 w-full bg-white border-b border-zinc-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-slate-700">
                  <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8 text-left font-normal">
                    
                    {/* Column 1: Plastic Products Categories */}
                    <div className="col-span-4">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3">Plastic Products</h4>
                      <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-500">
                        <li><a href="/plastic-products?sub=plastic-chairs" className="hover:text-red-600 transition">Plastic Chairs</a></li>
                        <li><a href="/plastic-products?sub=plastic-tables" className="hover:text-red-600 transition">Plastic Tables</a></li>
                        <li><a href="/plastic-products?sub=plastic-cupboards" className="hover:text-red-600 transition">Plastic Cupboards</a></li>
                        <li><a href="/plastic-products?sub=household" className="hover:text-red-600 transition">Household</a></li>
                        <li><a href="/plastic-products?sub=pvc-doors" className="hover:text-red-600 transition">PVC Doors & Frames</a></li>
                      </ul>
                    </div>

                    {/* Column 2: Promo Image */}
                    <div className="col-span-8 relative h-56 rounded-lg overflow-hidden group/img shadow-inner">
                      <img 
                        src="/plastic-menu.png" 
                        alt="Plastic Promo" 
                        className="w-full h-full object-cover group-hover/img:scale-102 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end">
                        <span className="text-[10px] font-black tracking-widest text-lime-400 uppercase">DURABLE & STYLISH</span>
                        <h5 className="text-white text-base font-black uppercase mt-1 leading-tight">Modern Plastic Solutions</h5>
                        <p className="text-zinc-300 text-[10px] mt-1 leading-snug">Explore lightweight, robust, and colorful furniture for indoor, outdoor, and kitchen needs.</p>
                      </div>
                    </div>

                  </div>
                </div>
              </li>
              <li className="group px-4 py-3 hover:bg-zinc-100 hover:text-red-600 transition duration-150">
                <a href="/electrics" className="block">Electrics</a>
                
                {/* Electrics Mega Menu Dropdown */}
                <div className="absolute top-full left-0 right-0 w-full bg-white border-b border-zinc-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-slate-700">
                  <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8 text-left font-normal">
                    
                    {/* Column 1: Kitchen Appliances */}
                    <div className="col-span-3">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3">Kitchen Appliances</h4>
                      <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-500">
                        <li><a href="/electrics?sub=kitchen-ovens" className="hover:text-red-600 transition">Ovens & Microwaves</a></li>
                        <li><a href="/electrics?sub=kitchen-blenders" className="hover:text-red-600 transition">Blenders & Grinders</a></li>
                        <li><a href="/electrics?sub=kitchen-cookers" className="hover:text-red-600 transition">Rice Cookers & Kettles</a></li>
                        <li><a href="/electrics?sub=kitchen-stoves" className="hover:text-red-600 transition">Gas Stoves & Hobs</a></li>
                      </ul>
                    </div>

                    {/* Column 2: Home Appliances */}
                    <div className="col-span-3 pl-4 border-l border-zinc-100">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3">Home Appliances</h4>
                      <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-500">
                        <li><a href="/electrics?sub=home-fridges" className="hover:text-red-600 transition">Refrigerators</a></li>
                        <li><a href="/electrics?sub=home-washers" className="hover:text-red-600 transition">Washing Machines</a></li>
                        <li><a href="/electrics?sub=home-coolers" className="hover:text-red-600 transition">Air Conditioners & Fans</a></li>
                      </ul>
                    </div>

                    {/* Column 3: Audio & Video */}
                    <div className="col-span-2 pl-4 border-l border-zinc-100">
                      <h4 className="font-black text-xs text-slate-900 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-3">Audio & Video</h4>
                      <ul className="flex flex-col gap-2.5 text-xs font-medium text-slate-500">
                        <li><a href="/electrics?sub=av-tvs" className="hover:text-red-600 transition">Televisions</a></li>
                        <li><a href="/electrics?sub=av-audio" className="hover:text-red-600 transition">Home Theatre & Speakers</a></li>
                      </ul>
                    </div>

                    {/* Column 4: Promo Image */}
                    <div className="col-span-4 relative h-56 rounded-lg overflow-hidden group/img shadow-inner">
                      <img 
                        src="/electrics-menu.png" 
                        alt="Electrics Promo" 
                        className="w-full h-full object-cover group-hover/img:scale-102 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end">
                        <span className="text-[10px] font-black tracking-widest text-lime-400 uppercase">SMART HOME</span>
                        <h5 className="text-white text-base font-black uppercase mt-1 leading-tight">Home & Kitchen Appliances</h5>
                        <p className="text-zinc-300 text-[10px] mt-1 leading-snug">Bring convenience to your home with multi-door fridges, washing machines, and Android smart TVs.</p>
                      </div>
                    </div>

                  </div>
                </div>
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

// Sub-component to prevent full header re-renders on cart count state changes
function CartButtonLink({ user }: { user: any }) {
  const { useCart } = require("./useCart");
  const { cartCount, cartTotal } = useCart(user?.id ?? null);
  
  return (
    <Link href="/cart" className="flex items-center gap-3 text-slate-800 hover:text-red-600 transition group">
      <div className="relative border border-zinc-200 p-1.5 rounded-full group-hover:border-red-500 transition">
        <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-black rounded-xs px-1 py-0.5 min-w-[15px] h-3.5 flex items-center justify-center animate-pulse">
          {cartCount}
        </span>
        <svg className="w-5 h-5 text-teal-600 group-hover:text-red-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      
      <div className="flex flex-col text-left">
        <span className="text-[9px] font-bold text-slate-400 uppercase leading-none">CART</span>
        <span className="text-xs font-black text-slate-900 mt-1 leading-none">
          Rs. {cartTotal.toLocaleString("en-LK")}
        </span>
      </div>
    </Link>
  );
}
