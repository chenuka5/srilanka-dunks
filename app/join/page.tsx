import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function JoinPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <div className="flex-grow pt-32 pb-24 px-6 lg:px-12 max-w-3xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">Community</p>
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">Join the Movement</h1>
          <p className="text-neutral-400">Sign up to get exclusive access to training programs, camp announcements, and athlete resources.</p>
        </div>

        <form action="/thank-you" className="bg-neutral-900 border border-neutral-800 p-8 rounded space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-neutral-400">First Name</label>
              <input required type="text" className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-neutral-400">Last Name</label>
              <input required type="text" className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-neutral-400">Email Address</label>
            <input required type="email" className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase text-neutral-400">Primary Sport / Goal (Optional)</label>
            <input type="text" placeholder="e.g. Basketball, Dunking, Volleyball" className="w-full bg-black border border-neutral-800 rounded px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors placeholder:text-neutral-700" />
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold font-mono uppercase tracking-widest text-sm py-4 rounded transition-colors mt-4">
            Join Free →
          </button>
        </form>
      </div>
      <Footer />
    </main>
  );
}