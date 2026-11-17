import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF zusammenfügen: Kostenlos und ohne Anmeldung",
  description: "PDF-Dateien kostenlos zusammenfügen — online, ohne Anmeldung und ohne Software. Schritt-für-Schritt-Anleitung zum Kombinieren von PDFs.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Zurück zum Blog</Link>
        <h1 style={s.h1}>PDF zusammenfügen: Kostenlos und ohne Anmeldung</h1>
        <p style={s.meta}>November 2026 · 5 Min. Lesezeit</p>

        <p style={s.p}>Mehrere PDF-Dateien zu einem einzigen Dokument zusammenzufügen gehört zu den häufigsten Aufgaben im digitalen Büroalltag. Ob Sie Bewerbungsunterlagen bündeln, Rechnungen zusammenfassen oder Kapitel eines Berichts vereinen möchten — mit dem richtigen Online-Tool gelingt das in Sekunden, kostenlos und ohne Softwareinstallation.</p>

        <h2 style={s.h2}>Wann braucht man PDF-Zusammenführung?</h2>
        <p style={s.p}>Die Anwendungsfälle sind vielfältig: Personalverantwortliche fügen Lebensläufe und Anschreiben zusammen, Buchhalter kombinieren monatliche Rechnungen, Studenten vereinen Seminararbeiten mit Anhängen, und Freiberufler erstellen umfassende Angebote aus mehreren Dokumenten. Ein einziges, gut strukturiertes PDF ist professioneller und einfacher zu handhaben als eine Sammlung einzelner Dateien.</p>

        <h2 style={s.h2}>So funktioniert es in 3 Schritten</h2>
        <p style={s.p}>Mit unserem kostenlosen Tool <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF zusammenfügen</Link> ist der Vorgang denkbar einfach. Schritt 1: Ziehen Sie Ihre PDF-Dateien in das Tool oder wählen Sie sie über den Datei-Dialog aus. Schritt 2: Ordnen Sie die Dateien per Drag-and-Drop in der gewünschten Reihenfolge an. Schritt 3: Klicken Sie auf &quot;Zusammenfügen&quot; und laden Sie Ihr fertiges Dokument herunter. Der gesamte Vorgang dauert in der Regel weniger als eine Minute.</p>

        <h2 style={s.h2}>Maximale Sicherheit für Ihre Daten</h2>
        <p style={s.p}>Datenschutz hat bei uns höchste Priorität. Anders als viele andere Online-Dienste werden Ihre Dateien bei uns nicht auf Server hochgeladen. Die gesamte Verarbeitung findet direkt in Ihrem Browser statt. Das bedeutet: Ihre vertraulichen Dokumente verlassen zu keinem Zeitpunkt Ihr Gerät. Es ist weder eine Registrierung noch eine E-Mail-Adresse erforderlich.</p>

        <h2 style={s.h2}>Weitere nützliche PDF-Tools</h2>
        <p style={s.p}>Neben dem Zusammenfügen bieten wir weitere praktische PDF-Tools: <Link href="/tools/pdf-split" style={{ color: "#0D9488" }}>PDF aufteilen</Link> zum Extrahieren einzelner Seiten und <Link href="/tools/pdf-to-word" style={{ color: "#0D9488" }}>PDF in Word umwandeln</Link> zur Bearbeitung des Inhalts. Alle Tools sind kostenlos und ohne Registrierung nutzbar.</p>

        <p style={s.p}>Probieren Sie es jetzt aus und vereinfachen Sie Ihre Dokumentenverwaltung.</p>
        <Link href="/tools/pdf-merge" style={s.cta}>PDFs jetzt zusammenfügen →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
