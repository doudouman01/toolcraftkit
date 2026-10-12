import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Calculator Guide — How to Count Days, Business Days & Date Math | ToolCraftKit",
  description: "Learn how to calculate days between dates, add or subtract days, count business days, and handle date math for deadlines, contracts, and project planning.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>&larr; Back to Blog</Link>
        <h1 style={s.h1}>Date Calculator Guide: Days Between Dates, Business Days & Date Math</h1>
        <p style={s.meta}>October 4, 2026 &middot; 5 min read</p>

        <p style={s.p}>Whether you are tracking a project deadline, counting down to an event, or calculating a contract period, date math comes up more often than most people expect. Counting days by hand across months with different lengths and leap years is tedious and error-prone. A date calculator handles all of it instantly.</p>

        <h2 style={s.h2}>How to Calculate the Number of Days Between Two Dates</h2>
        <p style={s.p}>The most common date calculation is finding the gap between two dates. This sounds straightforward, but months have 28, 29, 30, or 31 days, and leap years add another layer of complexity. A reliable date calculator accounts for all of these edge cases and gives you the difference in days, weeks, months, and years at once.</p>
        <p style={s.p}>Common scenarios include counting how many days remain until a deadline, how many weeks are left in a school semester, or how long a rental agreement has been active. Having both calendar days and the year/month/day breakdown at a glance saves time and avoids mistakes.</p>

        <h2 style={s.h2}>Understanding Business Days vs. Calendar Days</h2>
        <p style={s.p}>Contracts, SLAs, legal notices, and shipping estimates often specify business days rather than calendar days. Business days exclude weekends (Saturday and Sunday), which means a 10-business-day deadline is actually 14 calendar days at minimum. Getting this distinction wrong can lead to missed deadlines, compliance issues, or incorrect invoicing.</p>
        <p style={s.p}>Keep in mind that public holidays are not universally standardized. Most online calculators, including ours, count Monday through Friday as business days without subtracting holidays, since holidays vary by country, state, and even employer. When a contract specifies business days, check whether your jurisdiction excludes public holidays as well.</p>

        <h2 style={s.h2}>Adding and Subtracting Days from a Date</h2>
        <p style={s.p}>Need to know what date falls 90 days from today? Or 45 days before a deadline? Adding or subtracting days from a date is essential for calculating due dates, warranty expirations, notice periods, probation end dates, and delivery windows. The tricky part is that the result can land in a different month or even a different year, and manual counting across February is a common source of errors.</p>
        <p style={s.p}>A date calculator handles the arithmetic instantly. Enter any starting date, specify the number of days to add or subtract, and get the exact resulting date with the day of the week included.</p>

        <h2 style={s.h2}>Finding the Day of the Week for Any Date</h2>
        <p style={s.p}>What day of the week were you born on? What day will December 25 fall on next year? Knowing the day of the week for a specific date is useful for event planning, scheduling, and simple curiosity. The day-of-week tab also shows the week number and whether the date falls on a weekend or a weekday, making it a quick reference for calendar planning.</p>

        <h2 style={s.h2}>Practical Examples of Date Calculations</h2>
        <p style={s.p}>Here are real-world scenarios where a date calculator saves you time and headaches:</p>
        <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
          <li style={s.p}>A freelancer calculating the exact number of days worked in a billing period.</li>
          <li style={s.p}>An HR manager determining how many business days an employee has been on probation.</li>
          <li style={s.p}>A tenant figuring out when a 60-day notice period ends.</li>
          <li style={s.p}>A student counting the days until finals.</li>
          <li style={s.p}>A project manager calculating the delivery date when given a 120-business-day timeline.</li>
        </ul>

        <h2 style={s.h2}>Try the Free Date Calculator</h2>
        <p style={s.p}>Our Date Calculator runs entirely in your browser with no sign-up required. Calculate days between dates, add or subtract days, find the day of the week, and see business day counts instantly.</p>
        <Link href="/tools/date-calculator" style={s.cta}>Open Date Calculator &rarr;</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Looking for age-specific calculations? Our <Link href="/tools/age-calculator" style={{ color: "#0D9488" }}>Age Calculator</Link> gives you exact age breakdowns in years, months, days, hours, and minutes, along with zodiac signs and birthday countdowns.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
