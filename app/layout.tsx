import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sri Lanka Dunks | Athletic Performance & Vertical Jump',
  description: 'Modern athletic performance training for the next generation of Sri Lankan athletes.',
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