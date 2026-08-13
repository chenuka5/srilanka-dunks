'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    } else {
      // Direct successful logins straight to the private dashboard
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Welcome <span className="text-red-600">Back.</span>
            </h1>
            <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest">
              Athlete Portal Login
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 bg-neutral-950 p-8 rounded border border-neutral-900 shadow-2xl">
            
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-600 text-red-500 font-mono text-xs uppercase tracking-widest rounded text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400">Password</label>
              </div>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all" />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-mono text-sm uppercase tracking-widest p-4 rounded font-bold transition-all shadow-lg shadow-red-600/20"
            >
              {isLoading ? 'Authenticating...' : 'Log In →'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
              Don't have an account? <Link href="/signup" className="text-white hover:text-red-600 underline underline-offset-4 ml-1 transition-colors">Sign Up</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}