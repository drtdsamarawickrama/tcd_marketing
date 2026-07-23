"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// B2B Corporate Inquiry Page for bulk orders, project furnishings, and retail supply
export default function CorporateInquiryPage() {
  // Local state to manage the mobile menu open/close behavior in the Header
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form states to manage inputs and submission feedback animations
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    inquiryType: "office",
    message: "",
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handles text and dropdown selection changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Triggers mock form submit animation and success screen display
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API POST request latency
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        inquiryType: "office",
        message: "",
      });
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      {/* Shared Header across pages */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* Banner header styled with rich blue-slate gradient */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="text-lime-500 text-xs font-black tracking-widest uppercase">
              B2B & Partnerships
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Corporate Inquiries</h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Get customized wholesale prices, custom project support, and bulk furnishing quotes for your office, hotel, or retail setup.
            </p>
          </div>
        </section>

        {/* Form and Support Info layout */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: B2B Support details (4 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900">Why Partner With TCD Marketing?</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                We offer custom production runs, flexible delivery schedules, and bulk credit facilities for corporate partners. Our dedicated corporate project desk manages everything from design concept to final assembly.
              </p>
            </div>

            {/* Direct contact info cards */}
            <div className="space-y-4">
              <div className="p-5 bg-white border border-zinc-200 rounded-xl flex items-start gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase">Direct Corporate Line</h3>
                  <p className="text-sm font-semibold text-red-600 mt-0.5">+94 11 7 654 900</p>
                  <p className="text-[10px] text-slate-500">Available Mon-Fri 9:00 AM - 5:30 PM</p>
                </div>
              </div>

              <div className="p-5 bg-white border border-zinc-200 rounded-xl flex items-start gap-4">
                <div className="text-2xl">✉️</div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase">B2B Team Email</h3>
                  <p className="text-sm font-semibold text-red-600 mt-0.5">corporate@tcdmarketing.lk</p>
                  <p className="text-[10px] text-slate-500">Expect a detailed response within 24 business hours</p>
                </div>
              </div>
            </div>

            {/* Partnership benefits checklist */}
            <div className="bg-zinc-100 p-6 rounded-xl border border-zinc-200">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase mb-3">Enterprise Perks</h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">✓ Tailored sizing & customization for bulk wood orders</li>
                <li className="flex items-center gap-2">✓ On-site consultation and layout planning sessions</li>
                <li className="flex items-center gap-2">✓ Extended structural warranties up to 5 years</li>
                <li className="flex items-center gap-2">✓ Consolidated logistics support for large multi-site rollouts</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-xs">
              
              {isSubmitted ? (
                // Success submit feedback container
                <div className="text-center py-16 space-y-6">
                  <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner animate-bounce">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Inquiry Sent Successfully!</h3>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto">
                      Thank you for contacting our corporate desk. One of our dedicated account managers will reach out to you within 24 hours.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-slate-900 text-white hover:bg-slate-850 px-6 py-2 rounded-lg text-xs font-bold transition duration-150"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                // Corporate form
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900">B2B Quote Request</h3>
                    <p className="text-slate-400 text-xs">Fill out the brief form below and our sales agents will customize a quotation for you.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Contact Person Name *</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-red-500 transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Company / Organization *</label>
                      <input 
                        type="text" 
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        placeholder="Acme Corp"
                        className="w-full text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-red-500 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@acme.com"
                        className="w-full text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-red-500 transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+94 77 123 4567"
                        className="w-full text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-red-500 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Primary Inquiry Category *</label>
                    <select 
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-red-500 transition"
                    >
                      <option value="office">Office Furniture Furnishing</option>
                      <option value="hotel">Hotel, Villa & Resort Bulk Order</option>
                      <option value="appliances">Wholesale Home Electrics / Appliances</option>
                      <option value="retail">Retail Dealership & Distribution Partnership</option>
                      <option value="other">Other Bulk / Custom Request</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Detailed Requirements / Scope *</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Please specify estimate quantity, wood material preferences, color guidelines, or delivery timeline requests..."
                      className="w-full text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:bg-white focus:border-red-500 transition resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-750 text-white font-bold py-3.5 rounded-lg text-xs tracking-wider uppercase transition duration-150 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Processing Request...
                      </>
                    ) : (
                      "Submit Quote Request"
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </section>

      </main>

      {/* Shared Footer across pages */}
      <Footer />
    </div>
  );
}
