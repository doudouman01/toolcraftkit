import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Income Tax Calculator — Estimate Federal Tax With Brackets | ToolCraftKit',
  description: 'Free income tax calculator. Estimate federal income tax for US, Canada, and UK with bracket breakdown. Quick and accurate.',
  openGraph: {
    title: 'Income Tax Calculator — Estimate Federal Tax With Brackets | ToolCraftKit',
    description: 'Free income tax calculator. Estimate federal income tax for US, Canada, and UK with bracket breakdown. Quick and accurate.',
    url: 'https://toolcraftkit.com/tools/tax-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Income Tax Calculator — Estimate Federal Tax With Brackets | ToolCraftKit',
    description: 'Free income tax calculator. Estimate federal income tax for US, Canada, and UK with bracket breakdown. Quick and accurate.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/tax-calculator',
  },
};

export default function Page() {
  return <ClientPage />;
}
