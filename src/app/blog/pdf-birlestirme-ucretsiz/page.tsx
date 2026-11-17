import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Birleştirme: Ücretsiz ve Kayıt Olmadan",
  description: "PDF dosyalarını ücretsiz olarak online birleştirin. Yazılım veya kayıt gerekmeden birden fazla PDF'yi tek bir dosyada birleştirme rehberi.",
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
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Blog&apos;a Dön</Link>
        <h1 style={s.h1}>PDF Birleştirme: Ücretsiz ve Kayıt Olmadan</h1>
        <p style={s.meta}>Kasım 2026 · 5 dk okuma</p>

        <p style={s.p}>Birden fazla PDF dosyasını tek bir belgede birleştirmek, dijital ofis hayatında en sık karşılaşılan görevlerden biridir. Başvuru belgelerini bir araya getirmek, faturaları toplamak veya rapor bölümlerini birleştirmek istiyorsanız, doğru online araçla bu işlemi saniyeler içinde, ücretsiz ve yazılım yüklemeden gerçekleştirebilirsiniz.</p>

        <h2 style={s.h2}>PDF Birleştirme Ne Zaman Gerekli?</h2>
        <p style={s.p}>Kullanım alanları çok çeşitlidir: insan kaynakları uzmanları özgeçmiş ve ön yazıları birleştirir, muhasebeciler aylık faturaları toplar, öğrenciler ödev ve eklerini birleştirir, serbest çalışanlar kapsamlı teklifler oluşturur. Tek bir iyi düzenlenmiş PDF, ayrı dosya koleksiyonundan çok daha profesyonel ve kullanışlıdır.</p>

        <h2 style={s.h2}>3 Adımda Nasıl Yapılır?</h2>
        <p style={s.p}>Ücretsiz <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF Birleştirme</Link> aracımızla işlem son derece kolaydır. Adım 1: PDF dosyalarınızı araca sürükleyip bırakın veya dosya seçim iletişim kutusundan seçin. Adım 2: Dosyaları sürükleyerek istediğiniz sıraya dizin. Adım 3: Birleştir düğmesine tıklayın ve tamamlanmış belgenizi indirin. Tüm süreç genellikle bir dakikadan kısa sürer.</p>

        <h2 style={s.h2}>Veri Güvenliği Önceliğimiz</h2>
        <p style={s.p}>Birçok online servisten farklı olarak, dosyalarınız bizim sunucularımıza yüklenmez. Tüm işlemler doğrudan tarayıcınızda gerçekleştirilir. Bu, gizli belgelerinizin hiçbir zaman cihazınızdan ayrılmadığı anlamına gelir. Sözleşmeler, mali belgeler veya kişisel veriler gibi hassas dosyalarla çalışırken güvenle kullanabilirsiniz. Kayıt veya e-posta adresi gerekmez.</p>

        <h2 style={s.h2}>Diğer Faydalı PDF Araçları</h2>
        <p style={s.p}>Birleştirmenin yanı sıra, belirli sayfaları ayıklamak için <Link href="/tools/pdf-split" style={{ color: "#0D9488" }}>PDF Bölme</Link> ve içeriği düzenlemek için <Link href="/tools/pdf-to-word" style={{ color: "#0D9488" }}>PDF&apos;den Word&apos;e Dönüştürme</Link> araçlarını da sunuyoruz. Tüm PDF araçlarımız ücretsiz ve kayıt gerektirmeden kullanılabilir.</p>

        <p style={s.p}>Hemen deneyin ve belge yönetiminizi kolaylaştırın.</p>
        <Link href="/tools/pdf-merge" style={s.cta}>PDF&apos;leri Ücretsiz Birleştir →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
