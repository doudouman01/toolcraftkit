import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex for Beginners: How to Test Regular Expressions Online",
  description: "Learn the basics of regular expressions with practical examples. Test your regex patterns instantly with a free online tester — no installation needed.",
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
        <h1 style={s.h1}>Regex for Beginners: How to Test Regular Expressions Online</h1>
        <p style={s.meta}>September 5, 2026 · 6 min read</p>

        <p style={s.p}>Regular expressions — regex for short — are one of the most powerful and most intimidating tools in programming. They let you search, match, and manipulate text using patterns instead of exact strings. Once you understand the basics, regex saves enormous time on tasks like data validation, text extraction, and find-and-replace operations.</p>

        <h2 style={s.h2}>What Is a Regular Expression?</h2>
        <p style={s.p}>A regular expression is a pattern that describes a set of strings. Instead of searching for the exact word &quot;cat,&quot; you could write a regex that matches any three-letter word ending in &quot;at&quot; — catching &quot;bat,&quot; &quot;hat,&quot; &quot;mat,&quot; and &quot;cat&quot; all at once. This pattern-matching ability makes regex indispensable for developers, data analysts, and anyone who works with text.</p>

        <h2 style={s.h2}>Essential Regex Patterns</h2>
        <p style={s.p}><strong>. (dot)</strong> — matches any single character. The pattern &quot;h.t&quot; matches &quot;hat,&quot; &quot;hit,&quot; &quot;hot,&quot; and &quot;hut.&quot;</p>
        <p style={s.p}><strong>* (star)</strong> — matches zero or more of the previous character. &quot;ab*c&quot; matches &quot;ac,&quot; &quot;abc,&quot; &quot;abbc,&quot; and &quot;abbbc.&quot;</p>
        <p style={s.p}><strong>+ (plus)</strong> — matches one or more of the previous character. &quot;ab+c&quot; matches &quot;abc&quot; and &quot;abbc&quot; but not &quot;ac.&quot;</p>
        <p style={s.p}><strong>\d</strong> — matches any digit (0-9). Useful for finding numbers in text.</p>
        <p style={s.p}><strong>\w</strong> — matches any word character (letters, digits, underscore). Perfect for extracting words or identifiers.</p>
        <p style={s.p}><strong>[abc]</strong> — matches any one of the characters inside the brackets. &quot;[aeiou]&quot; matches any vowel.</p>
        <p style={s.p}><strong>^</strong> and <strong>$</strong> — match the start and end of a line, respectively. &quot;^Hello&quot; matches lines that start with &quot;Hello.&quot;</p>

        <h2 style={s.h2}>Practical Examples</h2>
        <p style={s.p}><strong>Validate an email address:</strong> a basic email pattern is \S+@\S+\.\S+ — this matches any non-whitespace characters around an @ symbol and a dot. Not perfect for all edge cases, but catches most common formats.</p>
        <p style={s.p}><strong>Find phone numbers:</strong> \d&#123;3&#125;[-.\s]?\d&#123;3&#125;[-.\s]?\d&#123;4&#125; matches common US phone number formats like 555-123-4567, 555.123.4567, or 555 123 4567.</p>
        <p style={s.p}><strong>Extract URLs:</strong> https?://\S+ matches both http and https URLs in a block of text.</p>

        <h2 style={s.h2}>Why Use an Online Regex Tester?</h2>
        <p style={s.p}>Building regex patterns is trial and error. An online tester lets you write a pattern, paste test text, and immediately see which parts match. This visual feedback makes it dramatically easier to build and debug patterns compared to testing inside your code. You can experiment freely without recompiling or rerunning your program.</p>

        <h2 style={s.h2}>Test Your Regex Now</h2>
        <p style={s.p}>Our free Regex Tester shows matches in real time as you type your pattern. Paste your test text, write your regex, and see results instantly — no setup needed.</p>
        <Link href="/tools/regex-tester" style={s.cta}>Open Regex Tester →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Working with encoded data? Our <Link href="/tools/base64" style={{ color: "#0D9488" }}>Base64 Encoder/Decoder</Link> handles encoding and decoding in your browser.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
