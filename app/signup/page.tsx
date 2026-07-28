"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/useAuth";

// Calculate password strength score (0-4) for the strength meter bar
function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 6)  score++;  // Minimum length
  if (password.length >= 10) score++;  // Longer is better
  if (/[A-Z]/.test(password)) score++; // Has uppercase
  if (/[0-9]/.test(password)) score++; // Has number
  return score;
}

// Strength label and color matching the score level
const strengthConfig = [
  { label: "",        color: "" },
  { label: "Weak",    color: "bg-red-500" },
  { label: "Fair",    color: "bg-orange-500" },
  { label: "Good",    color: "bg-yellow-500" },
  { label: "Strong",  color: "bg-green-500" },
];

export default function SignupPage() {
  const router = useRouter();
  const { register, isLoggedIn, loading } = useAuth();

  const [username, setUsername]         = useState("");
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [confirmPass, setConfirmPass]   = useState("");
  const [showPass, setShowPass]         = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [error, setError]               = useState("");
  const [success, setSuccess]           = useState("");
  const [submitting, setSubmitting]     = useState(false);

  // Redirect to home if already logged in
  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, loading, router]);

  const passwordStrength = getPasswordStrength(password);
  const strengthInfo = strengthConfig[passwordStrength] || strengthConfig[0];

  // Handle signup form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation before hitting the API
    if (password !== confirmPass) {
      setError("Passwords do not match. Please check and try again.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    const result = await register(username.trim(), email.trim(), password);

    if (result.success) {
      setSuccess("Account created! Redirecting to login...");
      // Redirect to login page after 1.5 seconds
      setTimeout(() => router.push("/login"), 1500);
    } else {
      setError(result.message);
    }
    setSubmitting(false);
  }

  if (loading) return null;

  return (
    // Pure white background to match the site's clean white theme
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Layered glowing ambient background blobs for soft visual depth */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-red-500/5 to-rose-500/0 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tl from-rose-500/5 to-amber-500/0 rounded-full blur-3xl pointer-events-none"></div>

      {/* Outer wrapper */}
      <div className="w-full max-w-md relative z-10">

        {/* Brand header with Logo and dark bold text */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block hover:scale-102 transition-transform duration-300">
            <img src="/logo.jpeg" alt="TCD Marketing" className="h-16 w-auto mx-auto rounded-xl object-contain shadow-sm border border-slate-200" />
          </Link>
          <h1 className="text-3xl font-black text-slate-900 mt-4 tracking-tight">
            Create Account
          </h1>
          <p className="text-slate-500 text-sm mt-1">Join TCD Marketing - Sri Lanka&apos;s trusted furniture store</p>
        </div>

        {/* Premium Light Card with soft shadow */}
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-200/50 relative">

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Error Message Box */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2 font-medium">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Success Message Box */}
            {success && (
              <div className="bg-green-50 border border-green-100 text-green-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2 font-medium">
                <span>✅</span>
                <span>{success}</span>
              </div>
            )}

            {/* Username Input Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={30}
                placeholder="e.g. john_perera"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
              />
              <p className="text-[11px] text-slate-400">3-30 characters, letters, numbers and underscores only</p>
            </div>

            {/* Email Input Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
              />
            </div>

            {/* Password Input Field with Strength Indicator */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition text-xs font-bold">
                  {showPass ? "HIDE" : "SHOW"}
                </button>
              </div>
              {/* Password strength bar indicator */}
              {password && (
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4].map(level => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                        level <= passwordStrength ? strengthInfo.color : "bg-slate-100"
                      }`}
                    ></div>
                  ))}
                  <span className={`text-[11px] font-bold ml-1 ${
                    passwordStrength <= 1 ? "text-red-500" :
                    passwordStrength === 2 ? "text-orange-500" :
                    passwordStrength === 3 ? "text-yellow-500" : "text-green-500"
                  }`}>{strengthInfo.label}</span>
                </div>
              )}
            </div>

            {/* Confirm Password Input Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPass}
                  onChange={e => setConfirmPass(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  className={`w-full bg-slate-50 border text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none transition-all duration-300 ${
                    confirmPass && confirmPass !== password
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                      : confirmPass && confirmPass === password
                      ? "border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                      : "border-slate-200 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  }`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition text-xs font-bold">
                  {showConfirm ? "HIDE" : "SHOW"}
                </button>
              </div>
              {/* Passwords matching helper label */}
              {confirmPass && (
                <p className={`text-[11px] font-semibold ${confirmPass === password ? "text-green-600" : "text-red-600"}`}>
                  {confirmPass === password ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            {/* Premium Gradient Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 active:scale-[0.98] disabled:from-red-400 disabled:to-rose-400 text-white font-extrabold py-3.5 rounded-xl transition-all duration-300 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2 mt-1"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Creating Account...</span>
                </>
              ) : (
                "Create My Account"
              )}
            </button>

          </form>

          {/* Link to navigate to login page */}
          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-red-600 font-extrabold hover:text-red-500 hover:underline transition-all">
              Sign In
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
