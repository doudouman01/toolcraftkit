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
    ],
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF9" }}>
      <Header />
      <main style={{ maxWidth: 880, margin: "0 auto", padding: "40px 16px 60px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{
            fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em",
            lineHeight: 1.2, color: "#1C1917", marginBottom: 12,
          }}>
            Free Online Tools for<br />
            <span style={{ color: "#0D9488" }}>Creators & Entrepreneurs</span>
          </h1>
          <p style={{
            fontSize: 16, color: "#78716C", maxWidth: 520, margin: "0 auto", lineHeight: 1.6,
          }}>
            No signup. No tracking. No limits. Just fast, free tools that run in your browser.
          </p>
        </div>

        {/* Tool Grid */}
        {tools.map((cat) => (
          <section key={cat.category} style={{ marginBottom: 36 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
            }}>
              <div style={{
                width: 4, height: 20, borderRadius: 2, background: cat.color,
              }} />
              <h2 style={{
                fontSize: 18, fontWeight: 700, color: "#1C1917",
                letterSpacing: "-0.02em", margin: 0,
              }}>{cat.category}</h2>
              <span style={{
                fontSize: 12, color: "#A8A29E", fontWeight: 500,
              }}>{cat.items.length} tool{cat.items.length > 1 ? "s" : ""}</span>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 12,
            }}>
              {cat.items.map((tool) => (
                <Link key={tool.name} href={tool.href} style={{
                  background: "#FFFFFF", borderRadius: 12, padding: "18px 20px",
                  border: "1px solid #E7E5E4", textDecoration: "none",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  display: "block",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{
                      fontSize: 15, fontWeight: 700, color: "#1C1917",
                    }}>{tool.name}</span>
                    {tool.hot && (
                      <span style={{
                        fontSize: 10, fontWeight: 600, padding: "2px 6px",
                        borderRadius: 4, background: "rgba(13,148,136,0.1)",
                        color: "#0D9488",
                      }}>POPULAR</span>
                    )}
                  </div>
                  <p style={{
                    fontSize: 13, color: "#78716C", lineHeight: 1.5, margin: 0,
                  }}>{tool.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Bottom SEO */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, color: "#1C1917",
            marginBottom: 14, letterSpacing: "-0.02em",
          }}>About ToolCraftKit</h2>
          <p style={{ fontSize: 14, color: "#78716C", lineHeight: 1.7, marginBottom: 10 }}>
            ToolCraftKit is a collection of free online tools built for creators, entrepreneurs, developers, and anyone who works with text, numbers, colors, or data. Every tool runs entirely in your browser — nothing is uploaded, stored, or tracked.
          </p>
          <p style={{ fontSize: 14, color: "#78716C", lineHeight: 1.7 }}>
            Whether you need to count words for an essay, calculate profit margins for your business, convert color codes for a design project, or format JSON for an API, ToolCraftKit has you covered. New tools are added regularly.
          </p>
        </section>

        <Footer />
      </main>
    </div>
  );
}
