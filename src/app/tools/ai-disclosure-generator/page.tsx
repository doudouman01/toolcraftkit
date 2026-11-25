import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'AI Disclosure Statement Generator — SB 574 & EU AI Act Compliant | ToolCraftKit',
  description: 'Generate AI disclosure statements for court filings, academic papers, and business reports. Compliant with California SB 574, EU AI Act, and general best practices. Free.',
  openGraph: {
    title: 'AI Disclosure Statement Generator — SB 574 & EU AI Act Compliant | ToolCraftKit',
    description: 'Generate AI disclosure statements for court filings, academic papers, and business reports. Compliant with California SB 574, EU AI Act, and general best practices. Free.',
    url: 'https://toolcraftkit.com/tools/ai-disclosure-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AI Disclosure Statement Generator — SB 574 & EU AI Act Compliant | ToolCraftKit',
    description: 'Generate AI disclosure statements for court filings, academic papers, and business reports. Free.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/ai-disclosure-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}
