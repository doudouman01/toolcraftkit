import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Text Encryption — Encrypt & Decrypt Text Online Free | ToolCraftKit",
  description: "Encrypt and decrypt text with a password using AES-GCM encryption. 100% client-side, nothing sent to any server. Free.",
  openGraph: {
    title: "Text Encryption — Encrypt & Decrypt Text Online Free | ToolCraftKit",
    description: "Encrypt and decrypt text with a password using AES-GCM encryption. 100% client-side.",
    url: "https://toolcraftkit.com/tools/text-encryption",
    siteName: "ToolCraftKit",
    type: "website",
  },
  alternates: { canonical: "https://toolcraftkit.com/tools/text-encryption" },
};

export default function Page() {
  return <ClientPage />;
}
