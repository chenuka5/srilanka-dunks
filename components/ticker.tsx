'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function Ticker() {
  const [athletes, setAthletes] = useState<any[]>([]);

  useEffect(() => {
    const fetchTicker = async () => {
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

      setAthletes(leaderboard || []);
    };

    fetchTicker();
  }, []);

  const renderContent = () => {
    if (athletes.length === 0) {
      return (
        <span className="inline-flex h-full items-center whitespace-nowrap px-2">
          SRI LANKA DUNKS <span className="mx-3">•</span>
          HOW HIGH CAN YOU GO? <span className="mx-3">•</span>
          <Link href="/vertical-jump-test" className="hover:text-white underline underline-offset-4">
            TAKE THE VERTICAL JUMP TEST
          </Link>
          <span className="mx-3">•</span>
          <Link href="/join" className="hover:text-white underline underline-offset-4">
            JOIN THE MOVEMENT
          </Link>
          <span className="mx-3">•</span>
        </span>
      );
    }

    return (
      <span className="inline-flex h-full items-center whitespace-nowrap px-2">
        <Link href="/leaderboard" className="inline-flex items-center hover:text-white">
          {athletes.map((athlete, index) => {
            const rawProfile = athlete.profiles as any;
            const profile = Array.isArray(rawProfile)
              ? rawProfile[0]
              : rawProfile || {};

            const name = profile.first_name
              ? `${profile.first_name} ${profile.last_name || ''}`
              : profile.full_name || 'ATHLETE';

            const jump =
              athlete.running_vertical_cm ||
              athlete.standing_vertical_cm ||
              0;

            return (
              <span key={index} className="inline-flex items-center">
                {index === 0 && <span className="mr-2">🏆</span>}
                <span className="font-bold">
                  #{index + 1} {name.toUpperCase()} — {jump} CM
                </span>
                <span className="mx-3">•</span>
              </span>
            );
          })}
        </Link>

        <Link href="/vertical-jump-test" className="hover:text-white underline underline-offset-4">
          HOW HIGH CAN YOU GO?
        </Link>
        <span className="mx-3">•</span>
      </span>
    );
  };

  const repeatingBlocks = Array(4).fill(0).map((_, index) => (
    <div key={index} className="flex h-full shrink-0 items-center">
      {renderContent()}
    </div>
  ));

  return (
    <div className="relative z-40 h-7 w-full overflow-hidden border-b border-red-700 bg-red-600 font-mono text-[10px] leading-none uppercase tracking-wider text-black sm:text-xs">
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-ticker {
  display: flex;
  align-items: center;
  width: max-content;
  height: 100%;
  animation: ticker-scroll 35s linear infinite;
}
        }

        .animate-ticker:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-ticker {
            animation: none;
            width: 100%;
            justify-content: center;
          }

          .ticker-duplicate {
            display: none;
          }
        }
      `}</style>

      <div className="animate-ticker flex items-center">
        <div className="flex h-full items-center">
          {repeatingBlocks}
        </div>

        <div
          className="ticker-duplicate flex h-full items-center"
          aria-hidden="true"
        >
          {repeatingBlocks}
        </div>
      </div>
    </div>
  );
}