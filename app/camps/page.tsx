import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function CampsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <div className="flex-grow pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">In-Person Training</p>
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-6">Vertical Camps</h1>
        <p className="text-neutral-400 max-w-lg mb-10">Details for the 2025 and upcoming Sri Lanka Dunks camps are being finalised. Stay tuned.</p>
        <Link href="/join" className="bg-white text-black hover:bg-neutral-200 font-bold font-mono uppercase tracking-widest text-sm px-8 py-4 rounded transition-colors">
          Join the Waitlist
        </Link>
      </div>
      <Footer />
    </main>
  );
}