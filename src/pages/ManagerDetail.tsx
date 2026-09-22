import { Link, useParams } from "react-router-dom";
import { managerById } from "../data/managers";
import { strategyById } from "../data/strategies";
import { modelById } from "../data/operatingModels";
import { fundsByManager } from "../data/funds";
import { performanceRecords } from "../data/performanceRecords";
import { KindBadge, RoleBadge, StatusBadge, VerifyBadge } from "../components/Badge";
import { SourceList, SourceLink } from "../components/SourceList";
import { NotFound } from "./NotFound";
import { fmtPct, periodLabel, FEE_LABEL } from "../lib/format";
import { useFavorites } from "../lib/favorites";

export function ManagerDetail() {
  const { id } = useParams();
  const m = managerById(id ?? "");
  const { has, toggle } = useFavorites();
  if (!m) return <NotFound message="해당 운용사를 찾을 수 없습니다." />;

  const mFunds = fundsByManager(m.id);
  const verifiedRows = mFunds.flatMap((f) =>
    performanceRecords
      .filter((r) => r.fundId === f.id && r.verificationStatus !== "pending")
      .map((r) => ({ f, r }))
  );

  return (
    <div>
      <nav className="breadcrumb">
        <Link to="/managers">운용사 라이브러리</Link> / {m.nameEn}
      </nav>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <h1 className="page-title">
            {m.nameEn} <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: 16 }}>{m.nameKo}</span>
          </h1>
        </div>
        <button type="button" className="btn no-print" aria-pressed={has(m.id)} onClick={() => toggle(m.id)}>
          {has(m.id) ? "★ 관심 저장됨" : "☆ 관심 저장"}
        </button>
      </div>
      {m.dataStatus === "limited" && (
        <p className="note danger">
          이 운용사는 공개 자료가 충분히 확인되지 않았습니다(자료 한정). 아래 내용 중 일부는 제3자 집계·보도 기준이며, 각 항목의
          상태 라벨을 확인하세요.
        </p>
      )}

      <div className="card" style={{ marginTop: 8 }}>
        <dl className="kv">
          <dt>설립</dt>
          <dd className="tabular">{m.founded ?? "미확인"}</dd>
          <dt>본사</dt>
          <dd>{m.hq ?? "미확인"}</dd>
          <dt>창업자</dt>
          <dd>{m.founder ?? "미확인"}</dd>
          <dt>현재 경영진</dt>
          <dd>
            {m.leadership ?? "미확인"}
            {m.leadershipAsOf && <span style={{ color: "var(--ink-3)", fontSize: 12 }}> (확인 시점 {m.leadershipAsOf})</span>}
          </dd>
          <dt>운용자산</dt>
          <dd>
            {m.aum ?? "미공개·미확인"}
            {m.aumAsOf && <span style={{ color: "var(--ink-3)", fontSize: 12 }}> (기준 {m.aumAsOf})</span>}
          </dd>
        </dl>
      </div>

      <div className="section">
        <h2 className="section-title">회사 소개</h2>
        <p>{m.intro}</p>
      </div>

      <div className="section">
        <h2 className="section-title">대표 투자철학</h2>
        <p>{m.philosophy}</p>
      </div>

      <div className="section">
        <h2 className="section-title">주요 전략과 운용방식</h2>
        <div className="grid cols-2">
          <div>
            <div className="era-row-label">투자전략 (다대다 — 대표/일부 구분)</div>
            <div style={{ display: "grid", gap: 8 }}>
              {m.strategies.map((l) => {
                const s = strategyById(l.strategyId);
                return s ? (
                  <div key={l.strategyId} className="card" style={{ padding: "10px 14px" }}>
                    <div className="tag-row">
                      <Link to={`/strategies/${s.id}`} style={{ fontWeight: 700, fontSize: 13.5 }}>
                        {s.nameKo}
                      </Link>
                      <RoleBadge role={l.role} />
                      {l.note && <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{l.note}</span>}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          <div>
            <div className="era-row-label">운용방식·구조·기술</div>
            <div className="tag-row">
              {m.modelIds.map((mid) => {
                const om = modelById(mid);
                return om ? (
                  <Link key={mid} to={`/strategies?tab=models#${om.id}`} className="badge">
                    <KindBadge kind={om.kind} /> {om.nameKo}
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">대표 펀드·프로그램</h2>
        {mFunds.length === 0 ? (
          <div className="empty-state">이번 조사에서 공식 자료로 확인된 개별 펀드 정보가 없습니다.</div>
        ) : (
          <div className="grid cols-2">
            {mFunds.map((f) => (
              <Link key={f.id} to={`/funds/${f.id}`} className="card">
                <b style={{ fontSize: 13.5 }}>{f.nameEn}</b>
                <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{f.typeLabel}</div>
                <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: "6px 0 0" }}>{f.description.slice(0, 90)}…</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="section">
        <h2 className="section-title">공개 자료로 확인되는 운용 프로세스</h2>
        {m.processNotes.map((n, i) => (
          <div key={i} className="card" style={{ marginBottom: 8 }}>
            <div className="tag-row" style={{ marginBottom: 4 }}>
              <StatusBadge status={n.status} />
            </div>
            <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-2)" }}>{n.text}</p>
          </div>
        ))}
      </div>

      <div className="section">
        <h2 className="section-title">성과와 자료 기준</h2>
        {verifiedRows.length === 0 ? (
          <div className="empty-state">
            이번 조사에서 검증된 성과 수치가 없습니다. 확인되지 않은 수치는 표시하지 않습니다.
          </div>
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
                {verifiedRows.map(({ f, r }) => (
                  <tr key={r.id}>
                    <td>
                      <Link to={`/funds/${f.id}`}>{f.nameEn}</Link>
                    </td>
                    <td className="tabular">{periodLabel(r)}</td>
                    <td className={`num ${r.returnPct !== null && r.returnPct < 0 ? "neg" : "pos"}`}>{fmtPct(r.returnPct)}</td>
                    <td>{FEE_LABEL[r.feeBasis]}</td>
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
      </div>

      <div className="section">
        <h2 className="section-title">참고할 요소</h2>
        <ul className="tight">
          {m.referencePoints.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2 className="section-title">보험사 적용 시 수정할 요소</h2>
        <ul className="tight">
          {m.insurerAdjustments.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2 className="section-title">데이터 주의</h2>
        <ul className="tight" style={{ color: "var(--warn)" }}>
          {m.dataCaveats.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      <SourceList ids={m.sourceIds} />
    </div>
  );
}
