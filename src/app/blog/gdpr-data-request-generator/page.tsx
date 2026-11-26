import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR Request Generator: Exercise Your Data Rights in Minutes | ToolCraftKit",
  description:
    "Generate formal GDPR data access, deletion, rectification, and portability requests in seconds. Free, no signup. Exercise your privacy rights today.",
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

        <h1 style={s.h1}>GDPR Request Generator: Exercise Your Data Rights in Minutes</h1>
        <p style={s.meta}>November 25, 2026 · 8 min read</p>

        <p style={s.p}>
          Every person in the European Union — and increasingly in jurisdictions worldwide — has the legal right to know what personal data companies hold about them, demand corrections, and even request complete deletion. These rights exist under the <strong>General Data Protection Regulation (GDPR)</strong>, yet most people never exercise them because the process feels opaque and bureaucratic. It does not have to be. A well-structured <strong>GDPR data request</strong> takes less than five minutes to draft, and companies are legally required to respond within 30 days.
        </p>

        <h2 style={s.h2}>The Five GDPR Rights You Should Know</h2>
        <p style={s.p}>
          The GDPR grants individuals several specific rights over their personal data. Understanding which right applies to your situation is the first step toward taking action.
        </p>
        <ul style={s.ul}>
          <li><strong>Right of Access (Article 15)</strong> — You can request a copy of all personal data a company holds about you. This includes account information, transaction records, support tickets, IP logs, cookies, and any profiles built from your activity. The company must provide it in a commonly used electronic format.</li>
          <li><strong>Right to Rectification (Article 16)</strong> — If a company holds inaccurate or incomplete data about you, you can demand they correct it. This applies to anything from a misspelled name to an outdated address or incorrect account details.</li>
          <li><strong>Right to Erasure (Article 17)</strong> — Also called the &quot;right to be forgotten,&quot; this lets you request that a company delete all your personal data. It applies when the data is no longer necessary for its original purpose, when you withdraw consent, or when the data was processed unlawfully.</li>
          <li><strong>Right to Data Portability (Article 20)</strong> — You can ask a company to export your data in a structured, machine-readable format so you can transfer it to another service. This is particularly useful when switching email providers, social networks, or cloud storage platforms.</li>
          <li><strong>Right to Object (Article 21)</strong> — You can object to the processing of your data for direct marketing, profiling, or any purpose based on &quot;legitimate interest.&quot; Once you object, the company must stop processing unless they can demonstrate compelling grounds that override your rights.</li>
        </ul>

        <h2 style={s.h2}>When Should You File a GDPR Request?</h2>
        <p style={s.p}>
          Knowing your rights is one thing. Knowing when to use them is another. Here are the most common scenarios where a formal GDPR request makes sense:
        </p>
        <p style={s.p}>
          <strong>You are closing an account.</strong> When you stop using a service, the company may continue storing your data indefinitely. A deletion request ensures they actually remove it rather than archiving it in a backup somewhere.
        </p>
        <p style={s.p}>
          <strong>You receive unwanted marketing.</strong> If a company keeps emailing you after you have unsubscribed, an objection request under Article 21 carries legal weight that a simple &quot;unsubscribe&quot; link does not. The company faces fines if they ignore it.
        </p>
        <p style={s.p}>
          <strong>You suspect a data breach.</strong> An access request reveals exactly what data a company holds, helping you assess your exposure after a breach notification. If they hold more data than you expected, that itself may be a compliance issue worth flagging to your national data protection authority.
        </p>
        <p style={s.p}>
          <strong>You are switching services.</strong> A portability request gives you a structured export you can feed into a new provider, reducing the friction of migration and ensuring no data gets lost in transition.
        </p>
        <p style={s.p}>
          <strong>Your information is wrong.</strong> An outdated address or incorrect credit score can have real consequences. A rectification request compels the company to fix the record, not just acknowledge the error.
        </p>

        <h2 style={s.h2}>What to Include in a GDPR Request</h2>
        <p style={s.p}>
          A GDPR request does not need to be a legal masterpiece, but it does need to contain the right elements to be taken seriously and processed quickly:
        </p>
        <ul style={s.ul}>
          <li><strong>Your full name</strong> as it appears in the company&apos;s records</li>
          <li><strong>Contact email</strong> associated with your account</li>
          <li><strong>The specific right you are exercising</strong> — reference the GDPR article number for clarity</li>
          <li><strong>What data you are requesting</strong> — be specific. &quot;All my data&quot; works for access requests, but deletion requests benefit from listing categories (account data, marketing profiles, analytics logs)</li>
          <li><strong>A deadline reminder</strong> — companies have 30 calendar days to respond under Article 12(3). Mentioning this in your request signals that you know the rules</li>
          <li><strong>Your preferred format</strong> — for portability requests, ask for JSON or CSV rather than a PDF full of screenshots</li>
        </ul>

        <h2 style={s.h2}>The 30-Day Response Rule</h2>
        <p style={s.p}>
          Under GDPR Article 12(3), companies must act on your request <strong>within one month</strong> of receipt. They can extend this by an additional two months for complex requests, but they must notify you of the extension within the original 30-day window and explain why.
        </p>
        <p style={s.p}>
          If a company ignores your request entirely, responds late, or refuses without valid justification, you have the right to file a complaint with your national data protection authority. In the EU, these authorities have the power to impose fines of up to 4% of annual global turnover or &euro;20 million, whichever is higher.
        </p>
        <p style={s.p}>
          Practically speaking, most companies respond promptly to well-formatted requests because the cost of compliance is far lower than the cost of an investigation.
        </p>

        <h2 style={s.h2}>GDPR vs. CCPA: Key Differences</h2>
        <p style={s.p}>
          If you are in California, the <strong>California Consumer Privacy Act (CCPA)</strong> provides similar but not identical rights. The CCPA gives you the right to know, delete, and opt out of the sale of personal information, but it does not include rectification or portability in the same way GDPR does. Response timelines also differ — CCPA allows 45 days instead of 30.
        </p>
        <p style={s.p}>
          Our{" "}
          <Link href="/tools/gdpr-request-generator" style={{ color: "#0D9488" }}>
            GDPR Request Generator
          </Link>{" "}
          supports both frameworks, automatically adjusting the language and legal references based on the regulation you select.
        </p>

        <h2 style={s.h2}>How to Generate a GDPR Request in 60 Seconds</h2>
        <p style={s.p}>
          <strong>Step 1:</strong> Open the{" "}
          <Link href="/tools/gdpr-request-generator" style={{ color: "#0D9488" }}>
            GDPR Request Generator
          </Link>{" "}
          on ToolCraftKit.
        </p>
        <p style={s.p}>
          <strong>Step 2:</strong> Select the type of request — data access, deletion, rectification, portability, or objection.
        </p>
        <p style={s.p}>
          <strong>Step 3:</strong> Fill in your name, email, and the name of the company you are contacting.
        </p>
        <p style={s.p}>
          <strong>Step 4:</strong> Click generate. Copy the letter and send it to the company&apos;s data protection officer or privacy contact. Most companies list this address in the privacy policy on their website.
        </p>
        <p style={s.p}>
          The output is a professionally formatted letter with the correct legal references, deadline reminders, and all the information a data controller needs to process your request without back-and-forth.
        </p>

        <h2 style={s.h2}>Pair It With Your Other Legal Documents</h2>
        <p style={s.p}>
          If you run a website or business, you should also have your own GDPR-compliant infrastructure in place. ToolCraftKit offers a complete suite of free legal generators:
        </p>
        <ul style={s.ul}>
          <li><Link href="/tools/privacy-policy-generator" style={{ color: "#0D9488" }}>Privacy Policy Generator</Link> — covers GDPR, CCPA, and COPPA</li>
          <li><Link href="/tools/terms-of-service-generator" style={{ color: "#0D9488" }}>Terms of Service Generator</Link> — customizable for any website or app</li>
          <li><Link href="/tools/ai-disclosure-generator" style={{ color: "#0D9488" }}>AI Disclosure Generator</Link> — for compliance with new AI transparency laws</li>
        </ul>
        <p style={s.p}>
          For in-depth reviews of AI tools that handle compliance and legal workflows, visit{" "}
          <a href="https://aigradelab.com" target="_blank" rel="noopener" style={{ color: "#0D9488" }}>AIGradeLab.com</a>.
        </p>

        <h2 style={s.h2}>Final Thoughts</h2>
        <p style={s.p}>
          Your data rights are not theoretical. They are enforceable, well-defined, and increasingly supported by regulatory agencies with real enforcement power. The only barrier is knowing what to ask for and how to ask for it. A properly formatted request removes that barrier entirely and puts the burden where it belongs — on the company holding your data.
        </p>

        <Link href="/tools/gdpr-request-generator" style={s.cta}>
          Generate Your GDPR Request →
        </Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>
        <Footer />
      </div>
    </>
  );
}
