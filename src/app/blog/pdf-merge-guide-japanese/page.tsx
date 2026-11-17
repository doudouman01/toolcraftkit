import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDFを無料で結合する方法",
  description: "PDFファイルを無料でオンラインで結合する方法を解説。ソフトウェア不要、登録不要で複数のPDFを1つにまとめるステップバイステップガイド。",
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
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← ブログに戻る</Link>
        <h1 style={s.h1}>PDFを無料で結合する方法</h1>
        <p style={s.meta}>2026年11月 · 5分で読めます</p>

        <p style={s.p}>複数のPDFファイルを1つのドキュメントにまとめることは、ビジネスでも学業でも日常的に必要になる作業です。見積書と契約書の統合、スキャンした書類のまとめ、レポートの章の結合など、PDFの結合は文書管理を大幅に効率化します。この記事では、無料かつ安全にPDFを結合する方法をご説明します。</p>

        <h2 style={s.h2}>PDF結合が必要な場面</h2>
        <p style={s.p}>PDF結合は多くの場面で活用できます。就職活動では履歴書と職務経歴書を1つのファイルにまとめ、経理業務では月次の請求書を統合し、学生はレポートと参考資料を結合します。バラバラのファイルを送るよりも、1つにまとまったPDFのほうがプロフェッショナルで管理も簡単です。</p>

        <h2 style={s.h2}>3ステップで簡単結合</h2>
        <p style={s.p}><Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF結合ツール</Link>を使えば、操作は驚くほど簡単です。ステップ1：PDFファイルをツールにドラッグ&ドロップするか、ファイル選択ダイアログから選びます。ステップ2：ドラッグ操作でファイルを好みの順番に並び替えます。ステップ3：結合ボタンをクリックして、完成したPDFをダウンロードします。全体の作業は通常30秒以内で完了します。</p>

        <h2 style={s.h2}>セキュリティとプライバシー</h2>
        <p style={s.p}>多くのオンラインサービスとは異なり、当ツールではファイルがサーバーにアップロードされることはありません。すべての処理はお使いのブラウザ内でローカルに実行されます。契約書や財務書類などの機密ファイルを扱う際にも安心してご利用いただけます。アカウント登録は不要で、ファイルの保存も一切行いません。</p>

        <h2 style={s.h2}>その他の便利なPDFツール</h2>
        <p style={s.p}>結合以外にも、特定のページを抽出するための<Link href="/tools/pdf-split" style={{ color: "#0D9488" }}>PDF分割ツール</Link>や、内容を編集するための<Link href="/tools/pdf-to-word" style={{ color: "#0D9488" }}>PDF→Word変換ツール</Link>もご用意しています。すべてのPDFツールは無料で、登録不要でお使いいただけます。</p>

        <p style={s.p}>今すぐPDF結合ツールをお試しください。文書管理がぐっと楽になります。</p>
        <Link href="/tools/pdf-merge" style={s.cta}>PDFを無料で結合する →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
