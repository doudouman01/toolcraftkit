import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "كيفية ضغط الصور أونلاين مجاناً",
  description: "تعلم كيفية ضغط الصور أونلاين مجاناً بدون فقدان الجودة. دليل شامل لتحسين الصور للمواقع ووسائل التواصل الاجتماعي.",
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
        <h1 style={s.h1}>كيفية ضغط الصور أونلاين مجاناً</h1>
        <p style={s.meta}>نوفمبر 2026 · 5 دقائق قراءة</p>

        <p style={s.p}>الصور عالية الدقة ضرورية لإنشاء محتوى بصري جذاب، لكن الملفات الكبيرة قد تبطئ موقعك الإلكتروني وتستهلك مساحة التخزين وتصعّب إرسالها عبر البريد الإلكتروني. الخبر السار هو أنه يمكنك تقليل حجم الصور بشكل كبير دون التأثير على جودتها المرئية. في هذا الدليل، نشرح لك كيفية ضغط الصور بكفاءة باستخدام أدوات مجانية على الإنترنت.</p>

        <h2 style={s.h2}>لماذا يجب ضغط الصور؟</h2>
        <p style={s.p}>الصور غير المحسّنة هي من أبرز أسباب بطء المواقع الإلكترونية. تشير الدراسات إلى أن 53% من المستخدمين يغادرون الموقع إذا استغرق تحميله أكثر من 3 ثوانٍ. ضغط الصور يمكن أن يقلل حجم الملفات بنسبة تصل إلى 80% دون فرق ملحوظ في الجودة، مما يحسّن سرعة الموقع وترتيبه في محركات البحث وتجربة المستخدم بشكل ملموس.</p>

        <h2 style={s.h2}>أنواع الضغط: مع فقدان وبدون فقدان</h2>
        <p style={s.p}>هناك نوعان من الضغط. الضغط بدون فقدان يقلل حجم الملف دون إزالة أي بيانات من الصورة — مثالي للشعارات والرسومات التي تحتاج دقة عالية. الضغط مع فقدان يزيل بيانات لا تلاحظها العين البشرية، محققاً تقليصات أكبر بكثير في حجم الملف. للصور في المواقع ووسائل التواصل الاجتماعي، الضغط المعتدل مع فقدان يقدم أفضل توازن بين الجودة والحجم.</p>

        <h2 style={s.h2}>نصائح للحصول على أفضل النتائج</h2>
        <p style={s.p}>للحصول على أفضل نتائج الضغط، ابدأ دائماً بالصورة بالدقة الصحيحة — لا فائدة من ضغط صورة بعرض 4000 بكسل إذا ستُعرض بعرض 800 بكسل. استخدم الصيغة المناسبة: JPEG للصور الفوتوغرافية، PNG للرسومات ذات الشفافية، و WebP للتوازن الأفضل بشكل عام. جرّب مستويات جودة مختلفة وقارن بصرياً قبل النشر.</p>

        <h2 style={s.h2}>اضغط صورك الآن مجاناً</h2>
        <p style={s.p}>استخدم أداة <Link href="/tools/image-compressor" style={{ color: "#0D9488" }}>ضغط الصور</Link> المجانية لتقليل حجم ملفاتك فوراً. ما عليك سوى سحب صورك وضبط مستوى الجودة وتحميل النتائج. تتم المعالجة مباشرة في متصفحك، لذا تبقى ملفاتك خاصة. يمكنك أيضاً استخدام أداة <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>تغيير حجم الصور</Link> لضبط الأبعاد قبل الضغط.</p>
        <Link href="/tools/image-compressor" style={s.cta}>ضغط الصور مجاناً ←</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
