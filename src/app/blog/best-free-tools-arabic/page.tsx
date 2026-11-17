import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أفضل الأدوات المجانية على الإنترنت 2026",
  description: "اكتشف أفضل الأدوات المجانية على الإنترنت لعام 2026 لملفات PDF والصور والنصوص والإنتاجية. كل شيء في متصفحك بدون تثبيت.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px", direction: "rtl" as const } as const,
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
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← العودة إلى المدونة</Link>
        <h1 style={s.h1}>أفضل الأدوات المجانية على الإنترنت 2026</h1>
        <p style={s.meta}>نوفمبر 2026 · 6 دقائق قراءة</p>

        <p style={s.p}>في عصرنا الرقمي، نحتاج يومياً إلى أدوات متنوعة للتعامل مع الملفات والصور والنصوص. سواء كنت طالباً أو موظفاً أو صاحب عمل حر، فإن الأدوات المجانية على الإنترنت توفر لك الوقت والمال. في هذا الدليل، نقدم لك أفضل الأدوات المتاحة مجاناً التي يمكنك استخدامها مباشرة من متصفحك دون الحاجة لتثبيت أي برنامج.</p>

        <h2 style={s.h2}>أدوات PDF الأساسية</h2>
        <p style={s.p}>ملفات PDF هي الأكثر استخداماً في العمل والدراسة. أداة <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>دمج PDF</Link> تتيح لك دمج عدة ملفات في ملف واحد بسهولة تامة. يمكنك أيضاً تقسيم الملفات الكبيرة، وتحويل PDF إلى Word والعكس. جميع العمليات تتم محلياً في متصفحك، مما يعني أن ملفاتك تبقى خاصة وآمنة تماماً.</p>

        <h2 style={s.h2}>أدوات الصور</h2>
        <p style={s.p}>الصور الكبيرة تبطئ المواقع الإلكترونية وتستهلك مساحة التخزين. أداة <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>ضغط الصور</Link> تقلل حجم ملفاتك بنسبة تصل إلى 80% دون فقدان ملحوظ في الجودة. كما يمكنك تغيير حجم الصور وتحويل الصيغ وإضافة علامات مائية — كل ذلك مجاناً وبدون تسجيل.</p>

        <h2 style={s.h2}>أدوات النصوص والإنتاجية</h2>
        <p style={s.p}>لمن يعمل مع النصوص بشكل يومي، نقدم أدوات مثل <Link href="/tools/word-counter" style={{ color: "#0D9488" }}>عداد الكلمات</Link> ومقارن النصوص ومولد Lorem Ipsum ومحولات الحروف. هذه الأدوات ضرورية للكتّاب والصحفيين والطلاب ومتخصصي التسويق الرقمي الذين يحتاجون للعمل بكفاءة مع النصوص.</p>

        <h2 style={s.h2}>الخصوصية والأمان</h2>
        <p style={s.p}>ما يميز أدواتنا عن غيرها هو الأمان التام. جميع الملفات تُعالج محلياً في متصفحك ولا يتم رفعها إلى أي خادم خارجي. لا نطلب تسجيل حساب ولا نخزن أي بيانات. هذا يعني حماية كاملة لمستنداتك الحساسة وصورك الشخصية.</p>

        <h2 style={s.h2}>ابدأ الآن مجاناً</h2>
        <p style={s.p}>استكشف مجموعتنا التي تضم أكثر من 100 أداة مجانية متاحة بـ 25 لغة. جرّب الأدوات الآن وحسّن إنتاجيتك اليومية.</p>
        <Link href="/tools/pdf-merge" style={s.cta}>استكشف الأدوات المجانية ←</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
