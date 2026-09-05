import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Make a WiFi QR Code (So Guests Connect Instantly)",
  description: "Create a QR code that connects guests to your WiFi automatically. No more spelling out passwords. Works for homes, offices, and businesses.",
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
        <h1 style={s.h1}>How to Make a WiFi QR Code (So Guests Connect Instantly)</h1>
        <p style={s.meta}>September 5, 2026 · 3 min read</p>

        <p style={s.p}>Sharing your WiFi password is one of those small friction points that QR codes solve perfectly. Instead of spelling out a complex password or writing it on a sticky note, your guests scan a code and connect automatically. It takes 30 seconds to set up and works forever.</p>

        <h2 style={s.h2}>What You Need</h2>
        <p style={s.p}>Your WiFi network name (SSID) — exactly as it appears on your router. Your WiFi password. Your encryption type — almost always WPA2 or WPA3 for modern networks. Open a QR code generator, select WiFi mode, enter these three pieces of information, and download the code.</p>

        <h2 style={s.h2}>Where to Place the Code</h2>
        <p style={s.p}>Print and frame it near your front door or living room for home use. Place it on each table for restaurant or cafe WiFi. Post it in the lobby or reception area for offices. Stick it on the inside of hotel room doors. Include it on check-in information sheets for vacation rentals.</p>

        <h2 style={s.h2}>Security Considerations</h2>
        <p style={s.p}>A WiFi QR code contains your password in encoded form — anyone who scans it can connect. This is fine for guest networks but not ideal for your primary network with sensitive devices. Consider setting up a separate guest network with a different password specifically for QR code sharing.</p>

        <h2 style={s.h2}>Updating the Code</h2>
        <p style={s.p}>If you change your WiFi password, you need to generate a new QR code. For businesses that change passwords regularly, consider printing QR codes on replaceable cards rather than permanent signage. For homes, most people change WiFi passwords rarely enough that a framed code lasts for years.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free QR Code Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/qr-code" style={s.cta}>Open QR Code Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/password-generator" style={{ color: "#0D9488" }}>Password Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
