"use client";
import { useContext } from "react";
import { I18nContext } from "./context";
import type { I18nContextType } from "./context";

export function useTranslation(): I18nContextType {
  return useContext(I18nContext);
}
