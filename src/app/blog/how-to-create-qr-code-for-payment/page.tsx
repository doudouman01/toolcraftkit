import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create a QR Code for Mobile Payments and Invoices",
  description: "Set up payment QR codes for your business. Accept Venmo, PayPal, Cash App, and bank transfers via scannable codes.",
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
        <h1 style={s.h1}>How to Create a QR Code for Mobile Payments and Invoices</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Payment QR codes let customers pay you instantly by scanning their phone. No card reader needed, no cash handling, no complicated payment terminal. Whether you run a small shop, a service business, or a side hustle, payment QR codes reduce friction between the moment someone decides to pay and the moment the money moves.</p>

        <h2 style={s.h2}>Payment Platform QR Codes</h2>
        <p style={s.p}>Most payment platforms generate their own QR codes. Venmo: Settings > Show My QR Code. PayPal: open the app > Scan/Pay > My Code. Cash App: tap your profile icon for your $Cashtag QR code. Each platform generates a code that opens the payment flow directly in the payer's app.</p>

        <h2 style={s.h2}>Custom Payment Links</h2>
        <p style={s.p}>Create a QR code from your payment URL. PayPal: paypal.me/yourusername. Venmo: venmo.com/yourusername. Stripe: create a payment link in your dashboard. Square: generate an invoice link. Any payment URL can become a QR code using our generator — the customer scans, the link opens, they pay.</p>

        <h2 style={s.h2}>Where to Display Payment QR Codes</h2>
        <p style={s.p}>At the point of sale: next to the register or on the counter. On invoices: add a QR code linking to the online payment page. In emails: embed the code so clients can scan from their phone while reading on their computer. At markets and events: display on your booth signage or price tags.</p>

        <h2 style={s.h2}>Best Practices</h2>
        <p style={s.p}>Test every payment QR code before deploying it. Include a label (Scan to Pay with Venmo) so customers know what to expect. Offer multiple payment options if your customers use different platforms. For fixed-price items, include the amount in the payment link when possible. Keep printed QR codes large enough to scan easily (minimum 2x2 inches).</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free QR Code Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/qr-code" style={s.cta}>Open QR Code Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/invoice-generator" style={{ color: "#0D9488" }}>Invoice Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
