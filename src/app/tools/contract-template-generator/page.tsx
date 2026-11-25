import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Contract Template Generator — Free Service & Freelance Contracts | ToolCraftKit',
  description: 'Generate professional contract templates for freelance, consulting, service, or employment agreements. Payment terms, scope, termination clauses. Free.',
  openGraph: {
    title: 'Contract Template Generator — Free Service & Freelance Contracts | ToolCraftKit',
    description: 'Generate professional contract templates for freelance, consulting, service, or employment agreements. Free.',
    url: 'https://toolcraftkit.com/tools/contract-template-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contract Template Generator | ToolCraftKit',
    description: 'Generate professional contract templates. Free.',
  },
  alternates: { canonical: 'https://toolcraftkit.com/tools/contract-template-generator' },
};

export default function Page() { return <ClientPage />; }
