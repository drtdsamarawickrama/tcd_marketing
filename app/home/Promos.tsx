import React from "react";

export default function Promos() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xs hover:shadow-md transition duration-200">
          <div className="relative z-10 max-w-sm space-y-3">
            <span className="bg-blue-500/30 text-blue-200 px-3 py-0.5 rounded-full text-xs font-bold uppercase">Innovex Special</span>
            <h3 className="text-2xl font-black">Washing Machines & Fridges</h3>
            <p className="text-xs text-zinc-200">Get up to 25% discount with official 5-year TCD Marketing warranties and free installation support.</p>
            <button className="bg-yellow-400 text-slate-900 font-extrabold text-xs px-5 py-2.5 rounded-md hover:bg-yellow-300 shadow-md">
              Browse Range
            </button>
          </div>
          <div className="absolute right-4 bottom-4 text-8xl opacity-10">🧺</div>
        </div>

        <div className="bg-gradient-to-r from-amber-700 to-stone-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xs hover:shadow-md transition duration-200">
          <div className="relative z-10 max-w-sm space-y-3">
            <span className="bg-amber-500/30 text-amber-200 px-3 py-0.5 rounded-full text-xs font-bold uppercase">Luxury Living</span>
            <h3 className="text-2xl font-black">Modern Sofa Package Deals</h3>
            <p className="text-xs text-zinc-200">Upgrade your whole house with our matched living sets. Easy monthly installments available.</p>
            <button className="bg-white text-slate-800 font-extrabold text-xs px-5 py-2.5 rounded-md hover:bg-slate-100 shadow-md">
              View Packages
            </button>
          </div>
          <div className="absolute right-4 bottom-4 text-8xl opacity-10">🛋️</div>
        </div>

      </div>
    </section>
  );
}
