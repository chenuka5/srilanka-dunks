
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vertical Jump Test',
  description:
    'Calculate your vertical jump height with the Sri Lanka Dunks vertical jump calculator.',
  alternates: {
    canonical: 'https://srilankadunks.com/vertical-jump-test',
  },
};

export default function VerticalJumpTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
