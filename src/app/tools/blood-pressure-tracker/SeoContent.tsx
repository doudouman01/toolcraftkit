"use client";
export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Blood Pressure Tracker</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Enter your systolic and diastolic readings along with your pulse. The tracker automatically classifies each reading using American Heart Association (AHA) guidelines: Normal, Elevated, High Stage 1, High Stage 2, or Hypertensive Crisis. View your trend chart to spot patterns, check your averages, and export your full history as a CSV file for your doctor.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Track Blood Pressure at Home</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Home blood pressure monitoring provides a more accurate picture of your cardiovascular health than occasional office readings. White-coat hypertension (higher readings at the doctor's office) affects up to 30% of patients. Regular home tracking helps you and your doctor make better treatment decisions based on consistent, real-world data.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Patients monitoring hypertension treatment effectiveness</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>People tracking the impact of lifestyle changes on blood pressure</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Pregnant women monitoring for preeclampsia signs</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Athletes tracking cardiovascular health metrics over time</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Combine blood pressure tracking with our <a href='/tools/bmi-calculator' style='color:#0D9488'>BMI Calculator</a> and <a href='/tools/body-fat-calculator' style='color:#0D9488'>Body Fat Calculator</a> for a complete picture of your cardiovascular health indicators.` }} />
      </div>
    </section>
  );
}
