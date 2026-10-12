import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'ATS Resume Score Checker — Optimize Your Resume | ToolCraftKit',
  description: 'Premium ATS resume checker. Score your resume against job descriptions. Get keyword match analysis, formatting checks, and optimization tips.',
  openGraph: {
    title: 'ATS Resume Score Checker — Optimize Your Resume | ToolCraftKit',
    description: 'Premium ATS resume checker. Score your resume against job descriptions.',
    url: 'https://toolcraftkit.com/tools/ats-resume-checker',
    siteName: 'ToolCraftKit', type: 'website',
  },
  twitter: { card: 'summary', title: 'ATS Resume Score Checker | ToolCraftKit', description: 'Score your resume against job descriptions.' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/ats-resume-checker' },
};
export default function Page() { return <ClientPage />; }
