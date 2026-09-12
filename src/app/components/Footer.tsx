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
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #E7E5E4', width: '100%', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: '#A8A29E', marginBottom: 6 }}>Our Sites</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href='https://aigradelab.com' target='_blank' rel='noopener' style={{ fontSize: 11, color: '#78716C', textDecoration: 'none' }}>AIGradeLab</a>
            <a href='https://solutionsdirectespro.com' target='_blank' rel='noopener' style={{ fontSize: 11, color: '#78716C', textDecoration: 'none' }}>SolutionsDirectesPro</a>
          </div>
        </div>
    </footer>
  );
}
