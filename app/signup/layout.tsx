
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create an Account',
  description:
    'Create your Sri Lanka Dunks account and get started with athletic performance and vertical jump development.',
  alternates: {
    canonical: 'https://srilankadunks.com/signup',
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
