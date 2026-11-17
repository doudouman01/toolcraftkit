"use client";
import { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import type { LocaleCode } from "./locales";
import { LOCALES } from "./locales";

type TranslationData = Record<string, unknown>;

function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : path;
}

export interface I18nContextType {
  locale: LocaleCode;
  setLocale: (code: LocaleCode) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
});

const STORAGE_KEY = "tck-lang";
const validCodes = new Set(LOCALES.map((l) => l.code));

function detectBrowserLocale(): LocaleCode {
  if (typeof navigator === "undefined") return "en";
  const langs = navigator.languages ?? [navigator.language];
  for (const lang of langs) {
    const code = lang.split("-")[0].toLowerCase();
    if (validCodes.has(code as LocaleCode)) return code as LocaleCode;
  }
  return "en";
}

function loadSavedLocale(): LocaleCode | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && validCodes.has(saved as LocaleCode)) return saved as LocaleCode;
  } catch {}
  return null;
}

const translationCache: Partial<Record<LocaleCode, TranslationData>> = {};

async function loadTranslations(code: LocaleCode): Promise<TranslationData> {
  if (translationCache[code]) return translationCache[code]!;
  try {
    const mod = await import(`./translations/${code}`);
    const data = mod.default as TranslationData;
    translationCache[code] = data;
    return data;
  } catch {
    if (code !== "en") return loadTranslations("en");
    return {};
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>("en");
  const [translations, setTranslations] = useState<TranslationData>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = loadSavedLocale();
    const initial = saved ?? detectBrowserLocale();
    setLocaleState(initial);
    loadTranslations(initial).then(setTranslations);
    setMounted(true);
  }, []);

  const setLocale = useCallback((code: LocaleCode) => {
    setLocaleState(code);
    try { localStorage.setItem(STORAGE_KEY, code); } catch {}
    loadTranslations(code).then(setTranslations);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const val = getNestedValue(translations, key);
      if (val !== key) return val;
      // Fallback to English if key not found
      if (locale !== "en" && translationCache["en"]) {
        return getNestedValue(translationCache["en"], key);
      }
      return key;
    },
    [translations, locale]
  );

  if (!mounted) {
    return <I18nContext.Provider value={{ locale: "en", setLocale, t: (k) => k }}>{children}</I18nContext.Provider>;
  }

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}
