/**
 * 손수 만든 SVG 막대 차트.
 * - 단일 측정치(수익률 %)이므로 단일 색: 양수 #2F6BBF, 음수 #FF4F00 (CVD·대비 검증 완료 조합)
 * - 값 라벨은 잉크 색(막대 색 아님), tabular numerals
 * - 결측치는 그리지 않는다 (0% 로 취급 금지)
 */

export interface BarItem {
  key: string;
  label: string;
  sub?: string;
  value: number | null;
  highlight?: boolean;
  title?: string; // hover tooltip
}

const POS = "#2F6BBF";
const NEG = "#FF4F00";
const INK = "#1b202a";
const INK3 = "#7d8595";
const GRID = "#eceae4";

export function BarChartH({ items, unit = "%" }: { items: BarItem[]; unit?: string }) {
  const drawable = items.filter((d) => d.value !== null);
  if (drawable.length === 0) return <div className="empty-state">표시할 검증된 수치가 없습니다.</div>;

  const rowH = 30;
  const labelW = 210;
  const valueW = 52;
  const chartW = 640;
  const plotW = chartW - labelW - valueW;
  const H = items.length * rowH + 26;

  const values = drawable.map((d) => d.value as number);
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const span = max - min || 1;
  const x = (v: number) => labelW + ((v - min) / span) * plotW;

  // 그리드 눈금 (0 포함 4~5개)
  const step = niceStep(span);
  const ticks: number[] = [];
  for (let t = Math.ceil(min / step) * step; t <= max + 1e-9; t += step) ticks.push(Math.round(t * 10) / 10);

  return (
    <svg viewBox={`0 0 ${chartW} ${H}`} width="100%" role="img" aria-label="펀드별 수익률 가로 막대 차트">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={4} y2={H - 22} stroke={t === 0 ? "#c9c4ba" : GRID} strokeWidth={1} />
          <text x={x(t)} y={H - 8} fontSize={10} fill={INK3} textAnchor="middle" className="tabular">
            {t}
            {unit}
          </text>
        </g>
      ))}
      {items.map((d, i) => {
        const y = i * rowH + 6;
        const barH = 16;
        if (d.value === null) {
          return (
            <g key={d.key}>
              <text x={labelW - 8} y={y + barH - 3} fontSize={11.5} fill={INK} textAnchor="end">
                {truncate(d.label, 20)}
              </text>
              <text x={labelW + 4} y={y + barH - 3} fontSize={10.5} fill={INK3}>
                검증된 수치 없음
              </text>
            </g>
          );
        }
        const v = d.value;
        const x0 = x(0);
        const x1 = x(v);
        const bx = Math.min(x0, x1);
        const bw = Math.max(1.5, Math.abs(x1 - x0));
        const fill = v >= 0 ? POS : NEG;
        return (
          <g key={d.key} className="bar-h-row" tabIndex={0} aria-label={`${d.label}: ${v > 0 ? "+" : ""}${v}${unit}`}>
            <title>{d.title ?? `${d.label} ${v > 0 ? "+" : ""}${v}${unit}`}</title>
            <text x={labelW - 8} y={y + barH - 3} fontSize={11.5} fill={INK} textAnchor="end" fontWeight={d.highlight ? 700 : 400}>
              {truncate(d.label, 20)}
            </text>
            <rect className="bar" x={bx} y={y} width={bw} height={barH} rx={3} fill={fill} opacity={d.highlight === false ? 0.45 : 1} />
            <text
              x={v >= 0 ? x1 + 5 : x1 - 5}
              y={y + barH - 3}
              fontSize={11}
              fill={INK}
              textAnchor={v >= 0 ? "start" : "end"}
              className="tabular"
              fontWeight={650}
            >
              {v > 0 ? "+" : ""}
              {v}
              {unit}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** 연도별 세로 막대 (한 펀드의 검증된 연간 수익률) */
export function BarChartYears({ items, unit = "%" }: { items: { year: string; value: number }[]; unit?: string }) {
  if (items.length === 0) return <div className="empty-state">검증된 연도별 수익률이 충분하지 않습니다.</div>;
  const W = 480;
  const H = 200;
  const padL = 40;
  const padB = 26;
  const padT = 14;
  const plotW = W - padL - 12;
  const plotH = H - padT - padB;
  const values = items.map((d) => d.value);
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const span = max - min || 1;
  const y = (v: number) => padT + (1 - (v - min) / span) * plotH;
  const bw = Math.min(46, (plotW / items.length) * 0.55);
  const step = niceStep(span);
  const ticks: number[] = [];
  for (let t = Math.ceil(min / step) * step; t <= max + 1e-9; t += step) ticks.push(Math.round(t * 10) / 10);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 520 }} role="img" aria-label="연도별 수익률 세로 막대 차트">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - 8} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#c9c4ba" : GRID} strokeWidth={1} />
          <text x={padL - 6} y={y(t) + 3.5} fontSize={10} fill={INK3} textAnchor="end" className="tabular">
            {t}
          </text>
        </g>
      ))}
      {items.map((d, i) => {
        const cx = padL + ((i + 0.5) / items.length) * plotW;
        const y0 = y(0);
        const y1 = y(d.value);
        const by = Math.min(y0, y1);
        const bh = Math.max(1.5, Math.abs(y1 - y0));
        const fill = d.value >= 0 ? POS : NEG;
        return (
          <g key={d.year} tabIndex={0} aria-label={`${d.year}년 ${d.value > 0 ? "+" : ""}${d.value}${unit}`}>
            <title>{`${d.year}: ${d.value > 0 ? "+" : ""}${d.value}${unit}`}</title>
            <rect x={cx - bw / 2} y={by} width={bw} height={bh} rx={3} fill={fill} />
            <text
              x={cx}
              y={d.value >= 0 ? y1 - 5 : y1 + 12}
              fontSize={10.5}
              fill={INK}
              textAnchor="middle"
              className="tabular"
              fontWeight={650}
            >
              {d.value > 0 ? "+" : ""}
              {d.value}
            </text>
            <text x={cx} y={H - 8} fontSize={10.5} fill={INK3} textAnchor="middle" className="tabular">
              {d.year}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function niceStep(span: number) {
  const raw = span / 5;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const n = raw / pow;
  const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return nice * pow;
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
