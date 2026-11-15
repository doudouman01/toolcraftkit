import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Background Remover - Remove Image Background Online Free',
  description: 'Remove image backgrounds instantly with AI. Get transparent PNG output. No signup required. Free online background remover tool.',
  openGraph: {
    title: 'Background Remover - Remove Image Background Online Free',
    description: 'Remove image backgrounds instantly with AI. Get transparent PNG output.',
    url: 'https://toolcraftkit.com/tools/background-remover',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/background-remover' },
};

export default function Page() {
  return <ClientPage />;
}
