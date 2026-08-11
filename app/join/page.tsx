'use client';

import React, { useState } from 'react';
import { signUpAction } from '@/app/actions/auth';
import Button from '@/components/ui/Button';

export default function JoinPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signUpAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-black flex flex-col justify-center py-32 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Copy */}
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
            JOIN THE <br /><span className="text-brand-crimson">MOVEMENT.</span>
          </h1>
          <p className="text-brand-gray-400 text-lg mb-8 leading-relaxed">
            Create your free athlete profile today. Track your vertical jump, access fundamental programs, and join Sri Lanka's most dedicated athletic community.
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-brand-gray-400">
              <span className="text-brand-crimson font-bold">✓</span>
              <span>Track your vertical jump progress over time</span>
            </div>
            <div className="flex items-center space-x-3 text-brand-gray-400">
              <span className="text-brand-crimson font-bold">✓</span>
              <span>Access the free foundation training block</span>
            </div>
            <div className="flex items-center space-x-3 text-brand-gray-400">
              <span className="text-brand-crimson font-bold">✓</span>
              <span>Compete on the national leaderboard</span>
            </div>
            <div className="flex items-center space-x-3 text-brand-gray-400">
              <span className="text-brand-crimson font-bold">✓</span>
              <span>Priority access to upcoming physical camps</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="bg-brand-surface p-8 md:p-12 border border-brand-gray-900 shadow-2xl">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
            CREATE ACCOUNT
          </h2>
          <p className="text-brand-gray-400 text-sm mb-8">Start your journey in under 60 seconds.</p>

          {error && (
            <div className="bg-brand-crimson/10 border border-brand-crimson text-brand-crimson text-sm p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-2">
                First Name
              </label>
              <input 
                name="firstName" 
                type="text" 
                required 
                placeholder="e.g. Chenuka"
                className="w-full bg-brand-black border border-brand-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-crimson transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-2">
                Email
              </label>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="your@email.com"
                className="w-full bg-brand-black border border-brand-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-crimson transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-2">
                Password
              </label>
              <input 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full bg-brand-black border border-brand-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-crimson transition-colors"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full" variant="primary">
              {loading ? 'CREATING ACCOUNT...' : 'SIGN UP NOW →'}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}