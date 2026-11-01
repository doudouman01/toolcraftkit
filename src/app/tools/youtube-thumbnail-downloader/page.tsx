import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'YouTube Thumbnail Downloader — Download Any YouTube Thumbnail in All Sizes | ToolCraftKit',
  description: 'Download YouTube video thumbnails in all resolutions: maxres (1280x720), HQ (480x360), MQ (320x180), SD (120x90). Free, no signup required.',
  openGraph: {
    title: 'YouTube Thumbnail Downloader — Download Any YouTube Thumbnail in All Sizes | ToolCraftKit',
    description: 'Download YouTube video thumbnails in all resolutions: maxres (1280x720), HQ (480x360), MQ (320x180), SD (120x90). Free, no signup required.',
    url: 'https://toolcraftkit.com/tools/youtube-thumbnail-downloader',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'YouTube Thumbnail Downloader — Download Any YouTube Thumbnail in All Sizes | ToolCraftKit',
    description: 'Download YouTube video thumbnails in all resolutions: maxres (1280x720), HQ (480x360), MQ (320x180), SD (120x90). Free, no signup required.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/youtube-thumbnail-downloader',
  },
};

export default function Page() {
  return <ClientPage />;
}
