import { Link, useParams } from "react-router-dom";
import { fundById } from "../data/funds";
import { managerById } from "../data/managers";
import { strategyById } from "../data/strategies";
import { recordsByFund } from "../data/performanceRecords";
import { VerifyBadge } from "../components/Badge";
import { SourceList, SourceLink } from "../components/SourceList";
import { BarChartYears } from "../components/Charts";
import { NotFound } from "./NotFound";
import { fmtPct, periodLabel, FEE_LABEL, PERIOD_TYPE_LABEL } from "../lib/format";

export function FundDetail() {
  const { id } = useParams();
  const f = fundById(id ?? "");
  if (!f) return <NotFound message="해당 펀드를 찾을 수 없습니다." />;
  const m = managerById(f.managerId);
  const records = recordsByFund(f.id);
  const verified = records.filter((r) => r.verificationStatus !== "pending");
  const pending = records.filter((r) => r.verificationStatus === "pending");
  const annualVerified = verified
    .filter((r) => r.periodType === "annual" && r.returnPct !== null)
    .sort((a, b) => (a.periodEnd > b.periodEnd ? 1 : -1));

  return (
    <div>
      <nav className="breadcrumb">
        <Link to="/managers">운용사 라이브러리</Link>
        {m && (
          <>
            {" / "}
            <Link to={`/managers/${m.id}`}>{m.nameEn}</Link>
          </>
        )}
        {" / "}
        {f.nameEn}
      </nav>
      <h1 className="page-title">{f.nameEn}</h1>
      <p className="page-desc">
        {f.typeLabel}
        {m && (
          <>
            {" · 운용사: "}
            <Link to={`/managers/${m.id}`}>{m.nameEn}</Link>
          </>
        )}
        {f.inception && ` · 설정 ${f.inception}년`}
      </p>
      <p>{f.description}</p>

      {f.caveats.length > 0 && (
        <div className="note warn">
          <b style={{ fontSize: 13 }}>자료 조건과 비교상 한계</b>
          <ul className="tight" style={{ marginBottom: 0 }}>
            {f.caveats.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="section">
        <h2 className="section-title">전략 연결</h2>
        <div className="tag-row">
          {f.strategyIds.length === 0 ? (
            <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
              자산배분형 상품 등 본 서비스의 투자전략 분류에 연결하지 않는 경우입니다.
            </span>
          ) : (
            f.strategyIds.map((sid) => {
              const s = strategyById(sid);
              return s ? (
                <Link key={sid} to={`/strategies/${sid}`} className="badge">
                  {s.nameKo} / {s.nameEn}
                </Link>
              ) : null;
            })
          )}
        </div>
        {f.strategyIds.length > 1 && (
          <p style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 6 }}>
            여러 전략이 포함된 펀드입니다 — 전체 수익률을 그중 하나의 전략 성과로 해석하지 마세요.
          </p>
        )}
      </div>

      {annualVerified.length >= 2 && (
        <div className="section">
          <h2 className="section-title">검증된 연도별 수익률</h2>
          <div className="chart-card">
            <p className="chart-sub" style={{ marginTop: 0 }}>
              검증 완료된 연간 수익률만 표시합니다. 월별 데이터가 없는 연도 사이를 임의로 잇지 않습니다.
            </p>
            <BarChartYears
              items={annualVerified.map((r) => ({ year: r.periodEnd.slice(0, 4), value: r.returnPct as number }))}
            />
          </div>
        </div>
      )}

      <div className="section">
        <h2 className="section-title">확인 가능한 성과 기록</h2>
        {verified.length === 0 ? (
          <div className="empty-state">이번 조사에서 검증 완료된 성과가 없습니다. 확인되지 않은 수치는 기본 표시하지 않습니다.</div>
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>유형</th>
                  <th>기간</th>
                  <th style={{ textAlign: "right" }}>수익률</th>
                  <th>수수료</th>
                  <th>통화</th>
                  <th>클래스</th>
                  <th>검증</th>
                  <th>검증일</th>
                  <th>출처</th>
                </tr>
              </thead>
              <tbody>
                {verified.map((r) => (
                  <tr key={r.id}>
                    <td>{PERIOD_TYPE_LABEL[r.periodType]}</td>
                    <td className="tabular">{periodLabel(r)}</td>
                    <td className={`num ${r.returnPct !== null && r.returnPct < 0 ? "neg" : "pos"}`}>{fmtPct(r.returnPct)}</td>
                    <td>{FEE_LABEL[r.feeBasis]}</td>
                    <td>{r.currency ?? "—"}</td>
                    <td style={{ maxWidth: 200 }}>{r.shareClass ?? "—"}</td>
                    <td>
                      <VerifyBadge status={r.verificationStatus} />
                    </td>
                    <td className="tabular">{r.verifiedAt ?? "—"}</td>
                    <td>
                      <SourceLink id={r.sourceId} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {verified.some((r) => r.notes) && (
          <ul className="tight" style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
            {verified
              .filter((r) => r.notes)
              .map((r) => (
                <li key={r.id}>
                  <b>{periodLabel(r)}</b> — {r.notes}
                </li>
              ))}
          </ul>
        )}
      </div>

      {pending.length > 0 && (
        <div className="section">
          <h2 className="section-title">검증 대기 수치</h2>
          <p className="note danger" style={{ marginTop: 0 }}>
            아래 수치는 원문 확인이 완료되지 않아 기본 성과표·차트에서 제외됩니다.
          </p>
          <ul className="tight">
            {pending.map((r) => (
              <li key={r.id}>
                {periodLabel(r)} — {fmtPct(r.returnPct)} <VerifyBadge status="pending" /> {r.notes && <span style={{ color: "var(--ink-3)" }}>({r.notes})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p style={{ fontSize: 13 }}>
        <Link to="/performance">→ 성과 비교 페이지에서 다른 펀드와 조건별로 비교하기</Link>
      </p>

      <SourceList ids={records.map((r) => r.sourceId)} />
    </div>
  );
}
