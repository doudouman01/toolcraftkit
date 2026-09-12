import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'QR Code Generator — Generate QR codes for URLs, WiFi, email, phone, and text | ToolCraftKit',
  description: 'Generate QR codes for URLs, WiFi, email, phone, and text. Custom colors, download PNG.',
  openGraph: {
    title: 'QR Code Generator — Generate QR codes for URLs, WiFi, email, phone, and text | ToolCraftKit',
    description: 'Generate QR codes for URLs, WiFi, email, phone, and text. Custom colors, download PNG.',
    url: 'https://toolcraftkit.com/tools/qr-code-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'QR Code Generator — Generate QR codes for URLs, WiFi, email, phone, and text | ToolCraftKit',
    description: 'Generate QR codes for URLs, WiFi, email, phone, and text. Custom colors, download PNG.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/qr-code-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}
