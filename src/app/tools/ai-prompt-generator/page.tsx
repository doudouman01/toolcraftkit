import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'AI Prompt Generator — Create powerful prompts for ChatGPT, Claude & more | ToolCraftKit',
  description: 'Generate structured, effective AI prompts for writing, coding, marketing, and research. Choose task type, tone, and detail level. Free, no signup.',
  openGraph: {
    title: 'AI Prompt Generator — Create powerful prompts for ChatGPT, Claude & more | ToolCraftKit',
    description: 'Generate structured, effective AI prompts for writing, coding, marketing, and research. Choose task type, tone, and detail level. Free, no signup.',
    url: 'https://toolcraftkit.com/tools/ai-prompt-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AI Prompt Generator — Create powerful prompts for ChatGPT, Claude & more | ToolCraftKit',
    description: 'Generate structured, effective AI prompts for writing, coding, marketing, and research. Choose task type, tone, and detail level. Free, no signup.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/ai-prompt-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}
