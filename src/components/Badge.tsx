import type { CardKind, FactStatus, VerificationStatus } from "../types";
import { CARD_KIND_LABEL, FACT_STATUS_LABEL, VERIFICATION_LABEL } from "../types";

/** 카드 분류 라벨: [투자전략] [운용방식] [투자구조] [기술·프로세스] */
export function KindBadge({ kind }: { kind: CardKind }) {
  return (
    <span className={`badge kind-${kind}`}>
      <span className="dot" aria-hidden />
      {CARD_KIND_LABEL[kind]}
    </span>
  );
}

/** 사실 상태 라벨: 공식/보도/일반 설명/적용 제안/확인 필요 */
export function StatusBadge({ status }: { status: FactStatus }) {
  return <span className={`badge st-${status}`}>{FACT_STATUS_LABEL[status]}</span>;
}

/** 성과 검증 상태 라벨 */
export function VerifyBadge({ status }: { status: VerificationStatus }) {
  return <span className={`badge st-${status === "pending" ? "pending" : status}`}>{VERIFICATION_LABEL[status]}</span>;
}

export function RoleBadge({ role }: { role: "flagship" | "partial" }) {
  return <span className={`badge role-${role}`}>{role === "flagship" ? "대표 전략" : "일부 전략"}</span>;
}
