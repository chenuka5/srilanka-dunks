import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://srilankadunks.com'),
  title: {
    default: 'Sri Lanka Dunks | Athletic Performance & Vertical Jump',
    template: '%s | Sri Lanka Dunks'
  },
  description: 'Modern athletic performance training for the next generation of Sri Lankan athletes. Rise above with our vertical jump and strength programs.',
  openGraph: {
    title: 'Sri Lanka Dunks | Athletic Performance',
    description: 'Modern athletic performance training for the next generation of Sri Lankan athletes.',
    url: 'https://srilankadunks.com',
    siteName: 'Sri Lanka Dunks',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Sri Lanka Dunks Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sri Lanka Dunks',
    description: 'Modern athletic performance training for the next generation of Sri Lankan athletes.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  }
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