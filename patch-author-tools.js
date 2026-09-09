/**
 * patch-author-tools.js
 * 
 * 1. Adds "Author" category to tools/layout.tsx nav bar
 * 2. Adds the 4 author tools to the TOOL_CATS mapping in layout.tsx
 * 
 * Run from project root: node patch-author-tools.js
 */

const fs = require("fs");
const path = require("path");

// ============================================================
// 1. UPDATE TOOLS LAYOUT — Add Author category + tool mappings
// ============================================================
const layoutPath = path.join(__dirname, "src", "app", "tools", "layout.tsx");

if (!fs.existsSync(layoutPath)) {
  console.error("❌ tools/layout.tsx not found!");
  process.exit(1);
}

let layout = fs.readFileSync(layoutPath, "utf8");

// Add "Author" to CATEGORIES array
if (!layout.includes('"Author"')) {
  layout = layout.replace(
    '{ name: "Converter"',
    '{ name: "Author", anchor: "author-tools", color: "#D97706" },\n  { name: "Converter"'
  );
  console.log("✅ Author category added to nav bar");
} else {
  console.log("⏭️  Author category already in nav bar");
}

// Add author tools to TOOL_CATS mapping
const authorTools = {
  '"kdp-royalty-calculator": "Author"': 'kdp-royalty-calculator',
  '"book-description-formatter": "Author"': 'book-description-formatter',
  '"series-revenue-calculator": "Author"': 'series-revenue-calculator',
  '"author-productivity-planner": "Author"': 'author-productivity-planner',
};

for (const [entry, slug] of Object.entries(authorTools)) {
  if (!layout.includes(slug)) {
    // Add before the last closing brace of TOOL_CATS
    layout = layout.replace(
      '"pomodoro-timer": "Business"',
      `"pomodoro-timer": "Business",\n  ${entry}`
    );
    console.log(`✅ ${slug} added to TOOL_CATS`);
  } else {
    console.log(`⏭️  ${slug} already in TOOL_CATS`);
  }
}

fs.writeFileSync(layoutPath, layout, "utf8");
console.log("✅ tools/layout.tsx saved");

// ============================================================
// 2. VERIFY ALL 4 TOOL PAGES EXIST
// ============================================================
const tools = [
  "kdp-royalty-calculator",
  "book-description-formatter",
  "series-revenue-calculator",
  "author-productivity-planner",
];

console.log("\nVerifying tool pages:");
for (const slug of tools) {
  const pagePath = path.join(__dirname, "src", "app", "tools", slug, "page.tsx");
  if (fs.existsSync(pagePath)) {
    console.log(`  ✅ ${slug}/page.tsx found`);
  } else {
    console.log(`  ❌ ${slug}/page.tsx MISSING — place it at src/app/tools/${slug}/page.tsx`);
  }
}

// ============================================================
// 3. SUMMARY
// ============================================================
console.log("\n========================================");
console.log("  AUTHOR TOOLS PATCH COMPLETE");
console.log("========================================");
console.log("Deploy:");
console.log('  git add -A');
console.log('  git commit -m "Add Author Tools category with 4 tools"');
console.log("  git push origin main");
console.log("========================================");
