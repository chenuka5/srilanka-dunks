'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Ticker from '@/components/ticker';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const [athletes, setAthletes] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const performancePillars = [
    { title: 'Vertical Jump', desc: 'Force production, elasticity, and jump biomechanics.' },
    { title: 'Strength', desc: 'Building the lower-body foundation for explosive power.' },
    { title: 'Power', desc: 'Maximum force generation in minimal time.' },
    { title: 'Plyometrics', desc: 'Tendon stiffness and reactive ground contact times.' },
    { title: 'Speed', desc: 'Acceleration mechanics and multi-directional quickness.' },
    { title: 'Athlete Development', desc: 'Long-term structural resilience and joint health.' },
  ];

  const camps = [
    { year: '2024', title: 'The Beginning', href: '/camps/2024' },
    { year: '2025', title: 'The Next Level', href: '/camps/2025' },
    { year: 'Upcoming', title: 'Join The Waitlist', href: '/camps/upcoming' },
  ];

  useEffect(() => {
    const fetchInitialData = async () => {
      // 1. Get current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // 2. Fetch Top 5 Leaderboard
      const { data: leaderboard } = await supabase
        .from('vertical_jump_logs')
        .select(`
          running_vertical_cm,
          standing_vertical_cm,
          sport,
          location,
          profiles (*)
        `)
        .eq('is_verified', true)
        .eq('show_on_leaderboard', true)
        .order('running_vertical_cm', { ascending: false })
        .limit(5);

      if (leaderboard) setAthletes(leaderboard);
    };

    fetchInitialData();

    // 3. Listen for login/logout events in real-time
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased selection:bg-red-600 selection:text-white">
      <Navbar />
      
      <Ticker />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-10 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2071&auto=format&fit=crop" 
            alt="Athletic Performance" 
            className="w-full h-full object-cover object-top opacity-40 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-8 mt-12">
          <h1 className="text-6xl md:text-8xl lg:text-[140px] font-black uppercase tracking-tighter leading-[0.85]">
            Rise <br />
            <span className="text-red-600">Above.</span>
          </h1>
          
          <p className="text-neutral-300 font-mono text-sm md:text-base max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
            Modern athletic performance training for the next generation of Sri Lankan athletes.
          </p>

          {!user && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link 
                href="/vertical-jump-test" 
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-mono text-xs md:text-sm uppercase tracking-widest px-8 py-4 rounded transition-all font-bold shadow-lg shadow-red-600/20 hover:scale-105"
              >
                Take The Vertical Jump Test →
              </Link>
              <Link 
                href="/join" 
                className="w-full sm:w-auto bg-transparent border border-neutral-700 hover:border-white text-white font-mono text-xs md:text-sm uppercase tracking-widest px-8 py-4 rounded transition-all font-bold hover:bg-white hover:text-black"
              >
                Join The Movement →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* --- SMART DASHBOARD INJECTION (ONLY VISIBLE IF LOGGED IN) --- */}
      {user && (
        <section className="py-12 px-6 border-t border-neutral-900 bg-neutral-950 relative z-30">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <h2 className="text-sm font-mono text-neutral-400 uppercase tracking-widest">
                Athlete Access Active // <span className="text-white">{user.email}</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Training Quick Launch */}
              <div className="bg-black border border-neutral-800 p-8 rounded group hover:border-red-600 transition-colors">
                <span className="text-red-600 font-mono text-[10px] uppercase tracking-widest border border-red-600/30 bg-red-900/10 px-2 py-1 rounded inline-block mb-4">Current Protocol</span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">4-Week Jump Starter</h3>
                <p className="text-neutral-500 font-mono text-xs mb-8">Pick up exactly where you left off. Access your daily movements, sets, and reps.</p>
                <Link href="/dashboard/workouts" className="inline-block bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest px-6 py-3 rounded font-bold shadow-lg shadow-red-600/20 transition-all group-hover:scale-105">
                  Resume Training →
                </Link>
              </div>

              {/* Data & Metrics Quick Launch */}
              <div className="bg-black border border-neutral-800 p-8 rounded group hover:border-white transition-colors">
                 <span className="text-neutral-400 font-mono text-[10px] uppercase tracking-widest border border-neutral-700 bg-neutral-900 px-2 py-1 rounded inline-block mb-4">Data Hub</span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Metrics & Logs</h3>
                <p className="text-neutral-500 font-mono text-xs mb-8">Submit a new vertical jump score or review your personal athletic history.</p>
                <div className="flex gap-4">
                  <Link href="/dashboard" className="inline-block bg-white hover:bg-neutral-200 text-black font-mono text-xs uppercase tracking-widest px-6 py-3 rounded font-bold transition-all group-hover:scale-105">
                    Log A Jump →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MISSION SECTION */}
      <section className="py-32 px-6 border-t border-neutral-900 bg-black">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
            The goal was never just to dunk.
          </h2>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-red-600">
            It was to build better athletes.
          </h3>
        </div>
      </section>

      {/* OUR JOURNEY SECTION */}
      <section className="py-24 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-mono text-red-600 uppercase tracking-widest mb-12 text-center">
            Our Journey
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-neutral-800 p-8 rounded bg-black relative overflow-hidden group hover:border-red-600 transition-colors">
              <span className="text-5xl font-black text-neutral-900 absolute -top-4 -right-4 group-hover:text-red-900/20 transition-colors">2024</span>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 relative z-10">2024<br/><span className="text-red-600">The Beginning</span></h3>
              <p className="text-neutral-400 font-mono text-xs leading-relaxed relative z-10">Sri Lanka Dunks launched and conducted its first Vertical Jump Camp.</p>
            </div>
            <div className="border border-neutral-800 p-8 rounded bg-black relative overflow-hidden group hover:border-red-600 transition-colors">
              <span className="text-5xl font-black text-neutral-900 absolute -top-4 -right-4 group-hover:text-red-900/20 transition-colors">2025</span>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 relative z-10">2025<br/><span className="text-red-600">The Next Level</span></h3>
              <p className="text-neutral-400 font-mono text-xs leading-relaxed relative z-10">Sri Lanka Dunks returned with another Vertical Jump Camp.</p>
            </div>
            <div className="border border-neutral-800 p-8 rounded bg-black relative overflow-hidden group hover:border-gold-500 hover:border-yellow-500 transition-colors">
              <span className="text-5xl font-black text-neutral-900 absolute -top-4 -right-4 group-hover:text-yellow-900/20 transition-colors">2026+</span>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4 relative z-10">2026+<br/><span className="text-yellow-500">The Movement</span></h3>
              <p className="text-neutral-400 font-mono text-xs leading-relaxed relative z-10">Building the online athletic performance community and future training ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BUILT FOR PERFORMANCE SECTION */}
      <section className="py-32 px-6 border-t border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-mono text-red-600 uppercase tracking-widest mb-4">Training Methodology</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Built For Performance</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {performancePillars.map((pillar, idx) => (
              <div key={idx} className="border border-neutral-800 p-8 rounded hover:bg-neutral-900 transition-colors">
                <h4 className="text-xl font-bold uppercase tracking-tight mb-2">{pillar.title}</h4>
                <p className="text-neutral-500 font-mono text-xs leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP 5 LEADERBOARD SECTION */}
      <section className="py-32 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-mono text-red-600 uppercase tracking-widest font-bold">Top Athletes</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">Leaderboard</h3>
          </div>
          
          {athletes.length === 0 ? (
            <div className="text-center py-12 border border-neutral-800 rounded bg-black">
              <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-2">The leaderboard is just getting started.</h4>
              <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest mb-6">Be the first to make your mark.</p>
              <Link href="/vertical-jump-test" className="text-red-600 hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors">
                Test Your Vertical →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {athletes.map((athlete, index) => {
                const rawProfile = athlete.profiles as any;
                const profile = Array.isArray(rawProfile) ? rawProfile[0] : rawProfile || {};
                
                const name = profile.first_name ? `${profile.first_name} ${profile.last_name || ''}` : profile.full_name || 'Anonymous Athlete';
                const jump = athlete.running_vertical_cm || athlete.standing_vertical_cm || 0;
                const rank = index + 1;
                const isRank1 = rank === 1;

                return (
                  <div key={index} className={`flex items-center justify-between p-4 sm:p-6 rounded border transition-all ${isRank1 ? 'bg-black border-yellow-500' : 'bg-neutral-900 border-neutral-800'}`}>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className={`text-2xl sm:text-3xl font-black ${isRank1 ? 'text-yellow-500' : 'text-neutral-600'}`}>0{rank}</span>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white">{name}</h4>
                        <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest hidden sm:block">{athlete.sport || 'Unknown Sport'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-2xl sm:text-3xl font-black uppercase ${isRank1 ? 'text-yellow-500' : 'text-white'}`}>
                        {jump} <span className="text-sm sm:text-base text-neutral-500">CM</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/leaderboard" className="inline-block bg-transparent border border-neutral-700 hover:border-white text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded font-bold transition-all hover:bg-white hover:text-black">
              View Full Leaderboard →
            </Link>
          </div>
        </div>
      </section>

      {/* THE PHILOSOPHY SECTION */}
      <section className="py-32 px-6 border-t border-neutral-900 bg-red-600 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-sm font-mono text-black uppercase tracking-widest font-bold">The Philosophy</h2>
          <p className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            No Shortcuts.<br/>
            No Magic Formula.<br/>
            <span className="text-black">Just Better Training.</span>
          </p>
        </div>
      </section>

      {/* CAMPS SECTION */}
      <section className="py-32 px-6 bg-black border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-sm font-mono text-red-600 uppercase tracking-widest mb-4">In-Person Training</h2>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Camps</h3>
            </div>
            <Link href="/camps" className="text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors">
              View All Events →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {camps.map((camp, idx) => (
              <Link key={idx} href={camp.href} className="group block border border-neutral-800 rounded bg-neutral-950 overflow-hidden hover:border-red-600 transition-colors">
                <div className="h-48 bg-neutral-900 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-800 font-mono text-xs uppercase tracking-widest">
                    Media Placeholder
                  </div>
                </div>
                <div className="p-6 flex justify-between items-center">
                  <div>
                    <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold mb-1">{camp.year}</p>
                    <h4 className="text-xl font-bold uppercase tracking-tight text-white">{camp.title}</h4>
                  </div>
                  <span className="text-neutral-600 group-hover:text-red-600 transition-colors">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VISION & FINAL CTA SECTION */}
      <section className="py-32 px-6 border-t border-neutral-900 bg-neutral-950 text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-neutral-400">
              Sri Lanka has the talent.
            </h2>
            <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white">
              We want to build the system around it.
            </h3>
          </div>
          
          <div className="pt-12 border-t border-neutral-900">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-8">
              How High<br/>
              <span className="text-red-600">Can You Go?</span>
            </h2>
            
            <Link 
              href="/join" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-mono text-xs md:text-sm uppercase tracking-widest px-10 py-5 rounded font-bold shadow-lg shadow-red-600/20 hover:scale-105 transition-all"
            >
              Join The Movement →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}