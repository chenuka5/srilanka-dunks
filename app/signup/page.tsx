'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
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
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Create <span className="text-red-600">Account.</span>
            </h1>
            <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest">
              Athlete Registration
            </p>
          </div>

          {success ? (
             <div className="p-8 bg-green-900/10 border border-green-500/50 rounded text-center space-y-4">
               <h3 className="text-green-500 font-bold uppercase tracking-tight text-xl">Check your email</h3>
               <p className="text-neutral-400 font-mono text-xs leading-relaxed">
                 We've sent a secure confirmation link to {formData.email}. Please click the link to verify your account and log in.
               </p>
               <Link href="/login" className="block mt-4 text-white hover:text-green-500 font-mono text-xs uppercase tracking-widest transition-colors">
                 Go to Login →
               </Link>
             </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-6 bg-neutral-950 p-8 rounded border border-neutral-900 shadow-2xl">
              
              {error && (
                <div className="p-4 bg-red-900/20 border border-red-600 text-red-500 font-mono text-xs uppercase tracking-widest rounded text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">First Name</label>
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Password</label>
                <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-mono text-sm uppercase tracking-widest p-4 rounded font-bold transition-all shadow-lg shadow-red-600/20"
              >
                {isLoading ? 'Creating...' : 'Sign Up →'}
              </button>
            </form>
          )}

          <div className="text-center">
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
              Already have an account? <Link href="/login" className="text-white hover:text-red-600 underline underline-offset-4 ml-1 transition-colors">Log In</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}