import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essential Keyboard Shortcuts That Save Hours Every Week",
  description: "Master the keyboard shortcuts that actually matter. Copy, paste, undo, and navigation shortcuts for Windows, Mac, and web browsers.",
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
        <h1 style={s.h1}>Essential Keyboard Shortcuts That Save Hours Every Week</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>The difference between a slow computer user and a fast one is not typing speed — it is keyboard shortcuts. Moving your hand to the mouse, clicking a menu, finding an option, and clicking again takes 3-5 seconds. A keyboard shortcut takes 0.5 seconds. Over a full workday, shortcut users save 30-60 minutes.</p>

        <h2 style={s.h2}>Universal Shortcuts</h2>
        <p style={s.p}>Ctrl+C / Cmd+C: Copy. Ctrl+V / Cmd+V: Paste. Ctrl+Z / Cmd+Z: Undo. Ctrl+A / Cmd+A: Select all. Ctrl+F / Cmd+F: Find. Ctrl+S / Cmd+S: Save. Ctrl+P / Cmd+P: Print. These work in virtually every application on every operating system. If you only learn 7 shortcuts, learn these.</p>

        <h2 style={s.h2}>Text Editing Shortcuts</h2>
        <p style={s.p}>Ctrl+B / Cmd+B: Bold. Ctrl+I / Cmd+I: Italic. Ctrl+Shift+V / Cmd+Shift+V: Paste without formatting (incredibly useful for copying from websites into documents). Home/End: Jump to start/end of line. Ctrl+Home / Cmd+Up: Jump to start of document. Shift+Click: Select everything between cursor and click position.</p>

        <h2 style={s.h2}>Browser Shortcuts</h2>
        <p style={s.p}>Ctrl+T / Cmd+T: New tab. Ctrl+W / Cmd+W: Close tab. Ctrl+Shift+T / Cmd+Shift+T: Reopen closed tab (a lifesaver). Ctrl+L / Cmd+L: Select the URL bar. Ctrl+Tab: Switch to next tab. Ctrl+Shift+Tab: Switch to previous tab. F5 / Cmd+R: Refresh page.</p>

        <h2 style={s.h2}>Building the Habit</h2>
        <p style={s.p}>Do not try to learn all shortcuts at once. Pick 2-3 that replace your most frequent mouse actions and use them exclusively for one week. Once they become automatic, add 2-3 more. Within a month, you will navigate your computer dramatically faster. The shortcuts that save the most time are the ones that replace your most repeated actions.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Word Counter handles this instantly — no signup, no limits.</p>
        <Link href="/tools/word-counter" style={s.cta}>Open Word Counter →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/text-case-converter" style={{ color: "#0D9488" }}>Case Converter</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
