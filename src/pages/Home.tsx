import { Link, useSearchParams } from "react-router-dom";
import { processes } from "../data/processes";
import { strategies } from "../data/strategies";
import { managers, managerById } from "../data/managers";
import { Term } from "../components/GlossaryTip";
import { DATA_CHECKED_DATE } from "../lib/constants";

type Mode = "process" | "strategy" | "manager";

const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"];

export function Home() {
  const [params, setParams] = useSearchParams();
  const mode = (params.get("mode") as Mode) || "process";
  const stepId = params.get("step") || "research";
  const selected = processes.find((p) => p.id === stepId) ?? processes[0];

  const setMode = (m: Mode) => {
    const next = new URLSearchParams(params);
    next.set("mode", m);
    setParams(next, { replace: true });
  };
  const setStep = (id: string) => {
    const next = new URLSearchParams(params);
    next.set("step", id);
    next.set("mode", "process");
    setParams(next, { replace: true });
  };

  // 연결된 프로세스: 순환상 다음 단계 + 전략을 공유하는 단계 (최대 3개)
  const nextStep = processes.find((p) => p.order === (selected.order === 8 ? 1 : selected.order + 1));
  const relatedProcs = [
    nextStep,
    ...processes.filter(
      (p) =>
        p.id !== selected.id &&
        p.id !== nextStep?.id &&
        p.relatedStrategyIds.some((s) => selected.relatedStrategyIds.includes(s))
    ),
  ]
    .filter((p): p is (typeof processes)[number] => !!p)
    .slice(0, 3);

  return (
    <div>
      <h1 className="page-title">투자의 어느 단계를 고도화할 것인가?</h1>
      <p className="page-desc">
        글로벌 운용사의 판단·실행·학습 체계를 살펴보고, 보험사 투자에 연결합니다. 단계를 누르면 오른쪽에 요약이 열립니다.
      </p>
      <div className="filters" role="tablist" aria-label="탐색 모드">
        <span style={{ fontSize: 12, color: "var(--ink-3)" }}>탐색 모드</span>
        {(
          [
            ["process", "프로세스별"],
            ["strategy", "전략별"],
            ["manager", "운용사별"],
          ] as [Mode, string][]
        ).map(([m, label]) => (
          <button key={m} type="button" className="chip-toggle" aria-pressed={mode === m} onClick={() => setMode(m)}>
            {label}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--ink-3)" }}>마지막 데이터 검증일 {DATA_CHECKED_DATE}</span>
      </div>

      {mode === "process" && (
        <div className="map-layout">
          <div>
            <div className="process-map" role="list" aria-label="8단계 투자 프로세스 지도">
              {processes.map((p) => (
                <StepCard key={p.id} p={p} selected={selected.id === p.id} onSelect={setStep} />
              ))}
              <div className="map-loop-hint">⑧ 지식 축적의 산출물이 다시 ① 리서치의 입력이 됩니다 — 순환 구조 ↻</div>
            </div>
          </div>

          <aside className="detail-panel" aria-live="polite">
            <div style={{ fontSize: 11, fontWeight: 800, color: "var(--orange)", letterSpacing: "0.05em" }}>
              STEP {selected.order} / 8
            </div>
            <h3>{selected.nameKo}</h3>
            <p style={{ margin: "2px 0 0", color: "var(--ink-2)", fontSize: 13 }}>{selected.short}</p>

            <h4>이 단계에서 결정하는 것</h4>
            <p style={{ margin: 0 }}>{selected.panel.decides}</p>

            <h4>왜 중요한가?</h4>
            <p style={{ margin: 0 }}>{selected.panel.whyImportant}</p>

            <h4>입력 → 판단 → 산출</h4>
            <div className="flow">
              <span>입력 · {selected.panel.flow.input}</span>
              <span className="arrow">↓ 판단 · {selected.panel.flow.judge}</span>
              <span>산출 · {selected.panel.flow.output}</span>
            </div>

            <h4>한화생명에 적용할 질문</h4>
            <p style={{ margin: 0 }}>“{selected.panel.hanwhaQuestion}”</p>

            <div className="panel-links">
              <div className="pl-label">이 단계 자세히</div>
              <Link to={`/process/${selected.id}`} className="btn primary" style={{ marginBottom: 4 }}>
                전체 내용 보기 →
              </Link>

              <div className="pl-label">연결된 프로세스</div>
              <div>
                {relatedProcs.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="link-chip"
                    style={{ cursor: "pointer", font: "inherit", fontSize: 12.5, fontWeight: 600 }}
                    onClick={() => setStep(p.id)}
                  >
                    <span className="arr">{CIRCLED[p.order - 1]}</span> {p.nameKo}
                  </button>
                ))}
              </div>

              <div className="pl-label">관련 전략</div>
              <div>
                {selected.relatedStrategyIds.map((sid) => {
                  const s = strategies.find((x) => x.id === sid);
                  return s ? (
                    <Link key={sid} to={`/strategies/${sid}`} className="link-chip">
                      {s.nameKo} <span className="arr">→</span>
                    </Link>
                  ) : null;
                })}
              </div>

              <div className="pl-label">참고할 운용사</div>
              <div>
                {selected.managerIds.map((id) => {
                  const m = managerById(id);
                  return m ? (
                    <Link key={id} to={`/managers/${id}`} className="link-chip">
                      {m.nameEn} <span className="arr">→</span>
                    </Link>
                  ) : null;
                })}
              </div>

              <div className="pl-label">용어</div>
              <div className="tag-row">
                {selected.relatedTermIds.slice(0, 3).map((tid) => (
                  <Term key={tid} id={tid} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      {mode === "strategy" && (
        <div className="grid cols-2">
          {strategies
            .filter((s) => s.parentId === null)
            .map((s) => (
              <Link key={s.id} to={`/strategies/${s.id}`} className="card">
                <div style={{ fontWeight: 750, fontSize: 15.5 }}>
                  {s.nameKo} <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: 12.5 }}>{s.nameEn}</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4 }}>{s.oneLiner}</div>
              </Link>
            ))}
        </div>
      )}

      {mode === "manager" && (
        <div className="grid cols-3">
          {managers.map((m) => (
            <Link key={m.id} to={`/managers/${m.id}`} className="card">
              <div style={{ fontWeight: 750 }}>{m.nameEn}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{m.nameKo}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-2)", marginTop: 6 }}>
                {m.strategies
                  .filter((s) => s.role === "flagship")
                  .map((s) => strategies.find((x) => x.id === s.strategyId)?.nameKo ?? "")
                  .filter(Boolean)
                  .join(" · ") || "—"}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StepCard({
  p,
  selected,
  onSelect,
}: {
  p: (typeof processes)[number];
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button type="button" className="process-step" role="listitem" aria-pressed={selected} onClick={() => onSelect(p.id)}>
      <span className="step-no">
        {CIRCLED[p.order - 1]} STEP {p.order}
      </span>
      <span className="step-name">{p.nameKo}</span>
      <span className="step-short">{p.short}</span>
      <span className="step-kw">
        {p.keywords.slice(0, 2).map((k) => (
          <span key={k} className="kw">
            {k}
          </span>
        ))}
      </span>
    </button>
  );
}
