'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function VerticalJumpTestPage() {
  const [standingReach, setStandingReach] = useState('');
  const [maxReach, setMaxReach] = useState('');
  const [score, setScore] = useState<number | null>(null);

  const calculateScore = (e: React.FormEvent) => {
    e.preventDefault();
    const standing = parseFloat(standingReach);
    const max = parseFloat(maxReach);
    if (!isNaN(standing) && !isNaN(max) && max > standing) {
      setScore(max - standing);
    } else {
      alert("Please enter valid numbers. Max reach must be higher than standing reach.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <div className="flex-grow pt-32 pb-24 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        
        <div className="text-center mb-16">
          <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">Assessment</p>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-6">Vertical Jump Test</h1>
          <p className="text-neutral-400 max-w-xl mx-auto text-lg">Calculate your raw vertical jump score. Enter your metrics in centimeters (cm).</p>
        </div>

        {score === null ? (
          <form onSubmit={calculateScore} className="bg-neutral-900 border border-neutral-800 p-6 md:p-12 rounded max-w-2xl mx-auto space-y-8 shadow-2xl">
            <div className="space-y-4">
              <label className="block text-sm font-mono uppercase text-neutral-300">1. Standing Reach (CM)</label>
              <p className="text-xs text-neutral-500 mb-2">Reach as high as possible while standing flat-footed.</p>
              <input 
                type="number" 
                required
                value={standingReach}
                onChange={(e) => setStandingReach(e.target.value)}
                placeholder="e.g. 220" 
                className="w-full bg-black border border-neutral-800 rounded px-6 py-4 text-xl text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-neutral-800" 
              />
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-mono uppercase text-neutral-300">2. Maximum Jump Reach (CM)</label>
              <p className="text-xs text-neutral-500 mb-2">Your highest touch point at the peak of your jump.</p>
              <input 
                type="number" 
                required
                value={maxReach}
                onChange={(e) => setMaxReach(e.target.value)}
                placeholder="e.g. 290" 
                className="w-full bg-black border border-neutral-800 rounded px-6 py-4 text-xl text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-neutral-800" 
              />
            </div>

            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold font-mono uppercase tracking-widest py-5 rounded transition-colors text-lg">
              Calculate Score
            </button>
          </form>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 p-8 md:p-16 rounded max-w-2xl mx-auto text-center animate-in fade-in zoom-in duration-500">
            <p className="text-neutral-400 font-mono uppercase tracking-widest text-sm mb-4">Your Vertical</p>
            <h2 className="text-7xl md:text-9xl font-black text-white mb-2">{score}<span className="text-2xl text-red-500">CM</span></h2>
            
            <div className="border-t border-neutral-800 mt-12 pt-12 space-y-6">
              <h3 className="text-2xl font-bold uppercase tracking-tight">Want to improve your vertical?</h3>
              <p className="text-neutral-400">Get access to our proven training methodology and start adding inches to your bounce.</p>
              <Link href="/join" className="inline-block w-full md:w-auto bg-white text-black hover:bg-neutral-200 font-bold font-mono uppercase tracking-widest text-sm px-10 py-5 rounded transition-colors">
                Get the Free Program →
              </Link>
              <button onClick={() => setScore(null)} className="block w-full text-xs font-mono uppercase text-neutral-500 hover:text-white mt-6 pt-4">
                ← Recalculate
              </button>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </main>
  );
}