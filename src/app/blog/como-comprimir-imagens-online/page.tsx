import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Como comprimir imagens online sem perder qualidade",
  description: "Aprenda como comprimir imagens online gratuitamente sem perder qualidade. Guia completo com dicas para otimizar fotos para web e redes sociais.",
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
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Voltar ao Blog</Link>
        <h1 style={s.h1}>Como comprimir imagens online sem perder qualidade</h1>
        <p style={s.meta}>Novembro 2026 · 5 min de leitura</p>

        <p style={s.p}>Imagens de alta resolução são essenciais para criar conteúdo visual atraente, mas arquivos pesados podem tornar seu site lento, ocupar espaço desnecessário e dificultar o envio por e-mail. A boa notícia é que existem formas de reduzir drasticamente o tamanho dos arquivos sem comprometer a qualidade visual. Neste guia, explicamos como comprimir imagens de forma eficiente usando ferramentas online gratuitas.</p>

        <h2 style={s.h2}>Por que comprimir imagens é importante?</h2>
        <p style={s.p}>Imagens não otimizadas são uma das principais causas de sites lentos. Segundo pesquisas recentes, 53% dos usuários abandonam um site que demora mais de 3 segundos para carregar. Comprimir imagens pode reduzir o tamanho dos arquivos em até 80% sem diferença perceptível na qualidade, melhorando significativamente a velocidade do seu site, o SEO e a experiência do usuário. Além disso, imagens menores economizam espaço de armazenamento e largura de banda.</p>

        <h2 style={s.h2}>Compressão com perda vs. sem perda</h2>
        <p style={s.p}>Existem dois tipos de compressão. A compressão sem perda (lossless) reduz o tamanho do arquivo sem remover nenhum dado da imagem — ideal para gráficos, logos e imagens que precisam de máxima fidelidade. A compressão com perda (lossy) remove dados que o olho humano dificilmente percebe, conseguindo reduções muito maiores no tamanho do arquivo. Para fotos em sites e redes sociais, a compressão com perda moderada oferece o melhor equilíbrio entre qualidade e tamanho.</p>

        <h2 style={s.h2}>Dicas para melhores resultados</h2>
        <p style={s.p}>Para obter os melhores resultados na compressão, comece sempre com a imagem na resolução correta — não faz sentido comprimir uma foto de 4000 pixels se ela será exibida a 800 pixels. Use o formato certo: JPEG para fotos, PNG para gráficos com transparência, e WebP para o melhor equilíbrio geral. Teste diferentes níveis de qualidade e compare visualmente antes de publicar. Na maioria dos casos, uma qualidade entre 70% e 85% oferece resultados excelentes.</p>

        <h2 style={s.h2}>Como comprimir suas imagens agora</h2>
        <p style={s.p}>Use nossa ferramenta gratuita de <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>compressão de imagens</Link> para reduzir o tamanho dos seus arquivos instantaneamente. Basta arrastar suas imagens, ajustar o nível de qualidade e baixar os resultados. O processamento acontece diretamente no seu navegador, então seus arquivos permanecem privados. Você também pode usar nosso <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>redimensionador de imagens</Link> para ajustar as dimensões antes de comprimir.</p>
        <Link href="/tools/image-compressor" style={s.cta}>Comprimir imagens grátis →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
