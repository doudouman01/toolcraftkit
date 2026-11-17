import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comment fusionner des PDF gratuitement en ligne",
  description: "Apprenez comment fusionner des fichiers PDF gratuitement en ligne sans logiciel. Guide étape par étape pour combiner vos documents PDF en un seul fichier.",
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
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Retour au Blog</Link>
        <h1 style={s.h1}>Comment fusionner des PDF gratuitement en ligne</h1>
        <p style={s.meta}>Novembre 2026 · 5 min de lecture</p>

        <p style={s.p}>Fusionner plusieurs fichiers PDF en un seul document est l&apos;une des tâches les plus fréquentes lors du travail avec des documents numériques. Que ce soit pour rassembler des factures, combiner les chapitres d&apos;un rapport, ou regrouper des formulaires signés, la fusion de PDF simplifie considérablement la gestion de vos fichiers. Dans ce guide, nous vous montrons comment le faire gratuitement et en toute sécurité.</p>

        <h2 style={s.h2}>Pourquoi fusionner des PDF ?</h2>
        <p style={s.p}>La fusion de PDF est utile dans de nombreuses situations professionnelles et personnelles. Les cas d&apos;usage les plus courants incluent : regrouper des documents pour un dossier de candidature, combiner des pages numérisées en un seul fichier, assembler les pièces jointes d&apos;un contrat, ou créer un portfolio à partir de plusieurs fichiers. Un seul document bien organisé est toujours plus professionnel et plus facile à partager qu&apos;une collection de fichiers séparés.</p>

        <h2 style={s.h2}>Comment fusionner vos PDF en 3 étapes</h2>
        <p style={s.p}>Avec notre outil <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>Fusionner PDF</Link>, le processus est simple et rapide. Première étape : glissez-déposez vos fichiers PDF dans l&apos;outil ou cliquez pour les sélectionner. Deuxième étape : réorganisez les fichiers dans l&apos;ordre souhaité en les faisant glisser. Troisième étape : cliquez sur le bouton de fusion et téléchargez votre nouveau fichier PDF combiné. L&apos;ensemble du processus prend généralement moins de 30 secondes.</p>

        <h2 style={s.h2}>Sécurité et confidentialité</h2>
        <p style={s.p}>Contrairement à de nombreux services en ligne qui envoient vos fichiers sur leurs serveurs, notre outil de fusion PDF traite tout directement dans votre navigateur. Vos documents ne quittent jamais votre appareil, ce qui est particulièrement important lorsque vous travaillez avec des fichiers sensibles comme des contrats, des documents financiers ou des données personnelles. Aucune inscription n&apos;est requise et aucun fichier n&apos;est stocké.</p>

        <h2 style={s.h2}>Autres outils PDF complémentaires</h2>
        <p style={s.p}>En plus de la fusion, vous pourriez avoir besoin de <Link href="/tools/pdf-split" style={{ color: "#0D9488" }}>diviser un PDF</Link> pour extraire certaines pages, ou de <Link href="/tools/pdf-to-word" style={{ color: "#0D9488" }}>convertir un PDF en Word</Link> pour modifier son contenu. Tous nos outils PDF sont gratuits, sans inscription, et respectent votre vie privée.</p>

        <p style={s.p}>Essayez notre outil de fusion PDF dès maintenant et simplifiez la gestion de vos documents.</p>
        <Link href="/tools/pdf-merge" style={s.cta}>Fusionner des PDF gratuitement →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
