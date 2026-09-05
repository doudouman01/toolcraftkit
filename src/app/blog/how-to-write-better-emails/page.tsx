import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Write Better Emails: Subject Lines, Length & Formatting",
  description: "Write emails that get read, understood, and acted upon. Subject line formulas, optimal length, formatting tips, and common mistakes.",
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
        <h1 style={s.h1}>How to Write Better Emails: Subject Lines, Length & Formatting</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>The average professional receives 121 emails per day. Most are skimmed in under 10 seconds. Your email competes with 120 others for attention. The subject line determines if it gets opened. The first sentence determines if it gets read. The formatting determines if the key information is found. Every element must earn its place.</p>

        <h2 style={s.h2}>Subject Lines That Get Opened</h2>
        <p style={s.p}>Keep subject lines under 50 characters (mobile truncates at about 35). Be specific: Meeting rescheduled to 3pm Thursday outperforms Quick update. Include the action needed: Review needed: Q3 budget by Friday. Avoid all caps, excessive punctuation, and spam-trigger words. The subject line is a promise — the email must deliver on it.</p>

        <h2 style={s.h2}>Email Length</h2>
        <p style={s.p}>For requests and updates: 50-125 words. For detailed explanations: 200-300 words maximum. If you need more, attach a document or schedule a call. Long emails do not get read — they get saved for later, which usually means never. Use our Word Counter to check before sending.</p>

        <h2 style={s.h2}>Formatting for Scanning</h2>
        <p style={s.p}>Put the most important information in the first sentence — what do you need and by when? Use bold for key items: the deadline, the decision, the dollar amount. Use bullet points for lists of 3+ items. One idea per paragraph. White space between sections makes scanning easier.</p>

        <h2 style={s.h2}>Common Mistakes</h2>
        <p style={s.p}>Burying the ask at the bottom of a long email. Using reply all when only one person needs to see your response. Writing emails that require a phone call to clarify — if it is that complex, make the call first. Forgetting attachments (mention them in the body so you remember). Starting with 'I hope this email finds you well' adds no value — get to the point.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Character Counter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/character-counter" style={s.cta}>Open Character Counter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>Word Counter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
