"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const MILESTONES = [
  { week: 6, label: "First Heartbeat", desc: "Baby's heart begins to beat" },
  { week: 12, label: "End of 1st Trimester", desc: "Risk of miscarriage drops significantly" },
  { week: 20, label: "Anatomy Scan / Gender Reveal", desc: "Detailed ultrasound, may learn sex" },
  { week: 24, label: "Viability Milestone", desc: "Baby could survive outside the womb with medical help" },
  { week: 28, label: "3rd Trimester Begins", desc: "Baby is growing rapidly" },
  { week: 37, label: "Full Term", desc: "Baby is considered early term" },
  { week: 40, label: "Due Date", desc: "Estimated delivery date" },
];

function getTrimester(week: number): string {
  if (week <= 13) return "1st Trimester";
  if (week <= 26) return "2nd Trimester";
  return "3rd Trimester";
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [lmp, setLmp] = useState("");
  const [result, setResult] = useState<{
    dueDate: Date;
    currentWeek: number;
    currentDay: number;
    trimester: string;
    daysLeft: number;
    progressPercent: number;
  } | null>(null);

  const calculate = () => {
    if (!lmp) return;
    const lmpDate = new Date(lmp + "T00:00:00");
    const dueDate = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const diffMs = now.getTime() - lmpDate.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(totalDays / 7);
    const currentDay = totalDays % 7;
    const daysLeft = Math.max(0, Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    const progressPercent = Math.min(100, Math.max(0, (totalDays / 280) * 100));

    setResult({
      dueDate,
      currentWeek,
      currentDay,
      trimester: getTrimester(currentWeek),
      daysLeft,
      progressPercent,
    });
  };

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #E7E5E4",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "16px",
  };

  return (
    <>
      <ToolSchema name="Pregnancy Calculator" description="Calculate due date, current week, trimester, and milestones from your last menstrual period." slug="pregnancy-calculator" category="HealthApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Health & Fitness Tools", url: "/#health-&-fitness-tools" }, { name: "Pregnancy Calculator", url: "/tools/pregnancy-calculator" }]} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1C1917", marginBottom: "6px" }}>{t(`tools./tools/pregnancy-calculator.name`) !== `tools./tools/pregnancy-calculator.name` ? t(`tools./tools/pregnancy-calculator.name`) : "Pregnancy Calculator"}</h1>
        <p style={{ color: "#78716C", fontSize: "15px", marginBottom: "28px" }}>Calculate your due date, current week, trimester, and key milestones.</p>

        <div style={cardStyle}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: "8px", color: "#1C1917", fontSize: "14px" }}>First Day of Last Menstrual Period (LMP)</label>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <input
              type="date"
              value={lmp}
              onChange={(e) => setLmp(e.target.value)}
              style={{ padding: "10px 14px", border: "1px solid #E7E5E4", borderRadius: "8px", fontSize: "15px", flex: "1", minWidth: "200px" }}
            />
            <button
              onClick={calculate}
              style={{ padding: "10px 28px", background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}
            >
              Calculate
            </button>
          </div>
        </div>

        {result && (
          <>
            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", marginBottom: "20px" }}>
              <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "13px", color: "#78716C", marginBottom: "4px" }}>Due Date</div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#0D9488" }}>{formatDate(result.dueDate)}</div>
              </div>
              <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "13px", color: "#78716C", marginBottom: "4px" }}>Current Week</div>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#0D9488" }}>Week {result.currentWeek}</div>
                <div style={{ fontSize: "12px", color: "#78716C" }}>Day {result.currentDay}</div>
              </div>
              <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "13px", color: "#78716C", marginBottom: "4px" }}>Trimester</div>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#0D9488" }}>{result.trimester}</div>
              </div>
              <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "13px", color: "#78716C", marginBottom: "4px" }}>Countdown</div>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#0D9488" }}>{result.daysLeft}</div>
                <div style={{ fontSize: "12px", color: "#78716C" }}>days to go</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={cardStyle}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#1C1917", marginBottom: "8px" }}>Pregnancy Progress</div>
              <div style={{ background: "#E7E5E4", borderRadius: "8px", height: "16px", overflow: "hidden" }}>
                <div style={{ width: `${result.progressPercent}%`, height: "100%", background: "linear-gradient(90deg, #0D9488, #14B8A6)", borderRadius: "8px", transition: "width 0.5s" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#78716C", marginTop: "4px" }}>
                <span>Week 0</span>
                <span>{result.progressPercent.toFixed(0)}%</span>
                <span>Week 40</span>
              </div>
            </div>

            {/* Milestones Timeline */}
            <div style={cardStyle}>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#1C1917", marginBottom: "16px" }}>Key Milestones</div>
              {MILESTONES.map((m, i) => {
                const passed = result.currentWeek >= m.week;
                return (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: i < MILESTONES.length - 1 ? "16px" : "0", position: "relative" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: passed ? "#0D9488" : "#E7E5E4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "14px", color: passed ? "#fff" : "#78716C" }}>
                      {passed ? "✓" : i + 1}
                    </div>
                    {i < MILESTONES.length - 1 && (
                      <div style={{ position: "absolute", left: "13px", top: "32px", width: "2px", height: "calc(100% - 16px)", background: passed ? "#0D9488" : "#E7E5E4" }} />
                    )}
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "14px", color: passed ? "#0D9488" : "#1C1917" }}>Week {m.week} &mdash; {m.label}</div>
                      <div style={{ fontSize: "13px", color: "#78716C" }}>{m.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <SeoContent />
    </>
  );
}
