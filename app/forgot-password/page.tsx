
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

      if (resetError) {
        setError(resetError.message);
        setIsLoading(false);
        return;
      }

      setMessage(
        'If an account exists with this email address, a password reset link will be sent shortly. Please check your inbox and spam folder.'
      );
    } catch {
      setError(
        'An unexpected error occurred. Please try again.'
      );
    }

    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Forgot <span className="text-red-600">Password?</span>
            </h1>

            <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest">
              Athlete Portal Recovery
            </p>
          </div>

          <form
            onSubmit={handleResetRequest}
            className="space-y-6 bg-neutral-950 p-8 rounded border border-neutral-900 shadow-2xl"
          >
            <p className="text-neutral-400 text-sm leading-relaxed">
              Enter the email address associated with your athlete account.
              We'll send you a link to reset your password.
            </p>

            {message && (
              <div className="p-4 bg-green-900/20 border border-green-600 text-green-500 font-mono text-xs rounded text-center">
                {message}
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-600 text-red-500 font-mono text-xs uppercase tracking-widest rounded text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                Email Address
              </label>

              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-mono text-sm uppercase tracking-widest p-4 rounded font-bold transition-all shadow-lg shadow-red-600/20"
            >
              {isLoading ? 'Sending Link...' : 'Send Reset Link →'}
            </button>
          </form>

          <div className="text-center">
            <Link
              href="/login"
              className="text-neutral-400 hover:text-red-600 font-mono text-xs uppercase tracking-widest underline underline-offset-4 transition-colors"
            >
              ← Back to Login
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
