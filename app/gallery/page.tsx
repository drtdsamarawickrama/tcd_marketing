"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BACKEND_URL } from "@/components/apiConfig";

export default function GalleryPage() {
  // Mobile navigation state matching layout Header
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Gallery items loaded from backend
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/get_gallery.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setGalleryItems(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading gallery:", err);
        setLoading(false);
      });
  }, []);

  // Helper to extract Youtube video ID
  const getYoutubeId = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "";
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      {/* Shared Header component */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* Banner Section - fades in on load */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-950 text-white py-16 px-4 text-center animate-fade-in">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="text-amber-500 text-xs font-black tracking-widest uppercase">
              Design & Inspiration
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Inspiration Gallery</h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Explore our beautiful showroom displays, real-life home layouts, and customized room setups to spark ideas for your living spaces.
            </p>
          </div>
        </section>

        {/* Gallery grid */}
        <section className="max-w-7xl mx-auto px-4 py-12 space-y-10">
          
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-full py-16 text-center text-slate-400 font-semibold flex flex-col items-center justify-center gap-3">
                <span className="w-9 h-9 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></span>
                <span>Loading walkthroughs...</span>
              </div>
            ) : galleryItems.length === 0 ? (
              <div className="col-span-full bg-white border border-zinc-200 rounded-2xl p-12 text-center text-slate-400 font-medium">
                No gallery posts found.
              </div>
            ) : (
              galleryItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white border border-zinc-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col gap-4 animate-scale-up"
                >
                  {/* Title centered at the top */}
                  <h3 className="text-center font-bold text-base md:text-lg text-slate-800 tracking-tight group-hover:text-red-650 transition">
                    {item.title}
                  </h3>

                  {/* Media below title */}
                  {item.type === "video" ? (
                    <div className="aspect-video w-full bg-black rounded-xl overflow-hidden relative shadow-xs">
                      {getYoutubeId(item.youtube_url) ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${getYoutubeId(item.youtube_url)}`}
                          title={item.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500">
                          Invalid Video URL
                        </div>
                      )}
                    </div>
                  ) : (
                    // Render image (either gradient preset or external image url)
                    item.image_path && item.image_path.startsWith("from-") ? (
                      <div className={`aspect-video w-full bg-gradient-to-tr ${item.image_path} rounded-xl flex items-center justify-center p-6 relative overflow-hidden shadow-xs`}>
                        <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        <span className="text-4xl transform group-hover:scale-110 transition duration-300 pointer-events-none drop-shadow-sm">
                          {item.category === "bedroom" && "🛏️"}
                          {item.category === "living" && "🛋️"}
                          {item.category === "dining" && "🍽️"}
                          {item.category === "office" && "💼"}
                          {item.category === "showrooms" && "🏪"}
                        </span>
                      </div>
                    ) : (
                      <div className="aspect-video w-full relative overflow-hidden bg-slate-100 rounded-xl shadow-xs">
                        <img 
                          src={item.image_path || "/logo.jpeg"} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-all duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/logo.jpeg";
                          }}
                        />
                      </div>
                    )
                  )}

                  {/* Description details (optional) */}
                  {item.description && (
                    <p className="text-slate-500 text-xs text-center leading-relaxed px-2">
                      {item.description}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>

        </section>

      </main>

      {/* Shared Footer component */}
      <Footer />
    </div>
  );
}
