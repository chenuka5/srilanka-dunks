import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// EXACT MATCH FOR YOUR COMPONENT FILE
import WorkoutTracker from '@/components/workouts-tracker';

export const dynamic = 'force-dynamic';

export default async function WorkoutsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch active workouts and exercises
  const { data: workouts, error } = await supabase
    .from('workouts')
    .select(`
      *,
      workout_exercises (
        id,
        sets,
        reps,
        rest_period_seconds,
        exercises (
          name,
          category,
          description
        )
      )
    `);

  if (error) {
    console.error('Error fetching workouts:', error.message);
  }

  // Fetch completed sets for current user
  const { data: completions } = await supabase
    .from('workout_completions')
    .select('*')
    .eq('profile_id', user.id);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation / Header */}
        <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
          <div>
            <Link 
              href="/dashboard" 
              className="text-xs font-mono text-neutral-400 hover:text-white uppercase tracking-wider transition-colors inline-block mb-2"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
              4-Week Foundation Workouts
            </h1>
          </div>
        </div>

        {/* Workouts Interactive Tracker */}
        {workouts && workouts.length > 0 ? (
          <WorkoutTracker 
            userId={user.id} 
            workouts={workouts} 
            initialCompletions={completions || []} 
          />
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded text-center space-y-3">
            <h2 className="text-xl font-bold font-mono uppercase text-neutral-300">No Workouts Found</h2>
            <p className="text-sm text-neutral-500 max-w-md mx-auto font-mono">
              Workouts for the 4-Week Foundation program have not been added to your Supabase tables yet.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}