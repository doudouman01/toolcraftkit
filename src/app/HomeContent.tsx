"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/useTranslation";

const tools: { category: string; color: string; items: { name: string; desc: string; href: string; hot?: boolean; premium?: boolean }[] }[] = [
  {
    category: "Text Tools",
    color: "#0D9488",
    items: [
      { name: "Word Counter", desc: "Count words, characters, sentences. Reading time & keyword density.", href: "/tools/word-counter", hot: true },
      { name: "Character Counter", desc: "Count characters with & without spaces. Platform limit checker.", href: "/tools/character-counter", hot: true },
      { name: "Text Case Converter", desc: "Convert between UPPERCASE, lowercase, Title Case, camelCase, and 10+ formats.", href: "/tools/text-case-converter" },
      { name: "Lorem Ipsum Generator", desc: "Generate placeholder text. Paragraphs, sentences, words, or lists.", href: "/tools/lorem-ipsum-generator" },
      { name: "Markdown to HTML", desc: "Convert Markdown to clean HTML. Live preview, copy, or download.", href: "/tools/markdown-to-html" },
      { name: "Remove Duplicate Lines", desc: "Remove duplicate lines from text. Keep only unique entries, sort, trim.", href: "/tools/remove-duplicates" },
      { name: "Words to Pages", desc: "Estimate how many pages your word count fills. Font size, spacing, presets.", href: "/tools/words-to-pages", hot: true },
      { name: "Text Compare", desc: "Compare two texts side by side. Find differences instantly. Line-by-line diff.", href: "/tools/text-compare", hot: true },
      { name: "Emoji Picker", desc: "Browse and copy emojis instantly. 1000+ emojis organized by category.", href: "/tools/emoji-picker", hot: true },
      { name: "Markdown Editor", desc: "Write Markdown with live preview. Toolbar, split view, and export.", href: "/tools/markdown-editor" },
      { name: "Fancy Font Generator", desc: "Generate fancy text in 15+ Unicode styles. Bold, script, fraktur, and more.", href: "/tools/font-generator", hot: true },
      { name: "Text Encryption", desc: "Encrypt and decrypt text with a password using AES-GCM. 100% client-side.", href: "/tools/text-encryption" },
    ],
  },
  {
    category: "Writing Tools",
    color: "#8B5CF6",
    items: [
      { name: "Readability Score Checker", desc: "Check Flesch, Gunning Fog, and Coleman-Liau scores. Write for your audience.", href: "/tools/readability-score", hot: true },
      { name: "AI Content Detector", desc: "Analyze text for AI-generated patterns. Sentence-level highlighting.", href: "/tools/ai-content-detector", premium: true },
      { name: "Paraphrasing Tool", desc: "Rephrase text in 4 modes: standard, formal, simple, creative.", href: "/tools/paraphrasing-tool", premium: true },
      { name: "AI Prompt Generator", desc: "Generate structured AI prompts for writing, coding, marketing, research.", href: "/tools/ai-prompt-generator", hot: true },
      { name: "AI Content Rewriter", desc: "Rewrite text in 5 modes: simplify, formal, casual, shorten, expand.", href: "/tools/ai-content-rewriter", premium: true },
    ],
  },
  {
    category: "Business Tools",
    color: "#F59E0B",
    items: [
      { name: "Percentage Calculator", desc: "Six calculators for every percentage problem. Discounts, tips, changes.", href: "/tools/percentage-calculator", hot: true },
      { name: "Profit Margin Calculator", desc: "Calculate margin, markup, and revenue from costs. Visual breakdown.", href: "/tools/profit-margin-calculator" },
      { name: "Discount Calculator", desc: "Calculate sale prices, savings, and reverse-calculate discounts. With tax.", href: "/tools/discount-calculator", hot: true },
      { name: "ROI Calculator", desc: "Calculate return on investment, net profit, and annualized CAGR.", href: "/tools/roi-calculator" },
      { name: "Loan Calculator", desc: "Monthly payments, total interest, amortization schedule. Mortgages & loans.", href: "/tools/loan-calculator", hot: true },
      { name: "Invoice Generator", desc: "Create professional invoices instantly. Print or save as PDF. Free.", href: "/tools/invoice-generator", hot: true },
      { name: "Compound Interest Calculator", desc: "See how your money grows with compound interest and monthly contributions.", href: "/tools/compound-interest", hot: true },
      { name: "Mortgage Calculator", desc: "Estimate monthly payments with taxes, insurance, and amortization schedule.", href: "/tools/mortgage-calculator", hot: true },
      { name: "Salary Calculator", desc: "Convert annual salary to hourly rate and back. Monthly, weekly, daily breakdown.", href: "/tools/salary-calculator" },
      { name: "Income Tax Calculator", desc: "Estimate federal income tax. US, Canada, and UK brackets with breakdown.", href: "/tools/tax-calculator", hot: true },
      { name: "Tip Calculator", desc: "Calculate tip amount, split the bill, and compare tip percentages.", href: "/tools/tip-calculator" },
      { name: "Email Signature Generator", desc: "Create a professional email signature. Copy and paste into Gmail or Outlook.", href: "/tools/email-signature-generator", hot: true },
      { name: "Barcode Generator", desc: "Generate barcodes in CODE128, EAN-13, UPC, CODE39. Download as PNG.", href: "/tools/barcode-generator", hot: true },
      { name: "Date Calculator", desc: "Days between dates, add/subtract days, find day of week.", href: "/tools/date-calculator" },
      { name: "Countdown Timer", desc: "Visual countdown with presets. Work sessions, cooking, meetings.", href: "/tools/countdown-timer" },
      { name: "ATS Resume Checker", desc: "Check your resume against job descriptions. Keyword matching & score.", href: "/tools/ats-resume-checker", premium: true },
      { name: "Paycheck Calculator", desc: "Estimate take-home pay. Federal tax, state tax, Social Security, Medicare.", href: "/tools/paycheck-calculator", hot: true },
      { name: "Business Name Generator", desc: "Generate 20+ creative business name ideas from keywords. Five styles.", href: "/tools/business-name-generator", hot: true },
      { name: "Signature Generator", desc: "Draw or type your signature. Download as PNG or JPG. No signup.", href: "/tools/signature-generator", hot: true },
      { name: "Resume Builder", desc: "Build a professional resume with live preview. Download as PDF. Free.", href: "/tools/resume-builder", hot: true },
    ],
  },
  {
    category: "Converter Tools",
    color: "#6366F1",
    items: [
      { name: "Unit Converter", desc: "Convert between 60+ units. Length, weight, temperature, and more.", href: "/tools/unit-converter", hot: true },
      { name: "Temperature Converter", desc: "Convert between Celsius, Fahrenheit, and Kelvin. See formulas and results instantly.", href: "/tools/temperature-converter", hot: true },
      { name: "Base64 Encoder/Decoder", desc: "Encode text to Base64 or decode Base64 to text instantly.", href: "/tools/base64" },
      { name: "URL Encoder/Decoder", desc: "Encode or decode URLs and query strings. Component or full URI mode.", href: "/tools/url-encoder", hot: true },
      { name: "Timestamp Converter", desc: "Convert Unix timestamps to dates and back. Live clock, multiple formats.", href: "/tools/timestamp-converter" },
      { name: "JSON / CSV Converter", desc: "Convert between JSON and CSV formats. Paste or upload, instant conversion.", href: "/tools/json-csv-converter", hot: true },
      { name: "JSON to YAML", desc: "Convert between JSON and YAML formats. Syntax highlighting, copy output.", href: "/tools/json-to-yaml" },
      { name: "Text to Speech", desc: "Convert text to natural speech audio. Multiple voices and languages.", href: "/tools/text-to-speech", hot: true },
      { name: "HEIC to JPG Converter", desc: "Convert HEIC/HEIF images to JPEG. Adjustable quality, batch support.", href: "/tools/heic-to-jpg", hot: true },
      { name: "Currency Converter", desc: "Convert between 30+ world currencies. Instant rates, swap button.", href: "/tools/currency-converter", hot: true },
      { name: "Audio Converter", desc: "Convert audio files between WAV, OGG, WEBM, M4A formats. 100% client-side.", href: "/tools/audio-converter", hot: true },
    ],
  },
  {
    category: "Image Tools",
    color: "#8B5CF6",
    items: [
      { name: "Image Compressor", desc: "Compress images without losing quality. JPEG, PNG, WebP. Free.", href: "/tools/image-compressor", hot: true },
      { name: "Image Resizer", desc: "Resize images to exact dimensions. Social media presets included.", href: "/tools/image-resizer", hot: true },
      { name: "Hex to RGB Converter", desc: "Convert colors between HEX, RGB, HSL, CMYK. Contrast checker & palettes.", href: "/tools/hex-to-rgb" },
      { name: "Color Palette Generator", desc: "Generate harmonious palettes from any color. 6 modes, CSS export.", href: "/tools/color-palette", hot: true },
      { name: "Color Picker", desc: "Pick any color, get HEX, RGB, HSL values. Shades and tints generator.", href: "/tools/color-picker", hot: true },
      { name: "Color Picker Advanced", desc: "HSL color wheel, HEX/RGB/HSL/CMYK values, gradient generator, color history.", href: "/tools/color-picker-advanced" },
      { name: "Aspect Ratio Calculator", desc: "Calculate ratios for images & video. Presets for social media and film.", href: "/tools/aspect-ratio-calculator" },
      { name: "Image Cropper", desc: "Crop images with precision. Freeform or fixed aspect ratio presets.", href: "/tools/image-cropper", hot: true },
      { name: "Image Format Converter", desc: "Convert images between PNG, JPEG, WebP, BMP, GIF formats instantly.", href: "/tools/image-format-converter", hot: true },
      { name: "Background Remover", desc: "Remove image backgrounds instantly. AI-powered, transparent PNG output.", href: "/tools/background-remover", hot: true },
      { name: "Image Upscaler", desc: "Upscale images 2x or 4x with AI. Enhance resolution without losing quality.", href: "/tools/image-upscaler", hot: true },
      { name: "Bulk Image Processor", desc: "Resize, compress, convert multiple images at once.", href: "/tools/bulk-image-processor", premium: true },
      { name: "Meme Generator", desc: "Create memes with custom text on any image. Download as PNG.", href: "/tools/meme-generator", hot: true },
      { name: "Video to GIF", desc: "Extract frames from video. Set frame rate, preview animation, download PNGs.", href: "/tools/video-to-gif", hot: true },
      { name: "SVG to PNG", desc: "Convert SVG to high-quality PNG. Custom size, 1x-4x scale, transparent bg.", href: "/tools/svg-to-png", hot: true },
      { name: "Image Watermark", desc: "Add text watermarks to images. Customize font, color, opacity, position.", href: "/tools/image-watermark", hot: true },
    ],
  },
  {
    category: "PDF Tools",
    color: "#DC2626",
    items: [
      { name: "PDF Merge", desc: "Combine multiple PDF files into one document. Reorder pages before merging.", href: "/tools/pdf-merge", hot: true },
      { name: "PDF Compressor", desc: "Reduce PDF file size without losing quality. No upload to server.", href: "/tools/pdf-compressor", hot: true },
      { name: "Image to PDF", desc: "Convert multiple images into a single PDF document. Free, no upload.", href: "/tools/image-to-pdf", hot: true },
      { name: "Text to PDF", desc: "Convert plain text into a formatted, downloadable PDF document.", href: "/tools/text-to-pdf" },
      { name: "PDF to Word", desc: "Convert PDF files to editable Word documents (.docx). Preserves text structure.", href: "/tools/pdf-to-word", hot: true },
      { name: "PDF Split", desc: "Split PDF files into individual pages or extract page ranges. Free.", href: "/tools/pdf-split", hot: true },
      { name: "Word to PDF", desc: "Convert text content with formatting to a downloadable PDF document.", href: "/tools/word-to-pdf", hot: true },
      { name: "Markdown to PDF", desc: "Convert Markdown to PDF with live preview. Headers, lists, code blocks.", href: "/tools/markdown-to-pdf", hot: true },
    ],
  },
  {
    category: "Developer Tools",
    color: "#EF4444",
    items: [
      { name: "JSON Formatter", desc: "Format, validate & minify JSON. Syntax highlighting & structure stats.", href: "/tools/json-formatter" },
      { name: "Password Generator", desc: "Generate strong random passwords. Customizable length and characters.", href: "/tools/password-generator", hot: true },
      { name: "Regex Tester", desc: "Test regular expressions with live highlighting, presets, and replace mode.", href: "/tools/regex-tester", hot: true },
      { name: "QR Code Generator", desc: "Generate QR codes for URLs, WiFi, email, phone. Custom colors, download PNG.", href: "/tools/qr-code-generator", hot: true },
      { name: "QR Code Scanner", desc: "Upload an image with a QR code and decode it instantly. Copy result.", href: "/tools/qr-code-scanner" },
      { name: "Random Number Generator", desc: "Random numbers, dice roller, list picker, coin flip. 4 modes.", href: "/tools/random-number-generator", hot: true },
      { name: "CSS Gradient Generator", desc: "Create beautiful CSS gradients. Linear and radial with live preview and presets.", href: "/tools/css-gradient-generator", hot: true },
      { name: "Favicon Generator", desc: "Create favicons from text or emoji. Download 16px, 32px, 180px, 512px.", href: "/tools/favicon-generator", hot: true },
      { name: "Color Contrast Checker", desc: "Check WCAG AA/AAA contrast ratios. Ensure accessible text and backgrounds.", href: "/tools/color-contrast-checker" },
      { name: "JSON-LD Generator", desc: "Generate structured data markup for SEO. Schema.org ready.", href: "/tools/json-ld-generator" },
      { name: "Image to Base64", desc: "Convert images to Base64 strings. Data URI, copy, size comparison.", href: "/tools/image-to-base64", hot: true },
      { name: "Code Formatter", desc: "Beautify JS, TS, JSON, HTML, CSS, Python, SQL. Customizable indent.", href: "/tools/code-formatter", hot: true },
      { name: "JWT Decoder", desc: "Decode JWT tokens. View header, payload, expiration, claims.", href: "/tools/jwt-decoder", hot: true },
      { name: "Cron Expression Generator", desc: "Build cron expressions visually. Presets and next run times.", href: "/tools/cron-expression-generator", hot: true },
      { name: "Git Commit Generator", desc: "Generate conventional commit messages. Type, scope, description.", href: "/tools/git-commit-generator" },
      { name: "Robots.txt Generator", desc: "Create robots.txt files. Crawl rules, user agents, sitemap.", href: "/tools/robots-txt-generator", hot: true },
      { name: "Sitemap Generator", desc: "Generate XML sitemaps with priority, changefreq, lastmod.", href: "/tools/sitemap-generator", hot: true },
    ],
  },
  {
    category: "Legal Tools",
    color: "#7C3AED",
    items: [
      { name: "Privacy Policy Generator", desc: "Generate a privacy policy for your website. GDPR & CCPA compliant.", href: "/tools/privacy-policy-generator", hot: true },
      { name: "Terms of Service Generator", desc: "Generate terms of service for your website or app. Customizable.", href: "/tools/terms-of-service-generator", hot: true },
      { name: "Cookie Consent Generator", desc: "Generate cookie consent banner code for your website.", href: "/tools/cookie-consent-generator" },
      { name: "AI Disclosure Generator", desc: "Generate AI disclosure statements for court filings, papers, reports.", href: "/tools/ai-disclosure-generator", hot: true },
      { name: "NDA Generator", desc: "Create professional NDAs. Mutual or one-way, customizable terms.", href: "/tools/nda-generator", hot: true },
      { name: "Contract Template Generator", desc: "Generate freelance, consulting, and service contracts.", href: "/tools/contract-template-generator", hot: true },
      { name: "GDPR Request Generator", desc: "Create GDPR/CCPA data access, deletion, and portability letters.", href: "/tools/gdpr-request-generator" },
      { name: "Legal Disclaimer Generator", desc: "Generate disclaimers: general, medical, financial, affiliate, legal.", href: "/tools/legal-disclaimer-generator" },
    ],
  },
  {
    category: "Social Media Tools",
    color: "#3B82F6",
    items: [
      { name: "Hashtag Generator", desc: "Generate trending hashtags for Instagram, TikTok, Twitter, and YouTube.", href: "/tools/hashtag-generator", hot: true },
      { name: "YouTube Thumbnail Downloader", desc: "Download YouTube video thumbnails in all resolutions. Free.", href: "/tools/youtube-thumbnail-downloader", hot: true },
      { name: "Open Graph Preview", desc: "Preview how your page looks when shared on social media.", href: "/tools/open-graph-preview" },
      { name: "Meta Tag Generator", desc: "Generate SEO meta tags for your website. Copy-paste ready HTML.", href: "/tools/meta-tag-generator", hot: true },
    ],
  },
  {
    category: "Productivity Tools",
    color: "#10B981",
    items: [
      { name: "Pomodoro Timer", desc: "Stay focused with timed work sessions and breaks. Customizable intervals.", href: "/tools/pomodoro-timer", hot: true },
      { name: "Fuel Cost Calculator", desc: "Calculate annual fuel costs, efficiency gap, and savings potential.", href: "/fuel-calculator", hot: true },
      { name: "Age Calculator", desc: "Your exact age in years, months, days, hours. Zodiac, birthday countdown.", href: "/tools/age-calculator", hot: true },
      { name: "Screen Recorder", desc: "Record your screen with optional audio. Download as WebM. No install.", href: "/tools/screen-recorder", hot: true },
      { name: "Stopwatch", desc: "Online stopwatch with lap timer. Millisecond precision. Start, stop, lap.", href: "/tools/stopwatch", hot: true },
      { name: "Habit Tracker", desc: "Track daily habits with a 7-day grid. Build streaks. Saved locally.", href: "/tools/habit-tracker", hot: true },
    ],
  },
  {
    category: "Health & Fitness Tools",
    color: "#EF4444",
    items: [
      { name: "BMI Calculator", desc: "Calculate BMI with visual gauge. Metric & imperial. Healthy weight range.", href: "/tools/bmi-calculator", hot: true },
      { name: "Calorie Calculator", desc: "Calculate daily calorie needs (TDEE). Weight loss, gain, or maintenance goals.", href: "/tools/calorie-calculator", hot: true },
      { name: "Body Fat Calculator", desc: "US Navy method. Visual gauge, lean mass breakdown. Metric & imperial.", href: "/tools/body-fat-calculator", hot: true },
      { name: "Pregnancy Calculator", desc: "Calculate due date, current week, trimester, and key milestones from your LMP.", href: "/tools/pregnancy-calculator", hot: true },
      { name: "Medication Reminder", desc: "Plan medication schedules. Weekly calendar, print, save locally.", href: "/tools/medication-reminder" },
      { name: "Blood Pressure Tracker", desc: "Track BP readings. AHA categories, trends, averages, CSV export.", href: "/tools/blood-pressure-tracker" },
    ],
  },
  {
    category: "Education Tools",
    color: "#6366F1",
    items: [
      { name: "GPA Calculator", desc: "Calculate semester GPA on a 4.0 scale. Enter courses, grades, credits.", href: "/tools/gpa-calculator", hot: true },
      { name: "Typing Speed Test", desc: "Test your WPM with real passages. Track accuracy and improvement.", href: "/tools/typing-speed-test", hot: true },
      { name: "Fraction Calculator", desc: "Add, subtract, multiply, divide fractions. Step-by-step solutions.", href: "/tools/fraction-calculator", hot: true },
      { name: "Flashcard Creator", desc: "Create and study flashcards. Flip, shuffle, import and export.", href: "/tools/flashcard-creator", hot: true },
      { name: "Citation Generator", desc: "Generate citations in APA, MLA, Chicago, Harvard formats.", href: "/tools/citation-generator", hot: true },
      { name: "Quiz Generator", desc: "Create interactive quizzes. Multiple choice, scoring, review.", href: "/tools/quiz-generator", hot: true },
    ],
  },
  {
    category: "Author Tools",
    color: "#D97706",
    items: [
      { name: "KDP Royalty Calculator", desc: "Calculate Amazon KDP ebook royalties. Compare 35% vs 70% across all marketplaces.", href: "/tools/kdp-royalty-calculator", hot: true },
      { name: "Book Description Formatter", desc: "Write your blurb in plain text, get Amazon-ready HTML. Templates included.", href: "/tools/book-description-formatter", hot: true },
      { name: "Series Revenue Calculator", desc: "Project total series revenue based on read-through rates and KU page reads.", href: "/tools/series-revenue-calculator", premium: true },
      { name: "Author Productivity Planner", desc: "Plan your manuscript timeline, track progress, build a publication calendar.", href: "/tools/author-productivity-planner", premium: true },
    ],
  },
];

const allTools = tools.flatMap((g) => g.items.map((t) => ({ ...t, category: g.category, color: g.color })));

/* Top 8 popular tools for the featured section */
const popularTools = [
  { name: "Word Counter", desc: "Count words, characters, sentences", href: "/tools/word-counter", icon: "Aa" },
  { name: "Image Compressor", desc: "Compress without losing quality", href: "/tools/image-compressor", icon: "IMG" },
  { name: "PDF Merge", desc: "Combine multiple PDFs into one", href: "/tools/pdf-merge", icon: "PDF" },
  { name: "QR Code Generator", desc: "Generate QR codes instantly", href: "/tools/qr-code-generator", icon: "QR" },
  { name: "Password Generator", desc: "Strong, random passwords", href: "/tools/password-generator", icon: "***" },
  { name: "Invoice Generator", desc: "Create invoices, save as PDF", href: "/tools/invoice-generator", icon: "$" },
  { name: "Resume Builder", desc: "Build & download as PDF", href: "/tools/resume-builder", icon: "CV" },
  { name: "Color Palette", desc: "Generate harmonious palettes", href: "/tools/color-palette", icon: "CLR" },
];

function ToolCard({ tool, showCategory, t }: { tool: typeof allTools[number]; showCategory?: boolean; t: (k: string) => string }) {
  const translatedName = t(`tools.${tool.href}.name`);
  const translatedDesc = t(`tools.${tool.href}.desc`);
  const displayName = translatedName !== `tools.${tool.href}.name` ? translatedName : tool.name;
  const displayDesc = translatedDesc !== `tools.${tool.href}.desc` ? translatedDesc : tool.desc;
  const translatedCategory = t(`categories.${tool.category}`);
  const displayCategory = translatedCategory !== `categories.${tool.category}` ? translatedCategory : tool.category;

  return (
    <Link href={tool.href} className="tool-card" style={{
      display: "block", padding: "16px 18px 16px 21px", background: "#fff",
      border: "1px solid #E7E5E4", borderRadius: 10, textDecoration: "none",
      borderLeft: `3px solid ${tool.color}20`,
      transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: "#1C1917" }}>{displayName}</span>
        {tool.hot && (
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#0D9488", display: "inline-block", flexShrink: 0,
          }} title={t("common.popular")} />
        )}
        {tool.premium && (
          <span style={{
            fontSize: 10, fontWeight: 600, color: "#D97706", background: "#FEF3C7",
            borderRadius: 4, padding: "2px 6px", letterSpacing: 0.3, display: "inline-flex", alignItems: "center", gap: 3,
          }}>&#x1F512; {t("common.premium")}</span>
        )}
      </div>
      {showCategory && (
        <div style={{ marginBottom: 2 }}>
          <span style={{ fontSize: 11, color: tool.color, fontWeight: 600 }}>{displayCategory}</span>
        </div>
      )}
      <p style={{ fontSize: 13, color: "#78716C", lineHeight: 1.5, margin: 0 }}>{displayDesc}</p>
    </Link>
  );
}

export default function HomeContent() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return allTools.filter(
      (t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .tool-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border-left-width: 3px !important;
        }
        .popular-scroll::-webkit-scrollbar { height: 6px; }
        .popular-scroll::-webkit-scrollbar-track { background: transparent; }
        .popular-scroll::-webkit-scrollbar-thumb { background: #D6D3D1; border-radius: 3px; }
        .hero-search:focus { border-color: #0D9488 !important; box-shadow: 0 0 0 3px rgba(13,148,136,0.1) !important; }
      `}</style>

      {/* ===== HERO SECTION ===== */}
      <section style={{
        textAlign: "center", padding: "64px 20px 48px", position: "relative", overflow: "hidden",
      }}>
        {/* Background pattern */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: "radial-gradient(circle at 20% 50%, rgba(13,148,136,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(99,102,241,0.03) 0%, transparent 50%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, opacity: 0.3,
          backgroundImage: "radial-gradient(circle, #D6D3D1 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Tool counter badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 16px", borderRadius: 20, background: "rgba(13,148,136,0.08)",
            border: "1px solid rgba(13,148,136,0.15)", marginBottom: 20,
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#0D9488" }}>{t("hero.badge")}</span>
          </div>

          <h1 style={{ fontSize: 44, fontWeight: 800, color: "#1C1917", lineHeight: 1.15, marginBottom: 12, letterSpacing: "-0.02em" }}>
            {t("hero.title1")}{" "}
            <span style={{
              background: "linear-gradient(135deg, #0D9488, #14B8A6, #0D9488)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientShift 4s ease infinite",
            }}>
              {t("hero.title2")}
            </span>
          </h1>
          <p style={{ fontSize: 17, color: "#78716C", maxWidth: 520, margin: "0 auto 28px", lineHeight: 1.6 }}>
            {t("hero.subtitle")}
          </p>

          {/* Trust badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 36, flexWrap: "wrap" }}>
            {[
              { icon: "🔒", label: t("hero.trust1") },
              { icon: "⚡", label: t("hero.trust2") },
              { icon: "💰", label: t("hero.trust3") },
            ].map((b) => (
              <span key={b.label} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#57534E", fontWeight: 500 }}>
                <span style={{ fontSize: 15 }}>{b.icon}</span> {b.label}
              </span>
            ))}
          </div>

          {/* Command-palette style search */}
          <div style={{ maxWidth: 560, margin: "0 auto", position: "relative" }}>
            <svg
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#A8A29E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder={t("hero.searchPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="hero-search"
              style={{
                width: "100%", padding: "16px 48px 16px 50px", fontSize: 16,
                border: "1px solid #D6D3D1", borderRadius: 14, outline: "none",
                background: "#fff", color: "#1C1917", boxSizing: "border-box",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{
                  position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "#A8A29E",
                  fontSize: 18, lineHeight: 1, padding: 4,
                }}
                aria-label="Clear search"
              >&#x2715;</button>
            )}
            <span style={{
              position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
              fontSize: 11, color: "#A8A29E", background: "#F5F5F4", padding: "3px 7px",
              borderRadius: 5, border: "1px solid #E7E5E4", pointerEvents: "none",
              display: query ? "none" : "inline",
            }}>Ctrl+K</span>
          </div>
          {filtered !== null && (
            <div style={{ textAlign: "center", fontSize: 13, color: "#78716C", marginTop: 8 }}>
              {filtered.length} {t("common.toolsFound")}
            </div>
          )}
        </div>
      </section>

      {/* ===== SEARCH RESULTS ===== */}
      {filtered !== null ? (
        <section style={{ marginBottom: 32 }}>
          {filtered.length === 0 ? (
            <p style={{ textAlign: "center", color: "#A8A29E", fontSize: 15, padding: "32px 0" }}>
              {t("common.noResults")}
            </p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
              {filtered.map((tool) => (
                <ToolCard key={tool.href} tool={tool} showCategory t={t} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* ===== POPULAR TOOLS ROW ===== */}
          <section style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1C1917", margin: 0 }}>{t("popular.title")}</h2>
              <span style={{ fontSize: 12, color: "#A8A29E" }}>{t("popular.subtitle")}</span>
            </div>
            <div className="popular-scroll" style={{
              display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8,
            }}>
              {popularTools.map((pt) => (
                <Link key={pt.href} href={pt.href} className="tool-card" style={{
                  flex: "0 0 180px", padding: "20px 16px", background: "#fff",
                  border: "1px solid #E7E5E4", borderRadius: 12, textDecoration: "none",
                  textAlign: "center", transition: "transform 0.2s, box-shadow 0.2s",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, margin: "0 auto 10px",
                    background: "linear-gradient(135deg, rgba(13,148,136,0.08), rgba(13,148,136,0.15))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 800, color: "#0D9488", letterSpacing: "-0.02em",
                  }}>{pt.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1C1917", marginBottom: 4 }}>{t(`tools.${pt.href}.name`) !== `tools.${pt.href}.name` ? t(`tools.${pt.href}.name`) : pt.name}</div>
                  <div style={{ fontSize: 12, color: "#78716C", lineHeight: 1.4 }}>{t(`tools.${pt.href}.desc`) !== `tools.${pt.href}.desc` ? t(`tools.${pt.href}.desc`) : pt.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* ===== CATEGORY SECTIONS ===== */}
          {tools.map((group) => (
            <section key={group.category} id={group.category.toLowerCase().replace(/ /g, "-")} style={{ marginBottom: 32, scrollMarginTop: 70 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 4, height: 22, borderRadius: 2, background: group.color }} />
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1C1917" }}>{t(`categories.${group.category}`) !== `categories.${group.category}` ? t(`categories.${group.category}`) : group.category}</h2>
                <span style={{ fontSize: 12, color: "#A8A29E" }}>{group.items.length} {t("common.toolsFound").split(" ").pop()}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
                {group.items.map((tool) => (
                  <ToolCard key={tool.href} tool={{ ...tool, category: group.category, color: group.color }} t={t} />
                ))}
              </div>
            </section>
          ))}
        </>
      )}

      {/* ===== STATS SECTION ===== */}
      <section style={{
        margin: "48px 0", padding: "40px 20px", background: "#fff",
        border: "1px solid #E7E5E4", borderRadius: 16,
      }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 24, textAlign: "center",
        }}>
          {[
            { value: "125+", label: t("stats.tools") },
            { value: "197+", label: t("stats.articles") },
            { value: "100%", label: t("stats.free") },
            { value: "0", label: t("stats.noSignup") },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#0D9488", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 14, color: "#78716C", fontWeight: 500, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C1917", marginBottom: 10 }}>{t("about.title")}</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>
          {t("about.p1")}
        </p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>
          {t("about.p2")}
        </p>
      </section>
    </>
  );
}
