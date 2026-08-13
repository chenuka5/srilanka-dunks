'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function ContactPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setError('Something went wrong sending your message. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="pt-40 pb-20 px-6 border-b border-neutral-900 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold">
            Get In Touch
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
            Contact <span className="text-white">Us.</span>
          </h1>
          <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto leading-relaxed">
            Have a question about our programs, camps, or partnerships? Send us a message below and our team will get back to you.
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

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Full Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Subject</label>
              <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Message</label>
              <textarea required name="message" rows={5} value={formData.message} onChange={handleChange} className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all resize-none"></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-8 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-mono text-sm uppercase tracking-widest p-5 rounded font-bold transition-all"
            >
              {isLoading ? 'Sending...' : 'Send Message →'}
            </button>
          </form>

        </div>
      </section>

      <Footer />
    </main>
  );
}