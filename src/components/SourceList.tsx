import { sourceById } from "../data/sources";

/** 출처 목록 — 제목·발행기관·발행일·확인일을 표시하고 원문으로 링크한다. */
export function SourceList({ ids, title = "출처" }: { ids: (string | null | undefined)[]; title?: string }) {
  const unique = Array.from(new Set(ids.filter((x): x is string => !!x)));
  const items = unique.map((id) => sourceById(id)).filter((s) => s !== undefined);
  if (items.length === 0) return null;
  return (
    <div className="section" style={{ marginTop: 26 }}>
      <h2 className="section-title" style={{ fontSize: 14 }}>
        {title}
      </h2>
      <ol style={{ margin: 0, paddingLeft: 20, fontSize: 12.5, color: "var(--ink-2)" }}>
        {items.map((s) => (
          <li key={s!.id} id={`src-${s!.id}`} style={{ margin: "6px 0" }}>
            <a href={s!.url} target="_blank" rel="noreferrer">
              {s!.title}
            </a>{" "}
            — {s!.publisher}
            {s!.publishedAt ? ` · 발행 ${s!.publishedAt}` : ""}
            {s!.asOf ? ` · 자료 기준 ${s!.asOf}` : ""} · 확인 {s!.checkedAt}
            {s!.note ? <span style={{ color: "var(--warn)" }}> · {s!.note}</span> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** 표 안에서 쓰는 간단한 출처 링크 */
export function SourceLink({ id }: { id: string | null }) {
  const s = sourceById(id);
  if (!s) return <span style={{ color: "var(--ink-3)" }}>—</span>;
  return (
    <a href={s.url} target="_blank" rel="noreferrer" title={`${s.title} (${s.publisher})`}>
      {s.publisher}
    </a>
  );
}
