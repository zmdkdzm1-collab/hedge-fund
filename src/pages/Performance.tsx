import { Link, useSearchParams } from "react-router-dom";
import { performanceRecords } from "../data/performanceRecords";
import { fundById } from "../data/funds";
import { managerById, managers } from "../data/managers";
import { strategies, strategyById } from "../data/strategies";
import { VerifyBadge } from "../components/Badge";
import { SourceLink, SourceList } from "../components/SourceList";
import { BarChartH } from "../components/Charts";
import { downloadCsv } from "../lib/csv";
import { fmtPct, periodLabel, FEE_LABEL, PERIOD_TYPE_LABEL } from "../lib/format";
import type { PerformanceRecord } from "../types";

type Tab = "annual" | "ytd" | "longterm" | "pending";

/** 비교 패널용 — 전략별 시장 노출 성격(일반 설명) */
const EXPOSURE_BY_STRATEGY: Record<string, string> = {
  "multi-strategy": "시장 방향 노출을 낮게 유지하도록 설계된 전략 분산형",
  "equity-long-short": "롱 편향이 있을 수 있음 — 시장 방향 영향이 일부 남음",
  "equity-market-neutral": "시장·업종 노출을 0 에 가깝게 관리",
  "stat-arb": "시장중립 지향, 고회전",
  "global-macro": "거시 방향성 노출 — 국면에 따라 크게 변동",
  "systematic-macro": "거시 방향성 노출을 규칙으로 관리",
  "trend-following": "추세 국면에 따라 방향성 노출이 크게 변동 (위기 시 분산 성격)",
  "alt-trend": "비전통 시장의 추세 노출 — 전통 자산과 낮은 상관",
  activist: "소수 종목 집중 롱 노출 — 시장·종목 리스크가 큼",
  "event-driven": "이벤트 결과 의존 — 시장 방향과 부분적으로 독립",
  "merger-arb": "딜 스프레드 노출 — 평시 낮은 변동, 무산 시 꼬리 손실",
  "relative-value": "상대가격 노출 — 방향성 낮으나 레버리지 내재",
  "vol-arb": "변동성 노출 — 급변동 시 비선형 손익",
  dispersion: "상관관계 노출 — 동반 급락 시 손실 집중",
  arp: "팩터 노출 분산 — 개별 시장 방향성은 낮음",
  "tail-risk": "평시 소폭 손실, 급락 시 큰 이익의 보험형",
};

export function Performance() {
  const [params, setParams] = useSearchParams();
  const tab = (params.get("tab") as Tab) || "annual";
  const year = params.get("year") || "2025";
  const stratF = params.get("strategy") || "all";
  const mgrF = params.get("manager") || "all";
  const feeF = params.get("fee") || "all";
  const verF = params.get("verify") || "all";
  const curF = params.get("cur") || "all";
  const compare = (params.get("compare") || "").split(",").filter(Boolean);

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value === "all" || value === "") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const toggleCompare = (fundId: string) => {
    let next = compare.includes(fundId) ? compare.filter((x) => x !== fundId) : [...compare, fundId];
    if (next.length > 3) next = next.slice(next.length - 3);
    set("compare", next.join(","));
  };

  const years = Array.from(
    new Set(
      performanceRecords
        .filter((r) => r.periodType === "annual" && r.verificationStatus !== "pending")
        .map((r) => r.periodEnd.slice(0, 4))
    )
  ).sort((a, b) => (a < b ? 1 : -1));

  const byTab = (r: PerformanceRecord) => {
    if (tab === "pending") return r.verificationStatus === "pending";
    if (r.verificationStatus === "pending") return false;
    if (tab === "annual") return r.periodType === "annual" && r.periodEnd.slice(0, 4) === year;
    if (tab === "ytd") return r.periodType === "ytd";
    return r.periodType === "annualized" || r.periodType === "cumulative";
  };

  const rows = performanceRecords
    .filter(byTab)
    .map((r) => {
      const fund = fundById(r.fundId)!;
      const manager = managerById(fund.managerId)!;
      return { r, fund, manager };
    })
    .filter(({ fund, manager }) => {
      if (stratF !== "all" && !fund.strategyIds.includes(stratF)) return false;
      if (mgrF !== "all" && manager.id !== mgrF) return false;
      return true;
    })
    .filter(({ r }) => {
      if (feeF !== "all" && r.feeBasis !== feeF) return false;
      if (verF !== "all" && r.verificationStatus !== verF) return false;
      if (curF !== "all" && (r.currency ?? "unknown") !== curF) return false;
      return true;
    })
    .sort((a, b) => (b.r.returnPct ?? -999) - (a.r.returnPct ?? -999));

  const currencies = Array.from(new Set(performanceRecords.map((r) => r.currency ?? "unknown")));

  const exportCsv = () => {
    downloadCsv(
      `performance-${tab}-${tab === "annual" ? year : "all"}.csv`,
      ["운용사", "펀드·전략", "유형", "기간", "수익률(%)", "수수료 기준", "통화", "검증 상태", "검증일", "출처 제목"],
      rows.map(({ r, fund, manager }) => [
        manager.nameEn,
        fund.nameEn,
        PERIOD_TYPE_LABEL[r.periodType],
        periodLabel(r),
        r.returnPct,
        FEE_LABEL[r.feeBasis],
        r.currency ?? "미표기",
        r.verificationStatus,
        r.verifiedAt,
        r.sourceId ?? "",
      ])
    );
  };

  const compareData = compare
    .map((fid) => {
      const fund = fundById(fid);
      if (!fund) return null;
      const manager = managerById(fund.managerId);
      const rec =
        performanceRecords.find(
          (r) => r.fundId === fid && r.periodType === "annual" && r.periodEnd.slice(0, 4) === year && r.verificationStatus !== "pending"
        ) ?? null;
      const strat = fund.strategyIds.map((sid) => strategyById(sid)).filter(Boolean);
      return { fund, manager, rec, strat };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const compareCaveat = (() => {
    if (compareData.length < 2) return null;
    const fees = new Set(compareData.map((c) => c.rec?.feeBasis ?? "none"));
    const periods = new Set(compareData.map((c) => (c.rec ? c.rec.periodStart + "~" + c.rec.periodEnd : "none")));
    const msgs: string[] = [];
    if (fees.size > 1) msgs.push("수수료 기준이 서로 다릅니다(차감 후/미확인 혼재) — 직접 비교에 주의하세요.");
    if (periods.size > 1) msgs.push("측정 기간이 서로 다르거나 누락된 펀드가 있습니다 — 같은 기간 기준이 아닙니다.");
    return msgs;
  })();

  return (
    <div>
      <h1 className="page-title">성과 비교</h1>
      <p className="page-desc">
        검증이 완료된 수치만 기본 표시합니다. 검증 대기 수치는 별도 탭에 분리되어 있으며, 표의 모든 숫자에는 기간·수수료
        기준·출처·검증일이 붙어 있습니다.
      </p>

      <div className="filters" role="tablist" aria-label="기간 유형">
        {(
          [
            ["annual", "연간"],
            ["ytd", "YTD"],
            ["longterm", "장기 연환산·누적"],
            ["pending", "검증 대기"],
          ] as [Tab, string][]
        ).map(([t, label]) => (
          <button key={t} type="button" className="chip-toggle" aria-pressed={tab === t} onClick={() => set("tab", t)}>
            {label}
          </button>
        ))}
      </div>

      {tab === "longterm" && (
        <p className="note" style={{ marginTop: 0 }}>
          장기 연환산·누적 수익률은 단년도 성과와 <b>같은 축에서 비교하지 않습니다</b>. 측정 기간이 각기 다르므로 반드시 기간을
          함께 확인하세요.
        </p>
      )}
      {tab === "pending" && (
        <p className="note danger" style={{ marginTop: 0 }}>
          아래 수치는 검색 결과·2차 인용 수준으로만 확인되어 <b>원문 검증이 완료되지 않은 수치</b>입니다. 기본 성과표·차트에
          포함되지 않습니다.
        </p>
      )}

      <div className="filters">
        {tab === "annual" && (
          <label className="f">
            연도
            <select value={year} onChange={(e) => set("year", e.target.value)}>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="f">
          전략
          <select value={stratF} onChange={(e) => set("strategy", e.target.value)}>
            <option value="all">전체</option>
            {strategies.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nameKo}
              </option>
            ))}
          </select>
        </label>
        <label className="f">
          운용사
          <select value={mgrF} onChange={(e) => set("manager", e.target.value)}>
            <option value="all">전체</option>
            {managers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nameEn}
              </option>
            ))}
          </select>
        </label>
        <label className="f">
          수수료
          <select value={feeF} onChange={(e) => set("fee", e.target.value)}>
            <option value="all">전체</option>
            <option value="net">차감 후</option>
            <option value="gross">차감 전</option>
            <option value="unknown">미확인</option>
          </select>
        </label>
        {tab !== "pending" && (
          <label className="f">
            자료 유형
            <select value={verF} onChange={(e) => set("verify", e.target.value)}>
              <option value="all">전체</option>
              <option value="official">공식 공시·운용사 자료</option>
              <option value="press">언론 보도</option>
            </select>
          </label>
        )}
        <label className="f">
          통화
          <select value={curF} onChange={(e) => set("cur", e.target.value)}>
            <option value="all">전체</option>
            {currencies.map((c) => (
              <option key={c} value={c}>
                {c === "unknown" ? "미표기" : c}
              </option>
            ))}
          </select>
        </label>
        <span style={{ marginLeft: "auto", display: "flex", gap: 8 }} className="no-print">
          <button type="button" className="btn" onClick={exportCsv}>
            CSV 다운로드
          </button>
          <button type="button" className="btn" onClick={() => window.print()}>
            인쇄
          </button>
        </span>
      </div>

      {rows.length === 0 ? (
        <div className="empty-state">
          현재 필터 조건에 해당하는 {tab === "pending" ? "검증 대기" : "검증 완료"} 수치가 없습니다. 필터를 조정해 보세요.
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th className="no-print" style={{ width: 46 }}>
                  비교
                </th>
                <th>운용사</th>
                <th>펀드·전략</th>
                <th>유형</th>
                <th>기간</th>
                <th style={{ textAlign: "right" }}>수익률</th>
                <th>수수료 기준</th>
                <th>통화</th>
                <th>출처</th>
                <th>검증일</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ r, fund, manager }) => (
                <tr key={r.id}>
                  <td className="no-print">
                    <input
                      type="checkbox"
                      checked={compare.includes(fund.id)}
                      onChange={() => toggleCompare(fund.id)}
                      aria-label={`${fund.nameEn} 비교에 추가`}
                    />
                  </td>
                  <td>
                    <Link to={`/managers/${manager.id}`}>{manager.nameEn}</Link>
                  </td>
                  <td>
                    <Link to={`/funds/${fund.id}`}>{fund.nameEn}</Link>
                    <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{fund.typeLabel}</div>
                  </td>
                  <td>
                    {PERIOD_TYPE_LABEL[r.periodType]}
                    <div style={{ marginTop: 2 }}>
                      <VerifyBadge status={r.verificationStatus} />
                    </div>
                  </td>
                  <td className="tabular">{periodLabel(r)}</td>
                  <td className={`num ${r.returnPct !== null && r.returnPct < 0 ? "neg" : "pos"}`}>{fmtPct(r.returnPct)}</td>
                  <td>{FEE_LABEL[r.feeBasis]}</td>
                  <td>{r.currency ?? "미표기"}</td>
                  <td>
                    <SourceLink id={r.sourceId} />
                  </td>
                  <td className="tabular">{r.verifiedAt ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "annual" && rows.length > 0 && (
        <div className="section">
          <div className="chart-card">
            <h3 className="chart-title">{year}년 연간 수익률 — 동일 기간 비교</h3>
            <p className="chart-sub">
              검증 완료 수치만 표시. 수수료 기준이 다른 펀드가 섞여 있을 수 있으므로 표의 기준 열을 함께 확인하세요.
            </p>
            <BarChartH
              items={rows.map(({ r, fund }) => ({
                key: r.id,
                label: fund.nameEn,
                value: r.returnPct,
                highlight: compare.length === 0 ? undefined : compare.includes(fund.id),
                title: `${fund.nameEn} · ${periodLabel(r)} · ${fmtPct(r.returnPct)} (${FEE_LABEL[r.feeBasis]})`,
              }))}
            />
          </div>
        </div>
      )}

      {compareData.length > 0 && (
        <div className="section" id="compare">
          <h2 className="section-title">펀드 비교 (최대 3개)</h2>
          {compareCaveat && compareCaveat.length > 0 && (
            <div className="note warn" style={{ marginTop: 0 }}>
              {compareCaveat.map((msg) => (
                <div key={msg}>⚠ {msg}</div>
              ))}
            </div>
          )}
          <div className="table-wrap">
            <table className="data" style={{ minWidth: 640 }}>
              <thead>
                <tr>
                  <th style={{ width: 130 }}>항목</th>
                  {compareData.map((c) => (
                    <th key={c.fund.id}>
                      <Link to={`/funds/${c.fund.id}`}>{c.fund.nameEn}</Link>
                      <button
                        type="button"
                        className="btn no-print"
                        style={{ marginLeft: 8, padding: "0 7px", fontSize: 11 }}
                        onClick={() => toggleCompare(c.fund.id)}
                        aria-label={`${c.fund.nameEn} 비교에서 제거`}
                      >
                        ×
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>운용사</td>
                  {compareData.map((c) => (
                    <td key={c.fund.id}>{c.manager?.nameEn ?? "—"}</td>
                  ))}
                </tr>
                <tr>
                  <td>전략</td>
                  {compareData.map((c) => (
                    <td key={c.fund.id}>{c.strat.map((s) => s!.nameKo).join(" · ") || "자산배분형(전략 분류 외)"}</td>
                  ))}
                </tr>
                <tr>
                  <td>{year}년 수익률</td>
                  {compareData.map((c) => (
                    <td key={c.fund.id} className={`num ${c.rec && c.rec.returnPct !== null && c.rec.returnPct < 0 ? "neg" : "pos"}`}>
                      {c.rec ? (
                        <>
                          {fmtPct(c.rec.returnPct)}{" "}
                          <span style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 400 }}>({FEE_LABEL[c.rec.feeBasis]})</span>
                        </>
                      ) : (
                        <span style={{ color: "var(--ink-3)", fontWeight: 400 }}>해당 연도 검증 수치 없음</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>시장 노출 성격</td>
                  {compareData.map((c) => (
                    <td key={c.fund.id} style={{ fontSize: 12.5 }}>
                      {c.fund.strategyIds.map((sid) => EXPOSURE_BY_STRATEGY[sid]).filter(Boolean)[0] ??
                        "자산배분형 — 시장 베타를 위험 균형으로 배분"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>주요 위험</td>
                  {compareData.map((c) => (
                    <td key={c.fund.id} style={{ fontSize: 12.5 }}>
                      {c.strat[0] ? c.strat[0]!.keyRisks.join(" · ") : "금리·상관관계 구조 변화"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>벤치마킹 요소</td>
                  {compareData.map((c) => (
                    <td key={c.fund.id} style={{ fontSize: 12.5 }}>
                      {c.strat[0] ? c.strat[0]!.hanwha.processUse : "위험 균형 배분 프레임"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>출처</td>
                  {compareData.map((c) => (
                    <td key={c.fund.id}>{c.rec ? <SourceLink id={c.rec.sourceId} /> : "—"}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="note" style={{ marginTop: 24 }}>
        수익률은 성과의 한 부분입니다. 투자전략·위험 수준·기간·수수료가 다른 펀드를 단순 순위로 판단하지 않습니다. 과거
        수익률만으로 운용 프로세스의 우수성이나 인과관계가 입증되는 것도 아닙니다.
      </p>

      <SourceList ids={rows.map(({ r }) => r.sourceId)} />
    </div>
  );
}
