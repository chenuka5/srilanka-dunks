import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function ResourcesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <div className="flex-grow pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">Knowledge Base</p>
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-6">Resources</h1>
        <p className="text-neutral-400 max-w-lg">Training articles, recovery protocols, and nutrition guides coming soon.</p>
      </div>
      <Footer />
    </main>
  );
}