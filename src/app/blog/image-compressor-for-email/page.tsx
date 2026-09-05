import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Compress Images for Email: Avoid Bounced Messages & Slow Loading",
  description: "Reduce image file sizes for email newsletters, attachments, and signatures. Avoid size limits and ensure fast loading in all email clients.",
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
        <h1 style={s.h1}>How to Compress Images for Email: Avoid Bounced Messages & Slow Loading</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Email providers impose strict size limits. Gmail caps attachments at 25 MB. Outlook limits messages to 20 MB. Images embedded in HTML emails add to the total message size — and oversized emails either bounce, land in spam, or load so slowly that recipients never see your content.</p>

        <h2 style={s.h2}>Email Attachment Limits</h2>
        <p style={s.p}>Gmail: 25 MB total attachment size. Outlook: 20 MB. Yahoo: 25 MB. Most corporate email servers: 10-15 MB. When sending multiple images, the total of all attachments must stay under the limit. A single uncompressed smartphone photo can be 5-12 MB, so compressing before attaching is essential.</p>

        <h2 style={s.h2}>Images in HTML Emails</h2>
        <p style={s.p}>Newsletter images should be under 100 KB each and no wider than 600-800 pixels (the standard email width). Total email size including all images should stay under 102 KB for optimal deliverability — Gmail clips messages larger than this, hiding content behind a View entire message link.</p>

        <h2 style={s.h2}>Email Signature Images</h2>
        <p style={s.p}>Your email signature image should be under 10 KB and no larger than 300px wide. A heavy signature image loads slowly on every email you send, looks unprofessional, and adds up when included in long email threads. Compress your logo to the smallest acceptable quality.</p>

        <h2 style={s.h2}>Best Practices</h2>
        <p style={s.p}>Always resize images to the actual display size before compressing. A 4000px image displayed at 600px wastes bandwidth even after compression. For attachments, consider converting to PDF first — our Image to PDF tool creates clean, professional documents from photos. For inline images, use JPEG at 70-80% quality.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image Compressor handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-to-pdf" style={{ color: "#0D9488" }}>Image to PDF</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
