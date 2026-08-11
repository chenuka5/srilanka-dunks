import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Button from '@/components/ui/Button';

export default async function WorkoutsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch the 4-Week Foundation Program along with weeks, workouts, and exercises
  const { data: program } = await supabase
    .from('programs')
    .select(`
      *,
      program_weeks (
        *,
        workouts (
          *,
          workout_exercises (
            *,
            exercises (*)
          )
        )
      )
    `)
    .eq('id', '11111111-1111-1111-1111-111111111111')
    .single();

  return (
    <div className="min-h-screen bg-brand-black py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-brand-gray-900 pb-8 gap-4">
          <div>
            <Button href="/dashboard" variant="outline" className="text-xs mb-4">← Back to Dashboard</Button>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              {program?.title || 'TRAINING PROGRAM'}
            </h1>
            <p className="text-brand-gray-400 text-sm mt-2">{program?.description}</p>
          </div>
        </div>

        {/* Weeks & Workouts Grid */}
        <div className="space-y-12">
          {program?.program_weeks?.map((week: any) => (
            <div key={week.id} className="bg-brand-surface p-8 border border-brand-gray-900">
              <div className="border-b border-brand-gray-800 pb-4 mb-8">
                <span className="text-brand-crimson font-bold uppercase tracking-widest text-xs">
                  WEEK {week.week_number}
                </span>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                  {week.focus_description}
                </h2>
              </div>

              {/* Workouts inside the week */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {week.workouts?.map((workout: any) => (
                  <div key={workout.id} className="bg-brand-black p-6 border border-brand-gray-800">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">
                      {workout.title}
                    </h3>
                    <p className="text-brand-gray-400 text-xs mb-6">{workout.description}</p>

                    {/* Exercise List */}
                    <div className="space-y-4">
                      {workout.workout_exercises?.map((item: any) => (
                        <div key={item.id} className="p-4 bg-brand-surface border border-brand-gray-900 flex justify-between items-center">
                          <div>
                            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest block">
                              {item.exercises?.category}
                            </span>
                            <h4 className="text-white font-bold text-sm uppercase">{item.exercises?.name}</h4>
                            <p className="text-brand-gray-400 text-xs mt-1">{item.notes}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-brand-crimson font-black text-sm block">{item.sets} SETS</span>
                            <span className="text-white text-xs font-bold">{item.reps}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}