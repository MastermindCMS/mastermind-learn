import i18n from "i18next";
import { initReactI18next } from "react-i18next";

void i18n.use(initReactI18next).init({
  lng: localStorage.getItem("cognitive-language") || "de",
  fallbackLng: "de",
  interpolation: { escapeValue: false },
  resources: {
    de: { translation: { practice: "Übungsplattform", progress: "Fortschritt", back: "Zurück zum Training", training: "Training starten" } },
    en: { translation: { practice: "Practice platform", progress: "Progress", back: "Back to practice", training: "Start practice" } },
  },
});

export type Language = "de" | "en";
export default i18n;
