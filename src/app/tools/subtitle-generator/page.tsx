import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Subtitle Generator — Create SRT subtitle files for your videos | ToolCraftKit',
  description: 'Create and edit SRT subtitle files for YouTube, social media, and video projects. Add timestamps, format text, preview and export. Free, no signup.',
  openGraph: {
    title: 'Subtitle Generator — Create SRT subtitle files for your videos | ToolCraftKit',
    description: 'Create and edit SRT subtitle files for YouTube, social media, and video projects. Add timestamps, format text, preview and export. Free, no signup.',
    url: 'https://toolcraftkit.com/tools/subtitle-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Subtitle Generator — Create SRT subtitle files for your videos | ToolCraftKit',
    description: 'Create and edit SRT subtitle files for YouTube, social media, and video projects. Add timestamps, format text, preview and export. Free, no signup.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/subtitle-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}
