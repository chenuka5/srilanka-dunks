import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <div className="flex-grow pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">The Vision</p>
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-6">About Us</h1>
        <p className="text-neutral-400 max-w-lg">We are building the premier athletic performance and vertical jump ecosystem for the next generation of Sri Lankan athletes.</p>
      </div>
      <Footer />
    </main>
  );
}