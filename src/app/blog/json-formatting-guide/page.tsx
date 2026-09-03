import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Format and Validate JSON (Quick Guide + Free Tool)",
  description: "Learn how to read, format, and validate JSON data. Understand JSON syntax, fix common errors, and use a free online formatter with syntax highlighting.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
    code: { background: "#F5F5F4", padding: "2px 8px", borderRadius: 4, fontSize: 14, fontFamily: "monospace" } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>How to Format and Validate JSON (Quick Guide)</h1>
        <p style={s.meta}>September 3, 2026 · 4 min read</p>

        <p style={s.p}>JSON (JavaScript Object Notation) is the standard format for data exchange on the web. APIs return it, configuration files use it, and databases store it. Whether you are a developer debugging an API response, a marketer working with webhook data, or a student learning web development, knowing how to read, format, and validate JSON is a practical skill you will use constantly.</p>

        <h2 style={s.h2}>What Is JSON?</h2>
        <p style={s.p}>JSON is a lightweight text format for storing and transmitting structured data. It uses key-value pairs (like a dictionary) and arrays (like a list). It is human-readable, language-independent, and supported by virtually every programming language and tool.</p>
        <p style={s.p}>A simple JSON example: <span style={s.code}>{`{"name": "Alice", "age": 30, "active": true}`}</span></p>

        <h2 style={s.h2}>JSON Syntax Rules</h2>
        <p style={s.p}><strong>Keys must be strings in double quotes.</strong> Single quotes, unquoted keys, and backticks are not valid JSON — even though JavaScript allows them.</p>
        <p style={s.p}><strong>Values can be:</strong> strings (in double quotes), numbers, booleans (<span style={s.code}>true</span>/<span style={s.code}>false</span>), null, arrays, or nested objects.</p>
        <p style={s.p}><strong>No trailing commas.</strong> The last item in an object or array must not have a comma after it. This is the most common syntax error.</p>
        <p style={s.p}><strong>No comments.</strong> Unlike JavaScript, JSON does not support comments. If you need annotations, use a descriptive key name instead.</p>

        <h2 style={s.h2}>Common JSON Errors and How to Fix Them</h2>
        <p style={s.p}><strong>Unexpected token</strong> — usually means a missing or extra comma, a single quote instead of double, or a trailing comma after the last item.</p>
        <p style={s.p}><strong>Unterminated string</strong> — a missing closing quote on a string value. Check for unescaped quotes inside strings.</p>
        <p style={s.p}><strong>Invalid character</strong> — often caused by invisible characters (BOM, zero-width spaces) copied from a document or web page.</p>
        <p style={s.p}><strong>Unexpected end of input</strong> — missing closing braces or brackets. The number of opening and closing braces/brackets must match exactly.</p>

        <h2 style={s.h2}>Why Formatting Matters</h2>
        <p style={s.p}>Raw JSON from an API often arrives as a single compressed line — valid but impossible to read. Formatting (also called &quot;pretty printing&quot;) adds indentation and line breaks so you can see the structure. This makes it dramatically easier to find the data you need, spot errors, and understand nested relationships.</p>

        <h2 style={s.h2}>Minifying JSON</h2>
        <p style={s.p}>The opposite of formatting is minifying — removing all whitespace to make the JSON as small as possible. This is useful for production code where file size matters. A formatted JSON file can be 30-50% larger than its minified version due to whitespace alone.</p>

        <h2 style={s.h2}>Format Your JSON Now</h2>
        <p style={s.p}>Use our free JSON Formatter to instantly format, validate, and minify JSON data. Paste any JSON and get syntax highlighting, error detection, and a clean, readable output.</p>
        <Link href="/tools/json-formatter" style={s.cta}>Open JSON Formatter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Working with encoded data? Our <Link href="/tools/base64" style={{ color: "#0D9488" }}>Base64 Encoder/Decoder</Link> and <Link href="/tools/url-encoder" style={{ color: "#0D9488" }}>URL Encoder</Link> handle common encoding tasks instantly.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
