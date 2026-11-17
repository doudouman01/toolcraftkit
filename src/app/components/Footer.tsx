import Link from "next/link";

const footerCols = [
  {
    title: "Product",
    links: [
      { label: "Word Counter", href: "/tools/word-counter" },
      { label: "Image Compressor", href: "/tools/image-compressor" },
      { label: "PDF Merge", href: "/tools/pdf-merge" },
      { label: "QR Code Generator", href: "/tools/qr-code-generator" },
      { label: "Invoice Generator", href: "/tools/invoice-generator" },
      { label: "Password Generator", href: "/tools/password-generator" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Twitter / X", href: "https://x.com", external: true },
      { label: "YouTube", href: "https://youtube.com", external: true },
      { label: "GitHub", href: "https://github.com", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ marginTop: 64, borderTop: "1px solid #E7E5E4", background: "#FAFAF9" }}>
      <div style={{
        maxWidth: 900, margin: "0 auto", padding: "40px 20px 0",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32,
      }}>
        {footerCols.map((col) => (
          <div key={col.title}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1C1917", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {col.title}
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {col.links.map((link) => (
                <li key={link.label}>
                  {"external" in link ? (
                    <a href={link.href} target="_blank" rel="noopener" style={{ fontSize: 13, color: "#78716C", textDecoration: "none" }}>
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} style={{ fontSize: 13, color: "#78716C", textDecoration: "none" }}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Our Sites */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px 0" }}>
        <div style={{ borderTop: "1px solid #E7E5E4", paddingTop: 16, textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "#A8A29E", marginBottom: 6, marginTop: 0 }}>Our Sites</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://aigradelab.com" target="_blank" rel="noopener" style={{ fontSize: 11, color: "#78716C", textDecoration: "none" }}>AIGradeLab</a>
            <a href="https://solutionsdirectespro.com" target="_blank" rel="noopener" style={{ fontSize: 11, color: "#78716C", textDecoration: "none" }}>SolutionsDirectesPro</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 900, margin: "0 auto", padding: "20px 20px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8,
      }}>
        <span style={{ fontSize: 12, color: "#A8A29E" }}>
          &copy; {new Date().getFullYear()} ToolCraftKit.com. All rights reserved.
        </span>
        <span style={{ fontSize: 12, color: "#A8A29E" }}>
          Built with &hearts; for creators
        </span>
      </div>
    </footer>
  );
}
