import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Las mejores herramientas PDF gratuitas en línea (2026)",
  description: "Descubre las mejores herramientas PDF gratuitas para fusionar, dividir, convertir y editar archivos PDF en línea sin instalar nada.",
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
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Volver al Blog</Link>
        <h1 style={s.h1}>Las mejores herramientas PDF gratuitas en línea (2026)</h1>
        <p style={s.meta}>Noviembre 2026 · 6 min de lectura</p>

        <p style={s.p}>Trabajar con archivos PDF es una tarea diaria para millones de personas en todo el mundo. Ya sea que necesites fusionar documentos para una presentación, dividir un archivo grande, o convertir un PDF a Word para editarlo, encontrar herramientas confiables y gratuitas puede ser todo un desafío. En esta guía te presentamos las mejores herramientas PDF en línea que puedes usar directamente desde tu navegador, sin descargar software ni crear una cuenta.</p>

        <h2 style={s.h2}>¿Por qué usar herramientas PDF en línea?</h2>
        <p style={s.p}>Las herramientas PDF en línea ofrecen ventajas significativas frente al software tradicional. No necesitas instalar nada en tu computadora, funcionan en cualquier sistema operativo (Windows, Mac, Linux, e incluso dispositivos móviles), y la mayoría son completamente gratuitas. Además, las mejores herramientas procesan los archivos directamente en tu navegador, lo que significa que tus documentos nunca salen de tu dispositivo y tu privacidad queda protegida.</p>

        <h2 style={s.h2}>Fusionar PDF: combina varios archivos en uno</h2>
        <p style={s.p}>Una de las tareas más comunes es combinar múltiples archivos PDF en un solo documento. Esto es especialmente útil cuando necesitas unir facturas, contratos, o capítulos de un libro. Con nuestra herramienta <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>Fusionar PDF</Link>, simplemente arrastra tus archivos, ordénalos como prefieras, y descarga el resultado en segundos. No hay límite de tamaño y el proceso es completamente privado.</p>

        <h2 style={s.h2}>Dividir y convertir PDF</h2>
        <p style={s.p}>¿Tienes un PDF de 100 páginas y solo necesitas las primeras 10? Nuestra herramienta <Link href="/tools/pdf-split" style={{ color: "#0D9488" }}>Dividir PDF</Link> te permite extraer las páginas que necesites en segundos. Y si necesitas editar el contenido de un PDF, puedes convertirlo a formato Word con la herramienta <Link href="/tools/pdf-to-word" style={{ color: "#0D9488" }}>PDF a Word</Link>, realizar tus cambios, y luego volver a convertirlo a PDF usando <Link href="/tools/word-to-pdf" style={{ color: "#0D9488" }}>Word a PDF</Link>.</p>

        <h2 style={s.h2}>Consejos para trabajar con PDF de forma eficiente</h2>
        <p style={s.p}>Para aprovechar al máximo las herramientas PDF, ten en cuenta estos consejos: organiza tus archivos antes de fusionarlos para ahorrar tiempo, usa nombres descriptivos para encontrarlos fácilmente después, y cuando conviertas de PDF a Word, revisa el formato del documento resultante ya que algunos elementos gráficos pueden cambiar ligeramente. También es recomendable comprimir los PDF grandes antes de enviarlos por correo electrónico para evitar problemas con los límites de tamaño de los archivos adjuntos.</p>

        <h2 style={s.h2}>Empieza a trabajar con PDF gratis ahora</h2>
        <p style={s.p}>Todas nuestras herramientas PDF son 100% gratuitas, no requieren registro y funcionan directamente en tu navegador. Tus archivos se procesan localmente, garantizando la privacidad de tus documentos. Prueba nuestra herramienta más popular y fusiona tus PDF en segundos.</p>
        <Link href="/tools/pdf-merge" style={s.cta}>Fusionar PDF gratis →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
