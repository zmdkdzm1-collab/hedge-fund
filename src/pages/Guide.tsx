import { Link, useSearchParams } from "react-router-dom";
import { applicationGuides } from "../data/applicationGuides";
import { managerById } from "../data/managers";
import { processes } from "../data/processes";
import { GUIDE_STAGE_LABEL, GUIDE_ROLE_LABEL, GUIDE_LABEL_TEXT } from "../types";
import type { GuideRole, GuideStage } from "../types";

export function Guide() {
  const [params, setParams] = useSearchParams();
  const stage = (params.get("stage") as GuideStage | null) ?? null;
  const role = (params.get("role") as GuideRole | null) ?? null;

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (!value) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const filtered = applicationGuides.filter(
    (g) => (!stage || g.stages.includes(stage)) && (!role || g.roles.includes(role))
  );

  return (
    <div>
      <h1 className="page-title">한화생명 적용 가이드</h1>
      <p className="page-desc">
        글로벌 운용사의 프로세스에서 가져올 수 있는 실행 과제입니다. 모든 내용은 <b>검토 가능한 적용 제안</b>이며, 한화생명의
        실제 내부 프로세스를 확인해 기술한 것이 아닙니다. 일반계정과 특별계정의 운용 목적·제약 차이를 전제로 검토해야 합니다.
      </p>

      <div className="filters" aria-label="업무 단계 필터">
        <span style={{ fontSize: 12, color: "var(--ink-3)" }}>업무 단계</span>
        <button type="button" className="chip-toggle" aria-pressed={stage === null} onClick={() => set("stage", null)}>
          전체
        </button>
        {(Object.keys(GUIDE_STAGE_LABEL) as GuideStage[]).map((s) => (
          <button key={s} type="button" className="chip-toggle" aria-pressed={stage === s} onClick={() => set("stage", s)}>
            {GUIDE_STAGE_LABEL[s]}
          </button>
        ))}
      </div>
      <div className="filters" aria-label="역할 필터">
        <span style={{ fontSize: 12, color: "var(--ink-3)" }}>역할</span>
        <button type="button" className="chip-toggle" aria-pressed={role === null} onClick={() => set("role", null)}>
          전체
        </button>
        {(Object.keys(GUIDE_ROLE_LABEL) as GuideRole[]).map((r) => (
          <button key={r} type="button" className="chip-toggle" aria-pressed={role === r} onClick={() => set("role", r)}>
            {GUIDE_ROLE_LABEL[r]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">선택한 단계·역할 조합에 해당하는 적용 과제가 없습니다.</div>
      ) : (
        filtered.map((g) => (
          <div key={g.id} id={g.id} className="card" style={{ marginBottom: 16 }}>
            <div className="tag-row" style={{ marginBottom: 6 }}>
              {g.labels.map((l) => (
                <span key={l} className={`badge ${l === "process-ref" ? "st-press" : l === "adapt" ? "st-proposal" : "st-unverified"}`}>
                  {GUIDE_LABEL_TEXT[l]}
                </span>
              ))}
            </div>
            <h2 style={{ margin: "0 0 4px", fontSize: 16.5 }}>{g.title}</h2>
            <div className="tag-row" style={{ marginBottom: 10, fontSize: 11.5 }}>
              {g.stages.map((s) => (
                <span key={s} className="badge">
                  {GUIDE_STAGE_LABEL[s]}
                </span>
              ))}
              {g.roles.map((r) => (
                <span key={r} className="badge" style={{ background: "var(--surface-2)" }}>
                  {GUIDE_ROLE_LABEL[r]}
                </span>
              ))}
            </div>

            <div className="grid cols-2" style={{ gap: 14 }}>
              <div>
                <GField label="1. 참고하는 글로벌 운용사·프로세스">
                  <div className="tag-row" style={{ marginBottom: 4 }}>
                    {g.references.managerIds.map((mid) => {
                      const m = managerById(mid);
                      return m ? (
                        <Link key={mid} to={`/managers/${mid}`} className="badge">
                          {m.nameEn}
                        </Link>
                      ) : null;
                    })}
                    {g.references.processIds.map((pid) => {
                      const p = processes.find((x) => x.id === pid);
                      return p ? (
                        <Link key={pid} to={`/process/${pid}`} className="badge">
                          {p.order}. {p.nameKo}
                        </Link>
                      ) : null;
                    })}
                  </div>
                  {g.references.note}
                </GField>
                <GField label="2. 보험사에서 해결하려는 문제">{g.problem}</GField>
                <GField label="3. 적용할 아이디어">{g.idea}</GField>
                <GField label="4. 실제 필요한 데이터">
                  <ul className="tight" style={{ margin: 0 }}>
                    {g.dataNeeded.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </GField>
                <GField label="5. 담당 역할 / 승인·검증 역할">
                  실행: {g.owners.execute}
                  <br />
                  승인·검증: {g.owners.approve}
                </GField>
              </div>
              <div>
                <GField label="6. 기대효과">{g.expectedEffect}</GField>
                <GField label="7. 한계와 수정할 부분">{g.limitations}</GField>
                <GField label="8. 소규모 시범 적용 방법">{g.pilot}</GField>
                <GField label="9. 효과 측정 지표">
                  <ul className="tight" style={{ margin: 0 }}>
                    {g.metrics.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </GField>
              </div>
            </div>
          </div>
        ))
      )}

      <p className="note warn">
        보험사 맥락 주의: ALM(자산부채종합관리)·보험금 지급·유동성·환헤지·자본건전성·회계손익은 각 과제의 설계 단계에서 함께
        검토해야 합니다. 구체적인 K-ICS 계수·법규·한도는 관련 부서의 검증 없이 인용하지 않았습니다. 비유동성 장기투자에 단기
        손절 규칙을 일괄 적용하거나, 레버리지 확대를 개선방안으로 단순 제안하지 않습니다.
      </p>
    </div>
  );
}

function GField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink-3)", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, color: "var(--ink-2)" }}>{children}</div>
    </div>
  );
}
