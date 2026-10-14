
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Athlete Login',
  description:
    'Log in to your Sri Lanka Dunks athlete account to access your training journey and athlete resources.',
  alternates: {
    canonical: 'https://srilankadunks.com/login',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
