import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Color Picker Advanced — HEX RGB HSL CMYK Picker | ToolCraftKit",
  description: "Advanced color picker with HSL sliders. Get HEX, RGB, HSL, CMYK values simultaneously. Color history, gradient generator. Free.",
  openGraph: {
    title: "Color Picker Advanced — HEX RGB HSL CMYK Picker | ToolCraftKit",
    description: "Advanced color picker with HSL sliders. Get HEX, RGB, HSL, CMYK values. Gradient generator.",
    url: "https://toolcraftkit.com/tools/color-picker-advanced",
    siteName: "ToolCraftKit",
    type: "website",
  },
  alternates: { canonical: "https://toolcraftkit.com/tools/color-picker-advanced" },
};

export default function Page() {
  return <ClientPage />;
}
