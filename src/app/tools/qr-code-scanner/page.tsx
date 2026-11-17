import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "QR Code Scanner — Decode QR Codes from Images Free | ToolCraftKit",
  description: "Free QR code scanner. Upload an image containing a QR code and decode it instantly. Copy the result. No signup required.",
  openGraph: {
    title: "QR Code Scanner — Decode QR Codes from Images Free | ToolCraftKit",
    description: "Free QR code scanner. Upload an image containing a QR code and decode it instantly.",
    url: "https://toolcraftkit.com/tools/qr-code-scanner",
    siteName: "ToolCraftKit",
    type: "website",
  },
  alternates: { canonical: "https://toolcraftkit.com/tools/qr-code-scanner" },
};

export default function Page() {
  return <ClientPage />;
}
