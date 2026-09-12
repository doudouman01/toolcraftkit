import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'ROI Calculator — Calculate return on investment, net profit, and annualize... | ToolCraftKit',
  description: 'Calculate return on investment, net profit, and annualized CAGR for any investment.',
  openGraph: {
    title: 'ROI Calculator — Calculate return on investment, net profit, and annualize... | ToolCraftKit',
    description: 'Calculate return on investment, net profit, and annualized CAGR for any investment.',
    url: 'https://toolcraftkit.com/tools/roi-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'ROI Calculator — Calculate return on investment, net profit, and annualize... | ToolCraftKit',
    description: 'Calculate return on investment, net profit, and annualized CAGR for any investment.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/roi-calculator',
  },
};

export default function Page() {
  return <ClientPage />;
}
