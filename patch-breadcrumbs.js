/**
 * patch-breadcrumbs.js
 * 
 * Run from project root: node patch-breadcrumbs.js
 * 
 * Scans ALL tool pages in src/app/tools/  and src/app/fuel-calculator/
 * Adds Breadcrumb component to each one automatically.
 */

const fs = require("fs");
const path = require("path");

const TOOLS_DIR = path.join(__dirname, "src", "app", "tools");
const FUEL_DIR = path.join(__dirname, "src", "app", "fuel-calculator");
const BREADCRUMB_PATH = path.join(__dirname, "src", "components", "Breadcrumb.tsx");

// ============================================================
// 1. VERIFY BREADCRUMB COMPONENT EXISTS
// ============================================================
if (!fs.existsSync(BREADCRUMB_PATH)) {
  console.error("❌ Breadcrumb.tsx not found at src/components/Breadcrumb.tsx");
  console.error("   Place it there first, then re-run this script.");
  process.exit(1);
}
console.log("✅ Breadcrumb.tsx found");

// ============================================================
// 2. SLUG → DISPLAY NAME MAPPING
// ============================================================
function slugToName(slug) {
  // Convert slug to display name: "word-counter" → "Word Counter"
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ============================================================
// 3. PATCH A SINGLE TOOL PAGE
// ============================================================
function patchToolPage(pagePath, slug) {
  let content = fs.readFileSync(pagePath, "utf8");

  // Skip if already patched
  if (content.includes("Breadcrumb")) {
    return "SKIP";
  }

  const toolName = slugToName(slug);
  const importLine = `import Breadcrumb from "@/components/Breadcrumb";\n`;
  const breadcrumbJsx = `<Breadcrumb toolSlug="${slug}" toolName="${toolName}" />`;

  // STEP A: Add import
  // Try to add after last import line
  const importRegex = /^(import .+;\n)/gm;
  let lastImportMatch = null;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    lastImportMatch = match;
  }

  if (lastImportMatch) {
    const insertPos = lastImportMatch.index + lastImportMatch[0].length;
    content = content.slice(0, insertPos) + importLine + content.slice(insertPos);
  } else {
    // No imports found — add at very top after "use client" if present
    if (content.includes('"use client"')) {
      content = content.replace('"use client";', '"use client";\n' + importLine);
    } else {
      content = importLine + content;
    }
  }

  // STEP B: Add Breadcrumb JSX after first opening <div
  // Find the first <div in the return statement
  const returnDivRegex = /return\s*\(\s*\n?\s*<div([^>]*)>/;
  const divMatch = content.match(returnDivRegex);

  if (divMatch) {
    const fullMatch = divMatch[0];
    content = content.replace(
      fullMatch,
      fullMatch + "\n      " + breadcrumbJsx
    );
    fs.writeFileSync(pagePath, content, "utf8");
    return "PATCHED";
  } else {
    // Try alternative: return ( followed by anything then first <div
    const altRegex = /(<div[^>]*style[^>]*>)/;
    const altMatch = content.match(altRegex);
    if (altMatch) {
      content = content.replace(
        altMatch[0],
        altMatch[0] + "\n      " + breadcrumbJsx
      );
      fs.writeFileSync(pagePath, content, "utf8");
      return "PATCHED";
    }
    return "FAIL";
  }
}

// ============================================================
// 4. SCAN AND PATCH ALL TOOLS
// ============================================================
let patched = 0;
let skipped = 0;
let failed = 0;

// Scan src/app/tools/*/page.tsx
if (fs.existsSync(TOOLS_DIR)) {
  const toolDirs = fs.readdirSync(TOOLS_DIR).filter((d) => {
    const fullPath = path.join(TOOLS_DIR, d);
    return fs.statSync(fullPath).isDirectory();
  });

  console.log(`\nFound ${toolDirs.length} tools in src/app/tools/\n`);

  for (const dir of toolDirs) {
    const pagePath = path.join(TOOLS_DIR, dir, "page.tsx");
    if (!fs.existsSync(pagePath)) {
      console.log(`  ⚠️  ${dir}: no page.tsx found`);
      continue;
    }

    const result = patchToolPage(pagePath, dir);
    if (result === "PATCHED") {
      console.log(`  ✅ ${dir}: Breadcrumb added`);
      patched++;
    } else if (result === "SKIP") {
      console.log(`  ⏭️  ${dir}: already has Breadcrumb`);
      skipped++;
    } else {
      console.log(`  ❌ ${dir}: could not auto-patch — add manually`);
      failed++;
    }
  }
}

// Patch fuel-calculator separately
const fuelPage = path.join(FUEL_DIR, "page.tsx");
if (fs.existsSync(fuelPage)) {
  const result = patchToolPage(fuelPage, "fuel-calculator");
  if (result === "PATCHED") {
    console.log(`  ✅ fuel-calculator: Breadcrumb added`);
    patched++;
  } else if (result === "SKIP") {
    console.log(`  ⏭️  fuel-calculator: already has Breadcrumb`);
    skipped++;
  } else {
    console.log(`  ❌ fuel-calculator: could not auto-patch`);
    failed++;
  }
}

// ============================================================
// 5. SUMMARY
// ============================================================
console.log("\n========================================");
console.log("  BREADCRUMB PATCH COMPLETE");
console.log("========================================");
console.log(`  ✅ Patched:  ${patched}`);
console.log(`  ⏭️  Skipped:  ${skipped}`);
console.log(`  ❌ Failed:   ${failed}`);
console.log("");
console.log("Next steps:");
console.log('  1. git add -A');
console.log('  2. git commit -m "Add breadcrumb navigation to all tools"');
console.log("  3. git push origin main");
console.log("  4. Vercel auto-deploys");
console.log("========================================");

if (failed > 0) {
  console.log("\n⚠️  Some pages could not be auto-patched.");
  console.log("   Open them manually and add:");
  console.log('   import Breadcrumb from "@/components/Breadcrumb";');
  console.log('   <Breadcrumb toolSlug="tool-slug" toolName="Tool Name" />');
  console.log("   right after the first <div> in the return statement.");
}
