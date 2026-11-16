import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Video to GIF — Extract Frames from Video | ToolCraftKit',
  description: 'Free video to GIF tool. Upload MP4 or WEBM video, extract frames as PNG images. Set frame rate, preview animation. 100% client-side.',
  openGraph: {
    title: 'Video to GIF — Extract Frames from Video | ToolCraftKit',
    description: 'Extract frames from video files. Set frame rate, preview animation, download individual frames.',
    url: 'https://toolcraftkit.com/tools/video-to-gif',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Video to GIF | ToolCraftKit', description: 'Extract frames from video and create animated previews.' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/video-to-gif' },
};

export default function Page() {
  return <ClientPage />;
}
