import { Link, useParams } from "react-router-dom";
import { strategyById, childStrategies } from "../data/strategies";
import { managerById } from "../data/managers";
import { funds } from "../data/funds";
import { performanceRecords } from "../data/performanceRecords";
import { processes } from "../data/processes";
import { KindBadge, RoleBadge, VerifyBadge } from "../components/Badge";
import { SourceLink } from "../components/SourceList";
import { Term } from "../components/GlossaryTip";
import { NotFound } from "./NotFound";
import { fmtPct, periodLabel } from "../lib/format";

export function StrategyDetail() {
  const { id } = useParams();
  const s = strategyById(id ?? "");
  if (!s) return <NotFound message="해당 전략을 찾을 수 없습니다." />;
  const parent = s.parentId ? strategyById(s.parentId) : null;
  const children = childStrategies(s.id);

  // 이 전략에 연결된 펀드의 검증 완료 성과 (연간)
  const relatedFunds = funds.filter((f) => f.strategyIds.includes(s.id));
  const perfRows = relatedFunds.flatMap((f) =>
    performanceRecords
      .filter((r) => r.fundId === f.id && r.verificationStatus !== "pending" && r.periodType === "annual")
      .map((r) => ({ fund: f, r }))
  );
  perfRows.sort((a, b) => (b.r.periodEnd > a.r.periodEnd ? 1 : -1));

  return (
    <div>
      <nav className="breadcrumb">
        <Link to="/strategies">투자전략 탐색</Link>
        {parent && (
          <>
            {" / "}
            <Link to={`/strategies/${parent.id}`}>{parent.nameKo}</Link>
          </>
        )}
        {" / "}
        {s.nameKo}
      </nav>
      <div className="tag-row" style={{ marginBottom: 8 }}>
        <KindBadge kind="strategy" />
        {parent && <span className="badge">상위 전략: {parent.nameKo}</span>}
      </div>
      <h1 className="page-title">
        {s.nameKo} <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: 17 }}>{s.nameEn}</span>
      </h1>
      <p className="page-desc">{s.oneLiner}</p>
      {s.note && <p className="note warn">{s.note}</p>}

      <div className="summary-box">
        <div className="sb-row">
          <b>수익 원천</b>
          <span>{s.returnSource}</span>
        </div>
        <div className="sb-row">
          <b>주요 위험</b>
          <span>{s.keyRisks.join(" · ")}</span>
        </div>
        <div className="sb-row">
          <b>대표 운용사</b>
          <span>
            {s.managers.length > 0
              ? s.managers.slice(0, 4).map((l) => managerById(l.managerId)?.nameEn ?? "").filter(Boolean).join(" · ")
              : "우선 조사 대상 중 없음"}
          </span>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">A. 30초 설명</h2>
        {s.intro.map((t, i) => (
          <p key={i} style={{ margin: "6px 0" }}>
            {t}
          </p>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">B. 어떻게 굴러가는가?</h2>
        <ol className="step-flow">
          {s.mechanics.steps.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
        <div className="card" style={{ borderLeft: "3px solid var(--orange)" }}>
          <div className="tag-row" style={{ marginBottom: 4 }}>
            <span className="badge st-general">설명용 가상 사례</span>
            <b style={{ fontSize: 13 }}>{s.mechanics.example.title}</b>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-2)" }}>{s.mechanics.example.body}</p>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">C · D. 왜 벌리는가, 언제 어려운가</h2>
        <div className="grid cols-2">
          <div className="card">
            <b style={{ fontSize: 13, color: "var(--ok)" }}>왜 수익이 발생할 수 있는가</b>
            <ul className="tight">
              {s.whyItWorks.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <b style={{ fontSize: 13, color: "var(--danger)" }}>언제 어려워지는가</b>
            <ul className="tight">
              {s.whenItFails.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">E. 이 전략을 사용하는 운용사</h2>
        {s.managers.length === 0 ? (
          <div className="empty-state">
            우선 조사 대상 14개사 중 이 전략을 대표 전략으로 하는 운용사가 확인되지 않았습니다. (전문 운용사는 조사 범위 밖)
          </div>
        ) : (
          <div className="grid cols-2">
            {s.managers.map((l) => {
              const m = managerById(l.managerId);
              if (!m) return null;
              return (
                <Link key={l.managerId} to={`/managers/${m.id}`} className="card">
                  <div className="tag-row" style={{ marginBottom: 4 }}>
                    <b>{m.nameEn}</b>
                    <RoleBadge role={l.role} />
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{l.note ?? m.nameKo}</div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {children.length > 0 && (
        <div className="section">
          <h2 className="section-title">하위 전략</h2>
          <div className="tag-row">
            {children.map((c) => (
              <Link key={c.id} to={`/strategies/${c.id}`} className="badge">
                {c.nameKo} / {c.nameEn}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="section">
        <h2 className="section-title">F. 실제 성과 (검증 완료 연간 수익률)</h2>
        {perfRows.length === 0 ? (
          <div className="empty-state">이 전략에 연결된 펀드 중 검증 완료된 연간 수익률이 없습니다.</div>
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>펀드·전략</th>
                  <th>기간</th>
                  <th style={{ textAlign: "right" }}>수익률</th>
                  <th>수수료 기준</th>
                  <th>검증</th>
                  <th>출처</th>
                </tr>
              </thead>
              <tbody>
                {perfRows.map(({ fund, r }) => (
                  <tr key={r.id}>
                    <td>
                      <Link to={`/funds/${fund.id}`}>{fund.nameEn}</Link>
                    </td>
                    <td className="tabular">{periodLabel(r)}</td>
                    <td className={`num ${r.returnPct !== null && r.returnPct < 0 ? "neg" : "pos"}`}>{fmtPct(r.returnPct)}</td>
                    <td>{r.feeBasis === "net" ? "차감 후" : r.feeBasis === "gross" ? "차감 전" : "미확인"}</td>
                    <td>
                      <VerifyBadge status={r.verificationStatus} />
                    </td>
                    <td>
                      <SourceLink id={r.sourceId} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
          펀드에 여러 전략이 포함된 경우, 위 수익률은 펀드 전체 성과이며 이 전략 단독의 성과가 아닙니다.{" "}
          <Link to="/performance">→ 성과 비교에서 조건별로 보기</Link>
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">G. 한화생명이 참고할 부분</h2>
        <div className="grid cols-2">
          <div className="card" style={{ borderLeft: "3px solid var(--warn)" }}>
            <b style={{ fontSize: 13 }}>투자기법 직접 적용 관점</b>
            <p style={{ fontSize: 13, color: "var(--ink-2)", margin: "6px 0 0" }}>{s.hanwha.directUse}</p>
          </div>
          <div className="card" style={{ borderLeft: "3px solid var(--navy)" }}>
            <b style={{ fontSize: 13 }}>프로세스만 참고하는 관점</b>
            <p style={{ fontSize: 13, color: "var(--ink-2)", margin: "6px 0 0" }}>{s.hanwha.processUse}</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">H. 관련 프로세스·용어</h2>
        <div className="tag-row">
          {s.relatedProcessIds.map((pid) => {
            const p = processes.find((x) => x.id === pid);
            return p ? (
              <Link key={pid} to={`/process/${pid}`} className="badge">
                {p.order}. {p.nameKo}
              </Link>
            ) : null;
          })}
          {s.relatedTermIds.map((tid) => (
            <Term key={tid} id={tid} />
          ))}
        </div>
      </div>

    </div>
  );
}
