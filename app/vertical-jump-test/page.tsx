'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function VerticalJumpTestPage() {
  const [standingReach, setStandingReach] = useState('');
  const [maxReach, setMaxReach] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const standing = parseFloat(standingReach);
    const max = parseFloat(maxReach);

    if (standing > 0 && max > standing) {
      setResult(max - standing);
    } else {
      alert('Please enter valid measurements. Maximum jump reach must be higher than standing reach.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="pt-40 pb-20 px-6 border-b border-neutral-900 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold">
            Public Calculator
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
            Test Your <br />
            <span className="text-white">Vertical.</span>
          </h1>
          <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto leading-relaxed">
            Find out exactly where your baseline is. Enter your measurements in centimeters (CM) below.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-950 flex-grow">
        <div className="max-w-2xl mx-auto">
          
          <form onSubmit={handleCalculate} className="space-y-8 bg-black p-8 md:p-12 rounded border border-neutral-800">
            <div className="space-y-6">
              
              {/* Standing Reach */}
              <div>
                <label className="block text-sm font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  1. Standing Reach (CM)
                </label>
                <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest mb-4">
                  Stand flat-footed next to a wall and reach as high as you can with one hand.
                </p>
                <input 
                  type="number" 
                  required
                  min="0"
                  step="0.1"
                  value={standingReach}
                  onChange={(e) => setStandingReach(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded p-4 text-white font-mono text-xl transition-all outline-none"
                  placeholder="e.g. 220"
                />
              </div>

              {/* Maximum Reach */}
              <div>
                <label className="block text-sm font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  2. Maximum Jump Reach (CM)
                </label>
                <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest mb-4">
                  Perform a max effort running jump and touch the highest point possible on the wall.
                </p>
                <input 
                  type="number" 
                  required
                  min="0"
                  step="0.1"
                  value={maxReach}
                  onChange={(e) => setMaxReach(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded p-4 text-white font-mono text-xl transition-all outline-none"
                  placeholder="e.g. 295"
                />
              </div>

            </div>

            <button 
              type="submit" 
              className="w-full bg-white hover:bg-neutral-200 text-black font-mono text-sm uppercase tracking-widest p-5 rounded font-bold transition-all"
            >
              Calculate Vertical
            </button>
          </form>

          {/* RESULTS SECTION - Appears only after calculation */}
          {result !== null && (
            <div className="mt-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* Display Score */}
              <div className="text-center p-12 border border-red-600/30 bg-red-900/10 rounded">
                <p className="text-red-600 font-mono text-sm uppercase tracking-widest font-bold mb-4">
                  Your Vertical
                </p>
                <h2 className="text-7xl md:text-9xl font-black text-white">
                  {result.toFixed(1)} <span className="text-2xl md:text-4xl text-neutral-500">CM</span>
                </h2>
              </div>

              {/* Post-Result Lead Generation Pathways */}
              <div className="space-y-6">
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