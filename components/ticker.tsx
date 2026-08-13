import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export default async function Ticker() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: leaderboard } = await supabase
    .from('vertical_jump_logs')
    .select(`
      running_vertical_cm,
      standing_vertical_cm,
      profiles (*)
    `)
    .eq('is_verified', true)
    .eq('show_on_leaderboard', true)
    .order('running_vertical_cm', { ascending: false })
    .limit(3);

  const athletes = leaderboard || [];

  // Generate the content payload based on whether athletes exist
  const renderContent = () => {
    if (athletes.length === 0) {
      return (
        <span className="flex items-center whitespace-nowrap px-2">
          SRI LANKA DUNKS <span className="mx-4">•</span>
          HOW HIGH CAN YOU GO? <span className="mx-4">•</span>
          <Link href="/vertical-jump-test" className="hover:text-white underline decoration-black/30 underline-offset-4 transition-colors">TAKE THE VERTICAL JUMP TEST</Link> <span className="mx-4">•</span>
          <Link href="/join" className="hover:text-white underline decoration-black/30 underline-offset-4 transition-colors">JOIN THE MOVEMENT</Link> <span className="mx-4">•</span>
        </span>
      );
    }

    return (
      <span className="flex items-center whitespace-nowrap px-2">
        <Link href="/leaderboard" className="hover:text-white transition-colors flex items-center">
          {athletes.map((athlete, index) => {
            const rawProfile = athlete.profiles as any;
            const profile = Array.isArray(rawProfile) ? rawProfile[0] : rawProfile || {};
            const name = profile.first_name ? `${profile.first_name} ${profile.last_name || ''}` : profile.full_name || 'ATHLETE';
            const jump = athlete.running_vertical_cm || athlete.standing_vertical_cm || 0;
            const rank = index + 1;
            return (
              <span key={index} className="flex items-center">
                {rank === 1 && <span className="mr-2">🏆</span>}
                <span className="font-bold">#{rank} {name.toUpperCase()} — {jump} CM</span>
                <span className="mx-4">•</span>
              </span>
            );
          })}
        </Link>
        <Link href="/vertical-jump-test" className="hover:text-white underline decoration-black/30 underline-offset-4 transition-colors">
          HOW HIGH CAN YOU GO?
        </Link>
        <span className="mx-4">•</span>
      </span>
    );
  };

  // Repeat the content blocks so the loop is completely seamless even on ultra-wide 4K monitors
  const repeatingBlocks = Array(4).fill(0).map((_, i) => (
    <div key={i} className="flex items-center">
      {renderContent()}
    </div>
  ));

  return (
    <div className="relative w-full bg-red-600 text-black font-mono text-xs sm:text-sm uppercase tracking-widest overflow-hidden py-2.5 mt-[66px] sm:mt-[86px] md:mt-[106px] z-40 border-b border-red-700">
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: ticker-scroll 35s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-ticker {
            animation: none;
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }
          .ticker-duplicate {
            display: none;
          }
        }
      `}</style>
      <div className="animate-ticker">
        {/* First Half (Translates out) */}
        <div className="flex items-center">
          {repeatingBlocks}
        </div>
        {/* Second Half (Translates in for perfect looping) */}
        <div className="flex items-center ticker-duplicate" aria-hidden="true">
          {repeatingBlocks}
        </div>
      </div>
    </div>
  );
}