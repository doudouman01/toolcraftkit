import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Git Commit Message Generator — Conventional Commits | ToolCraftKit',
  description: 'Generate conventional commit messages with a visual form. Choose type, scope, and description. Copy formatted commits instantly. Free.',
  openGraph: {
    title: 'Git Commit Message Generator — Conventional Commits | ToolCraftKit',
    description: 'Generate conventional commit messages with a visual form. Choose type, scope, and description. Copy formatted commits instantly. Free.',
    url: 'https://toolcraftkit.com/tools/git-commit-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Git Commit Message Generator — Conventional Commits | ToolCraftKit',
    description: 'Generate conventional commit messages with a visual form. Choose type, scope, and description. Copy formatted commits instantly. Free.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/git-commit-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}
