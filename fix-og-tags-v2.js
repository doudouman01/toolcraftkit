/**
 * fix-og-tags-v2.js
 * 
 * Fixes "use client" tool pages that can't export Next.js metadata.
 * 
 * Problem: ~40 tool pages are "use client" components, so they can't
 * export metadata. They inherit the generic layout title/description,
 * making Google see all pages as duplicates → "low value content".
 * 
 * Solution: For each "use client" page.tsx:
 *   1. Rename page.tsx → ClientPage.tsx
 *   2. Create new page.tsx (server component) that:
 *      - Exports unique metadata + openGraph
 *      - Imports and renders ClientPage
 * 
 * Extracts name & description from <ToolSchema> props in each page.
 * 
 * Usage:
 *   1. Copy to J:\TOOLKRAFKIT\toolcraftkit\
 *   2. Run: node fix-og-tags-v2.js
 *   3. npm run build
 *   4. Deploy
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TOOLS_DIR = path.join(ROOT, 'src', 'app', 'tools');

let converted = 0;
let skipped = 0;
let errors = 0;

// Category mapping for better SEO titles
const CATEGORY_MAP = {
  'word-counter': 'Text',
  'character-counter': 'Text',
  'text-case-converter': 'Text',
  'lorem-ipsum-generator': 'Text',
  'markdown-to-html': 'Text',
  'remove-duplicates': 'Text',
  'words-to-pages': 'Text',
  'text-compare': 'Text',
  'emoji-picker': 'Text',
  'percentage-calculator': 'Business',
  'profit-margin-calculator': 'Business',
  'discount-calculator': 'Business',
  'roi-calculator': 'Business',
  'loan-calculator': 'Business',
  'invoice-generator': 'Business',
  'compound-interest': 'Business',
  'mortgage-calculator': 'Business',
  'salary-calculator': 'Business',
  'tax-calculator': 'Business',
  'tip-calculator': 'Business',
  'email-signature-generator': 'Business',
  'barcode-generator': 'Business',
  'unit-converter': 'Converter',
  'base64': 'Converter',
  'url-encoder': 'Converter',
  'timestamp-converter': 'Converter',
  'image-to-pdf': 'Converter',
  'text-to-pdf': 'Converter',
  'image-compressor': 'Image',
  'image-resizer': 'Image',
  'hex-to-rgb': 'Image',
  'color-palette': 'Image',
  'color-picker': 'Image',
  'pdf-merge': 'PDF',
  'pdf-compressor': 'PDF',
  'json-formatter': 'Developer',
  'password-generator': 'Developer',
  'regex-tester': 'Developer',
  'qr-code-generator': 'Developer',
  'random-number-generator': 'Developer',
  'css-gradient-generator': 'Developer',
  'favicon-generator': 'Developer',
  'hashtag-generator': 'Social Media',
  'pomodoro-timer': 'Productivity',
  'age-calculator': 'Productivity',
  'fuel-calculator': 'Productivity',
  'kdp-royalty-calculator': 'Author',
  'book-description-formatter': 'Author',
  'series-revenue-calculator': 'Author',
  'author-productivity-planner': 'Author',
};

function extractToolSchema(content) {
  // Extract name from ToolSchema
  const nameMatch = content.match(/<ToolSchema\s[^>]*?name\s*=\s*"([^"]+)"/s);
  if (!nameMatch) return null;

  // Extract description from ToolSchema  
  const descMatch = content.match(/<ToolSchema\s[^>]*?description\s*=\s*"([^"]+)"/s);
  if (!descMatch) return null;

  // Extract slug from ToolSchema
  const slugMatch = content.match(/<ToolSchema\s[^>]*?slug\s*=\s*"([^"]+)"/s);

  return {
    name: nameMatch[1],
    description: descMatch[1],
    slug: slugMatch ? slugMatch[1] : null,
  };
}

function generateTitle(name, description) {
  // Create a SEO-friendly title like: "Age Calculator — Calculate Your Exact Age | ToolCraftKit"
  // Take the first sentence or first ~60 chars of description for the subtitle
  let subtitle = description.split('.')[0];
  if (subtitle.length > 60) {
    subtitle = subtitle.substring(0, 57) + '...';
  }
  return `${name} — ${subtitle} | ToolCraftKit`;
}

function processToolDir(slug) {
  const dirPath = path.join(TOOLS_DIR, slug);
  const pagePath = path.join(dirPath, 'page.tsx');

  if (!fs.existsSync(pagePath)) return;

  const content = fs.readFileSync(pagePath, 'utf-8');

  // Skip if NOT a client component (already has metadata capability)
  if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
    console.log(`  ✓  ${slug}: Already a server component — skipped`);
    skipped++;
    return;
  }

  // Skip if already converted (ClientPage.tsx exists)
  if (fs.existsSync(path.join(dirPath, 'ClientPage.tsx'))) {
    console.log(`  ✓  ${slug}: Already converted (ClientPage.tsx exists) — skipped`);
    skipped++;
    return;
  }

  // Extract ToolSchema data
  const schema = extractToolSchema(content);
  if (!schema) {
    console.log(`  ⚠️  ${slug}: Could not find ToolSchema — skipped`);
    errors++;
    return;
  }

  const toolSlug = schema.slug || slug;
  const title = generateTitle(schema.name, schema.description);
  const category = CATEGORY_MAP[slug] || 'Tools';

  // Step 1: Rename page.tsx → ClientPage.tsx
  const clientPath = path.join(dirPath, 'ClientPage.tsx');
  fs.renameSync(pagePath, clientPath);

  // Step 2: Fix the export in ClientPage.tsx
  // Change "export default function Page()" to "export default function ClientPage()"
  let clientContent = fs.readFileSync(clientPath, 'utf-8');
  clientContent = clientContent.replace(
    /export\s+default\s+function\s+\w+\s*\(/,
    'export default function ClientPage('
  );
  fs.writeFileSync(clientPath, clientContent, 'utf-8');

  // Step 3: Create new server component page.tsx with metadata
  const escapedTitle = title.replace(/'/g, "\\'");
  const escapedDesc = schema.description.replace(/'/g, "\\'");
  
  const newPage = `import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: '${escapedTitle}',
  description: '${escapedDesc}',
  openGraph: {
    title: '${escapedTitle}',
    description: '${escapedDesc}',
    url: 'https://toolcraftkit.com/tools/${toolSlug}',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '${escapedTitle}',
    description: '${escapedDesc}',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/${toolSlug}',
  },
};

export default function Page() {
  return <ClientPage />;
}
`;

  fs.writeFileSync(pagePath, newPage, 'utf-8');

  console.log(`  ✅ ${slug}: Converted!`);
  console.log(`     📄 page.tsx → ClientPage.tsx (client component)`);
  console.log(`     📄 New page.tsx (server) with metadata:`);
  console.log(`        title: "${schema.name} — ..." `);
  console.log(`        desc:  "${schema.description.substring(0, 50)}..."`);
  converted++;
}

// Also handle fuel-calculator which is at a different path
function processFuelCalculator() {
  const dirPath = path.join(ROOT, 'src', 'app', 'fuel-calculator');
  const pagePath = path.join(dirPath, 'page.tsx');

  if (!fs.existsSync(pagePath)) return;

  const content = fs.readFileSync(pagePath, 'utf-8');
  if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
    console.log(`  ✓  fuel-calculator: Already a server component — skipped`);
    return;
  }

  if (fs.existsSync(path.join(dirPath, 'ClientPage.tsx'))) {
    console.log(`  ✓  fuel-calculator: Already converted — skipped`);
    return;
  }

  const schema = extractToolSchema(content);
  if (!schema) {
    console.log(`  ⚠️  fuel-calculator: Could not find ToolSchema — skipped`);
    return;
  }

  const title = `${schema.name} — ${schema.description.split('.')[0]} | ToolCraftKit`;

  // Rename
  const clientPath = path.join(dirPath, 'ClientPage.tsx');
  fs.renameSync(pagePath, clientPath);

  let clientContent = fs.readFileSync(clientPath, 'utf-8');
  clientContent = clientContent.replace(
    /export\s+default\s+function\s+\w+\s*\(/,
    'export default function ClientPage('
  );
  fs.writeFileSync(clientPath, clientContent, 'utf-8');

  const escapedTitle = title.replace(/'/g, "\\'");
  const escapedDesc = schema.description.replace(/'/g, "\\'");

  const newPage = `import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: '${escapedTitle}',
  description: '${escapedDesc}',
  openGraph: {
    title: '${escapedTitle}',
    description: '${escapedDesc}',
    url: 'https://toolcraftkit.com/fuel-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '${escapedTitle}',
    description: '${escapedDesc}',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/fuel-calculator',
  },
};

export default function Page() {
  return <ClientPage />;
}
`;

  fs.writeFileSync(pagePath, newPage, 'utf-8');
  console.log(`  ✅ fuel-calculator: Converted!`);
  converted++;
}

// ============================================================
// RUN
// ============================================================
console.log('═══════════════════════════════════════════════════════════');
console.log('  ToolCraftKit — Fix OG Tags v2 (Client Component Pages)');
console.log('═══════════════════════════════════════════════════════════\n');

if (!fs.existsSync(TOOLS_DIR)) {
  console.log('❌ Tools directory not found at:', TOOLS_DIR);
  process.exit(1);
}

const toolDirs = fs.readdirSync(TOOLS_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)
  .sort();

console.log(`🔍 Found ${toolDirs.length} tool directories\n`);

for (const slug of toolDirs) {
  processToolDir(slug);
}

// Handle fuel-calculator separately
console.log('\n📁 Checking fuel-calculator (special path)...');
processFuelCalculator();

console.log('\n═══════════════════════════════════════════════════════════');
console.log(`  ✅ Converted: ${converted}`);
console.log(`  ✓  Skipped:   ${skipped}`);
console.log(`  ⚠️  Errors:    ${errors}`);
console.log('═══════════════════════════════════════════════════════════');

console.log('\n📋 Next steps:');
console.log('  1. Run: npm run build');
console.log('     → Check for any import errors');
console.log('  2. If build succeeds: deploy to Vercel');
console.log('  3. In Search Console: request re-indexation of 5-10 key pages');
console.log('  4. Wait 1-2 weeks, then re-submit AdSense\n');

if (errors > 0) {
  console.log('⚠️  Some pages could not be converted automatically.');
  console.log('   These pages might not have a <ToolSchema> component.');
  console.log('   Check them manually and add metadata.\n');
}
