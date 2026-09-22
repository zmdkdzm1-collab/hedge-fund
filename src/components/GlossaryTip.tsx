import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { glossary } from "../data/glossary";

/**
 * 용어 설명 팝오버.
 * 마우스 호버가 아니라 클릭/Enter 로 열리므로 모바일·키보드에서도 동작한다.
 */
export function Term({ id, children }: { id: string; children?: React.ReactNode }) {
  const term = glossary.find((t) => t.id === id);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!term) return <>{children ?? id}</>;

  return (
    <span ref={wrapRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        className="term-btn"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        title={`${term.nameKo} 용어 설명 열기`}
      >
        {children ?? term.nameKo}
      </button>
      {open && (
        <span className="term-pop" role="dialog" aria-label={`${term.nameKo} 용어 설명`} style={{ top: "1.6em", left: 0 }}>
          <b>
            {term.nameKo} <span style={{ fontWeight: 500, color: "var(--ink-3)" }}>{term.nameEn}</span>
          </b>
          <br />
          {term.definition}
          <br />
          <Link to={`/glossary#${term.id}`} onClick={() => setOpen(false)} style={{ fontSize: 12 }}>
            용어집에서 자세히 →
          </Link>
        </span>
      )}
    </span>
  );
}
