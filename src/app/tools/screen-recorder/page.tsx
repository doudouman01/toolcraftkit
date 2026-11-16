import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Screen Recorder — Record Your Screen Free Online | ToolCraftKit',
  description: 'Record your screen with optional audio directly in your browser. Download as WebM. No software to install, free and private.',
  openGraph: {
    title: 'Screen Recorder — Record Your Screen Free Online | ToolCraftKit',
    description: 'Record your screen with optional audio directly in your browser. Download as WebM. No software to install, free and private.',
    url: 'https://toolcraftkit.com/tools/screen-recorder',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Screen Recorder — Record Your Screen Free Online | ToolCraftKit',
    description: 'Record your screen with optional audio directly in your browser. Download as WebM. No software to install, free and private.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/screen-recorder',
  },
};

export default function Page() {
  return <ClientPage />;
}
