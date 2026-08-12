import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <div className="flex-grow pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">
            The Origin & The Mission
          </p>
          <h1 className="text-4xl md:text-7xl font-extrabold uppercase tracking-tight">
            About Sri Lanka Dunks
          </h1>
        </div>

        {/* Founder Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Black & White Founder Picture Card */}
          <div className="lg:col-span-5 border border-neutral-800 p-4 rounded bg-neutral-950">
            <div className="relative aspect-[3/4] rounded overflow-hidden bg-neutral-900 flex items-center justify-center border border-neutral-800">
              {/* Black and White Filter applied to your future image */}
              <img 
                src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop" 
                alt="Chenuka Kasthuriarachchi - Founder" 
                className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-red-500 font-mono text-xs uppercase tracking-widest mb-1">Founder & Lead Performance Director</p>
                <h3 className="text-2xl font-extrabold uppercase text-white">Chenuka Kasthuriarachchi</h3>
                <p className="text-neutral-400 font-mono text-xs mt-1">National Athlete | High Jump & Basketball</p>
              </div>
            </div>
            
            <div className="mt-4 p-4 border-t border-neutral-900 grid grid-cols-2 gap-4 text-center font-mono">
              <div className="bg-black p-3 rounded border border-neutral-900">
                <p className="text-red-600 font-bold text-lg">#1</p>
                <p className="text-neutral-500 text-[10px] uppercase">SL Youth High Jump</p>
              </div>
              <div className="bg-black p-3 rounded border border-neutral-900">
                <p className="text-red-600 font-bold text-lg">4th in Asia</p>
                <p className="text-neutral-500 text-[10px] uppercase">Youth Asian Champs</p>
              </div>
            </div>
          </div>

          {/* Founder Bio Story */}
          <div className="lg:col-span-7 space-y-8 text-neutral-300 leading-relaxed font-light">
            
            <div>
              <p className="text-red-600 font-mono text-xs uppercase tracking-widest mb-2">The Founder's Story</p>
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight">
                Built from Elite Performance.
              </h2>
            </div>

            <p className="text-lg text-white font-normal">
              Sri Lanka Dunks wasn't built on internet trends. It was built on over a decade of high-level track & field jumping mechanics, national basketball dominance, and exposure to elite international coaching.
            </p>

            <p>
              Representing S. Thomas’ College, Mount Lavinia, my journey began at age 12. By 15, I was competing on the national stage—ranking as the <strong className="text-white">#1 High Jumper in Sri Lanka</strong> across my age categories up to Under-19 in all-island and provincial championships. In 2018, I earned <strong className="text-white">4th place in Asia at the Youth Asian Championship</strong> in High Jump.
            </p>

            <p>
              On the basketball court, I competed at the highest tier, winning the <strong className="text-white">National A-Division Under-19 Championship at just 15 years old</strong> and being awarded <strong className="text-white">Best Defensive Player in Sri Lanka</strong>. I went on to secure Silver at the Mercantile Basketball Championship Dunk Contest—becoming the <strong className="text-white">youngest athlete in Sri Lankan history to win Silver in an open dunk contest</strong>. To this day, I am recognized as the only Sri Lankan athlete executing clean windmill dunks.
            </p>

            <div className="border-l-2 border-red-600 pl-6 py-2 my-8 bg-neutral-950 rounded-r">
              <p className="text-white font-mono text-sm italic">
                "The goal was never just to jump higher. It was to understand the exact science, biomechanics, and elastic tendon preparation that separates good athletes from elite ones."
              </p>
            </div>

            <h3 className="text-xl font-bold uppercase text-white tracking-wide pt-4">
              World-Class Coaching & International Pedigree
            </h3>

            <p>
              Throughout my career, I’ve had the privilege of learning directly from some of the most respected coaches in international athletics:
            </p>

            <ul className="space-y-3 font-mono text-xs text-neutral-400 border-l border-neutral-800 pl-4">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span><strong className="text-white">Timhu Richards</strong> — Athletic Coach at Jamaica College, Kingston (Jamaican Track & Field High Performance).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span><strong className="text-white">Sandro Bisetto</strong> — Olympic Coach at Melbourne University Athletics Club, instilling world-class jumper development protocols.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span><strong className="text-white">Jimmy Mullins (FromZero)</strong> — Currently training alongside elite NBA, NBL, and overseas professionals using advanced vertical jump technology.</span>
              </li>
            </ul>

            <p>
              After moving to Australia, I represented <strong className="text-white">Victoria University in High Jump and Basketball</strong>, placing <strong className="text-white">5th at the University Games in Sydney Olympic Park (2023)</strong> as the sole Sri Lankan athlete competing, followed by two seasons in the University Basketball League (UBL 2023 & 2024).
            </p>

            <p className="text-white font-medium pt-4">
              Sri Lanka Dunks exists to take this exact world-class knowledge, eliminate the guesswork, and give Sri Lankan athletes the modern performance system they deserve.
            </p>

            <div className="pt-6">
              <Link 
                href="/join"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold font-mono uppercase tracking-widest text-sm px-8 py-4 rounded transition-colors"
              >
                Join The Movement →
              </Link>
            </div>

          </div>

        </div>

        {/* Key Milestones Grid */}
        <div className="border-t border-neutral-900 pt-16">
          <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">Track Record</p>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-12">Career Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border border-neutral-800 p-6 rounded bg-neutral-950">
              <p className="text-3xl font-black text-white mb-1">4TH ASIA</p>
              <p className="text-red-500 font-mono text-xs uppercase mb-2">High Jump</p>
              <p className="text-neutral-500 text-xs">Youth Asian Championship 2018</p>
            </div>

            <div className="border border-neutral-800 p-6 rounded bg-neutral-950">
              <p className="text-3xl font-black text-white mb-1">NATIONAL #1</p>
              <p className="text-red-500 font-mono text-xs uppercase mb-2">Age Groups</p>
              <p className="text-neutral-500 text-xs">High Jump Champion up to U19</p>
            </div>

            <div className="border border-neutral-800 p-6 rounded bg-neutral-950">
              <p className="text-3xl font-black text-white mb-1">YOUNGEST SILVER</p>
              <p className="text-red-500 font-mono text-xs uppercase mb-2">Dunk Contest</p>
              <p className="text-neutral-500 text-xs">Mercantile Basketball Championship</p>
            </div>

            <div className="border border-neutral-800 p-6 rounded bg-neutral-950">
              <p className="text-3xl font-black text-white mb-1">5TH PLACE</p>
              <p className="text-red-500 font-mono text-xs uppercase mb-2">Uni Games Sydney</p>
              <p className="text-neutral-500 text-xs">Represented Victoria University 2023</p>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}