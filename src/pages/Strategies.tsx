import { Link, useSearchParams } from "react-router-dom";
import { strategies, childStrategies } from "../data/strategies";
import { operatingModels } from "../data/operatingModels";
import { managerById } from "../data/managers";
import { processes } from "../data/processes";
import { KindBadge } from "../components/Badge";
import type { Strategy } from "../types";

export function Strategies() {
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") === "models" ? "models" : "strategies";
  const setTab = (t: string) => {
    const next = new URLSearchParams(params);
    next.set("tab", t);
    setParams(next, { replace: true });
  };

  return (
    <div>
      <h1 className="page-title">투자전략 탐색</h1>
      <p className="page-desc">
        무엇으로 수익을 내는가(투자전략)와 어떻게 운영하는가(운용방식·투자구조·기술)는 서로 다른 분류입니다. 한 운용사는 여러
        전략과 방식을 함께 사용할 수 있습니다.
      </p>
      <div className="filters" role="tablist" aria-label="분류 선택">
        <button type="button" className="chip-toggle" aria-pressed={tab === "strategies"} onClick={() => setTab("strategies")}>
          투자전략 (무엇으로 버는가)
        </button>
        <button type="button" className="chip-toggle" aria-pressed={tab === "models"} onClick={() => setTab("models")}>
          운용방식 · 투자구조 · 기술 (어떻게 운영하는가)
        </button>
      </div>

      {tab === "strategies" ? (
        <div>
          {strategies
            .filter((s) => s.parentId === null)
            .map((s) => (
              <div key={s.id} style={{ marginBottom: 14 }}>
                <StrategyCard s={s} />
                {childStrategies(s.id).length > 0 && (
                  <div style={{ marginLeft: 26, marginTop: 8, display: "grid", gap: 8 }}>
                    {childStrategies(s.id).map((c) => (
                      <StrategyCard key={c.id} s={c} isChild />
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      ) : (
        <div>
          {(
            [
              ["model", "운용방식·조직 — 어떻게 판단하고 운영하는가"],
              ["structure", "투자구조·포트폴리오 구성 — 어떤 그릇에 담는가"],
              ["tech", "기술·프로세스 — 실행을 무엇이 바꾸는가"],
            ] as const
          ).map(([kind, title]) => (
            <div className="section" key={kind} style={{ marginTop: 24 }}>
              <h2 className="section-title">{title}</h2>
              <div className="grid cols-2">
                {operatingModels
                  .filter((m) => m.kind === kind)
                  .map((m) => (
                    <div key={m.id} id={m.id} className="card">
                      <div className="tag-row" style={{ marginBottom: 6 }}>
                        <KindBadge kind={m.kind} />
                      </div>
                      <div style={{ fontWeight: 750 }}>
                        {m.nameKo} <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: 12.5 }}>{m.nameEn}</span>
                      </div>
                      <p style={{ fontSize: 13, color: "var(--ink-2)", margin: "4px 0" }}>{m.oneLiner}</p>
                      <ul className="tight" style={{ fontSize: 12.5, color: "var(--ink-2)" }}>
                        {m.description.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                      {m.caution && (
                        <p className="note warn" style={{ margin: "8px 0 0", fontSize: 12 }}>
                          {m.caution}
                        </p>
                      )}
                      {m.managerIds.length > 0 && (
                        <div className="tag-row" style={{ marginTop: 8 }}>
                          {m.managerIds.map((id) => {
                            const mg = managerById(id);
                            return mg ? (
                              <Link key={id} to={`/managers/${id}`} className="badge">
                                {mg.nameEn}
                              </Link>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StrategyCard({ s, isChild = false }: { s: Strategy; isChild?: boolean }) {
  return (
    <Link to={`/strategies/${s.id}`} className="card" style={{ display: "block" }}>
      <div className="tag-row" style={{ marginBottom: 6 }}>
        <KindBadge kind="strategy" />
        {isChild && <span className="badge">하위 전략</span>}
      </div>
      <div style={{ fontWeight: 750, fontSize: 15.5 }}>
        {s.nameKo} <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: 13 }}>{s.nameEn}</span>
      </div>
      <p style={{ fontSize: 13.5, color: "var(--ink-2)", margin: "4px 0 10px" }}>{s.oneLiner}</p>
      <div className="grid cols-3" style={{ gap: 8, fontSize: 12.5 }}>
        <div>
          <div style={{ color: "var(--ink-3)", fontSize: 11.5 }}>수익 발생 원천</div>
          {s.returnSource}
        </div>
        <div>
          <div style={{ color: "var(--ink-3)", fontSize: 11.5 }}>주요 위험</div>
          {s.keyRisks.join(" · ")}
        </div>
        <div>
          <div style={{ color: "var(--ink-3)", fontSize: 11.5 }}>대표 운용사 / 관련 프로세스</div>
          {s.managers.slice(0, 3).map((l) => managerById(l.managerId)?.nameEn ?? "").filter(Boolean).join(", ") || "대표 운용사 없음(조사 범위)"}
          <div style={{ color: "var(--navy)" }}>
            {s.relatedProcessIds.map((pid) => processes.find((p) => p.id === pid)?.nameKo ?? "").filter(Boolean).join(" · ")}
          </div>
        </div>
      </div>
    </Link>
  );
}
