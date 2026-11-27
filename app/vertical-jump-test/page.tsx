
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

const supabase = createClient();

export default function VerticalJumpTestPage() {
  const [standingReach, setStandingReach] = useState('');
  const [standingJumpReach, setStandingJumpReach] = useState('');
  const [runningJumpReach, setRunningJumpReach] = useState('');

  const [standingResult, setStandingResult] = useState<number | null>(null);
  const [runningResult, setRunningResult] = useState<number | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [saveError, setSaveError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaveMessage('');
    setSaveError('');
    setStandingResult(null);
    setRunningResult(null);

    const standing = parseFloat(standingReach);
    const standingMax = parseFloat(standingJumpReach);
    const runningMax = parseFloat(runningJumpReach);

    if (
      !Number.isFinite(standing) ||
      !Number.isFinite(standingMax) ||
      !Number.isFinite(runningMax) ||
      standing <= 0 ||
      standingMax <= standing ||
      runningMax <= standing
    ) {
      setSaveError(
        'Please enter valid measurements. Both maximum jump reaches must be higher than standing reach.'
      );
      return;
    }

    const standingVertical = Number((standingMax - standing).toFixed(1));
    const runningVertical = Number((runningMax - standing).toFixed(1));

    setStandingResult(standingVertical);
    setRunningResult(runningVertical);

    setIsSaving(true);

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        setSaveError('Unable to check your account. Please try again.');
        setIsSaving(false);
        return;
      }

      if (!user) {
        setIsLoggedIn(false);
        setSaveMessage(
          'Your results have been calculated. Log in to your athlete account to save your measurements and track your progress.'
        );
        setIsSaving(false);
        return;
      }

      setIsLoggedIn(true);

      const { error: insertError } = await supabase
        .from('vertical_jump_logs')
        .insert({
          profile_id: user.id,
          standing_vertical_cm: standingVertical,
          running_vertical_cm: runningVertical,
        });

      if (insertError) {
        console.error('Vertical jump save error:', insertError.message);
        setSaveError(
          'Your results were calculated, but we could not save them. Please try again.'
        );
        setIsSaving(false);
        return;
      }

      setSaveMessage(
        'Your results have been saved successfully to your athlete profile. They are awaiting verification.'
      );
    } catch (error) {
      console.error('Vertical jump error:', error);
      setSaveError('An unexpected error occurred. Please try again.');
    }

    setIsSaving(false);
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="pt-40 pb-20 px-6 border-b border-neutral-900 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold">
            Athlete Performance Testing
          </p>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
            Test Your <br />
            <span className="text-white">Vertical.</span>
          </h1>

          <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto leading-relaxed">
            Measure your standing and running vertical jump.
            Enter all measurements in centimetres (CM).
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-950 flex-grow">
        <div className="max-w-2xl mx-auto">

          <form
            onSubmit={handleCalculate}
            className="space-y-8 bg-black p-8 md:p-12 rounded border border-neutral-800"
          >
            <div className="space-y-6">

              <div>
                <label className="block text-sm font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  1. Standing Reach (CM)
                </label>

                <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest mb-4">
                  Stand flat-footed next to a wall and reach as high as possible with one hand.
                </p>

                <input
                  type="number"
                  required
                  min="0.1"
                  step="0.1"
                  value={standingReach}
                  onChange={(e) => setStandingReach(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded p-4 text-white font-mono text-xl transition-all outline-none"
                  placeholder="e.g. 220"
                />
              </div>

              <div>
                <label className="block text-sm font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  2. Maximum Standing Jump Reach (CM)
                </label>

                <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest mb-4">
                  Perform a maximum-effort jump from a stationary position without an approach.
                </p>

                <input
                  type="number"
                  required
                  min="0.1"
                  step="0.1"
                  value={standingJumpReach}
                  onChange={(e) => setStandingJumpReach(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded p-4 text-white font-mono text-xl transition-all outline-none"
                  placeholder="e.g. 275"
                />
              </div>

              <div>
                <label className="block text-sm font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  3. Maximum Running Jump Reach (CM)
                </label>

                <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest mb-4">
                  Perform a maximum-effort approach jump and touch the highest point possible.
                </p>

                <input
                  type="number"
                  required
                  min="0.1"
                  step="0.1"
                  value={runningJumpReach}
                  onChange={(e) => setRunningJumpReach(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded p-4 text-white font-mono text-xl transition-all outline-none"
                  placeholder="e.g. 295"
                />
              </div>

            </div>

            {saveError && (
              <div className="p-4 border border-red-600/50 bg-red-900/10 rounded text-red-400 font-mono text-xs">
                {saveError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-white hover:bg-neutral-200 disabled:bg-neutral-700 text-black font-mono text-sm uppercase tracking-widest p-5 rounded font-bold transition-all"
            >
              {isSaving ? 'Saving Results...' : 'Calculate Vertical →'}
            </button>
          </form>

          {standingResult !== null && runningResult !== null && (
            <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

              <div className="text-center p-10 border border-neutral-800 bg-black rounded">
                <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest mb-3">
                  Standing Vertical Jump
                </p>

                <h2 className="text-6xl md:text-8xl font-black text-white">
                  {standingResult.toFixed(1)}
                  <span className="text-2xl md:text-3xl text-neutral-500 ml-2">CM</span>
                </h2>
              </div>

              <div className="text-center p-12 border border-red-600/30 bg-red-900/10 rounded">
                <p className="text-red-600 font-mono text-sm uppercase tracking-widest font-bold mb-4">
                  Running Vertical Jump
                </p>

                <h2 className="text-7xl md:text-9xl font-black text-white">
                  {runningResult.toFixed(1)}
                  <span className="text-2xl md:text-4xl text-neutral-500 ml-2">CM</span>
                </h2>
              </div>

              {saveMessage && (
                <div className="p-5 border border-green-700/50 bg-green-900/10 rounded text-center">
                  <p className="text-green-400 font-mono text-xs uppercase tracking-widest leading-relaxed">
                    {saveMessage}
                  </p>

                  {!isLoggedIn && (
                    <Link
                      href="/login"
                      className="inline-block mt-4 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest px-6 py-3 rounded font-bold transition-all"
                    >
                      Log In To Save Results →
                    </Link>
                  )}
                </div>
              )}

              <div className="space-y-6 pt-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                    Want to improve your vertical?
                  </h3>

                  <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest">
                    Take the next step in your athletic development.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/free-program"
                    className="block text-center bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest p-6 rounded font-bold transition-all shadow-lg shadow-red-600/20"
                  >
                    Get The Free Program →
                  </Link>

                  <Link
                    href="/leaderboard"
                    className="block text-center bg-transparent border border-neutral-700 hover:border-white text-white font-mono text-xs uppercase tracking-widest p-6 rounded font-bold transition-all hover:bg-white hover:text-black"
                  >
                    View Leaderboard →
                  </Link>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
