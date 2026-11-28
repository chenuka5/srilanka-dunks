
'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

type Week = {
  id: string;
  week_number: number;
  focus_description: string;
};

type Workout = {
  id: string;
  week_id: string;
  day_number: number;
  title: string;
  description: string | null;
  workout_exercises: any[];
};

type Completion = {
  id: string;
  workout_exercise_id: string;
  set_number: number;
  completed_at: string;
};

type Props = {
  userId: string;
  weeks: Week[];
  workouts: Workout[];
  initialCompletions: Completion[];
};

export default function WorkoutTracker({
  userId,
  weeks,
  workouts,
  initialCompletions,
}: Props) {
  const [activeWeek, setActiveWeek] = useState(
    weeks[0]?.week_number || 1
  );

  const [activeWorkoutId, setActiveWorkoutId] = useState<string | null>(
    null
  );

  const [completedSets, setCompletedSets] = useState<
    Record<string, boolean>
  >({});

  const [savingSets, setSavingSets] = useState<
    Record<string, boolean>
  >({});

  const [errorMessage, setErrorMessage] = useState('');

  const [restTimer, setRestTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Restore saved athlete progress.
  useEffect(() => {
    const restored: Record<string, boolean> = {};

    initialCompletions.forEach((completion) => {
      const key = `${completion.workout_exercise_id}-${completion.set_number}`;
      restored[key] = true;
    });

    setCompletedSets(restored);
  }, [initialCompletions]);

  const sortedWeeks = useMemo(
    () => [...weeks].sort((a, b) => a.week_number - b.week_number),
    [weeks]
  );

  const currentWeek = sortedWeeks.find(
    (week) => week.week_number === activeWeek
  );

  const currentWeekWorkouts = useMemo(
    () =>
      workouts
        .filter((workout) => workout.week_id === currentWeek?.id)
        .sort((a, b) => a.day_number - b.day_number),
    [workouts, currentWeek]
  );

  useEffect(() => {
    if (currentWeekWorkouts.length === 0) {
      setActiveWorkoutId(null);
      return;
    }

    if (
      !activeWorkoutId ||
      !currentWeekWorkouts.some(
        (workout) => workout.id === activeWorkoutId
      )
    ) {
      setActiveWorkoutId(currentWeekWorkouts[0].id);
    }
  }, [activeWeek, currentWeekWorkouts, activeWorkoutId]);

  const activeWorkout = currentWeekWorkouts.find(
    (workout) => workout.id === activeWorkoutId
  );

  const orderedExercises = useMemo(
    () =>
      [...(activeWorkout?.workout_exercises || [])].sort(
        (a, b) => a.order_index - b.order_index
      ),
    [activeWorkout]
  );

  const allAssignments = useMemo(
    () =>
      workouts.flatMap((workout) =>
        workout.workout_exercises || []
      ),
    [workouts]
  );

  const totalSets = allAssignments.reduce(
    (total, item) => total + Math.max(0, Number(item.sets) || 0),
    0
  );

  const completedSetCount = Object.values(completedSets).filter(
    Boolean
  ).length;

  const overallProgress =
    totalSets > 0
      ? Math.min(100, Math.round((completedSetCount / totalSets) * 100))
      : 0;

  const workoutTotalSets = orderedExercises.reduce(
    (total, item) => total + Math.max(0, Number(item.sets) || 0),
    0
  );

  const workoutCompletedSets = orderedExercises.reduce(
    (total, item) => {
      const sets = Math.max(0, Number(item.sets) || 0);

      for (let set = 1; set <= sets; set++) {
        const key = `${item.id}-${set}`;
        if (completedSets[key]) total++;
      }

      return total;
    },
    0
  );

  // Save or remove an individual set completion.
  const toggleSet = async (
    workoutExerciseId: string,
    setNumber: number
  ) => {
    const key = `${workoutExerciseId}-${setNumber}`;

    if (savingSets[key]) return;

    const isCurrentlyCompleted = Boolean(completedSets[key]);

    setSavingSets((previous) => ({
      ...previous,
      [key]: true,
    }));

    setErrorMessage('');

    try {
      if (isCurrentlyCompleted) {
        const { error } = await supabase
          .from('workout_set_completions')
          .delete()
          .eq('profile_id', userId)
          .eq('workout_exercise_id', workoutExerciseId)
          .eq('set_number', setNumber);

        if (error) throw error;

        setCompletedSets((previous) => {
          const updated = { ...previous };
          delete updated[key];
          return updated;
        });
      } else {
        const { error } = await supabase
          .from('workout_set_completions')
          .insert({
            profile_id: userId,
            workout_exercise_id: workoutExerciseId,
            set_number: setNumber,
          });

        if (error) throw error;

        setCompletedSets((previous) => ({
          ...previous,
          [key]: true,
        }));
      }
    } catch (error: any) {
      console.error('Set tracking error:', error);

      setErrorMessage(
        error?.message ||
          'Unable to update your training progress. Please try again.'
      );
    } finally {
      setSavingSets((previous) => ({
        ...previous,
        [key]: false,
      }));
    }
  };

  // Rest timer.
  useEffect(() => {
    if (!timerActive || restTimer <= 0) return;

    const interval = setInterval(() => {
      setRestTimer((previous) => {
        if (previous <= 1) {
          setTimerActive(false);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, restTimer]);

  const startRestTimer = (seconds: number) => {
    setRestTimer(seconds);
    setTimerActive(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  };

  const getExercise = (item: any) => {
    if (Array.isArray(item.exercises)) {
      return item.exercises[0] || null;
    }

    return item.exercises || null;
  };

  const isValidVideoUrl = (url?: string | null) => {
    if (!url || typeof url !== 'string') return false;

    try {
      const parsed = new URL(url);
      return (
        (parsed.protocol === 'https:' || parsed.protocol === 'http:') &&
        Boolean(parsed.hostname)
      );
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-10">

      {/* PROGRAMME PROGRESS */}
      <div className="bg-neutral-950 border border-neutral-800 rounded p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
              Your Training Progress
            </p>

            <h2 className="text-3xl font-black uppercase mt-2">
              Programme Overview
            </h2>
          </div>

          <div className="text-right">
            <span className="text-4xl font-black">{overallProgress}%</span>
            <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
              Sets Completed
            </p>
          </div>
        </div>

        <div className="w-full h-2 bg-neutral-800 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>

        <div className="flex justify-between mt-3 text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
          <span>{completedSetCount} sets completed</span>
          <span>{totalSets} total sets</span>
        </div>
      </div>

      {/* WEEK NAVIGATION */}
      <div>
        <div className="mb-5">
          <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
            Programme Structure
          </p>
          <h2 className="text-2xl font-black uppercase mt-1">
            Select Your Training Week
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {sortedWeeks.map((week) => {
            const isActive = activeWeek === week.week_number;

            const weekWorkouts = workouts.filter(
              (workout) => workout.week_id === week.id
            );

            const weekAssignments = weekWorkouts.flatMap(
              (workout) => workout.workout_exercises || []
            );

            const weekTotal = weekAssignments.reduce(
              (total, item) =>
                total + Math.max(0, Number(item.sets) || 0),
              0
            );

            const weekCompleted = weekAssignments.reduce(
              (total, item) => {
                const sets = Math.max(0, Number(item.sets) || 0);

                for (let set = 1; set <= sets; set++) {
                  if (completedSets[`${item.id}-${set}`]) total++;
                }

                return total;
              },
              0
            );

            return (
              <button
                key={week.id}
                type="button"
                onClick={() => setActiveWeek(week.week_number)}
                className={`text-left p-4 rounded border transition-all ${
                  isActive
                    ? 'bg-red-600 border-red-600 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-red-600/60 hover:text-white'
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-widest opacity-70">
                  Week 0{week.week_number}
                </p>

                <p className="font-black text-lg mt-2">
                  {weekWorkouts.length} Sessions
                </p>

                <p className="font-mono text-[10px] mt-2 opacity-70">
                  {weekCompleted}/{weekTotal} Sets
                </p>
              </button>
            );
          })}
        </div>

        {currentWeek && (
          <div className="mt-5 border-l-2 border-red-600 pl-4">
            <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
              Week {currentWeek.week_number} Focus
            </p>
            <p className="text-neutral-300 text-sm mt-2">
              {currentWeek.focus_description}
            </p>
          </div>
        )}
      </div>

      {/* SESSION NAVIGATION */}
      <div>
        <div className="mb-5">
          <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
            Weekly Sessions
          </p>
          <h2 className="text-2xl font-black uppercase mt-1">
            Choose Your Workout
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {currentWeekWorkouts.map((workout) => {
            const isActive = workout.id === activeWorkoutId;

            const assignments = workout.workout_exercises || [];

            const sessionSets = assignments.reduce(
              (total, item) =>
                total + Math.max(0, Number(item.sets) || 0),
              0
            );

            const sessionCompleted = assignments.reduce(
              (total, item) => {
                const sets = Math.max(0, Number(item.sets) || 0);

                for (let set = 1; set <= sets; set++) {
                  if (completedSets[`${item.id}-${set}`]) total++;
                }

                return total;
              },
              0
            );

            return (
              <button
                type="button"
                key={workout.id}
                onClick={() => setActiveWorkoutId(workout.id)}
                className={`text-left p-5 rounded border transition-all ${
                  isActive
                    ? 'bg-neutral-900 border-red-600'
                    : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'
                }`}
              >
                <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                  Session {workout.day_number}
                </p>

                <h3 className="text-white font-black uppercase mt-2">
                  {workout.title}
                </h3>

                <p className="text-neutral-500 font-mono text-[10px] mt-3">
                  {sessionCompleted}/{sessionSets} SETS COMPLETED
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE WORKOUT */}
      {activeWorkout && (
        <div className="bg-neutral-950 border border-neutral-800 rounded overflow-hidden">

          <div className="p-6 md:p-8 border-b border-neutral-800">
            <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
              Week {activeWeek} // Session {activeWorkout.day_number}
            </p>

            <h2 className="text-2xl md:text-4xl font-black uppercase mt-2">
              {activeWorkout.title}
            </h2>

            {activeWorkout.description && (
              <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
                {activeWorkout.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-5 text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
              <span>{orderedExercises.length} Exercises</span>
              <span>
                {workoutCompletedSets}/{workoutTotalSets} Sets Completed
              </span>
            </div>
          </div>

          {errorMessage && (
            <div className="m-6 p-4 border border-red-600/50 bg-red-900/10 rounded text-red-400 font-mono text-xs">
              {errorMessage}
            </div>
          )}

          {/* REST TIMER */}
          <div className="mx-6 mt-6 p-5 bg-black border border-neutral-800 rounded flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest">
                Rest Timer
              </p>

              <p className="text-4xl font-black tabular-nums mt-1">
                {formatTime(restTimer)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[30, 45, 60, 90, 120].map((seconds) => (
                <button
                  type="button"
                  key={seconds}
                  onClick={() => startRestTimer(seconds)}
                  className="border border-neutral-700 hover:border-red-600 px-3 py-2 rounded text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                >
                  {seconds}s
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setRestTimer(0);
                  setTimerActive(false);
                }}
                className="border border-neutral-700 hover:border-white px-3 py-2 rounded text-xs font-mono text-neutral-400 hover:text-white"
              >
                Reset
              </button>
            </div>
          </div>

          {/* EXERCISES */}
          <div className="p-6 md:p-8 space-y-5">
            {orderedExercises.map((item, index) => {
              const exercise = getExercise(item);
              const sets = Math.max(0, Number(item.sets) || 0);
              const restSeconds = Math.max(
                0,
                Number(item.rest_seconds) || 0
              );

              if (!exercise) {
                return (
                  <div
                    key={item.id}
                    className="p-5 border border-red-900/50 rounded bg-black"
                  >
                    <p className="text-red-400 font-mono text-xs">
                      Exercise data unavailable for assignment {index + 1}.
                    </p>
                  </div>
                );
              }

              const videoAvailable = isValidVideoUrl(exercise.video_url);

              const exerciseCompleted = Array.from(
                { length: sets },
                (_, i) => completedSets[`${item.id}-${i + 1}`]
              ).filter(Boolean).length;

              return (
                <article
                  key={item.id}
                  className="bg-black border border-neutral-800 rounded p-5 md:p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">

                    <div className="flex gap-4">
                      <div className="w-9 h-9 flex-shrink-0 bg-neutral-900 border border-neutral-700 rounded flex items-center justify-center font-black text-red-600">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div>
                        <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                          {exercise.category || 'Exercise'}
                        </p>

                        <h3 className="text-lg md:text-xl font-black uppercase mt-1">
                          {exercise.name}
                        </h3>

                        <div className="flex flex-wrap gap-4 mt-3 text-neutral-400 font-mono text-xs">
                          <span>{sets} Sets</span>
                          <span>{item.reps} Reps</span>
                          <span>{restSeconds}s Rest</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-white font-black text-xl">
                        {exerciseCompleted}/{sets}
                      </p>
                      <p className="text-neutral-600 font-mono text-[9px] uppercase tracking-widest">
                        Sets Complete
                      </p>
                    </div>
                  </div>

                  {/* INSTRUCTIONS */}
                  {exercise.instructions && (
                    <div className="mt-5 border-l border-neutral-700 pl-4">
                      <p className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest mb-2">
                        Coaching Instructions
                      </p>

                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {exercise.instructions}
                      </p>
                    </div>
                  )}

                  {item.notes && (
                    <div className="mt-4 p-3 bg-neutral-950 rounded">
                      <p className="text-neutral-300 text-xs leading-relaxed">
                        <span className="text-red-600 font-bold uppercase">
                          Coach Note:{' '}
                        </span>
                        {item.notes}
                      </p>
                    </div>
                  )}

                  {/* DEMONSTRATION LINK */}
                  <div className="mt-5 flex flex-wrap gap-3">
                    {videoAvailable ? (
                      <a
                        href={exercise.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded font-mono text-[10px] uppercase tracking-widest font-bold transition-colors"
                      >
                        <span>▶</span>
                        Watch Exercise Demo
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 border border-neutral-800 text-neutral-500 px-4 py-3 rounded font-mono text-[10px] uppercase tracking-widest">
                        Demo Coming Soon
                      </span>
                    )}

                    {restSeconds > 0 && (
                      <button
                        type="button"
                        onClick={() => startRestTimer(restSeconds)}
                        className="border border-neutral-700 hover:border-white text-neutral-300 hover:text-white px-4 py-3 rounded font-mono text-[10px] uppercase tracking-widest transition-colors"
                      >
                        Start {restSeconds}s Rest
                      </button>
                    )}
                  </div>

                  {/* SET TRACKER */}
                  <div className="mt-6 pt-5 border-t border-neutral-900">
                    <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-widest mb-3">
                      Record Your Sets
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {Array.from({ length: sets }, (_, i) => {
                        const setNumber = i + 1;
                        const key = `${item.id}-${setNumber}`;
                        const isCompleted = Boolean(completedSets[key]);
                        const isSaving = Boolean(savingSets[key]);

                        return (
                          <button
                            type="button"
                            key={key}
                            disabled={isSaving}
                            onClick={() =>
                              toggleSet(item.id, setNumber)
                            }
                            className={`min-w-20 px-4 py-3 rounded border font-mono text-xs uppercase tracking-widest font-bold transition-all disabled:opacity-50 ${
                              isCompleted
                                ? 'bg-green-600 border-green-600 text-black'
                                : 'bg-neutral-950 border-neutral-700 text-neutral-300 hover:border-red-600 hover:text-white'
                            }`}
                          >
                            {isSaving
                              ? 'Saving...'
                              : isCompleted
                                ? `✓ Set ${setNumber}`
                                : `Set ${setNumber}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {currentWeekWorkouts.length === 0 && (
        <div className="p-10 text-center bg-neutral-950 border border-neutral-800 rounded">
          <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest">
            No sessions found for this week.
          </p>
        </div>
      )}

      <div className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row justify-between gap-3">
        <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest">
          Sri Lanka Dunks // Training Centre
        </p>

        <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest">
          Your progress is saved to your athlete account
        </p>
      </div>
    </div>
  );
}
