import { Check, X } from "lucide-react";
import type { SpeedTask } from "./types";

const symbols = ["+", "◇", "□", "✚", "⬡", "△", "◢", "○", "▽"];
const names = [
  ["Plus", "Plus"], ["Raute", "Diamond"], ["Quadrat", "Square"], ["Kreuz", "Cross"],
  ["Sechseck", "Hexagon"], ["Dreieck", "Triangle"], ["Rechtwinkliges Dreieck", "Right triangle"], ["Kreis", "Circle"], ["Umgekehrtes Dreieck", "Inverted triangle"],
];
const calculate = (values: number[], operation: SpeedTask["operation"], mapping: number[]) => { const mapped = values.map((value) => mapping[value - 1]); return mapped.length === 1 ? mapped[0] : mapped.slice(1).reduce((total, value) => operation === "add" ? total + value : operation === "subtract" ? total - value : total * value, mapped[0]); };

type Props = { task: SpeedTask; selected: number | null; correct: number; onSelect: (value: number) => void; de: boolean };
export function ProcessingSpeedTask({ task, selected, correct, onSelect, de }: Props) {
  const leftValue = calculate(task.left, task.operation, task.mapping);
  const rightValue = calculate(task.right, task.operation, task.mapping);
  const target = task.target === "larger" ? (de ? "größeren" : "larger") : (de ? "kleineren" : "smaller");
  const field = (values: number[], side: number) => {
    const isCorrect = selected !== null && side === correct;
    const isWrong = selected === side && side !== correct;
    return <button onClick={() => onSelect(side)} disabled={selected !== null} className={`h-40 w-full min-w-0 rounded-xl border-4 bg-slate-100 px-5 py-4 transition sm:h-48 ${isCorrect ? "border-emerald-400 bg-emerald-50" : isWrong ? "border-rose-400 bg-rose-50" : "border-slate-200 hover:border-indigo-400"}`}>
      <div className="flex min-h-16 items-center justify-center gap-3 text-4xl font-medium text-slate-700">{values.map((symbolValue, index) => <span className={symbolValue === 4 ? "inline-block rotate-45" : undefined} key={index}>{symbols[symbolValue - 1]}</span>)}{isCorrect && <Check className="ml-2 h-5 w-5 text-emerald-600" />}{isWrong && <X className="ml-2 h-5 w-5 text-rose-600" />}</div>
    </button>;
  };
  return <div className="mt-7">
    <h3 className="text-center text-lg font-semibold">{de ? `Wählen Sie bitte den ${target} Wert.` : `Choose the ${target} value.`}</h3>
    <div className="mt-5 grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr]"><div>{field(task.left, 0)}</div><span className="text-center text-sm font-semibold uppercase text-slate-400">{de ? "oder" : "or"}</span><div>{field(task.right, 1)}</div></div>
    <div className="mt-7 rounded-xl border border-slate-200 bg-white p-4"><p className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">{de ? "Symbol-Legende" : "Symbol legend"}</p><div className="grid grid-cols-3 gap-2 sm:grid-cols-9">{symbols.map((symbol, index) => ({ symbol, index, number: task.mapping[index] })).sort((a, b) => a.number - b.number).map(({ symbol, index, number }) => <div className="text-center" key={symbol}><div className={`text-2xl text-slate-700 ${index === 3 ? "inline-block rotate-45" : ""}`}>{symbol}</div><div className="text-xs text-slate-500">{number}</div><div className="break-words text-[10px] leading-3 text-slate-400">{names[index][de ? 0 : 1]}</div></div>)}</div></div>
    {selected !== null && <div className={`mt-5 rounded-xl p-4 text-sm leading-6 ${selected === correct ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"}`}><b>{selected === correct ? (de ? "Diese Antwort ist richtig." : "This answer is correct.") : (de ? "Diese Antwort ist nicht richtig." : "This answer is incorrect.")}</b><p className="mt-1">{de ? `Links: ${leftValue}. Rechts: ${rightValue}.` : `Left: ${leftValue}. Right: ${rightValue}.`}</p></div>}
  </div>;
}
