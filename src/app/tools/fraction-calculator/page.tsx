import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Fraction Calculator — Add, Subtract, Multiply, Divide Fractions | ToolCraftKit',
  description: 'Free fraction calculator. Add, subtract, multiply, divide fractions with step-by-step solutions. Mixed numbers, simplification, decimal and percentage conversion.',
  openGraph: {
    title: 'Fraction Calculator — Add, Subtract, Multiply, Divide Fractions | ToolCraftKit',
    description: 'Calculate fractions with step-by-step solutions. Mixed numbers, simplification, conversions.',
    url: 'https://toolcraftkit.com/tools/fraction-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Fraction Calculator | ToolCraftKit', description: 'Add, subtract, multiply, divide fractions with step-by-step solutions.' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/fraction-calculator' },
};

export default function Page() {
  return <ClientPage />;
}
