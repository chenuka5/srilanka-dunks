
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import WorkoutTracker from '@/components/workouts-tracker';

export const dynamic = 'force-dynamic';

const PROGRAM_TITLE =
  'Sri Lanka Dunks - 6-Week Beginner Vertical Jump Programme';

export default async function WorkoutsPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  // Find the exact six-week beginner programme.
  const { data: program, error: programError } = await supabase
    .from('programs')
    .select('id, title')
    .eq('title', PROGRAM_TITLE)
    .maybeSingle();

  if (programError) {
    console.error('Programme lookup error:', programError.message);
  }

  if (!program) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="min-h-screen flex items-center justify-center px-6 pt-32">
          <div className="max-w-xl text-center space-y-4">
            <h1 className="text-3xl font-black uppercase">
              Programme Unavailable
            </h1>
            <p className="text-neutral-400 text-sm">
              The six-week beginner programme could not be found. Please
              contact the Sri Lanka Dunks team.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  // Fetch the six weeks belonging to this programme.
  const { data: weeks, error: weeksError } = await supabase
    .from('program_weeks')
    .select('id, week_number, focus_description')
    .eq('program_id', program.id)
    .order('week_number', { ascending: true });

  if (weeksError) {
    console.error('Programme weeks error:', weeksError.message);
  }

  const weekIds = (weeks || []).map((week) => week.id);

  // Fetch workouts and their assigned exercises.
  let workouts: any[] = [];

  if (weekIds.length > 0) {
    const { data: workoutData, error: workoutsError } = await supabase
      .from('workouts')
      .select(`
        id,
        week_id,
        day_number,
        title,
        description,
        workout_exercises (
          id,
          order_index,
          sets,
          reps,
          rest_seconds,
          notes,
          exercises (
            id,
            name,
            category,
            instructions,
            video_url
          )
        )
      `)
      .in('week_id', weekIds)
      .order('day_number', { ascending: true });

    if (workoutsError) {
      console.error('Workouts fetch error:', workoutsError.message);
    }

    workouts = workoutData || [];
  }

  // Fetch saved set completions for this athlete.
  const workoutExerciseIds = workouts.flatMap((workout) =>
    (workout.workout_exercises || []).map((item: any) => item.id)
  );

  let initialCompletions: any[] = [];

  if (workoutExerciseIds.length > 0) {
    const { data: completionData, error: completionError } = await supabase
      .from('workout_set_completions')
      .select('id, workout_exercise_id, set_number, completed_at')
      .eq('profile_id', user.id)
      .in('workout_exercise_id', workoutExerciseIds);

    if (completionError) {
      console.error('Set completion fetch error:', completionError.message);
    }

    initialCompletions = completionData || [];
  }

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="pt-36 pb-12 px-6 border-b border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold mb-3">
            Sri Lanka Dunks // Training Centre
          </p>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            Six Week <span className="text-neutral-500">Programme.</span>
          </h1>

          <p className="text-neutral-400 font-mono text-xs md:text-sm uppercase tracking-widest mt-4 max-w-2xl leading-relaxed">
            Build strength. Develop elasticity. Improve your jumping
            mechanics. Track every training session.
          </p>

          <div className="flex flex-wrap gap-6 mt-8 text-xs font-mono uppercase tracking-widest text-neutral-500">
            <span>06 Weeks</span>
            <span>18 Sessions</span>
            <span>Individual Progress Tracking</span>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 flex-grow">
        <div className="max-w-7xl mx-auto">
          {workouts.length > 0 ? (
            <WorkoutTracker
              userId={user.id}
              weeks={weeks || []}
              workouts={workouts}
              initialCompletions={initialCompletions}
            />
          ) : (
            <div className="bg-neutral-950 border border-neutral-800 rounded p-10 text-center">
              <h2 className="text-xl font-black uppercase">
                No Workouts Found
              </h2>
              <p className="text-neutral-500 font-mono text-xs mt-3">
                No sessions were found for the six-week programme.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
