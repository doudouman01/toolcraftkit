"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Text", href: "/#text-tools" },
  { label: "Business", href: "/#business-tools" },
  { label: "Converters", href: "/#converter-tools" },
  { label: "Dev", href: "/#developer-tools" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isPro, signOut, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/blog") return pathname.startsWith("/blog");
    if (href === "/pricing") return pathname === "/pricing";
    return false;
  };

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

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <nav style={{ display: "flex", gap: 4 }}>
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} style={{
                padding: "5px 10px", fontSize: 13, fontWeight: item.label === "Pricing" ? 600 : 500, borderRadius: 6,
                color: isActive(item.href) ? "#0D9488" : item.label === "Pricing" ? "#2563eb" : "#78716C",
                background: isActive(item.href) ? "rgba(13,148,136,0.06)" : "transparent",
                textDecoration: "none",
              }}>{item.label}{item.label === "Pricing" && isPro && " ✓"}</Link>
            ))}
          </nav>

          {!loading && (
            <div style={{ marginLeft: 8, position: "relative" }}>
              {user ? (
                <div>
                  <button onClick={() => setShowMenu(!showMenu)} style={{
                    padding: "5px 12px", fontSize: 13, fontWeight: 600, borderRadius: 6,
                    border: isPro ? "1px solid #2563eb" : "1px solid #d1d5db",
                    background: isPro ? "#eff6ff" : "#f9fafb",
                    color: isPro ? "#2563eb" : "#374151",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                  }}>
                    {isPro && <span style={{ fontSize: 11 }}>⭐</span>}
                    {user.email?.split("@")[0]}
                  </button>
                  {showMenu && (
                    <div style={{
                      position: "absolute", right: 0, top: 36, background: "white",
                      border: "1px solid #e5e7eb", borderRadius: 8, padding: 4,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)", minWidth: 160, zIndex: 200,
                    }}>
                      {!isPro && (
                        <Link href="/pricing" onClick={() => setShowMenu(false)} style={{
                          display: "block", padding: "8px 12px", fontSize: 13, color: "#2563eb",
                          fontWeight: 600, textDecoration: "none", borderRadius: 6,
                        }}>Upgrade to Pro</Link>
                      )}
                      {isPro && (
                        <span style={{
                          display: "block", padding: "8px 12px", fontSize: 13, color: "#16a34a", fontWeight: 600,
                        }}>Pro Member</span>
                      )}
                      <button onClick={() => { signOut(); setShowMenu(false); }} style={{
                        display: "block", width: "100%", padding: "8px 12px", fontSize: 13,
                        color: "#dc2626", background: "none", border: "none", textAlign: "left",
                        cursor: "pointer", borderRadius: 6,
                      }}>Sign Out</button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => setShowAuth(true)} style={{
                  padding: "5px 14px", fontSize: 13, fontWeight: 600, borderRadius: 6,
                  background: "#0D9488", color: "white", border: "none", cursor: "pointer",
                }}>Sign In</button>
              )}
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}