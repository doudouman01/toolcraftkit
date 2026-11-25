"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Git Commit Message Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Select a commit type (feat, fix, docs, etc.), add an optional scope to identify which part of the codebase changed, and write a short description of your change. For larger changes, add a body with context. Toggle the breaking change flag if the commit introduces an incompatible change. The tool formats everything into a valid conventional commit message you can copy directly into your terminal.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Conventional Commits Matter</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Conventional commits are a specification for adding human and machine-readable meaning to commit messages. They power automated changelogs, semantic versioning, and release notes generation. Teams that follow the convention can use tools like commitlint, standard-version, and semantic-release to automate their release workflow. Even for solo developers, structured commits make it easier to find specific changes in project history.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Open source contributors following project commit guidelines</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Development teams enforcing consistent commit histories</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Automated changelog and release notes generation</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Semantic versioning workflows with CI/CD pipelines</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Junior developers learning best practices for version control</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Combine well-structured commits with our <a href='/tools/text-case-converter' style='color:#0D9488'>Text Case Converter</a> for consistent naming, or format code snippets with our <a href='/tools/json-formatter' style='color:#0D9488'>JSON Formatter</a> before committing configuration changes.` }} />
      </div>
    </section>
  );
}
