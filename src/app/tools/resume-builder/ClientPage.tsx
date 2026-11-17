"use client";
import { useState, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const TOOL_SLUG = "resume-builder";

interface WorkExp { title: string; company: string; dates: string; description: string; }
interface Education { degree: string; school: string; dates: string; }

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [work, setWork] = useState<WorkExp[]>([{ title: "", company: "", dates: "", description: "" }]);
  const [education, setEducation] = useState<Education[]>([{ degree: "", school: "", dates: "" }]);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const { user, isPro } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(2);
  const [period, setPeriod] = useState("month");

  useEffect(() => {
    if (!user) return;
    fetch("/api/usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool: TOOL_SLUG, action: "check" }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.usage !== undefined) setUsage(d.usage);
        if (d.limit !== undefined) setLimit(d.limit);
        if (d.period) setPeriod(d.period);
      })
      .catch(() => {});
  }, [user]);

  const trackUsage = async () => {
    if (isPro) return true;
    if (!user) return false;
    if (usage >= limit) { window.location.href = "/pricing"; return false; }
    try {
      const res = await fetch("/api/usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: TOOL_SLUG, action: "increment" }),
      });
      const d = await res.json();
      if (d.usage !== undefined) setUsage(d.usage);
      return d.allowed !== false;
    } catch { return false; }
  };

  const updateWork = (i: number, field: keyof WorkExp, val: string) => {
    const copy = [...work]; copy[i] = { ...copy[i], [field]: val }; setWork(copy);
  };
  const updateEdu = (i: number, field: keyof Education, val: string) => {
    const copy = [...education]; copy[i] = { ...copy[i], [field]: val }; setEducation(copy);
  };

  const generatePdf = async () => {
    if (!user) { setError("Please sign in to use this tool."); return; }
    const allowed = await trackUsage();
    if (!allowed) return;
    setGenerating(true);
    setError("");
    try {
      const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      const page = doc.addPage([612, 792]);
      const bold = await doc.embedFont(StandardFonts.HelveticaBold);
      const regular = await doc.embedFont(StandardFonts.Helvetica);
      const teal = rgb(13 / 255, 148 / 255, 136 / 255);
      const black = rgb(0, 0, 0);
      const gray = rgb(0.35, 0.35, 0.35);
      let y = 740;
      const lm = 50;
      const pw = 512;

      const drawText = (t: string, x: number, yy: number, font: typeof bold, size: number, color = black) => {
        page.drawText(t, { x, y: yy, size, font, color });
      };

      const wrapText = (t: string, font: typeof regular, size: number, maxW: number): string[] => {
        const words = t.split(" ");
        const lines: string[] = [];
        let line = "";
        for (const w of words) {
          const test = line ? line + " " + w : w;
          if (font.widthOfTextAtSize(test, size) > maxW) {
            if (line) lines.push(line);
            line = w;
          } else { line = test; }
        }
        if (line) lines.push(line);
        return lines;
      };

      // Name
      if (name) { drawText(name, lm, y, bold, 22, teal); y -= 26; }
      // Contact
      const contact = [email, phone].filter(Boolean).join("  |  ");
      if (contact) { drawText(contact, lm, y, regular, 10, gray); y -= 20; }

      // Summary
      if (summary) {
        y -= 6;
        page.drawLine({ start: { x: lm, y }, end: { x: lm + pw, y }, thickness: 1, color: teal });
        y -= 16;
        drawText("SUMMARY", lm, y, bold, 11, teal); y -= 16;
        const lines = wrapText(summary, regular, 10, pw);
        for (const l of lines) { drawText(l, lm, y, regular, 10, gray); y -= 14; }
      }

      // Experience
      if (work.some(w => w.title || w.company)) {
        y -= 6;
        page.drawLine({ start: { x: lm, y }, end: { x: lm + pw, y }, thickness: 1, color: teal });
        y -= 16;
        drawText("EXPERIENCE", lm, y, bold, 11, teal); y -= 16;
        for (const w of work) {
          if (!w.title && !w.company) continue;
          drawText(w.title || "Untitled", lm, y, bold, 11, black);
          if (w.dates) drawText(w.dates, lm + pw - regular.widthOfTextAtSize(w.dates, 9), y, regular, 9, gray);
          y -= 14;
          if (w.company) { drawText(w.company, lm, y, regular, 10, gray); y -= 14; }
          if (w.description) {
            const lines = wrapText(w.description, regular, 10, pw);
            for (const l of lines) { drawText(l, lm, y, regular, 10, gray); y -= 13; }
          }
          y -= 6;
        }
      }

      // Education
      if (education.some(e => e.degree || e.school)) {
        y -= 2;
        page.drawLine({ start: { x: lm, y }, end: { x: lm + pw, y }, thickness: 1, color: teal });
        y -= 16;
        drawText("EDUCATION", lm, y, bold, 11, teal); y -= 16;
        for (const e of education) {
          if (!e.degree && !e.school) continue;
          drawText(e.degree || "Degree", lm, y, bold, 11, black);
          if (e.dates) drawText(e.dates, lm + pw - regular.widthOfTextAtSize(e.dates, 9), y, regular, 9, gray);
          y -= 14;
          if (e.school) { drawText(e.school, lm, y, regular, 10, gray); y -= 14; }
          y -= 6;
        }
      }

      // Skills
      if (skills) {
        y -= 2;
        page.drawLine({ start: { x: lm, y }, end: { x: lm + pw, y }, thickness: 1, color: teal });
        y -= 16;
        drawText("SKILLS", lm, y, bold, 11, teal); y -= 16;
        const lines = wrapText(skills, regular, 10, pw);
        for (const l of lines) { drawText(l, lm, y, regular, 10, gray); y -= 14; }
      }

      const bytes = await doc.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `${name || "resume"}.pdf`; a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
    setGenerating(false);
  };

  const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #E7E5E4", borderRadius: "12px", padding: "20px", marginBottom: "14px" };
  const labelStyle: React.CSSProperties = { display: "block", fontWeight: 600, marginBottom: "4px", color: "#1C1917", fontSize: "13px" };
  const inputStyle: React.CSSProperties = { width: "100%", padding: "8px 12px", border: "1px solid #E7E5E4", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", marginBottom: "10px" };
  const sectionTitle: React.CSSProperties = { fontSize: "15px", fontWeight: 700, color: "#0D9488", marginBottom: "12px" };

  return (
    <>
      <ToolSchema name="Resume Builder" description="Build a professional resume with live preview and download as PDF." slug="resume-builder" category="BusinessApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Business Tools", url: "/#business-tools" }, { name: "Resume Builder", url: "/tools/resume-builder" }]} />
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1C1917", marginBottom: "6px" }}>{t(`tools./tools/resume-builder.name`) !== `tools./tools/resume-builder.name` ? t(`tools./tools/resume-builder.name`) : "Resume Builder"}</h1>
        <p style={{ color: "#78716C", fontSize: "15px", marginBottom: "28px" }}>Fill in your details and download a professional PDF resume.</p>
        <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />
        {error && <div style={{ color: "#dc2626", fontSize: "14px", marginBottom: "16px", padding: "8px 12px", background: "#FEF2F2", borderRadius: "6px" }}>{error}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start" }}>
          {/* Form */}
          <div>
            <div style={cardStyle}>
              <div style={sectionTitle}>Personal Information</div>
              <label style={labelStyle}>Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" style={inputStyle} />
              <label style={labelStyle}>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" style={inputStyle} />
              <label style={labelStyle}>Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555-0100" style={inputStyle} />
              <label style={labelStyle}>Professional Summary</label>
              <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} placeholder="Brief overview of your experience and goals..." style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            <div style={cardStyle}>
              <div style={sectionTitle}>Work Experience</div>
              {work.map((w, i) => (
                <div key={i} style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: i < work.length - 1 ? "1px solid #E7E5E4" : "none" }}>
                  <input value={w.title} onChange={(e) => updateWork(i, "title", e.target.value)} placeholder="Job Title" style={inputStyle} />
                  <input value={w.company} onChange={(e) => updateWork(i, "company", e.target.value)} placeholder="Company Name" style={inputStyle} />
                  <input value={w.dates} onChange={(e) => updateWork(i, "dates", e.target.value)} placeholder="Jan 2020 - Present" style={inputStyle} />
                  <textarea value={w.description} onChange={(e) => updateWork(i, "description", e.target.value)} rows={2} placeholder="Describe your responsibilities and achievements..." style={{ ...inputStyle, resize: "vertical" }} />
                  {work.length > 1 && <button onClick={() => setWork(work.filter((_, j) => j !== i))} style={{ fontSize: "12px", color: "#EF4444", background: "none", border: "none", cursor: "pointer" }}>Remove</button>}
                </div>
              ))}
              <button onClick={() => setWork([...work, { title: "", company: "", dates: "", description: "" }])} style={{ fontSize: "13px", color: "#0D9488", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>+ Add Experience</button>
            </div>

            <div style={cardStyle}>
              <div style={sectionTitle}>Education</div>
              {education.map((e, i) => (
                <div key={i} style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: i < education.length - 1 ? "1px solid #E7E5E4" : "none" }}>
                  <input value={e.degree} onChange={(ev) => updateEdu(i, "degree", ev.target.value)} placeholder="Degree (e.g., B.S. Computer Science)" style={inputStyle} />
                  <input value={e.school} onChange={(ev) => updateEdu(i, "school", ev.target.value)} placeholder="University Name" style={inputStyle} />
                  <input value={e.dates} onChange={(ev) => updateEdu(i, "dates", ev.target.value)} placeholder="2016 - 2020" style={inputStyle} />
                  {education.length > 1 && <button onClick={() => setEducation(education.filter((_, j) => j !== i))} style={{ fontSize: "12px", color: "#EF4444", background: "none", border: "none", cursor: "pointer" }}>Remove</button>}
                </div>
              ))}
              <button onClick={() => setEducation([...education, { degree: "", school: "", dates: "" }])} style={{ fontSize: "13px", color: "#0D9488", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>+ Add Education</button>
            </div>

            <div style={cardStyle}>
              <div style={sectionTitle}>Skills</div>
              <textarea value={skills} onChange={(e) => setSkills(e.target.value)} rows={2} placeholder="JavaScript, React, Project Management, Data Analysis..." style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            <button onClick={generatePdf} disabled={generating} style={{ width: "100%", padding: "12px", background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: generating ? "wait" : "pointer" }}>
              {generating ? "Generating PDF..." : "Download PDF"}
            </button>
          </div>

          {/* Preview */}
          <div style={{ ...cardStyle, position: "sticky", top: "80px" }}>
            <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "11px", lineHeight: "1.5", color: "#333" }}>
              {name && <div style={{ fontSize: "20px", fontWeight: 700, color: "#0D9488", marginBottom: "2px" }}>{name}</div>}
              {(email || phone) && <div style={{ fontSize: "10px", color: "#666", marginBottom: "10px" }}>{[email, phone].filter(Boolean).join("  |  ")}</div>}
              {summary && (
                <>
                  <div style={{ borderTop: "1px solid #0D9488", marginBottom: "8px", paddingTop: "8px", fontWeight: 700, color: "#0D9488", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Summary</div>
                  <div style={{ fontSize: "10px", color: "#555", marginBottom: "10px" }}>{summary}</div>
                </>
              )}
              {work.some(w => w.title || w.company) && (
                <>
                  <div style={{ borderTop: "1px solid #0D9488", marginBottom: "8px", paddingTop: "8px", fontWeight: 700, color: "#0D9488", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Experience</div>
                  {work.filter(w => w.title || w.company).map((w, i) => (
                    <div key={i} style={{ marginBottom: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: 700, fontSize: "11px" }}>{w.title || "Untitled"}</span>
                        <span style={{ fontSize: "9px", color: "#888" }}>{w.dates}</span>
                      </div>
                      {w.company && <div style={{ fontSize: "10px", color: "#666" }}>{w.company}</div>}
                      {w.description && <div style={{ fontSize: "10px", color: "#555", marginTop: "2px" }}>{w.description}</div>}
                    </div>
                  ))}
                </>
              )}
              {education.some(e => e.degree || e.school) && (
                <>
                  <div style={{ borderTop: "1px solid #0D9488", marginBottom: "8px", paddingTop: "8px", fontWeight: 700, color: "#0D9488", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Education</div>
                  {education.filter(e => e.degree || e.school).map((e, i) => (
                    <div key={i} style={{ marginBottom: "6px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: 700, fontSize: "11px" }}>{e.degree || "Degree"}</span>
                        <span style={{ fontSize: "9px", color: "#888" }}>{e.dates}</span>
                      </div>
                      {e.school && <div style={{ fontSize: "10px", color: "#666" }}>{e.school}</div>}
                    </div>
                  ))}
                </>
              )}
              {skills && (
                <>
                  <div style={{ borderTop: "1px solid #0D9488", marginBottom: "8px", paddingTop: "8px", fontWeight: 700, color: "#0D9488", fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Skills</div>
                  <div style={{ fontSize: "10px", color: "#555" }}>{skills}</div>
                </>
              )}
              {!name && !email && !summary && <div style={{ color: "#A8A29E", fontSize: "13px", textAlign: "center", padding: "40px 0" }}>Start filling in the form to see your resume preview here.</div>}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important;}}`}</style>
      </div>
      <SeoContent />
    </>
  );
}
