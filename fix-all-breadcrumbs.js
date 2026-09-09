/**
 * fix-all-breadcrumbs.js
 * 
 * UNIVERSAL FIX: scans every .jsx/.tsx file in src/app/tools/
 * and replaces ALL non-clickable breadcrumb spans with real <a> links.
 * 
 * Run from project root: node fix-all-breadcrumbs.js
 */

const fs = require("fs");
const path = require("path");

const TOOLS_DIR = path.join(__dirname, "src", "app", "tools");

// Category → anchor mapping
const CAT_ANCHORS = {
  "Text Tools": "text-tools",
  "Dev Tools": "dev-tools",
  "Developer Tools": "dev-tools",
  "Image Tools": "image-tools",
  "PDF Tools": "pdf-tools",
  "Converter Tools": "converter-tools",
  "Design Tools": "design-tools",
  "Security Tools": "security-tools",
  "Business Tools": "business-tools",
  "Productivity Tools": "productivity-tools",
  "Social Tools": "social-tools",
  "Writing Tools": "writing-tools",
  "Math Tools": "math-tools",
  "Finance Tools": "business-tools",
  "Calculators": "business-tools",
  "SEO Tools": "seo-tools",
};

let fixed = 0;
let alreadyOk = 0;
let noBC = 0;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  
  // Check if file has a breadcrumb with non-clickable Home
  // Pattern: <span ...>Home</span> inside a breadcrumb area
  if (!content.includes(">Home</span>")) {
    // Check if it has clickable Home already
    if (content.includes('href="/">Home</a>') || content.includes("href=\"/\">Home</a>")) {
      alreadyOk++;
      return "OK";
    }
    noBC++;
    return "NO_BC";
  }
  
  let changed = false;
  
  // REPLACEMENT 1: Make Home clickable
  // Match: <span style={{ ... }}>Home</span>  or  <span style={...}>Home</span>
  // Replace with: <a href="/" style={{ ... }}>Home</a>
  const homeSpanRegex = /<span\s+style=\{\{([^}]*)\}\}>Home<\/span>/g;
  if (homeSpanRegex.test(content)) {
    content = content.replace(
      /<span\s+style=\{\{([^}]*)\}\}>Home<\/span>/g,
      '<a href="/" style={{$1, textDecoration: "none" }}>Home</a>'
    );
    changed = true;
  }
  
  // Also handle: <span style={{ cursor: "pointer", color: theme.textMuted }}>Home</span>
  // Already caught by above regex
  
  // REPLACEMENT 2: Make Category clickable
  // Find category names and replace their spans with links
  for (const [catName, anchor] of Object.entries(CAT_ANCHORS)) {
    const catSpanRegex = new RegExp(
      `<span\\s+style=\\{\\{([^}]*)\\}\\}>${escapeRegex(catName)}</span>`,
      "g"
    );
    if (catSpanRegex.test(content)) {
      content = content.replace(
        new RegExp(
          `<span\\s+style=\\{\\{([^}]*)\\}\\}>${escapeRegex(catName)}</span>`,
          "g"
        ),
        `<a href="/#${anchor}" style={{$1, textDecoration: "none" }}>${catName}</a>`
      );
      changed = true;
    }
  }
  
  // REPLACEMENT 3: Also fix plain spans without style (edge case)
  const homeNoStyleRegex = /<span>Home<\/span>/g;
  if (homeNoStyleRegex.test(content)) {
    content = content.replace(
      /<span>Home<\/span>/g,
      '<a href="/" style={{ color: theme.primary || "#0D9488", textDecoration: "none" }}>Home</a>'
    );
    changed = true;
  }
  
  for (const [catName, anchor] of Object.entries(CAT_ANCHORS)) {
    const plainRegex = new RegExp(`<span>${escapeRegex(catName)}</span>`, "g");
    if (plainRegex.test(content)) {
      content = content.replace(
        plainRegex,
        `<a href="/#${anchor}" style={{ color: theme.primary || "#0D9488", textDecoration: "none" }}>${catName}</a>`
      );
      changed = true;
    }
  }
  
  if (changed) {
    // Fix any double textDecoration (in case style already had it)
    content = content.replace(/textDecoration: "none",\s*textDecoration: "none"/g, 'textDecoration: "none"');
    
    fs.writeFileSync(filePath, content, "utf8");
    fixed++;
    return "FIXED";
  }
  
  noBC++;
  return "NO_MATCH";
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function scanRecursive(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanRecursive(full);
    } else if (entry.name.endsWith(".jsx") || entry.name.endsWith(".tsx")) {
      const slug = path.relative(TOOLS_DIR, path.dirname(full)).split(path.sep)[0] || entry.name;
      const result = processFile(full);
      if (result === "FIXED") {
        console.log(`  ✅ ${slug}/${entry.name}: breadcrumb links fixed`);
      } else if (result === "OK") {
        // silent - already working
      }
    }
  }
}

console.log("Scanning all tool files for broken breadcrumbs...\n");
scanRecursive(TOOLS_DIR);

// Also fix fuel-calculator
const fuelCalcDir = path.join(__dirname, "src", "app", "fuel-calculator");
if (fs.existsSync(fuelCalcDir)) {
  const entries = fs.readdirSync(fuelCalcDir);
  for (const e of entries) {
    if (e.endsWith(".tsx") || e.endsWith(".jsx")) {
      const result = processFile(path.join(fuelCalcDir, e));
      if (result === "FIXED") {
        console.log(`  ✅ fuel-calculator/${e}: breadcrumb links fixed`);
      }
    }
  }
}

console.log(`\n========================================`);
console.log(`  UNIVERSAL BREADCRUMB FIX COMPLETE`);
console.log(`========================================`);
console.log(`  ✅ Fixed:      ${fixed}`);
console.log(`  ✔️  Already OK: ${alreadyOk}`);
console.log(`  ⬜ No change:  ${noBC}`);
console.log(``);
console.log(`Deploy:`);
console.log(`  git add -A`);
console.log(`  git commit -m "Fix all breadcrumb links site-wide"`);
console.log(`  git push origin main`);
console.log(`========================================`);
