import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoding and Decoding: What It Is and When Developers Need It",
  description: "Understand Base64 encoding for web development. Embedding images, handling API data, JWT tokens, and email attachments.",
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
        <h1 style={s.h1}>Base64 Encoding and Decoding: What It Is and When Developers Need It</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Base64 encoding converts binary data into ASCII text — and it shows up everywhere in web development. Data URIs for inline images, JWT tokens, API authentication headers, email attachments, and binary data in JSON. Understanding what Base64 does (and does not do) prevents common mistakes.</p>

        <h2 style={s.h2}>What Base64 Actually Does</h2>
        <p style={s.p}>Base64 takes any binary data and represents it using only 64 safe ASCII characters (A-Z, a-z, 0-9, +, /). This makes binary data safe to transmit through systems designed for text — email protocols, JSON payloads, URL parameters, and HTML attributes. It is not encryption — anyone can decode Base64. It is encoding, like converting a JPEG to text.</p>

        <h2 style={s.h2}>Common Use Cases</h2>
        <p style={s.p}>Data URIs: embed small images directly in HTML or CSS without a separate HTTP request. JWT tokens: the payload of a JSON Web Token is Base64-encoded JSON. HTTP Basic Auth: username:password is Base64-encoded in the Authorization header. Email attachments: MIME encoding uses Base64 to embed files in email messages.</p>

        <h2 style={s.h2}>The Size Tradeoff</h2>
        <p style={s.p}>Base64 encoding increases data size by about 33%. A 30 KB image becomes a 40 KB Base64 string. For small assets (icons, simple graphics under 5 KB), the tradeoff is worthwhile because you eliminate an HTTP request. For larger files, separate file serving is more efficient.</p>

        <h2 style={s.h2}>Encoding vs Encryption</h2>
        <p style={s.p}>Base64 is NOT encryption. It provides zero security — anyone can decode a Base64 string instantly. Never use Base64 to protect sensitive data. Use it only for safe transmission of binary data through text-based channels. If you need security, use actual encryption (AES, RSA) and then optionally Base64-encode the encrypted output for transmission.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Base64 Encoder handles this instantly — no signup, no limits.</p>
        <Link href="/tools/base64" style={s.cta}>Open Base64 Encoder →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/url-encoder" style={{ color: "#0D9488" }}>URL Encoder</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
