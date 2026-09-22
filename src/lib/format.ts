import type { PerformanceRecord } from "../types";

export function fmtPct(v: number | null): string {
  if (v === null) return "—";
  return `${v > 0 ? "+" : ""}${v}%`;
}

export const PERIOD_TYPE_LABEL: Record<PerformanceRecord["periodType"], string> = {
  annual: "연간",
  ytd: "연초 이후(YTD)",
  annualized: "연환산",
  cumulative: "누적",
};

export function periodLabel(r: PerformanceRecord): string {
  const year = r.periodEnd.slice(0, 4);
  if (r.periodType === "annual") return `${year}년 연간`;
  if (r.periodType === "ytd") return `${year} YTD (~${r.periodEnd.slice(5)})`;
  if (r.periodType === "cumulative") return `${r.periodStart ?? "?"} ~ ${r.periodEnd} 누적`;
  return `${r.periodStart ? r.periodStart.slice(0, 4) : "설정일(미확인)"}~${year} 연환산`;
}

export const FEE_LABEL: Record<PerformanceRecord["feeBasis"], string> = {
  net: "수수료 차감 후",
  gross: "수수료 차감 전",
  unknown: "기준 미확인",
};
