import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-zinc-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        <div className="space-y-4">
          <img 
            src="/logo.jpeg" 
            alt="TCD Marketing Logo" 
            className="h-12 w-auto object-contain rounded-md bg-white p-1"
          />
          <p className="leading-relaxed">
            TCD Marketing is Sri Lanka's premier destination for home solutions, electrics, and furniture. Dedicated to delivering smart solutions and better living.
          </p>
        </div>

        <div>
          <h3 className="text-white font-extrabold text-sm tracking-wide mb-4">PRODUCT DIRECTORY</h3>
          <ul className="space-y-2.5">
            <li><a href="/living-room" className="hover:text-white transition">Living Room Furniture</a></li>
            <li><a href="/bedroom" className="hover:text-white transition">Bedroom Sets & Beds</a></li>
            <li><a href="#" className="hover:text-white transition">Office Chairs & Desks</a></li>
            <li><a href="#" className="hover:text-white transition">Innovex Appliances</a></li>
            <li><a href="#" className="hover:text-white transition">Air Conditioners</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-extrabold text-sm tracking-wide mb-4">CUSTOMER SUPPORT</h3>
          <ul className="space-y-2.5">
            <li><a href="#" className="hover:text-white transition">Warranty Information</a></li>
            <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white transition">Locate Our Showrooms</a></li>
            <li><a href="#" className="hover:text-white transition">Online Order Tracking</a></li>
            <li><a href="#" className="hover:text-white transition">Corporate Inquiry</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-extrabold text-sm tracking-wide mb-2">NEWSLETTER</h3>
          <p className="leading-relaxed">Subscribe to get notify about our latest deals, discount sales, and weekly offers.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter email..." 
              className="bg-slate-800 border border-slate-700 px-3 py-2 rounded-md focus:outline-none focus:border-red-500 w-full text-white" 
            />
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md transition duration-150">
              Join
            </button>
          </div>
        </div>

      </div>

      <div className="bg-slate-950 py-6 border-t border-slate-800 text-center">
        <p className="max-w-7xl mx-auto px-4 text-[10px] text-zinc-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© 2026 TCD Marketing Sri Lanka. All Rights Reserved. Co-designed with Antigravity.</span>
          <span className="flex gap-2">
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[8px] tracking-wide text-zinc-400">VISA</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[8px] tracking-wide text-zinc-400">MASTER</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-[8px] tracking-wide text-zinc-400">AMEX</span>
          </span>
        </p>
      </div>
    </footer>
  );
}
