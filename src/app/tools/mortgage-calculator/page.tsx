import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Estimate monthly mortgage payments with taxes, insurance,... | ToolCraftKit',
  description: 'Estimate monthly mortgage payments with taxes, insurance, and full amortization schedule.',
  openGraph: {
    title: 'Mortgage Calculator — Estimate monthly mortgage payments with taxes, insurance,... | ToolCraftKit',
    description: 'Estimate monthly mortgage payments with taxes, insurance, and full amortization schedule.',
    url: 'https://toolcraftkit.com/tools/mortgage-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Mortgage Calculator — Estimate monthly mortgage payments with taxes, insurance,... | ToolCraftKit',
    description: 'Estimate monthly mortgage payments with taxes, insurance, and full amortization schedule.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/mortgage-calculator',
  },
};

export default function Page() {
  return <ClientPage />;
}
