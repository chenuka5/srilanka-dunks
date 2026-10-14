
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join Sri Lanka Dunks',
  description:
    'Join the Sri Lanka Dunks athlete community and share your sport, goals, and athletic performance ambitions.',
  alternates: {
    canonical: 'https://srilankadunks.com/join',
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
