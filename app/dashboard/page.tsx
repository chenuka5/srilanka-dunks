
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const dynamic = 'force-dynamic';

const PROGRAM_TITLE =
  'Sri Lanka Dunks - 6-Week Beginner Vertical Jump Programme';

const WEEK_NAMES = [
  'Foundations',
  'Strength & Balance',
  'Landing Preparation',
  'Jump Technique',
  'Power Development',
  'Consolidation',
];

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  // FETCH ATHLETE PROFILE
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, avatar_url, role')
    .eq('id', user.id)
    .maybeSingle();

  const firstName =
    profile?.first_name ||
    user.user_metadata?.first_name ||
    user.email?.split('@')[0] ||
    'Athlete';

  const fullName =
    [profile?.first_name, profile?.last_name]
      .filter(Boolean)
      .join(' ') || firstName;

  // FETCH SIX-WEEK PROGRAMME
  const { data: program, error: programError } = await supabase
    .from('programs')
    .select('id, title')
    .eq('title', PROGRAM_TITLE)
    .maybeSingle();

  if (programError) {
    console.error('Programme lookup error:', programError.message);
  }

  let weeks: any[] = [];
  let workouts: any[] = [];
  let setCompletions: any[] = [];

  if (program) {
    // FETCH PROGRAMME WEEKS
    const { data: weekData, error: weeksError } = await supabase
      .from('program_weeks')
      .select('id, week_number, focus_description')
      .eq('program_id', program.id)
      .order('week_number', { ascending: true });

    if (weeksError) {
      console.error('Programme weeks error:', weeksError.message);
    }

    weeks = weekData || [];

    const weekIds = weeks.map((week) => week.id);

    if (weekIds.length > 0) {
      // FETCH WORKOUTS AND THEIR EXERCISE SET REQUIREMENTS
      const { data: workoutData, error: workoutsError } = await supabase
        .from('workouts')
        .select(`
          id,
          title,
          week_id,
          workout_exercises (
            id,
            sets
          )
        `)
        .in('week_id', weekIds);

      if (workoutsError) {
        console.error('Dashboard workouts error:', workoutsError.message);
      }

      workouts = workoutData || [];

      const workoutExerciseIds = workouts.flatMap((workout) =>
        (workout.workout_exercises || []).map(
          (exercise: any) => exercise.id
        )
      );

      if (workoutExerciseIds.length > 0) {
        // FETCH THIS ATHLETE'S SAVED SET COMPLETIONS
        const { data: completionData, error: completionError } =
          await supabase
            .from('workout_set_completions')
            .select('workout_exercise_id, set_number')
            .eq('profile_id', user.id)
            .in('workout_exercise_id', workoutExerciseIds);

        if (completionError) {
          console.error(
            'Dashboard set completion error:',
            completionError.message
          );
        }

        setCompletions = completionData || [];
      }
    }
  }

  // BUILD A SET COMPLETION LOOKUP
  const completedSetKeys = new Set(
    setCompletions.map(
      (item) => `${item.workout_exercise_id}-${item.set_number}`
    )
  );

  // CALCULATE TOTAL AND COMPLETED SETS
  let totalSets = 0;
  let completedSets = 0;

  workouts.forEach((workout) => {
    (workout.workout_exercises || []).forEach((exercise: any) => {
      const prescribedSets = Math.max(0, Number(exercise.sets) || 0);

      totalSets += prescribedSets;

      for (let setNumber = 1; setNumber <= prescribedSets; setNumber++) {
        const key = `${exercise.id}-${setNumber}`;

        if (completedSetKeys.has(key)) {
          completedSets++;
        }
      }
    });
  });

  // A SESSION COUNTS AS COMPLETED ONLY WHEN ALL ITS SETS ARE DONE.
  const completedWorkoutIds = new Set(
    workouts
      .filter((workout) => {
        const exercises = workout.workout_exercises || [];

        if (exercises.length === 0) return false;

        const expectedSets = exercises.reduce(
          (total: number, exercise: any) =>
            total + Math.max(0, Number(exercise.sets) || 0),
          0
        );

        if (expectedSets === 0) return false;

        const completedCount = exercises.reduce(
          (total: number, exercise: any) => {
            const prescribedSets = Math.max(
              0,
              Number(exercise.sets) || 0
            );

            let exerciseCompleted = 0;

            for (
              let setNumber = 1;
              setNumber <= prescribedSets;
              setNumber++
            ) {
              if (
                completedSetKeys.has(
                  `${exercise.id}-${setNumber}`
                )
              ) {
                exerciseCompleted++;
              }
            }

            return total + exerciseCompleted;
          },
          0
        );

        return completedCount === expectedSets;
      })
      .map((workout) => workout.id)
  );

  const totalWorkouts = workouts.length;
  const completedWorkouts = completedWorkoutIds.size;

  // OVERALL PROGRESS IS BASED ON COMPLETED SETS.
  const programmeProgress =
    totalSets > 0
      ? Math.round((completedSets / totalSets) * 100)
      : 0;

  // WEEKLY SESSION COMPLETION
  const weeklyProgress = weeks.map((week) => {
    const weekWorkouts = workouts.filter(
      (workout) => workout.week_id === week.id
    );

    const completedInWeek = weekWorkouts.filter(
      (workout) => completedWorkoutIds.has(workout.id)
    ).length;

    return {
      ...week,
      workoutCount: weekWorkouts.length,
      completedCount: completedInWeek,
    };
  });

  // FETCH LATEST VERTICAL JUMP TESTS
  const { data: jumpLogs, error: jumpError } = await supabase
    .from('vertical_jump_logs')
    .select(
      'id, standing_vertical_cm, running_vertical_cm, date_recorded, is_verified'
    )
    .eq('profile_id', user.id)
    .order('date_recorded', { ascending: false })
    .limit(5);

  if (jumpError) {
    console.error('Jump history error:', jumpError.message);
  }

  const latestJump = jumpLogs?.[0] || null;

  const formatDate = (date: string | null) => {
    if (!date) return 'Date unavailable';

    return new Date(date).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      {/* ATHLETE HEADER */}
      <section className="pt-36 pb-12 px-6 border-b border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full border-2 border-red-600 overflow-hidden bg-neutral-900 flex-shrink-0 flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={`${fullName} profile`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-black text-neutral-500">
                    {firstName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold mb-2">
                  Sri Lanka Dunks // Athlete Portal
                </p>

                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                  Welcome back, <span className="text-neutral-500">{firstName}.</span>
                </h1>

                <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest mt-2">
                  Athlete Performance Dashboard
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/workouts"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded font-mono text-xs uppercase tracking-widest font-bold transition-all text-center"
              >
                Start Training →
              </Link>

              <Link
                href="/vertical-jump-test"
                className="border border-neutral-700 hover:border-white text-white px-6 py-4 rounded font-mono text-xs uppercase tracking-widest font-bold transition-all text-center"
              >
                Test Your Vertical
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN DASHBOARD */}
      <section className="py-12 px-6 flex-grow bg-black">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* PERFORMANCE STATISTICS */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                  Your Performance
                </p>
                <h2 className="text-2xl font-black uppercase tracking-tight mt-1">
                  Athlete Statistics
                </h2>
              </div>

              <Link
                href="/vertical-jump-test"
                className="text-neutral-500 hover:text-white font-mono text-[10px] uppercase tracking-widest transition-colors"
              >
                Update Results →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <div className="bg-neutral-950 border border-neutral-800 rounded p-6">
                <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
                  Standing Vertical
                </p>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-4xl font-black">
                    {latestJump?.standing_vertical_cm != null
                      ? Number(latestJump.standing_vertical_cm).toFixed(1)
                      : '--'}
                  </span>
                  <span className="text-neutral-500 font-mono text-xs mb-1">
                    CM
                  </span>
                </div>

                <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest mt-3">
                  Latest recorded result
                </p>
              </div>

              <div className="bg-neutral-950 border border-red-600/40 rounded p-6">
                <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                  Running Vertical
                </p>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-4xl font-black">
                    {latestJump?.running_vertical_cm != null
                      ? Number(latestJump.running_vertical_cm).toFixed(1)
                      : '--'}
                  </span>
                  <span className="text-neutral-500 font-mono text-xs mb-1">
                    CM
                  </span>
                </div>

                <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest mt-3">
                  Latest recorded result
                </p>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded p-6">
                <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
                  Workouts Completed
                </p>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-4xl font-black">
                    {completedWorkouts}
                  </span>
                  <span className="text-neutral-500 font-mono text-xs mb-1">
                    / {totalWorkouts}
                  </span>
                </div>

                <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest mt-3">
                  Fully completed sessions
                </p>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded p-6">
                <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
                  Programme Progress
                </p>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-4xl font-black">
                    {programmeProgress}
                  </span>
                  <span className="text-neutral-500 font-mono text-xs mb-1">
                    %
                  </span>
                </div>

                <div className="w-full h-1.5 bg-neutral-800 rounded-full mt-4 overflow-hidden">
                  <div
                    className="h-full bg-red-600 transition-all"
                    style={{ width: `${programmeProgress}%` }}
                  />
                </div>

                <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest mt-3">
                  {completedSets} / {totalSets} sets completed
                </p>
              </div>

            </div>
          </div>

          {/* TRAINING PROGRAMME */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 bg-neutral-950 border border-neutral-800 rounded p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                    Your Training Plan
                  </p>

                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mt-1">
                    6-Week Beginner Programme
                  </h2>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-widest text-green-400 border border-green-800/50 bg-green-900/10 px-3 py-2 rounded w-fit">
                  Included
                </span>
              </div>

              <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
                Build your foundations, develop strength, improve jumping
                mechanics and progress towards better vertical jump performance
                through a structured six-week training programme.
              </p>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
                    Overall Completion
                  </span>

                  <span className="text-white font-mono text-xs font-bold">
                    {completedWorkouts} / {totalWorkouts} sessions
                  </span>
                </div>

                <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600 transition-all"
                    style={{ width: `${programmeProgress}%` }}
                  />
                </div>

                <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest mt-3">
                  {completedSets} of {totalSets} prescribed sets completed
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
                {weeklyProgress.map((week, index) => {
                  const weekProgress =
                    week.workoutCount > 0
                      ? Math.round(
                          (week.completedCount / week.workoutCount) * 100
                        )
                      : 0;

                  return (
                    <div
                      key={week.id}
                      className="border border-neutral-800 bg-black p-4 rounded"
                    >
                      <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest">
                        Week {String(week.week_number).padStart(2, '0')}
                      </p>

                      <p className="text-white text-xs font-bold uppercase mt-2">
                        {week.focus_description || WEEK_NAMES[index] || 'Training'}
                      </p>

                      <p className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest mt-3">
                        {week.completedCount}/{week.workoutCount} Sessions
                      </p>

                      <div className="w-full h-1 bg-neutral-800 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-red-600 transition-all"
                          style={{ width: `${weekProgress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/dashboard/workouts"
                className="block text-center bg-white hover:bg-neutral-200 text-black font-mono text-xs uppercase tracking-widest font-bold p-5 rounded mt-8 transition-all"
              >
                Open Training Centre →
              </Link>
            </div>

            {/* QUICK ACTIONS */}
            <div className="space-y-4">
              <div className="bg-neutral-950 border border-neutral-800 rounded p-6">
                <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                  Performance Testing
                </p>

                <h3 className="text-xl font-black uppercase mt-3">
                  Measure Your Jump
                </h3>

                <p className="text-neutral-500 text-xs leading-relaxed mt-3">
                  Record your standing and running vertical jump measurements
                  and monitor your progress.
                </p>

                <Link
                  href="/vertical-jump-test"
                  className="inline-block text-white font-mono text-[10px] uppercase tracking-widest border-b border-red-600 pb-1 mt-6 hover:text-red-500 transition-colors"
                >
                  Take A Test →
                </Link>
              </div>

              <div className="bg-neutral-950 border border-neutral-800 rounded p-6">
                <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                  Athlete Rankings
                </p>

                <h3 className="text-xl font-black uppercase mt-3">
                  The Leaderboard
                </h3>

                <p className="text-neutral-500 text-xs leading-relaxed mt-3">
                  See the verified vertical jump performances of athletes
                  across the Sri Lanka Dunks community.
                </p>

                <Link
                  href="/leaderboard"
                  className="inline-block text-white font-mono text-[10px] uppercase tracking-widest border-b border-red-600 pb-1 mt-6 hover:text-red-500 transition-colors"
                >
                  View Rankings →
                </Link>
              </div>
            </div>
          </div>

          {/* LATEST JUMP TESTS */}
          <div>
            <div className="mb-6">
              <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                Performance History
              </p>

              <h2 className="text-2xl font-black uppercase tracking-tight mt-1">
                Recent Jump Tests
              </h2>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded overflow-hidden">
              {jumpLogs && jumpLogs.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-neutral-800 text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
                        <th className="p-5">Date</th>
                        <th className="p-5">Standing Vertical</th>
                        <th className="p-5">Running Vertical</th>
                        <th className="p-5">Verification</th>
                      </tr>
                    </thead>

                    <tbody>
                      {jumpLogs.map((jump) => (
                        <tr
                          key={jump.id}
                          className="border-b border-neutral-900 last:border-0"
                        >
                          <td className="p-5 text-neutral-400 font-mono text-xs">
                            {formatDate(jump.date_recorded)}
                          </td>

                          <td className="p-5 font-bold text-white">
                            {Number(jump.standing_vertical_cm).toFixed(1)} cm
                          </td>

                          <td className="p-5 font-bold text-white">
                            {jump.running_vertical_cm != null
                              ? `${Number(jump.running_vertical_cm).toFixed(1)} cm`
                              : '--'}
                          </td>

                          <td className="p-5">
                            {jump.is_verified ? (
                              <span className="text-green-400 font-mono text-[10px] uppercase tracking-widest">
                                Verified
                              </span>
                            ) : (
                              <span className="text-yellow-500 font-mono text-[10px] uppercase tracking-widest">
                                Pending
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-10 text-center">
                  <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest">
                    No jump tests recorded yet.
                  </p>

                  <Link
                    href="/vertical-jump-test"
                    className="inline-block text-red-500 hover:text-white font-mono text-xs uppercase tracking-widest mt-5 transition-colors"
                  >
                    Record Your First Test →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* ACCOUNT FOOTER */}
          <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row justify-between gap-3">
            <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest">
              Sri Lanka Dunks // Athlete Development
            </p>

            <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest">
              Signed in as {user.email}
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
