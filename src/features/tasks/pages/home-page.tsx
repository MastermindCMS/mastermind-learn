import { useEffect, useState } from "react";
import { BarChart3, Gauge, Lightbulb, Target } from "lucide-react";
import { useLanguage } from "@/lib/language";

import { AssessmentPanel } from "../components/assessment-panel";
import { HeroSection } from "../components/hero-section";
import { ModuleSelector } from "../components/module-selector";
import type { Module, Question } from "../components/types";

type Q = Question;
const q = (de: string, en: string, options: [string, string][], correct: number, hint: [string, string]): Q => ({ de, en, options: options.map(([d, e]) => ({ de: d, en: e })), correct, hint: { de: hint[0], en: hint[1] } });
const modules: Module[] = [
  { id: "reasoning", title: { de: "Angewandtes Schlussfolgern", en: "Applied reasoning" }, desc: { de: "Regeln erkennen und logische Schlüsse ziehen.", en: "Identify rules and draw logical conclusions." }, icon: Target, questions: [q("Alle Mitarbeitenden der Abteilung nehmen an der Einweisung teil. Anna arbeitet in dieser Abteilung. Was ist richtig?", "All employees in the department attend the briefing. Anna works in this department. What is true?", [["Anna nimmt an der Einweisung teil", "Anna attends the briefing"], ["Anna nimmt nicht teil", "Anna does not attend"], ["Nicht genug Informationen", "Not enough information"], ["Nur Führungskräfte nehmen teil", "Only managers attend"]], 0, ["Wende die allgemeine Regel auf Anna an.", "Apply the general rule to Anna."]), q("Wenn A gröÃƒÅ¸er als B und B gröÃƒÅ¸er als C ist, was muss gelten?", "If A is greater than B and B is greater than C, what must be true?", [["C ist gröÃƒÅ¸er als A", "C is greater than A"], ["A ist gröÃƒÅ¸er als C", "A is greater than C"], ["A ist gleich C", "A equals C"], ["Kein Vergleich möglich", "No comparison is possible"]], 1, ["Nutze die Transitivität der GröÃƒÅ¸enordnung.", "Use transitivity of the ordering."]), q("Setze die Reihe fort: 3, 6, 12, 24, ...", "Continue the sequence: 3, 6, 12, 24, ...", [["30", "30"], ["36", "36"], ["48", "48"], ["60", "60"]], 2, ["Jede Zahl entsteht durch dieselbe Operation.", "Each number is created by the same operation."])] },
  { id: "diagram", title: { de: "Diagrammanalyse", en: "Diagram analysis" }, desc: { de: "Kennzahlen, Anteile und Veränderungen vergleichen.", en: "Compare figures, proportions and changes." }, icon: BarChart3, questions: [q("Umsatz: 2021 — 120, 2022 — 150, 2023 — 135. Wann war er am höchsten?", "Sales: 2021 — 120, 2022 — 150, 2023 — 135. When were they highest?", [["2021", "2021"], ["2022", "2022"], ["2023", "2023"], ["Gleich hoch", "Equal"]], 1, ["Vergleiche die absoluten Werte.", "Compare the absolute values."]), q("12,5 % von 800 Teilen werden erneut geprüft. Wie viele Teile sind das?", "12.5% of 800 parts are checked again. How many parts is that?", [["80", "80"], ["100", "100"], ["125", "125"], ["120", "120"]], 1, ["12,5 % entspricht einem Achtel.", "12.5% is one eighth."]), q("Eine Kennzahl steigt von 40 auf 50. Wie viel Prozent Zuwachs sind das?", "A figure increases from 40 to 50. What is the percentage increase?", [["10%", "10%"], ["20%", "20%"], ["25%", "25%"], ["50%", "50%"]], 2, ["Teile die Differenz durch den Ausgangswert.", "Divide the difference by the original value."])] },
  { id: "problem", title: { de: "Problemlösefähigkeit", en: "Problem solving" }, desc: { de: "Muster, Sequenzen und effiziente Lösungswege finden.", en: "Find patterns, sequences and efficient solutions." }, icon: Lightbulb, questions: [q("Mia hat doppelt so viele Spielmarken wie Peter. Zusammen haben sie 18. Wie viele hat Mia?", "Mia has twice as many tokens as Peter. Together they have 18. How many does Mia have?", [["6", "6"], ["9", "9"], ["12", "12"], ["14", "14"]], 2, ["Peter ist x, Mia ist 2x.", "Peter is x, Mia is 2x."]), q("Welches Element passt nicht: Kreis, Quadrat, Dreieck, Würfel?", "Which item does not fit: circle, square, triangle, cube?", [["Kreis", "Circle"], ["Quadrat", "Square"], ["Dreieck", "Triangle"], ["Würfel", "Cube"]], 3, ["Achte auf die Anzahl der Dimensionen.", "Look at the number of dimensions."]), q("Wie viele Kugeln muss man aus 3 roten und 2 blauen blind ziehen, um sicher ein Paar zu haben?", "How many balls must you draw from 3 red and 2 blue to guarantee a pair?", [["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]], 1, ["Betrachte den ungünstigsten Fall.", "Consider the worst case."])] },
  { id: "speed", title: { de: "Verarbeitungsgeschwindigkeit", en: "Processing speed" }, desc: { de: "Exakte Übereinstimmungen schnell und fehlerfrei finden.", en: "Find exact matches quickly and accurately." }, icon: Gauge, questions: [q("Schlüssel: ● = 7, ▲ = 2, ■ = 9. Wie viel ist ● + ▲?", "Key: ● = 7, ▲ = 2, ■ = 9. What is ● + ▲?", [["8", "8"], ["9", "9"], ["11", "11"], ["16", "16"]], 2, ["Suche die Werte der beiden Symbole.", "Find the values of both symbols."]), q("Welcher Code entspricht exakt dem Muster AB-739-K?", "Which code exactly matches the pattern AB-739-K?", [["AB-793-K", "AB-793-K"], ["AB-739-K", "AB-739-K"], ["AB-739-X", "AB-739-X"], ["BA-739-K", "BA-739-K"]], 1, ["Prüfe die Blöcke von links nach rechts.", "Check the blocks from left to right."]), q("Wie viele ★ enthält die Reihe: ★ ○ ★ △ □ ★ ○?", "How many ★ are in the sequence: ★ ○ ★ △ □ ★ ○?", [["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"]], 1, ["Zähle nur die Sterne.", "Count only the stars."])] },
];

export function HomePage() {
  const { language } = useLanguage();
  const de = language === "de";
  const [id, setId] = useState("reasoning");
  const [running, setRunning] = useState(false);
  const [n, setN] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState<Record<string, number>>(() => JSON.parse(localStorage.getItem("assessment-progress") ?? "{}"));
  const active = modules.find((item) => item.id === id)!;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  const text = (value: { de: string; en: string }) => value[de ? "de" : "en"];
  const select = (value: string) => { setId(value); setRunning(false); setN(0); setChoice(null); setScore(0); setSeconds(0); };
  const start = () => { setRunning(true); setN(0); setChoice(null); setScore(0); setSeconds(0); };
  const answer = (value: number) => {
    if (choice !== null) return;
    setChoice(value);
    if (value === active.questions[n].correct) setScore((currentScore) => currentScore + 1);
  };
  const next = () => {
    if (n < 2) { setN((value) => value + 1); setChoice(null); return; }
    const result = score + (choice === active.questions[n].correct ? 1 : 0);
    const updated = { ...progress, [id]: Math.max(progress[id] ?? 0, Math.round(result / 3 * 100)) };
    setProgress(updated);
    localStorage.setItem("assessment-progress", JSON.stringify(updated));
    setRunning(false);
  };

  return <main className="min-h-[calc(100vh-73px)] bg-[#f7f8fc]">
    <HeroSection de={de} modules={modules} text={text} />
    <ModuleSelector de={de} modules={modules} selectedId={id} progress={progress} onSelect={select} text={text} />
    <AssessmentPanel de={de} active={active} running={running} questionIndex={n} choice={choice} seconds={seconds} onStart={start} onAnswer={answer} onNext={next} text={text} />
  </main>;
}


