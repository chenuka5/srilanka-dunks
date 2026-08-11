import React from 'react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { signOutAction } from '@/app/actions/auth';
import { logJumpAction } from '@/app/actions/metrics';
import Button from '@/components/ui/Button';

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch Profile & Metrics
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: jumpLogs } = await supabase
    .from('vertical_jump_logs')
    .select('*')
    .eq('profile_id', user.id)
    .order('date_recorded', { ascending: false });

  const latestJump = jumpLogs && jumpLogs.length > 0 ? jumpLogs[0] : null;
  const maxStandingInches = latestJump 
    ? (latestJump.standing_vertical_cm / 2.54).toFixed(1)
    : '--';

  return (
    <div className="min-h-screen bg-brand-black py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-brand-gray-900 pb-8 gap-4">
          <div>
            <span className="text-brand-crimson font-bold uppercase tracking-widest text-xs">MEMBER PLATFORM</span>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              WELCOME, {profile?.first_name || 'ATHLETE'}
            </h1>
          </div>
          <form action={signOutAction}>
            <Button type="submit" variant="outline">Sign Out</Button>
          </form>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-brand-surface p-8 border border-brand-gray-900">
            <h2 className="text-brand-gray-400 font-bold uppercase tracking-widest text-xs mb-2">MAX STANDING VERTICAL</h2>
            <p className="text-5xl font-black text-white tracking-tighter">{maxStandingInches} <span className="text-xl text-brand-gray-400">INCHES</span></p>
          </div>

          {/* ACTIVE PROGRAM CARD WITH WORKOUT BUTTON */}
          <div className="bg-brand-surface p-8 border border-brand-gray-900 flex flex-col justify-between">
            <div>
              <h2 className="text-brand-gray-400 font-bold uppercase tracking-widest text-xs mb-2">ACTIVE PROGRAM</h2>
              <p className="text-2xl font-black text-brand-gold tracking-tighter uppercase mb-4">4-WEEK FOUNDATION</p>
            </div>
            <Button href="/dashboard/workouts" variant="outline" className="w-full text-xs py-2">
              View Workouts →
            </Button>
          </div>

          <div className="bg-brand-surface p-8 border border-brand-gray-900">
            <h2 className="text-brand-gray-400 font-bold uppercase tracking-widest text-xs mb-2">TOTAL LOGS</h2>
            <p className="text-5xl font-black text-white tracking-tighter">{jumpLogs?.length || 0}</p>
          </div>
        </div>

        {/* Metric Logger Form */}
        <div className="bg-brand-surface p-8 border border-brand-gray-900">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">Log New Jump Test</h2>
          <form action={logJumpAction} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-2">
                Standing Vertical (cm)
              </label>
              <input 
                name="standingVertical" 
                type="number" 
                step="0.1" 
                required 
                placeholder="e.g. 75" 
                className="w-full bg-brand-black border border-brand-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-crimson" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-2">
                Running Vertical (cm) - Optional
              </label>
              <input 
                name="runningVertical" 
                type="number" 
                step="0.1" 
                placeholder="e.g. 88" 
                className="w-full bg-brand-black border border-brand-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-crimson" 
              />
            </div>
            <Button type="submit" variant="primary">Record Result →</Button>
          </form>
        </div>

      </div>
    </div>
  );
}