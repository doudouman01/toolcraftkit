/**
 * fix-og-tags.js
 * 
 * Fixes duplicate og:title and og:description across ToolCraftKit pages.
 * 
 * Problem: All pages share the same generic og:title and og:description
 * set in the root layout.tsx, making Google think pages are duplicates.
 * 
 * Solution: Remove hardcoded openGraph title/description from layout.tsx
 * so Next.js falls back to each page's unique title & description.
 * Also ensures each tool page has proper openGraph in its metadata export.
 * 
 * Usage: 
 *   1. Copy this file to J:\TOOLKRAFKIT\toolcraftkit\
 *   2. Run: node fix-og-tags.js
 *   3. Review changes, then deploy
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src', 'app');
const TOOLS_DIR = path.join(SRC, 'tools');

let filesModified = 0;
let pagesScanned = 0;

// ============================================================
// STEP 1: Fix root layout.tsx — remove hardcoded OG title/desc
// ============================================================
function fixLayout() {
  const layoutPath = path.join(SRC, 'layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    console.log('⚠️  layout.tsx not found at', layoutPath);
    return;
  }

  let content = fs.readFileSync(layoutPath, 'utf-8');
  const original = content;

  // Pattern 1: openGraph object with title and description as separate properties
  // Remove title: '...' and description: '...' lines inside openGraph: { ... }
  
  // We need to find the openGraph block and selectively remove title/description
  const ogBlockRegex = /openGraph\s*:\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/s;
  const ogMatch = content.match(ogBlockRegex);
  
  if (ogMatch) {
    let ogContent = ogMatch[1];
    const originalOg = ogContent;
    
    // Remove title line (handles single quotes, double quotes, backticks)
    ogContent = ogContent.replace(/\n?\s*title\s*:\s*(['"`]).*?\1\s*,?/g, '');
    
    // Remove description line
    ogContent = ogContent.replace(/\n?\s*description\s*:\s*(['"`]).*?\1\s*,?/g, '');
    
    if (ogContent !== originalOg) {
      content = content.replace(originalOg, ogContent);
      console.log('✅ layout.tsx: Removed hardcoded openGraph title & description');
      console.log('   → Next.js will now use each page\'s own title/description for OG tags');
    } else {
      console.log('ℹ️  layout.tsx: No hardcoded OG title/description found in openGraph block');
    }
  } else {
    console.log('ℹ️  layout.tsx: No openGraph block found');
  }

  // Also fix twitter card if it has the same generic values
  const twitterBlockRegex = /twitter\s*:\s*\{([^}]*)\}/s;
  const twitterMatch = content.match(twitterBlockRegex);
  
  if (twitterMatch) {
    let twContent = twitterMatch[1];
    const originalTw = twContent;
    
    // Remove generic title/description from twitter block too
    twContent = twContent.replace(/\n?\s*title\s*:\s*(['"`])ToolCraftKit\s*[—–-]\s*Free Online Tools.*?\1\s*,?/g, '');
    twContent = twContent.replace(/\n?\s*description\s*:\s*(['"`])Free online tools\.\s*No signup.*?\1\s*,?/g, '');
    
    if (twContent !== originalTw) {
      content = content.replace(originalTw, twContent);
      console.log('✅ layout.tsx: Removed hardcoded twitter title & description');
    }
  }

  if (content !== original) {
    // Backup
    fs.writeFileSync(layoutPath + '.bak-og', original, 'utf-8');
    fs.writeFileSync(layoutPath, content, 'utf-8');
    filesModified++;
    console.log('   💾 Backup saved as layout.tsx.bak-og\n');
  } else {
    console.log('   ℹ️  No changes needed in layout.tsx\n');
  }
}

// ============================================================
// STEP 2: Ensure each tool page has proper OG metadata
// ============================================================
function fixToolPages() {
  if (!fs.existsSync(TOOLS_DIR)) {
    console.log('⚠️  Tools directory not found at', TOOLS_DIR);
    return;
  }

  const toolDirs = fs.readdirSync(TOOLS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  console.log(`🔍 Scanning ${toolDirs.length} tool pages...\n`);

  for (const slug of toolDirs) {
    const pagePath = path.join(TOOLS_DIR, slug, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;
    
    pagesScanned++;
    let content = fs.readFileSync(pagePath, 'utf-8');
    const original = content;

    // Extract the page's own title and description from metadata
    const titleMatch = content.match(/title\s*:\s*(['"`])((?:(?!\1).)*)\1/);
    const descMatch = content.match(/description\s*:\s*(['"`])((?:(?!\1).)*)\1/);

    if (!titleMatch || !descMatch) {
      console.log(`  ⚠️  ${slug}: Could not find title or description in metadata`);
      continue;
    }

    const pageTitle = titleMatch[2];
    const pageDesc = descMatch[2];

    // Check if page already has openGraph with unique values
    const hasOg = content.includes('openGraph');
    
    if (hasOg) {
      // Check if OG has the generic values and replace them
      const genericOgTitle = /openGraph\s*:\s*\{[^}]*title\s*:\s*(['"`])ToolCraftKit\s*[—–-]\s*Free Online Tools.*?\1/s;
      const genericOgDesc = /openGraph\s*:\s*\{[^}]*description\s*:\s*(['"`])Free online tools\.\s*No signup.*?\1/s;
      
      if (genericOgTitle.test(content) || genericOgDesc.test(content)) {
        // Replace generic OG values with page-specific ones
        content = content.replace(
          /(openGraph\s*:\s*\{[^}]*?)title\s*:\s*(['"`]).*?\2/s,
          `$1title: '${pageTitle.replace(/'/g, "\\'")}'`
        );
        content = content.replace(
          /(openGraph\s*:\s*\{[^}]*?)description\s*:\s*(['"`]).*?\2/s,
          `$1description: '${pageDesc.replace(/'/g, "\\'")}'`
        );
        console.log(`  ✅ ${slug}: Updated OG tags to match page title/description`);
      } else {
        console.log(`  ✓  ${slug}: OG tags already look unique`);
      }
    } else {
      // No openGraph block — Next.js will inherit from layout
      // After our layout fix, it will use the page's own title/desc
      // But to be explicit and safe, we can add openGraph to each page
      
      // Find the metadata export and add openGraph
      const metadataPattern = /(export\s+const\s+metadata\s*(?::\s*Metadata\s*)?=\s*\{[^]*?)(description\s*:\s*(['"`])(?:(?!\3).)*\3\s*,?)/;
      const metaMatch = content.match(metadataPattern);
      
      if (metaMatch) {
        const insertPoint = metaMatch.index + metaMatch[0].length;
        const ogBlock = `\n  openGraph: {\n    title: '${pageTitle.replace(/'/g, "\\'")}',\n    description: '${pageDesc.replace(/'/g, "\\'")}',\n    url: 'https://toolcraftkit.com/tools/${slug}',\n    siteName: 'ToolCraftKit',\n    type: 'website',\n  },`;
        
        content = content.slice(0, insertPoint) + ogBlock + content.slice(insertPoint);
        console.log(`  ✅ ${slug}: Added explicit openGraph block`);
      } else {
        console.log(`  ⚠️  ${slug}: Could not locate metadata export to insert OG`);
      }
    }

    if (content !== original) {
      fs.writeFileSync(pagePath, content, 'utf-8');
      filesModified++;
    }
  }
}

// ============================================================
// STEP 3: Fix blog page and other key pages
// ============================================================
function fixOtherPages() {
  const otherPages = [
    'blog/page.tsx',
    'pricing/page.tsx', 
    'login/page.tsx',
    'fuel-calculator/page.tsx',
  ];
  
  console.log('\n🔍 Checking other key pages...\n');
  
  for (const rel of otherPages) {
    const pagePath = path.join(SRC, rel);
    if (!fs.existsSync(pagePath)) {
      continue;
    }
    
    let content = fs.readFileSync(pagePath, 'utf-8');
    
    // Check if it has generic OG values
    if (content.includes('openGraph')) {
      const hasGeneric = /openGraph\s*:\s*\{[^}]*?(['"`])ToolCraftKit\s*[—–-]\s*Free Online Tools/s.test(content);
      if (hasGeneric) {
        console.log(`  ⚠️  ${rel}: Has generic OG tags — update manually with unique values`);
      } else {
        console.log(`  ✓  ${rel}: OG tags look OK`);
      }
    } else {
      console.log(`  ℹ️  ${rel}: No openGraph block (will inherit from layout after fix)`);
    }
  }
}

// ============================================================
// RUN
// ============================================================
console.log('═══════════════════════════════════════════════════════');
console.log('  ToolCraftKit — Fix Duplicate OG Tags');
console.log('  Fix for: Google "Contenu à faible valeur informative"');
console.log('═══════════════════════════════════════════════════════\n');

console.log('📁 Project root:', ROOT);
console.log('📁 Source dir:', SRC);
console.log('');

fixLayout();
fixToolPages();
fixOtherPages();

console.log('\n═══════════════════════════════════════════════════════');
console.log(`  Done! ${filesModified} files modified, ${pagesScanned} tool pages scanned`);
console.log('═══════════════════════════════════════════════════════');
console.log('\n📋 Next steps:');
console.log('  1. Review the changes (check layout.tsx and a few tool pages)');
console.log('  2. Build locally: npm run build');
console.log('  3. Deploy to Vercel');
console.log('  4. In Search Console → request re-indexation of homepage');
console.log('  5. Wait 1-2 weeks for Google to re-crawl');
console.log('  6. Then re-submit AdSense\n');
