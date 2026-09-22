/**
 * Global Investment Playbook — 데이터 엔티티 타입 정의
 *
 * 모든 콘텐츠는 화면 코드와 분리된 타입 기반 로컬 데이터로 관리한다.
 * 모르는 값은 null 로 저장한다. 결측 수익률을 0% 로 취급하지 않는다.
 */

/** 콘텐츠 사실 상태 구분 */
export type FactStatus =
  | "official" // 공식 자료로 확인
  | "press" // 신뢰 가능한 언론 보도
  | "general" // 일반적인 전략 설명
  | "proposal" // 보험사 적용 제안
  | "unverified"; // 확인 필요

export const FACT_STATUS_LABEL: Record<FactStatus, string> = {
  official: "공식 자료로 확인",
  press: "신뢰 가능한 언론 보도",
  general: "일반적인 전략 설명",
  proposal: "보험사 적용 제안",
  unverified: "확인 필요",
};

/** 출처 */
export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  /** 발행일 (YYYY-MM-DD), 모르면 null */
  publishedAt: string | null;
  /** 자료 기준일 (예: 성과 기준 시점), 모르면 null */
  asOf: string | null;
  /** 실제 원문을 확인한 날짜 */
  checkedAt: string;
  /** 이 출처가 뒷받침하는 주장 */
  claims: string;
  /** 접근 제한 여부 등 비고 */
  note?: string;
}

/** 카드 분류 라벨: 전략·운용방식·투자구조·기술을 섞지 않는다 */
export type CardKind = "strategy" | "model" | "structure" | "tech";

export const CARD_KIND_LABEL: Record<CardKind, string> = {
  strategy: "투자전략",
  model: "운용방식",
  structure: "투자구조",
  tech: "기술·프로세스",
};

/** 운용사-전략 연결: 대표 전략인지 일부 전략인지 구분 */
export interface StrategyLink {
  managerId: string;
  role: "flagship" | "partial";
  note?: string;
}

/** A. 투자전략 — 무엇을 통해 수익을 추구하는가 */
export interface Strategy {
  id: string;
  nameKo: string;
  nameEn: string;
  /** 상위 전략 (예: merger-arb → event-driven). 최상위면 null */
  parentId: string | null;
  /** 한 문장 정의 */
  oneLiner: string;
  /** 수익 발생 원천 (카드 요약) */
  returnSource: string;
  /** 주요 위험 (카드 요약) */
  keyRisks: string[];
  /** A. 30초 설명 (3~5문장) */
  intro: string[];
  /** B. 어떻게 굴러가는가 — 단계 흐름 */
  mechanics: {
    steps: string[];
    /** 설명용 가상 사례 (반드시 가상임을 표시하여 렌더링) */
    example: { title: string; body: string };
  };
  /** C. 왜 수익이 발생할 수 있는가 */
  whyItWorks: string[];
  /** D. 언제 어려워지는가 */
  whenItFails: string[];
  /** E. 이 전략을 사용하는 운용사 */
  managers: StrategyLink[];
  /** G. 한화생명이 참고할 부분 */
  hanwha: {
    directUse: string; // 투자기법 직접 적용 관점
    processUse: string; // 프로세스만 참고하는 관점
  };
  relatedProcessIds: string[];
  relatedTermIds: string[];
  /** 시대별 비고 등 */
  note?: string;
}

/** B. 운용방식·조직 / 투자구조 / 기술·프로세스 */
export interface OperatingModel {
  id: string;
  kind: Exclude<CardKind, "strategy">;
  nameKo: string;
  nameEn: string;
  oneLiner: string;
  description: string[];
  /** 사용하는 운용사 */
  managerIds: string[];
  /** 혼동 주의 문구 (예: 멀티매니저 ≠ 멀티전략) */
  caution?: string;
  relatedTermIds: string[];
  relatedStrategyIds: string[];
}

/** 프로세스 실행 단계 (설명용) */
export interface ProcessStep {
  actor: string;
  action: string;
  output: string;
}

/** C. 공통 투자 프로세스 (8단계 지도) */
export interface InvestProcess {
  id: string;
  order: number; // 1~8
  nameKo: string;
  /** 쉬운 한 줄 설명 */
  short: string;
  /** 핵심 키워드 2~3개 */
  keywords: string[];
  /** 우측 상세 패널용 */
  panel: {
    decides: string; // 이 단계에서 결정하는 것
    whyImportant: string; // 왜 중요한가
    flow: { input: string; judge: string; output: string };
    hanwhaQuestion: string; // 한화생명에 적용할 질문
  };
  /** 상세 페이지 */
  detail: {
    definition: string; // 1. 쉬운 정의
    problem: string; // 2. 해결하려는 문제
    steps: ProcessStep[]; // 3. 실제 작동 순서 (설명용 프로세스로 표시)
    participants: { role: string; duty: string }[]; // 4. 참여자와 역할
    inputsOutputs: { inputs: string[]; outputs: string[] }; // 5.
    managerCases: {
      managerId: string;
      text: string;
      status: FactStatus;
      sourceId?: string;
    }[]; // 6. 공개 자료로 확인되는 운용사 사례
    strengths: string[]; // 7a
    failureModes: string[]; // 7b
    hanwhaApplication: string[]; // 8
    metrics: string[]; // 9. 측정 가능한 개선 지표
    sourceIds: string[]; // 10
  };
  /** 이 단계와 관련 깊은 운용사 (지도 카드 표시용) */
  managerIds: string[];
  relatedStrategyIds: string[];
  relatedTermIds: string[];
}

/** 운용사 */
export interface Manager {
  id: string;
  nameEn: string;
  nameKo: string;
  founded: number | null;
  hq: string | null;
  founder: string | null;
  /** 현재 경영진 — 확인된 경우만, 확인일 포함 표기 */
  leadership: string | null;
  leadershipAsOf: string | null;
  aum: string | null;
  aumAsOf: string | null;
  /** 회사 소개 */
  intro: string;
  /** 대표 투자철학 */
  philosophy: string;
  /** 전략 연결 (다대다). role: 대표/일부 */
  strategies: { strategyId: string; role: "flagship" | "partial"; note?: string }[];
  /** 운용방식·구조·기술 연결 */
  modelIds: string[];
  /** 공개 자료로 확인되는 운용 프로세스 */
  processNotes: { text: string; status: FactStatus; sourceId?: string }[];
  /** 참고할 요소 */
  referencePoints: string[];
  /** 보험사 적용 시 수정할 요소 */
  insurerAdjustments: string[];
  /** 데이터 주의 (예: Citadel ≠ Citadel Securities) */
  dataCaveats: string[];
  sourceIds: string[];
  /** 자료가 충분히 확인되지 않으면 limited 로 표시 */
  dataStatus: "sufficient" | "limited";
}

/** 펀드·프로그램 — 운용사와 별도 데이터로 관리 */
export interface Fund {
  id: string;
  managerId: string;
  nameEn: string;
  nameKo: string | null;
  /** 유형 표시 (예: 멀티전략 펀드, 추세추종 프로그램) */
  typeLabel: string;
  strategyIds: string[];
  inception: number | null;
  description: string;
  /** 클래스·기준 관련 주의 (예: PSH NAV vs 주가) */
  caveats: string[];
}

export type PeriodType = "annual" | "ytd" | "annualized" | "cumulative";
export type FeeBasis = "net" | "gross" | "unknown";
export type VerificationStatus = "official" | "press" | "pending";

export const VERIFICATION_LABEL: Record<VerificationStatus, string> = {
  official: "공식 공시·운용사 자료",
  press: "신뢰 가능한 언론 보도",
  pending: "검증 대기",
};

/** 성과 기록 */
export interface PerformanceRecord {
  id: string;
  fundId: string;
  /** YYYY-MM-DD. 설정일 등이 미확인이면 null */
  periodStart: string | null;
  periodEnd: string; // YYYY-MM-DD
  periodType: PeriodType;
  /** 수익률 %. 모르면 null (0% 로 취급 금지) */
  returnPct: number | null;
  currency: string | null;
  shareClass: string | null;
  feeBasis: FeeBasis;
  sourceId: string | null;
  verificationStatus: VerificationStatus;
  verifiedAt: string | null; // 실제 원문 확인일
  notes: string | null;
}

/** 한화생명 적용 가이드 — 모든 내용은 '검토 가능한 적용 제안' */
export type GuideStage =
  | "research"
  | "committee"
  | "allocation"
  | "risk-alm"
  | "execution"
  | "monitoring"
  | "evaluation"
  | "external-manager";

export const GUIDE_STAGE_LABEL: Record<GuideStage, string> = {
  research: "리서치",
  committee: "투자심의",
  allocation: "자산배분",
  "risk-alm": "리스크·ALM",
  execution: "집행",
  monitoring: "사후관리",
  evaluation: "성과평가",
  "external-manager": "위탁운용사 평가",
};

export type GuideRole = "executive" | "strategy" | "pm" | "review" | "risk";

export const GUIDE_ROLE_LABEL: Record<GuideRole, string> = {
  executive: "경영진",
  strategy: "투자전략 담당",
  pm: "운용 담당",
  review: "투자심사 담당",
  risk: "리스크·ALM 담당",
};

export type GuideLabel = "process-ref" | "adapt" | "suitability";

export const GUIDE_LABEL_TEXT: Record<GuideLabel, string> = {
  "process-ref": "프로세스 참고",
  adapt: "보험사에 맞게 수정 필요",
  suitability: "별도 투자 적합성 검토 필요",
};

export interface ApplicationGuide {
  id: string;
  title: string;
  stages: GuideStage[];
  roles: GuideRole[];
  labels: GuideLabel[];
  /** 1. 참고하는 글로벌 운용사·프로세스 */
  references: { managerIds: string[]; processIds: string[]; note: string };
  problem: string; // 2. 보험사에서 해결하려는 문제
  idea: string; // 3. 적용할 아이디어
  dataNeeded: string[]; // 4. 실제 필요한 데이터
  owners: { execute: string; approve: string }; // 5. 담당·승인 역할
  expectedEffect: string; // 6. 기대효과
  limitations: string; // 7. 한계와 수정할 부분
  pilot: string; // 8. 소규모 시범 적용 방법
  metrics: string[]; // 9. 효과 측정 지표
}

/** 용어집 */
export interface Term {
  id: string;
  nameKo: string;
  nameEn: string;
  definition: string; // 쉬운 정의
  example: string; // 짧은 예시
  confusedWith: string; // 혼동하기 쉬운 개념
  relatedPages: { label: string; path: string }[];
}

/** 진화 타임라인 (2010년대~) */
export type EraStrategyStatus = "rise" | "resurgence" | "evolution";

export const ERA_STATUS_LABEL: Record<EraStrategyStatus, string> = {
  rise: "확산·주목",
  resurgence: "재부상",
  evolution: "운용방식 발전",
};

export interface Era {
  id: string;
  period: string; // "2010–2014"
  title: string;
  summary: string;
  /** 상단: 당시 주목받은 실제 투자전략 */
  strategies: {
    strategyId: string;
    status: EraStrategyStatus;
    /** 주목받은 배경과 근거 */
    evidence: string;
    factStatus: FactStatus;
    sourceId?: string;
  }[];
  /** 하단: 실행을 바꾼 운용방식·데이터·기술 (OperatingModel 참조) */
  enablers: {
    modelId: string;
    note: string;
    factStatus: FactStatus;
    sourceId?: string;
  }[];
}

/** 최근 주목 섹션 */
export interface RecentHighlight {
  id: string;
  kind: "strategy" | "process";
  title: string;
  refId: string; // strategyId 또는 modelId
  /** 유행 판단 근거 (자금 유입·설문·신규 출시 등) */
  evidence: string;
  factStatus: FactStatus;
  sourceIds: string[];
}

/** 통합 검색 결과 항목 */
export interface SearchItem {
  type: "strategy" | "manager" | "process" | "term" | "fund" | "model";
  id: string;
  title: string;
  subtitle: string;
  path: string;
  /** 검색 대상 텍스트 (한글+영문) */
  haystack: string;
}
