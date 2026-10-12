"use client";
import { useState, useMemo } from "react";

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6",
  bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  success: "#10B981", danger: "#EF4444", warning: "#F59E0B",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4",
  bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  success: "#34D399", danger: "#F87171", warning: "#FBBF24",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
};

type Theme = typeof LIGHT;

/* ─── STOP WORDS ─── */
const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with","by",
  "from","as","is","was","are","were","been","be","have","has","had","do","does",
  "did","will","would","shall","should","may","might","must","can","could",
  "this","that","these","those","it","its","i","me","my","we","our","you","your",
  "he","she","they","them","their","his","her","not","no","nor","so","if","then",
  "than","too","very","just","about","above","after","again","all","also","am",
  "any","because","before","between","both","each","few","get","got","here",
  "how","into","more","most","new","now","only","other","out","over","own",
  "same","some","such","there","through","under","up","what","when","where",
  "which","while","who","whom","why","able","across","along","already","among",
  "around","being","come","during","every","going","keep","make","made","many",
  "much","need","per","please","put","rather","since","still","take","using",
  "via","well","work","working","within","without","etc","including","based",
  "ensure","strong","highly","looking","join","role","team","company","position",
  "responsibilities","requirements","qualifications","preferred","required",
  "minimum","experience","years","ability","knowledge","understanding","plus",
]);

/* ─── SECTION DEFINITIONS ─── */
const RESUME_SECTIONS = [
  { name: "Contact Info", patterns: [/email|phone|address|linkedin|github|portfolio|website|@|\(\d{3}\)/i] },
  { name: "Summary / Objective", patterns: [/summary|objective|profile|about\s*me|professional\s*summary|career\s*objective/i] },
  { name: "Work Experience", patterns: [/experience|employment|work\s*history|professional\s*experience|career\s*history/i] },
  { name: "Education", patterns: [/education|degree|university|college|bachelor|master|phd|diploma|certification/i] },
  { name: "Skills", patterns: [/skills|technical\s*skills|core\s*competencies|proficiencies|technologies|tools/i] },
  { name: "Certifications", patterns: [/certif|license|accreditation|credential/i] },
];

/* ─── KEYWORD EXTRACTION ─── */
function extractKeywords(text: string): string[] {
  const words = text.toLowerCase().replace(/[^a-z0-9\s\-\+\#\.]/g, " ").split(/\s+/).filter(Boolean);
  const seen = new Set<string>();
  const keywords: string[] = [];

  // Single-word keywords
  for (const w of words) {
    const clean = w.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, "");
    if (clean.length < 2 || STOP_WORDS.has(clean)) continue;
    if (!seen.has(clean)) { seen.add(clean); keywords.push(clean); }
  }

  // Two-word phrases
  for (let i = 0; i < words.length - 1; i++) {
    const a = words[i].replace(/[^a-z0-9]/g, "");
    const b = words[i + 1].replace(/[^a-z0-9]/g, "");
    if (a.length < 2 || b.length < 2 || STOP_WORDS.has(a) || STOP_WORDS.has(b)) continue;
    const phrase = `${a} ${b}`;
    if (!seen.has(phrase)) { seen.add(phrase); keywords.push(phrase); }
  }

  return keywords.slice(0, 80);
}

/* ─── ANALYSIS ─── */
interface AnalysisResult {
  score: number;
  keywordScore: number;
  sectionScore: number;
  formatScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  foundSections: string[];
  missingSections: string[];
  formatIssues: string[];
  tips: string[];
}

function analyzeResume(resume: string, jobDesc: string): AnalysisResult | null {
  if (!resume.trim() || !jobDesc.trim()) return null;

  const resumeLower = resume.toLowerCase();
  const keywords = extractKeywords(jobDesc);

  // Keyword matching
  const matched: string[] = [];
  const missing: string[] = [];
  for (const kw of keywords) {
    if (resumeLower.includes(kw)) matched.push(kw);
    else missing.push(kw);
  }
  const keywordScore = keywords.length > 0 ? Math.round((matched.length / keywords.length) * 100) : 0;

  // Section detection
  const foundSections: string[] = [];
  const missingSections: string[] = [];
  for (const sec of RESUME_SECTIONS) {
    const found = sec.patterns.some((p) => p.test(resume));
    if (found) foundSections.push(sec.name);
    else missingSections.push(sec.name);
  }
  const sectionScore = Math.round((foundSections.length / RESUME_SECTIONS.length) * 100);

  // Formatting checks
  const formatIssues: string[] = [];
  const wordCount = (resume.match(/\S+/g) || []).length;
  let formatDeductions = 0;

  if (wordCount < 150) { formatIssues.push("Resume is very short (under 150 words). Most effective resumes are 400-800 words."); formatDeductions += 20; }
  else if (wordCount < 300) { formatIssues.push("Resume may be too short. Consider adding more detail to your experience and skills."); formatDeductions += 10; }
  else if (wordCount > 1200) { formatIssues.push("Resume is very long. ATS systems and recruiters prefer concise resumes (1-2 pages)."); formatDeductions += 10; }

  if (/\b(I|me|my)\b/i.test(resume)) { formatIssues.push("Avoid first-person pronouns (I, me, my). Use action verbs instead: 'Managed team of 5' instead of 'I managed a team of 5'."); formatDeductions += 10; }

  if (!/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resume)) { formatIssues.push("No email address detected. Include a professional email in your contact section."); formatDeductions += 10; }

  if (!/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(resume) && !/\+\d{1,3}\s?\d/.test(resume)) {
    formatIssues.push("No phone number detected. Include a phone number for recruiter contact.");
    formatDeductions += 5;
  }

  const lines = resume.split("\n").filter((l) => l.trim().length > 0);
  const longLines = lines.filter((l) => l.trim().length > 200).length;
  if (longLines > 3) { formatIssues.push("Several very long paragraphs detected. Break text into bullet points for better ATS parsing."); formatDeductions += 10; }

  if (!/\d{4}/.test(resume)) { formatIssues.push("No dates detected. Include specific dates for experience and education entries."); formatDeductions += 5; }

  const actionVerbs = /\b(managed|led|developed|created|implemented|designed|analyzed|improved|increased|reduced|built|launched|delivered|organized|coordinated|established|maintained|achieved|negotiated|resolved)\b/i;
  if (!actionVerbs.test(resume)) { formatIssues.push("No strong action verbs found. Start bullet points with verbs like 'Managed', 'Developed', 'Implemented'."); formatDeductions += 5; }

  if (formatIssues.length === 0) formatIssues.push("No major formatting issues detected.");
  const formatScore = Math.max(0, 100 - formatDeductions);

  // Overall score: keyword (50%), sections (25%), formatting (25%)
  const score = Math.round(keywordScore * 0.5 + sectionScore * 0.25 + formatScore * 0.25);

  // Tips
  const tips: string[] = [];
  if (keywordScore < 50) tips.push("Your resume matches less than half the job description keywords. Add missing skills and terms naturally throughout your experience bullets.");
  if (keywordScore >= 50 && keywordScore < 75) tips.push("Good keyword coverage, but you can improve by incorporating more of the missing terms into your experience descriptions.");
  if (keywordScore >= 75) tips.push("Excellent keyword match. Your resume aligns well with the job description.");
  if (missingSections.length > 0) tips.push(`Add missing sections: ${missingSections.join(", ")}. Standard ATS-friendly resumes include all six core sections.`);
  if (missing.length > 5) tips.push("Focus on the top 5-10 missing keywords first. Prioritize hard skills and tools mentioned multiple times in the job posting.");
  if (score < 50) tips.push("Consider restructuring your resume to mirror the job description language more closely. Tailor each resume to the specific position.");
  if (score >= 75) tips.push("Your resume is well-optimized for this position. Do a final proofread and make sure your formatting is clean for ATS parsing.");

  return {
    score, keywordScore, sectionScore, formatScore,
    matchedKeywords: matched.slice(0, 40),
    missingKeywords: missing.slice(0, 30),
    foundSections, missingSections, formatIssues, tips,
  };
}

/* ─── SUB-COMPONENTS ─── */

function ScoreCircle({ score, theme }: { score: number; theme: Theme }) {
  const color = score >= 75 ? theme.success : score >= 50 ? theme.warning : theme.danger;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div style={{ textAlign: "center", margin: "8px 0" }}>
      <svg width="140" height="140" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke={theme.surfaceAlt} strokeWidth="8" />
        <circle cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 0.6s ease" }} />
        <text x="60" y="55" textAnchor="middle" fill={color}
          style={{ fontSize: 32, fontWeight: 800 }}>{score}</text>
        <text x="60" y="74" textAnchor="middle" fill={theme.textMuted}
          style={{ fontSize: 11, fontWeight: 500 }}>out of 100</text>
      </svg>
      <div style={{ fontSize: 14, fontWeight: 700, color, marginTop: 4 }}>
        {score >= 75 ? "Strong Match" : score >= 50 ? "Needs Improvement" : "Low Match"}
      </div>
    </div>
  );
}

function Badge({ text, variant, theme }: { text: string; variant: "success" | "danger"; theme: Theme }) {
  const bg = variant === "success"
    ? (theme === DARK ? "rgba(52,211,153,0.15)" : "rgba(16,185,129,0.1)")
    : (theme === DARK ? "rgba(248,113,113,0.15)" : "rgba(239,68,68,0.1)");
  const color = variant === "success" ? theme.success : theme.danger;
  return (
    <span style={{
      display: "inline-block", background: bg, color, borderRadius: 6,
      padding: "3px 10px", fontSize: 12, fontWeight: 600, margin: "3px 4px 3px 0",
    }}>{text}</span>
  );
}

function FAQItem({ q, a, theme }: { q: string; a: string; theme: Theme }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${theme.border}`, padding: "13px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: 0, textAlign: "left",
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, lineHeight: 1.4, paddingRight: 16 }}>{q}</span>
        <span style={{
          fontSize: 18, color: theme.textMuted, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease", lineHeight: 1,
        }}>+</span>
      </button>
      {open && (
        <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.65, marginTop: 10, marginBottom: 0, paddingRight: 30 }}>{a}</p>
      )}
    </div>
  );
}

function AdSlot({ position, theme }: { position: string; theme: Theme }) {
  return (
    <div style={{
      border: `1px dashed ${theme.border}`, borderRadius: 8,
      padding: "12px", textAlign: "center", color: theme.textLight,
      fontSize: 11, fontStyle: "italic", background: theme.surfaceAlt,
      margin: position === "header" ? "0 0 20px" : "20px 0",
      opacity: 0.5,
    }}>
      Ad Slot — {position}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function AtsChecker() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [dark, setDark] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const theme = dark ? DARK : LIGHT;

  const result = useMemo(() => {
    if (!analyzed) return null;
    return analyzeResume(resume, jobDesc);
  }, [resume, jobDesc, analyzed]);

  const handleAnalyze = () => {
    if (resume.trim() && jobDesc.trim()) setAnalyzed(true);
  };

  const handleClear = () => {
    setResume("");
    setJobDesc("");
    setAnalyzed(false);
  };

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <main style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* Ad slot: header */}
        <AdSlot position="header" theme={theme} />

        {/* ─── BREADCRUMB ─── */}
        <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 16 }}>
          <a href="/" style={{ color: theme.primary, textDecoration: "none" }}>Home</a>
          {" > "}
          <span>Business Tools</span>
          {" > "}
          <span style={{ color: theme.primary }}>ATS Resume Checker</span>
        </div>

        {/* ─── TITLE ─── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "inline-block", background: "#C4A265", color: "#fff", padding: "3px 12px", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600, marginRight: 4 }}>PREMIUM TOOL</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
              ATS Resume Score Checker
            </h1>
            <button onClick={() => setDark(!dark)} aria-label="Toggle theme" style={{
              marginLeft: "auto", background: theme.surfaceAlt, border: `1px solid ${theme.border}`,
              borderRadius: 8, padding: "6px 12px", cursor: "pointer",
              fontSize: 13, color: theme.textMuted, fontWeight: 500,
            }}>
              {dark ? "Light" : "Dark"}
            </button>
          </div>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Paste your resume and a job description to get an ATS compatibility score with keyword analysis, section checks, and optimization tips.
          </p>
        </div>

        {/* ─── INPUT AREA ─── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}>
          {/* Resume textarea */}
          <div style={{
            background: theme.surface, borderRadius: 12,
            border: `1.5px solid ${theme.border}`, overflow: "hidden",
            boxShadow: theme.shadow,
          }}>
            <div style={{
              padding: "10px 14px", background: theme.surfaceAlt,
              borderBottom: `1px solid ${theme.border}`, fontSize: 13,
              fontWeight: 600, color: theme.text,
            }}>
              Paste Your Resume
            </div>
            <textarea
              value={resume}
              onChange={(e) => { setResume(e.target.value); setAnalyzed(false); }}
              placeholder="Paste the full text of your resume here..."
              style={{
                width: "100%", minHeight: 280, padding: "14px 16px",
                fontSize: 14, lineHeight: 1.6, color: theme.text,
                fontFamily: "'Inter', system-ui, sans-serif",
                border: "none", outline: "none", resize: "vertical",
                background: "transparent", boxSizing: "border-box",
              }}
            />
            <div style={{
              padding: "6px 14px", background: theme.surfaceAlt,
              borderTop: `1px solid ${theme.border}`, fontSize: 12,
              color: theme.textLight,
            }}>
              {(resume.match(/\S+/g) || []).length.toLocaleString()} words
            </div>
          </div>

          {/* Job description textarea */}
          <div style={{
            background: theme.surface, borderRadius: 12,
            border: `1.5px solid ${theme.border}`, overflow: "hidden",
            boxShadow: theme.shadow,
          }}>
            <div style={{
              padding: "10px 14px", background: theme.surfaceAlt,
              borderBottom: `1px solid ${theme.border}`, fontSize: 13,
              fontWeight: 600, color: theme.text,
            }}>
              Paste Job Description
            </div>
            <textarea
              value={jobDesc}
              onChange={(e) => { setJobDesc(e.target.value); setAnalyzed(false); }}
              placeholder="Paste the job posting or description here..."
              style={{
                width: "100%", minHeight: 280, padding: "14px 16px",
                fontSize: 14, lineHeight: 1.6, color: theme.text,
                fontFamily: "'Inter', system-ui, sans-serif",
                border: "none", outline: "none", resize: "vertical",
                background: "transparent", boxSizing: "border-box",
              }}
            />
            <div style={{
              padding: "6px 14px", background: theme.surfaceAlt,
              borderTop: `1px solid ${theme.border}`, fontSize: 12,
              color: theme.textLight,
            }}>
              {(jobDesc.match(/\S+/g) || []).length.toLocaleString()} words
            </div>
          </div>
        </div>

        {/* ─── MOBILE: stack on small screens ─── */}
        <style>{`@media(max-width:700px){main>div:nth-child(5){grid-template-columns:1fr!important}}`}</style>

        {/* ─── BUTTONS ─── */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          <button onClick={handleAnalyze} disabled={!resume.trim() || !jobDesc.trim()} style={{
            background: (!resume.trim() || !jobDesc.trim()) ? theme.textLight : theme.primary,
            color: "#fff", border: "none", borderRadius: 10,
            padding: "12px 32px", fontSize: 15, fontWeight: 700, cursor: (!resume.trim() || !jobDesc.trim()) ? "not-allowed" : "pointer",
            transition: "background 0.2s ease",
          }}>
            Analyze Resume
          </button>
          {(resume || jobDesc) && (
            <button onClick={handleClear} style={{
              background: "none", border: `1px solid ${theme.border}`, borderRadius: 10,
              padding: "12px 20px", fontSize: 14, color: theme.textMuted,
              cursor: "pointer", fontWeight: 500,
            }}>
              Clear All
            </button>
          )}
        </div>

        {/* ─── RESULTS ─── */}
        {result && (
          <>
            {/* Score */}
            <section style={{
              background: theme.surface, borderRadius: 12, padding: 24,
              border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
              marginBottom: 20, textAlign: "center",
            }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>ATS Compatibility Score</h2>
              <ScoreCircle score={result.score} theme={theme} />
              <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 16, flexWrap: "wrap" }}>
                {[
                  { label: "Keyword Match", value: result.keywordScore, weight: "50%" },
                  { label: "Sections", value: result.sectionScore, weight: "25%" },
                  { label: "Formatting", value: result.formatScore, weight: "25%" },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div style={{
                      fontSize: 22, fontWeight: 700,
                      color: s.value >= 75 ? theme.success : s.value >= 50 ? theme.warning : theme.danger,
                    }}>{s.value}%</div>
                    <div style={{ fontSize: 12, color: theme.textMuted }}>{s.label} ({s.weight})</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Keyword Analysis */}
            <section style={{
              background: theme.surface, borderRadius: 12, padding: 20,
              border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
              marginBottom: 16,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 14px" }}>Keyword Analysis</h2>
              {result.matchedKeywords.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.success, marginBottom: 6 }}>
                    Matched Keywords ({result.matchedKeywords.length})
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {result.matchedKeywords.map((kw) => <Badge key={kw} text={kw} variant="success" theme={theme} />)}
                  </div>
                </div>
              )}
              {result.missingKeywords.length > 0 && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.danger, marginBottom: 6 }}>
                    Missing Keywords ({result.missingKeywords.length})
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {result.missingKeywords.map((kw) => <Badge key={kw} text={kw} variant="danger" theme={theme} />)}
                  </div>
                </div>
              )}
            </section>

            {/* Section Check */}
            <section style={{
              background: theme.surface, borderRadius: 12, padding: 20,
              border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
              marginBottom: 16,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 14px" }}>Section Check</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {result.foundSections.map((sec) => (
                  <div key={sec} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
                    <span style={{ color: theme.success, fontSize: 16, fontWeight: 700 }}>&#10003;</span>
                    <span style={{ color: theme.text }}>{sec}</span>
                  </div>
                ))}
                {result.missingSections.map((sec) => (
                  <div key={sec} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
                    <span style={{ color: theme.danger, fontSize: 16, fontWeight: 700 }}>&#10007;</span>
                    <span style={{ color: theme.textMuted }}>{sec}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Formatting Tips */}
            <section style={{
              background: theme.surface, borderRadius: 12, padding: 20,
              border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
              marginBottom: 16,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 14px" }}>Formatting Recommendations</h2>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {result.formatIssues.map((issue, i) => (
                  <li key={i} style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.7, marginBottom: 6 }}>
                    {issue}
                  </li>
                ))}
              </ul>
            </section>

            {/* Overall Tips */}
            <section style={{
              background: dark ? "rgba(45,212,191,0.08)" : "#f0fdfa",
              border: `1px solid ${dark ? "rgba(45,212,191,0.2)" : "#99f6e4"}`,
              borderRadius: 12, padding: 20, marginBottom: 24,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 10px", color: theme.primary }}>Optimization Tips</h2>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {result.tips.map((tip, i) => (
                  <li key={i} style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.7, marginBottom: 6 }}>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {/* ─── FAQ ─── */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme}
            q="What is an ATS and why does it matter?"
            a="An Applicant Tracking System (ATS) is software that employers use to filter resumes before a human ever reads them. Over 98% of Fortune 500 companies use an ATS. If your resume is not optimized for ATS parsing, it may be automatically rejected regardless of your qualifications."
          />
          <FAQItem theme={theme}
            q="How does keyword matching work?"
            a="ATS systems scan your resume for specific keywords from the job description — skills, tools, certifications, and job-specific terms. This tool extracts those keywords and checks which ones appear in your resume. A higher keyword match percentage means your resume is more likely to pass the ATS filter."
          />
          <FAQItem theme={theme}
            q="What score should I aim for?"
            a="Aim for a score of 75 or higher. Resumes scoring above 75 have the best chance of passing ATS filters. Focus first on keyword matching (the largest factor at 50% of your score), then ensure all standard resume sections are present, and finally address any formatting issues."
          />
          <FAQItem theme={theme}
            q="Does this tool store my resume data?"
            a="No. All analysis runs entirely in your browser. Your resume text and job description are never uploaded, stored, or shared with any server. You can use this tool with complete privacy and confidence."
          />
        </section>

        {/* ─── SEO CONTENT ─── */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 16,
            borderBottom: `2px solid ${theme.primary}`, paddingBottom: 8,
          }}>How to Use the ATS Resume Score Checker</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: theme.textMuted, marginBottom: 12 }}>
            Paste your resume text into the left panel and the job description into the right panel, then click Analyze. The tool instantly extracts keywords from the job posting, checks your resume for those terms, verifies that standard resume sections are present, and evaluates formatting quality. Your overall ATS score is weighted: 50% keyword match, 25% section completeness, and 25% formatting. Use the results to tailor your resume before applying.
          </p>
          <h2 style={{
            fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 16,
            borderBottom: `2px solid ${theme.primary}`, paddingBottom: 8,
          }}>Why ATS Optimization Matters for Job Seekers</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: theme.textMuted, marginBottom: 12 }}>
            Most companies use Applicant Tracking Systems to screen resumes before they reach a hiring manager. Research shows that up to 75% of qualified candidates are rejected by ATS filters because their resumes lack the right keywords or formatting. By checking your resume against the specific job posting, you can dramatically increase your chances of getting past the initial screen and landing an interview. Tailoring each resume to the job description is the single most effective strategy for modern job applications.
          </p>
          <div style={{
            background: dark ? "rgba(45,212,191,0.08)" : "#f0fdfa",
            border: `1px solid ${dark ? "rgba(45,212,191,0.2)" : "#99f6e4"}`,
            borderRadius: 8, padding: 16, marginTop: 16, marginBottom: 16,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.primary, marginBottom: 4 }}>Pro Tip</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: theme.textMuted, margin: 0 }}>
              After optimizing your resume, use our{" "}
              <a href="/tools/word-counter" style={{ color: theme.primary }}>Word Counter</a> to make sure it stays within the ideal 400-800 word range for a one-page resume.
            </p>
          </div>
        </section>

        {/* Ad slot: footer */}
        <AdSlot position="footer" theme={theme} />

        {/* ─── FOOTER ─── */}
        <footer style={{
          marginTop: 32, paddingTop: 20, borderTop: `1px solid ${theme.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontSize: 12, color: theme.textLight }}>
            &copy; 2026 ToolCraftKit.com — Free tools for creators and entrepreneurs.
          </span>
          <div style={{ display: "flex", gap: 14, fontSize: 12, color: theme.textMuted }}>
            <span style={{ cursor: "pointer" }}>Privacy</span>
            <span style={{ cursor: "pointer" }}>Terms</span>
            <span style={{ cursor: "pointer" }}>Contact</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
