import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Disclosure Generator: Create Compliant Statements for SB 574 & EU AI Act | ToolCraftKit",
  description:
    "Generate AI disclosure statements that meet California SB 574, EU AI Act, and university requirements. Free, instant, no signup.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    ul: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14, paddingLeft: 24 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>
          ← Back to Blog
        </Link>

        <h1 style={s.h1}>AI Disclosure Generator: Create Compliant Statements for California SB 574 &amp; the EU AI Act</h1>
        <p style={s.meta}>November 25, 2026 · 8 min read</p>

        <p style={s.p}>
          As of January 1, 2027, California&apos;s <strong>Senate Bill 574</strong> requires attorneys and arbitrators to disclose when AI tools were used in preparing court filings. The EU AI Act mandates transparency labels for AI-generated content across all member states. Universities are updating their academic integrity policies to require AI disclosure in student submissions. If you use AI for professional work, disclosure is no longer optional — it is a legal and ethical obligation.
        </p>
        <p style={s.p}>
          The problem is not willingness to disclose. The problem is knowing <em>what</em> to say and <em>how</em> to format it. A poorly written AI disclosure can be worse than none at all — it can imply you relied on AI more than you did, or fail to meet the specific requirements of the jurisdiction you are filing in. An <strong>AI disclosure generator</strong> solves this by producing properly formatted statements tailored to your document type and regulatory context.
        </p>

        <h2 style={s.h2}>Why AI Disclosure Is Now Required</h2>
        <p style={s.p}>
          Three regulatory forces have converged to make AI disclosure mandatory for a growing number of professionals:
        </p>
        <ul style={s.ul}>
          <li><strong>California SB 574 (effective January 1, 2027):</strong> Attorneys must verify AI outputs and disclose AI assistance in court documents. Arbitrators cannot delegate decision-making to AI systems. Violations can result in sanctions, malpractice liability, or disciplinary action.</li>
          <li><strong>EU AI Act (phased implementation 2024-2027):</strong> Systems classified as &quot;limited risk&quot; — including chatbots and content generators — must inform users that they are interacting with AI. AI-generated content must be labeled.</li>
          <li><strong>Academic and professional standards:</strong> Major universities, bar associations, medical journals, and accounting bodies have adopted policies requiring disclosure of AI use in work products.</li>
        </ul>
        <p style={s.p}>
          The common thread: transparency. Every framework is built on the principle that the people reading your work — judges, clients, professors, colleagues — have a right to know when and how AI contributed to it.
        </p>

        <h2 style={s.h2}>What a Good AI Disclosure Statement Includes</h2>
        <p style={s.p}>
          A compliant disclosure is not just &quot;I used ChatGPT.&quot; It needs to answer four questions:
        </p>
        <ul style={s.ul}>
          <li><strong>Which AI tools were used?</strong> Name the specific platform — ChatGPT (GPT-6), Claude (Opus 5.5), Gemini, Copilot, or others.</li>
          <li><strong>What was the AI used for?</strong> Drafting, research, editing, translation, data analysis, code generation — be specific about the nature of assistance.</li>
          <li><strong>What did the human do?</strong> Describe the verification, review, and editing process you applied to the AI output. This is critical for legal filings.</li>
          <li><strong>Who is responsible?</strong> Confirm that the author takes full responsibility for the accuracy and content of the final work product.</li>
        </ul>
        <p style={s.p}>
          The specificity matters. &quot;AI was used in preparing this document&quot; is technically a disclosure, but it is vague enough to be useless — and vague enough to draw scrutiny from a judge or reviewer who wants to understand exactly what happened.
        </p>

        <h2 style={s.h2}>Disclosure Templates by Document Type</h2>
        <p style={s.p}>
          Different contexts require different levels of detail:
        </p>
        <p style={s.p}>
          <strong>Court filings (SB 574 compliant):</strong> Must specify the AI tool, the tasks it performed, the verification steps taken by the attorney, and a statement that all citations and legal analysis have been independently verified. The attorney of record must take personal responsibility for accuracy.
        </p>
        <p style={s.p}>
          <strong>Academic papers:</strong> Most university policies require a methods-section disclosure describing how AI contributed to research, writing, or data analysis. Some require listing specific prompts used. Check your institution&apos;s policy.
        </p>
        <p style={s.p}>
          <strong>Business reports:</strong> A footnote or appendix note identifying the AI tools used, the nature of their contribution, and the review process is typically sufficient for internal reports. Client-facing documents may require more detail depending on contractual obligations.
        </p>
        <p style={s.p}>
          <strong>Blog posts and marketing content:</strong> EU transparency rules require labeling AI-generated content. A simple footer note — &quot;This article was drafted with assistance from [AI tool] and reviewed by [author name]&quot; — meets most requirements.
        </p>

        <h2 style={s.h2}>How to Generate a Disclosure Statement in 30 Seconds</h2>
        <p style={s.p}>
          <strong>Step 1:</strong> Open the{" "}
          <Link href="/tools/ai-disclosure-generator" style={{ color: "#0D9488" }}>
            AI Disclosure Generator
          </Link>
          . No signup needed.
        </p>
        <p style={s.p}>
          <strong>Step 2:</strong> Select your document type (court filing, academic paper, business report, or blog post).
        </p>
        <p style={s.p}>
          <strong>Step 3:</strong> Check the AI tools you used and describe how you used them (drafting, research, editing, translation).
        </p>
        <p style={s.p}>
          <strong>Step 4:</strong> Enter your name and date. Click Generate. Copy the formatted disclosure and add it to your document.
        </p>
        <p style={s.p}>
          The generator produces different formats depending on context — a formal paragraph for court filings, a methods-section block for academic work, and a concise footnote for business documents.
        </p>

        <h2 style={s.h2}>Common Mistakes to Avoid</h2>
        <ul style={s.ul}>
          <li><strong>Being too vague.</strong> &quot;AI tools were consulted&quot; does not meet any regulatory standard. Name the tool, describe the use.</li>
          <li><strong>Over-disclosing.</strong> If you used AI for spell-checking or grammar, most frameworks do not require disclosure for that level of assistance. Focus on substantive contributions.</li>
          <li><strong>Forgetting verification.</strong> For legal documents, the disclosure must confirm that the attorney independently verified all AI-generated content, especially citations and case law.</li>
          <li><strong>Treating disclosure as admission of weakness.</strong> Disclosure does not imply your work is lower quality. It demonstrates professionalism and compliance.</li>
        </ul>

        <h2 style={s.h2}>Pair With Other Legal Tools</h2>
        <p style={s.p}>
          If you are building a compliance toolkit, the AI Disclosure Generator works alongside our{" "}
          <Link href="/tools/privacy-policy-generator" style={{ color: "#0D9488" }}>Privacy Policy Generator</Link>,{" "}
          <Link href="/tools/terms-of-service-generator" style={{ color: "#0D9488" }}>Terms of Service Generator</Link>, and{" "}
          <Link href="/tools/nda-generator" style={{ color: "#0D9488" }}>NDA Generator</Link>
          {" "}to cover your legal bases.
        </p>
        <p style={s.p}>
          For in-depth reviews and comparisons of the AI tools you are disclosing, visit{" "}
          <a href="https://aigradelab.com" style={{ color: "#0D9488" }}>AIGradeLab.com</a>
          {" "}— independent grades on 90+ AI platforms across five quality criteria.
        </p>

        <h2 style={s.h2}>Final Thoughts</h2>
        <p style={s.p}>
          AI disclosure is heading in one direction: more requirements, not fewer. California is first, but other states are watching. The EU is enforcing. Universities are standardizing. Getting ahead of this curve costs you 30 seconds with a disclosure generator. Getting behind it can cost your career, your license, or your grade. The choice is straightforward.
        </p>

        <Link href="/tools/ai-disclosure-generator" style={s.cta}>
          Generate Your AI Disclosure Statement →
        </Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>
        <Footer />
      </div>
    </>
  );
}
