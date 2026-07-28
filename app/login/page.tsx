"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn, loading } = useAuth();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);   // Toggle password visibility
  const [error, setError]       = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Redirect to home if already logged in
  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, loading, router]);

  // Handle login form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await login(email.trim(), password);

    if (result.success) {
      router.replace("/"); // Redirect to homepage after successful login
    } else {
      setError(result.message);
    }
    setSubmitting(false);
  }

  if (loading) return null; // Wait while checking existing auth state

  return (
    // Pure white background to match the site's clean white theme
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">

      {/* Layered glowing ambient background blobs for soft visual depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-red-500/5 to-rose-500/0 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tl from-rose-500/5 to-amber-500/0 rounded-full blur-3xl pointer-events-none"></div>

      {/* Outer wrapper */}
      <div className="w-full max-w-md relative z-10">

        {/* Brand Header with Logo and dark bold text - slides up on enter */}
        <div className="text-center mb-8 animate-slide-up">
          <Link href="/" className="inline-block hover:scale-102 transition-transform duration-300">
            <img src="/logo.jpeg" alt="TCD Marketing" className="h-16 w-auto mx-auto rounded-xl object-contain shadow-sm border border-slate-200" />
          </Link>
          <h1 className="text-3xl font-black text-slate-900 mt-4 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your TCD Marketing account</p>
        </div>

        {/* Premium Light Card with soft shadow - pops up cleanly */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-200/50 relative animate-scale-up animation-delay-100 animation-fill-both">

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Error Message Box */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2 font-medium">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Email Address Input Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
              />
            </div>

            {/* Password Input Field with Visibility Toggle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3.5 pr-12 text-sm focus:outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
                />
                {/* Toggle show/hide button */}
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition text-xs font-bold"
                >
                  {showPass ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Clean Gradient Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 active:scale-[0.98] disabled:from-red-400 disabled:to-rose-400 text-white font-extrabold py-3.5 rounded-xl transition-all duration-300 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2 mt-1"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>

          </form>

          {/* Link to navigate to signup page */}
          <p className="text-center text-slate-500 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-red-600 font-extrabold hover:text-red-500 hover:underline transition-all">
              Create Account
            </Link>
          </p>
        </div>

        {/* Back Link */}
        <p className="text-center mt-6">
          <Link href="/" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
            ← Back to TCD Marketing
          </Link>
        </p>
      </div>
    </div>
  );
}
