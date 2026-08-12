'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function CampsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Placeholder for database submission (e.g., Supabase / API route)
    console.log('Submitting waitlist lead:', formData);

    // Simulate API request delay
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="pt-36 pb-24 px-6 lg:px-12 max-w-5xl mx-auto w-full text-center flex-grow flex flex-col justify-center items-center">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-red-500 font-mono text-xs uppercase tracking-widest font-bold">
            2026 Special Update
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight">
          2026 Free Online Webinar
        </h1>

        {/* Subtitle / Notice */}
        <p className="mt-6 text-neutral-300 font-mono text-xs md:text-sm max-w-2xl leading-relaxed">
          Due to unavoidable circumstances, all physical in-person camps are suspended for this year. Instead, we are hosting an exclusive, <span className="text-red-500 font-bold">100% FREE 2026 Live Online Webinar</span> covering complete vertical jump biomechanics, strength programming, and explosive performance training.
        </p>

        {/* Webinar Details Card */}
        <div className="mt-10 w-full max-w-xl border border-neutral-800 bg-neutral-950 p-8 rounded-xl text-left space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 font-mono text-xs">
            <span className="text-neutral-500 uppercase tracking-widest">Format</span>
            <span className="text-white font-bold uppercase">Live Interactive Webinar</span>
          </div>
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 font-mono text-xs">
            <span className="text-neutral-500 uppercase tracking-widest">Year</span>
            <span className="text-white font-bold">2026 Season</span>
          </div>
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 font-mono text-xs">
            <span className="text-neutral-500 uppercase tracking-widest">Cost</span>
            <span className="text-red-500 font-bold uppercase">Free (100% Subsidized)</span>
          </div>
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-neutral-500 uppercase tracking-widest">Access</span>
            <span className="text-white font-bold uppercase">Registration Waitlist Only</span>
          </div>
        </div>

        {/* Interactive Registration Form */}
        <div className="mt-12 w-full max-w-xl border border-red-600/30 bg-neutral-950 p-8 rounded-xl text-left shadow-2xl">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                  Reserve Your Spot
                </h3>
                <p className="text-neutral-400 font-mono text-xs mt-1">
                  Enter your contact details below to join the priority WhatsApp waitlist.
                </p>
              </div>

              {/* Full Name Input */}
              <div>
                <label className="block text-neutral-300 font-mono text-xs uppercase tracking-wider mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pathum Nisanka"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-neutral-300 font-mono text-xs uppercase tracking-wider mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="athlete@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              {/* WhatsApp Phone Number Input */}
              <div>
                <label className="block text-neutral-300 font-mono text-xs uppercase tracking-wider mb-2">
                  WhatsApp Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+94 77 123 4567"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-mono text-xs md:text-sm uppercase tracking-widest py-4 rounded font-bold transition-all hover:scale-[1.02] shadow-lg shadow-red-600/20 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Join Free Webinar Waitlist →'}
              </button>
            </form>
          ) : (
            /* Confirmation State */
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-600/40">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                You're On The Waitlist!
              </h3>
              <p className="text-neutral-400 font-mono text-xs leading-relaxed max-w-md mx-auto">
                Thank you, <span className="text-white font-bold">{formData.fullName}</span>. We've reserved your spot. We will send the live webinar access link directly to <span className="text-white">{formData.email}</span> and send a reminder to your WhatsApp number (<span className="text-white">{formData.whatsapp}</span>).
              </p>
            </div>
          )}
        </div>

      </section>

      <Footer />
    </main>
  );
}