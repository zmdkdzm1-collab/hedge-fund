import type { OperatingModel } from "../types";

/**
 * 투자전략과 별도로 관리하는 분류:
 * - model: 운용방식·조직 (어떻게 판단하고 운영하는가)
 * - structure: 투자구조·포트폴리오 구성
 * - tech: 기술·프로세스
 * 이들은 수익전략이 아니며, 화면에서 [운용방식]/[투자구조]/[기술·프로세스] 라벨로 구분한다.
 */
export const operatingModels: OperatingModel[] = [
  // ── 운용방식·조직 ──────────────────────────────
  {
    id: "discretionary",
    kind: "model",
    nameKo: "재량운용",
    nameEn: "Discretionary Investing",
    oneLiner: "사람(PM)의 판단이 최종 의사결정을 내리는 운용 방식이다.",
    description: [
      "리서치와 데이터를 참고하되, 최종 투자 판단은 운용역의 재량으로 이뤄진다.",
      "규칙화하기 어려운 정보(경영진 면담, 딜 협상, 복잡한 법률 상황)를 다룰 수 있는 것이 강점이다.",
      "판단 과정이 기록되지 않으면 재현·검증·복기가 어렵다는 약점이 있어, 선도 운용사들은 재량 판단도 문서화·데이터화하는 방향으로 발전시켜 왔다.",
    ],
    managerIds: ["pershing-square", "tci", "third-point", "elliott", "man"],
    caution: "재량운용 ↔ 시스템운용은 '실행 방식'의 구분이며, 어떤 전략이든 두 방식 모두로 실행될 수 있다.",
    relatedTermIds: ["discretionary", "systematic"],
    relatedStrategyIds: ["activist", "event-driven", "global-macro"],
  },
  {
    id: "systematic",
    kind: "model",
    nameKo: "시스템·퀀트 운용",
    nameEn: "Systematic / Quantitative Investing",
    oneLiner: "사전에 정의된 규칙·모델이 포지션을 산출하고 실행하는 운용 방식이다.",
    description: [
      "투자 논리를 코드로 구현해 수많은 시장에 일관되게 적용한다. 감정 개입이 없고 검증·복기가 쉽다.",
      "모델이 상정하지 않은 구조 변화에 취약하며, 백테스트 과최적화가 고질적 위험이다.",
      "추세추종은 시스템 운용의 대표 유형이지만, 시스템 운용이 곧 추세추종은 아니다 — 시장중립, 매크로, 차익거래 등 다양한 전략이 시스템으로 실행된다.",
    ],
    managerIds: ["rentec", "two-sigma", "deshaw", "aqr", "man", "bridgewater"],
    caution: "'퀀트(계량 분석 활용)'와 '시스템(규칙 기반 실행)'은 겹치지만 같은 말이 아니다.",
    relatedTermIds: ["systematic", "quantitative", "backtest", "overfitting"],
    relatedStrategyIds: ["stat-arb", "trend-following", "systematic-macro", "equity-market-neutral"],
  },
  {
    id: "quantamental",
    kind: "model",
    nameKo: "퀀터멘털",
    nameEn: "Quantamental",
    oneLiner: "펀더멘털 분석과 계량 기법을 결합한 하이브리드 운용 방식이다.",
    description: [
      "애널리스트의 기업 분석에 데이터 과학(대체데이터, 스크리닝, 리스크 모델)을 결합한다.",
      "사람의 통찰과 기계의 처리 능력을 상호 보완하는 것이 목표다.",
      "조직적으로는 리서치 조직과 데이터 조직의 협업 구조 설계가 성패를 가른다.",
    ],
    managerIds: ["point72", "deshaw", "citadel", "balyasny"],
    relatedTermIds: ["quantamental-term"],
    relatedStrategyIds: ["equity-long-short", "equity-market-neutral"],
  },
  {
    id: "multi-manager",
    kind: "model",
    nameKo: "멀티매니저·Pod 구조",
    nameEn: "Multi-Manager / Pod Model",
    oneLiner: "다수의 독립 운용팀(Pod)에 자본을 배분하고 중앙에서 위험을 통제하는 조직 구조다.",
    description: [
      "각 팀은 자기 전략을 독립적으로 운용하고, 회사는 팀별 한도·자본 배분·리스크 총량을 중앙에서 관리한다.",
      "성과가 나쁜 팀의 자본을 빠르게 회수하는 규율이 핵심 장치다.",
      "2017~2023년 관련 운용자산이 175% 성장(업계 집계)하며 2020년대 헤지펀드 업계의 지배적 조직 모델로 부상했고, 패스스루 수수료·수용력 논쟁도 함께 커졌다.",
    ],
    managerIds: ["millennium", "citadel", "point72", "balyasny"],
    caution: "멀티매니저(조직 구조)와 멀티전략(전략 구성)은 같은 개념이 아니다 — 멀티매니저는 멀티전략을 구현하는 한 방식이다.",
    relatedTermIds: ["multi-manager-term", "pod", "multi-strategy-term", "pass-through-fee", "risk-budget"],
    relatedStrategyIds: ["multi-strategy"],
  },
  // ── 투자구조·포트폴리오 구성 ──────────────────────────────
  {
    id: "sma",
    kind: "structure",
    nameKo: "별도관리계좌",
    nameEn: "Separately Managed Account (SMA)",
    oneLiner: "펀드에 섞이지 않고 투자자 명의 계좌에서 운용사가 위임 운용하는 구조다.",
    description: [
      "투자자가 자산의 소유권과 투명성(포지션 실시간 확인)을 유지한 채 운용만 위임한다.",
      "가드레일(한도·금지 자산)을 계약으로 설정할 수 있어 기관투자자 통제력이 높다.",
      "업계 집계 기준 헤지펀드 SMA 비중은 2010년 3.4%에서 2024년 7.1%(약 3,150억 달러)로 성장했다.",
    ],
    managerIds: [],
    caution: "SMA 는 '어떤 전략을 담느냐'와 무관한 그릇(구조)이다 — 전략 분류와 섞지 않는다.",
    relatedTermIds: ["sma-term", "liquidity"],
    relatedStrategyIds: [],
  },
  {
    id: "portable-alpha",
    kind: "structure",
    nameKo: "포터블 알파",
    nameEn: "Portable Alpha",
    oneLiner: "시장 수익(베타)은 파생으로 확보하고, 남는 현금으로 알파 전략을 얹는 구조다.",
    description: [
      "예: 주식 익스포저는 선물로 유지하면서, 현금은 시장중립 헤지펀드에 투자해 '베타 + 알파'를 동시에 추구한다.",
      "1980년대 등장했다가 금융위기 때 외면받았고, 2023~2024년 자본 효율을 찾는 기관투자자 사이에서 재부상했다(업계 보도).",
      "레버리지가 내재된 구조라 유동성·마진 관리가 실패 지점이다.",
    ],
    managerIds: [],
    caution: "구조(포트폴리오 구성 방식)이며 수익전략 자체가 아니다.",
    relatedTermIds: ["portable-alpha-term", "alpha", "beta", "capital-efficiency", "leverage"],
    relatedStrategyIds: ["equity-market-neutral", "trend-following"],
  },
  // ── 기술·프로세스 ──────────────────────────────
  {
    id: "alt-data",
    kind: "tech",
    nameKo: "대체데이터",
    nameEn: "Alternative Data",
    oneLiner: "공시·시세 밖의 데이터(카드 결제, 위성사진, 웹 트래픽 등)를 투자 판단에 활용한다.",
    description: [
      "기업 실적을 공시 전에 추정하거나, 산업 흐름을 더 빨리 포착하는 데 쓰인다.",
      "업계 설문 기준 사용률이 2022년 31%에서 2024년 67%로 급증 — 실험 단계를 지나 주류 인프라가 됐다는 평가다.",
      "데이터 품질 검증과 취득 경로의 적법성(개인정보·내부자정보) 관리가 필수다.",
    ],
    managerIds: ["point72", "two-sigma", "balyasny"],
    relatedTermIds: ["quantitative"],
    relatedStrategyIds: ["equity-long-short", "stat-arb"],
  },
  {
    id: "machine-learning",
    kind: "tech",
    nameKo: "머신러닝",
    nameEn: "Machine Learning",
    oneLiner: "데이터에서 패턴을 학습하는 알고리즘을 시그널 발굴·리스크 관리에 활용한다.",
    description: [
      "2017~2018년 설문에서 활용률이 20%→56%로 급등하며 퀀트 전략(특히 통계적 차익거래)의 표준 도구가 됐다.",
      "Man AHL 은 2014년부터 머신러닝 전략을 실운용했고, Bridgewater 는 2024년 머신러닝 주도 펀드를 출시했다.",
      "머신러닝은 '새로운 투자전략'이 아니라 기존 전략의 실행을 바꾸는 기술이다 — 어떤 전략(시장중립·매크로 등)에 쓰였는지로 이해해야 한다.",
    ],
    managerIds: ["man", "bridgewater", "two-sigma", "deshaw", "rentec", "aqr"],
    caution: "'AI 투자'를 별도 수익전략처럼 분류하지 않는다. 퀀트 운용사의 수익을 생성형 AI 의 성과로 단정하지도 않는다.",
    relatedTermIds: ["quantitative", "overfitting", "backtest"],
    relatedStrategyIds: ["stat-arb", "equity-market-neutral", "systematic-macro"],
  },
  {
    id: "agentic-research",
    kind: "tech",
    nameKo: "에이전트형 AI 리서치",
    nameEn: "Agentic Research",
    oneLiner: "AI 에이전트가 가설 생성→코딩→백테스트를 자율 수행하고 사람이 검증하는 방식이다.",
    description: [
      "Man Numeric 의 AlphaGPT 는 투자 시그널을 자율 생성·검증해 일부가 실거래 승인을 받았다고 보도됐다(2025).",
      "리서처 한 명이 검토할 수 있는 가설의 수를 크게 늘리는 것이 목적이다.",
      "최종 승인·리스크 통제는 사람이 맡는 구조가 현재까지의 공통점이다.",
    ],
    managerIds: ["man", "bridgewater"],
    relatedTermIds: ["backtest", "overfitting"],
    relatedStrategyIds: ["stat-arb", "systematic-macro"],
  },
  {
    id: "expert-judgment-data",
    kind: "tech",
    nameKo: "전문가 판단 데이터화",
    nameEn: "Codifying Expert Judgment",
    oneLiner: "베테랑의 판단 논리를 기록·구조화해 시스템과 후배가 재사용할 수 있게 만든다.",
    description: [
      "Bridgewater 가 수십 년간 해온 접근 — 판단의 이유를 기록하고 원칙으로 승격해 시스템에 축적한다.",
      "이렇게 쌓인 판단 데이터는 최근 AI 학습·검증의 재료가 되고 있다.",
      "기록 문화가 없으면 AI 도입 단계에서 학습시킬 데이터 자체가 없다는 점이 시사점이다.",
    ],
    managerIds: ["bridgewater"],
    relatedTermIds: ["attribution"],
    relatedStrategyIds: ["systematic-macro", "global-macro"],
  },
  {
    id: "ai-review-support",
    kind: "tech",
    nameKo: "AI 리서치·투자심의 지원",
    nameEn: "AI Research & IC Support",
    oneLiner: "사내 문서·데이터 기반 검색·요약·질의응답으로 리서치와 심의를 보조한다.",
    description: [
      "Man Group 의 ManGPT(2023) 처럼 사내 생성형 AI 포털로 문서 작성·검색·요약을 지원하는 사례가 확산되고 있다.",
      "투자 판단의 주체가 아니라 '준비의 속도와 폭'을 넓히는 도구로 자리 잡는 단계다.",
      "축적된 사내 문서의 품질(태깅·표준화)이 효과를 좌우한다.",
    ],
    managerIds: ["man", "balyasny", "two-sigma"],
    caution: "AI 지원 도구는 판단 주체가 아니다 — 검증 절차를 별도로 설계해야 한다.",
    relatedTermIds: [],
    relatedStrategyIds: [],
  },
];

export const modelById = (id: string) => operatingModels.find((m) => m.id === id);
