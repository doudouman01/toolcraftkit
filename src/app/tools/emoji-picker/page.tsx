import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Emoji Picker — Copy and paste emojis | ToolCraftKit',
  description: 'Copy and paste emojis. Browse by category or search. Click to copy to clipboard instantly.',
  openGraph: {
    title: 'Emoji Picker — Copy and paste emojis | ToolCraftKit',
    description: 'Copy and paste emojis. Browse by category or search. Click to copy to clipboard instantly.',
    url: 'https://toolcraftkit.com/tools/emoji-picker',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Emoji Picker — Copy and paste emojis | ToolCraftKit',
    description: 'Copy and paste emojis. Browse by category or search. Click to copy to clipboard instantly.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/emoji-picker',
  },
};

export default function Page() {
  return <ClientPage />;
}
