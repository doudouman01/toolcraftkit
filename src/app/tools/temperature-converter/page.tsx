import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Temperature Converter — Celsius to Fahrenheit to Kelvin | ToolCraftKit",
  description: "Free temperature converter. Convert between Celsius, Fahrenheit, and Kelvin instantly. See formulas used. No signup required.",
  openGraph: {
    title: "Temperature Converter — Celsius to Fahrenheit to Kelvin | ToolCraftKit",
    description: "Free temperature converter. Convert between Celsius, Fahrenheit, and Kelvin instantly. See formulas used.",
    url: "https://toolcraftkit.com/tools/temperature-converter",
    siteName: "ToolCraftKit",
    type: "website",
  },
  alternates: { canonical: "https://toolcraftkit.com/tools/temperature-converter" },
};

export default function Page() {
  return <ClientPage />;
}
