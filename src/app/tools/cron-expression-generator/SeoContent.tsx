"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Cron Expression Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Start with a preset for common schedules like every hour, daily, or weekdays. Then fine-tune each field — minute, hour, day of month, month, and day of week — using standard cron syntax. The tool shows a human-readable description of your schedule and calculates the next 5 times it will run. Copy the expression and paste it into your crontab, CI/CD pipeline, or task scheduler.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Cron Expressions Matter</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Cron expressions are the universal language for scheduling automated tasks on Linux servers, CI/CD systems, cloud functions, and container orchestration platforms. Getting the syntax wrong can mean a task runs every minute instead of every month, or never runs at all. A visual builder eliminates those mistakes by showing you exactly what your expression does before you deploy it.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Scheduling database backups on Linux servers</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Setting up CI/CD pipeline triggers in GitHub Actions, GitLab CI, or Jenkins</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Configuring AWS Lambda, Google Cloud Functions, or Azure Functions schedules</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Automating report generation and email sends</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Running cleanup scripts and log rotations on schedule</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Pair your cron schedule with our <a href='/tools/timestamp-converter' style='color:#0D9488'>Timestamp Converter</a> to verify timestamps in logs, or use our <a href='/tools/date-calculator' style='color:#0D9488'>Date Calculator</a> to plan schedules around specific dates.` }} />
      </div>
    </section>
  );
}
