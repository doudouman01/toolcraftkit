import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create a vCard QR Code for Your Business Card",
  description: "Put your contact information in a QR code. Recipients scan it to save your name, phone, email, and website to their phone instantly.",
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
        <h1 style={s.h1}>How to Create a vCard QR Code for Your Business Card</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Business cards are exchanged, stacked in a drawer, and forgotten. A QR code on your business card changes this — the recipient scans it and your contact information is saved directly to their phone. No typing, no lost cards, no forgotten names. The connection is instant and permanent.</p>

        <h2 style={s.h2}>What Is a vCard QR Code</h2>
        <p style={s.p}>A vCard is a digital contact card format. When encoded in a QR code, scanning it triggers the phone to create a new contact with all your information pre-filled: name, phone, email, company, title, website, and physical address. The recipient just taps Save and you are in their phone.</p>

        <h2 style={s.h2}>What to Include</h2>
        <p style={s.p}>At minimum: your name, phone number, and email. Recommended additions: company name, job title, website URL, and LinkedIn profile. Optional: physical address, secondary phone number, and a brief note. Keep it focused — too many fields make the contact card cluttered and the QR code harder to scan.</p>

        <h2 style={s.h2}>Design and Placement</h2>
        <p style={s.p}>Place the QR code prominently on your business card — it should be easy to find and large enough to scan (minimum 2cm square). Position it on the back of the card if the front is crowded. Add a subtle label like Scan to Save Contact so people know what it does. Match the QR code style to your card design.</p>

        <h2 style={s.h2}>Testing</h2>
        <p style={s.p}>Always test your vCard QR code before printing cards. Scan it with multiple phones — iPhone and Android handle vCards slightly differently. Verify that all fields display correctly and that the contact saves properly. Print a test batch before ordering 500 cards.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free QR Code Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/qr-code" style={s.cta}>Open QR Code Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/invoice-generator" style={{ color: "#0D9488" }}>Invoice Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
