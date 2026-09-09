/**
 * remove-old-headers.js
 * 
 * Removes the built-in <header> block from all tool .jsx/.tsx components
 * so the tools/layout.tsx handles navigation without duplicates.
 * 
 * Also removes old breadcrumbs since the layout handles that too.
 * 
 * Run from project root: node remove-old-headers.js
 */

const fs = require("fs");
const path = require("path");

const TOOLS_DIR = path.join(__dirname, "src", "app", "tools");

let cleaned = 0;
let skipped = 0;
let failed = 0;

function processFile(filePath, slug) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  // ─── REMOVE HEADER BLOCK ───
  // Pattern: {/* ─── HEADER ─── */} ... </header>
  const headerRegex = /\s*\{\/\*\s*─+\s*HEADER\s*─+\s*\*\/\}\s*<header[\s\S]*?<\/header>/;
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, "");
    changed = true;
  }

  // Alternative pattern: just <header ...> ... </header> without comment
  if (!changed) {
    const altHeaderRegex = /\s*<header\s+style=\{\{[\s\S]*?<\/header>/;
    if (altHeaderRegex.test(content)) {
      content = content.replace(altHeaderRegex, "");
      changed = true;
    }
  }

  // ─── REMOVE navItems DECLARATION ───
  // Pattern: const navItems = ["Text", "Writing", ...];
  const navItemsRegex = /\s*const navItems\s*=\s*\[[^\]]*\];\s*/;
  if (navItemsRegex.test(content)) {
    content = content.replace(navItemsRegex, "\n");
    changed = true;
  }

  // ─── REMOVE OLD BREADCRUMB ───
  // Pattern 1: {/* Breadcrumb */} <div style={{...}}>...<span>Home</span>...</div>
  const bcDiv = /\s*\{\/\* Breadcrumb \*\/\}\s*<div style=\{\{[^}]*\}\}>\s*[\s\S]*?<\/div>/;
  if (bcDiv.test(content)) {
    content = content.replace(bcDiv, "");
    changed = true;
  }

  // Pattern 2: {/* Breadcrumb */} <nav aria-label="Breadcrumb" ...>...</nav>
  const bcNav = /\s*\{\/\* Breadcrumb \*\/\}\s*<nav[^>]*aria-label="Breadcrumb"[\s\S]*?<\/nav>/;
  if (bcNav.test(content)) {
    content = content.replace(bcNav, "");
    changed = true;
  }

  // Pattern 3: Breadcrumb component import + usage
  const bcImport = /import Breadcrumb from ["']@\/components\/Breadcrumb["'];\s*\n?/;
  if (bcImport.test(content)) {
    content = content.replace(bcImport, "");
    changed = true;
  }
  const bcComponent = /\s*<Breadcrumb\s+toolSlug="[^"]*"\s+toolName="[^"]*"\s*\/>/g;
  if (bcComponent.test(content)) {
    content = content.replace(bcComponent, "");
    changed = true;
  }

  // ─── REMOVE dark mode state if header was the only user ───
  // Don't remove dark mode — many tools use it for their own UI

  // ─── REMOVE FOOTER if it duplicates ───
  // Keep footers — they're tool-specific

  if (changed) {
    // Clean up multiple blank lines
    content = content.replace(/\n{4,}/g, "\n\n");
    fs.writeFileSync(filePath, content, "utf8");
    cleaned++;
    return "CLEANED";
  }

  skipped++;
  return "SKIP";
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full);
    } else if (entry.name.endsWith(".jsx") || entry.name.endsWith(".tsx")) {
      // Skip layout files and page.tsx wrappers
      if (entry.name === "layout.tsx" || entry.name === "layout.jsx") continue;

      const slug = path.relative(TOOLS_DIR, path.dirname(full)).split(path.sep)[0] || "";
      const result = processFile(full, slug);
      if (result === "CLEANED") {
        console.log(`  ✅ ${slug}/${entry.name}: old header/breadcrumb removed`);
      }
    }
  }
}

console.log("Removing old headers and breadcrumbs from all tool components...\n");
scanDir(TOOLS_DIR);

console.log(`\n========================================`);
console.log(`  HEADER CLEANUP COMPLETE`);
console.log(`========================================`);
console.log(`  ✅ Cleaned: ${cleaned}`);
console.log(`  ⏭️  Skipped: ${skipped} (no old header found)`);
console.log(``);
console.log(`Next: restore tools/layout.tsx then deploy:`);
console.log(`  git add -A`);
console.log(`  git commit -m "Remove old headers, use unified tools layout"`);
console.log(`  git push origin main`);
console.log(`========================================`);
