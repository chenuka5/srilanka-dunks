'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient, User } from '@supabase/supabase-js';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

// Mock Data for the 4-Week Starter Program
const starterProgram = [
  {
    week: 1,
    title: 'Force Accumulation',
    days: [
      {
        day: 1,
        title: 'Max Strength (Lower)',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: '5', notes: '80% 1RM. 3s controlled eccentric.' },
          { name: 'Romanian Deadlift', sets: 3, reps: '8', notes: 'Focus on maximum hamstring stretch.' },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '6/leg', notes: 'Heavy dumbbell in goblet hold.' },
          { name: 'Weighted Plank', sets: 3, reps: '45 sec', notes: 'Maintain rigid core.' }
        ]
      },
      {
        day: 2,
        title: 'Plyometrics & Elasticity',
        exercises: [
          { name: 'Extensive Pogo Hops', sets: 4, reps: '15 sec', notes: 'Stiff ankles, minimal ground contact time.' },
          { name: 'Depth Drops', sets: 4, reps: '4', notes: '18-inch box. Stick the landing perfectly.' },
          { name: 'Max Approach Jumps', sets: 5, reps: '2', notes: 'Full intent. Rest 2 mins between sets.' }
        ]
      }
    ]
  },
  {
    week: 2,
    title: 'Rate of Force Development',
    days: [
      {
        day: 1,
        title: 'Dynamic Effort',
        exercises: [
          { name: 'Box Jumps', sets: 4, reps: '3', notes: 'Focus on hip extension speed.' },
          { name: 'Trap Bar Jumps', sets: 4, reps: '4', notes: '20% 1RM. Max velocity.' },
          { name: 'Nordic Hamstring Curls', sets: 3, reps: '5', notes: 'Control the descent as long as possible.' }
        ]
      }
    ]
  }
];

export default function WorkoutPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // UI State for Navigation
  const [activeWeek, setActiveWeek] = useState(1);
  const [activeDay, setActiveDay] = useState(1);
  
  // Local state to simulate checking off completed exercises
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        router.push('/login');
        return;
      }
      setUser(user);
      setIsLoading(false);
    };
    checkUser();
  }, [router, supabase]);

  const toggleExercise = (exerciseId: string) => {
    setCompletedExercises(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Find the data for the currently selected week and day
  const currentWeekData = starterProgram.find(w => w.week === activeWeek) || starterProgram[0];
  const currentDayData = currentWeekData.days.find(d => d.day === activeDay) || currentWeekData.days[0];

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      {/* DASHBOARD HEADER */}
      <section className="pt-32 pb-8 px-6 border-b border-neutral-900 bg-neutral-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link href="/dashboard" className="text-neutral-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">
                ← Back to Portal
              </Link>
              <span className="text-red-600 font-mono text-[10px] uppercase tracking-widest border border-red-600/30 bg-red-900/10 px-2 py-1 rounded">
                Active Program
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              4-Week Jump <span className="text-neutral-500">Starter.</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 flex-grow bg-black">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR: NAVIGATION */}
          <div className="w-full lg:w-1/4 space-y-8">
            {starterProgram.map((week) => (
              <div key={week.week} className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-bold border-b border-neutral-900 pb-2">
                  Week {week.week} // {week.title}
                </h3>
                <div className="flex flex-col gap-2">
                  {week.days.map((day) => {
                    const isActive = activeWeek === week.week && activeDay === day.day;
                    return (
                      <button
                        key={day.day}
                        onClick={() => {
                          setActiveWeek(week.week);
                          setActiveDay(day.day);
                        }}
                        className={`text-left font-mono text-xs uppercase tracking-widest p-4 rounded transition-all ${
                          isActive 
                            ? 'bg-red-600 text-white font-bold' 
                            : 'bg-neutral-950 text-neutral-400 border border-neutral-900 hover:border-neutral-700 hover:text-white'
                        }`}
                      >
                        Day {day.day}: {day.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* MAIN CONTENT: EXERCISE LIST */}
          <div className="w-full lg:w-3/4">
            <div className="bg-neutral-950 border border-neutral-900 rounded p-6 md:p-10">
              
              <div className="mb-10 pb-6 border-b border-neutral-800">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                  Week {activeWeek} — Day {activeDay}
                </h2>
                <p className="text-neutral-400 font-mono text-sm mt-2 uppercase tracking-widest">
                  Focus: {currentDayData.title}
                </p>
              </div>

              <div className="space-y-4">
                {/* Headers (Desktop only) */}
                <div className="hidden md:grid grid-cols-12 gap-4 font-mono text-xs uppercase tracking-widest text-neutral-500 pb-2 border-b border-neutral-900">
                  <div className="col-span-1 text-center">Status</div>
                  <div className="col-span-5">Movement</div>
                  <div className="col-span-2 text-center">Sets</div>
                  <div className="col-span-2 text-center">Reps</div>
                  <div className="col-span-2 text-right">Notes</div>
                </div>

                {/* Exercises */}
                {currentDayData.exercises.map((exercise, index) => {
                  const exerciseId = `w${activeWeek}-d${activeDay}-e${index}`;
                  const isCompleted = completedExercises[exerciseId];

                  return (
                    <div 
                      key={index} 
                      className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 rounded border transition-all cursor-pointer ${
                        isCompleted 
                          ? 'bg-green-900/10 border-green-900/50 opacity-50 grayscale' 
                          : 'bg-black border-neutral-800 hover:border-red-600/50'
                      }`}
                      onClick={() => toggleExercise(exerciseId)}
                    >
                      {/* Mobile Checkbox / Desktop Status */}
                      <div className="col-span-1 flex items-center justify-between md:justify-center">
                        <span className="md:hidden font-mono text-xs uppercase tracking-widest text-neutral-500">Status</span>
                        <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${
                          isCompleted ? 'bg-green-500 border-green-500 text-black' : 'bg-neutral-900 border-neutral-700 text-transparent'
                        }`}>
                          ✓
                        </div>
                      </div>

                      {/* Movement Name */}
                      <div className="col-span-5">
                        <h4 className={`font-bold uppercase tracking-tight ${isCompleted ? 'text-neutral-400 line-through' : 'text-white'}`}>
                          {exercise.name}
                        </h4>
                      </div>

                      {/* Sets */}
                      <div className="col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden font-mono text-[10px] uppercase tracking-widest text-neutral-500">Sets</span>
                        <span className="font-black text-xl text-neutral-300">{exercise.sets}</span>
                      </div>

                      {/* Reps */}
                      <div className="col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden font-mono text-[10px] uppercase tracking-widest text-neutral-500">Reps</span>
                        <span className="font-mono text-sm uppercase text-red-500 font-bold">{exercise.reps}</span>
                      </div>

                      {/* Notes */}
                      <div className="col-span-2 mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-900 text-left md:text-right">
                        <span className="md:hidden font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">Coach Notes</span>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 leading-relaxed">
                          {exercise.notes}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}