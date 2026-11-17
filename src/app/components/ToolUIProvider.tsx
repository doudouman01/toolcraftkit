"use client";
import { createContext, useContext, useMemo } from "react";
import { useTranslation } from "@/lib/i18n/useTranslation";

interface ToolUITranslations {
  upload: string;
  download: string;
  convert: string;
  copy: string;
  copied: string;
  reset: string;
  clear: string;
  generate: string;
  calculate: string;
  save: string;
  delete: string;
  edit: string;
  preview: string;
  processing: string;
  converting: string;
  downloading: string;
  dragDrop: string;
  orClickBrowse: string;
  maxFileSize: string;
  selectFile: string;
  removeFile: string;
  signInRequired: string;
  signInFree: string;
  usageLimit: string;
  upgradePro: string;
  freeUsesLeft: string;
  perDay: string;
  perMonth: string;
  result: string;
  success: string;
  error: string;
  noResults: string;
  tryAgain: string;
  aboutThisTool: string;
  faq: string;
  inputText: string;
  outputText: string;
  enterText: string;
  pasteText: string;
  fileName: string;
  fileSize: string;
  format: string;
  quality: string;
  width: string;
  height: string;
  color: string;
  size: string;
  scale: string;
  opacity: string;
  position: string;
  font: string;
  home: string;
  backToTools: string;
  convertAnother: string;
  tryAnother: string;
}

const defaultToolUI: ToolUITranslations = {
  upload: "Upload",
  download: "Download",
  convert: "Convert",
  copy: "Copy",
  copied: "Copied!",
  reset: "Reset",
  clear: "Clear",
  generate: "Generate",
  calculate: "Calculate",
  save: "Save",
  delete: "Delete",
  edit: "Edit",
  preview: "Preview",
  processing: "Processing...",
  converting: "Converting...",
  downloading: "Downloading...",
  dragDrop: "Drag & drop your file here",
  orClickBrowse: "or click to browse your files",
  maxFileSize: "Maximum file size",
  selectFile: "Select a file",
  removeFile: "Remove file",
  signInRequired: "Please sign in to use this tool.",
  signInFree: "Create a free account to get started.",
  usageLimit: "Usage limit reached",
  upgradePro: "Upgrade to Pro for unlimited access",
  freeUsesLeft: "free uses left",
  perDay: "per day",
  perMonth: "per month",
  result: "Result",
  success: "Success!",
  error: "Error",
  noResults: "No results",
  tryAgain: "Try again",
  aboutThisTool: "About This Tool",
  faq: "Frequently Asked Questions",
  inputText: "Input Text",
  outputText: "Output Text",
  enterText: "Enter your text here...",
  pasteText: "Paste your text here...",
  fileName: "File name",
  fileSize: "File size",
  format: "Format",
  quality: "Quality",
  width: "Width",
  height: "Height",
  color: "Color",
  size: "Size",
  scale: "Scale",
  opacity: "Opacity",
  position: "Position",
  font: "Font",
  home: "Home",
  backToTools: "Back to Tools",
  convertAnother: "Convert Another",
  tryAnother: "Try Another",
};

const ToolUIContext = createContext<ToolUITranslations>(defaultToolUI);

const TOOL_UI_KEYS = Object.keys(defaultToolUI) as (keyof ToolUITranslations)[];

export function ToolUIProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  const toolUI = useMemo(() => {
    const translations = {} as ToolUITranslations;
    for (const key of TOOL_UI_KEYS) {
      const val = t(`toolUI.${key}`);
      translations[key] = val !== `toolUI.${key}` ? val : defaultToolUI[key];
    }
    return translations;
  }, [t]);

  return (
    <ToolUIContext.Provider value={toolUI}>{children}</ToolUIContext.Provider>
  );
}

export function useToolUI(): ToolUITranslations {
  return useContext(ToolUIContext);
}
