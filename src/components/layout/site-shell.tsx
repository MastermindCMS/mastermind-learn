import { Link } from "@tanstack/react-router";
import { BrainCircuit } from "lucide-react";
import type { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language";

export function SiteShell({ children }: PropsWithChildren) {
  const { language, setLanguage, t } = useLanguage();
  const de = language === "de";
  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-3"><span className="rounded-xl bg-[#101827] p-2 text-indigo-300"><BrainCircuit className="h-5 w-5" /></span><span><span className="block text-sm font-bold">Cognitive Lab</span><span className="block text-[11px] text-slate-400">{t("practice")}</span></span></Link>
          <nav className="flex items-center gap-2"><div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold"><button className={`cursor-pointer rounded-md px-2 py-1 ${de ? "bg-white shadow-sm" : "text-slate-400"}`} onClick={() => setLanguage("de")}>DE</button><button className={`cursor-pointer rounded-md px-2 py-1 ${!de ? "bg-white shadow-sm" : "text-slate-400"}`} onClick={() => setLanguage("en")}>EN</button></div><Link to="/dashboard"><Button variant="ghost">{t("progress")}</Button></Link></nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl justify-between px-6 py-6 text-xs text-slate-400"><span>Cognitive Lab · {de ? "Übungsplattform" : "Practice platform"}</span><span>{de ? "Logik, Daten und Verarbeitungsgeschwindigkeit" : "Logic, data and processing speed"}</span></div></footer>
    </div>
  );
}
