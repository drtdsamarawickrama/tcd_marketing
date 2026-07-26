import React from "react";

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-extrabold text-slate-800 text-center mb-8">
        Browse Popular Categories
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {[
          { icon: "🛋️", name: "Sofa Sets" },
          { icon: "🛏️", name: "Bedroom" },
          { icon: "🍽️", name: "Dining Room" },
          { icon: "💻", name: "Office" },
          { icon: "🧺", name: "Washing Machines" },
          { icon: "📺", name: "TVs & Audio" }
        ].map((cat, index) => (
          <div key={index} className="flex flex-col items-center group cursor-pointer">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-3xl sm:text-4xl shadow-xs group-hover:shadow-md group-hover:border-red-400 group-hover:-translate-y-1 transition duration-200">
              {cat.icon}
            </div>
            <span className="mt-3 text-xs sm:text-sm font-bold text-slate-700 text-center group-hover:text-red-600 transition">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
