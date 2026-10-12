import type { Metadata } from "next";
import BmiCalc from "./BmiCalc";

export const metadata: Metadata = {
  title: "BMI Calculator — Calculate Your Body Mass Index Free | ToolCraftKit",
  description: "Free BMI calculator. Enter your height and weight to get your Body Mass Index, BMI category, healthy weight range, and visual breakdown. Metric and imperial units.",
  openGraph: {
    title: "BMI Calculator — Calculate Your Body Mass Index Free | ToolCraftKit",
    description: "Free BMI calculator. Enter your height and weight to get your Body Mass Index, BMI category, healthy weight range, and visual breakdown.",
    url: "https://toolcraftkit.com/tools/bmi-calculator",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "BMI Calculator — Calculate Your Body Mass Index Free | ToolCraftKit",
    description: "Free BMI calculator with visual gauge, categories, and healthy weight range.",
  },
  alternates: {
    canonical: "https://toolcraftkit.com/tools/bmi-calculator",
  },
};

export default function Page() {
  return <BmiCalc />;
}
