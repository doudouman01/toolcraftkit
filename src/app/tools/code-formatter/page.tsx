import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Code Formatter & Beautifier — Format JS, Python, HTML, CSS, SQL | ToolCraftKit',
  description: 'Format and beautify code in JavaScript, TypeScript, JSON, HTML, CSS, Python, and SQL. Customizable indentation. Free online code formatter.',
  openGraph: {
    title: 'Code Formatter & Beautifier — Format JS, Python, HTML, CSS, SQL | ToolCraftKit',
    description: 'Format and beautify code in JavaScript, TypeScript, JSON, HTML, CSS, Python, and SQL. Free online code formatter.',
    url: 'https://toolcraftkit.com/tools/code-formatter',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Code Formatter & Beautifier — Format JS, Python, HTML, CSS, SQL | ToolCraftKit',
    description: 'Format and beautify code online. Free, no signup.',
  },
  alternates: { canonical: 'https://toolcraftkit.com/tools/code-formatter' },
};

export default function Page() { return <ClientPage />; }
