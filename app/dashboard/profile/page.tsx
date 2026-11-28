
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import AthleteProfileForm from '../../../components/athlete-profile-form';

export const dynamic = 'force-dynamic';

export default async function AthleteProfilePage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select(`
      id,
      first_name,
      last_name,
      avatar_url,
      phone,
      date_of_birth,
      height_cm,
      weight_kg,
      country,
      city,
      sport,
      playing_position,
      dominant_hand,
      goals,
      experience_level,
      bio,
      emergency_contact_name,
      emergency_contact_phone,
      emergency_contact_relationship
    `)
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Athlete profile error:', error.message);
  }

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="pt-36 pb-16 px-6 flex-grow">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/dashboard"
            className="inline-block text-neutral-500 hover:text-white font-mono text-xs uppercase tracking-widest mb-8 transition-colors"
          >
            ← Back to Dashboard
          </Link>

          <div className="mb-10">
            <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold mb-3">
              Sri Lanka Dunks // Athlete Management
            </p>

            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              My Athlete <span className="text-red-600">Profile.</span>
            </h1>

            <p className="text-neutral-500 text-sm mt-4 max-w-2xl leading-relaxed">
              Manage your personal information, physical measurements
              and athletic development details.
            </p>
          </div>

          {!profile ? (
            <div className="border border-red-900 bg-red-950/20 p-5 rounded">
              <p className="text-red-400 text-sm">
                Your athlete profile could not be found. Please contact
                Sri Lanka Dunks support.
              </p>
            </div>
          ) : (
            <AthleteProfileForm
              userId={user.id}
              email={user.email || ''}
              initialProfile={profile}
            />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
