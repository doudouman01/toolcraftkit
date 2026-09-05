import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Properly Encode URLs in Your Web Applications",
  description: "Avoid broken links and API errors with proper URL encoding. Common mistakes and correct methods for JavaScript, Python, and PHP.",
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
        <h1 style={s.h1}>How to Properly Encode URLs in Your Web Applications</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Improperly encoded URLs are one of the most common sources of bugs in web applications. A space in a search query, an ampersand in a company name, or a non-English character in a user's name — any of these can break a URL if not handled correctly.</p>

        <h2 style={s.h2}>Characters That Must Be Encoded</h2>
        <p style={s.p}>Spaces become %20 (or + in query strings). & becomes %26. = becomes %3D. ? becomes %3F. # becomes %23. / becomes %2F (in path segments where it is literal, not a separator). Non-ASCII characters like é become their UTF-8 byte sequences: %C3%A9. Failing to encode these characters corrupts the URL structure.</p>

        <h2 style={s.h2}>Language-Specific Methods</h2>
        <p style={s.p}>JavaScript: encodeURIComponent() for parameter values, encodeURI() for full URLs. Python: urllib.parse.quote() for path segments, urllib.parse.urlencode() for query parameters. PHP: urlencode() for query strings, rawurlencode() for path segments. Each language has specific functions — using the wrong one produces subtle bugs.</p>

        <h2 style={s.h2}>Double Encoding</h2>
        <p style={s.p}>The most common encoding bug is double encoding — encoding a string that is already encoded. %20 becomes %2520. This happens when a framework automatically encodes output and the developer also encodes manually. If your URL contains %25 followed by hex digits, you likely have double encoding.</p>

        <h2 style={s.h2}>Testing Encoded URLs</h2>
        <p style={s.p}>Always decode a URL to verify it contains what you expect. Paste the encoded URL into a decoder to see the readable version. Test with special characters, international characters, and edge cases (empty strings, very long values, nested URLs as parameters). Our URL Encoder/Decoder tool handles both directions instantly.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free URL Encoder/Decoder handles this instantly — no signup, no limits.</p>
        <Link href="/tools/url-encoder" style={s.cta}>Open URL Encoder →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/regex-tester" style={{ color: "#0D9488" }}>Regex Tester</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
