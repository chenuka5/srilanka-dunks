'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
        },
      }
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-24 px-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 md:p-12 rounded shadow-2xl">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Create Profile</h1>
            <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest">Join the athlete platform</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="bg-red-950/50 border border-red-900 text-red-500 text-xs font-mono uppercase p-3 rounded text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-neutral-400">First Name</label>
              <input 
                type="text" 
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-neutral-400">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-neutral-400">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold font-mono uppercase tracking-widest text-sm py-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? 'Creating Profile...' : 'Sign Up →'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
            <p className="text-neutral-500 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-white hover:text-red-500 transition-colors font-bold">
                Log In
              </Link>
            </p>
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}