import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Video & Audio Transcription Tool — Convert Speech to Text Online | ToolCraftKit',
  description: 'Transcribe video and audio files to text online. Supports YouTube links, MP3, MP4, WAV. Multilingual: English, French, Spanish, Portuguese & 90+ languages. Fast & accurate AI transcription.',
  openGraph: {
    title: 'Video & Audio Transcription Tool — Convert Speech to Text Online | ToolCraftKit',
    description: 'Transcribe video and audio files to text online. Supports YouTube links, MP3, MP4, WAV. Multilingual: English, French, Spanish, Portuguese & 90+ languages.',
    url: 'https://toolcraftkit.com/tools/video-transcription',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Video & Audio Transcription Tool — Convert Speech to Text Online | ToolCraftKit',
    description: 'Transcribe video and audio files to text online. Supports YouTube links, MP3, MP4, WAV. Multilingual.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/video-transcription',
  },
};

export default function Page() {
  return <ClientPage />;
}
