import { I18nextProvider, useTranslation } from "react-i18next";
import type { PropsWithChildren } from "react";
import i18n, { type Language } from "@/lib/i18n";

export { type Language } from "@/lib/i18n";
export function LanguageProvider({ children }: PropsWithChildren) { return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>; }
export function useLanguage() { const { i18n: instance, t } = useTranslation(); const language = (instance.resolvedLanguage || instance.language || "de").split("-")[0] as Language; return { language, t, setLanguage: (next: Language) => { void instance.changeLanguage(next); localStorage.setItem("cognitive-language", next); } }; }
