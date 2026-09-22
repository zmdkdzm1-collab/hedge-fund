import { Link } from "react-router-dom";
import { managers } from "../data/managers";
import { strategyById } from "../data/strategies";
import { useFavorites } from "../lib/favorites";

export function Managers() {
  const { has, toggle } = useFavorites();

  return (
    <div>
      <h1 className="page-title">운용사 라이브러리</h1>
      <p className="page-desc">
        우선 조사 대상 14개 글로벌 운용사입니다. 회사별로 공개 자료가 충분히 확인되지 않은 경우 ‘자료 한정’으로 표시하며, 모든
        회사의 성과를 억지로 채우지 않습니다. ★ 버튼으로 관심 운용사를 저장할 수 있습니다(이 브라우저에만 저장).
      </p>
      <div className="grid cols-2">
        {managers.map((m) => (
          <div key={m.id} className="card" style={{ position: "relative" }}>
            <button
              type="button"
              className="btn"
              style={{ position: "absolute", top: 12, right: 12, padding: "3px 9px", fontSize: 13 }}
              aria-pressed={has(m.id)}
              aria-label={`${m.nameEn} 관심 저장`}
              onClick={() => toggle(m.id)}
            >
              {has(m.id) ? "★" : "☆"}
            </button>
            <Link to={`/managers/${m.id}`} style={{ fontWeight: 800, fontSize: 16 }}>
              {m.nameEn}
            </Link>
            <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
              {m.nameKo} · {m.founded ?? "설립연도 미확인"} · {m.hq ?? "본사 미확인"}
              {m.dataStatus === "limited" && <span className="badge st-unverified" style={{ marginLeft: 8 }}>자료 한정</span>}
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-2)", margin: "8px 0" }}>{m.intro.split(". ")[0]}.</p>
            <div className="tag-row">
              {m.strategies.slice(0, 4).map((l) => {
                const s = strategyById(l.strategyId);
                return s ? (
                  <span key={l.strategyId} className={`badge ${l.role === "flagship" ? "role-flagship" : ""}`}>
                    {s.nameKo}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="note" style={{ marginTop: 18 }}>
        운용사와 개별 펀드는 별도 데이터로 관리됩니다 — 예: Citadel ≠ Citadel Securities, Bridgewater 의 Pure Alpha ≠ All
        Weather, Renaissance 의 Medallion(내부 전용) ≠ 외부 투자자 대상 펀드. 각 상세 페이지의 ‘데이터 주의’를 확인하세요.
      </p>
    </div>
  );
}
