"use client";

const seoS = {
  section: { maxWidth: 760, margin: "0 auto", padding: "40px 20px 60px" } as const,
  h2: { fontSize: 22, fontWeight: 700 as const, color: "#1C1917", marginBottom: 12, marginTop: 32 },
  h3: { fontSize: 17, fontWeight: 600 as const, color: "#1C1917", marginBottom: 8, marginTop: 24 },
  p: { fontSize: 15, lineHeight: 1.75, color: "#44403C", marginBottom: 12, marginTop: 0 },
};

export default function SeoContent() {
  return (
    <section style={seoS.section}>
      <h2 style={{ ...seoS.h2, marginTop: 0 }}>What Is a Cookie Policy?</h2>
      <p style={seoS.p}>
        A cookie policy is a document that informs visitors to your website about the cookies and similar tracking technologies you use, what data they collect, and why. It is a key component of website transparency and is required by several data privacy regulations around the world.
      </p>
      <p style={seoS.p}>
        Unlike a privacy policy, which covers all aspects of personal data collection and processing, a cookie policy focuses specifically on how cookies and tracking technologies are used on your site. Many websites include the cookie policy as a separate page or as a dedicated section within their privacy policy.
      </p>

      <h3 style={seoS.h3}>Why Do You Need a Cookie Policy?</h3>
      <p style={seoS.p}>
        If your website uses cookies — and virtually all modern websites do — you are legally required to disclose this to your visitors in many jurisdictions. The most notable regulations include the EU General Data Protection Regulation (GDPR), the UK Privacy and Electronic Communications Regulations (PECR), and the California Consumer Privacy Act (CCPA). Failing to provide a clear cookie policy can result in fines, legal action, and loss of user trust.
      </p>
      <p style={seoS.p}>
        Even if your website only uses essential cookies for basic functionality, it is good practice to have a cookie policy that explains what cookies are, what types you use, and how visitors can manage their preferences.
      </p>

      <h3 style={seoS.h3}>What Should a Cookie Policy Include?</h3>
      <p style={seoS.p}>
        A comprehensive cookie policy should cover the following: a clear explanation of what cookies are; a list of the types of cookies used on your site (essential, analytics, marketing, social media, preference); the purpose of each cookie category; information about third-party cookies and links to their privacy policies; instructions on how to manage, disable, or delete cookies through browser settings; your consent mechanism; and how to contact you with questions.
      </p>

      <h3 style={seoS.h3}>GDPR and Cookie Consent</h3>
      <p style={seoS.p}>
        Under the GDPR, websites that serve users in the European Union must obtain explicit, informed consent before placing any non-essential cookies on a visitor&apos;s device. This means you cannot use analytics, marketing, or social media cookies until the user has actively opted in. Essential cookies that are strictly necessary for the website to function are exempt from this requirement.
      </p>
      <p style={seoS.p}>
        The GDPR also requires that consent be freely given, specific, informed, and revocable. This means pre-checked boxes do not constitute valid consent, and users must be able to withdraw their consent as easily as they gave it.
      </p>

      <h3 style={seoS.h3}>How to Use This Cookie Policy Generator</h3>
      <p style={seoS.p}>
        Our free Cookie Policy Generator creates a professional, customizable cookie policy in seconds. Simply enter your website details, select the types of cookies you use, choose your consent mechanism and target regulation, and click &quot;Generate.&quot; You can then copy the text to your clipboard or download it as a .txt file. We recommend having a legal professional review the generated policy before publishing it on your website.
      </p>
    </section>
  );
}
