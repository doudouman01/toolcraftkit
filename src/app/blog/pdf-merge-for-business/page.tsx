import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Merge Business Documents into One Professional PDF",
  description: "Combine proposals, contracts, appendices, and cover pages into a single polished PDF. Best practices for professional document assembly.",
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
        <h1 style={s.h1}>How to Merge Business Documents into One Professional PDF</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Sending a client five separate documents — proposal, pricing sheet, terms and conditions, case study, and team bios — looks disorganized. Merging them into one polished PDF with a logical flow transforms scattered files into a professional package that wins business.</p>

        <h2 style={s.h2}>Document Assembly for Proposals</h2>
        <p style={s.p}>A winning proposal package follows a logical order: cover page, executive summary, detailed proposal, pricing/scope, timeline, team qualifications, case studies, and terms and conditions. Merging these into a single PDF with consistent formatting shows professionalism and makes it easy for the client to review and share internally.</p>

        <h2 style={s.h2}>Contract Packages</h2>
        <p style={s.p}>Legal documents often require multiple components: the main agreement, schedules and appendices, exhibits (floor plans, specifications), and signature pages. A single merged PDF ensures nothing gets separated or lost. It also simplifies version control — one document with one filename is easier to track than seven.</p>

        <h2 style={s.h2}>Best Practices for Merged PDFs</h2>
        <p style={s.p}>Check page orientation before merging — a landscape spreadsheet in the middle of portrait pages is fine, but sideways portrait pages look sloppy. Ensure consistent margins and headers if possible. Verify that the final document opens to the first page. Keep the merged file under 25 MB for email compatibility.</p>

        <h2 style={s.h2}>Naming Conventions</h2>
        <p style={s.p}>Name your merged documents clearly: CompanyName-Proposal-ProjectName-2026-09.pdf is better than merged.pdf. Include the version number if revisions are expected. A clear filename prevents confusion when the document lands in the client's downloads folder alongside dozens of other files.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free PDF Merge handles this instantly — no signup, no limits.</p>
        <Link href="/tools/pdf-merge" style={s.cta}>Open PDF Merge →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-to-pdf" style={{ color: "#0D9488" }}>Image to PDF</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
