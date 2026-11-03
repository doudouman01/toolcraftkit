"use client";

const seoS = {
  wrapper: { maxWidth: 760, margin: "0 auto", padding: "40px 20px 60px" } as const,
  h2: { fontSize: 22, fontWeight: 700 as const, color: "#1C1917", marginBottom: 12, marginTop: 32 },
  h3: { fontSize: 17, fontWeight: 600 as const, color: "#1C1917", marginBottom: 8, marginTop: 24 },
  p: { fontSize: 15, lineHeight: 1.75, color: "#44403C", marginBottom: 14 },
};

export default function SeoContent() {
  return (
    <div style={seoS.wrapper}>
      <h2 style={{ ...seoS.h2, marginTop: 0 }}>What Is a Cookie Consent Banner?</h2>
      <p style={seoS.p}>
        A cookie consent banner is a notification displayed on a website informing visitors that the site uses cookies and requesting their permission before storing cookies on their device. Since the implementation of the GDPR in Europe and similar regulations worldwide, displaying a cookie consent banner has become a legal requirement for most websites that collect user data.
      </p>
      <p style={seoS.p}>
        Our free Cookie Consent Banner Generator creates a fully functional, customizable banner with clean HTML, CSS, and JavaScript code that you can paste directly into your website. No external libraries, no tracking scripts, no dependencies — just lightweight code that works everywhere.
      </p>

      <h2 style={seoS.h2}>Why Does Your Website Need a Cookie Consent Banner?</h2>

      <h3 style={seoS.h3}>Legal Compliance</h3>
      <p style={seoS.p}>
        Under the GDPR (General Data Protection Regulation), the ePrivacy Directive, the CCPA (California Consumer Privacy Act), and other data protection laws, websites must obtain informed consent before placing non-essential cookies on a visitor&apos;s device. Failure to comply can result in significant fines — up to €20 million or 4% of annual global revenue under the GDPR.
      </p>

      <h3 style={seoS.h3}>User Trust and Transparency</h3>
      <p style={seoS.p}>
        A well-designed cookie consent banner demonstrates to your visitors that you respect their privacy and are transparent about your data collection practices. This builds trust and improves user confidence in your website.
      </p>

      <h3 style={seoS.h3}>SEO and Core Web Vitals</h3>
      <p style={seoS.p}>
        Heavy third-party cookie consent solutions can slow down your website and negatively impact Core Web Vitals scores. Our generator produces lightweight, self-contained code that loads instantly and has zero impact on your page speed — giving you compliance without sacrificing performance.
      </p>

      <h2 style={seoS.h2}>Features of This Cookie Consent Banner Generator</h2>
      <p style={seoS.p}>
        <strong>Customizable design</strong> — Choose from four banner positions (bottom bar, top bar, center popup, or bottom-left corner), three themes (light, dark, or custom colors), and adjust the primary and text colors to match your brand identity perfectly.
      </p>
      <p style={seoS.p}>
        <strong>Flexible button options</strong> — Configure accept, reject, and manage preferences buttons with custom text. Toggle visibility of each button based on your compliance needs and user experience preferences.
      </p>
      <p style={seoS.p}>
        <strong>Self-contained code</strong> — The generated code uses vanilla JavaScript with no external dependencies. It stores the user&apos;s consent choice in a browser cookie for 365 days and hides the banner automatically on return visits.
      </p>
      <p style={seoS.p}>
        <strong>Live preview</strong> — See exactly how your banner will look before generating the code, making it easy to fine-tune the appearance and layout.
      </p>

      <h2 style={seoS.h2}>How to Install the Cookie Consent Banner</h2>
      <p style={seoS.p}>
        After generating your banner code, copy the complete output (CSS + HTML + JavaScript) and paste it just before the closing <code>&lt;/body&gt;</code> tag of your website. The banner will appear automatically on every page load until the visitor makes a choice. Their preference is saved for one year.
      </p>
      <p style={seoS.p}>
        For platforms like WordPress, Shopify, or Squarespace, paste the code into your theme&apos;s footer section or use a custom HTML block. For single-page applications built with React, Next.js, or Vue, you can include the code in your main layout component.
      </p>
    </div>
  );
}
