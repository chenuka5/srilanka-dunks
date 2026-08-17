import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://srilankadunks.com'),
  title: {
    default: 'Sri Lanka Dunks | Athletic Performance Training',
    template: '%s | Sri Lanka Dunks'
  },
  description: 'Sri Lanka Dunks helps Sri Lankan athletes jump higher, move better and become stronger through modern athletic performance training, vertical jump development, strength, power and plyometrics.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Sri Lanka Dunks | Rise Above.',
    description: 'Athletic performance for Sri Lankan athletes. Take the vertical jump test, view the leaderboard, and access world-class training.',
    url: 'https://srilankadunks.com',
    siteName: 'Sri Lanka Dunks',
    images: [
      {
        url: '/hero-bg-.jpg',
        width: 1200,
        height: 630,
        alt: 'Sri Lanka Dunks - Rise Above.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sri Lanka Dunks | Rise Above.',
    description: 'Athletic performance for Sri Lankan athletes. Take the vertical jump test, view the leaderboard, and access world-class training.',
    images: ['/hero-bg-.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}