import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Module } from "./types";

type HeroSectionProps = {
  de: boolean;
  modules: Module[];
  text: (value: { de: string; en: string }) => string;
};

export function HeroSection({ de, modules, text }: HeroSectionProps) {
  return (
    <section className="border-b border-slate-200 bg-[#101827] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-indigo-200">
            <Sparkles className="h-3.5 w-3.5" /> {de ? "KOGNITIVE FÄHIGKEITEN · TRAINING" : "COGNITIVE SKILLS · PRACTICE"}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {de ? <>Denken entwickeln.<br /><span className="text-indigo-300">Gezielt trainieren.</span></> : <>Develop your thinking.<br /><span className="text-indigo-300">Practice with purpose.</span></>}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            {de ? "Übungen zu Logik, Datenanalyse, Problemlösung und Verarbeitungsgeschwindigkeit – mit Feedback und Fortschritt." : "Practice logic, data analysis, problem solving and processing speed with feedback and progress."}
          </p>
          <div className="mt-8 flex gap-3">
            <Button size="lg" className="gap-2 bg-indigo-400 text-slate-950 hover:bg-indigo-300" onClick={() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })}>
              {de ? "Training starten" : "Start practice"} <ArrowRight className="h-4 w-4" />
            </Button>
            <Link to="/dashboard"><Button size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">{de ? "Fortschritt" : "Progress"}</Button></Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-6">
          <p className="text-sm text-slate-300">{de ? "Vier Bereiche" : "Four skill areas"}</p>
          <div className="mt-6 grid min-w-0 grid-cols-2 gap-3">
            {modules.map((item) => <div key={item.id} className="min-w-0 rounded-2xl bg-white/[0.07] p-4"><item.icon className="h-5 w-5 text-indigo-300" /><p lang={de ? "de" : "en"} className="mt-5 min-w-0 break-words text-sm font-medium leading-5 [hyphens:auto] [overflow-wrap:anywhere]">{text(item.title)}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
