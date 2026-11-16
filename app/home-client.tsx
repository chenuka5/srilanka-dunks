
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
    { year: '2024', title: 'The Beginning', href: '/camps', image: '/camps/2024/camp-1.jpg' },
    { year: '2025', title: 'The Next Level', href: '/camps', image: '/camps/2025/camp-1.jpg' },
    { year: 'Upcoming', title: 'Join The Waitlist', href: '/camps', image: '/camps/upcoming.jpg' },
  ];

  useEffect(() => {
    const fetchInitialData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased selection:bg-red-600 selection:text-white">
      <Navbar />

      <div className="mt-[70px] sm:mt-[90px] md:mt-[110px]">
        <Ticker />
      </div>

      
{/* HERO SECTION */}
<section className="relative min-h-screen flex items-center justify-center pt-10 pb-20 px-6 overflow-hidden">
  <div className="absolute inset-0 z-0">
    <img
      src="/hero-bg-.jpg"
      alt="Sri Lanka Dunks vertical jump and athletic performance training"
      

className="w-full h-full object-cover object-[center_65%] md:object-[center_25%] opacity-55 filter grayscale contrast-125 brightness-105"


    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black z-10" />
  </div>

  <div className="relative z-20 max-w-5xl mx-auto text-center space-y-8 mt-12">
    <h1 className="text-6xl md:text-8xl lg:text-[140px] font-black uppercase tracking-tighter leading-[0.85]">
      Rise <br />
      <span className="text-red-600">Above.</span>
    </h1>

    <p className="text-neutral-300 font-mono text-sm md:text-base max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
  Vertical jump training, explosive power and athletic performance development for the next generation of Sri Lankan athletes.
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


      {/* SMART DASHBOARD — ONLY VISIBLE IF LOGGED IN */}
      {user && (
        <section className="py-12 px-6 border-t border-neutral-900 bg-neutral-950 relative z-30">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h2 className="text-sm font-mono text-neutral-400 uppercase tracking-widest">
                Athlete Access Active // <span className="text-white">{user.email}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black border border-neutral-800 p-8 rounded group hover:border-red-600 transition-colors">
                <span className="text-red-600 font-mono text-[10px] uppercase tracking-widest border border-red-600/30 bg-red-900/10 px-2 py-1 rounded inline-block mb-4">
                  Current Protocol
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">4-Week Jump Starter</h3>
                <p className="text-neutral-500 font-mono text-xs mb-8">
                  Pick up exactly where you left off. Access your daily movements, sets, and reps.
                </p>
                <Link
                  href="/dashboard/workouts"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest px-6 py-3 rounded font-bold shadow-lg shadow-red-600/20 transition-all group-hover:scale-105"
                >
                  Resume Training →
                </Link>
              </div>

              <div className="bg-black border border-neutral-800 p-8 rounded group hover:border-white transition-colors">
                <span className="text-neutral-400 font-mono text-[10px] uppercase tracking-widest border border-neutral-700 bg-neutral-900 px-2 py-1 rounded inline-block mb-4">
                  Data Hub
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Metrics &amp; Logs</h3>
                <p className="text-neutral-500 font-mono text-xs mb-8">
                  Submit a new vertical jump score or review your personal athletic history.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/dashboard"
                    className="inline-block bg-white hover:bg-neutral-200 text-black font-mono text-xs uppercase tracking-widest px-6 py-3 rounded font-bold transition-all group-hover:scale-105"
                  >
                    Log A Jump →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      
{/* MISSION SECTION */}
<section className="relative isolate overflow-hidden border-t border-neutral-900 bg-black">
  {/* Background photo */}
  <img
    src="/goal-was-never-to-dunk.jpg"
    alt="Basketball athlete performing an explosive dunk"
    className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_35%]"
    loading="lazy"
  />

  {/* Dark cinematic overlay */}
  <div className="absolute inset-0 -z-10 bg-black/55" />
  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/45 to-black/25" />
  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/65 via-transparent to-black/30" />

  <div className="relative mx-auto flex min-h-[480px] max-w-7xl items-center justify-center px-6 py-24 md:min-h-[560px] md:py-32">
    <div className="max-w-5xl space-y-5 text-center">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-red-600 md:text-sm">
        Sri Lanka Dunks · Our Philosophy
      </p>

      <h2 className="text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-6xl lg:text-7xl">
        The goal was never to dunk.
      </h2>

      <h3 className="text-3xl font-black uppercase leading-tight tracking-tight text-red-600 sm:text-4xl md:text-6xl lg:text-7xl">
        It was to build better athletes.
      </h3>
    </div>
  </div>
</section>



{/* OUR JOURNEY SECTION */}
<section className="py-24 px-6 border-t border-neutral-900 bg-neutral-950">
  <div className="max-w-7xl mx-auto">
    
<h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-14 text-center">
  Our <span className="text-red-600">Journey</span>
</h2>


    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* 2024 */}
      <div className="border border-neutral-800 rounded bg-black relative overflow-hidden group hover:border-red-600 transition-colors">
        <div className="h-56 relative overflow-hidden">
          <img
            src="/camps/2024/camp-1.jpg"
            alt="Sri Lanka Dunks first Vertical Jump Camp in 2024"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <span className="absolute top-4 left-4 text-xs font-mono uppercase tracking-widest text-white bg-black/70 border border-white/10 px-3 py-2">
            2024
          </span>
        </div>

        <div className="p-8">
          <h3 className="text-xl font-bold uppercase tracking-tight mb-4">
            The Beginning
          </h3>
          <p className="text-neutral-400 font-mono text-xs leading-relaxed">
            Sri Lanka Dunks launched and conducted its first Vertical Jump Camp.
          </p>
        </div>
      </div>

      {/* 2025 */}
      <div className="border border-neutral-800 rounded bg-black relative overflow-hidden group hover:border-red-600 transition-colors">
        <div className="h-56 relative overflow-hidden">
          <img
            src="/camps/2025/camp-1.jpg"
            alt="Sri Lanka Dunks Vertical Jump Camp in 2025"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <span className="absolute top-4 left-4 text-xs font-mono uppercase tracking-widest text-white bg-black/70 border border-white/10 px-3 py-2">
            2025
          </span>
        </div>

        <div className="p-8">
          <h3 className="text-xl font-bold uppercase tracking-tight mb-4">
            The Next Level
          </h3>
          <p className="text-neutral-400 font-mono text-xs leading-relaxed">
            Sri Lanka Dunks returned with another Vertical Jump Camp.
          </p>
        </div>
      </div>

      {/* 2026+ */}
      <div className="border border-neutral-800 rounded bg-black relative overflow-hidden group hover:border-red-600 transition-colors">
        
<div className="h-56 relative overflow-hidden bg-neutral-900 flex items-center justify-center">
  <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-red-950/40" />

  <div className="relative text-center">
    <span className="block text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
      2026+
    </span>
    <span className="block mt-3 text-xs font-mono uppercase tracking-[0.3em] text-red-600">
      Coming Soon
    </span>
  </div>

  <span className="absolute top-4 left-4 text-xs font-mono uppercase tracking-widest text-white bg-black/70 border border-white/10 px-3 py-2">
    The Future
  </span>
</div>


        <div className="p-8">
          <h3 className="text-xl font-bold uppercase tracking-tight mb-4">
            <span className="text-red-600">The Movement</span>
          </h3>
          <p className="text-neutral-400 font-mono text-xs leading-relaxed">
            Building the online athletic performance community and future training ecosystem.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



{/* BUILT FOR PERFORMANCE SECTION */}
<section className="py-24 px-6 border-t border-neutral-900 bg-black">
  <div className="max-w-7xl mx-auto">

    {/* SECTION HEADING */}
    <div className="text-center mb-14">
      <h2 className="text-sm font-mono text-red-600 uppercase tracking-widest mb-4">
        Training Methodology
      </h2>

      <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
        Built For <span className="text-red-600">Performance</span>
      </h3>

      <p className="text-neutral-400 mt-5 max-w-2xl mx-auto leading-relaxed">
        A structured approach to developing explosive power, athletic strength,
        speed and long-term performance.
      </p>
    </div>

    {/* TRAINING PILLARS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

      {/* 01 — EXPLOSIVE JUMP TRAINING */}
      <div className="group relative min-h-[320px] overflow-hidden rounded border border-neutral-800 bg-neutral-900">
        <img
          src="/explosive-jump-training.jpg"
          alt="Athlete performing explosive jump training over hurdles"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="text-red-600 font-mono text-xs uppercase tracking-widest">01 / Jump Performance</span>
          <h4 className="mt-2 text-xl font-black uppercase tracking-tight text-white">Explosive Jump Training</h4>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            Develop take-off mechanics, force production and vertical leap.
          </p>
        </div>
      </div>

      {/* 02 — STRENGTH & CONDITIONING */}
      <div className="group relative min-h-[320px] overflow-hidden rounded border border-neutral-800 bg-neutral-900">
        <img
          src="/strength-conditioning.jpg"
          alt="Athlete performing a trap-bar strength training"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="text-red-600 font-mono text-xs uppercase tracking-widest">02 / Foundation</span>
          <h4 className="mt-2 text-xl font-black uppercase tracking-tight text-white">Strength &amp; Conditioning</h4>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            Build the strength and physical foundation for athletic performance.
          </p>
        </div>
      </div>

      {/* 03 — POWER */}
      <div className="group relative min-h-[320px] overflow-hidden rounded border border-neutral-800 bg-neutral-900">
        <img
          src="/power-training.jpg"
          alt="Athlete developing explosive power through strength training"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="text-red-600 font-mono text-xs uppercase tracking-widest">03 / Force &amp; Velocity</span>
          <h4 className="mt-2 text-xl font-black uppercase tracking-tight text-white">Power Development</h4>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            Train the ability to produce force quickly for explosive movement.
          </p>
        </div>
      </div>

      {/* 04 — PLYOMETRICS */}
      <div className="group relative min-h-[320px] overflow-hidden rounded border border-neutral-800 bg-neutral-900">
        <img
          src="/plyometrics.jpg"
          alt="Athlete standing on a padded plyometric box"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="text-red-600 font-mono text-xs uppercase tracking-widest">04 / Reactive Ability</span>
          <h4 className="mt-2 text-xl font-black uppercase tracking-tight text-white">Plyometrics</h4>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            Develop reactive strength, landing control and fast ground contacts.
          </p>
        </div>
      </div>

      {/* 05 — SPEED */}
      <div className="group relative min-h-[320px] overflow-hidden rounded border border-neutral-800 bg-neutral-900">
        <img
          src="/speed-training.jpg"
          alt="Athlete practising speed and change of direction drills"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="text-red-600 font-mono text-xs uppercase tracking-widest">05 / Movement</span>
          <h4 className="mt-2 text-xl font-black uppercase tracking-tight text-white">Speed &amp; Agility</h4>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            Improve acceleration, deceleration and change-of-direction ability.
          </p>
        </div>
      </div>

      {/* 06 — ATHLETE DEVELOPMENT */}
      <div className="group relative min-h-[320px] overflow-hidden rounded border border-neutral-800 bg-neutral-900">
        <img
          src="/athlete-development.jpg"
          alt="Athlete performing plyometric jump training"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="text-red-600 font-mono text-xs uppercase tracking-widest">06 / Long-Term Growth</span>
          <h4 className="mt-2 text-xl font-black uppercase tracking-tight text-white">Athlete Development</h4>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            Build movement quality, physical resilience and long-term athletic foundations.
          </p>
        </div>
      </div>

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
              <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-2">
                The leaderboard is just getting started.
              </h4>
              <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest mb-6">
                Be the first to make your mark.
              </p>
              <Link href="/vertical-jump-test" className="text-red-600 hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors">
                Test Your Vertical →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {athletes.map((athlete, index) => {
                const rawProfile = athlete.profiles as any;
                const profile = Array.isArray(rawProfile) ? rawProfile[0] : rawProfile || {};

                const name = profile.first_name
                  ? `${profile.first_name} ${profile.last_name || ''}`
                  : profile.full_name || 'Anonymous Athlete';
                const jump = athlete.running_vertical_cm || athlete.standing_vertical_cm || 0;
                const rank = index + 1;
                const isRank1 = rank === 1;

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 sm:p-6 rounded border transition-all ${
                      isRank1 ? 'bg-black border-yellow-500' : 'bg-neutral-900 border-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className={`text-2xl sm:text-3xl font-black ${isRank1 ? 'text-yellow-500' : 'text-neutral-600'}`}>
                        0{rank}
                      </span>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white">{name}</h4>
                        <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest hidden sm:block">
                          {athlete.sport || 'Unknown Sport'}
                        </p>
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
            No Shortcuts.<br />
            No Magic Formula.<br />
            <span className="text-black">Just Better Training.</span>
          </p>
        </div>
      </section>

     
{/* CAMPS SECTION */}
<section className="py-24 px-6 bg-black border-t border-neutral-900">
  <div className="max-w-7xl mx-auto">
    <div className="mb-12">
      <h2 className="text-sm font-mono text-red-600 uppercase tracking-widest mb-4">
        Get Involved
      </h2>
      <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
        Upcoming Camp
      </h3>
      <p className="text-neutral-400 mt-4 max-w-xl">
        Join our free online vertical jump webinar and take the next step in your athletic journey.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Link
        href="/camps"
        className="group block border border-neutral-800 rounded bg-neutral-950 overflow-hidden hover:border-red-600 transition-colors"
      >
        <div className="h-64 md:h-80 bg-neutral-900 relative overflow-hidden">
          <img
            src="/camps/upcoming.jpg"
            alt="Sri Lanka Dunks upcoming online webinar"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 bg-red-600 px-3 py-2">
            <span className="text-white font-mono text-xs uppercase tracking-widest font-bold">
              Free Online Webinar
            </span>
          </div>
        </div>

        <div className="p-6 flex justify-between items-center gap-4">
          <div>
            <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold mb-2">
              28 November 2026
            </p>
            <h4 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white">
              Join The Waitlist
            </h4>
          </div>
          <span className="text-neutral-600 group-hover:text-red-600 transition-colors text-2xl">
            →
          </span>
        </div>
      </Link>
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
              How High<br />
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
