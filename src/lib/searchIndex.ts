import type { SearchItem } from "../types";
import { strategies } from "../data/strategies";
import { managers } from "../data/managers";
import { processes } from "../data/processes";
import { glossary } from "../data/glossary";
import { funds } from "../data/funds";
import { operatingModels } from "../data/operatingModels";
import { CARD_KIND_LABEL } from "../types";

/** 전략·운용사·프로세스·용어·펀드·운용방식 통합 검색 인덱스 (한글·영문) */
export const searchIndex: SearchItem[] = [
  ...strategies.map<SearchItem>((s) => ({
    type: "strategy",
    id: s.id,
    title: `${s.nameKo} / ${s.nameEn}`,
    subtitle: s.oneLiner,
    path: `/strategies/${s.id}`,
    haystack: `${s.nameKo} ${s.nameEn} ${s.oneLiner} ${s.returnSource}`.toLowerCase(),
  })),
  ...managers.map<SearchItem>((m) => ({
    type: "manager",
    id: m.id,
    title: `${m.nameKo} / ${m.nameEn}`,
    subtitle: m.intro.slice(0, 80) + "…",
    path: `/managers/${m.id}`,
    haystack: `${m.nameKo} ${m.nameEn} ${m.intro} ${m.philosophy}`.toLowerCase(),
  })),
  ...processes.map<SearchItem>((p) => ({
    type: "process",
    id: p.id,
    title: `${p.order}. ${p.nameKo}`,
    subtitle: p.short,
    path: `/process/${p.id}`,
    haystack: `${p.nameKo} ${p.short} ${p.keywords.join(" ")}`.toLowerCase(),
  })),
  ...glossary.map<SearchItem>((t) => ({
    type: "term",
    id: t.id,
    title: `${t.nameKo} (${t.nameEn})`,
    subtitle: t.definition.slice(0, 80) + (t.definition.length > 80 ? "…" : ""),
    path: `/glossary#${t.id}`,
    haystack: `${t.nameKo} ${t.nameEn} ${t.definition}`.toLowerCase(),
  })),
  ...funds.map<SearchItem>((f) => ({
    type: "fund",
    id: f.id,
    title: f.nameKo ? `${f.nameKo} / ${f.nameEn}` : f.nameEn,
    subtitle: `${f.typeLabel} — ${f.description.slice(0, 60)}…`,
    path: `/funds/${f.id}`,
    haystack: `${f.nameKo ?? ""} ${f.nameEn} ${f.typeLabel} ${f.description}`.toLowerCase(),
  })),
  ...operatingModels.map<SearchItem>((m) => ({
    type: "model",
    id: m.id,
    title: `${m.nameKo} / ${m.nameEn}`,
    subtitle: `[${CARD_KIND_LABEL[m.kind]}] ${m.oneLiner}`,
    path: `/strategies?tab=models#${m.id}`,
    haystack: `${m.nameKo} ${m.nameEn} ${m.oneLiner}`.toLowerCase(),
  })),
];

export const SEARCH_TYPE_LABEL: Record<SearchItem["type"], string> = {
  strategy: "투자전략",
  manager: "운용사",
  process: "프로세스",
  term: "용어",
  fund: "펀드",
  model: "운용방식·구조·기술",
};

export function searchAll(query: string): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/);
  return searchIndex
    .map((item) => {
      let score = 0;
      for (const tk of tokens) {
        if (!item.haystack.includes(tk)) return null;
        if (item.title.toLowerCase().includes(tk)) score += 2;
        score += 1;
      }
      return { item, score };
    })
    .filter((x): x is { item: SearchItem; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.item);
}
