import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Menus for Restaurants: Complete Setup Guide",
  description: "Set up QR code menus for your restaurant. Design, placement, and best practices for touchless dining. Free QR code generator.",
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
        <h1 style={s.h1}>QR Code Menus for Restaurants: Complete Setup Guide</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>QR code menus became mainstream during the pandemic and they are here to stay. They reduce printing costs, allow instant menu updates, improve hygiene, and provide a modern dining experience. Setting them up correctly makes the difference between a smooth customer experience and frustrated diners struggling with tiny, slow-loading pages.</p>

        <h2 style={s.h2}>Creating Your Digital Menu</h2>
        <p style={s.p}>Host your menu as a mobile-optimized web page — not a PDF. PDFs are slow to load, hard to navigate on phones, and difficult to update. A simple web page with categories, descriptions, and prices loads instantly and works on every device. If you change prices or add specials, update the page and the QR code stays the same.</p>

        <h2 style={s.h2}>QR Code Placement</h2>
        <p style={s.p}>Place codes on every table — table tents, stickers, or built into the table surface. Add them at the entrance for take-out customers. Include them on receipts linking to your online ordering page. Each location should have its own QR code if you want to track which tables scan most. Print at minimum 2x2 inches (5x5 cm) for reliable scanning.</p>

        <h2 style={s.h2}>Design Best Practices</h2>
        <p style={s.p}>Keep the menu page simple and fast-loading. Large images slow down mobile loading — use compressed thumbnails or text-only menus. Organize by category with clear headings. Include allergen and dietary information. Add a prominent Order or Call Server button if you support digital ordering.</p>

        <h2 style={s.h2}>Common Mistakes</h2>
        <p style={s.p}>Linking to a PDF that takes 10 seconds to load on mobile. Using a shortened URL that expires (always use your own domain). Placing QR codes where lighting is poor or where they get wet and damaged. Not testing the codes after printing — always scan before deploying. Forgetting to update the linked page when the menu changes.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free QR Code Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/qr-code-generator" style={s.cta}>Open QR Code Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>Image Compressor</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
