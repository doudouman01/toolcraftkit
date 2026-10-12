import type { Metadata } from "next";
import CalorieCalc from "./CalorieCalc";

export const metadata: Metadata = {
  title: "Calorie Calculator — Calculate Daily Calorie Needs Free | ToolCraftKit",
  description: "Free calorie calculator using the Mifflin-St Jeor equation. Enter your age, gender, height, weight, and activity level to get your BMR and daily calorie needs for weight loss, maintenance, or gain.",
  openGraph: {
    title: "Calorie Calculator — Calculate Daily Calorie Needs Free | ToolCraftKit",
    description: "Free calorie calculator. Get your BMR and daily calorie needs based on age, gender, height, weight, and activity level.",
    url: "https://toolcraftkit.com/tools/calorie-calculator",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Calorie Calculator — Calculate Daily Calorie Needs Free | ToolCraftKit",
    description: "Free calorie calculator with BMR, TDEE, and calorie targets for weight loss, maintenance, and gain.",
  },
  alternates: {
    canonical: "https://toolcraftkit.com/tools/calorie-calculator",
  },
};

export default function Page() {
  return <CalorieCalc />;
}
