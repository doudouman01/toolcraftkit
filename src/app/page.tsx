import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

const tools = [
  {
    category: "Text Tools",
    color: "#0D9488",
    items: [
      { name: "Word Counter", desc: "Count words, characters, sentences. Reading time & keyword density.", href: "/tools/word-counter", hot: true },
      { name: "Character Counter", desc: "Count characters with & without spaces. Platform limit checker.", href: "/tools/character-counter", hot: true },
      { name: "Text Case Converter", desc: "Convert between UPPERCASE, lowercase, Title Case, camelCase, and 10+ formats.", href: "/tools/text-case-converter" },
      { name: "Lorem Ipsum Generator", desc: "Generate placeholder text. Paragraphs, sentences, words, or lists.", href: "/tools/lorem-ipsum-generator" },
      { name: "Markdown to HTML", desc: "Convert Markdown to clean HTML. Live preview, copy, or download.", href: "/tools/markdown-to-html" },
      { name: "Remove Duplicate Lines", desc: "Remove duplicate lines from text. Keep only unique entries, sort, trim.", href: "/tools/remove-duplicates" },
      { name: "Words to Pages", desc: "Estimate how many pages your word count fills. Font size, spacing, presets.", href: "/tools/words-to-pages", hot: true },
    ],
  },
  {
    category: "Business Tools",
    color: "#F59E0B",
    items: [
      { name: "Percentage Calculator", desc: "Six calculators for every percentage problem. Discounts, tips, changes.", href: "/tools/percentage-calculator", hot: true },
      { name: "Profit Margin Calculator", desc: "Calculate margin, markup, and revenue from costs. Visual breakdown.", href: "/tools/profit-margin-calculator" },
      { name: "Discount Calculator", desc: "Calculate sale prices, savings, and reverse-calculate discounts. With tax.", href: "/tools/discount-calculator", hot: true },
      { name: "ROI Calculator", desc: "Calculate return on investment, net profit, and annualized CAGR.", href: "/tools/roi-calculator" },
      { name: "Loan Calculator", desc: "Monthly payments, total interest, amortization schedule. Mortgages & loans.", href: "/tools/loan-calculator", hot: true },
      { name: "Invoice Generator", desc: "Create professional invoices instantly. Print or save as PDF. Free.", href: "/tools/invoice-generator", hot: true },
      { name: "Compound Interest Calculator", desc: "See how your money grows with compound interest and monthly contributions.", href: "/tools/compound-interest", hot: true },
      { name: "Mortgage Calculator", desc: "Estimate monthly payments with taxes, insurance, and amortization schedule.", href: "/tools/mortgage-calculator", hot: true },
      { name: "Salary Calculator", desc: "Convert annual salary to hourly rate and back. Monthly, weekly, daily breakdown.", href: "/tools/salary-calculator" },
      { name: "Income Tax Calculator", desc: "Estimate federal income tax. US, Canada, and UK brackets with breakdown.", href: "/tools/tax-calculator", hot: true },
      { name: "Tip Calculator", desc: "Calculate tip amount, split the bill, and compare tip percentages.", href: "/tools/tip-calculator" },
    ],
  },
  {
    category: "Converter Tools",
    color: "#6366F1",
    items: [
      { name: "Unit Converter", desc: "Convert between 60+ units. Length, weight, temperature, and more.", href: "/tools/unit-converter", hot: true },
      { name: "Base64 Encoder/Decoder", desc: "Encode text to Base64 or decode Base64 to text instantly.", href: "/tools/base64" },
      { name: "URL Encoder/Decoder", desc: "Encode or decode URLs and query strings. Component or full URI mode.", href: "/tools/url-encoder", hot: true },
      { name: "Timestamp Converter", desc: "Convert Unix timestamps to dates and back. Live clock, multiple formats.", href: "/tools/timestamp-converter" },
    ],
  },
  {
    category: "Image Tools",
    color: "#8B5CF6",
    items: [
      { name: "Hex to RGB Converter", desc: "Convert colors between HEX, RGB, HSL, CMYK. Contrast checker & palettes.", href: "/tools/hex-to-rgb" },
      { name: "Color Palette Generator", desc: "Generate harmonious palettes from any color. 6 modes, CSS export.", href: "/tools/color-palette", hot: true },
    ],
  },
  {
    category: "Developer Tools",
    color: "#EF4444",
    items: [
      { name: "JSON Formatter", desc: "Format, validate & minify JSON. Syntax highlighting & structure stats.", href: "/tools/json-formatter" },
      { name: "Password Generator", desc: "Generate strong random passwords. Customizable length and characters.", href: "/tools/password-generator", hot: true },
      { name: "Regex Tester", desc: "Test regular expressions with live highlighting, presets, and replace mode.", href: "/tools/regex-tester", hot: true },
      { name: "QR Code Generator", desc: "Generate QR codes for URLs, WiFi, email, phone. Custom colors, download PNG.", href: "/tools/qr-code-generator", hot: true },
      { name: "Random Number Generator", desc: "Random numbers, dice roller, list picker, coin flip. 4 modes.", href: "/tools/random-number-generator", hot: true },
    ],
  },
  {
    category: "Life Tools",
    color: "#EC4899",
    items: [
      { name: "Age Calculator", desc: "Your exact age in years, months, days, hours. Zodiac, birthday countdown.", href: "/tools/age-calculator", hot: true },
    ],
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 880, margin: "0 auto", padding: "0 20px 40px" }}>
        <section style={{ textAlign: "center", padding: "48px 0 36px" }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1C1917", lineHeight: 1.2, marginBottom: 6 }}>
            Free Online Tools for{" "}
            <span style={{ color: "#0D9488" }}>Creators & Entrepreneurs</span>
          </h1>
          <p style={{ fontSize: 15, color: "#78716C", maxWidth: 480, margin: "0 auto" }}>
            No signup. No tracking. No limits. Just fast, free tools that run in your browser.
          </p>
        </section>

        {tools.map((group) => (
          <section key={group.category} id={group.category.toLowerCase().replace(/ /g, "-")} style={{ marginBottom: 32, scrollMarginTop: 70 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 4, height: 22, borderRadius: 2, background: group.color }} />
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1C1917" }}>{group.category}</h2>
              <span style={{ fontSize: 12, color: "#A8A29E" }}>{group.items.length} {group.items.length === 1 ? "tool" : "tools"}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
              {group.items.map((tool) => (
                <Link key={tool.href} href={tool.href} style={{
                  display: "block", padding: "16px 18px", background: "#fff",
                  border: "1px solid #E7E5E4", borderRadius: 10, textDecoration: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 15, color: "#1C1917" }}>{tool.name}</span>
                    {tool.hot && (
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: "#fff", background: "#0D9488",
                        borderRadius: 4, padding: "2px 6px", letterSpacing: 0.5, textTransform: "uppercase",
                      }}>POPULAR</span>
                    )}
                  </div>
                  <p style={{ fontSize: 13, color: "#78716C", lineHeight: 1.5, margin: 0 }}>{tool.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C1917", marginBottom: 10 }}>About ToolCraftKit</h2>
          <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>
            ToolCraftKit is a collection of free online tools built for creators, entrepreneurs, developers, and anyone who works with text, numbers, colors, or data. Every tool runs entirely in your browser — nothing is uploaded, stored, or tracked.
          </p>
          <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>
            Whether you need to count words for an essay, calculate profit margins for your business, convert color codes for a design project, generate secure passwords, convert units, or format JSON for an API, ToolCraftKit has you covered. New tools are added regularly.
          </p>
        </section>
      </main>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
