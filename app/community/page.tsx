'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function CommunityPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
    sport: '',
    location: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setError('Something went wrong submitting your request. Please try again.');
      setIsLoading(false);
    }
  };

  const benefits = [
    'Training education',
    'Vertical jump tips',
    'Challenges',
    'Camp announcements',
    'Athlete opportunities',
    'New programs',
    'Community updates'
  ];

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="pt-40 pb-20 px-6 border-b border-neutral-900 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            The Sri Lanka Dunks <br />
            <span className="text-red-600">Community.</span>
          </h1>
          <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto leading-relaxed uppercase tracking-widest font-bold">
            Sri Lankan Athletes. One Movement.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-950 flex-grow">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Benefits Column */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">
              Why Join?
            </h2>
            <p className="text-neutral-400 font-mono text-sm leading-relaxed">
              We are building the home of athletic performance in Sri Lanka. By joining the community, you get direct access to the systems, opportunities, and education required to elevate your game.
            </p>
            
            <ul className="space-y-4">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-4 text-neutral-300 font-mono text-sm uppercase tracking-widest">
                  <span className="text-red-600 font-black">→</span> {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Lead Capture Form */}
          <div className="bg-black p-8 rounded border border-neutral-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              
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
                  <input required type="text" name="sport" value={formData.sport} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Location / City</label>
                  <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-8 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-mono text-sm uppercase tracking-widest p-5 rounded font-bold transition-all"
              >
                {isLoading ? 'Processing...' : 'Join Free →'}
              </button>
            </form>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}