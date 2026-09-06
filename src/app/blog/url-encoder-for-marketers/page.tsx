import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoding for Marketers: UTM Parameters, Tracking Links & Redirects",
  description: "Learn how to properly encode tracking URLs, UTM parameters, and affiliate links. Avoid broken campaigns with proper URL encoding.",
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
        <h1 style={s.h1}>URL Encoding for Marketers: UTM Parameters, Tracking Links & Redirects</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>A broken tracking link means lost data. If your UTM parameters are not properly encoded, Google Analytics may not capture your campaign data, and your attribution reporting falls apart. Understanding basic URL encoding prevents these invisible but costly mistakes in your marketing campaigns.</p>

        <h2 style={s.h2}>UTM Parameters and Special Characters</h2>
        <p style={s.p}>UTM parameters are appended to URLs: ?utm_source=facebook&utm_medium=cpc&utm_campaign=summer_sale. If your campaign name contains spaces or special characters (Summer Sale 2026 — 20% Off), you must encode them: utm_campaign=Summer%20Sale%202026%20%E2%80%94%2020%25%20Off. Unencoded special characters break the URL.</p>

        <h2 style={s.h2}>Affiliate Link Encoding</h2>
        <p style={s.p}>Many affiliate programs pass the destination URL as a parameter: affiliate.com/go?url=https://store.com/product?id=123&color=blue. The & in the destination URL conflicts with the affiliate URL structure. You must encode the entire destination URL so the affiliate platform passes it through correctly.</p>

        <h2 style={s.h2}>Redirect Chain Issues</h2>
        <p style={s.p}>When a URL passes through multiple redirects (ad platform → tracking tool → landing page), each redirect may encode or decode the URL. Double-encoded URLs (%2520 instead of %20) are a common result. Test your full redirect chain end-to-end before launching a campaign.</p>

        <h2 style={s.h2}>QR Codes and URL Encoding</h2>
        <p style={s.p}>When generating QR codes for URLs with parameters, the URL must be properly encoded. A QR code scanner reads the raw data — if special characters are not encoded, the scanned URL may break. Always test QR codes by scanning them yourself before printing.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free URL Encoder/Decoder handles this instantly — no signup, no limits.</p>
        <Link href="/tools/url-encoder" style={s.cta}>Open URL Encoder →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/qr-code-generator" style={{ color: "#0D9488" }}>QR Code Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
