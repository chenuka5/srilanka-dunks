
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Training Camps',
  description:
    'Explore Sri Lanka Dunks athletic training camps and register your interest in upcoming events.',
  alternates: {
    canonical: 'https://srilankadunks.com/camps',
  },
};

export default function CampsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
