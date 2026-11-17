"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Text", href: "/#text-tools" },
  { label: "Business", href: "/#business-tools" },
  { label: "Converters", href: "/#converter-tools" },
  { label: "Image", href: "/#image-tools" },
  { label: "PDF", href: "/#pdf-tools" },
  { label: "Health", href: "/#health-&-fitness-tools" },
  { label: "Dev", href: "/#developer-tools" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (item: { label: string; href: string }) =>
    (item.href === "/" && pathname === "/") ||
    (item.href === "/blog" && pathname.startsWith("/blog"));

  return (
    <>
      <header style={{
        background: "#FFFFFF", borderBottom: "1px solid #E7E5E4",
        padding: "0 20px", height: 54, display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 30, height: 30, borderRadius: 7,
            background: "linear-gradient(135deg, #0D9488, #14B8A6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 15, fontWeight: 800,
          }}>T</div>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", color: "#1C1917" }}>
            Tool<span style={{ color: "#0D9488" }}>Craft</span>Kit
            <span style={{ color: "#A8A29E", fontWeight: 400 }}>.com</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <nav style={{ display: "flex", gap: 2 }} className="header-desktop-nav">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} style={{
                padding: "5px 9px", fontSize: 13, fontWeight: 500, borderRadius: 6,
                color: isActive(item) ? "#0D9488" : "#78716C",
                background: isActive(item) ? "rgba(13,148,136,0.06)" : "transparent",
                textDecoration: "none", whiteSpace: "nowrap",
              }}>{item.label}</Link>
            ))}
          </nav>
          <Link href="/pricing" className="header-desktop-nav" style={{
            marginLeft: 6, padding: "5px 12px", fontSize: 12, fontWeight: 600,
            borderRadius: 6, color: "#fff",
            background: "linear-gradient(135deg, #0D9488, #14B8A6)",
            textDecoration: "none", whiteSpace: "nowrap",
          }}>Pro ✨</Link>

          <LanguageSelector />

          {/* Hamburger button (mobile) */}
          <button
            className="header-mobile-burger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none", background: "none", border: "none",
              cursor: "pointer", padding: 6, color: "#1C1917", fontSize: 22, lineHeight: 1,
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="header-mobile-dropdown" style={{
          position: "fixed", top: 54, left: 0, right: 0, zIndex: 99,
          background: "#fff", borderBottom: "1px solid #E7E5E4",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)", padding: "8px 16px 12px",
        }}>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} style={{
              display: "block", padding: "10px 8px", fontSize: 14, fontWeight: 500,
              color: isActive(item) ? "#0D9488" : "#57534E",
              textDecoration: "none", borderBottom: "1px solid #F5F5F4",
            }}>{item.label}</Link>
          ))}
          <Link href="/pricing" onClick={() => setMobileOpen(false)} style={{
            display: "inline-block", marginTop: 8, padding: "8px 16px", fontSize: 13,
            fontWeight: 600, borderRadius: 6, color: "#fff",
            background: "linear-gradient(135deg, #0D9488, #14B8A6)",
            textDecoration: "none",
          }}>Pro ✨</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .header-desktop-nav { display: none !important; }
          .header-mobile-burger { display: block !important; }
        }
        @media (min-width: 769px) {
          .header-mobile-dropdown { display: none !important; }
        }
      `}</style>
    </>
  );
}
