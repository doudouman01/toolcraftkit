import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Password Generator — Generate strong random passwords with customizable length... | ToolCraftKit',
  description: 'Generate strong random passwords with customizable length and character sets.',
  openGraph: {
    title: 'Password Generator — Generate strong random passwords with customizable length... | ToolCraftKit',
    description: 'Generate strong random passwords with customizable length and character sets.',
    url: 'https://toolcraftkit.com/tools/password-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Password Generator — Generate strong random passwords with customizable length... | ToolCraftKit',
    description: 'Generate strong random passwords with customizable length and character sets.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/password-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}
