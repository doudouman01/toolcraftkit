"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How the Pregnancy Calculator Works</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Enter the first day of your last menstrual period (LMP). The calculator uses Naegele&apos;s rule &mdash; adding 280 days (40 weeks) to your LMP &mdash; to estimate your due date. It also shows your current week, trimester, and key pregnancy milestones.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Understanding Pregnancy Milestones</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>The timeline highlights important moments: first heartbeat around week 6, anatomy scan and potential gender reveal at week 20, viability milestone at week 24, and full term at week 37. These are approximate milestones based on standard medical references.</p>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Disclaimer</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }}>This calculator provides estimates for informational purposes only. Always consult your healthcare provider for medical advice about your pregnancy.</p>
      </div>
    </section>
  );
}
