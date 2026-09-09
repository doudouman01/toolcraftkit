"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// ============================================================
// CATEGORY DEFINITIONS
// ============================================================
const CATEGORIES = [
  { name: "Text", anchor: "text-tools", color: "#0D9488" },
  { name: "Writing", anchor: "writing-tools", color: "#8B5CF6" },
  { name: "Image", anchor: "image-tools", color: "#EC4899" },
  { name: "Business", anchor: "business-tools", color: "#F59E0B" },
  { name: "Social", anchor: "social-tools", color: "#3B82F6" },
  { name: "Dev", anchor: "dev-tools", color: "#10B981" },
  { name: "PDF", anchor: "pdf-tools", color: "#EF4444" },
  { name: "Security", anchor: "security-tools", color: "#6366F1" },
  { name: "Converter", anchor: "converter-tools", color: "#14B8A6" },
];

// ============================================================
// TOOL → CATEGORY MAPPING
// ============================================================
const TOOL_MAP: Record<string, { category: string; anchor: string; displayName: string }> = {
  // Text
  "word-counter": { category: "Text", anchor: "text-tools", displayName: "Word Counter" },
  "character-counter": { category: "Text", anchor: "text-tools", displayName: "Character Counter" },
  "text-case-converter": { category: "Text", anchor: "text-tools", displayName: "Text Case Converter" },
  "remove-duplicates": { category: "Text", anchor: "text-tools", displayName: "Remove Duplicates" },
  "lorem-ipsum-generator": { category: "Text", anchor: "text-tools", displayName: "Lorem Ipsum Generator" },
  "markdown-to-html": { category: "Text", anchor: "text-tools", displayName: "Markdown to HTML" },
  "words-to-pages": { category: "Text", anchor: "text-tools", displayName: "Words to Pages" },

  // Writing
  
  // Image
  "hex-to-rgb": { category: "Image", anchor: "image-tools", displayName: "Hex to RGB Converter" },
  "color-palette": { category: "Image", anchor: "image-tools", displayName: "Color Palette" },
  "image-compressor": { category: "Image", anchor: "image-tools", displayName: "Image Compressor" },
  "image-resizer": { category: "Image", anchor: "image-tools", displayName: "Image Resizer" },
  "image-to-pdf": { category: "Image", anchor: "image-tools", displayName: "Image to PDF" },

  // Business
  "invoice-generator": { category: "Business", anchor: "business-tools", displayName: "Invoice Generator" },
  "qr-code-generator": { category: "Business", anchor: "business-tools", displayName: "QR Code Generator" },
  "barcode-generator": { category: "Business", anchor: "business-tools", displayName: "Barcode Generator" },
  "discount-calculator": { category: "Business", anchor: "business-tools", displayName: "Discount Calculator" },
  "loan-calculator": { category: "Business", anchor: "business-tools", displayName: "Loan Calculator" },
  "mortgage-calculator": { category: "Business", anchor: "business-tools", displayName: "Mortgage Calculator" },
  "salary-calculator": { category: "Business", anchor: "business-tools", displayName: "Salary Calculator" },
  "roi-calculator": { category: "Business", anchor: "business-tools", displayName: "ROI Calculator" },
  "compound-interest": { category: "Business", anchor: "business-tools", displayName: "Compound Interest" },
  "tax-calculator": { category: "Business", anchor: "business-tools", displayName: "Tax Calculator" },
  "tip-calculator": { category: "Business", anchor: "business-tools", displayName: "Tip Calculator" },
  "percentage-calculator": { category: "Business", anchor: "business-tools", displayName: "Percentage Calculator" },
  "profit-margin-calculator": { category: "Business", anchor: "business-tools", displayName: "Profit Margin Calculator" },
  "age-calculator": { category: "Business", anchor: "business-tools", displayName: "Age Calculator" },

  // Social

  // Dev
  "json-formatter": { category: "Dev", anchor: "dev-tools", displayName: "JSON Formatter" },
  "base64": { category: "Dev", anchor: "dev-tools", displayName: "Base64 Encoder" },
  "timestamp-converter": { category: "Dev", anchor: "dev-tools", displayName: "Timestamp Converter" },
  "regex-tester": { category: "Dev", anchor: "dev-tools", displayName: "Regex Tester" },
  "url-encoder": { category: "Dev", anchor: "dev-tools", displayName: "URL Encoder" },

  // PDF
  "pdf-merge": { category: "PDF", anchor: "pdf-tools", displayName: "PDF Merge" },
  "text-to-pdf": { category: "PDF", anchor: "pdf-tools", displayName: "Text to PDF" },

  // Security
  "password-generator": { category: "Security", anchor: "security-tools", displayName: "Password Generator" },
  "random-number-generator": { category: "Security", anchor: "security-tools", displayName: "Random Number Generator" },

  // Converter
  "unit-converter": { category: "Converter", anchor: "converter-tools", displayName: "Unit Converter" },
};

function slugToName(slug: string): string {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// ============================================================
// LAYOUT COMPONENT
// ============================================================
export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Extract tool slug from pathname: /tools/word-counter → word-counter
  const slug = pathname?.replace("/tools/", "").replace("/", "") || "";
  const toolInfo = TOOL_MAP[slug];
  const currentCategory = toolInfo?.category || "";
  const currentAnchor = toolInfo?.anchor || "";
  const toolName = toolInfo?.displayName || slugToName(slug);

  return (
    <div>
      {/* ─── TOP NAV BAR ─── */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderBottom: "1px solid #e5e5e5",
        background: "#fafafa",
        flexWrap: "wrap",
        gap: "8px",
      }}>
        {/* Home button */}
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          textDecoration: "none",
          color: "#1a1a2e",
          fontWeight: 600,
          fontSize: "15px",
        }}>
          <span style={{ fontSize: "18px" }}>🏠</span>
          <span>ToolCraftKit</span>
        </Link>

        {/* Category pills */}
        <div style={{
          display: "flex",
          gap: "4px",
          flexWrap: "wrap",
          alignItems: "center",
        }}>
          {CATEGORIES.map((cat) => {
            const isActive = cat.name === currentCategory;
            return (
              <Link
                key={cat.name}
                href={`/#${cat.anchor}`}
                style={{
                  padding: "5px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: "none",
                  color: isActive ? "#fff" : "#555",
                  background: isActive ? cat.color : "transparent",
                  border: isActive ? "none" : "1px solid #ddd",
                  transition: "all 0.2s",
                }}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ─── BREADCRUMB ─── */}
      {slug && (
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "12px 20px 0",
        }}>
          <nav aria-label="Breadcrumb" style={{
            fontSize: "13px",
            display: "flex",
            gap: "6px",
            alignItems: "center",
          }}>
            <Link href="/" style={{ color: "#0D9488", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ color: "#ccc" }}>›</span>
            {currentAnchor && (
              <>
                <Link href={`/#${currentAnchor}`} style={{ color: "#0D9488", textDecoration: "none" }}>
                  {currentCategory} Tools
                </Link>
                <span style={{ color: "#ccc" }}>›</span>
              </>
            )}
            <span style={{ color: "#0D9488", fontWeight: 600 }}>{toolName}</span>
          </nav>
        </div>
      )}

      {/* ─── TOOL CONTENT ─── */}
      {children}
    </div>
  );
}
