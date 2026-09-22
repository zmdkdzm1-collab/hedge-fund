import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { glossary } from "../data/glossary";
import { sources } from "../data/sources";

export function Glossary() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ block: "start" });
    }
  }, [hash]);

  const sorted = [...glossary].sort((a, b) => a.nameEn.localeCompare(b.nameEn));

  return (
    <div>
      <h1 className="page-title">용어·출처</h1>
      <p className="page-desc">
        헤지펀드 용어에 익숙하지 않아도 읽을 수 있도록 쉬운 정의·예시·혼동 주의를 함께 제공합니다. 본문 어디서든 점선 밑줄
        용어를 클릭하면 같은 설명을 볼 수 있습니다.
      </p>

      <div className="section">
        <h2 className="section-title">용어집 <span className="en">{sorted.length}개</span></h2>
        <div className="grid cols-2">
          {sorted.map((t) => (
            <div key={t.id} id={t.id} className="card" style={{ scrollMarginTop: 70 }}>
              <b style={{ fontSize: 14.5 }}>
                {t.nameKo} <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: 12.5 }}>{t.nameEn}</span>
              </b>
              <p style={{ fontSize: 13, margin: "6px 0" }}>{t.definition}</p>
              <p style={{ fontSize: 12.5, color: "var(--ink-2)", margin: "6px 0" }}>
                <b style={{ color: "var(--navy)" }}>예시</b> · {t.example}
              </p>
              <p style={{ fontSize: 12.5, color: "var(--warn)", margin: "6px 0" }}>
                <b>혼동 주의</b> · {t.confusedWith}
              </p>
              {t.relatedPages.length > 0 && (
                <div className="tag-row">
                  {t.relatedPages.map((p) => (
                    <Link key={p.path} to={p.path} className="badge">
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="section" id="sources">
        <h2 className="section-title">전체 출처 목록 <span className="en">{sources.length}건 · 확인일 표시</span></h2>
        <p style={{ fontSize: 13, color: "var(--ink-2)" }}>
          출처 확인일은 실제 원문을 확인한 날짜입니다. 접근 제한 등으로 원문을 확인하지 못한 출처에는 그 사실이 표시되어
          있습니다.
        </p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>제목</th>
                <th>발행기관</th>
                <th>발행일</th>
                <th>자료 기준일</th>
                <th>확인일</th>
                <th>관련 주장</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s.id} id={`src-${s.id}`}>
                  <td style={{ maxWidth: 260 }}>
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.title}
                    </a>
                    {s.note && <div style={{ fontSize: 11.5, color: "var(--warn)" }}>{s.note}</div>}
                  </td>
                  <td>{s.publisher}</td>
                  <td className="tabular">{s.publishedAt ?? "—"}</td>
                  <td className="tabular">{s.asOf ?? "—"}</td>
                  <td className="tabular">{s.checkedAt}</td>
                  <td style={{ maxWidth: 320, fontSize: 12.5, color: "var(--ink-2)" }}>{s.claims}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">콘텐츠 상태 구분 기준</h2>
        <ul className="tight" style={{ fontSize: 13 }}>
          <li><span className="badge st-official">공식 자료로 확인</span> — 운용사·공시 원문을 직접 확인한 사실</li>
          <li><span className="badge st-press">신뢰 가능한 언론 보도</span> — 원문 기사를 확인한 보도 기반 사실</li>
          <li><span className="badge st-general">일반적인 전략 설명</span> — 특정 회사가 아닌 업계 일반론·설명용 사례</li>
          <li><span className="badge st-proposal">보험사 적용 제안</span> — 제작자의 해석·제안 (사실과 구분)</li>
          <li><span className="badge st-unverified">확인 필요</span> — 검증하지 못해 기본 화면에서 제외되거나 경고가 붙는 정보</li>
        </ul>
      </div>
    </div>
  );
}
