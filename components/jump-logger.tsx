'use client';

import { useState } from 'react';
import { logJumpAction } from '@/app/actions/metrics';

interface JumpLoggerProps {
  userId: string;
}

export default function JumpLogger({ userId }: JumpLoggerProps) {
  const [standing, setStanding] = useState('');
  const [running, setRunning] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('standingVertical', standing);
      formData.append('runningVertical', running);
      formData.append('userId', userId);

      await logJumpAction(formData);
      setStanding('');
      setRunning('');
      window.location.reload(); // Force refresh dashboard data immediately
    } catch (err: any) {
      setErrorMsg('Failed to log result. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded space-y-4">
      <h2 className="text-lg font-bold font-mono uppercase">Log New Jump Test</h2>
      
      {errorMsg && (
        <p className="text-red-500 text-xs font-mono">{errorMsg}</p>
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