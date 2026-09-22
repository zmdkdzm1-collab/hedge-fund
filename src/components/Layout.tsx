import { FormEvent, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { DATA_CHECKED_DATE } from "../lib/constants";

const NAV = [
  { to: "/", label: "투자 프로세스 지도", end: true },
  { to: "/strategies", label: "투자전략 탐색" },
  { to: "/evolution", label: "전략의 진화" },
  { to: "/managers", label: "운용사 라이브러리" },
  { to: "/performance", label: "성과 비교" },
  { to: "/guide", label: "한화생명 적용 가이드" },
  { to: "/glossary", label: "용어·출처" },
];

export function Layout() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          {/* 정식 로고 미확보 — 텍스트 워드마크 사용 */}
          <div className="brand-word">
            Global Investment<br />
            Playbook<span className="accent">.</span>
          </div>
          <div className="brand-sub">글로벌 헤지펀드에서 찾는<br />보험사 투자 프로세스의 진화</div>
        </div>
        <nav aria-label="주 메뉴">
          {NAV.map((item, i) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}>
              <span className="idx">{i + 1}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="foot">
          투자 프로세스 벤치마킹을 위한 내부 리서치 도구입니다. 특정 상품의 매수 권유가 아니며, 수록된 성과·사실에는 출처와 확인일이 표시됩니다.
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <form className="search-form" onSubmit={onSearch} role="search">
            <span className="search-icon" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
            </span>
            <input
              className="search-input"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="전략·운용사·프로세스·용어 통합 검색 (한글/영문)"
              aria-label="통합 검색"
            />
          </form>
          <span className="checked-date">마지막 데이터 검증일 {DATA_CHECKED_DATE}</span>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
