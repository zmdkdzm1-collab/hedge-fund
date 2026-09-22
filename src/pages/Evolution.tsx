import { Link } from "react-router-dom";
import { eras, recentHighlights } from "../data/timeline";
import { strategyById } from "../data/strategies";
import { modelById } from "../data/operatingModels";
import { KindBadge, StatusBadge } from "../components/Badge";
import { ERA_STATUS_LABEL } from "../types";
import { SourceList } from "../components/SourceList";

export function Evolution() {
  const allSourceIds = [
    ...eras.flatMap((e) => [...e.strategies.map((s) => s.sourceId), ...e.enablers.map((x) => x.sourceId)]),
    ...recentHighlights.flatMap((r) => r.sourceIds),
  ];

  return (
    <div>
      <h1 className="page-title">전략의 진화 — 2010년대 이후</h1>
      <p className="page-desc">
        각 구간은 전략이 처음 발명된 시기가 아니라 <b>확산되거나 다시 주목받은 시기</b>를 보여줍니다. 같은 전략이 여러 시기에
        다시 등장하면 ‘재부상’ 또는 ‘운용방식 발전’으로 표시합니다. 상단 줄은 실제 투자전략, 하단 줄은 그 실행을 바꾼
        운용방식·데이터·기술입니다.
      </p>

      {eras.map((era) => (
        <section key={era.id} className="era" aria-label={era.period}>
          <div className="era-head">
            <div className="era-period">{era.period}</div>
            <div className="era-title">{era.title}</div>
            <p className="era-summary">{era.summary}</p>
          </div>
          <div className="era-body">
            <div className="era-row-label">주목받은 투자전략</div>
            <div className="grid cols-2">
              {era.strategies.map((es, i) => {
                const s = strategyById(es.strategyId);
                if (!s) return null;
                return (
                  <div key={i} className="card">
                    <div className="tag-row" style={{ marginBottom: 6 }}>
                      <KindBadge kind="strategy" />
                      <span className="badge">{ERA_STATUS_LABEL[es.status]}</span>
                      <StatusBadge status={es.factStatus} />
                    </div>
                    <Link to={`/strategies/${s.id}`} style={{ fontWeight: 750 }}>
                      {s.nameKo} <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: 12.5 }}>{s.nameEn}</span>
                    </Link>
                    <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: "6px 0 0" }}>{es.evidence}</p>
                  </div>
                );
              })}
            </div>
            {era.enablers.length > 0 && (
              <>
                <div className="era-row-label" style={{ marginTop: 14 }}>
                  실행을 바꾼 운용방식·데이터·기술
                </div>
                <div className="grid cols-2">
                  {era.enablers.map((en, i) => {
                    const m = modelById(en.modelId);
                    if (!m) return null;
                    return (
                      <div key={i} className="card" style={{ background: "var(--surface-2)" }}>
                        <div className="tag-row" style={{ marginBottom: 6 }}>
                          <KindBadge kind={m.kind} />
                          <StatusBadge status={en.factStatus} />
                        </div>
                        <Link to={`/strategies?tab=models#${m.id}`} style={{ fontWeight: 700, fontSize: 13.5 }}>
                          {m.nameKo} <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: 12 }}>{m.nameEn}</span>
                        </Link>
                        <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: "6px 0 0" }}>{en.note}</p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      ))}

      <div className="section" id="recent">
        <h2 className="section-title">최근 주목받는 투자전략 <span className="en">근거: 자금 유입·설문·상품 확장</span></h2>
        <p style={{ fontSize: 13, color: "var(--ink-2)" }}>
          최근 수익률이 높다는 사실만으로 ‘유행’으로 표시하지 않습니다. 자금 유입, 투자자 설문, 신규 펀드 출시, 복수 운용사의
          확대 등 확인된 근거를 기준으로 선별했습니다.
        </p>
        <div className="grid cols-2">
          {recentHighlights
            .filter((r) => r.kind === "strategy")
            .map((r) => (
              <div key={r.id} className="card">
                <div className="tag-row" style={{ marginBottom: 6 }}>
                  <KindBadge kind="strategy" />
                  <StatusBadge status={r.factStatus} />
                </div>
                <Link to={`/strategies/${r.refId}`} style={{ fontWeight: 750 }}>
                  {r.title}
                </Link>
                <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: "6px 0 0" }}>{r.evidence}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">최근 도입되는 운용 프로세스 <span className="en">실제 발표 사례 기준</span></h2>
        <div className="grid cols-2">
          {recentHighlights
            .filter((r) => r.kind === "process")
            .map((r) => {
              const m = modelById(r.refId);
              return (
                <div key={r.id} className="card" style={{ background: "var(--surface-2)" }}>
                  <div className="tag-row" style={{ marginBottom: 6 }}>
                    {m && <KindBadge kind={m.kind} />}
                    <StatusBadge status={r.factStatus} />
                  </div>
                  <b style={{ fontSize: 13.5 }}>{r.title}</b>
                  <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: "6px 0 0" }}>{r.evidence}</p>
                </div>
              );
            })}
        </div>
        <p className="note" style={{ marginTop: 14 }}>
          전략 자체가 오래됐더라도 새로운 데이터·집행방식·조직구조와 결합했다면, 무엇이 기존과 달라졌는지를 함께 보십시오. AI·머신러닝은
          별도의 수익전략이 아니라 <b>기존 전략(시장중립·통계적 차익거래·매크로 등)의 실행을 바꾸는 기술</b>로 이해하는 것이 정확합니다.
        </p>
      </div>

      <SourceList ids={allSourceIds} />
    </div>
  );
}
