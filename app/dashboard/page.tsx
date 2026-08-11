import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import JumpLogger from '@/components/jump-logger';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // FIX 1: Sort by date_recorded instead of created_at
  const { data: logs, error } = await supabase
    .from('vertical_jump_logs')
    .select('*')
    .eq('profile_id', user.id)
    .order('date_recorded', { ascending: false });

  if (error) {
    console.error('Error fetching logs:', error.message);
  }

  const totalLogs = logs?.length || 0;
  
  // FIX 2: Calculate Vertical Score (Running - Standing)
  let maxVerticalScoreCm = 0;
  
  if (logs && logs.length > 0) {
    logs.forEach((log) => {
      const standing = log.standing_vertical_cm || 0;
      const running = log.running_vertical_cm || 0;
      
      // Vertical Score Delta
      const score = running - standing;
      
      if (score > maxVerticalScoreCm) {
        maxVerticalScoreCm = score;
      }
    });
  }
  
  // Convert the max vertical score to inches
  const maxVerticalScoreInches = maxVerticalScoreCm > 0 
    ? (maxVerticalScoreCm / 2.54).toFixed(1) 
    : '0.0';
    
  const firstName = user.user_metadata?.first_name || 'ATHLETE';

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
          <div>
            <p className="text-red-600 font-mono text-xs uppercase tracking-widest">Member Platform</p>
            <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
              Welcome, {firstName}
            </h1>
          </div>
          <form action="/actions/auth/signout" method="POST">
            <button type="submit" className="border border-neutral-700 hover:border-white px-4 py-2 text-sm font-mono uppercase tracking-wider transition">
              Sign Out
            </button>
          </form>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded">
            <p className="text-xs text-neutral-400 font-mono uppercase">Max Vertical Score</p>
            <p className="text-4xl font-extrabold mt-2">{maxVerticalScoreInches} <span className="text-sm font-normal text-neutral-500">INCHES</span></p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded">
            <p className="text-xs text-neutral-400 font-mono uppercase">Active Program</p>
            <p className="text-xl font-bold text-yellow-500 mt-2">4-WEEK FOUNDATION</p>
            <Link href="/dashboard/workouts" className="inline-block mt-4 text-xs font-mono uppercase text-neutral-300 hover:text-white border-b border-neutral-700">
              View Workouts →
            </Link>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded">
            <p className="text-xs text-neutral-400 font-mono uppercase">Total Logs</p>
            <p className="text-4xl font-extrabold mt-2">{totalLogs}</p>
          </div>
        </div>

        {/* Log Jump Form */}
        <JumpLogger userId={user.id} />

      </div>
    </div>
  );
}