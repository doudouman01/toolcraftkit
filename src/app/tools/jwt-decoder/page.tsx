import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'JWT Decoder — Decode and Inspect JSON Web Tokens | ToolCraftKit',
  description: 'Decode JWT tokens instantly. View header, payload, signature, expiration status, and standard claims. Free, no signup required.',
  openGraph: {
    title: 'JWT Decoder — Decode and Inspect JSON Web Tokens | ToolCraftKit',
    description: 'Decode JWT tokens instantly. View header, payload, signature, expiration status, and standard claims. Free, no signup required.',
    url: 'https://toolcraftkit.com/tools/jwt-decoder',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'JWT Decoder — Decode and Inspect JSON Web Tokens | ToolCraftKit',
    description: 'Decode JWT tokens instantly. View header, payload, signature, expiration status, and standard claims. Free, no signup required.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/jwt-decoder',
  },
};

export default function Page() {
  return <ClientPage />;
}
