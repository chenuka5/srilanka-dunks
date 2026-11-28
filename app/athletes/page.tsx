
import { createServerSupabaseClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const dynamic = 'force-dynamic';

type AthleteProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  sport: string | null;
  city: string | null;
  country: string | null;
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

function getAthleteName(profile: {
  first_name: string | null;
  last_name: string | null;
}) {
  return [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(' ') || 'Sri Lanka Dunks Athlete';
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default async function AthletesPage() {
  const supabase = await createServerSupabaseClient();

  // Fetch public athlete profiles and verified leaderboard results together.
  const [
    { data: athleteData, error: athleteError, count: athleteCount },
    { data: jumpData, error: jumpError },
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select(
        'id, first_name, last_name, avatar_url, sport, city, country',
        { count: 'exact' }
      )
      .eq('is_public', true)
      .order('first_name', { ascending: true })
      .limit(1000),

    supabase
      .from('vertical_jump_logs')
      .select(`
        id,
        running_vertical_cm,
        standing_vertical_cm,
        sport,
        location,
        date_recorded,
        profiles (
          id,
          first_name,
          last_name,
          avatar_url,
          sport,
          city,
          country
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
      .limit(10),
  ]);

  if (athleteError) {
    console.error('Athlete directory error:', athleteError.message);
  }

  if (jumpError) {
    console.error('Leaderboard error:', jumpError.message);
  }

  const athletes = (athleteData || []) as AthleteProfile[];
  const leaderboard = (jumpData || []) as JumpRecord[];

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

      {/* HERO */}
      <section className="pt-40 pb-20 px-6 border-b border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600 font-mono text-xs uppercase tracking-[0.3em] font-bold">
            Sri Lanka Dunks // The Community
          </p>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mt-5">
            Our <span className="text-red-600">Athletes.</span>
          </h1>

          <p className="text-neutral-400 max-w-2xl mx-auto text-sm leading-relaxed mt-6">
            A community built around athletic development, vertical
            jump performance and a shared passion for basketball.
          </p>

          <div className="flex justify-center flex-wrap gap-3 mt-8">
            <div className="border border-neutral-800 px-5 py-3 rounded">
              <p className="text-2xl font-black">
                {athleteCount ?? athletes.length}
              </p>
              <p className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest mt-1">
                Registered Athletes
              </p>
            </div>

            <div className="border border-neutral-800 px-5 py-3 rounded">
              <p className="text-2xl font-black">
                {leaderboard.length}
              </p>
              <p className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest mt-1">
                Verified Rankings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICIAL LEADERBOARD */}
      <section className="py-20 px-6 border-b border-neutral-900">
        <div className="max-w-5xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
            <div>
              <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                Official Rankings
              </p>

              <h2 className="text-3xl md:text-4xl font-black uppercase mt-3">
                Top 10 <span className="text-red-600">Leaderboard.</span>
              </h2>

              <p className="text-neutral-500 text-xs mt-3">
                Ranked by verified running vertical jump performance.
              </p>
            </div>

            <Link
              href="/vertical-jump-test"
              className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-bold px-6 py-4 rounded transition-colors text-center"
            >
              Submit Your Jump →
            </Link>
          </div>

          {jumpError ? (
            <div className="border border-red-900 bg-neutral-950 rounded p-8 text-center">
              <p className="text-red-500 font-mono text-xs uppercase tracking-widest">
                Unable to load leaderboard.
              </p>
            </div>
          ) : leaderboard.length > 0 ? (
            <div className="space-y-3">
              {leaderboard.map((record, index) => {
                const profile = getProfile(record.profiles);

                const name = profile
                  ? getAthleteName(profile)
                  : 'Sri Lanka Dunks Athlete';

                const jumpValue =
                  record.running_vertical_cm ??
                  record.standing_vertical_cm;

                const jumpType =
                  record.running_vertical_cm != null
                    ? 'Running Vertical'
                    : 'Standing Vertical';

                const sport =
                  record.sport || profile?.sport || 'Not specified';

                const location =
                  record.location ||
                  [profile?.city, profile?.country]
                    .filter(Boolean)
                    .join(', ');

                return (
                  <div
                    key={record.id}
                    className={`flex flex-col sm:flex-row sm:items-center gap-5 p-5 sm:p-6 rounded border transition-colors ${
                      index === 0
                        ? 'bg-neutral-950 border-red-600/50'
                        : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
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
                        <span className="text-red-500 text-lg">★</span>
                      )}
                    </div>

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
                            {getInitials(name)}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-black uppercase tracking-tight truncate">
                          {name}
                        </h3>

                        <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest mt-1">
                          {sport}
                          {location ? ` // ${location}` : ''}
                        </p>

                        <p className="text-green-500 font-mono text-[9px] uppercase tracking-widest mt-2">
                          Verified Athlete
                        </p>
                      </div>
                    </div>

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
                        {formatDate(record.date_recorded)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-neutral-950 border border-neutral-800 rounded p-12 text-center">
              <div className="text-4xl text-neutral-700 mb-5">🏆</div>

              <h3 className="text-xl font-black uppercase">
                Rankings Coming Soon
              </h3>

              <p className="text-neutral-500 text-sm mt-3 max-w-md mx-auto leading-relaxed">
                Verified athlete performances will appear here once
                submissions have been reviewed and approved by
                Sri Lanka Dunks.
              </p>

              <Link
                href="/vertical-jump-test"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-bold px-6 py-4 rounded mt-8 transition-colors"
              >
                Record Your Vertical →
              </Link>
            </div>
          )}

          <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest leading-relaxed mt-8 border-t border-neutral-900 pt-6">
            Rankings are based on verified jump submissions approved
            for public display. Only the top 10 approved records are shown.
          </p>
        </div>
      </section>

      {/* REGISTERED ATHLETE DIRECTORY */}
      <section className="py-20 px-6 flex-grow">
        <div className="max-w-7xl mx-auto">

          <div className="mb-10">
            <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
              The Sri Lanka Dunks Community
            </p>

            <h2 className="text-3xl md:text-4xl font-black uppercase mt-3">
              Registered <span className="text-red-600">Athletes.</span>
            </h2>

            <p className="text-neutral-500 text-sm mt-3 max-w-2xl">
              Meet the athletes who are part of the Sri Lanka Dunks
              community. Every registered public athlete has a place here,
              whether they have submitted a jump test or are just getting started.
            </p>
          </div>

          {athleteError ? (
            <div className="border border-red-900 bg-neutral-950 rounded p-8 text-center">
              <p className="text-red-500 font-mono text-xs uppercase tracking-widest">
                Unable to load athlete directory.
              </p>
              <p className="text-neutral-500 text-xs mt-3">
                Please check the public profile permissions in Supabase.
              </p>
            </div>
          ) : athletes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {athletes.map((athlete) => {
                const name = getAthleteName(athlete);

                const location = [
                  athlete.city,
                  athlete.country,
                ]
                  .filter(Boolean)
                  .join(', ');

                return (
                  <div
                    key={athlete.id}
                    className="bg-neutral-950 border border-neutral-800 hover:border-red-600/50 rounded p-6 transition-colors"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-900 border border-neutral-700 flex-shrink-0 flex items-center justify-center">
                        {athlete.avatar_url ? (
                          <img
                            src={athlete.avatar_url}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xl font-black text-neutral-500">
                            {getInitials(name)}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base font-black uppercase tracking-tight truncate">
                          {name}
                        </h3>

                        <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest mt-2">
                          {athlete.sport || 'Athlete'}
                        </p>

                        {location && (
                          <p className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest mt-2 truncate">
                            {location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-neutral-950 border border-neutral-800 rounded p-12 text-center">
              <h3 className="text-xl font-black uppercase">
                The Community Is Growing
              </h3>

              <p className="text-neutral-500 text-sm mt-3">
                Registered public athlete profiles will appear here.
              </p>
            </div>
          )}

          <div className="mt-12 border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest">
              Every athlete. One community. Keep pushing.
            </p>

            <Link
              href="/register"
              className="bg-white hover:bg-neutral-200 text-black font-mono text-xs uppercase tracking-widest font-bold px-6 py-4 rounded transition-colors"
            >
              Join The Community →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
