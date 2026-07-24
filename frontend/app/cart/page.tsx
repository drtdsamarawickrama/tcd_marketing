"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/useAuth";
import { useCart } from "@/components/useCart";

export default function CartPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart(user?.id ?? null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Format number as Sri Lankan Rupees display string
  function formatPrice(num: number): string {
    return "Rs. " + num.toLocaleString("en-LK");
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="flex-grow max-w-5xl mx-auto px-4 py-10 w-full">

        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Cart</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {cartCount > 0 ? `${cartCount} item${cartCount > 1 ? "s" : ""} in your cart` : "Your cart is empty"}
            </p>
          </div>
          {cartCount > 0 && (
            <button
              onClick={() => { if (confirm("Clear all items from cart?")) clearCart(); }}
              className="text-xs font-bold text-slate-400 hover:text-red-600 border border-slate-200 hover:border-red-300 px-3 py-1.5 rounded-lg transition"
            >
              🗑 Clear Cart
            </button>
          )}
        </div>

        {/* Not logged in notice */}
        {!isLoggedIn && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 flex items-start gap-4">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="font-bold text-amber-800 text-sm">You are browsing as a guest</p>
              <p className="text-amber-700 text-xs mt-1">
                Your cart items are saved locally.{" "}
                <Link href="/login" className="text-red-600 font-bold underline">Login</Link>{" "}
                or{" "}
                <Link href="/signup" className="text-red-600 font-bold underline">Create Account</Link>{" "}
                to save your cart permanently.
              </p>
            </div>
          </div>
        )}

        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
            <span className="text-6xl block mb-4">🛒</span>
            <h2 className="text-xl font-extrabold text-slate-800 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 text-sm mb-6">Browse our collections and add items you love!</p>
            <Link
              href="/"
              className="inline-block bg-red-600 text-white font-extrabold text-sm px-8 py-3 rounded-xl hover:bg-red-700 transition shadow-md"
            >
              Browse Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">

            {/* Left: Cart Items List */}
            <div className="flex flex-col gap-4">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex gap-0"
                >
                  {/* Product Image / Icon */}
                  <div className="w-28 sm:w-36 flex-shrink-0 bg-zinc-100 flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl">{item.icon}</span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 p-4 flex flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {/* Link back to product detail page */}
                        <Link
                          href={`/product/${item.id}`}
                          className="font-extrabold text-slate-800 text-sm leading-tight hover:text-red-600 transition line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <span className="text-xs text-slate-400 capitalize">{item.category.replace("-", " ")}</span>
                      </div>
                      {/* Remove button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-300 hover:text-red-500 transition flex-shrink-0 p-1"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      {/* Price */}
                      <span className="text-base font-black text-red-600">{item.price}</span>

                      {/* Quantity stepper +/- */}
                      <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition font-bold text-lg"
                        >
                          −
                        </button>
                        <span className="text-sm font-extrabold text-slate-800 w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Summary Panel */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-base font-extrabold text-slate-800 mb-5 pb-3 border-b border-zinc-100">
                Order Summary
              </h2>

              {/* Items breakdown */}
              <div className="flex flex-col gap-2.5 mb-5">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 truncate max-w-[160px]">
                      {item.name.length > 22 ? item.name.slice(0, 22) + "..." : item.name}
                      {item.quantity > 1 && (
                        <span className="text-xs text-slate-400 ml-1">×{item.quantity}</span>
                      )}
                    </span>
                    <span className="font-bold text-slate-700 flex-shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center border-t border-zinc-100 pt-4 mb-6">
                <span className="font-extrabold text-slate-800">Estimated Total</span>
                <span className="text-lg font-black text-red-600">{formatPrice(cartTotal)}</span>
              </div>

              {/* Enquire / CTA */}
              {isLoggedIn ? (
                <button className="w-full bg-red-600 text-white font-extrabold py-3.5 rounded-xl hover:bg-red-700 transition shadow-md shadow-red-500/10 text-sm">
                  Enquire All Items
                </button>
              ) : (
                <Link
                  href="/login"
                  className="block w-full bg-slate-800 text-white font-extrabold py-3.5 rounded-xl hover:bg-red-600 transition text-center text-sm"
                >
                  🔒 Login to Enquire
                </Link>
              )}

              <Link
                href="/"
                className="block text-center text-slate-500 hover:text-red-600 text-xs font-semibold mt-4 transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
