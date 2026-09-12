import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Loan Calculator — Calculate monthly payments, total interest, and full amor... | ToolCraftKit',
  description: 'Calculate monthly payments, total interest, and full amortization schedule for mortgages and loans.',
  openGraph: {
    title: 'Loan Calculator — Calculate monthly payments, total interest, and full amor... | ToolCraftKit',
    description: 'Calculate monthly payments, total interest, and full amortization schedule for mortgages and loans.',
    url: 'https://toolcraftkit.com/tools/loan-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Loan Calculator — Calculate monthly payments, total interest, and full amor... | ToolCraftKit',
    description: 'Calculate monthly payments, total interest, and full amortization schedule for mortgages and loans.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/loan-calculator',
  },
};

export default function Page() {
  return <ClientPage />;
}
