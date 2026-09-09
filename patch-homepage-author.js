/**
 * patch-homepage-author.js
 * 
 * Adds Author Tools category to homepage
 * Also fixes the Fuel Calculator entry format
 * 
 * Run from project root: node patch-homepage-author.js
 */

const fs = require("fs");
const path = require("path");

const HOMEPAGE = path.join(__dirname, "src", "app", "page.tsx");

if (!fs.existsSync(HOMEPAGE)) {
  console.error("❌ src/app/page.tsx not found!");
  process.exit(1);
}

let content = fs.readFileSync(HOMEPAGE, "utf8");

// 1. Fix Fuel Calculator entry (wrong format)
const oldFuel = `        {
          name: "Fuel Cost Calculator",
          href: "/fuel-calculator",
          icon: "⛽",
          description: "Calculate annual fuel costs and savings potential",
        },`;

const newFuel = `      { name: "Fuel Cost Calculator", desc: "Calculate annual fuel costs, efficiency gap, and savings potential.", href: "/fuel-calculator", hot: true },`;

if (content.includes('icon: "⛽"')) {
  content = content.replace(oldFuel, newFuel);
  console.log("✅ Fuel Calculator entry fixed");
} else {
  console.log("⏭️  Fuel Calculator entry already correct or not found");
}

// 2. Add Author Tools category before the closing ];
const authorSection = `  {
    category: "Author Tools",
    color: "#D97706",
    items: [
      { name: "KDP Royalty Calculator", desc: "Calculate Amazon KDP ebook royalties. Compare 35% vs 70% across all marketplaces.", href: "/tools/kdp-royalty-calculator", hot: true },
      { name: "Book Description Formatter", desc: "Write your blurb in plain text, get Amazon-ready HTML. Templates included.", href: "/tools/book-description-formatter", hot: true },
      { name: "Series Revenue Calculator", desc: "Project total series revenue based on read-through rates and KU page reads.", href: "/tools/series-revenue-calculator", premium: true },
      { name: "Author Productivity Planner", desc: "Plan your manuscript timeline, track progress, build a publication calendar.", href: "/tools/author-productivity-planner", premium: true },
    ],
  },`;

if (!content.includes("Author Tools")) {
  // Insert before the closing ];
  content = content.replace(
    /\];\s*\nexport default function Home/,
    `  ${authorSection}\n];\n\nexport default function Home`
  );
  console.log("✅ Author Tools category added to homepage");
} else {
  console.log("⏭️  Author Tools already on homepage");
}

// 3. Add premium badge support in the rendering
// Find the POPULAR badge and add premium badge after it
if (!content.includes("tool.premium")) {
  const popularBadge = `                    {tool.hot && (
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: "#fff", background: "#0D9488",
                        borderRadius: 4, padding: "2px 6px", letterSpacing: 0.5, textTransform: "uppercase",
                      }}>POPULAR</span>
                    )}`;

  const withPremium = `                    {tool.hot && (
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: "#fff", background: "#0D9488",
                        borderRadius: 4, padding: "2px 6px", letterSpacing: 0.5, textTransform: "uppercase",
                      }}>POPULAR</span>
                    )}
                    {tool.premium && (
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: "#fff", background: "#D97706",
                        borderRadius: 4, padding: "2px 6px", letterSpacing: 0.5, textTransform: "uppercase",
                      }}>PREMIUM</span>
                    )}`;

  content = content.replace(popularBadge, withPremium);
  console.log("✅ Premium badge support added");
} else {
  console.log("⏭️  Premium badge already supported");
}

fs.writeFileSync(HOMEPAGE, content, "utf8");
console.log("✅ Homepage saved");

console.log("\n========================================");
console.log("  HOMEPAGE PATCH COMPLETE");
console.log("========================================");
console.log("Deploy:");
console.log('  git add -A');
console.log('  git commit -m "Add Author Tools to homepage"');
console.log("  git push origin main");
console.log("========================================");
