"use client";

import PremiumGate from "@/components/PremiumGate";
import BulkImageProcessor from "./BulkImageProcessor";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  return (
    <PremiumGate
      toolName="Bulk Image Processor"
      toolDescription="Resize, compress, and convert up to 20 images at once. All processing in your browser."
      features={[
        "Process up to 20 images in a single batch",
        "Resize all images to custom dimensions",
        "Compress with adjustable quality slider",
        "Convert between JPEG, PNG, and WebP formats",
        "Download all processed images at once",
        "100% client-side — your images never leave your device",
      ]}
    >
      <BulkImageProcessor />
    </PremiumGate>
  );
}
