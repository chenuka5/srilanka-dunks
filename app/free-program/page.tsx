'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function FreeProgramPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    whatsapp: '',
    age: '',
    sport: '',
    location: '',
    currentVertical: '',
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
      // TODO FOR PRODUCTION: Replace this simulated delay with your Google Form Fetch POST request.
      // Example: await fetch('YOUR_GOOGLE_FORM_URL', { method: 'POST', body: new URLSearchParams(formData) })
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // On success, route to the unified Thank You page
      router.push('/thank-you');
    } catch (err) {
      setError('Something went wrong submitting your request. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="pt-40 pb-20 px-6 border-b border-neutral-900 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold">
            Free Download
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
            4-Week Vertical <br />
            <span className="text-white">Jump Starter.</span>
          </h1>
          <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto leading-relaxed">
            Get the foundational protocols used by top athletes. No shortcuts, just better training. Fill out the details below to receive your program.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-950 flex-grow">
        <div className="max-w-2xl mx-auto">
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-black p-8 md:p-12 rounded border border-neutral-800">
            
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-600 text-red-500 font-mono text-xs uppercase tracking-widest rounded text-center">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">First Name</label>
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">WhatsApp Number</label>
                <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Age</label>
                <input required type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>

              {/* Sport */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Primary Sport</label>
                <input required type="text" name="sport" placeholder="e.g. Basketball" value={formData.sport} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">City / Location</label>
                <input required type="text" name="location" placeholder="e.g. Colombo" value={formData.location} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>

              {/* Current Vertical */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Current Vertical (CM)</label>
                <input type="number" name="currentVertical" placeholder="Optional" value={formData.currentVertical} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>

              {/* Goal */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Main Goal</label>
                <select name="goal" value={formData.goal} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all appearance-none">
                  <option value="" disabled>Select an option</option>
                  <option value="Dunking">First Dunk</option>
                  <option value="Athleticism">General Athleticism</option>
                  <option value="Injury Prevention">Injury Resilience</option>
                  <option value="Pro Development">Pro/Elite Development</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-8 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-mono text-sm uppercase tracking-widest p-5 rounded font-bold transition-all flex justify-center items-center"
            >
              {isLoading ? 'Processing...' : 'Get The Free Program →'}
            </button>
          </form>

        </div>
      </section>

      <Footer />
    </main>
  );
}