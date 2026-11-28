
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type AthleteProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  date_of_birth: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  country: string | null;
  city: string | null;
  sport: string | null;
  playing_position: string | null;
  dominant_hand: string | null;
  goals: string | null;
  experience_level: string | null;
  bio: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  emergency_contact_relationship: string | null;
};

type Props = {
  userId: string;
  email: string;
  initialProfile: AthleteProfile;
};

const inputClass =
  'w-full bg-black border border-neutral-800 focus:border-red-600 rounded p-3 text-white text-sm outline-none transition-colors';

const labelClass =
  'block text-neutral-400 font-mono text-[10px] uppercase tracking-widest mb-2';

const sectionClass =
  'bg-neutral-950 border border-neutral-800 rounded p-6 md:p-8 space-y-6';

export default function AthleteProfileForm({
  userId,
  email,
  initialProfile,
}: Props) {
  const supabase = createClient();

  const [form, setForm] = useState({
    first_name: initialProfile.first_name || '',
    last_name: initialProfile.last_name || '',
    phone: initialProfile.phone || '',
    date_of_birth: initialProfile.date_of_birth || '',
    height_cm:
      initialProfile.height_cm != null
        ? String(initialProfile.height_cm)
        : '',
    weight_kg:
      initialProfile.weight_kg != null
        ? String(initialProfile.weight_kg)
        : '',
    country: initialProfile.country || '',
    city: initialProfile.city || '',
    sport: initialProfile.sport || '',
    playing_position: initialProfile.playing_position || '',
    dominant_hand: initialProfile.dominant_hand || '',
    goals: initialProfile.goals || '',
    experience_level: initialProfile.experience_level || '',
    bio: initialProfile.bio || '',
    emergency_contact_name:
      initialProfile.emergency_contact_name || '',
    emergency_contact_phone:
      initialProfile.emergency_contact_phone || '',
    emergency_contact_relationship:
      initialProfile.emergency_contact_relationship || '',
  });

  const [avatarUrl, setAvatarUrl] = useState(
    initialProfile.avatar_url || ''
  );
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState(
    initialProfile.avatar_url || ''
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError('');
    setMessage('');

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a JPG, PNG or WEBP image.');
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Your profile photo must be smaller than 5 MB.');
      event.target.value = '';
      return;
    }

    setSelectedPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const uploadPhoto = async (): Promise<string | null> => {
    if (!selectedPhoto) return avatarUrl || null;

    const extension =
      selectedPhoto.name.split('.').pop()?.toLowerCase() || 'jpg';

    const filePath =
      `${userId}/${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from('athlete-avatars')
      .upload(filePath, selectedPhoto, {
        cacheControl: '3600',
        upsert: false,
        contentType: selectedPhoto.type,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from('athlete-avatars')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSaving(true);
    setError('');
    setMessage('');

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user || user.id !== userId) {
        throw new Error('Your session has expired. Please log in again.');
      }

      const height = form.height_cm.trim()
        ? Number(form.height_cm)
        : null;

      const weight = form.weight_kg.trim()
        ? Number(form.weight_kg)
        : null;

      if (
        height !== null &&
        (!Number.isFinite(height) || height <= 0 || height > 300)
      ) {
        throw new Error('Please enter a valid height in centimetres.');
      }

      if (
        weight !== null &&
        (!Number.isFinite(weight) || weight <= 0 || weight > 500)
      ) {
        throw new Error('Please enter a valid weight in kilograms.');
      }

      const newAvatarUrl = await uploadPhoto();

      const payload = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        phone: form.phone.trim() || null,
        date_of_birth: form.date_of_birth || null,
        height_cm: height,
        weight_kg: weight,
        country: form.country.trim() || null,
        city: form.city.trim() || null,
        sport: form.sport.trim() || null,
        playing_position: form.playing_position.trim() || null,
        dominant_hand: form.dominant_hand || null,
        goals: form.goals.trim() || null,
        experience_level: form.experience_level || null,
        bio: form.bio.trim() || null,
        emergency_contact_name:
          form.emergency_contact_name.trim() || null,
        emergency_contact_phone:
          form.emergency_contact_phone.trim() || null,
        emergency_contact_relationship:
          form.emergency_contact_relationship.trim() || null,
        avatar_url: newAvatarUrl,
        updated_at: new Date().toISOString(),
      };

      const { error: updateError } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', userId);

      if (updateError) {
        throw new Error(updateError.message);
      }

      setAvatarUrl(newAvatarUrl || '');
      setSelectedPhoto(null);
      setMessage('Your athlete profile has been updated successfully.');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to update your profile. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* PROFILE PHOTO */}
      <section className={sectionClass}>
        <div>
          <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
            Profile Identity
          </p>
          <h2 className="text-xl font-black uppercase mt-2">
            Athlete Photo
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 rounded-full border-2 border-red-600 bg-black overflow-hidden flex items-center justify-center flex-shrink-0">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Athlete profile preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl text-neutral-600 font-black">
                {form.first_name.charAt(0).toUpperCase() || 'A'}
              </span>
            )}
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <label className="inline-block bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded cursor-pointer font-mono text-xs uppercase tracking-widest font-bold transition-colors">
              Upload Photo
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>

            <p className="text-neutral-600 text-[10px] font-mono uppercase tracking-widest">
              JPG, PNG or WEBP // Maximum 5 MB
            </p>
          </div>
        </div>
      </section>

      {/* PERSONAL INFORMATION */}
      <section className={sectionClass}>
        <div>
          <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
            01 // Identity
          </p>
          <h2 className="text-xl font-black uppercase mt-2">
            Personal Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>First Name</label>
            <input
              required
              value={form.first_name}
              onChange={(e) => updateField('first_name', e.target.value)}
              className={inputClass}
              autoComplete="given-name"
            />
          </div>

          <div>
            <label className={labelClass}>Last Name</label>
            <input
              required
              value={form.last_name}
              onChange={(e) => updateField('last_name', e.target.value)}
              className={inputClass}
              autoComplete="family-name"
            />
          </div>

          <div>
            <label className={labelClass}>Email Address</label>
            <input
              value={email}
              disabled
              className={`${inputClass} opacity-50 cursor-not-allowed`}
            />
            <p className="text-neutral-600 text-[10px] mt-2">
              Your login email is managed through account settings.
            </p>
          </div>

          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className={inputClass}
              autoComplete="tel"
              placeholder="+94..."
            />
          </div>

          <div>
            <label className={labelClass}>Date of Birth</label>
            <input
              type="date"
              value={form.date_of_birth}
              onChange={(e) => updateField('date_of_birth', e.target.value)}
              className={inputClass}
              autoComplete="bday"
            />
          </div>
        </div>
      </section>

      {/* PHYSICAL PROFILE */}
      <section className={sectionClass}>
        <div>
          <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
            02 // Physical Profile
          </p>
          <h2 className="text-xl font-black uppercase mt-2">
            Athlete Measurements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Height (CM)</label>
            <input
              type="number"
              min="1"
              max="300"
              step="0.1"
              value={form.height_cm}
              onChange={(e) => updateField('height_cm', e.target.value)}
              className={inputClass}
              placeholder="e.g. 190"
            />
          </div>

          <div>
            <label className={labelClass}>Weight (KG)</label>
            <input
              type="number"
              min="1"
              max="500"
              step="0.1"
              value={form.weight_kg}
              onChange={(e) => updateField('weight_kg', e.target.value)}
              className={inputClass}
              placeholder="e.g. 85"
            />
          </div>
        </div>
      </section>

      {/* SPORT AND DEVELOPMENT */}
      <section className={sectionClass}>
        <div>
          <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
            03 // Athlete Development
          </p>
          <h2 className="text-xl font-black uppercase mt-2">
            Sport & Performance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Sport</label>
            <input
              value={form.sport}
              onChange={(e) => updateField('sport', e.target.value)}
              className={inputClass}
              placeholder="e.g. Basketball"
            />
          </div>

          <div>
            <label className={labelClass}>Playing Position</label>
            <input
              value={form.playing_position}
              onChange={(e) =>
                updateField('playing_position', e.target.value)
              }
              className={inputClass}
              placeholder="e.g. Point Guard"
            />
          </div>

          <div>
            <label className={labelClass}>Dominant Hand</label>
            <select
              value={form.dominant_hand}
              onChange={(e) =>
                updateField('dominant_hand', e.target.value)
              }
              className={inputClass}
            >
              <option value="">Select hand</option>
              <option value="Right">Right</option>
              <option value="Left">Left</option>
              <option value="Ambidextrous">Ambidextrous</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Experience Level</label>
            <select
              value={form.experience_level}
              onChange={(e) =>
                updateField('experience_level', e.target.value)
              }
              className={inputClass}
            >
              <option value="">Select experience</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Competitive">Competitive Athlete</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Country</label>
            <input
              value={form.country}
              onChange={(e) => updateField('country', e.target.value)}
              className={inputClass}
              placeholder="e.g. Sri Lanka"
              autoComplete="country-name"
            />
          </div>

          <div>
            <label className={labelClass}>City</label>
            <input
              value={form.city}
              onChange={(e) => updateField('city', e.target.value)}
              className={inputClass}
              placeholder="e.g. Colombo"
              autoComplete="address-level2"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Athletic Goals</label>
          <textarea
            rows={4}
            value={form.goals}
            onChange={(e) => updateField('goals', e.target.value)}
            className={inputClass}
            placeholder="What are you working towards? For example: improve vertical jump, dunk a basketball, increase strength..."
          />
        </div>

        <div>
          <label className={labelClass}>Athlete Biography</label>
          <textarea
            rows={4}
            value={form.bio}
            onChange={(e) => updateField('bio', e.target.value)}
            className={inputClass}
            placeholder="Tell us a little about your sporting background..."
          />
        </div>
      </section>

      {/* EMERGENCY CONTACT */}
      <section className={sectionClass}>
        <div>
          <p className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold">
            04 // Safety Information
          </p>
          <h2 className="text-xl font-black uppercase mt-2">
            Emergency Contact
          </h2>
          <p className="text-neutral-500 text-xs mt-2 leading-relaxed">
            These details are private and are not displayed on public
            athlete profiles or rankings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Contact Name</label>
            <input
              value={form.emergency_contact_name}
              onChange={(e) =>
                updateField('emergency_contact_name', e.target.value)
              }
              className={inputClass}
              placeholder="Full name"
            />
          </div>

          <div>
            <label className={labelClass}>Contact Phone</label>
            <input
              type="tel"
              value={form.emergency_contact_phone}
              onChange={(e) =>
                updateField('emergency_contact_phone', e.target.value)
              }
              className={inputClass}
              placeholder="+94..."
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Relationship</label>
            <input
              value={form.emergency_contact_relationship}
              onChange={(e) =>
                updateField(
                  'emergency_contact_relationship',
                  e.target.value
                )
              }
              className={inputClass}
              placeholder="e.g. Parent, Guardian, Spouse"
            />
          </div>
        </div>
      </section>

      {/* STATUS AND SAVE */}
      {error && (
        <div className="border border-red-800 bg-red-950/30 p-4 rounded">
          <p className="text-red-400 text-xs font-mono">{error}</p>
        </div>
      )}

      {message && (
        <div className="border border-green-800 bg-green-950/20 p-4 rounded">
          <p className="text-green-400 text-xs font-mono">{message}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-neutral-900 pt-6">
        <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest">
          Your profile is saved securely to your athlete account.
        </p>

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-mono text-xs uppercase tracking-widest font-bold px-10 py-4 rounded transition-all"
        >
          {saving ? 'Saving Profile...' : 'Save Athlete Profile →'}
        </button>
      </div>
    </form>
  );
}
