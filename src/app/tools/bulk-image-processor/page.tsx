import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Bulk Image Processor — Resize, Compress & Convert Multiple Images | ToolCraftKit Pro",
  description: "Process up to 20 images at once. Resize, compress, and convert format (JPEG/PNG/WebP). Download all results. Premium tool for ToolCraftKit Pro.",
  openGraph: {
    title: "Bulk Image Processor — Resize, Compress & Convert Multiple Images | ToolCraftKit Pro",
    description: "Process up to 20 images at once. Resize, compress, convert. ToolCraftKit Pro.",
    url: "https://toolcraftkit.com/tools/bulk-image-processor",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Bulk Image Processor — Batch Resize, Compress & Convert | ToolCraftKit Pro",
    description: "Batch process up to 20 images. Resize, compress, convert format.",
  },
  alternates: { canonical: "https://toolcraftkit.com/tools/bulk-image-processor" },
};

export default function Page() {
  return <ClientPage />;
}
