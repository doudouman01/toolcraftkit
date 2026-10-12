import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'AI Content Detector — Detect AI-Generated Text | ToolCraftKit',
  description: 'Premium AI content detector. Analyze text to identify AI-generated content. Get detailed reports with confidence scores and writing pattern analysis.',
  openGraph: {
    title: 'AI Content Detector — Detect AI-Generated Text | ToolCraftKit',
    description: 'Premium AI content detector. Analyze text to identify AI-generated content with confidence scores.',
    url: 'https://toolcraftkit.com/tools/ai-content-detector',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'AI Content Detector — Detect AI-Generated Text | ToolCraftKit', description: 'Premium AI content detector with confidence scores and writing analysis.' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/ai-content-detector' },
};

export default function Page() {
  return <ClientPage />;
}
