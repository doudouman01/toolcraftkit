/**
 * fix-remaining-8.js
 * 
 * Fixes the 8 tool pages that have no <ToolSchema> and were skipped by v2.
 * Uses hardcoded metadata extracted from the homepage descriptions.
 * 
 * Usage: node fix-remaining-8.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TOOLS_DIR = path.join(ROOT, 'src', 'app', 'tools');

// Hardcoded metadata for the 8 remaining pages
const PAGES = [
  {
    slug: 'base64',
    dir: path.join(TOOLS_DIR, 'base64'),
    title: 'Base64 Encoder/Decoder — Encode and Decode Base64 Instantly | ToolCraftKit',
    description: 'Free online Base64 encoder and decoder. Convert text to Base64 or decode Base64 to text instantly. No signup required.',
  },
  {
    slug: 'compound-interest',
    dir: path.join(TOOLS_DIR, 'compound-interest'),
    title: 'Compound Interest Calculator — See How Your Money Grows | ToolCraftKit',
    description: 'Free compound interest calculator. See how your money grows with compound interest and monthly contributions. Visual breakdown included.',
  },
  {
    slug: 'book-description-formatter',
    dir: path.join(TOOLS_DIR, 'book-description-formatter'),
    title: 'Book Description Formatter — Amazon-Ready HTML From Plain Text | ToolCraftKit',
    description: 'Free book description formatter for Amazon KDP. Write your blurb in plain text, get Amazon-ready HTML. Templates included.',
  },
  {
    slug: 'author-productivity-planner',
    dir: path.join(TOOLS_DIR, 'author-productivity-planner'),
    title: 'Author Productivity Planner — Plan Your Manuscript Timeline | ToolCraftKit',
    description: 'Plan your manuscript timeline, track writing progress, and build a publication calendar. For self-published authors.',
  },
  {
    slug: 'series-revenue-calculator',
    dir: path.join(TOOLS_DIR, 'series-revenue-calculator'),
    title: 'Series Revenue Calculator — Project Total Series Revenue | ToolCraftKit',
    description: 'Project total book series revenue based on read-through rates and KU page reads. Plan your series strategy with data.',
  },
  {
    slug: 'tax-calculator',
    dir: path.join(TOOLS_DIR, 'tax-calculator'),
    title: 'Income Tax Calculator — Estimate Federal Tax With Brackets | ToolCraftKit',
    description: 'Free income tax calculator. Estimate federal income tax for US, Canada, and UK with bracket breakdown. Quick and accurate.',
  },
  {
    slug: 'kdp-royalty-calculator',
    dir: path.join(TOOLS_DIR, 'kdp-royalty-calculator'),
    title: 'KDP Royalty Calculator — Amazon Ebook Royalties Across All Marketplaces | ToolCraftKit',
    description: 'Calculate Amazon KDP ebook royalties. Compare 35% vs 70% royalty rates across all Amazon marketplaces worldwide.',
  },
  {
    slug: 'fuel-calculator',
    dir: path.join(ROOT, 'src', 'app', 'fuel-calculator'),  // Special path
    urlPath: '/fuel-calculator',
    title: 'Fuel Cost Calculator — Calculate Annual Fuel Costs and Savings | ToolCraftKit',
    description: 'Calculate annual fuel costs, efficiency gap, and savings potential. Compare vehicles and find out how much you can save.',
  },
];

let converted = 0;

for (const page of PAGES) {
  const pagePath = path.join(page.dir, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`  ⚠️  ${page.slug}: page.tsx not found — skipped`);
    continue;
  }

  const content = fs.readFileSync(pagePath, 'utf-8');
  const isClient = content.startsWith('"use client"') || content.startsWith("'use client'");

  if (!isClient) {
    // Server component — just add/update metadata in existing file
    // Check if it already has proper metadata
    if (content.includes('openGraph')) {
      console.log(`  ✓  ${page.slug}: Already has openGraph — skipped`);
      continue;
    }
    console.log(`  ℹ️  ${page.slug}: Server component without openGraph — needs manual check`);
    continue;
  }

  // Check if already converted
  if (fs.existsSync(path.join(page.dir, 'ClientPage.tsx'))) {
    console.log(`  ✓  ${page.slug}: Already converted — skipped`);
    continue;
  }

  // Step 1: Rename page.tsx → ClientPage.tsx
  const clientPath = path.join(page.dir, 'ClientPage.tsx');
  fs.renameSync(pagePath, clientPath);

  // Step 2: Fix export name in ClientPage.tsx
  let clientContent = fs.readFileSync(clientPath, 'utf-8');
  clientContent = clientContent.replace(
    /export\s+default\s+function\s+\w+\s*\(/,
    'export default function ClientPage('
  );
  fs.writeFileSync(clientPath, clientContent, 'utf-8');

  // Step 3: Create new server page.tsx
  const urlPath = page.urlPath || `/tools/${page.slug}`;
  const escapedTitle = page.title.replace(/'/g, "\\'");
  const escapedDesc = page.description.replace(/'/g, "\\'");

  const newPage = `import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: '${escapedTitle}',
  description: '${escapedDesc}',
  openGraph: {
    title: '${escapedTitle}',
    description: '${escapedDesc}',
    url: 'https://toolcraftkit.com${urlPath}',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '${escapedTitle}',
    description: '${escapedDesc}',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com${urlPath}',
  },
};

export default function Page() {
  return <ClientPage />;
}
`;

  fs.writeFileSync(pagePath, newPage, 'utf-8');

  console.log(`  ✅ ${page.slug}: Converted!`);
  console.log(`     title: "${page.title.substring(0, 50)}..."`);
  converted++;
}

console.log(`\n═══════════════════════════════════════════`);
console.log(`  Done! ${converted} pages converted.`);
console.log(`═══════════════════════════════════════════`);
console.log(`\n  Next: deploy.bat → then Search Console re-indexation\n`);
