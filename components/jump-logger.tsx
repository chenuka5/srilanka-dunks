'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation'; // <-- Import useRouter

interface JumpLoggerProps {
  userId: string;
}

export default function JumpLogger({ userId }: JumpLoggerProps) {
  const router = useRouter(); // <-- Initialize router
  const [standing, setStanding] = useState('');
  const [running, setRunning] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    const standingNum = parseFloat(standing);
    const runningNum = parseFloat(running);

    if (isNaN(standingNum) || isNaN(runningNum)) {
      setStatusMsg({ type: 'error', text: 'Please enter valid numbers.' });
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      
      const { data: { session } } = await supabase.auth.getSession();
      const activeUserId = session?.user?.id || userId;

      if (!activeUserId) {
        setStatusMsg({ type: 'error', text: 'User session not found. Please log in again.' });
        setLoading(false);
        return;
      }

      const { error } = await supabase
        .from('vertical_jump_logs')
        .insert({
          profile_id: activeUserId,
          standing_vertical_cm: standingNum,
          running_vertical_cm: runningNum,
        });

      if (error) {
        console.error('Supabase Error:', error);
        setStatusMsg({ type: 'error', text: `Database error: ${error.message}` });
        setLoading(false);
        return;
      }

      setStatusMsg({ type: 'success', text: 'Recorded! Updating stats...' });
      setStanding('');
      setRunning('');

      // <-- Tell Next.js to fetch fresh data from the server
      router.refresh(); 
      
      // Clear the success message after a moment
      setTimeout(() => {
        setStatusMsg(null);
        setLoading(false);
      }, 2000);

    } catch (err: any) {
      console.error('Unexpected Error:', err);
      setStatusMsg({ type: 'error', text: err.message || 'An unexpected error occurred.' });
      setLoading(false);
    }
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded space-y-4">
      <h2 className="text-lg font-bold font-mono uppercase">Log New Jump Test</h2>
      
      {statusMsg && (
        <div
          className={`p-3 rounded text-xs font-mono border ${
            statusMsg.type === 'error'
              ? 'bg-red-950/50 border-red-600 text-red-400'
              : 'bg-green-950/50 border-green-600 text-green-400'
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-xs text-gray-400 font-mono mb-2 uppercase">
            Standing Vertical (CM)
          </label>
          <input
            type="number"
            step="0.1"
            value={standing}
            onChange={(e) => setStanding(e.target.value)}
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
            value={running}
            onChange={(e) => setRunning(e.target.value)}
            placeholder="e.g. 88"
            required
            className="w-full bg-black border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-red-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded uppercase tracking-wider transition-colors cursor-pointer"
        >
          {loading ? 'Recording...' : 'Record Result →'}
        </button>
      </form>
    </div>
  );
}