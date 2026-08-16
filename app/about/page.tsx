import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function AboutPage() {
  const highlights = [
    { label: '#1 Youth High Jumper', detail: 'Sri Lanka National Rank (2015–2019)' },
    { label: '5th in Asia', detail: 'Youth Asian Athletics Championships (Thailand, 2018)' },
    { label: 'Dual-Sport National Athlete', detail: 'Represented Sri Lanka in Athletics & Basketball' },
    { label: 'Victorian State Finalist', detail: '4th Place, Victorian State Championships (2021)' },
    { label: 'Elite Coaching Pedigree', detail: 'Trained under Sandro Bisetto (Level 5) & Timhu Richards' },
    { label: 'Modern S&C Principles', detail: 'Methodologies influenced by NBA S&C Coach Jimmy Mullins' },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-40 pb-16 px-6 border-b border-neutral-900 bg-neutral-950">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold">
            The Vision & Heritage
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9]">
            Sri Lankan Roots.<br />
            <span className="text-neutral-500">World-Class Science.</span>
          </h1>
          <p className="text-neutral-400 font-mono text-xs md:text-sm max-w-2xl mx-auto uppercase tracking-widest leading-relaxed pt-2">
            Bridging natural athletic talent with modern performance, explosive power, and vertical jump biomechanics.
          </p>
        </div>
      </section>

      {/* FOUNDER SPOTLIGHT & ACHIEVEMENTS GRID */}
      <section className="py-24 px-6 bg-black border-b border-neutral-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Image & Quick Badge Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative group overflow-hidden rounded border border-neutral-800 hover:border-red-600 transition-colors">
              <img 
                src="/chenuka.jpg" 
                alt="Chenuka - Founder of Sri Lanka Dunks" 
                className="w-full aspect-[4/5] object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-red-600 font-mono text-[10px] uppercase tracking-widest font-bold border border-red-600/30 bg-red-950/60 px-2.5 py-1 rounded inline-block mb-2">
                  Athlete • Coach • Founder
                </span>
                <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                  Chenuka
                </h2>
              </div>
            </div>

            <div className="p-6 bg-neutral-950 border border-neutral-900 rounded space-y-3">
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                "Sri Lanka has the talent. We want to build the system around it."
              </p>
            </div>
          </div>

          {/* Profile & Key Highlights Column */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold mb-2">
                The Founder's Journey
              </p>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-6">
                From National Champion to Performance Architect
              </h3>
              <p className="text-neutral-300 font-mono text-sm leading-relaxed mb-4">
                My journey in athletics began at 12 years old, driven by a deep fascination with jumping higher and discovering the true limits of physical capability. What began as raw passion evolved into high jump mastery, international competition, and elite athletic performance coaching.
              </p>
              <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                Having competed at the highest youth level in Asia and continued my career across Australia, I witnessed the critical gap back home: immense natural athleticism lacking access to modern biomechanics, rate of force development, and structured power programming. Sri Lanka Dunks is the answer.
              </p>
            </div>

            {/* Career Highlights Grid */}
            <div className="pt-6 border-t border-neutral-900">
              <h4 className="text-xs font-mono text-white uppercase tracking-widest font-bold mb-6">
                Proven Track Record & Credentials
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item, idx) => (
                  <div key={idx} className="p-4 bg-neutral-950 border border-neutral-900 rounded hover:border-neutral-700 transition-colors">
                    <p className="text-red-600 font-bold uppercase tracking-tight text-sm mb-1">
                      {item.label}
                    </p>
                    <p className="text-neutral-400 font-mono text-xs leading-snug">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FULL CHRONOLOGICAL NARRATIVE */}
      <section className="py-24 px-6 bg-neutral-950 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold">The Story</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Behind The Movement
            </h2>
          </div>

          {/* Chapter 1 */}
          <div className="space-y-4 border-l-2 border-neutral-800 pl-6 relative">
            <div className="w-3 h-3 rounded-full bg-red-600 absolute -left-[7px] top-1.5" />
            <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest">2012 – 2019</span>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white">
              The Genesis & National Dominance
            </h3>
            <p className="text-neutral-300 font-mono text-sm leading-relaxed">
              Throughout my teenage years, I trained and competed extensively in high jump, developing a deep understanding of jumping mechanics, explosiveness, strength, speed, plyometrics, take-off mechanics, and the relentless discipline required to excel.
            </p>
            <p className="text-neutral-400 font-mono text-sm leading-relaxed">
              In 2017, I had the opportunity to train with <strong>Timhu Richards</strong>, an esteemed coach associated with Jamaica College in Kingston, Jamaica, gaining firsthand exposure to world-class Jamaican sprint and jump paradigms. From 2015 to 2019, I was ranked <strong>#1 in Sri Lanka in youth high jump</strong>, went on to place <strong>5th in Asia at the 2018 Youth Asian Athletics Championship in Thailand</strong>, and represented Sri Lanka at the South Asian Basketball Games.
            </p>
          </div>

          {/* Chapter 2 */}
          <div className="space-y-4 border-l-2 border-neutral-800 pl-6 relative">
            <div className="w-3 h-3 rounded-full bg-red-600 absolute -left-[7px] top-1.5" />
            <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest">2020 – 2023</span>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white">
              Melbourne, Elite Mentorship & The Science
            </h3>
            <p className="text-neutral-300 font-mono text-sm leading-relaxed">
              In 2020, I moved to Melbourne, Australia. Here, I had the privilege of working with <strong>Sandro Bisetto</strong>, an experienced Australian high-performance jumps coach and Athletics Australia Level 5 Academy Coach known for mentoring Olympians and World Championship competitors.
            </p>
            <p className="text-neutral-400 font-mono text-sm leading-relaxed">
              Working with Sandro transformed my understanding of high-jump technique, biomechanics, programming, strength & conditioning, recovery, and long-term athletic development. Alongside placing 4th at the 2021 Victorian State Athletics Championship and competing for Victoria University Basketball (2021–2022), I immersed myself in advanced performance science, including methodologies learned through NBA Strength & Conditioning Coach <strong>Jimmy Mullins</strong>.
            </p>
          </div>

          {/* Chapter 3 */}
          <div className="space-y-4 border-l-2 border-neutral-800 pl-6 relative">
            <div className="w-3 h-3 rounded-full bg-red-600 absolute -left-[7px] top-1.5" />
            <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest">2024 & Beyond</span>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white">
              Sri Lanka Dunks: The Physical Movement
            </h3>
            <p className="text-neutral-300 font-mono text-sm leading-relaxed">
              Recognizing that Sri Lanka's elite raw talent lacked access to structured athletic performance systems, Sri Lanka Dunks was launched. In 2024, we held our inaugural Vertical Jump Camp in Sri Lanka. We returned in 2025 to elevate the standard further, coaching and testing a new wave of high-intent athletes.
            </p>
            <p className="text-neutral-400 font-mono text-sm leading-relaxed">
              Today, Sri Lanka Dunks is evolving into a full online ecosystem and in-person academy dedicated to empowering Sri Lankan athletes worldwide to jump higher, move faster, and build resilient athletic bodies.
            </p>
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 px-6 bg-black text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
            Ready to Unlock <br /><span className="text-red-600">Your Full Potential?</span>
          </h2>
          <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest max-w-md mx-auto">
            Join the movement, test your vertical, or access elite training programming today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/join" 
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded font-bold transition-all shadow-lg shadow-red-600/20 hover:scale-105"
            >
              Join The Movement →
            </Link>
            <Link 
              href="/vertical-jump-test" 
              className="w-full sm:w-auto bg-transparent border border-neutral-700 hover:border-white text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded font-bold hover:bg-white hover:text-black transition-all"
            >
              Take Jump Test →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}