import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function Camp2025Page() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="pt-40 pb-20 px-6 border-b border-neutral-900 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest font-bold">
            Historical Archive
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            2025 <span className="text-red-600">The Next Level</span>
          </h1>
          <p className="text-neutral-300 font-mono text-sm max-w-2xl mx-auto leading-relaxed">
            Building upon the foundation. A new wave of dedicated athletes.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Media Placeholder */}
          <div className="w-full aspect-video bg-neutral-900 border border-neutral-800 rounded flex flex-col items-center justify-center text-neutral-600 font-mono text-xs uppercase tracking-widest">
            <span className="mb-2">Media Placeholder</span>
            <span>[Cloudinary Integration Pending]</span>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-neutral-300 font-mono text-sm leading-relaxed">
              Returning for our second year, the 2025 Vertical Jump Camp elevated the standard of training. We expanded our reach and solidified our coaching methodologies with athletes committed to pushing their physical limits.
            </p>
            <p className="text-neutral-300 font-mono text-sm leading-relaxed">
              The focus remained on translating raw athleticism into measurable, explosive power on the court and the field.
            </p>
          </div>

          <div className="text-center pt-12 border-t border-neutral-900">
            <Link href="/camps/upcoming" className="text-red-600 hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors">
              Join the Next Camp Waitlist →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}