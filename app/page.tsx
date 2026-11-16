
import type { Metadata } from 'next';
import HomePage from './home-client';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Page() {
  return <HomePage />;
}
