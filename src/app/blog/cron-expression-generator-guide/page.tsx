import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cron Expression Generator: Build Cron Jobs Without Memorizing the Syntax | ToolCraftKit",
  description:
    "Build cron expressions visually with presets, human-readable descriptions, and next-run previews. Free online cron job builder — no signup required.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    h3: { fontSize: 16, fontWeight: 600, color: "#1C1917", marginTop: 20, marginBottom: 8 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    ul: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14, paddingLeft: 24 } as const,
    code: { background: "#f5f5f4", padding: "2px 6px", borderRadius: 4, fontSize: 14, fontFamily: "monospace" } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>
          ← Back to Blog
        </Link>

        <h1 style={s.h1}>Cron Expression Generator: Build Cron Jobs Without Memorizing the Syntax</h1>
        <p style={s.meta}>November 25, 2026 · 8 min read</p>

        <p style={s.p}>
          Every developer has been there: you need a database backup to run at 3 AM every Sunday, so you open a terminal and
          try to remember whether the day-of-week field comes before or after the month field. You type something, deploy it,
          then spend the next hour checking logs to see if it actually fires. <strong>Cron expressions</strong> are powerful
          but notoriously unintuitive. A <strong>cron expression generator</strong> lets you build the schedule visually,
          verify it with a human-readable description, and see the next five run times before committing a single line to
          production.
        </p>

        <h2 style={s.h2}>The Five Fields of a Cron Expression</h2>
        <p style={s.p}>
          A standard cron expression consists of five fields, each separated by a space. From left to right:
        </p>
        <ul style={s.ul}>
          <li><strong>Minute</strong> (0–59) — which minute of the hour the job fires.</li>
          <li><strong>Hour</strong> (0–23) — which hour of the day, in 24-hour format.</li>
          <li><strong>Day of month</strong> (1–31) — which calendar day.</li>
          <li><strong>Month</strong> (1–12) — which month of the year.</li>
          <li><strong>Day of week</strong> (0–6, where 0 is Sunday) — which weekday.</li>
        </ul>
        <p style={s.p}>
          Each field accepts a single value, a range (<span style={s.code}>1-5</span>), a list (
          <span style={s.code}>1,3,5</span>), a step (<span style={s.code}>*/15</span> for every 15 units), or an
          asterisk (<span style={s.code}>*</span>) meaning &quot;every.&quot; Combine these and you can express almost
          any recurring schedule — but the combinatorics are exactly what trip people up.
        </p>

        <h2 style={s.h2}>Common Cron Schedules You Will Actually Use</h2>
        <h3 style={s.h3}>Every minute</h3>
        <p style={s.p}>
          <span style={s.code}>* * * * *</span> — Fires every single minute. Used for health checks, queue workers, and
          real-time monitoring scripts. Be careful: this generates 1,440 executions per day. If your job takes longer than
          a minute to complete, you will get overlapping runs.
        </p>
        <h3 style={s.h3}>Every day at midnight</h3>
        <p style={s.p}>
          <span style={s.code}>0 0 * * *</span> — The classic daily cleanup schedule. Database vacuums, log rotation,
          report generation. Midnight in whose timezone, though? That depends on the server&apos;s system clock, which
          is one of the biggest cron pitfalls (more on that below).
        </p>
        <h3 style={s.h3}>Every weekday at 9 AM</h3>
        <p style={s.p}>
          <span style={s.code}>0 9 * * 1-5</span> — Perfect for business-hours tasks: sending daily standup reminders,
          pulling sales reports, or triggering notification digests. The <span style={s.code}>1-5</span> in the
          day-of-week field means Monday through Friday.
        </p>
        <h3 style={s.h3}>Every Sunday at 3 AM</h3>
        <p style={s.p}>
          <span style={s.code}>0 3 * * 0</span> — Weekly maintenance window. Database backups, dependency updates, cache
          warming. Scheduling at 3 AM avoids peak traffic while leaving a buffer before the workday starts.
        </p>
        <h3 style={s.h3}>First day of every month at noon</h3>
        <p style={s.p}>
          <span style={s.code}>0 12 1 * *</span> — Monthly invoice generation, subscription renewal checks, usage
          reports. Noon avoids the midnight congestion when every other cron job on the server fires simultaneously.
        </p>

        <h2 style={s.h2}>Real-World Use Cases</h2>
        <p style={s.p}>
          Cron jobs power more of the internet than most people realize. Here are scenarios where getting the expression
          right matters:
        </p>
        <ul style={s.ul}>
          <li><strong>Automated backups:</strong> A PostgreSQL <span style={s.code}>pg_dump</span> running every 6 hours (<span style={s.code}>0 */6 * * *</span>) keeps recovery points fresh without overwhelming storage.</li>
          <li><strong>Email campaigns:</strong> A drip sequence that sends the next email every Tuesday and Thursday at 10 AM (<span style={s.code}>0 10 * * 2,4</span>) needs pinpoint scheduling to maintain consistency.</li>
          <li><strong>Log cleanup:</strong> Deleting logs older than 30 days every night at 2 AM (<span style={s.code}>0 2 * * *</span>) prevents disk-full outages that bring down production servers.</li>
          <li><strong>SSL certificate renewal:</strong> Running <span style={s.code}>certbot renew</span> twice daily (<span style={s.code}>0 0,12 * * *</span>) per Let&apos;s Encrypt best practices.</li>
          <li><strong>Price scraping:</strong> Fetching competitor prices every 15 minutes during business hours (<span style={s.code}>*/15 9-17 * * 1-5</span>) for a dynamic pricing engine.</li>
        </ul>

        <h2 style={s.h2}>The Three Biggest Cron Pitfalls</h2>
        <p style={s.p}>
          <strong>1. Timezone confusion.</strong> Cron uses the server&apos;s system timezone by default. If your server
          runs in UTC but your users expect jobs to fire in EST, every schedule is off by 5 hours. Some cron
          implementations (like systemd timers) support explicit timezone configuration; others require you to calculate
          the UTC offset manually. Always verify which timezone your cron daemon uses before deploying.
        </p>
        <p style={s.p}>
          <strong>2. Overlapping executions.</strong> If a job takes 90 seconds to complete but is scheduled to run every
          minute, you will have multiple instances running simultaneously. This can corrupt databases, send duplicate
          emails, or max out server resources. Use a lock file or a tool like <span style={s.code}>flock</span> to
          prevent overlap.
        </p>
        <p style={s.p}>
          <strong>3. Day-of-month vs. day-of-week conflicts.</strong> Setting both <span style={s.code}>15</span>{" "}
          (day-of-month) and <span style={s.code}>3</span> (Wednesday) does not mean &quot;the 15th if it falls on a
          Wednesday.&quot; In standard cron, it means the 15th <em>or</em> any Wednesday — a union, not an intersection.
          This catches even experienced developers off guard.
        </p>

        <h2 style={s.h2}>How to Use the Cron Expression Generator</h2>
        <p style={s.p}>
          Open the{" "}
          <Link href="/tools/cron-expression-generator" style={{ color: "#0D9488" }}>
            Cron Expression Generator
          </Link>{" "}
          on ToolCraftKit. Select from common presets or build a custom schedule by choosing values for each field.
          The tool instantly shows a human-readable description of your schedule (&quot;At 03:00 on Sunday&quot;)
          and the next five scheduled run times. Copy the expression and drop it into your crontab, CI/CD pipeline,
          or cloud scheduler.
        </p>
        <p style={s.p}>
          Pair it with the{" "}
          <Link href="/tools/timestamp-converter" style={{ color: "#0D9488" }}>Timestamp Converter</Link>{" "}
          to verify Unix timestamps and the{" "}
          <Link href="/tools/date-calculator" style={{ color: "#0D9488" }}>Date Calculator</Link>{" "}
          to compute intervals. For more developer tools and AI-powered coding assistants, see{" "}
          <a href="https://aigradelab.com/en/blog/best-ai-tools-developers-2026" style={{ color: "#0D9488" }} target="_blank" rel="noopener">AIGradeLab&apos;s Best AI Tools for Developers</a>.
        </p>

        <Link href="/tools/cron-expression-generator" style={s.cta}>
          Build a Cron Expression Now — Free →
        </Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>
        <Footer />
      </div>
    </>
  );
}
