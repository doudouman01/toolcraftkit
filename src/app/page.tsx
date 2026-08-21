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
    ],
  },
  {
    category: "Business Tools",
    color: "#F59E0B",
    items: [
      { name: "Percentage Calculator", desc: "Six calculators for every percentage problem. Discounts, tips, changes.", href: "/tools/percentage-calculator", hot: true },
      { name: "Profit Margin Calculator", desc: "Calculate margin, markup, and revenue from costs. Visual breakdown.", href: "/tools/profit-margin-calculator" },
    ],
  },
  {
    category: "Converter Tools",
    color: "#6366F1",
    items: [
      { name: "Unit Converter", desc: "Convert between 60+ units. Length, weight, temperature, and more.", href: "/tools/unit-converter", hot: true },
      { name: "Base64 Encoder/Decoder", desc: "Encode text to Base64 or decode Base64 to text instantly.", href: "/tools/base64" },
    ],
  },
  {
    category: "Image Tools",
    color: "#8B5CF6",
    items: [
      { name: "Hex to RGB Converter", desc: "Convert colors between HEX, RGB, HSL, CMYK. Contrast checker & palettes.", href: "/tools/hex-to-rgb" },
    ],
  },
  {
    category: "Developer Tools",
    color: "#EF4444",
    items: [
      { name: "JSON Formatter", desc: "Format, validate & minify JSON. Syntax highlighting & structure stats.", href: "/tools/json-formatter" },
      { name: "Password Generator", desc: "Generate strong random passwords. Customizable length and characters.", href: "/tools/password-generator", hot: true },
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
          <section key={group.category} style={{ marginBottom: 32 }}>
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
