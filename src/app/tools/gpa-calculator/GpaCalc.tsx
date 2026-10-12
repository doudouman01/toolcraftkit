"use client";
import { useState } from "react";

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

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F": 0.0,
};

const GRADE_OPTIONS = Object.keys(GRADE_POINTS);

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

function getGpaColor(gpa: number) {
  if (gpa >= 3.5) return "#10B981";
  if (gpa >= 3.0) return "#0D9488";
  if (gpa >= 2.5) return "#F59E0B";
  if (gpa >= 2.0) return "#F97316";
  return "#EF4444";
}

function getGpaLabel(gpa: number) {
  if (gpa >= 3.9) return "Summa Cum Laude";
  if (gpa >= 3.7) return "Magna Cum Laude";
  if (gpa >= 3.5) return "Cum Laude";
  if (gpa >= 3.0) return "Dean's List";
  if (gpa >= 2.0) return "Satisfactory";
  return "Below Average";
}

function FAQItem({ q, a, theme }: { q: string; a: string; theme: typeof LIGHT }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${theme.border}`, padding: "13px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left",
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, lineHeight: 1.4, paddingRight: 16 }}>{q}</span>
        <span style={{ fontSize: 18, color: theme.textMuted, flexShrink: 0, transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s ease", lineHeight: 1 }}>+</span>
      </button>
      {open && <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.65, marginTop: 10, marginBottom: 0, paddingRight: 30 }}>{a}</p>}
    </div>
  );
}

export default function GpaCalculator() {
  const [dark] = useState(false);
  const theme = dark ? DARK : LIGHT;
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "", grade: "A", credits: "3" },
    { id: 2, name: "", grade: "A", credits: "3" },
    { id: 3, name: "", grade: "A", credits: "3" },
    { id: 4, name: "", grade: "A", credits: "3" },
  ]);
  let nextId = courses.length + 1;

  const addCourse = () => {
    setCourses([...courses, { id: nextId++, name: "", grade: "A", credits: "3" }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // Calculate GPA
  let totalPoints = 0;
  let totalCredits = 0;
  courses.forEach(c => {
    const cr = parseFloat(c.credits) || 0;
    const gp = GRADE_POINTS[c.grade] ?? 0;
    totalPoints += gp * cr;
    totalCredits += cr;
  });
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  const selectStyle = {
    padding: "8px 10px", fontSize: 14, borderRadius: 8,
    border: `1.5px solid ${theme.border}`, background: theme.inputBg,
    color: theme.text, outline: "none", fontWeight: 500 as const, cursor: "pointer" as const,
  };

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px 60px" }}>
        <div style={{ fontSize: 12, color: theme.textLight, marginBottom: 14, display: "flex", gap: 6, alignItems: "center" }}>
          <a href="/" style={{ color: theme.textMuted, textDecoration: "none" }}>Home</a><span>›</span>
          <a href="/#business-tools" style={{ color: theme.textMuted, textDecoration: "none" }}>Education</a><span>›</span>
          <span style={{ color: theme.primary, fontWeight: 500 }}>GPA Calculator</span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>GPA Calculator</h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Enter your courses, grades, and credit hours to calculate your semester GPA on a 4.0 scale.
          </p>
        </div>

        {/* Course List */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: 24,
          border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
        }}>
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 80px 36px", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted }}>Course Name</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted }}>Grade</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted }}>Credits</span>
            <span />
          </div>

          {courses.map(c => (
            <div key={c.id} style={{ display: "grid", gridTemplateColumns: "1fr 90px 80px 36px", gap: 8, marginBottom: 8, alignItems: "center" }}>
              <input
                type="text" value={c.name} onChange={e => updateCourse(c.id, "name", e.target.value)}
                placeholder="e.g. Math 101"
                style={{
                  padding: "8px 10px", fontSize: 14, borderRadius: 8,
                  border: `1.5px solid ${theme.border}`, background: theme.inputBg,
                  color: theme.text, outline: "none",
                }}
                onFocus={e => e.target.style.borderColor = theme.primary}
                onBlur={e => e.target.style.borderColor = theme.border}
              />
              <select value={c.grade} onChange={e => updateCourse(c.id, "grade", e.target.value)} style={selectStyle}>
                {GRADE_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <input
                type="number" value={c.credits} onChange={e => updateCourse(c.id, "credits", e.target.value)}
                min="0" max="10" style={{
                  padding: "8px 10px", fontSize: 14, borderRadius: 8, width: "100%",
                  border: `1.5px solid ${theme.border}`, background: theme.inputBg,
                  color: theme.text, outline: "none", fontVariantNumeric: "tabular-nums" as const,
                }}
                onFocus={e => e.target.style.borderColor = theme.primary}
                onBlur={e => e.target.style.borderColor = theme.border}
              />
              <button onClick={() => removeCourse(c.id)} style={{
                background: "none", border: "none", cursor: "pointer", fontSize: 18,
                color: theme.textLight, padding: 0, lineHeight: 1,
              }} title="Remove">×</button>
            </div>
          ))}

          <button onClick={addCourse} style={{
            background: theme.surfaceAlt, border: `1.5px dashed ${theme.border}`,
            borderRadius: 8, padding: "10px 16px", fontSize: 14, fontWeight: 600,
            color: theme.primary, cursor: "pointer", width: "100%", marginTop: 8,
          }}>+ Add Course</button>
        </div>

        {/* Results */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: 24,
          border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
        }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 48, fontWeight: 800, color: getGpaColor(gpa), letterSpacing: "-0.04em" }}>
              {gpa.toFixed(2)}
            </div>
            <div style={{
              display: "inline-block", padding: "4px 14px", borderRadius: 20,
              background: getGpaColor(gpa) + "18", color: getGpaColor(gpa),
              fontSize: 14, fontWeight: 600, marginTop: 4,
            }}>
              {getGpaLabel(gpa)}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: theme.surfaceAlt, borderRadius: 8, padding: "12px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>Total Credits</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: theme.text }}>{totalCredits}</div>
            </div>
            <div style={{ background: theme.surfaceAlt, borderRadius: 8, padding: "12px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>Quality Points</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: theme.text }}>{totalPoints.toFixed(1)}</div>
            </div>
          </div>
        </div>

        {/* GPA Scale Reference */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: 24,
          border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 14px", color: theme.text }}>Grade Point Scale</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 6 }}>
            {GRADE_OPTIONS.map(g => (
              <div key={g} style={{
                background: theme.surfaceAlt, borderRadius: 6, padding: "8px",
                textAlign: "center", fontSize: 13,
              }}>
                <div style={{ fontWeight: 700, color: theme.text }}>{g}</div>
                <div style={{ color: theme.textMuted, fontSize: 12 }}>{GRADE_POINTS[g].toFixed(1)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{
          background: theme.surface, borderRadius: 12, padding: 24,
          border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: theme.text }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme} q="What GPA do I need for Dean's List?" a="Most universities require a 3.0 or higher GPA for Dean's List recognition. Some set the bar at 3.5. Check your institution's specific requirements." />
          <FAQItem theme={theme} q="How is cumulative GPA different from semester GPA?" a="Semester GPA covers only the courses in one semester. Cumulative GPA includes all courses across all semesters, weighted by credit hours. This calculator computes a single-semester GPA." />
          <FAQItem theme={theme} q="Do pass/fail courses count toward GPA?" a="In most universities, pass/fail courses do not affect your GPA. Only letter-graded courses are included in the GPA calculation." />
          <FAQItem theme={theme} q="What is a weighted GPA?" a="Some high schools use a weighted GPA scale (up to 5.0) where honors and AP courses earn extra grade points. This calculator uses the standard unweighted 4.0 scale used by most colleges." />
        </div>

        {/* SEO Content */}
        <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>How to Use the GPA Calculator</h2>
          <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>Enter each course you are taking this semester. Select the letter grade you received and the number of credit hours for that course. The calculator instantly computes your GPA on the standard 4.0 scale, along with your total credits and quality points.</p>

          <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Why Your GPA Matters</h2>
          <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>Your GPA affects scholarship eligibility, graduate school admissions, honor society membership, and even job applications. Many employers use GPA as a screening criterion for entry-level positions. Knowing exactly where you stand helps you make strategic decisions about course loads, retakes, and study priorities.</p>

          <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Common Use Cases</h2>
          <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
            <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Students planning their semester course load</li>
            <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Checking eligibility for scholarships and honors</li>
            <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Deciding whether to retake a course</li>
            <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Graduate school application requirements</li>
            <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Academic probation threshold monitoring</li>
          </ul>
          <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "16px", marginTop: "16px" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: theme.primary, marginBottom: "4px" }}>Pro Tip</div>
            <p style={{ fontSize: "14px", lineHeight: "1.6", color: theme.textMuted, margin: 0 }}>
              Use our <a href="/tools/percentage-calculator" style={{ color: theme.primary }}>Percentage Calculator</a> to quickly figure out what grade you need on your final exam to reach your target GPA.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
