export const LOCALES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "ms", name: "Melayu", flag: "🇲🇾" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "is", name: "Íslenska", flag: "🇮🇸" },
] as const;

export type LocaleCode = typeof LOCALES[number]["code"];
