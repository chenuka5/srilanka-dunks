'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function logJumpAction(formData: FormData): Promise<void> {
  const standingVerticalCm = parseFloat(formData.get('standingVertical') as string);
  const runningVerticalCm = parseFloat(formData.get('runningVertical') as string);
  const userId = formData.get('userId') as string;

  console.log('--- LOG JUMP ATTEMPT ---');
  console.log('User ID from Form:', userId);
  console.log('Standing (cm):', standingVerticalCm);
  console.log('Running (cm):', runningVerticalCm);

  if (isNaN(standingVerticalCm) || isNaN(runningVerticalCm) || !userId) {
    console.error('Validation failed: Missing values or invalid input');
    return;
  }

  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.from('vertical_jump_logs').insert({
    profile_id: userId,
    standing_vertical_cm: standingVerticalCm,
    running_vertical_cm: runningVerticalCm,
  }).select();

  if (error) {
    console.error('Supabase Insert Error:', error.message, error.details);
    return;
  }

  console.log('Successfully inserted row:', data);
  revalidatePath('/dashboard');
}