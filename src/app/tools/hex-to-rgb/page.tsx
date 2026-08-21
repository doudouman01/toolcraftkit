import type { Metadata } from "next";
import HexToRgb from "./HexToRgb.jsx";

export const metadata: Metadata = {
  title: "Hex to RGB Converter — HEX, RGB, HSL, CMYK Color Converter",
  description: "Convert colors between HEX, RGB, HSL, and CMYK. Color picker, contrast checker, shade and tint palettes. Free online tool.",
};

export default function Page() { return <HexToRgb />; }
