import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ToolCraftKit privacy policy. How we handle your data, cookies, and third-party services.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 32 } as const,
    h2: { fontSize: 18, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 8 } as const,
    p: { fontSize: 14, color: "#57534E", lineHeight: 1.8, marginBottom: 12 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <h1 style={s.h1}>Privacy Policy</h1>
        <p style={s.sub}>Last updated: August 2026</p>

        <p style={s.p}>ToolCraftKit (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website toolcraftkit.com. This page explains how we collect, use, and protect your information when you use our website.</p>

        <h2 style={s.h2}>Information We Collect</h2>
        <p style={s.p}>ToolCraftKit is designed with privacy in mind. All tools run entirely in your browser. We do not collect, store, transmit, or have access to any data you enter into our tools — including text, numbers, URLs, passwords, invoice details, or any other input. Your data never leaves your device.</p>

        <h2 style={s.h2}>Cookies and Tracking</h2>
        <p style={s.p}>We do not use our own cookies or tracking technologies. However, third-party services integrated into our website (such as Google AdSense and Google Analytics) may use cookies to serve personalized ads and analyze traffic. These cookies are governed by Google&apos;s own privacy policies.</p>

        <h2 style={s.h2}>Google AdSense</h2>
        <p style={s.p}>We use Google AdSense to display advertisements on our website. Google AdSense may use cookies and web beacons to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google&apos;s Ads Settings at ads.google.com/settings. For more information about how Google uses your data, visit Google&apos;s Privacy Policy at policies.google.com/privacy.</p>

        <h2 style={s.h2}>Google Analytics</h2>
        <p style={s.p}>We may use Google Analytics to understand how visitors interact with our website. Google Analytics collects information such as how often users visit the site, which pages they view, and what other sites they visited before. We use this information solely to improve our website. Google Analytics uses cookies but does not collect personally identifiable information.</p>

        <h2 style={s.h2}>Third-Party Links</h2>
        <p style={s.p}>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to read the privacy policies of any third-party sites you visit.</p>

        <h2 style={s.h2}>Children&apos;s Privacy</h2>
        <p style={s.p}>Our website is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it.</p>

        <h2 style={s.h2}>Data Security</h2>
        <p style={s.p}>Since all tools run in your browser and we do not collect or store any user data, there is no database of user information to protect. Our website is served over HTTPS to ensure secure communication between your browser and our servers.</p>

        <h2 style={s.h2}>Changes to This Policy</h2>
        <p style={s.p}>We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. Your continued use of the website after any changes constitutes your acceptance of the new policy.</p>

        <h2 style={s.h2}>Contact Us</h2>
        <p style={s.p}>If you have any questions about this privacy policy, you can contact us at: privacy@toolcraftkit.com</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
