"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Text", href: "/tools/word-counter" },
  { label: "Writing", href: "#" },
  { label: "Image", href: "/tools/hex-to-rgb" },
  { label: "Business", href: "/tools/percentage-calculator" },
  { label: "Social", href: "#" },
  { label: "Dev", href: "/tools/json-formatter" },
];

export default function Header() {
  const pathname = usePathname();
  const getCluster = () => {
    if (pathname.includes("word-counter") || pathname.includes("character-counter") || pathname.includes("text-case") || pathname.includes("lorem")) return "Text";
    if (pathname.includes("hex") || pathname.includes("image")) return "Image";
    if (pathname.includes("percentage") || pathname.includes("profit")) return "Business";
    if (pathname.includes("json") || pathname.includes("dev")) return "Dev";
    return "";
  };
  const active = getCluster();

  return (
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
      <nav style={{ display: "flex", gap: 4 }}>
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} style={{
            padding: "5px 10px", fontSize: 13, fontWeight: 500, borderRadius: 6,
            color: item.label === active ? "#0D9488" : "#78716C",
            background: item.label === active ? "rgba(13,148,136,0.06)" : "transparent",
            textDecoration: "none",
          }}>{item.label}</Link>
        ))}
      </nav>
    </header>
  );
}
