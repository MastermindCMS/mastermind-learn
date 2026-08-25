import type { LucideIcon } from "lucide-react";

export type LocalizedText = { de: string; en: string };

export type Question = LocalizedText & {
  context?: LocalizedText;
  statement?: LocalizedText;
  explanation?: LocalizedText;
  visual?: "noise" | "cars" | "weather" | "energy" | "museums" | "revenue";
  puzzle?: "triangle-merge" | "color-cycle" | "size-links" | "plus-triangles" | "rect-plus" | "v-squares";
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
