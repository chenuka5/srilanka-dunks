'use client';

import React, { useState } from 'react';
import { loginAction } from '@/app/actions/auth';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center py-32 px-6">
      <div className="max-w-md w-full bg-brand-surface p-8 border border-brand-gray-900">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">ATHLETE LOGIN</h1>
        <p className="text-brand-gray-400 text-sm mb-8">Access your training platform.</p>

        {error && (
          <div className="bg-brand-crimson/10 border border-brand-crimson text-brand-crimson text-sm p-4 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-2">Email</label>
            <input name="email" type="email" required className="w-full bg-brand-black border border-brand-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-crimson" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-gray-400 mb-2">Password</label>
            <input name="password" type="password" required className="w-full bg-brand-black border border-brand-gray-800 text-white px-4 py-3 focus:outline-none focus:border-brand-crimson" />
          </div>
          <Button type="submit" disabled={loading} className="w-full" variant="primary">
            {loading ? 'AUTHENTICATING...' : 'LOGIN TO DASHBOARD'}
          </Button>
        </form>
      </div>
    </div>
  );
}