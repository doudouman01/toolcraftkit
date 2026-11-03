import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Open Graph Preview — See how your link looks on social media | ToolCraftKit',
  description: 'Preview how your website looks when shared on Facebook, Twitter/X, LinkedIn, and Discord. Check and debug your Open Graph meta tags. Free, no signup.',
  openGraph: {
    title: 'Open Graph Preview — See how your link looks on social media | ToolCraftKit',
    description: 'Preview how your website looks when shared on Facebook, Twitter/X, LinkedIn, and Discord. Check and debug your Open Graph meta tags. Free, no signup.',
    url: 'https://toolcraftkit.com/tools/open-graph-preview',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Open Graph Preview — See how your link looks on social media | ToolCraftKit',
    description: 'Preview how your website looks when shared on Facebook, Twitter/X, LinkedIn, and Discord. Check and debug your Open Graph meta tags. Free, no signup.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/open-graph-preview',
  },
};

export default function Page() {
  return <ClientPage />;
}
