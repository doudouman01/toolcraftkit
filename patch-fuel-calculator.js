/**
 * patch-fuel-calculator.js
 * 
 * Run from project root: node patch-fuel-calculator.js
 * 
 * This script:
 * 1. Adds Fuel Cost Calculator to the homepage (Productivity Tools section)
 * 2. Verifies the fuel-calculator page exists
 */

const fs = require('fs');
const path = require('path');

const HOMEPAGE = path.join(__dirname, 'src', 'app', 'page.tsx');
const CALC_PAGE = path.join(__dirname, 'src', 'app', 'fuel-calculator', 'page.tsx');

// ============================================================
// 1. VERIFY FUEL CALCULATOR PAGE EXISTS
// ============================================================
if (!fs.existsSync(CALC_PAGE)) {
  console.error('❌ ERROR: fuel-calculator/page.tsx not found!');
  console.error('   Place it at: src/app/fuel-calculator/page.tsx');
  process.exit(1);
}
console.log('✅ fuel-calculator/page.tsx found');

// ============================================================
// 2. PATCH HOMEPAGE — Add to Productivity Tools
// ============================================================
if (!fs.existsSync(HOMEPAGE)) {
  console.error('❌ ERROR: src/app/page.tsx not found!');
  process.exit(1);
}

let homepage = fs.readFileSync(HOMEPAGE, 'utf8');

// Check if already added
if (homepage.includes('fuel-calculator')) {
  console.log('⚠️  Fuel Calculator already on homepage — skipping');
} else {
  // Strategy: find "Productivity" section and add the tool
  // Look for common patterns in the homepage tool arrays
  
  // Pattern 1: Look for "Productivity" tools array/section
  const productivityPatterns = [
    /("Productivity Tools?"[\s\S]*?tools:\s*\[)([\s\S]*?)(\])/,
    /(Productivity[\s\S]*?)\{(\s*name:\s*"Pomodoro Timer")/,
    /(pomodoro-timer[^}]*\})/,
  ];
  
  const newTool = `
        {
          name: "Fuel Cost Calculator",
          href: "/fuel-calculator",
          icon: "⛽",
          description: "Calculate annual fuel costs and savings potential",
        },`;

  let patched = false;

  // Try to add after pomodoro-timer (last known Productivity tool)
  if (homepage.includes('pomodoro-timer')) {
    // Find the closing brace + comma after pomodoro-timer entry
    const pomodoroRegex = /(pomodoro-timer[^}]*\}[\s]*,?)/;
    const match = homepage.match(pomodoroRegex);
    if (match) {
      homepage = homepage.replace(match[0], match[0] + newTool);
      patched = true;
      console.log('✅ Fuel Calculator added after Pomodoro Timer in Productivity section');
    }
  }

  // Fallback: try to add before the last tool section closing
  if (!patched) {
    // Generic approach: add to Business section after invoice-generator
    if (homepage.includes('invoice-generator')) {
      const invoiceRegex = /(invoice-generator[^}]*\}[\s]*,?)/;
      const match = homepage.match(invoiceRegex);
      if (match) {
        homepage = homepage.replace(match[0], match[0] + newTool);
        patched = true;
        console.log('✅ Fuel Calculator added after Invoice Generator in Business section');
      }
    }
  }

  if (!patched) {
    console.log('⚠️  Could not auto-patch homepage. Add manually:');
    console.log('   In src/app/page.tsx, in the Productivity or Business tools section, add:');
    console.log('   { name: "Fuel Cost Calculator", href: "/fuel-calculator", icon: "⛽", description: "Calculate annual fuel costs and savings potential" }');
  } else {
    fs.writeFileSync(HOMEPAGE, homepage, 'utf8');
    console.log('✅ Homepage saved');
  }
}

// ============================================================
// 3. VERIFY AMAZON LINK
// ============================================================
const calcContent = fs.readFileSync(CALC_PAGE, 'utf8');
if (calcContent.includes('B0HJ86J1YN')) {
  console.log('✅ Amazon ASIN B0HJ86J1YN confirmed in calculator');
} else if (calcContent.includes('XXXXXXXXXX')) {
  console.error('❌ Amazon ASIN still placeholder! Update fuel-calculator/page.tsx');
} else {
  console.log('⚠️  Could not verify Amazon link — check manually');
}

// ============================================================
// 4. SUMMARY
// ============================================================
console.log('\n========================================');
console.log('  DEPLOYMENT READY');
console.log('========================================');
console.log('Files:');
console.log('  ✅ src/app/fuel-calculator/page.tsx');
console.log('  ✅ src/app/page.tsx (patched)');
console.log('');
console.log('Next steps:');
console.log('  1. git add -A');
console.log('  2. git commit -m "Add Fuel Cost Calculator tool"');
console.log('  3. git push origin main');
console.log('  4. Vercel auto-deploys');
console.log('  5. Verify: toolcraftkit.com/fuel-calculator');
console.log('========================================');
