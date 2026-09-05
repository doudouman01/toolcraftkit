import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Number Generator for Games, Raffles & Classroom Activities",
  description: "Generate truly random numbers for board games, giveaways, classroom picks, and decision making. Free online dice roller and number picker.",
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
        <h1 style={s.h1}>Random Number Generator for Games, Raffles & Classroom Activities</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Need to pick a random winner? Roll dice without dice? Choose a random student to answer a question? Select a random team assignment? A random number generator handles all of these fairly and transparently — no one can accuse you of bias when a computer picks the number.</p>

        <h2 style={s.h2}>Raffles and Giveaways</h2>
        <p style={s.p}>Assign each participant a number and generate a random number in that range. For transparency, show the generator on screen so everyone sees the selection happen live. For multiple winners, generate numbers one at a time and exclude previous winners. This is fairer than drawing from a hat because every entry has exactly equal probability.</p>

        <h2 style={s.h2}>Board Games and RPGs</h2>
        <p style={s.p}>Roll any combination of dice: d4, d6, d8, d10, d12, d20, or custom. Generate multiple dice rolls at once for complex RPG actions. A digital roller is faster than physical dice and eliminates the rolled off the table problem. Some groups prefer physical dice for the tactile experience — use digital as backup.</p>

        <h2 style={s.h2}>Classroom and Training</h2>
        <p style={s.p}>Random student selection for questions ensures everyone participates, not just the eager volunteers. Random group assignment prevents cliques and ensures mixing. Random order for presentations eliminates the advantage of going first or last. Students accept random selection as fair in a way they might not accept teacher selection.</p>

        <h2 style={s.h2}>Decision Making</h2>
        <p style={s.p}>Sometimes you just need to break a deadlock. Assign numbers to your options, generate a random number, and go with it. This works surprisingly well for low-stakes decisions where analysis paralysis is the real problem — what to eat for dinner, which movie to watch, which task to tackle first.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Random Number Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/random-number" style={s.cta}>Open Random Number Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/qr-code" style={{ color: "#0D9488" }}>QR Code Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
