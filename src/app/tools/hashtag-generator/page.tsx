import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Hashtag Generator — Generate trending hashtags for Instagram, TikTok, Twitter... | ToolCraftKit',
  description: 'Generate trending hashtags for Instagram, TikTok, Twitter, and YouTube. Free hashtag research tool.',
  openGraph: {
    title: 'Hashtag Generator — Generate trending hashtags for Instagram, TikTok, Twitter... | ToolCraftKit',
    description: 'Generate trending hashtags for Instagram, TikTok, Twitter, and YouTube. Free hashtag research tool.',
    url: 'https://toolcraftkit.com/tools/hashtag-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Hashtag Generator — Generate trending hashtags for Instagram, TikTok, Twitter... | ToolCraftKit',
    description: 'Generate trending hashtags for Instagram, TikTok, Twitter, and YouTube. Free hashtag research tool.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/hashtag-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}
