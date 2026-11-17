import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF फाइलों को मुफ्त में कैसे जोड़ें",
  description: "PDF फाइलों को मुफ्त में ऑनलाइन कैसे जोड़ें सीखें। बिना सॉफ़्टवेयर, बिना रजिस्ट्रेशन — कई PDF को एक फ़ाइल में मर्ज करने की स्टेप-बाय-स्टेप गाइड।",
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
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← ब्लॉग पर वापस जाएं</Link>
        <h1 style={s.h1}>PDF फाइलों को मुफ्त में कैसे जोड़ें</h1>
        <p style={s.meta}>नवंबर 2026 · 5 मिनट पढ़ने का समय</p>

        <p style={s.p}>कई PDF फ़ाइलों को एक डॉक्यूमेंट में जोड़ना ऑफ़िस और पढ़ाई दोनों में सबसे आम ज़रूरतों में से एक है। कोटेशन और कॉन्ट्रैक्ट को एक साथ करना हो, स्कैन किए गए पेजों को मर्ज करना हो या रिपोर्ट के चैप्टर जोड़ने हों — PDF मर्ज करने से डॉक्यूमेंट मैनेजमेंट बहुत आसान हो जाता है। इस गाइड में हम बताएंगे कि यह काम मुफ्त में और सुरक्षित तरीके से कैसे करें।</p>

        <h2 style={s.h2}>PDF मर्ज करने की ज़रूरत कब होती है?</h2>
        <p style={s.p}>PDF मर्ज करना कई जगह काम आता है। नौकरी के आवेदन में रिज़्यूमे और कवर लेटर को एक फ़ाइल में जोड़ना, अकाउंटिंग में महीने के बिलों को एक साथ करना, स्टूडेंट्स का असाइनमेंट और रेफ़रेंस मटेरियल मर्ज करना — अलग-अलग फ़ाइलें भेजने से एक मर्ज की हुई PDF ज़्यादा प्रोफ़ेशनल और मैनेज करने में आसान होती है।</p>

        <h2 style={s.h2}>3 आसान स्टेप्स में PDF मर्ज करें</h2>
        <p style={s.p}><Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF मर्ज करें</Link> टूल से यह काम बेहद आसान है। स्टेप 1: अपनी PDF फ़ाइलों को टूल में ड्रैग एंड ड्रॉप करें या फ़ाइल सेलेक्ट डायलॉग से चुनें। स्टेप 2: फ़ाइलों को ड्रैग करके अपनी मनचाही क्रम में लगाएं। स्टेप 3: मर्ज बटन पर क्लिक करें और तैयार PDF डाउनलोड करें। पूरा प्रोसेस आमतौर पर 30 सेकंड से कम समय में हो जाता है।</p>

        <h2 style={s.h2}>सुरक्षा और प्राइवेसी</h2>
        <p style={s.p}>कई ऑनलाइन सर्विसेज़ के विपरीत, हमारे टूल में फ़ाइलें सर्वर पर अपलोड नहीं होतीं। सारी प्रोसेसिंग सीधे आपके ब्राउज़र में होती है। इसका मतलब है कि आपके गोपनीय दस्तावेज़ कभी आपके डिवाइस से बाहर नहीं जाते। कॉन्ट्रैक्ट, फ़ाइनेंशियल डॉक्यूमेंट या पर्सनल डेटा — सब कुछ सुरक्षित रहता है। कोई रजिस्ट्रेशन या ईमेल एड्रेस की ज़रूरत नहीं है।</p>

        <h2 style={s.h2}>अन्य उपयोगी PDF टूल्स</h2>
        <p style={s.p}>मर्ज करने के अलावा, कुछ ख़ास पेज निकालने के लिए <Link href="/tools/pdf-split" style={{ color: "#0D9488" }}>PDF स्प्लिट</Link> और कंटेंट एडिट करने के लिए <Link href="/tools/pdf-to-word" style={{ color: "#0D9488" }}>PDF से Word</Link> कन्वर्टर भी उपलब्ध है। सभी PDF टूल्स मुफ्त हैं और बिना रजिस्ट्रेशन के इस्तेमाल किए जा सकते हैं।</p>

        <p style={s.p}>अभी PDF मर्ज टूल आज़माएं और अपने डॉक्यूमेंट मैनेजमेंट को आसान बनाएं।</p>
        <Link href="/tools/pdf-merge" style={s.cta}>PDF मुफ्त में मर्ज करें →</Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
