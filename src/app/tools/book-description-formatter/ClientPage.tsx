"use client";

import React, { useState, useRef } from "react";

// ============================================================
// BOOK DESCRIPTION FORMATTER
// Converts plain text to Amazon-ready HTML book descriptions
// ============================================================

export default function ClientPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Convert markdown-like syntax to Amazon HTML
  function toAmazonHtml(input: string): string {
    let html = input
      // Bold: **text** or __text__
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/__(.+?)__/g, "<b>$1</b>")
      // Italic: *text* or _text_
      .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<i>$1</i>")
      .replace(/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/g, "<i>$1</i>")
      // Bullet points: lines starting with - or •
      .replace(/^[-•]\s+(.+)$/gm, "• $1")
      // Headers: lines starting with #
      .replace(/^#{1,3}\s+(.+)$/gm, "<b>$1</b>")
      // Line breaks: double newline = paragraph break
      .replace(/\n\n+/g, "\n<br/><br/>\n")
      // Single newline = line break
      .replace(/\n/g, "<br/>\n");

    return html.trim();
  }

  const amazonHtml = toAmazonHtml(text);
  const charCount = text.length;
  const maxChars = 4000;

  function copyHtml() {
    navigator.clipboard.writeText(amazonHtml).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // Templates
  const templates = {
    fiction: `**A gripping thriller that will keep you turning pages all night.**

She thought she was safe. She was wrong.

When journalist Sarah Chen discovers a decades-old secret buried in her family's past, she sets off a chain of events that puts everyone she loves in danger.

*What readers are saying:*

- "Couldn't put it down — finished it in one sitting"
- "The twist at the end left me speechless"
- "Best thriller I've read this year"

**If you love fast-paced suspense with unforgettable characters, this book is for you.**

*Grab your copy today — your next all-night read is waiting.*`,

    nonfiction: `**Are you tired of [problem]? There's a better way.**

Most people struggle with [challenge] because they've been given the wrong advice. This book changes that.

**Inside, you'll discover:**

- The #1 mistake that's costing you [consequence]
- A simple 3-step system to [benefit]
- Why everything you've been told about [topic] is wrong
- Real case studies from people who [achievement]
- A 30-day action plan that gets results

**This isn't theory. It's a proven, practical guide** based on [credibility — years of experience, research, etc.].

*Whether you're a complete beginner or looking to level up, this book gives you everything you need to [transformation].*

**Don't wait. Your [better outcome] starts today.**`,

    series: `**Book [X] in the bestselling [Series Name]**

*[Tagline or hook sentence]*

[Hero name] thought the worst was behind [him/her]. [He/She] was wrong.

When [inciting incident], [hero] must [challenge] before [stakes/deadline]. But [complication] threatens everything — and the truth is more dangerous than anyone imagined.

**Fans of [comp author] and [comp author] will love this [genre] series.**

- Book 1: [Title] — *"[Short review quote]"*
- Book 2: [Title] — *"[Short review quote]"*
- Book 3: [Title] — Available now

*Start reading today and discover why thousands of readers are hooked on [Series Name].*`,
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem", fontFamily: "'Inter', -apple-system, sans-serif" }}>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "0.5rem" }}>
          Book Description Formatter
        </h1>
        <p style={{ fontSize: "1.05rem", color: "#555", maxWidth: 600, margin: "0 auto" }}>
          Write your Amazon book description in plain text. Get perfectly formatted HTML ready to paste into KDP.
        </p>
      </div>

      {/* Templates */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <span style={{ fontSize: "0.85rem", color: "#888", alignSelf: "center" }}>Templates:</span>
        {[
          { key: "fiction", label: "Fiction" },
          { key: "nonfiction", label: "Non-Fiction" },
          { key: "series", label: "Series" },
        ].map(t => (
          <button
            key={t.key}
            type="button"
            onClick={() => setText(templates[t.key as keyof typeof templates])}
            style={{
              padding: "5px 14px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 500,
              border: "1px solid #ddd", background: "#f8f9fa", color: "#555", cursor: "pointer",
            }}
          >{t.label}</button>
        ))}
      </div>

      {/* Editor + Preview */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
        {/* Editor */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#333" }}>Write your description</label>
            <span style={{ fontSize: "0.75rem", color: charCount > maxChars ? "#EF4444" : "#999" }}>
              {charCount} / {maxChars}
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"Write your book description here...\n\nUse **bold** for emphasis\nUse *italic* for style\nUse - for bullet points\nUse # for headings\n\nDouble line break = new paragraph"}
            style={{
              width: "100%", minHeight: 400, padding: "1rem", fontSize: "0.9rem",
              border: "1px solid #ddd", borderRadius: 12, resize: "vertical",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              lineHeight: 1.6, boxSizing: "border-box" as const,
            }}
          />
          <div style={{ fontSize: "0.75rem", color: "#999", marginTop: "0.3rem" }}>
            **bold** · *italic* · - bullet · # heading · blank line = paragraph
          </div>
        </div>

        {/* Preview */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#333" }}>Amazon Preview</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                type="button"
                onClick={copyHtml}
                style={{
                  padding: "4px 12px", fontSize: "0.8rem", fontWeight: 500,
                  background: copied ? "#0D9488" : "#f0f0f0", color: copied ? "#fff" : "#555",
                  border: "1px solid #ddd", borderRadius: 6, cursor: "pointer",
                }}
              >{copied ? "Copied!" : "Copy HTML"}</button>
            </div>
          </div>
          <div
            ref={previewRef}
            style={{
              minHeight: 400, padding: "1rem", border: "1px solid #ddd", borderRadius: 12,
              background: "#fff", fontSize: "0.9rem", lineHeight: 1.6,
              overflow: "auto",
            }}
            dangerouslySetInnerHTML={{ __html: amazonHtml || '<span style="color:#bbb">Your preview will appear here...</span>' }}
          />
        </div>
      </div>

      {/* HTML Output */}
      {text && (
        <div style={{ background: "#1a1a2e", borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#C4A265", margin: 0 }}>HTML Code (paste in KDP)</h3>
            <button
              type="button"
              onClick={copyHtml}
              style={{
                padding: "4px 14px", fontSize: "0.8rem", fontWeight: 500,
                background: copied ? "#0D9488" : "rgba(255,255,255,0.1)", color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, cursor: "pointer",
              }}
            >{copied ? "Copied!" : "Copy"}</button>
          </div>
          <pre style={{
            color: "#e2e8f0", fontSize: "0.8rem", lineHeight: 1.5,
            whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0,
            maxHeight: 200, overflow: "auto",
          }}>{amazonHtml}</pre>
        </div>
      )}

      {/* SEO Content */}
      <div style={{ background: "#f8f9fa", borderRadius: 16, padding: "2rem", marginTop: "2rem", color: "#444", lineHeight: 1.8 }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#1a1a2e", marginBottom: "1rem" }}>How to Format Your Amazon Book Description</h2>
        <p>Amazon KDP accepts basic HTML formatting in book descriptions, but the KDP dashboard doesn't provide a visual editor. Most authors either paste unformatted plain text (which looks flat and unprofessional) or struggle with raw HTML tags. This tool bridges that gap — write naturally, get perfect HTML output.</p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Supported Amazon HTML Tags</h3>
        <p>Amazon book descriptions support a limited set of HTML: bold text with &lt;b&gt; tags, italic text with &lt;i&gt; tags, and line breaks with &lt;br/&gt; tags. Headings, images, links, and custom fonts are not supported. This formatter uses only Amazon-compatible tags to ensure your description displays correctly on all devices.</p>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1a1a2e", marginTop: "1.5rem", marginBottom: "0.5rem" }}>Tips for a High-Converting Book Description</h3>
        <p>Lead with a bold hook that creates curiosity or states a compelling benefit. Use short paragraphs — Amazon descriptions display on narrow mobile screens. Include bullet points for key benefits or plot points. End with a clear call to action. Keep the total length under 4,000 characters (Amazon's limit). Use the preview panel to check how your description will look before pasting it into KDP.</p>

        <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "#888" }}>
          More author tools:{" "}
          <a href="/tools/kdp-royalty-calculator" style={{ color: "#0D9488" }}>KDP Royalty Calculator</a>{" · "}
          <a href="/tools/series-revenue-calculator" style={{ color: "#0D9488" }}>Series Revenue Calculator</a>{" · "}
          <a href="/tools/author-productivity-planner" style={{ color: "#0D9488" }}>Author Productivity Planner</a>
        </p>
      </div>
    </div>
  );
}
