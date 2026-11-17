import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Resume Builder: Tips for a Professional Resume in 2026",
  description: "Build a professional resume for free with expert tips on formatting, content, and ATS optimization. Learn what hiring managers look for in 2026.",
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
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>Free Resume Builder: Tips for a Professional Resume in 2026</h1>
        <p style={s.meta}>November 2026 · 6 min read</p>

        <p style={s.p}>Your resume has about seven seconds to make an impression. In a competitive job market, a well-structured, clearly written resume is not optional — it&apos;s the price of entry. Whether you&apos;re job hunting for the first time or updating your resume after years at the same company, these principles will help you create a document that gets interviews.</p>

        <h2 style={s.h2}>Choosing the Right Resume Format</h2>
        <p style={s.p}>The three main formats serve different situations. Chronological resumes list your work history from most recent to oldest — this is the standard choice and what most hiring managers expect. Functional resumes emphasize skills over job history, which can help career changers but raises red flags for some recruiters. Combination resumes lead with a skills section followed by chronological work history, offering the best of both approaches. For most job seekers, the chronological format is the safest and most effective choice.</p>

        <h2 style={s.h2}>Writing Effective Bullet Points</h2>
        <p style={s.p}>The most common resume mistake is listing job duties instead of accomplishments. &quot;Managed social media accounts&quot; tells a hiring manager nothing about your impact. &quot;Grew Instagram following from 5,000 to 25,000 in 8 months through targeted content strategy&quot; tells a compelling story. Use the formula: action verb + what you did + measurable result. Start each bullet with a strong verb — led, created, reduced, increased, launched, optimized. Quantify results whenever possible with numbers, percentages, or dollar amounts.</p>

        <h2 style={s.h2}>Optimizing for Applicant Tracking Systems</h2>
        <p style={s.p}>Most large companies use ATS software to screen resumes before a human ever sees them. To pass this initial filter, use standard section headings like &quot;Work Experience,&quot; &quot;Education,&quot; and &quot;Skills.&quot; Include keywords from the job description naturally throughout your resume. Avoid tables, columns, headers, footers, and graphics that ATS software may not parse correctly. Use a standard font and save as PDF unless the posting specifically requests a different format. Keep the formatting clean and simple — creativity belongs in your portfolio, not your resume layout.</p>

        <h2 style={s.h2}>What to Include (and What to Leave Out)</h2>
        <p style={s.p}>Include your contact information (name, phone, email, LinkedIn, city and state), a brief professional summary, relevant work experience, education, and skills. Leave out your physical address, a photo (in the US and Canada), references, an objective statement (use a summary instead), and any experience older than 10 to 15 years unless it&apos;s directly relevant. For recent graduates, include relevant coursework, projects, internships, and leadership roles. Keep it to one page if you have fewer than 10 years of experience; two pages maximum for senior professionals.</p>

        <h2 style={s.h2}>Build Your Resume Now</h2>
        <p style={s.p}>Our free <Link href="/tools/resume-builder" style={{ color: "#0D9488" }}>Resume Builder</Link> helps you create a professional, ATS-friendly resume in minutes. Choose a clean template, fill in your details, and download a polished PDF — no account or payment required.</p>
        <Link href="/tools/resume-builder" style={s.cta}>Open Resume Builder →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Before submitting, run your resume through our <Link href="/tools/ats-resume-checker" style={{ color: "#0D9488" }}>ATS Resume Checker</Link> to see how well it matches the job description. Need a matching signature for your cover letter? Use our <Link href="/tools/signature-generator" style={{ color: "#0D9488" }}>Signature Generator</Link>.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
