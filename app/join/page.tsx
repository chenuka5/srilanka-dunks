'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function JoinPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
    sport: '',
    location: '',
    goal: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          whatsapp: formData.whatsapp,
          primary_sport: formData.sport,
          location: formData.location,
          athletic_goal: formData.goal
        }
      }
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setSuccess(true);
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Join <span className="text-red-600">Sri Lanka Dunks.</span>
            </h1>
            <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest max-w-lg mx-auto">
              Register your details below to join the premier athletic performance platform for Sri Lankan athletes.
            </p>
          </div>

          {success ? (
             <div className="p-8 bg-green-900/10 border border-green-500/50 rounded text-center space-y-4">
               <h3 className="text-green-500 font-bold uppercase tracking-tight text-xl">Welcome to the Movement</h3>
               <p className="text-neutral-400 font-mono text-xs leading-relaxed">
                 We've sent a secure confirmation link to {formData.email}. Please click the link to verify your account and access the athlete portal.
               </p>
               <Link href="/login" className="block mt-4 text-white hover:text-green-500 font-mono text-xs uppercase tracking-widest transition-colors">
                 Go to Login →
               </Link>
             </div>
          ) : (
            <form onSubmit={handleJoin} className="space-y-6 bg-neutral-950 p-8 rounded border border-neutral-900 shadow-2xl">
              
              {error && (
                <div className="p-4 bg-red-900/20 border border-red-600 text-red-500 font-mono text-xs uppercase tracking-widest rounded text-center">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">First Name</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Last Name</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">WhatsApp Number</label>
                  <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Primary Sport</label>
                  <input required type="text" name="sport" placeholder="e.g. Basketball" value={formData.sport} onChange={handleChange} className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Location / City</label>
                  <input required type="text" name="location" placeholder="e.g. Kandy" value={formData.location} onChange={handleChange} className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Main Athletic Goal</label>
                <select required name="goal" value={formData.goal} onChange={handleChange} className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all appearance-none cursor-pointer">
                  <option value="" disabled>Select an option</option>
                  <option value="increase_vertical">Increase Vertical Jump</option>
                  <option value="build_strength">Build Overall Strength & Power</option>
                  <option value="injury_prevention">Injury Prevention & Rehab</option>
                  <option value="sport_specific">Sport-Specific Conditioning</option>
                </select>
              </div>

              {/* Password field is required for Supabase Auth to actually create the account */}
              <div className="pt-2 border-t border-neutral-900 mt-6">
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2 mt-4">Create Password</label>
                <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-mono text-sm uppercase tracking-widest p-4 rounded font-bold transition-all shadow-lg shadow-red-600/20"
              >
                {isLoading ? 'Processing...' : 'Complete Registration →'}
              </button>
            </form>
          )}

          <div className="text-center">
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
              Already have an account? <Link href="/login" className="text-white hover:text-red-600 underline underline-offset-4 ml-1 transition-colors">Login Here</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}