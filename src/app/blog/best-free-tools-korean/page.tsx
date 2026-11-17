import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026년 최고의 무료 온라인 도구",
  description: "2026년 최고의 무료 온라인 도구를 소개합니다. PDF, 이미지, 텍스트, 생산성 도구를 브라우저에서 바로 사용하세요. 설치 불필요.",
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
        <h1 style={s.h1}>2026년 최고의 무료 온라인 도구</h1>
        <p style={s.meta}>2026년 11월 · 6분 읽기</p>

        <p style={s.p}>디지털 시대에 PDF 편집, 이미지 압축, 텍스트 비교 등 다양한 작업을 위한 도구가 매일 필요합니다. 하지만 더 이상 비싼 소프트웨어를 설치할 필요가 없습니다. 2026년에는 브라우저에서 바로 사용할 수 있는 뛰어난 무료 온라인 도구가 많이 있습니다. 이 글에서는 업무와 학습 생산성을 높여주는 최고의 도구를 소개합니다.</p>

        <h2 style={s.h2}>필수 PDF 도구</h2>
        <p style={s.p}>PDF 파일은 업무와 학업에서 빼놓을 수 없는 존재입니다. <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF 합치기</Link> 도구를 사용하면 여러 PDF 파일을 몇 초 만에 하나의 문서로 합칠 수 있습니다. 청구서 통합, 보고서 챕터 결합, 신청 서류 정리 등 모든 상황에서 활용할 수 있습니다. 모든 처리는 브라우저 내에서 로컬로 이루어지므로 파일이 외부로 전송되지 않습니다.</p>

        <h2 style={s.h2}>이미지 편집 도구</h2>
        <p style={s.p}>큰 이미지 파일은 웹사이트 로딩 속도를 느리게 하고 이메일 전송을 어렵게 합니다. <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>이미지 압축 도구</Link>를 사용하면 눈에 보이는 품질 저하 없이 파일 크기를 최대 80%까지 줄일 수 있습니다. 크기 조절, 포맷 변환, 워터마크 추가 등도 모두 무료로 가입 없이 사용할 수 있습니다.</p>

        <h2 style={s.h2}>텍스트 및 생산성 도구</h2>
        <p style={s.p}>글을 다루는 분들을 위해 <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>글자 수 세기</Link>, 텍스트 비교, Lorem Ipsum 생성기, 대소문자 변환 등의 도구를 제공합니다. SNS 글자 수 제한 확인, SEO를 위한 글 최적화, 텍스트 정리 등 작가, 학생, 마케터에게 꼭 필요한 도구입니다.</p>

        <h2 style={s.h2}>개인정보 보호 및 보안</h2>
        <p style={s.p}>저희 도구의 큰 장점은 모든 파일 처리가 브라우저 내에서 로컬로 이루어진다는 것입니다. 파일이 외부 서버에 업로드되는 일은 절대 없습니다. 계정 등록도 필요 없고 데이터를 저장하지도 않습니다. 기밀 문서나 개인 사진을 안심하고 처리할 수 있습니다.</p>

        <h2 style={s.h2}>지금 바로 무료로 시작하세요</h2>
        <p style={s.p}>25개 언어로 제공되는 100개 이상의 무료 도구 컬렉션을 확인해 보세요. 프리랜서, 기업가, 학생, 크리에이터 등 누구에게나 필요한 도구를 찾을 수 있습니다.</p>
        <Link href="/tools/pdf-merge" style={s.cta}>무료 도구 둘러보기 →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
