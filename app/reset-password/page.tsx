
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isValidRecovery, setIsValidRecovery] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    let recoveryDetected = false;

    const checkRecoverySession = async () => {
      const hashParams = new URLSearchParams(
        window.location.hash.substring(1)
      );

      const queryParams = new URLSearchParams(
        window.location.search
      );

      const recoveryMarker =
        hashParams.get('type') === 'recovery' ||
        queryParams.get('type') === 'recovery';

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (recoveryMarker && session) {
        recoveryDetected = true;
        setIsValidRecovery(true);
      }

      setIsChecking(false);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        mounted &&
        event === 'PASSWORD_RECOVERY' &&
        session
      ) {
        recoveryDetected = true;
        setIsValidRecovery(true);
        setIsChecking(false);
      }

      if (
        mounted &&
        event === 'SIGNED_OUT' &&
        recoveryDetected
      ) {
        setIsValidRecovery(false);
      }
    });

    checkRecoverySession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handlePasswordUpdate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError('');
    setMessage('');

    if (!isValidRecovery) {
      setError(
        'Your recovery session is invalid. Please request a new reset link.'
      );
      return;
    }

    if (password.length < 8) {
      setError(
        'Your password must contain at least 8 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const { error: updateError } =
        await supabase.auth.updateUser({
          password,
        });

      if (updateError) {
        setError(updateError.message);
        setIsLoading(false);
        return;
      }

      setMessage(
        'Your password has been updated successfully.'
      );

      setIsLoading(false);

      setTimeout(async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
      }, 1500);
    } catch {
      setError(
        'An unexpected error occurred. Please try again.'
      );
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
              Reset <span className="text-red-600">Password.</span>
            </h1>

            <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest">
              Athlete Portal Recovery
            </p>
          </div>

          <div className="bg-neutral-950 p-8 rounded border border-neutral-900 shadow-2xl space-y-6">

            {isChecking ? (
              <p className="text-neutral-400 font-mono text-xs text-center uppercase tracking-widest">
                Verifying recovery link...
              </p>
            ) : !isValidRecovery ? (
              <div className="space-y-5 text-center">
                <p className="text-red-500 font-mono text-xs uppercase tracking-widest">
                  This password reset link is invalid or has expired.
                </p>

                <Link
                  href="/forgot-password"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white font-mono text-sm uppercase tracking-widest p-4 rounded font-bold transition-all"
                >
                  Request New Reset Link →
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handlePasswordUpdate}
                className="space-y-6"
              >
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Enter your new password below. Your password must contain
                  at least 8 characters.
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
                    New Password
                  </label>

                  <input
                    required
                    type="password"
                    minLength={8}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    Confirm New Password
                  </label>

                  <input
                    required
                    type="password"
                    minLength={8}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white font-mono text-sm outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !!message}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-mono text-sm uppercase tracking-widest p-4 rounded font-bold transition-all shadow-lg shadow-red-600/20"
                >
                  {isLoading
                    ? 'Updating Password...'
                    : 'Update Password →'}
                </button>
              </form>
            )}
          </div>

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
