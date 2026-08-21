import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      marginTop: 48, paddingTop: 24, borderTop: "1px solid #E7E5E4",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 8, paddingBottom: 32,
    }}>
      <span style={{ fontSize: 12, color: "#A8A29E" }}>
        © 2026 ToolCraftKit.com — Free tools for creators and entrepreneurs.
      </span>
      <div style={{ display: "flex", gap: 14, fontSize: 12, color: "#78716C" }}>
        <Link href="/privacy" style={{ cursor: "pointer" }}>Privacy</Link>
        <Link href="/terms" style={{ cursor: "pointer" }}>Terms</Link>
        <Link href="/contact" style={{ cursor: "pointer" }}>Contact</Link>
      </div>
    </footer>
  );
}
