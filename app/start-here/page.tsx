import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function StartHerePage() {
  const pathways = [
    {
      step: '01',
      title: 'Test Your Vertical',
      desc: 'Find out exactly where your baseline is using our free public calculator.',
      href: '/vertical-jump-test',
      cta: 'Calculate Now →',
      color: 'border-neutral-800 hover:border-red-600',
      textHover: 'group-hover:text-red-600'
    },
    {
      step: '02',
      title: 'Get The Free Program',
      desc: 'Download our 4-Week Vertical Jump Starter program and begin your training immediately.',
      href: '/free-program',
      cta: 'Get Program →',
      color: 'border-neutral-800 hover:border-white',
      textHover: 'group-hover:text-white'
    },
    {
      step: '03',
      title: 'Explore Training',
      desc: 'Understand the science and methodologies behind the Sri Lanka Dunks system.',
      href: '/training',
      cta: 'View Protocols →',
      color: 'border-neutral-800 hover:border-red-600',
      textHover: 'group-hover:text-red-600'
    },
    {
      step: '04',
      title: 'Join The Community',
      desc: 'Connect with other Sri Lankan athletes, get jump tips, and access exclusive opportunities.',
      href: '/community',
      cta: 'Join Free →',
      color: 'border-neutral-800 hover:border-gold-500 hover:border-yellow-500',
      textHover: 'group-hover:text-yellow-500'
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="pt-40 pb-32 px-6 flex-grow flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-sm font-mono text-red-600 uppercase tracking-widest font-bold">
              New to Sri Lanka Dunks?
            </h1>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white">
              Start Here.
            </h2>
            <p className="text-neutral-400 font-mono text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
              Choose your path below to begin building your explosive athletic foundation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pathways.map((path, idx) => (
              <Link 
                key={idx} 
                href={path.href} 
                className={`group block p-8 rounded border bg-neutral-950 transition-all duration-300 ${path.color}`}
              >
                <span className="text-neutral-700 font-black text-4xl block mb-4 transition-colors">
                  {path.step}
                </span>
                <h3 className={`text-2xl font-bold uppercase tracking-tight mb-2 transition-colors ${path.textHover}`}>
                  {path.title}
                </h3>
                <p className="text-neutral-400 font-mono text-xs leading-relaxed mb-8 h-10">
                  {path.desc}
                </p>
                <span className={`font-mono text-xs uppercase tracking-widest font-bold transition-colors ${path.textHover}`}>
                  {path.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}