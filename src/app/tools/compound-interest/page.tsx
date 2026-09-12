import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator — See How Your Money Grows | ToolCraftKit',
  description: 'Free compound interest calculator. See how your money grows with compound interest and monthly contributions. Visual breakdown included.',
  openGraph: {
    title: 'Compound Interest Calculator — See How Your Money Grows | ToolCraftKit',
    description: 'Free compound interest calculator. See how your money grows with compound interest and monthly contributions. Visual breakdown included.',
    url: 'https://toolcraftkit.com/tools/compound-interest',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Compound Interest Calculator — See How Your Money Grows | ToolCraftKit',
    description: 'Free compound interest calculator. See how your money grows with compound interest and monthly contributions. Visual breakdown included.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/compound-interest',
  },
};

export default function Page() {
  return <ClientPage />;
}
