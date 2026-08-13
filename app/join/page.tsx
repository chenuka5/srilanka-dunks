'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function JoinPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
    sport: '',
    location: '',
    goal: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO FOR PRODUCTION: Replace this simulated delay with your Google Form POST request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push('/thank-you');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="pt-40 pb-20 px-6 border-b border-neutral-900 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold">
            The Movement
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
            Join Sri Lanka <br />
            <span className="text-white">Dunks.</span>
          </h1>
          <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto leading-relaxed">
            Register your details below to join the premier athletic performance platform for Sri Lankan athletes.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-950 flex-grow">
        <div className="max-w-2xl mx-auto">
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-black p-8 md:p-12 rounded border border-neutral-800 shadow-xl">
            
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-600 text-red-500 font-mono text-xs uppercase tracking-widest rounded text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">First Name</label>
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Last Name</label>
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">WhatsApp Number</label>
              <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Primary Sport</label>
                <input required type="text" name="sport" placeholder="e.g. Basketball" value={formData.sport} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Location / City</label>
                <input required type="text" name="location" placeholder="e.g. Kandy" value={formData.location} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Main Athletic Goal</label>
              <select required name="goal" value={formData.goal} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all appearance-none">
                <option value="" disabled>Select an option</option>
                <option value="Dunking">First Dunk</option>
                <option value="Increase Vertical">Increase Vertical Jump</option>
                <option value="Speed and Power">Speed & Explosiveness</option>
                <option value="In-Person Camps">Attend Live Camps</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-8 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-mono text-sm uppercase tracking-widest p-5 rounded font-bold transition-all shadow-lg shadow-red-600/20"
            >
              {isLoading ? 'Processing...' : 'Complete Registration →'}
            </button>
          </form>

          <div className="text-center pt-8">
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