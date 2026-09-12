/**
 * add-footer-links.js
 * 
 * Adds a "Our Sites" section to the ToolCraftKit footer
 * with cross-links to AIGradeLab and SolutionsDirectesPro.
 * 
 * Usage: node add-footer-links.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// Find the footer — likely in layout.tsx or the homepage
const LAYOUT_PATH = path.join(ROOT, 'src', 'app', 'layout.tsx');
const HOME_PATH = path.join(ROOT, 'src', 'app', 'page.tsx');

const FOOTER_SECTION = `
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #E7E5E4" }}>
          <p style={{ fontSize: 12, color: "#78716C", marginBottom: 8 }}>Our Sites</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="https://aigradelab.com" target="_blank" rel="noopener" style={{ fontSize: 12, color: "#0D9488", textDecoration: "none" }}>
              AIGradeLab — AI Tools Reviews &amp; Ratings
            </a>
            <a href="https://solutionsdirectespro.com" target="_blank" rel="noopener" style={{ fontSize: 12, color: "#0D9488", textDecoration: "none" }}>
              SolutionsDirectesPro — Livres &amp; Guides pratiques
            </a>
          </div>
        </div>`;

function findAndPatch(filePath, fileName) {
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  ${fileName} not found`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Already patched?
  if (content.includes('Our Sites') || content.includes('aigradelab.com')) {
    console.log(`  ✓  ${fileName}: Already has cross-links — skipped`);
    return true;
  }

  // Strategy 1: Find the copyright line and insert before the closing footer/div
  // Look for the © 2026 ToolCraftKit pattern
  const copyrightPattern = /(©\s*2026\s*ToolCraftKit\.com[^<]*<\/p>)/;
  const copyrightMatch = content.match(copyrightPattern);

  if (copyrightMatch) {
    // Insert after the copyright paragraph
    const insertAfter = copyrightMatch[0];
    content = content.replace(insertAfter, insertAfter + FOOTER_SECTION);
    
    // Backup
    fs.writeFileSync(filePath + '.bak-footer', fs.readFileSync(filePath, 'utf-8'));
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ ${fileName}: Added "Our Sites" section after copyright`);
    return true;
  }

  // Strategy 2: Look for Privacy/Terms/Contact links pattern
  const linksPattern = /(Privacy.*?Terms.*?Contact[^}]*}[^}]*}>)/s;
  const linksMatch = content.match(linksPattern);

  if (linksMatch) {
    const insertAfter = linksMatch[0];
    content = content.replace(insertAfter, insertAfter + FOOTER_SECTION);
    
    fs.writeFileSync(filePath + '.bak-footer', fs.readFileSync(filePath, 'utf-8'));
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ ${fileName}: Added "Our Sites" section after footer links`);
    return true;
  }

  return false;
}

console.log('═══════════════════════════════════════════════════════');
console.log('  ToolCraftKit — Add Cross-Site Footer Links');
console.log('═══════════════════════════════════════════════════════\n');

let found = false;

// Try layout first (global footer)
console.log('📁 Checking layout.tsx...');
found = findAndPatch(LAYOUT_PATH, 'layout.tsx');

if (!found) {
  console.log('\n📁 Checking homepage page.tsx...');
  found = findAndPatch(HOME_PATH, 'page.tsx');
}

if (!found) {
  console.log('\n⚠️  Could not find footer automatically.');
  console.log('   The footer might use a different pattern.');
  console.log('   Add this HTML manually in your footer component:\n');
  console.log('   <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #E7E5E4" }}>');
  console.log('     <p style={{ fontSize: 12, color: "#78716C", marginBottom: 8 }}>Our Sites</p>');
  console.log('     <a href="https://aigradelab.com">AIGradeLab — AI Tools Reviews & Ratings</a>');
  console.log('     <a href="https://solutionsdirectespro.com">SolutionsDirectesPro — Livres & Guides</a>');
  console.log('   </div>');
} else {
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  Done! Deploy with deploy.bat');
  console.log('═══════════════════════════════════════════════════════\n');
}
