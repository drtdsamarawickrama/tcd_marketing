import React from "react";

// Props structure for reusable CategoryHero
interface CategoryHeroProps {
  title: string;
  subtitle: string;
  description: string;
  bgGradient: string; // Tailwind gradient, e.g. "from-amber-800 to-amber-950"
  badgeBg?: string; // Optional custom badge background, e.g. "bg-amber-900/30"
  badgeTextColor?: string; // Optional custom badge text color, e.g. "text-amber-200"
}

export default function CategoryHero({
  title,
  subtitle,
  description,
  bgGradient,
  badgeBg = "bg-black/20",
  badgeTextColor = "text-white/90"
}: CategoryHeroProps) {
  return (
    <section className={`bg-gradient-to-r ${bgGradient} text-white py-16 px-6 shadow-inner`}>
      <div className="max-w-7xl mx-auto space-y-3">
        <span className={`text-xs uppercase font-extrabold tracking-widest ${badgeTextColor} ${badgeBg} px-3 py-1 rounded-full`}>
          {subtitle}
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          {title}
        </h1>
        <p className="max-w-xl text-sm md:text-base text-zinc-100">
          {description}
        </p>
      </div>
    </section>
  );
}
