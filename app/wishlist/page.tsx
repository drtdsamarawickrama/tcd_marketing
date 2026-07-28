"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/useAuth";
import { useWishlist } from "@/components/useWishlist";
import { useCart } from "@/components/useCart";

export default function WishlistPage() {
  const { user, isLoggedIn } = useAuth();
  const { wishlistItems, wishlistCount, toggleWishlist } = useWishlist(user?.id ?? null);
  const { addToCart, isInCart } = useCart(user?.id ?? null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // Clean light themed layout matching general site theme
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      {/* Navigation Header */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="flex-grow max-w-5xl mx-auto px-4 py-10 w-full">

        {/* Page title and summary */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Wishlist</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {wishlistCount > 0 ? `${wishlistCount} item${wishlistCount > 1 ? "s" : ""} you have saved` : "Your wishlist is empty"}
          </p>
        </div>

        {/* Guest user notice */}
        {!isLoggedIn && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 flex items-start gap-4">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="font-bold text-amber-800 text-sm">Guest Wishlist</p>
              <p className="text-amber-700 text-xs mt-1">
                Your wishlist is saved locally.{" "}
                <Link href="/login" className="text-red-600 font-bold underline">Login</Link>{" "}
                or{" "}
                <Link href="/signup" className="text-red-600 font-bold underline">Create Account</Link>{" "}
                to sync across your devices.
              </p>
            </div>
          </div>
        )}

        {/* Empty Wishlist State */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
            <span className="text-6xl block mb-4">❤️</span>
            <h2 className="text-xl font-extrabold text-slate-800 mb-2">Your wishlist is empty</h2>
            <p className="text-slate-500 text-sm mb-6">Explore our catalog and click the heart icon on items you like!</p>
            <Link
              href="/"
              className="inline-block bg-red-600 text-white font-extrabold text-sm px-8 py-3 rounded-xl hover:bg-red-700 transition shadow-md"
            >
              Browse Collections
            </Link>
          </div>
        ) : (
          /* Wishlist Items Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map(item => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition">
                <div>
                  {/* Image / Emoji display area */}
                  <Link href={`/product/${item.id}`} className="block relative h-48 bg-slate-50 flex items-center justify-center border-b border-slate-100 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-102 transition duration-200"
                      />
                    ) : (
                      <span className="text-5xl">{item.icon}</span>
                    )}

                    {/* Quick remove button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(item);
                      }}
                      className="absolute top-3 right-3 bg-white hover:bg-red-50 text-red-600 border border-slate-200 hover:border-red-200 p-2 rounded-full shadow-xs transition"
                      title="Remove from Wishlist"
                    >
                      <svg className="w-4 h-4 fill-red-600 stroke-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </Link>

                  {/* Info details */}
                  <div className="p-5">
                    <Link href={`/product/${item.id}`} className="hover:underline">
                      <h3 className="font-bold text-slate-800 line-clamp-2 min-h-[44px]">
                        {item.name}
                      </h3>
                    </Link>
                    <span className="text-lg font-black text-red-600 block mt-2">{item.price}</span>
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex gap-2">
                  <Link
                    href={`/product/${item.id}`}
                    className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs py-2.5 rounded-lg transition"
                  >
                    View Info
                  </Link>
                  {isLoggedIn ? (
                    <button
                      onClick={() => {
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          icon: item.icon,
                          category: item.category,
                        });
                      }}
                      className={`flex-1 font-extrabold text-xs py-2.5 rounded-lg transition ${
                        isInCart(item.id)
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      {isInCart(item.id) ? "✓ Added" : "Add to Cart"}
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="flex-grow text-center bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs py-2.5 rounded-lg transition"
                    >
                      🔒 Login to Add
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
