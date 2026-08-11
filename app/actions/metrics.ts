'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function logJumpAction(formData: FormData): Promise<void> {
  const standingVerticalCm = parseFloat(formData.get('standingVertical') as string);
  const runningVerticalCm = parseFloat(formData.get('runningVertical') as string);

  if (isNaN(standingVerticalCm) || isNaN(runningVerticalCm)) {
    return;
  }

  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase.from('vertical_jump_logs').insert({
    profile_id: user.id,
    standing_vertical_cm: standingVerticalCm,
    running_vertical_cm: runningVerticalCm,
  });

  if (error) {
    console.error('Error logging jump:', error.message);
    return;
  }

  revalidatePath('/dashboard');
}