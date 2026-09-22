import { Link, useSearchParams } from "react-router-dom";
import { searchAll, SEARCH_TYPE_LABEL } from "../lib/searchIndex";

export function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const results = searchAll(q);

  const groups = results.reduce<Record<string, typeof results>>((acc, item) => {
    (acc[item.type] = acc[item.type] || []).push(item);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="page-title">통합 검색</h1>
      <p className="page-desc">
        “{q}” 검색 결과 {results.length}건 — 전략·운용사·프로세스·용어·펀드를 한글명과 영문명으로 함께 검색합니다.
      </p>
      {q.trim() === "" ? (
        <div className="empty-state">상단 검색창에 검색어를 입력하세요. 예: 롱숏, Trend, 밀레니엄, ALM</div>
      ) : results.length === 0 ? (
        <div className="empty-state">
          “{q}” 에 해당하는 결과가 없습니다. 다른 표기(한글/영문)로 다시 검색하거나 <Link to="/glossary">용어집</Link>을
          살펴보세요.
        </div>
      ) : (
        Object.entries(groups).map(([type, items]) => (
          <div className="section" key={type}>
            <h2 className="section-title">
              {SEARCH_TYPE_LABEL[type as keyof typeof SEARCH_TYPE_LABEL]} <span className="en">{items.length}건</span>
            </h2>
            <div style={{ display: "grid", gap: 8 }}>
              {items.map((item) => (
                <Link key={`${item.type}-${item.id}`} to={item.path} className="card" style={{ padding: "10px 14px" }}>
                  <b style={{ fontSize: 13.5 }}>{item.title}</b>
                  <div style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{item.subtitle}</div>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
