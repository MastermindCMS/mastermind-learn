import type { LucideIcon } from "lucide-react";

export type LocalizedText = { de: string; en: string };

export type SpeedTask = {
  operation: "add" | "subtract" | "multiply";
  mapping: number[];
  left: number[];
  right: number[];
  target: "larger" | "smaller";
};

export type Question = LocalizedText & {
  context?: LocalizedText;
  statement?: LocalizedText;
  explanation?: LocalizedText;
  visual?: "noise" | "cars" | "weather" | "energy" | "museums" | "revenue";
  puzzle?: "triangle-merge" | "color-cycle" | "size-links" | "plus-triangles" | "rect-plus" | "v-squares" | "arithmetic-grid" | "arithmetic-grid-2";
  speed?: SpeedTask;
  options: LocalizedText[];
  correct: number;
  hint: LocalizedText;
};

export type Module = {
  id: string;
  title: LocalizedText;
  desc: LocalizedText;
  icon: LucideIcon;
  questions: Question[];
  examples?: Question[];
  duration?: number;
};
