import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이미지 무료 압축 방법 가이드",
  description: "이미지를 무료로 온라인에서 압축하는 방법을 알아보세요. 품질 손실 없이 파일 크기를 줄이는 완벽 가이드.",
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
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← 블로그로 돌아가기</Link>
        <h1 style={s.h1}>이미지 무료 압축 방법 가이드</h1>
        <p style={s.meta}>2026년 11월 · 5분 읽기</p>

        <p style={s.p}>고해상도 이미지는 매력적인 비주얼 콘텐츠를 만드는 데 필수적이지만, 큰 파일은 웹사이트를 느리게 하고, 저장 공간을 차지하며, 이메일 전송을 어렵게 합니다. 다행히 시각적 품질을 유지하면서 파일 크기를 대폭 줄일 수 있는 방법이 있습니다. 이 가이드에서는 무료 온라인 도구를 사용하여 이미지를 효율적으로 압축하는 방법을 설명합니다.</p>

        <h2 style={s.h2}>이미지 압축이 중요한 이유</h2>
        <p style={s.p}>최적화되지 않은 이미지는 웹사이트 속도 저하의 주요 원인 중 하나입니다. 최근 연구에 따르면 사용자의 53%가 로딩에 3초 이상 걸리는 사이트를 떠납니다. 이미지 압축은 눈에 띄는 품질 차이 없이 파일 크기를 최대 80%까지 줄여, 사이트 속도, SEO 순위, 사용자 경험을 크게 개선합니다. 또한 저장 공간과 대역폭도 절약됩니다.</p>

        <h2 style={s.h2}>손실 압축 vs 무손실 압축</h2>
        <p style={s.p}>압축에는 두 가지 유형이 있습니다. 무손실 압축은 이미지의 데이터를 제거하지 않고 파일 크기를 줄입니다 — 로고나 최대 충실도가 필요한 그래픽에 이상적입니다. 손실 압축은 사람의 눈으로 거의 인식하지 못하는 데이터를 제거하여 훨씬 더 큰 파일 크기 감소를 달성합니다. 웹사이트와 소셜 미디어용 사진의 경우, 적당한 손실 압축이 품질과 크기의 최적 균형을 제공합니다.</p>

        <h2 style={s.h2}>최상의 결과를 위한 팁</h2>
        <p style={s.p}>최상의 압축 결과를 얻으려면 항상 올바른 해상도의 이미지로 시작하세요 — 800픽셀로 표시될 이미지를 4000픽셀로 압축하는 것은 의미가 없습니다. 적합한 포맷을 사용하세요: 사진은 JPEG, 투명도가 있는 그래픽은 PNG, 전반적으로 가장 좋은 균형은 WebP입니다. 다양한 품질 수준을 테스트하고 게시 전에 시각적으로 비교해 보세요.</p>

        <h2 style={s.h2}>지금 바로 이미지를 무료로 압축하세요</h2>
        <p style={s.p}>무료 <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>이미지 압축 도구</Link>를 사용하여 파일 크기를 즉시 줄이세요. 이미지를 드래그하고, 품질 수준을 조정하고, 결과를 다운로드하면 됩니다. 처리는 브라우저에서 직접 이루어지므로 파일은 비공개로 유지됩니다. <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>이미지 크기 조절 도구</Link>로 압축 전에 크기를 조정할 수도 있습니다.</p>
        <Link href="/tools/image-compressor" style={s.cta}>이미지 무료 압축하기 →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
