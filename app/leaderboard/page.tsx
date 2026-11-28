
import { createServerSupabaseClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const dynamic = 'force-dynamic';

type AthleteProfile = {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  sport: string | null;
  city: string | null;
};

type JumpRecord = {
  id: string;
  running_vertical_cm: number | null;
  standing_vertical_cm: number;
  sport: string | null;
  location: string | null;
  date_recorded: string | null;
  profiles: AthleteProfile | AthleteProfile[] | null;
};

function getProfile(
  profile: JumpRecord['profiles']
): AthleteProfile | null {
  if (Array.isArray(profile)) {
    return profile[0] || null;
  }

  return profile;
}

export default async function LeaderboardPage() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('vertical_jump_logs')
    .select(`
      id,
      running_vertical_cm,
      standing_vertical_cm,
      sport,
      location,
      date_recorded,
      profiles (
        first_name,
        last_name,
        avatar_url,
        sport,
        city
      )
    `)
    .eq('is_verified', true)
    .eq('show_on_leaderboard', true)
    .order('running_vertical_cm', {
      ascending: false,
      nullsFirst: false,
    })
    .order('standing_vertical_cm', {
      ascending: false,
    })
    .limit(10);

  if (error) {
    console.error('Leaderboard error:', error.message);
  }

  const athletes = (data || []) as JumpRecord[];

  const formatDate = (date: string | null) => {
    if (!date) return '--';

    return new Date(date).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      {/* LEADERBOARD HERO */}
      <section className="pt-40 pb-16 px-6 border-b border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto text-center">

          <p className="text-red-600 font-mono text-xs uppercase tracking-[0.3em] font-bold">
            Sri Lanka Dunks // Athlete Rankings
          </p>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mt-5">
            The <span className="text-red-600">Leaderboard.</span>
          </h1>

          <p className="text-neutral-500 max-w-2xl mx-auto text-sm leading-relaxed mt-6">
            Recognising the highest verified vertical jump performances
            across the Sri Lanka Dunks athlete community.
          </p>

          <div className="flex justify-center flex-wrap gap-3 mt-8">
            <span className="border border-neutral-800 px-4 py-2 rounded text-neutral-400 font-mono text-[10px] uppercase tracking-widest">
              Top 10 Athletes
            </span>

            <span className="border border-neutral-800 px-4 py-2 rounded text-neutral-400 font-mono text-[10px] uppercase tracking-widest">
              Verified Results Only
            </span>
          </div>
        </div>
      </section>

      {/* RANKINGS */}
      <section className="py-16 px-6 flex-grow">
        <div className="max-w-5xl mx-auto">

          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                Official Rankings
              </p>

              <h2 className="text-2xl md:text-3xl font-black uppercase mt-2">
                Top 10 Athletes
              </h2>
            </div>

            <Link
              href="/vertical-jump-test"
              className="bg-red-600 hover:bg-red-700 text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold px-4 sm:px-6 py-3 rounded transition-colors text-center"
            >
              Submit Your Jump →
            </Link>
          </div>

          {error ? (
            <div className="bg-neutral-950 border border-red-900 rounded p-8 text-center">
              <p className="text-red-500 font-mono text-xs uppercase tracking-widest">
                Unable to load athlete rankings.
              </p>
              <p className="text-neutral-500 text-xs mt-3">
                Please try again later.
              </p>
            </div>
          ) : athletes.length > 0 ? (
            <div className="space-y-3">
              {athletes.map((athlete, index) => {
                const profile = getProfile(athlete.profiles);

                const name = [
                  profile?.first_name,
                  profile?.last_name,
                ]
                  .filter(Boolean)
                  .join(' ') || 'Sri Lanka Dunks Athlete';

                const jumpValue =
                  athlete.running_vertical_cm ??
                  athlete.standing_vertical_cm;

                const jumpType =
                  athlete.running_vertical_cm != null
                    ? 'Running Vertical'
                    : 'Standing Vertical';

                const sport =
                  athlete.sport || profile?.sport || 'Not specified';

                const city =
                  athlete.location || profile?.city || '';

                return (
                  <div
                    key={athlete.id}
                    className={`flex flex-col sm:flex-row sm:items-center gap-5 p-5 sm:p-6 rounded border transition-colors ${
                      index === 0
                        ? 'bg-neutral-950 border-red-600/50'
                        : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    {/* RANK */}
                    <div className="flex items-center gap-4 sm:w-20 flex-shrink-0">
                      <span
                        className={`text-3xl sm:text-4xl font-black ${
                          index === 0
                            ? 'text-red-600'
                            : 'text-neutral-600'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {index === 0 && (
                        <span className="text-red-500 text-lg">
                          ★
                        </span>
                      )}
                    </div>

                    {/* ATHLETE */}
                    <div className="flex items-center gap-4 flex-grow min-w-0">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-900 border border-neutral-700 flex-shrink-0 flex items-center justify-center">
                        {profile?.avatar_url ? (
                          <img
                            src={profile.avatar_url}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xl font-black text-neutral-500">
                            {name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-black uppercase tracking-tight truncate">
                          {name}
                        </h3>

                        <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest mt-1">
                          {sport}
                          {city ? ` // ${city}` : ''}
                        </p>

                        <p className="text-green-500 font-mono text-[9px] uppercase tracking-widest mt-2">
                          Verified Athlete
                        </p>
                      </div>
                    </div>

                    {/* RESULT */}
                    <div className="sm:text-right sm:min-w-[150px]">
                      <p className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest">
                        {jumpType}
                      </p>

                      <p className="text-3xl sm:text-4xl font-black text-white mt-1">
                        {Number(jumpValue).toFixed(1)}
                        <span className="text-sm text-neutral-500 ml-2">
                          CM
                        </span>
                      </p>

                      <p className="text-neutral-600 font-mono text-[9px] uppercase tracking-widest mt-2">
                        {formatDate(athlete.date_recorded)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-neutral-950 border border-neutral-800 rounded p-12 text-center">
              <div className="text-4xl text-neutral-700 mb-5">
                🏆
              </div>

              <h3 className="text-xl font-black uppercase">
                Rankings Coming Soon
              </h3>

              <p className="text-neutral-500 text-sm mt-3 max-w-md mx-auto leading-relaxed">
                Verified athlete performances will appear here once
                submissions have been reviewed and approved by Sri Lanka Dunks.
              </p>

              <Link
                href="/vertical-jump-test"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-bold px-6 py-4 rounded mt-8 transition-colors"
              >
                Record Your Vertical →
              </Link>
            </div>
          )}

          {/* RANKING INFORMATION */}
          <div className="mt-10 border-t border-neutral-900 pt-8">
            <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
              Rankings are based on verified jump submissions approved
              for public display. Only the top 10 approved records are shown.
              Personal contact and emergency information is never displayed.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
