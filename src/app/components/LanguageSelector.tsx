"use client";
import { useState, useRef, useEffect } from "react";
import { LOCALES } from "@/lib/i18n/locales";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function LanguageSelector() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [open]);

  return (
    <>
      <div ref={ref} style={{ position: "relative" }}>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Select language"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "5px 10px",
            fontSize: 13,
            fontWeight: 500,
            borderRadius: 6,
            border: "1px solid #E7E5E4",
            background: open ? "rgba(13,148,136,0.06)" : "#fff",
            color: "#57534E",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "background 0.15s, border-color 0.15s",
          }}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>{current.flag}</span>
          <span className="lang-selector-name" style={{ fontSize: 12 }}>{current.code.toUpperCase()}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.5, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              zIndex: 200,
              background: "#fff",
              border: "1px solid #E7E5E4",
              borderRadius: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
              padding: 12,
              width: 320,
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 600, color: "#A8A29E", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, padding: "0 4px" }}>
              Language
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 4,
              }}
            >
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLocale(l.code);
                    setOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 10px",
                    border: "none",
                    borderRadius: 8,
                    background: l.code === locale ? "rgba(13,148,136,0.08)" : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                    transition: "background 0.15s",
                    outline: l.code === locale ? "2px solid rgba(13,148,136,0.3)" : "none",
                    outlineOffset: -2,
                  }}
                  onMouseEnter={(e) => {
                    if (l.code !== locale) (e.currentTarget as HTMLButtonElement).style.background = "#F5F5F4";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = l.code === locale ? "rgba(13,148,136,0.08)" : "transparent";
                  }}
                >
                  <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{l.flag}</span>
                  <span style={{ fontSize: 13, fontWeight: l.code === locale ? 600 : 400, color: l.code === locale ? "#0D9488" : "#1C1917", lineHeight: 1.2 }}>{l.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .lang-selector-name { display: none; }
        }
      `}</style>
    </>
  );
}
