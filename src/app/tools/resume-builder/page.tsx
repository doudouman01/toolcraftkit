import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Resume Builder — Create Professional Resume & Download PDF | ToolCraftKit',
  description: 'Build a professional resume with a live preview. Add experience, education, skills. Download as PDF. Free, no signup required.',
  openGraph: {
    title: 'Resume Builder — Create Professional Resume & Download PDF | ToolCraftKit',
    description: 'Build a professional resume with a live preview. Add experience, education, skills. Download as PDF. Free, no signup required.',
    url: 'https://toolcraftkit.com/tools/resume-builder',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Resume Builder — Create Professional Resume & Download PDF | ToolCraftKit',
    description: 'Build a professional resume with a live preview. Add experience, education, skills. Download as PDF. Free, no signup required.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/resume-builder',
  },
};

export default function Page() {
  return <ClientPage />;
}
