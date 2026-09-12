import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'CSS Gradient Generator — Create beautiful CSS gradients | ToolCraftKit',
  description: 'Create beautiful CSS gradients. Copy the CSS code instantly. Linear and radial gradients with presets.',
  openGraph: {
    title: 'CSS Gradient Generator — Create beautiful CSS gradients | ToolCraftKit',
    description: 'Create beautiful CSS gradients. Copy the CSS code instantly. Linear and radial gradients with presets.',
    url: 'https://toolcraftkit.com/tools/css-gradient-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'CSS Gradient Generator — Create beautiful CSS gradients | ToolCraftKit',
    description: 'Create beautiful CSS gradients. Copy the CSS code instantly. Linear and radial gradients with presets.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/css-gradient-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}
