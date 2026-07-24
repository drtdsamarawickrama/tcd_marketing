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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Animated gradient background blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-800/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">

        {/* Logo / Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <img src="/logo.jpeg" alt="TCD Marketing" className="h-14 w-auto mx-auto rounded-lg object-contain" />
          </Link>
          <h1 className="text-2xl font-black text-white mt-4 tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to your TCD Marketing account</p>
        </div>

        {/* Glass Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Error Message Box */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:bg-white/8 transition"
              />
            </div>

            {/* Password Input with show/hide toggle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-red-500 focus:bg-white/8 transition"
                />
                {/* Toggle password visibility button */}
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition text-xs font-bold"
                >
                  {showPass ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white font-extrabold py-3.5 rounded-xl transition shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 mt-1"
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

          {/* Link to Signup */}
          <p className="text-center text-slate-500 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-red-400 font-bold hover:text-red-300 transition">
              Create Account
            </Link>
          </p>
        </div>

        {/* Back to site link */}
        <p className="text-center mt-6">
          <Link href="/" className="text-slate-600 hover:text-slate-400 text-xs transition">
            ← Back to TCD Marketing
          </Link>
        </p>
      </div>
    </div>
  );
}
