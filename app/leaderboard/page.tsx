import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Ensure the page always fetches the latest verified jumps (no stale caching)
export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() {
  // Initialize Supabase using your public Vercel environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch Top 10 Verified Jumps based on Running Vertical CM
  const { data: leaderboard, error } = await supabase
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
    .limit(10);

  const athletes = leaderboard || [];

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      {/* Header Section */}
      <section className="pt-40 pb-20 px-6 border-b border-neutral-900 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            How High <br />
            <span className="text-red-600">Can You Go?</span>
          </h1>
          <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto leading-relaxed uppercase tracking-widest">
            The Sri Lanka Dunks Vertical Jump Leaderboard
          </p>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-24 px-6 bg-neutral-950 flex-grow">
        <div className="max-w-4xl mx-auto">
          
          {/* EMPTY STATE */}
          {athletes.length === 0 ? (
            <div className="text-center py-20 border border-neutral-800 rounded bg-black">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-4">
                The leaderboard is just getting started.
              </h3>
              <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest mb-8">
                Be the first to make your mark.
              </p>
              <Link 
                href="/vertical-jump-test" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded font-bold transition-all shadow-lg shadow-red-600/20"
              >
                Test Your Vertical →
              </Link>
            </div>
          ) : (
            /* RANKING STATE */
            <div className="space-y-4">
              {athletes.map((athlete, index) => {
                // FIX: Safely cast and extract the profile whether it's an array or object
                const rawProfile = athlete.profiles as any;
                const profile = Array.isArray(rawProfile) ? rawProfile[0] : rawProfile || {};
                
                const name = profile.first_name 
                  ? `${profile.first_name} ${profile.last_name || ''}` 
                  : profile.full_name || 'Anonymous Athlete';
                
                const jump = athlete.running_vertical_cm || athlete.standing_vertical_cm || 0;
                const sport = athlete.sport || 'Unknown Sport';
                const location = athlete.location || 'Unknown Location';
                const rank = index + 1;

                // Visual styling emphasis for Top 3
                const isRank1 = rank === 1;
                const isTop3 = rank <= 3;

                return (
                  <div 
                    key={index} 
                    className={`flex flex-col sm:flex-row items-center justify-between p-6 rounded border transition-all ${
                      isRank1 
                        ? 'bg-black border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.15)] scale-[1.02]' 
                        : isTop3 
                          ? 'bg-black border-red-600' 
                          : 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    {/* Rank & Demographics */}
                    <div className="flex items-center gap-6 w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0">
                      <span className={`text-4xl md:text-5xl font-black ${isRank1 ? 'text-yellow-500' : 'text-neutral-700'}`}>
                        {rank < 10 ? `0${rank}` : rank}
                      </span>
                      <div>
                        <h4 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white">
                          {name}
                        </h4>
                        <p className="text-neutral-500 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-1">
                          {sport} • {location}
                        </p>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-center sm:text-right">
                      <span className={`text-4xl md:text-5xl font-black uppercase ${isRank1 ? 'text-yellow-500' : 'text-white'}`}>
                        {jump} <span className="text-lg md:text-2xl text-neutral-500">CM</span>
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="text-center pt-12 mt-12 border-t border-neutral-900">
                <Link 
                  href="/vertical-jump-test" 
                  className="inline-block bg-transparent border border-neutral-700 hover:border-white text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded font-bold transition-all hover:bg-white hover:text-black"
                >
                  Test Your Vertical →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}