
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://srilankadunks.com'),

  title: {
    default: 'Sri Lanka Dunks | Vertical Jump & Athletic Performance Training',
    template: '%s | Sri Lanka Dunks',
  },

  description:
    'Sri Lanka Dunks helps Sri Lankan athletes jump higher and become better athletes through vertical jump training, basketball performance, strength and conditioning, explosive power and plyometrics.',

  openGraph: {
    title: 'Sri Lanka Dunks | Vertical Jump & Athletic Performance Training',
    description:
      'Build your vertical jump, explosive power and athletic performance. Discover modern sports performance training for athletes in Sri Lanka.',
    siteName: 'Sri Lanka Dunks',
    images: [
      {
        url: '/hero-bg-.jpg',
        width: 1200,
        height: 630,
        alt: 'Sri Lanka Dunks - Vertical Jump and Athletic Performance Training',
      },
    ],
    locale: 'en_LK',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Sri Lanka Dunks | Vertical Jump & Athletic Performance',
    description:
      'Helping Sri Lankan athletes jump higher, build explosive power and improve athletic performance.',
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
