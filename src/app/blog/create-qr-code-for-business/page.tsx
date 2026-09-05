import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create a QR Code for Your Business (Free & Custom)",
  description: "Learn how to create QR codes for your website, WiFi, payments, and marketing materials. Free online generator with customization options.",
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
        <h1 style={s.h1}>How to Create a QR Code for Your Business (Free & Custom)</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>QR codes have become essential for businesses of all sizes. From restaurant menus to business cards, from payment links to WiFi access, QR codes bridge the physical and digital worlds instantly. Creating one takes seconds — and with the right tool, it costs nothing.</p>

        <h2 style={s.h2}>What Can You Put in a QR Code?</h2>
        <p style={s.p}><strong>Website URL</strong> — the most common use. Link directly to your homepage, a landing page, a product page, or a booking form. Customers scan and arrive exactly where you want them.</p>
        <p style={s.p}><strong>WiFi credentials</strong> — let customers or guests connect to your WiFi network by scanning a code. No more spelling out long passwords — they scan, connect, and they are online.</p>
        <p style={s.p}><strong>Contact information (vCard)</strong> — encode your name, phone, email, and address into a QR code. When someone scans it, your contact details are added to their phone automatically.</p>
        <p style={s.p}><strong>Payment links</strong> — direct customers to a payment page, Venmo, PayPal, or any other payment platform. Perfect for small businesses, market vendors, and service professionals.</p>
        <p style={s.p}><strong>Plain text or message</strong> — share a coupon code, a welcome message, event details, or any text-based information.</p>

        <h2 style={s.h2}>How to Create a QR Code</h2>
        <p style={s.p}><strong>Step 1</strong> — Decide what the QR code should link to. Have the URL, WiFi password, or contact information ready.</p>
        <p style={s.p}><strong>Step 2</strong> — Open a QR code generator and enter your content. The code is generated instantly.</p>
        <p style={s.p}><strong>Step 3</strong> — Download the QR code as an image file. Use PNG for digital displays or print materials.</p>
        <p style={s.p}><strong>Step 4</strong> — Test the code by scanning it with your phone before printing or sharing. Make sure it leads to the correct destination.</p>

        <h2 style={s.h2}>Where to Use QR Codes</h2>
        <p style={s.p}><strong>Business cards</strong> — add a QR code that links to your website or LinkedIn profile. It saves the recipient from typing your URL manually.</p>
        <p style={s.p}><strong>Restaurant tables</strong> — replace paper menus with a QR code that links to a digital menu. Easier to update and more hygienic.</p>
        <p style={s.p}><strong>Product packaging</strong> — link to setup instructions, warranty registration, or related products.</p>
        <p style={s.p}><strong>Event marketing</strong> — put QR codes on posters, flyers, and tickets that link to event details, registration pages, or maps.</p>
        <p style={s.p}><strong>Storefront windows</strong> — even when your store is closed, a QR code on the window can direct passersby to your website or online store.</p>

        <h2 style={s.h2}>Tips for Effective QR Codes</h2>
        <p style={s.p}>Always test before printing. A QR code that does not scan is worse than no QR code at all. Print at a minimum size of 2 x 2 cm for reliable scanning. Ensure there is enough contrast between the code and its background. Add a brief call to action near the code — &quot;Scan for menu&quot; or &quot;Scan to connect to WiFi&quot; tells people what to expect.</p>

        <h2 style={s.h2}>Create Your QR Code Now</h2>
        <p style={s.p}>Our free QR Code Generator creates custom codes for URLs, WiFi, text, and more. Generate, download, and use — no account required.</p>
        <Link href="/tools/qr-code" style={s.cta}>Open QR Code Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Running a business? Our <Link href="/tools/invoice-generator" style={{ color: "#0D9488" }}>Invoice Generator</Link> creates professional invoices in seconds.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
