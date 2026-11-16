import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Meme Generator — Create Memes with Custom Text Free | ToolCraftKit',
  description: 'Create memes with custom text on any image. Upload your image, add top and bottom text, adjust font size and colors. Download as PNG.',
  openGraph: {
    title: 'Meme Generator — Create Memes with Custom Text Free | ToolCraftKit',
    description: 'Create memes with custom text on any image. Upload your image, add top and bottom text, adjust font size and colors. Download as PNG.',
    url: 'https://toolcraftkit.com/tools/meme-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Meme Generator — Create Memes with Custom Text Free | ToolCraftKit',
    description: 'Create memes with custom text on any image. Upload your image, add top and bottom text, adjust font size and colors. Download as PNG.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/meme-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}
