import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Compress PDF Files: Reduce Size Without Losing Quality",
  description: "Reduce PDF file sizes for email, upload portals, and storage. Methods that work without degrading document quality.",
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
        <h1 style={s.h1}>How to Compress PDF Files: Reduce Size Without Losing Quality</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>A PDF that is too large to email, too slow to upload, or too big for a submission portal is a common frustration. Large PDFs are almost always caused by embedded images. Understanding why PDFs get large and how to reduce their size without losing quality saves time and prevents submission failures.</p>

        <h2 style={s.h2}>Why PDFs Get Large</h2>
        <p style={s.p}>High-resolution images are the number one cause. A PDF created from uncompressed photos can easily reach 50-100 MB. Embedded fonts add 100-500 KB each. Embedded videos or multimedia (rare but heavy). Multiple layers or hidden content from design tools. Redundant data from poor export settings.</p>

        <h2 style={s.h2}>The Image-First Approach</h2>
        <p style={s.p}>Compress your source images before creating the PDF. If you have already created a large PDF, extract the images, compress them, and regenerate the document. Our Image Compressor can reduce photos by 50-80% without visible quality loss. This single step often reduces a 20 MB PDF to under 5 MB.</p>

        <h2 style={s.h2}>Compression Methods</h2>
        <p style={s.p}>Online PDF compressors reduce file size by downsampling images and removing redundant data. Most offer quality settings: low (smallest file, some quality loss), medium (good balance), and high (minimal quality loss). For documents that will be printed, use high. For documents viewed only on screen, medium is sufficient.</p>

        <h2 style={s.h2}>Email and Upload Limits</h2>
        <p style={s.p}>Gmail: 25 MB attachment limit. Outlook: 20 MB. Most submission portals: 10-50 MB. If your PDF exceeds the limit after compression, consider splitting it into multiple parts using PDF tools. For very large files, use file sharing services (Google Drive, Dropbox) and send a link instead of an attachment.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Image Compressor handles this instantly — no signup, no limits.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF Merge</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
