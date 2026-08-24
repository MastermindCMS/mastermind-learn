import type { Module } from "./types";

type ModuleSelectorProps = {
  de: boolean;
  modules: Module[];
  selectedId: string;
  progress: Record<string, number>;
  onSelect: (id: string) => void;
  text: (value: { de: string; en: string }) => string;
};

export function ModuleSelector({ de, modules, selectedId, progress, onSelect, text }: ModuleSelectorProps) {
  return (
    <section id="modules" className="mx-auto max-w-6xl px-6 py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">{de ? "Trainingszentrum" : "Practice center"}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{de ? "Bereich auswählen" : "Choose a skill"}</h2>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {modules.map((item) => {
          const value = progress[item.id] ?? 0;
          return <button key={item.id} onClick={() => onSelect(item.id)} className={`rounded-2xl border bg-white p-5 text-left transition ${selectedId === item.id ? "border-indigo-400 shadow-lg shadow-indigo-100" : "border-slate-200 hover:border-indigo-200"}`}>
            <div className="flex justify-between"><span className="rounded-xl bg-indigo-100 p-3 text-indigo-700"><item.icon className="h-5 w-5" /></span><span className="text-xs text-slate-400">{value}%</span></div>
            <h3 className="mt-5 font-semibold">{text(item.title)}</h3><p className="mt-2 text-sm text-slate-500">{text(item.desc)}</p>
            <div className="mt-5 h-1.5 rounded-full bg-slate-100"><div className="h-full rounded-full bg-indigo-400" style={{ width: `${value}%` }} /></div>
          </button>;
        })}
      </div>
    </section>
  );
}
