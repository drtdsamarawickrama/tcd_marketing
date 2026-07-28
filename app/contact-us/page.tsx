"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// FAQ data schema to populate the interactive accordions list
const FAQS_DATABASE = [
  { id: 1, question: "Do you deliver island-wide in Sri Lanka?", answer: "Yes! TCD Marketing delivers to all 25 districts of Sri Lanka. Standard home furniture deliveries take between 3-7 working days, while electrical items are often delivered within 2-4 working days." },
  { id: 2, question: "What is your warranty policy on solid wood items?", answer: "All our solid wood furniture pieces (such as Teak, Mahogany, and Oak bedroom or dining sets) come with a comprehensive 5-year structural warranty against manufacturing defects and wood worm infestation." },
  { id: 3, question: "Can I pay in interest-free credit card installments?", answer: "Absolutely. We support 0% interest installment plans for up to 12 months with leading banks including HSBC, Commercial Bank, Sampath Bank, HNB, and Seylan Bank on purchases exceeding Rs. 25,000." },
  { id: 4, question: "How can I return or exchange a product?", answer: "If you receive a defective or incorrect item, please notify our hotline at +94 11 7 654 654 within 48 hours of delivery. We will arrange a free exchange or replacement process immediately." },
];

export default function ContactUsPage() {
  // Mobile navigation drawer state matching layout Header
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tracks open FAQ accordion item (null if none are open)
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  // Form input field state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Toggle function for interactive FAQ Accordion
  const toggleFaq = (id: number) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  // Handles input value changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submits form details mocking network requests
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans">
      {/* Shared Header component */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Container */}
      <main className="flex-grow">
        
        {/* Banner Section - fades in */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-950 text-white py-16 px-4 text-center animate-fade-in">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="text-red-500 text-xs font-black tracking-widest uppercase">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Contact Us</h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Have a question about our furniture, warranty, or delivery? Reach out to our customer care team or submit a message below.
            </p>
          </div>
        </section>

        {/* Contact info grid & Contact form */}
        <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct channels (5 cols) - slides up */}
          <div className="lg:col-span-5 space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900">Reach Us Directly</h2>
              <p className="text-slate-655 text-sm leading-relaxed">
                Whether you need technical support for appliances or wish to verify stock levels at your nearest store, we are happy to assist.
              </p>
            </div>

            {/* Support detail cards */}
            <div className="space-y-4">
              <div className="p-5 bg-white border border-zinc-200 rounded-xl flex items-start gap-4 hover:scale-102 transition duration-200">
                <div className="text-2xl">📞</div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase">Call Center Hotline</h3>
                  <p className="text-sm font-semibold text-red-600 mt-0.5">+94 11 7 654 654</p>
                  <p className="text-[10px] text-slate-500">Available Daily 9.00 AM - 6.00 PM</p>
                </div>
              </div>

              <div className="p-5 bg-white border border-zinc-200 rounded-xl flex items-start gap-4 hover:scale-102 transition duration-200">
                <div className="text-2xl">🏢</div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase">Head Office Address</h3>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    TCD Marketing (Pvt) Ltd,<br />
                    No. 361, Union Place, Colombo 02, Sri Lanka.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white border border-zinc-200 rounded-xl flex items-start gap-4 hover:scale-102 transition duration-200">
                <div className="text-2xl">✉️</div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-xs uppercase">General Email Support</h3>
                  <p className="text-sm font-semibold text-red-600 mt-0.5">info@tcdmarketing.lk</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) - scales up dynamically */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-xs animate-scale-up animation-delay-150 animation-fill-both">
              
              {isSubmitted ? (
                // Submit success UI layout
                <div className="text-center py-16 space-y-6">
                  <div className="w-16 h-16 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner animate-bounce">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto">
                      Thank you for contacting us. Our customer support agents will get back to you shortly via email or phone.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-slate-900 text-white hover:bg-slate-850 px-6 py-2 rounded-lg text-xs font-bold transition duration-150"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                // Feedback Form
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900">Submit a Support Ticket</h3>
                    <p className="text-slate-400 text-xs">Fill in your information and message below and we will contact you directly.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Your Name *</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Sunil Perera"
                        className="w-full text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Email Address *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="sunil@gmail.com"
                        className="w-full text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+94 77 123 4567"
                        className="w-full text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Subject *</label>
                      <input 
                        type="text" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Delivery Inquiry"
                        className="w-full text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Your Message *</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Write your message detail here..."
                      className="w-full text-xs p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-slate-900 focus:outline-none focus:bg-white focus:border-red-500 transition resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-750 text-white font-bold py-3.5 rounded-lg text-xs tracking-wider uppercase transition duration-155 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Sending Message...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </section>

        {/* Dynamic FAQ Accordion Section */}
        <section className="bg-zinc-100 py-16 px-4 border-t border-zinc-200">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
              <p className="text-slate-500 text-xs md:text-sm">Quick answers to common questions about buying, warranty, and deliveries.</p>
            </div>

            {/* Accordion List Layout */}
            <div className="space-y-3">
              {FAQS_DATABASE.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-xs transition duration-200">
                    <button 
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-5 py-4 text-left flex justify-between items-center gap-4 hover:bg-zinc-50 transition duration-150"
                    >
                      <span className="font-extrabold text-slate-950 text-xs sm:text-sm leading-snug">
                        {faq.question}
                      </span>
                      <span className={`text-slate-400 font-bold text-lg transform transition duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-xs leading-relaxed border-t border-zinc-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* Shared Footer component */}
      <Footer />
    </div>
  );
}
