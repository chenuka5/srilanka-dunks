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

  const { data: logs, error } = await supabase
    .from('vertical_jump_logs')
    .select('*')
    .eq('profile_id', user.id)
    .order('date_recorded', { ascending: false });

  if (error) {
    console.error('Error fetching logs:', error.message);
  }

  const totalLogs = logs?.length || 0;
  let maxVerticalScoreCm = 0;
  
  if (logs && logs.length > 0) {
    logs.forEach((log) => {
      const standing = log.standing_vertical_cm || 0;
      const running = log.running_vertical_cm || 0;
      const score = running - standing;
      
      if (score > maxVerticalScoreCm) {
        maxVerticalScoreCm = score;
      }
    });
  }
  
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Log Jump Form */}
          <JumpLogger userId={user.id} />

          {/* Jump History Feed */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded space-y-4">
            <h2 className="text-lg font-bold font-mono uppercase">Jump History</h2>
            
            {logs && logs.length > 0 ? (
              <div className="overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-neutral-800 font-mono text-neutral-400 sticky top-0 bg-neutral-900">
                    <tr>
                      <th className="pb-3 pr-4 font-normal">Date</th>
                      <th className="pb-3 pr-4 font-normal">Stand</th>
                      <th className="pb-3 pr-4 font-normal">Run</th>
                      <th className="pb-3 text-red-500 font-normal">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => {
                      const score = (log.running_vertical_cm || 0) - (log.standing_vertical_cm || 0);
                      return (
                        <tr key={log.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors">
                          <td className="py-3 pr-4 text-neutral-300">
                            {new Date(log.date_recorded).toLocaleDateString()}
                          </td>
                          <td className="py-3 pr-4">{log.standing_vertical_cm}</td>
                          <td className="py-3 pr-4">{log.running_vertical_cm}</td>
                          <td className="py-3 font-bold text-red-500">+{score}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-neutral-500 font-mono">No jumps logged yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}