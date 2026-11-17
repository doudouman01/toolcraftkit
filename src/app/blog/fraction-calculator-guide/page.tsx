import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fraction Calculator: How to Add, Subtract, Multiply & Divide",
  description: "Learn how to perform fraction operations step by step. Add, subtract, multiply, and divide fractions with our free fraction calculator and clear explanations.",
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
        <h1 style={s.h1}>Fraction Calculator: How to Add, Subtract, Multiply & Divide</h1>
        <p style={s.meta}>November 2026 · 5 min read</p>

        <p style={s.p}>Fractions show up everywhere — in cooking recipes, construction measurements, financial calculations, and of course math homework. While the rules for fraction arithmetic are straightforward, the steps can be tedious and error-prone when done by hand. Understanding the principles behind each operation helps you catch mistakes and use a fraction calculator more effectively.</p>

        <h2 style={s.h2}>Adding and Subtracting Fractions</h2>
        <p style={s.p}>The most common stumbling block with fractions is addition and subtraction, because you need a common denominator. To add 1/3 and 1/4, you first find the least common denominator (12 in this case), convert both fractions (4/12 and 3/12), and then add the numerators to get 7/12. Subtraction works the same way — find the common denominator, convert, and subtract numerators. The denominator stays the same. When the fractions already share a denominator, simply add or subtract the numerators directly.</p>

        <h2 style={s.h2}>Multiplying Fractions</h2>
        <p style={s.p}>Multiplication is actually the easiest fraction operation. Multiply the numerators together and the denominators together. That&apos;s it. For example, 2/3 times 3/5 equals 6/15, which simplifies to 2/5. No common denominator needed. The one tip that saves time: simplify before you multiply by canceling any common factors between a numerator and an opposite denominator. This keeps your numbers smaller and often eliminates the need to simplify the final answer.</p>

        <h2 style={s.h2}>Dividing Fractions</h2>
        <p style={s.p}>Division uses the &quot;flip and multiply&quot; rule. To divide by a fraction, you multiply by its reciprocal. So 3/4 divided by 2/5 becomes 3/4 times 5/2, which equals 15/8 or 1 and 7/8. This works because dividing by a number is the same as multiplying by its inverse. The reciprocal of a fraction is simply the fraction flipped — the numerator becomes the denominator and vice versa.</p>

        <h2 style={s.h2}>Mixed Numbers and Improper Fractions</h2>
        <p style={s.p}>Mixed numbers like 2 and 1/3 need to be converted to improper fractions before performing operations. Multiply the whole number by the denominator, add the numerator, and place the result over the original denominator. So 2 and 1/3 becomes 7/3. After completing your calculation, you can convert the result back to a mixed number by dividing the numerator by the denominator — the quotient is the whole number and the remainder becomes the new numerator.</p>

        <h2 style={s.h2}>Calculate Fractions Instantly</h2>
        <p style={s.p}>Our free <Link href="/tools/fraction-calculator" style={{ color: "#0D9488" }}>Fraction Calculator</Link> handles all four operations with proper fractions, improper fractions, and mixed numbers. It shows the step-by-step solution and automatically simplifies the result to its lowest terms.</p>
        <Link href="/tools/fraction-calculator" style={s.cta}>Open Fraction Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need help with other math? Try our <Link href="/tools/percentage-calculator" style={{ color: "#0D9488" }}>Percentage Calculator</Link> for quick percentage conversions, or our <Link href="/tools/gpa-calculator" style={{ color: "#0D9488" }}>GPA Calculator</Link> if you&apos;re working on academic planning.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
