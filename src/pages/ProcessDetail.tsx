import { Link, useParams } from "react-router-dom";
import { processes } from "../data/processes";
import { managerById } from "../data/managers";
import { strategyById } from "../data/strategies";
import { StatusBadge } from "../components/Badge";
import { SourceList } from "../components/SourceList";
import { Term } from "../components/GlossaryTip";
import { NotFound } from "./NotFound";

export function ProcessDetail() {
  const { id } = useParams();
  const p = processes.find((x) => x.id === id);
  if (!p) return <NotFound message="해당 프로세스를 찾을 수 없습니다." />;
  const d = p.detail;
  const prev = processes.find((x) => x.order === p.order - 1);
  const next = processes.find((x) => x.order === (p.order === 8 ? 1 : p.order + 1));

  return (
    <div>
      <nav className="breadcrumb">
        <Link to="/">투자 프로세스 지도</Link> / STEP {p.order}
      </nav>
      <h1 className="page-title">
        {p.order}. {p.nameKo}
      </h1>
      <p className="page-desc">{p.short}</p>

      <div className="section">
        <h2 className="section-title">1. 쉬운 정의</h2>
        <p>{d.definition}</p>
      </div>

      <div className="section">
        <h2 className="section-title">2. 해결하려는 문제</h2>
        <p>{d.problem}</p>
      </div>

      <div className="section">
        <h2 className="section-title">3. 실제 작동 순서</h2>
        <p className="note orange" style={{ marginTop: 0 }}>
          아래 순서는 여러 운용사의 공개 자료·보도를 일반화한 <b>설명용 프로세스</b>입니다. 특정 운용사의 실제 내부 절차가
          아닙니다.
        </p>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>담당자</th>
                <th>판단·행동</th>
                <th>산출물</th>
              </tr>
            </thead>
            <tbody>
              {d.steps.map((s, i) => (
                <tr key={i}>
                  <td className="num">{i + 1}</td>
                  <td>{s.actor}</td>
                  <td>{s.action}</td>
                  <td style={{ color: "var(--navy)" }}>{s.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">4. 참여자와 역할</h2>
        <ul className="tight">
          {d.participants.map((x) => (
            <li key={x.role}>
              <b>{x.role}</b> — {x.duty}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2 className="section-title">5. 입력 데이터와 산출물</h2>
        <div className="grid cols-2">
          <div className="card">
            <b style={{ fontSize: 13 }}>입력</b>
            <ul className="tight">
              {d.inputsOutputs.inputs.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <b style={{ fontSize: 13 }}>산출물</b>
            <ul className="tight">
              {d.inputsOutputs.outputs.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">6. 공개 자료로 확인되는 운용사 사례</h2>
        {d.managerCases.map((c, i) => {
          const m = managerById(c.managerId);
          return (
            <div key={i} className="card" style={{ marginBottom: 10 }}>
              <div className="tag-row" style={{ marginBottom: 6 }}>
                {m && (
                  <Link to={`/managers/${m.id}`} style={{ fontWeight: 750 }}>
                    {m.nameEn}
                  </Link>
                )}
                <StatusBadge status={c.status} />
              </div>
              <div style={{ fontSize: 13.5, color: "var(--ink-2)" }}>{c.text}</div>
            </div>
          );
        })}
      </div>

      <div className="section">
        <h2 className="section-title">7. 강점과 실패하기 쉬운 조건</h2>
        <div className="grid cols-2">
          <div className="card">
            <b style={{ fontSize: 13, color: "var(--ok)" }}>강점</b>
            <ul className="tight">
              {d.strengths.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <b style={{ fontSize: 13, color: "var(--danger)" }}>실패하기 쉬운 조건</b>
            <ul className="tight">
              {d.failureModes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">8. 한화생명 적용 방안</h2>
        <p className="note" style={{ marginTop: 0 }}>
          아래 내용은 <b>검토 가능한 적용 제안</b>이며, 한화생명의 실제 내부 프로세스를 기술한 것이 아닙니다.
        </p>
        <ul className="tight">
          {d.hanwhaApplication.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p style={{ fontSize: 13 }}>
          <Link to="/guide">→ 한화생명 적용 가이드에서 실행 단위 과제 보기</Link>
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">9. 측정 가능한 개선 지표</h2>
        <ul className="tight">
          {d.metrics.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2 className="section-title">관련 전략·용어</h2>
        <div className="tag-row">
          {p.relatedStrategyIds.map((sid) => {
            const s = strategyById(sid);
            return s ? (
              <Link key={sid} to={`/strategies/${sid}`} className="badge">
                {s.nameKo} / {s.nameEn}
              </Link>
            ) : null;
          })}
          {p.relatedTermIds.map((tid) => (
            <Term key={tid} id={tid} />
          ))}
        </div>
      </div>

      <SourceList ids={d.sourceIds} title="10. 출처" />

      <div className="section no-print" style={{ display: "flex", gap: 10, justifyContent: "space-between" }}>
        {prev ? (
          <Link className="btn" to={`/process/${prev.id}`}>
            ← {prev.order}. {prev.nameKo}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link className="btn" to={`/process/${next.id}`}>
            {p.order === 8 ? "↻ 1. " : `${next.order}. `}
            {next.nameKo} →
          </Link>
        )}
      </div>
    </div>
  );
}
