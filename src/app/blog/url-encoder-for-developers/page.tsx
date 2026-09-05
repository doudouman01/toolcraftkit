import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoding Explained: When and How to Encode URLs for Web Development",
  description: "Learn what URL encoding is, why special characters break URLs, and how to encode/decode URLs properly. Free online tool for developers.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>URL Encoding Explained: When and How to Encode URLs for Web Development</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>URLs can only contain a specific set of characters. Spaces, ampersands, question marks, non-ASCII characters, and many other common characters must be encoded before they can appear in a URL. Getting this wrong breaks links, API calls, and web applications in subtle and frustrating ways.</p>

        <h2 style={s.h2}>Why URL Encoding Exists</h2>
        <p style={s.p}>URLs were designed in the early days of the internet with a limited character set (RFC 3986). Characters like spaces, &, =, ?, #, and / have special meanings in URLs. A space in a search query must become %20 (or +), an ampersand must become %26, and a hash must become %23. Without encoding, the browser interprets these characters as URL structure rather than content.</p>

        <h2 style={s.h2}>Common Encoding Scenarios</h2>
        <p style={s.p}>Query parameters: a search for 'cats & dogs' becomes ?q=cats%20%26%20dogs. File paths with spaces: /my documents/ becomes /my%20documents/. International characters: café becomes caf%C3%A9. Form data: user input with special characters must be encoded before transmission.</p>

        <h2 style={s.h2}>encodeURI vs encodeURIComponent</h2>
        <p style={s.p}>JavaScript provides two functions. encodeURI encodes a full URL but preserves structural characters (://?#). encodeURIComponent encodes everything except letters, digits, and a few safe characters — use this for individual parameter values. Using the wrong one is a common source of bugs.</p>

        <h2 style={s.h2}>Debugging URL Issues</h2>
        <p style={s.p}>If a link or API call is broken, decode the URL first to see what it actually contains. Common issues: double encoding (encoding an already-encoded URL), forgetting to encode parameter values, or using + for spaces when %20 is expected. A URL decoder shows you exactly what went wrong.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free URL Encoder/Decoder handles this instantly — no signup, no limits.</p>
        <Link href="/tools/url-encoder" style={s.cta}>Open URL Encoder →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/base64" style={{ color: "#0D9488" }}>Base64 Encoder</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
