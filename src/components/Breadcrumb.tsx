"use client";

import React from "react";
import Link from "next/link";

// ============================================================
// TOOL → CATEGORY MAPPING
// Add new tools here as they're created
// ============================================================
const TOOL_CATEGORIES: Record<string, { category: string; anchor: string }> = {
  // Text Tools
  "word-counter": { category: "Text Tools", anchor: "text-tools" },
  "text-case-converter": { category: "Text Tools", anchor: "text-tools" },
  "remove-duplicates": { category: "Text Tools", anchor: "text-tools" },
  "lorem-ipsum-generator": { category: "Text Tools", anchor: "text-tools" },
  "text-diff": { category: "Text Tools", anchor: "text-tools" },
  "text-to-speech": { category: "Text Tools", anchor: "text-tools" },
  "markdown-editor": { category: "Text Tools", anchor: "text-tools" },
  "text-encryptor": { category: "Text Tools", anchor: "text-tools" },
  "readability-score": { category: "Text Tools", anchor: "text-tools" },
  "plagiarism-checker": { category: "Text Tools", anchor: "text-tools" },

  // Developer Tools
  "json-formatter": { category: "Developer Tools", anchor: "developer-tools" },
  "base64": { category: "Developer Tools", anchor: "developer-tools" },
  "timestamp-converter": { category: "Developer Tools", anchor: "developer-tools" },
  "regex-tester": { category: "Developer Tools", anchor: "developer-tools" },
  "html-minifier": { category: "Developer Tools", anchor: "developer-tools" },
  "css-minifier": { category: "Developer Tools", anchor: "developer-tools" },
  "js-minifier": { category: "Developer Tools", anchor: "developer-tools" },
  "url-encoder": { category: "Developer Tools", anchor: "developer-tools" },
  "color-converter": { category: "Developer Tools", anchor: "developer-tools" },
  "cron-expression": { category: "Developer Tools", anchor: "developer-tools" },

  // Image Tools
  "image-compressor": { category: "Image Tools", anchor: "image-tools" },
  "image-resizer": { category: "Image Tools", anchor: "image-tools" },
  "image-converter": { category: "Image Tools", anchor: "image-tools" },
  "image-cropper": { category: "Image Tools", anchor: "image-tools" },
  "favicon-generator": { category: "Image Tools", anchor: "image-tools" },
  "screenshot-to-code": { category: "Image Tools", anchor: "image-tools" },

  // PDF Tools
  "pdf-merge": { category: "PDF Tools", anchor: "pdf-tools" },
  "pdf-split": { category: "PDF Tools", anchor: "pdf-tools" },
  "pdf-compress": { category: "PDF Tools", anchor: "pdf-tools" },
  "pdf-to-image": { category: "PDF Tools", anchor: "pdf-tools" },

  // Converter Tools
  "hex-to-rgb": { category: "Converter Tools", anchor: "converter-tools" },
  "unit-converter": { category: "Converter Tools", anchor: "converter-tools" },
  "currency-converter": { category: "Converter Tools", anchor: "converter-tools" },
  "temperature-converter": { category: "Converter Tools", anchor: "converter-tools" },

  // Design Tools
  "color-palette": { category: "Design Tools", anchor: "design-tools" },
  "gradient-generator": { category: "Design Tools", anchor: "design-tools" },
  "font-pairing": { category: "Design Tools", anchor: "design-tools" },
  "contrast-checker": { category: "Design Tools", anchor: "design-tools" },

  // Security Tools
  "password-generator": { category: "Security Tools", anchor: "security-tools" },
  "hash-generator": { category: "Security Tools", anchor: "security-tools" },

  // Business Tools
  "invoice-generator": { category: "Business Tools", anchor: "business-tools" },
  "qr-code-generator": { category: "Business Tools", anchor: "business-tools" },
  "barcode-generator": { category: "Business Tools", anchor: "business-tools" },

  // Productivity Tools
  "pomodoro-timer": { category: "Productivity Tools", anchor: "productivity-tools" },
  "fuel-calculator": { category: "Productivity Tools", anchor: "productivity-tools" },
  "random-number-generator": { category: "Productivity Tools", anchor: "productivity-tools" },
};

// ============================================================
// BREADCRUMB COMPONENT
// ============================================================
interface BreadcrumbProps {
  toolSlug: string;
  toolName: string;
}

export default function Breadcrumb({ toolSlug, toolName }: BreadcrumbProps) {
  const mapping = TOOL_CATEGORIES[toolSlug];
  const category = mapping?.category || "Tools";
  const anchor = mapping?.anchor || "";

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        padding: "0.8rem 0",
        marginBottom: "0.5rem",
        fontSize: "0.85rem",
        color: "#888",
      }}
    >
      <Link
        href="/"
        style={{
          color: "#C4A265",
          textDecoration: "none",
        }}
      >
        Home
      </Link>
      <span style={{ margin: "0 0.5rem", color: "#ccc" }}>›</span>
      <Link
        href={anchor ? `/#${anchor}` : "/"}
        style={{
          color: "#C4A265",
          textDecoration: "none",
        }}
      >
        {category}
      </Link>
      <span style={{ margin: "0 0.5rem", color: "#ccc" }}>›</span>
      <span style={{ color: "#666" }}>{toolName}</span>
    </nav>
  );
}
