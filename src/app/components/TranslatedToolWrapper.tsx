"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

interface TranslatedToolWrapperProps {
  toolSlug: string;
  defaultTitle: string;
  defaultDescription: string;
  children: React.ReactNode;
}

export default function TranslatedToolWrapper({
  toolSlug,
  defaultTitle,
  defaultDescription,
  children,
}: TranslatedToolWrapperProps) {
  const { t } = useTranslation();

  const translatedName = (() => {
    const val = t(`tools./tools/${toolSlug}.name`);
    return val !== `tools./tools/${toolSlug}.name` ? val : defaultTitle;
  })();

  const translatedDesc = (() => {
    const val = t(`tools./tools/${toolSlug}.desc`);
    return val !== `tools./tools/${toolSlug}.desc` ? val : defaultDescription;
  })();

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 }}>
        {translatedName}
      </h1>
      <p style={{ fontSize: 14, color: "#78716C", marginBottom: 24 }}>
        {translatedDesc}
      </p>
      {children}
    </div>
  );
}
