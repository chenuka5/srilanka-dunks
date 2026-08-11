import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { logJumpAction } from '@/app/actions/metrics';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch vertical jump logs for current user
  const { data: logs } = await supabase
    .from('vertical_jump_logs')
    .select('*')
    .eq('profile_id', user.id)
    .order('created_at', { ascending: false });

  const totalLogs = logs?.length || 0;
  
  // Get max standing vertical converted to inches for display
  const maxStandingCm = logs && logs.length > 0 
    ? Math.max(...logs.map(l => l.standing_vertical_cm || 0)) 
    : 0;
  const maxStandingInches = (maxStandingCm / 2.54).toFixed(1);

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
            <p className="text-xs text-neutral-400 font-mono uppercase">Max Standing Vertical</p>
            <p className="text-4xl font-extrabold mt-2">{maxStandingInches} <span className="text-sm font-normal text-neutral-500">INCHES</span></p>
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
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded space-y-4">
          <h2 className="text-lg font-bold font-mono uppercase">Log New Jump Test</h2>
          
          <form action={logJumpAction} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs text-gray-400 font-mono mb-2 uppercase">
                Standing Vertical (CM)
              </label>
              <input
                type="number"
                step="0.1"
                name="standingVertical"
                placeholder="e.g. 75"
                required
                className="w-full bg-black border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 font-mono mb-2 uppercase">
                Running Vertical (CM)
              </label>
              <input
                type="number"
                step="0.1"
                name="runningVertical"
                placeholder="e.g. 88"
                required
                className="w-full bg-black border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-red-600"
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded uppercase tracking-wider transition-colors"
            >
              Record Result →
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}