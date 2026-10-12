import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Daily Calories: BMR, TDEE & the Mifflin-St Jeor Equation",
  description: "Learn how to calculate your daily calorie needs using the Mifflin-St Jeor equation. Understand BMR, TDEE, activity multipliers, and how to set calorie targets for weight loss or muscle gain.",
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
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>How to Calculate Daily Calories: BMR, TDEE & the Mifflin-St Jeor Equation</h1>
        <p style={s.meta}>September 25, 2026 · 5 min read</p>

        <p style={s.p}>Knowing how many calories your body needs each day is the single most important number in any nutrition plan. Whether you are trying to lose weight, build muscle, or simply maintain your current physique, your Total Daily Energy Expenditure (TDEE) gives you a concrete target to work from. This guide explains the science behind calorie calculations and how to use the results effectively.</p>

        <h2 style={s.h2}>What Is Basal Metabolic Rate (BMR)?</h2>
        <p style={s.p}>Your Basal Metabolic Rate is the number of calories your body burns at complete rest over 24 hours. This is the energy required to keep your organs functioning, maintain body temperature, circulate blood, and support cell production. BMR typically accounts for 60 to 75 percent of your total daily calorie burn, making it the largest component of your energy expenditure.</p>
        <p style={s.p}>BMR is influenced by several factors: body weight, height, age, and gender. Larger bodies require more energy to maintain, taller individuals have more tissue to support, metabolic rate decreases with age, and men generally have higher BMRs than women due to greater lean muscle mass on average.</p>

        <h2 style={s.h2}>The Mifflin-St Jeor Equation Explained</h2>
        <p style={s.p}>Several equations exist for estimating BMR, but the Mifflin-St Jeor equation, published in 1990, is widely considered the most accurate for healthy adults. The Academy of Nutrition and Dietetics recommends it as the preferred formula for clinical and practical use.</p>
        <p style={s.p}>The formula works as follows. For men: BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) + 5. For women: BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) - 161. The only difference between the two formulas is the constant at the end, reflecting the average difference in lean body mass between genders.</p>
        <p style={s.p}>For example, a 30-year-old man who weighs 80 kg and stands 180 cm tall has a BMR of (10 x 80) + (6.25 x 180) - (5 x 30) + 5 = 800 + 1125 - 150 + 5 = 1,780 calories per day at rest.</p>

        <h2 style={s.h2}>From BMR to TDEE: Activity Multipliers</h2>
        <p style={s.p}>BMR tells you what you burn at rest, but you move during the day. TDEE adds your activity on top of BMR using a multiplier. The standard activity factors are: Sedentary (1.2) for desk jobs with no exercise, Lightly Active (1.375) for light exercise one to three days per week, Moderately Active (1.55) for moderate exercise three to five days per week, Very Active (1.725) for hard exercise six to seven days per week, and Extra Active (1.9) for athletes or those with physically demanding jobs plus training.</p>
        <p style={s.p}>Using the example above, the 30-year-old man with a BMR of 1,780 who exercises moderately would have a TDEE of 1,780 x 1.55 = approximately 2,759 calories per day. This is his maintenance level, the amount he would eat to neither gain nor lose weight.</p>

        <h2 style={s.h2}>Setting Calorie Targets for Your Goals</h2>
        <p style={s.p}>Once you know your TDEE, adjusting your intake is straightforward. For weight loss, a deficit of 500 calories per day below TDEE results in roughly 0.45 kg (1 pound) of weight loss per week. This is considered a safe, sustainable rate. Larger deficits speed up weight loss initially but increase the risk of muscle loss, metabolic adaptation, and nutritional deficiencies.</p>
        <p style={s.p}>For muscle gain, a surplus of 250 to 500 calories per day above TDEE supports lean mass growth when combined with resistance training. Beginners may gain effectively at the lower end of this range, while experienced lifters may need to push closer to 500. Gaining too aggressively leads to unnecessary fat gain alongside the muscle.</p>
        <p style={s.p}>For maintenance, eat at your TDEE. This is useful during diet breaks, reverse dieting phases, or periods where body composition change is not the primary goal. Tracking at maintenance for two to three weeks also helps you verify the accuracy of your calculated TDEE before making adjustments.</p>

        <h2 style={s.h2}>Common Mistakes and How to Avoid Them</h2>
        <p style={s.p}>The most common mistake is overestimating activity level. Most people with office jobs who exercise three to four times per week fall into the Lightly Active or Moderately Active category, not Very Active. Overestimating gives you a higher TDEE and a smaller effective deficit than you think.</p>
        <p style={s.p}>Another frequent error is treating the calculator output as exact. These are estimates based on population averages. Your actual metabolic rate could be 10 to 15 percent higher or lower. Start with the calculated number, track your weight for two to three weeks, and adjust. If you are not losing weight at your target deficit, reduce by another 100 to 200 calories and reassess.</p>
        <p style={s.p}>Finally, do not go below safe minimums. Most guidelines recommend no fewer than 1,200 calories per day for women and 1,500 for men without medical supervision. Very low calorie diets can be medically appropriate in some cases but require professional oversight.</p>

        <h2 style={s.h2}>Calculate Your Calories Now</h2>
        <p style={s.p}>Our free Calorie Calculator uses the Mifflin-St Jeor equation and gives you instant results for BMR, TDEE, and calorie targets for weight loss, maintenance, and gain. No signup required.</p>
        <Link href="/tools/calorie-calculator" style={s.cta}>Open Calorie Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/bmi-calculator" style={{ color: "#0D9488" }}>BMI Calculator</Link> to check your Body Mass Index and healthy weight range alongside your calorie targets.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}
