'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface WorkoutTrackerProps {
  userId: string;
  workouts: any[];
  initialCompletions?: any[];
}

export default function WorkoutTracker({ userId, workouts, initialCompletions = [] }: WorkoutTrackerProps) {
  const supabase = createClient();
  
  // Track completed sets in state: { "exerciseId_set1": true, "exerciseId_set2": true }
  const [completedSets, setCompletedSets] = useState<Record<string, boolean>>({});

  // Load existing completions on mount
  useEffect(() => {
    if (initialCompletions && initialCompletions.length > 0) {
      const setMap: Record<string, boolean> = {};
      initialCompletions.forEach((item) => {
        if (item.workout_exercise_id && item.set_number) {
          setMap[`${item.workout_exercise_id}_set_${item.set_number}`] = true;
        }
      });
      setCompletedSets(setMap);
    }
  }, [initialCompletions]);

  // Toggle set completion
  async function toggleSet(workoutExerciseId: string, setNumber: number, workoutId: string) {
    const setKey = `${workoutExerciseId}_set_${setNumber}`;
    const isCurrentlyDone = !!completedSets[setKey];
    const newStatus = !isCurrentlyDone;

    // Optimistic UI update
    setCompletedSets((prev) => ({
      ...prev,
      [setKey]: newStatus,
    }));

    // Sync to Supabase workout_completions table
    if (newStatus) {
      await supabase.from('workout_completions').insert({
        profile_id: userId,
        workout_id: workoutId,
        workout_exercise_id: workoutExerciseId,
        set_number: setNumber,
      });
    } else {
      await supabase
        .from('workout_completions')
        .delete()
        .eq('profile_id', userId)
        .eq('workout_exercise_id', workoutExerciseId)
        .eq('set_number', setNumber);
    }
  }

  // Calculate total program statistics
  let totalProgramSets = 0;
  let totalProgramCompletedSets = 0;

  workouts.forEach((w) => {
    (w.workout_exercises || []).forEach((e: any) => {
      const numSets = e.sets || 3;
      totalProgramSets += numSets;
      for (let s = 1; s <= numSets; s++) {
        if (completedSets[`${e.id}_set_${s}`]) {
          totalProgramCompletedSets++;
        }
      }
    });
  });

  const overallProgramPercentage = totalProgramSets > 0
    ? Math.round((totalProgramCompletedSets / totalProgramSets) * 100)
    : 0;

  return (
    <div className="space-y-8">
      
      {/* Overall Program Progress Bar */}
      <div className="bg-neutral-900 border border-neutral-800 p-6 rounded space-y-3">
        <div className="flex justify-between items-center text-xs font-mono uppercase">
          <span className="text-neutral-400">Overall Program Progress</span>
          <span className="text-yellow-500 font-bold">{overallProgramPercentage}% COMPLETE</span>
        </div>
        <div className="w-full bg-black h-3 rounded-full overflow-hidden border border-neutral-800">
          <div
            className="bg-yellow-500 h-full transition-all duration-500"
            style={{ width: `${overallProgramPercentage}%` }}
          />
        </div>
        <p className="text-xs font-mono text-neutral-500 text-right">
          {totalProgramCompletedSets} of {totalProgramSets} Total Sets Completed
        </p>
      </div>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 gap-8">
        {workouts.map((workout, idx) => {
          let workoutTotalSets = 0;
          let workoutCompletedSets = 0;

          (workout.workout_exercises || []).forEach((e: any) => {
            const numSets = e.sets || 3;
            workoutTotalSets += numSets;
            for (let s = 1; s <= numSets; s++) {
              if (completedSets[`${e.id}_set_${s}`]) {
                workoutCompletedSets++;
              }
            }
          });

          const workoutPercentage = workoutTotalSets > 0
            ? Math.round((workoutCompletedSets / workoutTotalSets) * 100)
            : 0;

          const isWorkoutFullyComplete = workoutPercentage === 100 && workoutTotalSets > 0;

          return (
            <div
              key={workout.id || idx}
              className={`bg-neutral-900 border transition-colors p-6 rounded space-y-6 ${
                isWorkoutFullyComplete ? 'border-green-600/50' : 'border-neutral-800'
              }`}
            >
              {/* Session Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-neutral-800 pb-4 gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-red-500 uppercase tracking-widest">
                      Session {idx + 1}
                    </span>
                    {isWorkoutFullyComplete && (
                      <span className="bg-green-950 text-green-400 border border-green-600 text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                        ✓ Day Complete
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold uppercase mt-1">{workout.name || 'Vertical Power Session'}</h2>
                </div>

                {/* Session Progress Percentage */}
                <div className="w-full md:w-48 space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-400">Day Progress</span>
                    <span className={isWorkoutFullyComplete ? 'text-green-400 font-bold' : 'text-white'}>
                      {workoutPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-black h-2 rounded-full overflow-hidden border border-neutral-800">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isWorkoutFullyComplete ? 'bg-green-500' : 'bg-red-600'
                      }`}
                      style={{ width: `${workoutPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Exercises Routine */}
              <div className="space-y-4">
                {workout.workout_exercises && workout.workout_exercises.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {workout.workout_exercises.map((item: any, eIdx: number) => {
                      const numSets = item.sets || 3;
                      let exerciseDoneSets = 0;
                      for (let s = 1; s <= numSets; s++) {
                        if (completedSets[`${item.id}_set_${s}`]) {
                          exerciseDoneSets++;
                        }
                      }
                      const isExerciseComplete = exerciseDoneSets === numSets;

                      return (
                        <div
                          key={item.id || eIdx}
                          className={`bg-black border p-4 rounded flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all ${
                            isExerciseComplete ? 'border-neutral-700 bg-neutral-950/60' : 'border-neutral-800'
                          }`}
                        >
                          <div className="space-y-1 max-w-md">
                            <div className="flex items-center gap-2">
                              <p className={`font-bold uppercase ${isExerciseComplete ? 'text-neutral-300 line-through' : 'text-white'}`}>
                                {item.exercises?.name || 'Explosive Exercise'}
                              </p>
                              {isExerciseComplete && (
                                <span className="text-green-500 text-xs font-mono">✓</span>
                              )}
                            </div>
                            {item.exercises?.description && (
                              <p className="text-xs text-neutral-400">
                                {item.exercises.description}
                              </p>
                            )}
                            <p className="text-[11px] font-mono text-neutral-500">
                              Target: {item.reps || '8-10'} reps {item.rest_period_seconds ? `| Rest: ${item.rest_period_seconds}s` : ''}
                            </p>
                          </div>

                          {/* Interactive Set Checkboxes */}
                          <div className="flex flex-wrap items-center gap-2">
                            {Array.from({ length: numSets }).map((_, sIdx) => {
                              const setNum = sIdx + 1;
                              const isChecked = !!completedSets[`${item.id}_set_${setNum}`];

                              return (
                                <button
                                  key={setNum}
                                  type="button"
                                  onClick={() => toggleSet(item.id, setNum, workout.id)}
                                  className={`px-3 py-2 rounded text-xs font-mono uppercase border transition-all cursor-pointer ${
                                    isChecked
                                      ? 'bg-red-600 border-red-500 text-white font-bold'
                                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                                  }`}
                                >
                                  {isChecked ? `✓ Set ${setNum}` : `Set ${setNum}`}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm font-mono text-neutral-500">No exercises assigned to this session.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}