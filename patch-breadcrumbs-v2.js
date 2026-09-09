/**
 * patch-breadcrumbs-v2.js
 * 
 * Patches the 8 tools that use a server component wrapper pattern:
 *   page.tsx imports a client component like WordCounter.jsx
 * 
 * Run from project root: node patch-breadcrumbs-v2.js
 */

const fs = require("fs");
const path = require("path");

const TOOLS_DIR = path.join(__dirname, "src", "app", "tools");

// The 8 failed tools
const FAILED_TOOLS = [
  "character-counter",
  "hex-to-rgb",
  "json-formatter",
  "lorem-ipsum-generator",
  "percentage-calculator",
  "profit-margin-calculator",
  "text-case-converter",
  "word-counter",
];

function slugToName(slug) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

let patched = 0;
let failed = 0;

for (const slug of FAILED_TOOLS) {
  const pagePath = path.join(TOOLS_DIR, slug, "page.tsx");
  
  if (!fs.existsSync(pagePath)) {
    console.log(`  ❌ ${slug}: page.tsx not found`);
    failed++;
    continue;
  }

  let content = fs.readFileSync(pagePath, "utf8");

  // Skip if already patched
  if (content.includes("Breadcrumb")) {
    console.log(`  ⏭️  ${slug}: already has Breadcrumb`);
    continue;
  }

  const toolName = slugToName(slug);

  // Pattern: export default function Page() { return <Component />; }
  // Replace with wrapped version

  // Add import
  content = content.replace(
    'import type { Metadata } from "next";',
    'import type { Metadata } from "next";\nimport Breadcrumb from "@/components/Breadcrumb";'
  );

  // Replace the one-liner return with wrapped version
  // Match: export default function Page() { return <SomeComponent />; }
  const oneLineReturn = /export default function Page\(\) \{ return (<\w+\s*\/>); \}/;
  const match = content.match(oneLineReturn);

  if (match) {
    const component = match[1];
    content = content.replace(
      match[0],
      `export default function Page() {\n  return (\n    <>\n      <Breadcrumb toolSlug="${slug}" toolName="${toolName}" />\n      ${component}\n    </>\n  );\n}`
    );

    fs.writeFileSync(pagePath, content, "utf8");
    console.log(`  ✅ ${slug}: Breadcrumb added`);
    patched++;
  } else {
    // Try multi-line return pattern
    const multiLineReturn = /export default function Page\(\)\s*\{[\s\S]*?return\s*\(\s*\n?\s*(<\w+)/;
    const multiMatch = content.match(multiLineReturn);

    if (multiMatch) {
      const componentTag = multiMatch[1];
      content = content.replace(
        componentTag,
        `<>\n      <Breadcrumb toolSlug="${slug}" toolName="${toolName}" />\n      ${componentTag}`
      );
      // Also close the fragment before the last closing paren
      content = content.replace(/\s*\);\s*\}$/, `\n    </>\n  );\n}`);

      fs.writeFileSync(pagePath, content, "utf8");
      console.log(`  ✅ ${slug}: Breadcrumb added (multi-line)`);
      patched++;
    } else {
      console.log(`  ❌ ${slug}: unrecognized pattern — add manually`);
      failed++;
    }
  }
}

console.log("\n========================================");
console.log(`  ✅ Patched: ${patched}`);
console.log(`  ❌ Failed:  ${failed}`);
console.log("========================================");
console.log('  git add -A');
console.log('  git commit -m "Add breadcrumb to remaining tools"');
console.log("  git push origin main");
