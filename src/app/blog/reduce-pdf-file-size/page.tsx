import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5 Ways to Reduce PDF File Size Without Losing Quality",
  description: "Discover five practical methods to shrink your PDF files while keeping text sharp and images clear. Includes free tools and expert tips.",
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
        <h1 style={s.h1}>5 Ways to Reduce PDF File Size Without Losing Quality</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Large PDF files cause real problems. Email providers reject attachments over 25 MB. Cloud portals impose upload limits. Clients on mobile connections cannot download heavy documents. The good news is that reducing PDF file size is straightforward once you understand what makes the file large in the first place.</p>

        <h2 style={s.h2}>What Makes PDFs Large?</h2>
        <p style={s.p}>The number one culprit is embedded images. When you export a document from Word or Google Docs, images are often embedded at their original resolution. A single smartphone photo can be 8 MB — put three in a document and your PDF is already 24 MB before any text is added.</p>
        <p style={s.p}>Other contributors include embedded fonts (each font can add 50-500 KB), metadata like author information and revision history, form fields and JavaScript, and duplicate resources where the same image appears multiple times.</p>

        <h2 style={s.h2}>Method 1: Compress the PDF Directly</h2>
        <p style={s.p}>The fastest approach is using a dedicated PDF compression tool. These tools optimize embedded images, remove redundant data structures, and strip unnecessary metadata — all without visible quality loss. For most documents, direct compression reduces file size by 40 to 70 percent.</p>

        <h2 style={s.h2}>Method 2: Optimize Source Images First</h2>
        <p style={s.p}>Before creating your PDF, resize and compress the images it will contain. A 4000x3000 photo displayed at 800x600 in the document wastes enormous space. Match image resolution to actual display size using our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link>, then compress with our <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>Image Compressor</Link>. This prevents the problem rather than treating it after the fact.</p>

        <h2 style={s.h2}>Method 3: Remove Unnecessary Pages</h2>
        <p style={s.p}>Many PDFs contain blank pages, draft sections, cover sheets from other documents, or appendices that are not needed in the final version. Removing even a few image-heavy pages can cut file size significantly.</p>

        <h2 style={s.h2}>Method 4: Strip Metadata</h2>
        <p style={s.p}>PDF files carry hidden data: author information, creation tools, revision history, and editing software data. Removing this metadata typically saves 50 to 500 KB per document. It also improves privacy by removing information about who created the document and what software was used.</p>

        <h2 style={s.h2}>Method 5: Use the Right Export Settings</h2>
        <p style={s.p}>When creating PDFs from Word, Google Docs, or design tools, check the export quality settings. Most applications offer a web-optimized or reduced-size option that produces smaller files without visible quality loss. Choosing &quot;Standard&quot; instead of &quot;High Quality&quot; can reduce file size by 50 percent or more.</p>

        <h2 style={s.h2}>When to Use Each Method</h2>
        <p style={s.p}>For a quick fix on an existing PDF, direct compression is your best option. For recurring documents like monthly reports, optimizing source images and export settings prevents the problem from happening. For one-time cleanup of large archives, combine all five methods for maximum reduction.</p>

        <h2 style={s.h2}>Start Reducing Your PDFs</h2>
        <p style={s.p}>Use our free Image Compressor to optimize images before creating PDFs, and our PDF Merge tool to combine only the pages you actually need into a lean final document.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Open Image Compressor →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need to combine only specific pages? Our <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF Merge</Link> tool lets you build a clean, minimal PDF from multiple sources.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
