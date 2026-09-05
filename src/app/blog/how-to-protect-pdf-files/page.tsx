import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Protect PDF Files: Passwords, Permissions & Watermarks",
  description: "Learn how to secure PDF documents with passwords, restrict editing and printing, and add watermarks. Essential for business and legal documents.",
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
        <h1 style={s.h1}>How to Protect PDF Files: Passwords, Permissions & Watermarks</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Not every PDF should be freely editable, printable, or shareable. Business proposals, contracts, financial documents, and creative work often need protection. Understanding the different levels of PDF security helps you choose the right protection for each situation.</p>

        <h2 style={s.h2}>Password Protection</h2>
        <p style={s.p}>PDF password protection comes in two levels. An open password prevents anyone without the password from viewing the document at all. A permissions password allows viewing but restricts actions like editing, printing, and copying text. Use open passwords for confidential documents. Use permissions passwords for documents you want people to read but not modify.</p>

        <h2 style={s.h2}>Permission Restrictions</h2>
        <p style={s.p}>You can restrict specific actions: printing (none, low quality, or high quality), editing content, copying text, adding comments, filling form fields, and assembling pages. For a contract, you might allow printing but prevent editing. For a price list, you might allow viewing but prevent copying prices to a spreadsheet.</p>

        <h2 style={s.h2}>Watermarks</h2>
        <p style={s.p}>Watermarks overlay text or images across every page — Draft, Confidential, Company Name. They discourage unauthorized sharing without preventing legitimate use. Digital watermarks can be visible or invisible (embedded in the document metadata for tracking). Use visible watermarks for draft documents and confidential materials.</p>

        <h2 style={s.h2}>Practical Security Tips</h2>
        <p style={s.p}>Use a strong, unique password for each protected document — our Password Generator creates secure passwords instantly. Share passwords through a separate channel (text the password, email the document). Remember that PDF password protection can be removed with specialized tools — it deters casual access but does not guarantee absolute security for determined adversaries.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free PDF Merge handles this instantly — no signup, no limits.</p>
        <Link href="/tools/pdf-merge" style={s.cta}>Open PDF Merge →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/password-generator" style={{ color: "#0D9488" }}>Password Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
