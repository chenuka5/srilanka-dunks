
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sri Lanka Dunks Jump Camps & Online Webinar',
  description:
    'Explore Sri Lanka Dunks vertical jump training camps, past events and free online webinars. Develop explosive power, jumping ability and athletic performance.',
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
