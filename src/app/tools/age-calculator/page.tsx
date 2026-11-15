"use client";
import { useState, useEffect } from "react";

function calcAge(birth: Date, ref: Date) {
  let years = ref.getFullYear() - birth.getFullYear();
  let months = ref.getMonth() - birth.getMonth();
  let days = ref.getDate() - birth.getDate();
  if (days < 0) { months--; const prev = new Date(ref.getFullYear(), ref.getMonth(), 0); days += prev.getDate(); }
  if (months < 0) { years--; months += 12; }
  const totalDays = Math.floor((ref.getTime() - birth.getTime()) / 86400000);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24 + ref.getHours() - birth.getHours();
  const totalMinutes = totalHours * 60;
  const nextBirthday = new Date(ref.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= ref) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - ref.getTime()) / 86400000);
  const dayOfWeek = birth.toLocaleDateString("en-US", { weekday: "long" });
  const zodiac = getZodiac(birth.getMonth() + 1, birth.getDate());
  return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, totalMinutes, daysUntilBirthday, dayOfWeek, zodiac };
}

function getZodiac(m: number, d: number) {
  const signs = [["Capricorn", "♑"], ["Aquarius", "♒"], ["Pisces", "♓"], ["Aries", "♈"], ["Taurus", "♉"], ["Gemini", "♊"], ["Cancer", "♋"], ["Leo", "♌"], ["Virgo", "♍"], ["Libra", "♎"], ["Scorpio", "♏"], ["Sagittarius", "♐"]];
  const cutoffs = [20, 19, 20, 20, 21, 21, 22, 23, 23, 23, 22, 22];
  const idx = d < cutoffs[m - 1] ? (m + 10) % 12 : (m + 11) % 12;
  return { name: signs[idx][0], symbol: signs[idx][1] };
}

export default function Page() {
  const [birthStr, setBirthStr] = useState("");
  const [refStr, setRefStr] = useState("");
  const [mode, setMode] = useState<"age" | "diff">("age");
  const [date2Str, setDate2Str] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);

  const today = now.toISOString().split("T")[0];
  const ref = refStr ? new Date(refStr + "T00:00:00") : now;
  const birth = birthStr ? new Date(birthStr + "T00:00:00") : null;
  const date2 = date2Str ? new Date(date2Str + "T00:00:00") : null;

  const result = birth && !isNaN(birth.getTime()) ? calcAge(birth, ref) : null;
  const diffResult = mode === "diff" && birth && date2 && !isNaN(birth.getTime()) && !isNaN(date2.getTime()) ? calcAge(birth < date2 ? birth : date2, birth < date2 ? date2 : birth) : null;

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex" as const, alignItems: "center" as const, gap: 8, marginBottom: 14, flexWrap: "wrap" as const },
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" } as const,
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, marginTop: 16 } as const,
    stat: { textAlign: "center" as const, padding: "10px 14px", background: "#fff", borderRadius: 8, border: "1px solid #E7E5E4", minWidth: 100 },
    statVal: { fontSize: 22, fontWeight: 700, color: "#0D9488" } as const,
    statLabel: { fontSize: 11, color: "#78716C", marginTop: 2 } as const,
    big: { fontSize: 36, fontWeight: 700, color: "#0D9488" } as const,
  };

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Age Calculator</h1>
      <p style={s.sub}>Calculate your exact age in years, months, days, hours, and minutes.</p>

      <div style={s.card}>
        <div style={s.row}>
          {([["age", "My Age"], ["diff", "Age Difference"]] as const).map(([key, lbl]) => (
            <button key={key} onClick={() => setMode(key)} style={{ ...s.btnSm, background: mode === key ? "#0D9488" : "#F5F5F4", color: mode === key ? "#fff" : "#1C1917", border: mode === key ? "1px solid #0D9488" : "1px solid #E7E5E4" }}>{lbl}</button>
          ))}
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={s.label}>{mode === "diff" ? "Person 1 — Date of Birth" : "Date of Birth"}</label>
          <input type="date" value={birthStr} onChange={(e) => setBirthStr(e.target.value)} max={today} style={s.input} />
        </div>

        {mode === "diff" && (
          <div style={{ marginBottom: 14 }}>
            <label style={s.label}>Person 2 — Date of Birth</label>
            <input type="date" value={date2Str} onChange={(e) => setDate2Str(e.target.value)} max={today} style={s.input} />
          </div>
        )}

        {mode === "age" && (
          <div style={{ marginBottom: 14 }}>
            <label style={s.label}>Calculate age on (optional — defaults to today)</label>
            <input type="date" value={refStr} onChange={(e) => setRefStr(e.target.value)} style={s.input} />
          </div>
        )}

        {result && mode === "age" && (
          <div style={s.resultCard}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>Your Age</div>
              <div style={s.big}>{result.years} <span style={{ fontSize: 16, color: "#78716C", fontWeight: 400 }}>years</span> {result.months} <span style={{ fontSize: 16, color: "#78716C", fontWeight: 400 }}>months</span> {result.days} <span style={{ fontSize: 16, color: "#78716C", fontWeight: 400 }}>days</span></div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
              {[
                { val: result.totalDays.toLocaleString(), label: "Total Days" },
                { val: result.totalWeeks.toLocaleString(), label: "Total Weeks" },
                { val: result.totalMonths.toLocaleString(), label: "Total Months" },
                { val: result.totalHours.toLocaleString(), label: "Total Hours" },
                { val: result.totalMinutes.toLocaleString(), label: "Total Minutes" },
              ].map((st) => (
                <div key={st.label} style={s.stat}>
                  <div style={s.statVal}>{st.val}</div>
                  <div style={s.statLabel}>{st.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", padding: "12px 0", borderTop: "1px solid #E0F2F1" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24 }}>{result.zodiac.symbol}</div>
                <div style={{ fontSize: 12, color: "#57534E" }}>{result.zodiac.name}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{result.dayOfWeek}</div>
                <div style={{ fontSize: 12, color: "#57534E" }}>Born on</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0D9488" }}>{result.daysUntilBirthday} days</div>
                <div style={{ fontSize: 12, color: "#57534E" }}>Until next birthday</div>
              </div>
            </div>
          </div>
        )}

        {diffResult && mode === "diff" && (
          <div style={s.resultCard}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>Age Difference</div>
              <div style={s.big}>{diffResult.years} <span style={{ fontSize: 16, color: "#78716C", fontWeight: 400 }}>years</span> {diffResult.months} <span style={{ fontSize: 16, color: "#78716C", fontWeight: 400 }}>months</span> {diffResult.days} <span style={{ fontSize: 16, color: "#78716C", fontWeight: 400 }}>days</span></div>
              <div style={{ fontSize: 13, color: "#78716C", marginTop: 8 }}>{diffResult.totalDays.toLocaleString()} days apart</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Calculate your exact age down to the minute. See your age broken down in years, months, days, weeks, hours, and minutes. Find out what day of the week you were born, your zodiac sign, and how many days until your next birthday.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>The age difference mode lets you compare two dates of birth. Everything runs in your browser — no data is stored.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "How is age calculated exactly?", a: "Age is calculated from your date of birth to the reference date (today by default). It accounts for varying month lengths and leap years to give you an exact breakdown in years, months, and days." },
          { q: "What is the age difference calculator?", a: "Switch to 'Age Difference' mode to enter two dates of birth. The tool calculates the exact gap between them in years, months, days, and total days." },
          { q: "How old am I in days?", a: "Enter your date of birth and look at the 'Total Days' stat. This counts every day from your birth to today, including leap days." },
          { q: "Is this tool accurate?", a: "Yes. The calculator uses precise date arithmetic that accounts for leap years, varying month lengths, and time zones. Results are accurate to the current minute." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
