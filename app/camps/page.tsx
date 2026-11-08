
'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function CampsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    dateOfBirth: '',
    school: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/webinar-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setEmailSent(result.emailSent === true);
        setIsSubmitted(true);
      } else if (response.status === 409) {
        setErrorMessage(
          'This email address is already registered. Please use a different email address.'
        );
      } else {
        setErrorMessage(
          result.error ||
            'There was an issue saving your registration. Please try again.'
        );
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setErrorMessage(
        'Failed to submit. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const pastCamps = [
    {
      year: '2025',
      title: 'The Next Level',
      description:
        'The second Sri Lanka Dunks Vertical Jump Camp brought athletes together to develop explosive power, improve jumping ability and pursue higher performance.',
      photos: [
        '/camps/2025/camp-1.jpg',
        '/camps/2025/camp-2.jpg',
        '/camps/2025/camp-3.jpg',
        '/camps/2025/camp-4.jpg',
        '/camps/2025/camp-5.jpg',
      ],
    },
    {
      year: '2024',
      title: 'The Beginning',
      description:
        'The first Sri Lanka Dunks Vertical Jump Camp marked the beginning of the mission to help Sri Lankan athletes improve their vertical jump and athletic performance.',
      photos: [
        '/camps/2024/camp-1.jpg',
        '/camps/2024/camp-2.jpg',
        '/camps/2024/camp-3.jpg',
      ],
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      {/* 2026 WEBINAR */}
      <section className="pt-36 pb-24 px-6 lg:px-12 max-w-5xl mx-auto w-full text-center flex-grow flex flex-col justify-center items-center">
        <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-red-500 font-mono text-xs uppercase tracking-widest font-bold">
            2026 Special Update
          </span>
        </div>

        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight">
          2026 Free Online Webinar
        </h1>

        <p className="mt-6 text-neutral-300 font-mono text-xs md:text-sm max-w-2xl leading-relaxed">
          Due to unavoidable circumstances, all physical in-person camps are
          suspended for this year. Instead, we are hosting an exclusive,{' '}
          <span className="text-red-500 font-bold">
            100% FREE 2026 Live Online Webinar
          </span>{' '}
          covering complete vertical jump biomechanics, strength programming,
          and explosive performance training.
        </p>

        <div className="mt-10 w-full max-w-xl border border-neutral-800 bg-neutral-950 p-8 rounded-xl text-left space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 font-mono text-xs gap-4">
            <span className="text-neutral-500 uppercase tracking-widest">
              Format
            </span>
            <span className="text-white font-bold uppercase text-right">
              Live Interactive Webinar
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 font-mono text-xs gap-4">
            <span className="text-neutral-500 uppercase tracking-widest">
              Date
            </span>
            <span className="text-white font-bold text-right">
              28 November 2026
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 font-mono text-xs gap-4">
            <span className="text-neutral-500 uppercase tracking-widest">
              Time
            </span>
            <span className="text-white font-bold text-right">
              11:00 AM – 2:00 PM (Sri Lanka)
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 font-mono text-xs gap-4">
            <span className="text-neutral-500 uppercase tracking-widest">
              Cost
            </span>
            <span className="text-red-500 font-bold uppercase text-right">
              Free
            </span>
          </div>
          <div className="flex justify-between items-center font-mono text-xs gap-4">
            <span className="text-neutral-500 uppercase tracking-widest">
              Access
            </span>
            <span className="text-white font-bold uppercase text-right">
              Registration Required
            </span>
          </div>
        </div>

        {/* REGISTRATION FORM */}
        <div className="mt-12 w-full max-w-xl border border-red-600/30 bg-neutral-950 p-8 rounded-xl text-left shadow-2xl">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-neutral-800 pb-4">
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                  Register for Free
                </h3>
                <p className="text-neutral-400 font-mono text-xs mt-1">
                  Complete the details below to secure your place in the 2026
                  webinar.
                </p>
              </div>

              <div>
                <label className="block text-neutral-300 font-mono text-xs uppercase tracking-wider mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="e.g. Pathum Nisanka"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-mono text-xs uppercase tracking-wider mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="athlete@domain.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-mono text-xs uppercase tracking-wider mb-2">
                  WhatsApp Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={30}
                  autoComplete="tel"
                  placeholder="+94 77 123 4567"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-mono text-xs uppercase tracking-wider mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  max={new Date().toISOString().split('T')[0]}
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dateOfBirth: e.target.value,
                    })
                  }
                  className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-red-600 transition-colors [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-mono text-xs uppercase tracking-wider mb-2">
                  School / Institution{' '}
                  <span className="text-neutral-500 normal-case">
                    (Optional)
                  </span>
                </label>
                <input
                  type="text"
                  maxLength={150}
                  placeholder="Enter your school, university or club"
                  value={formData.school}
                  onChange={(e) =>
                    setFormData({ ...formData, school: e.target.value })
                  }
                  className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white font-mono text-xs focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="border border-red-600/40 bg-red-600/10 rounded p-4"
                >
                  <p className="text-red-400 font-mono text-xs leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-mono text-xs md:text-sm uppercase tracking-widest py-4 rounded font-bold transition-all hover:scale-[1.02] shadow-lg shadow-red-600/20 disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Registering...' : 'Register for Free →'}
              </button>

              <p className="text-neutral-500 font-mono text-[10px] leading-relaxed text-center">
                By registering, you agree to receive webinar-related
                communications from Sri Lanka Dunks.
              </p>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-600/40">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                Registration Confirmed!
              </h3>

              <p className="text-neutral-400 font-mono text-xs leading-relaxed max-w-md mx-auto">
                Thank you,{' '}
                <span className="text-white font-bold">
                  {formData.fullName}
                </span>
                . Your registration for the Sri Lanka Dunks 2026 Free Online
                Webinar has been saved.
              </p>

              <div className="border border-neutral-800 bg-black rounded-lg p-4 text-left space-y-2">
                <p className="text-neutral-400 font-mono text-xs">
                  <span className="text-white font-bold">Date:</span> Saturday,
                  28 November 2026
                </p>
                <p className="text-neutral-400 font-mono text-xs">
                  <span className="text-white font-bold">Time:</span> 11:00 AM
                  – 2:00 PM Sri Lanka time
                </p>
                <p className="text-neutral-400 font-mono text-xs break-all">
                  <span className="text-white font-bold">Email:</span>{' '}
                  {formData.email}
                </p>
              </div>

              {emailSent ? (
                <p className="text-neutral-300 font-mono text-xs leading-relaxed">
                  A confirmation email has been sent to your email address.
                  Please check your Inbox, Spam, Junk or Promotions folder. Add{' '}
                  <span className="text-white">
                    camps@srilankadunks.com
                  </span>{' '}
                  to your contacts to help receive future updates.
                </p>
              ) : (
                <p className="text-neutral-300 font-mono text-xs leading-relaxed">
                  Your registration is saved, but we could not send the
                  confirmation email just now. Please check your email address
                  and contact us if you need assistance.
                </p>
              )}

              <p className="text-neutral-400 font-mono text-xs leading-relaxed">
                Your webinar joining instructions will be sent closer to the
                event.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* PAST CAMPS */}
      <section className="border-t border-neutral-900 bg-neutral-950 py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-red-600 uppercase tracking-widest mb-4">
              Our Journey
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              Past Camps
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-neutral-400 font-mono text-xs md:text-sm leading-relaxed">
              A look back at the athletes, hard work and memories that helped
              build Sri Lanka Dunks.
            </p>
          </div>

          <div className="space-y-24">
            {pastCamps.map((camp) => (
              <article
                key={camp.year}
                className="border-t border-neutral-800 pt-10"
              >
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                  <div>
                    <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold mb-3">
                      Sri Lanka Dunks / {camp.year}
                    </p>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                      {camp.title}
                    </h3>
                  </div>
                  <p className="text-neutral-400 font-mono text-xs leading-relaxed max-w-xl">
                    {camp.description}
                  </p>
                </div>

                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 ${
                    camp.year === '2025' ? 'lg:grid-cols-3' : 'lg:grid-cols-3'
                  } gap-4`}
                >
                  {camp.photos.map((photo, index) => (
                    <div
                      key={photo}
                      className="group relative overflow-hidden border border-neutral-800 bg-black rounded-lg"
                    >
                      <img
                        src={photo}
                        alt={`Sri Lanka Dunks ${camp.year} camp photo ${
                          index + 1
                        }`}
                        loading="lazy"
                        className="w-full h-72 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
