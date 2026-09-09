/**
 * fix-breadcrumbs.js
 * 
 * Fixes the 34 tools that have BROKEN breadcrumbs (spans, not links).
 * Replaces the fake breadcrumb with real <a> links.
 * 
 * Run from project root: node fix-breadcrumbs.js
 */

const fs = require("fs");
const path = require("path");

const TOOLS_DIR = path.join(__dirname, "src", "app", "tools");

// Category mapping: slug → { category, anchor }
const CATEGORIES = {
  "word-counter": { cat: "Text Tools", anchor: "text-tools" },
  "text-case-converter": { cat: "Text Tools", anchor: "text-tools" },
  "remove-duplicates": { cat: "Text Tools", anchor: "text-tools" },
  "lorem-ipsum-generator": { cat: "Text Tools", anchor: "text-tools" },
  "character-counter": { cat: "Text Tools", anchor: "text-tools" },
  "markdown-to-html": { cat: "Text Tools", anchor: "text-tools" },
  "words-to-pages": { cat: "Text Tools", anchor: "text-tools" },
  
  "json-formatter": { cat: "Dev Tools", anchor: "dev-tools" },
  "base64": { cat: "Dev Tools", anchor: "dev-tools" },
  "timestamp-converter": { cat: "Dev Tools", anchor: "dev-tools" },
  "regex-tester": { cat: "Dev Tools", anchor: "dev-tools" },
  "url-encoder": { cat: "Dev Tools", anchor: "dev-tools" },
  
  "hex-to-rgb": { cat: "Image Tools", anchor: "image-tools" },
  "color-palette": { cat: "Design Tools", anchor: "design-tools" },
  "image-compressor": { cat: "Image Tools", anchor: "image-tools" },
  "image-resizer": { cat: "Image Tools", anchor: "image-tools" },
  
  "pdf-merge": { cat: "PDF Tools", anchor: "pdf-tools" },
  "text-to-pdf": { cat: "PDF Tools", anchor: "pdf-tools" },
  "image-to-pdf": { cat: "Image Tools", anchor: "image-tools" },
  
  "password-generator": { cat: "Security Tools", anchor: "security-tools" },
  "random-number-generator": { cat: "Productivity Tools", anchor: "productivity-tools" },
  
  "invoice-generator": { cat: "Business Tools", anchor: "business-tools" },
  "qr-code-generator": { cat: "Business Tools", anchor: "business-tools" },
  "barcode-generator": { cat: "Business Tools", anchor: "business-tools" },
  
  "unit-converter": { cat: "Converter Tools", anchor: "converter-tools" },
  
  "discount-calculator": { cat: "Business Tools", anchor: "business-tools" },
  "age-calculator": { cat: "Productivity Tools", anchor: "productivity-tools" },
  "loan-calculator": { cat: "Business Tools", anchor: "business-tools" },
  "mortgage-calculator": { cat: "Business Tools", anchor: "business-tools" },
  "salary-calculator": { cat: "Business Tools", anchor: "business-tools" },
  "roi-calculator": { cat: "Business Tools", anchor: "business-tools" },
  "compound-interest": { cat: "Business Tools", anchor: "business-tools" },
  "tax-calculator": { cat: "Business Tools", anchor: "business-tools" },
  "tip-calculator": { cat: "Business Tools", anchor: "business-tools" },
  "percentage-calculator": { cat: "Business Tools", anchor: "business-tools" },
  "profit-margin-calculator": { cat: "Business Tools", anchor: "business-tools" },
  "pomodoro-timer": { cat: "Productivity Tools", anchor: "productivity-tools" },
};

let fixed = 0;
let skipped = 0;
let failed = 0;

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      scanDir(fullPath);
      continue;
    }
    
    // Only process .jsx and .tsx files
    if (!entry.name.endsWith(".jsx") && !entry.name.endsWith(".tsx")) continue;
    
    let content = fs.readFileSync(fullPath, "utf8");
    
    // Check if this file has the broken breadcrumb pattern
    if (!content.includes("{/* Breadcrumb */}") && !content.includes("Breadcrumb")) continue;
    
    // Skip if already has <a href links in breadcrumb area
    const breadcrumbSection = content.match(/\{\/\* Breadcrumb \*\/\}[\s\S]{0,500}/);
    if (!breadcrumbSection) continue;
    
    if (breadcrumbSection[0].includes('href=')) {
      console.log(`  ⏭️  ${entry.name}: already has clickable links`);
      skipped++;
      continue;
    }
    
    // Find the tool slug from the directory path
    const pathParts = fullPath.split(path.sep);
    const toolsIdx = pathParts.indexOf("tools");
    const slug = toolsIdx >= 0 ? pathParts[toolsIdx + 1] : null;
    
    if (!slug) {
      console.log(`  ⚠️  ${entry.name}: could not determine slug`);
      failed++;
      continue;
    }
    
    const catInfo = CATEGORIES[slug] || { cat: "Tools", anchor: "" };
    
    // Replace the broken breadcrumb pattern
    // Pattern: <span style={{ cursor: "pointer", color: theme.textMuted }}>Home</span>
    //          <span>›</span>
    //          <span style={{ cursor: "pointer", color: theme.textMuted }}>Category</span>
    //          <span>›</span>
    //          <span style={{ color: theme.primary, fontWeight: 500 }}>Tool Name</span>
    
    // Match the entire breadcrumb div
    const breadcrumbRegex = /\{\/\* Breadcrumb \*\/\}\s*<div style=\{?\{[^}]*\}\}?>\s*<span[^>]*>Home<\/span>\s*<span>›<\/span>\s*<span[^>]*>([^<]+)<\/span>\s*<span>›<\/span>\s*<span[^>]*>([^<]+)<\/span>\s*<\/div>/;
    
    const match = content.match(breadcrumbRegex);
    
    if (match) {
      const toolName = match[2].trim();
      
      const newBreadcrumb = `{/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{
          fontSize: 13, color: theme.textLight, marginBottom: 14,
          display: "flex", gap: 6, alignItems: "center",
        }}>
          <a href="/" style={{ color: theme.primary, textDecoration: "none", fontWeight: 500 }}>Home</a>
          <span>›</span>
          <a href="/#${catInfo.anchor}" style={{ color: theme.primary, textDecoration: "none", fontWeight: 500 }}>${catInfo.cat}</a>
          <span>›</span>
          <span style={{ color: theme.primary, fontWeight: 600 }}>${toolName}</span>
        </nav>`;
      
      content = content.replace(match[0], newBreadcrumb);
      fs.writeFileSync(fullPath, content, "utf8");
      console.log(`  ✅ ${slug}/${entry.name}: breadcrumb fixed with clickable links`);
      fixed++;
    } else {
      // Try alternative pattern (slightly different formatting)
      const altRegex = /\{\/\* Breadcrumb \*\/\}[\s\S]*?<span[^>]*>Home<\/span>[\s\S]*?<\/div>/;
      const altMatch = content.match(altRegex);
      
      if (altMatch) {
        // Extract tool name from the last span before </div>
        const nameMatch = altMatch[0].match(/>([^<]+)<\/span>\s*<\/div>/);
        const toolName = nameMatch ? nameMatch[1].trim() : slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        
        const newBreadcrumb = `{/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{
          fontSize: 13, color: theme.textLight, marginBottom: 14,
          display: "flex", gap: 6, alignItems: "center",
        }}>
          <a href="/" style={{ color: theme.primary, textDecoration: "none", fontWeight: 500 }}>Home</a>
          <span>›</span>
          <a href="/#${catInfo.anchor}" style={{ color: theme.primary, textDecoration: "none", fontWeight: 500 }}>${catInfo.cat}</a>
          <span>›</span>
          <span style={{ color: theme.primary, fontWeight: 600 }}>${toolName}</span>
        </nav>`;
        
        content = content.replace(altMatch[0], newBreadcrumb);
        fs.writeFileSync(fullPath, content, "utf8");
        console.log(`  ✅ ${slug}/${entry.name}: breadcrumb fixed (alt pattern)`);
        fixed++;
      } else {
        console.log(`  ❌ ${slug}/${entry.name}: breadcrumb pattern not recognized`);
        failed++;
      }
    }
  }
}

console.log("Scanning all tool components...\n");
scanDir(TOOLS_DIR);

console.log("\n========================================");
console.log("  BREADCRUMB FIX COMPLETE");
console.log("========================================");
console.log(`  ✅ Fixed:    ${fixed}`);
console.log(`  ⏭️  Skipped:  ${skipped}`);
console.log(`  ❌ Failed:   ${failed}`);
console.log("");
console.log("Next steps:");
console.log('  git add -A');
console.log('  git commit -m "Fix breadcrumb links - make Home and Category clickable"');
console.log("  git push origin main");
console.log("========================================");
