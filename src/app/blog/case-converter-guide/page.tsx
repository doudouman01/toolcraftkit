import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter: How to Change Text to Uppercase, Lowercase or Title Case",
  description: "Instantly convert text between uppercase, lowercase, title case, and sentence case. Free online tool for writers, marketers, and developers.",
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
        <h1 style={s.h1}>Case Converter: How to Change Text to Uppercase, Lowercase or Title Case</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Text case matters more than most people realize. An email subject line in ALL CAPS looks like spam. A headline in lowercase looks unprofessional. Product titles with inconsistent capitalization confuse customers. A case converter tool handles these formatting issues instantly, saving you from retyping entire blocks of text.</p>

        <h2 style={s.h2}>Types of Text Case</h2>
        <p style={s.p}><strong>UPPERCASE</strong> — every letter is capitalized. Used for acronyms, legal notices, and emphasis. Use sparingly — all-caps text is harder to read and can feel aggressive in casual contexts.</p>
        <p style={s.p}><strong>lowercase</strong> — every letter is small. Used in programming, URLs, and casual communication. Some brands use lowercase intentionally for a modern, approachable feel.</p>
        <p style={s.p}><strong>Title Case</strong> — the first letter of each major word is capitalized. Used for headlines, book titles, and article titles. Minor words like &quot;and,&quot; &quot;the,&quot; and &quot;in&quot; typically stay lowercase unless they start the title.</p>
        <p style={s.p}><strong>Sentence case</strong> — only the first letter of the sentence is capitalized. Used for body text, descriptions, and most general writing. This is the most natural and readable case for paragraphs.</p>

        <h2 style={s.h2}>When to Use Each Case</h2>
        <p style={s.p}><strong>Blog post headlines</strong> — title case is the standard for English headlines. &quot;How to Build a Better Website&quot; looks more professional than &quot;How to build a better website.&quot;</p>
        <p style={s.p}><strong>Email subject lines</strong> — sentence case works best. &quot;Your order has shipped&quot; reads naturally. &quot;YOUR ORDER HAS SHIPPED&quot; reads like a warning.</p>
        <p style={s.p}><strong>Product listings</strong> — title case for product names ensures consistency across a catalog. Inconsistent capitalization makes a store look disorganized.</p>
        <p style={s.p}><strong>Data cleanup</strong> — when you receive data with mixed or inconsistent capitalization, converting everything to a uniform case is the first step in cleaning it up.</p>

        <h2 style={s.h2}>Common Problems Solved</h2>
        <p style={s.p}>You accidentally typed a paragraph with Caps Lock on. Instead of retyping it, paste it into a case converter and switch to sentence case in one click.</p>
        <p style={s.p}>You have a spreadsheet of product names with random capitalization. Convert them all to title case for a clean, professional catalog.</p>
        <p style={s.p}>You need to normalize a list of email addresses or usernames to lowercase before importing them into a system that is case-sensitive.</p>

        <h2 style={s.h2}>Convert Your Text Now</h2>
        <p style={s.p}>Our free Case Converter instantly transforms text between uppercase, lowercase, title case, and sentence case. Paste, click, copy — done.</p>
        <Link href="/tools/case-converter" style={s.cta}>Open Case Converter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need to clean duplicate entries after normalizing case? Our <Link href="/tools/remove-duplicate-lines" style={{ color: "#0D9488" }}>Remove Duplicates</Link> tool strips repeated lines instantly.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
