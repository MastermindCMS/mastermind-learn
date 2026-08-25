import type { LucideIcon } from "lucide-react";

export type LocalizedText = { de: string; en: string };

export type Question = LocalizedText & {
  context?: LocalizedText;
  statement?: LocalizedText;
  explanation?: LocalizedText;
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
};
