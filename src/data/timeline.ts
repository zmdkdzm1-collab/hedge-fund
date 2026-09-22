import type { Era, RecentHighlight } from "../types";

/**
 * 전략의 진화 타임라인 (2010년대~).
 * 각 구간은 전략이 '발명된' 시기가 아니라 '확산·재부상한' 시기를 보여준다.
 * 상단(strategies): 당시 주목받은 실제 투자전략 / 하단(enablers): 실행을 바꾼 운용방식·데이터·기술
 */
export const eras: Era[] = [
  {
    id: "era-2010-2014",
    period: "2010–2014",
    title: "위기 이후: 행동주의의 부상과 추세추종의 시련·부활",
    summary:
      "금융위기 이후 저금리 국면에서 행동주의 캠페인이 급증했고, 위기 직후 부진했던 추세추종은 2014년 강하게 반등했다. 연기금을 중심으로 리스크 패리티(올웨더형 자산배분)에 기관 자금이 유입된 시기이기도 하다.",
    strategies: [
      {
        strategyId: "activist",
        status: "rise",
        evidence:
          "행동주의 캠페인이 2014년 한 해 344건, 154개 기업에서 이사회 의석 276석 확보(당시 역대 최다) — Activist Insight 집계.",
        factStatus: "press",
        sourceId: "src-hls-activist-2017",
      },
      {
        strategyId: "trend-following",
        status: "resurgence",
        evidence:
          "위기 이후 수년 부진으로 '추세추종의 죽음'이 회자되던 중, 2014년 Newedge CTA 지수 +15.7%·Trend 지수 +19.7%로 2008년 이후 최대 상승.",
        factStatus: "press",
        sourceId: "src-hfj-cta-2014",
      },
    ],
    enablers: [
      {
        modelId: "systematic",
        note: "리스크 패리티 등 규칙 기반 배분이 연기금에 확산 — 올웨더형 전략으로 기관 자금 유입(보도).",
        factStatus: "press",
        sourceId: "src-fortune-allweather-2016",
      },
    ],
  },
  {
    id: "era-2015-2019",
    period: "2015–2019",
    title: "퀀트의 확장: ARP 붐과 머신러닝의 침투",
    summary:
      "퀀트 펀드가 업계 자금 유입을 주도했고, 대체 위험 프리미아(ARP) 상품이 붐을 이뤘다가 2018년 부진으로 기대가 조정됐다. 머신러닝이 통계적 차익거래 등 퀀트 전략의 표준 도구가 되기 시작했고, 멀티매니저 플랫폼의 고성장이 시작된 구간이다.",
    strategies: [
      {
        strategyId: "arp",
        status: "rise",
        evidence:
          "2016~2017년 저변동성 국면에서 ARP 상품 붐. 2018년에는 평균 매니저 성과가 9월까지 약 -4%로 목표(현금+4~6%)를 크게 밑돌며 기대가 조정됨.",
        factStatus: "press",
        sourceId: "src-bfinance-arp",
      },
      {
        strategyId: "equity-market-neutral",
        status: "rise",
        evidence:
          "2010~2017년 퀀트 펀드가 업계 순유입의 29%(1,140억 달러)를 흡수(자산 비중은 17%) — 시장중립·계량 전략 중심의 자금 이동.",
        factStatus: "press",
        sourceId: "src-ii-quant",
      },
      {
        strategyId: "multi-strategy",
        status: "rise",
        evidence: "멀티전략(멀티매니저) 운용자산이 2017~2023년 +175% 성장(같은 기간 여타 유형 +13%) — 고성장의 출발점.",
        factStatus: "press",
        sourceId: "src-cais-multistrat",
      },
      {
        strategyId: "alt-trend",
        status: "evolution",
        evidence:
          "Man AHL Evolution 이 비전통 시장 확장의 성과를 보였고, AQR 은 2019년 이색 시장 추세추종 전략(Helix)을 출시 — 대체시장 추세추종의 원류.",
        factStatus: "press",
        sourceId: "src-risknet-helix",
      },
    ],
    enablers: [
      {
        modelId: "machine-learning",
        note: "매니저의 AI/머신러닝 활용률이 2017년 20% → 2018년 56%로 급등(BarclayHedge 설문) — 통계적 차익거래·시장중립 전략에 우선 침투.",
        factStatus: "official",
        sourceId: "src-barclayhedge-ml-2017",
      },
      {
        modelId: "multi-manager",
        note: "팀 단위 자본 배분과 중앙 리스크 관리라는 조직 모델이 성장 궤도에 진입.",
        factStatus: "press",
        sourceId: "src-cais-multistrat",
      },
    ],
  },
  {
    id: "era-2020-2022",
    period: "2020–2022",
    title: "변동성의 귀환: 테일리스크의 순간과 매크로·추세의 재부상",
    summary:
      "2020년 3월 급락은 테일리스크 헤지를 스포트라이트로 끌어올렸고, 2022년 금리 쇼크는 글로벌 매크로와 추세추종에 기록적인 해를 만들어 줬다. 멀티전략 플랫폼의 안정적 성과가 부각되며 자금 집중이 가속된 구간이다.",
    strategies: [
      {
        strategyId: "tail-risk",
        status: "resurgence",
        evidence:
          "2020년 3월 Universa 가 월간 3,612%·연초 이후 4,144% 수익을 보고(보도) — '보험형' 전략의 존재감이 급부상.",
        factStatus: "press",
        sourceId: "src-forbes-universa-2020",
      },
      {
        strategyId: "trend-following",
        status: "resurgence",
        evidence: "2022년 SG CTA 지수 +20.1%(2000년 산출 이래 최고의 해), SG Trend 지수 +27.3% — 금리 급등 추세를 수익화.",
        factStatus: "press",
        sourceId: "src-hedgeweek-cta-2022",
      },
      {
        strategyId: "global-macro",
        status: "resurgence",
        evidence: "인플레이션·금리 쇼크·전쟁 국면에서 거시 변수의 큰 추세가 복원되며 매크로 전략 전반이 재부상.",
        factStatus: "press",
        sourceId: "src-hedgeweek-cta-2022",
      },
      {
        strategyId: "multi-strategy",
        status: "rise",
        evidence:
          "Citadel 이 2022년 고객 순이익 160억 달러(Wellington +38.1%)로 당시 업계 기록 — 멀티전략의 업계 지배력 확대 평가(LCH).",
        factStatus: "press",
        sourceId: "src-forbes-citadel-2022",
      },
    ],
    enablers: [
      {
        modelId: "alt-data",
        note: "팬데믹 국면에서 실시간 대체데이터(이동량·결제 등)의 가치가 부각 — 사용률은 2022년 31%에서 이후 급증.",
        factStatus: "press",
        sourceId: "src-lowenstein-altdata-2024",
      },
      {
        modelId: "multi-manager",
        note: "변동 장세에서 팀 분산+강한 손실 통제 구조의 상대적 안정성이 검증됨.",
        factStatus: "press",
        sourceId: "src-forbes-citadel-2022",
      },
    ],
  },
  {
    id: "era-2023-2024",
    period: "2023–2024",
    title: "플랫폼 전성기: Pod 지배력, 분산거래, 포터블 알파의 컴백",
    summary:
      "멀티매니저 플랫폼으로의 자금 집중이 정점에 달하며 패스스루 수수료·수용력 논쟁이 본격화됐다. 지수-종목 변동성의 괴리를 노리는 분산거래가 인기를 끌다 혼잡 경고가 나왔고, 포터블 알파가 기관 사이에서 재부상했다. 대체시장 추세추종도 성과를 앞세워 확산됐다.",
    strategies: [
      {
        strategyId: "multi-strategy",
        status: "evolution",
        evidence:
          "멀티전략 AUM 급성장의 정점 — 패스스루 수수료 보편화, 신규 자금 접근 제한·장기 락업 등 수용력 이슈가 투자자 논쟁의 중심으로.",
        factStatus: "press",
        sourceId: "src-cais-multistrat",
      },
      {
        strategyId: "dispersion",
        status: "rise",
        evidence:
          "분산거래 자금 유입 급증 — Cboe 는 2023년 9월 S&P500 Dispersion 지수(DSPX)를 출시했고, 2024년 블룸버그는 혼잡(크라우딩) 리스크를 경고.",
        factStatus: "press",
        sourceId: "src-bloomberg-dispersion-2024",
      },
      {
        strategyId: "alt-trend",
        status: "rise",
        evidence:
          "AQR Helix 가 2022년 +49.1%·2023년 +14.3%를 기록하며 대체시장 추세추종에 대한 기관 관심 확산 (출시는 2019년 — 이 구간은 '확산기').",
        factStatus: "press",
        sourceId: "src-famag-helix-2024",
      },
    ],
    enablers: [
      {
        modelId: "portable-alpha",
        note: "자본 효율과 비상관 수익을 찾는 기관 사이에서 포터블 알파('리턴 스태킹')가 재부상 — 구조(투자구조)의 부활이지 새 전략이 아님.",
        factStatus: "press",
        sourceId: "src-ii-portable-alpha",
      },
      {
        modelId: "sma",
        note: "통제력을 원하는 기관 수요로 SMA 비중 확대 — 2024년 신규 요청 약 50% 급증(업계 보고).",
        factStatus: "press",
        sourceId: "src-dechert-sma-2025",
      },
      {
        modelId: "multi-manager",
        note: "Pod 모델이 업계 표준 조직 구조로 자리 잡음 — 인재·수수료·수용력이 새로운 경쟁 축으로.",
        factStatus: "press",
        sourceId: "src-cais-multistrat",
      },
    ],
  },
  {
    id: "era-2025-present",
    period: "2025–현재 (자료 확인: 2026-09-22)",
    title: "AI 통합과 5조 달러 시대: 롱숏의 귀환",
    summary:
      "업계 자산이 2025년 3분기 사상 첫 5조 달러를 돌파(HFR)한 가운데, 주식 롱숏이 실제 자금 유입과 함께 최대 전략 지위를 회복했다. Bridgewater·Man Group 등이 AI 를 리서치 파이프라인의 핵심으로 공식 채택하기 시작했고, 멀티전략의 수용력 논쟁은 계속되고 있다.",
    strategies: [
      {
        strategyId: "equity-long-short",
        status: "resurgence",
        evidence:
          "2025년 Equity Hedge 에 486억 달러 순유입, 자산 +2,605억 달러 — 수익률만이 아니라 실제 배분 확대가 확인된 부활(HFR).",
        factStatus: "official",
        sourceId: "src-hfr-2026q1",
      },
      {
        strategyId: "multi-strategy",
        status: "evolution",
        evidence: "멀티전략 서브전략 자산 8,433억 달러로 업계 2위 규모 유지 — 자금 유입 지속과 수용력·락업 논쟁 병행(HFR).",
        factStatus: "official",
        sourceId: "src-hfr-2026q1",
      },
      {
        strategyId: "alt-trend",
        status: "rise",
        evidence: "AQR 등이 2025년 상반기 성과(+7.4%)를 앞세워 대체시장 추세추종 상품 확장 지속(보도).",
        factStatus: "press",
        sourceId: "src-hedgeweek-aqr-h1",
      },
      {
        strategyId: "activist",
        status: "resurgence",
        evidence: "2025~2026년 행동주의 '부활' 보도가 있으나, 신뢰할 만한 캠페인 집계·자금 유입 근거는 이번 조사에서 확보하지 못함.",
        factStatus: "unverified",
      },
    ],
    enablers: [
      {
        modelId: "agentic-research",
        note: "Man Numeric 의 AlphaGPT — 에이전트형 AI 가 시그널을 자율 생성·백테스트해 일부 실거래 승인(보도, 2025-07).",
        factStatus: "press",
        sourceId: "src-bloomberg-alphagpt-2025",
      },
      {
        modelId: "machine-learning",
        note: "Bridgewater AIA Labs(2023 설립)의 머신러닝 주도 펀드가 2024년 7월 출범 — 2025년은 '확산·검증'의 해 (설립·출시 시점 주의).",
        factStatus: "official",
        sourceId: "src-bw-ai",
      },
      {
        modelId: "alt-data",
        note: "대체데이터 사용률 67%(2024 설문) — 실험에서 주류 인프라로 성숙.",
        factStatus: "press",
        sourceId: "src-lowenstein-altdata-2024",
      },
    ],
  },
];

/** 최근 주목: A. 투자전략 (자금 유입·설문·상품 확장 근거) / B. 운용 프로세스 (실제 발표 사례) */
export const recentHighlights: RecentHighlight[] = [
  {
    id: "recent-els",
    kind: "strategy",
    title: "주식 롱숏 / Equity Long/Short",
    refId: "equity-long-short",
    evidence:
      "2025년 Equity Hedge 순유입 486억 달러(HFR) — 최근 수익률뿐 아니라 실제 배분 확대가 확인되는 대표 전략. 약 1.5조 달러로 업계 최대 전략 지위 회복.",
    factStatus: "official",
    sourceIds: ["src-hfr-2026q1"],
  },
  {
    id: "recent-multistrat",
    kind: "strategy",
    title: "멀티전략 / Multi-Strategy",
    refId: "multi-strategy",
    evidence:
      "자금 유입이 지속돼 서브전략 자산 8,433억 달러(업계 2위)를 유지하나, 접근 제한·장기 락업 등 수용력 논쟁이 병행 — '인기'와 '조건 악화'가 공존.",
    factStatus: "official",
    sourceIds: ["src-hfr-2026q1", "src-cais-multistrat"],
  },
  {
    id: "recent-alt-trend",
    kind: "strategy",
    title: "대체시장 추세추종 / Alternative Markets Trend Following",
    refId: "alt-trend",
    evidence: "성과(2025년 Helix +18.6%)와 상품 확장이 동시에 진행 — 전통 추세추종과의 낮은 상관이 세일즈 포인트.",
    factStatus: "press",
    sourceIds: ["src-hedgeweek-aqr-h1", "src-reuters-factbox-2025"],
  },
  {
    id: "recent-dispersion",
    kind: "strategy",
    title: "주식 변동성 분산거래 / Equity Volatility Dispersion",
    refId: "dispersion",
    evidence:
      "자금 유입으로 붐을 이뤘으나 '가장 혼잡한 변동성 전략'으로 지목되며 역발상 포지션까지 등장 — 인기와 혼잡 리스크가 공존하는 사례.",
    factStatus: "press",
    sourceIds: ["src-hedgeweek-dispersion", "src-bloomberg-dispersion-2024"],
  },
  {
    id: "recent-ai-research",
    kind: "process",
    title: "AI 리서치 통합 (Bridgewater AIA·Man AlphaGPT)",
    refId: "agentic-research",
    evidence:
      "Bridgewater 의 머신러닝 주도 펀드(2024-07 출범, 약 20억 달러)와 Man Group 의 AlphaGPT(시그널 실거래 승인, 2025) — 대형 운용사가 AI 를 리서치 파이프라인의 핵심으로 공식 채택.",
    factStatus: "press",
    sourceIds: ["src-hedgeweek-bw-fund", "src-bloomberg-alphagpt-2025", "src-bw-ai"],
  },
  {
    id: "recent-alt-data",
    kind: "process",
    title: "대체데이터의 주류화",
    refId: "alt-data",
    evidence: "사용률 2022년 31% → 2024년 67%, 사용 기관의 94%가 예산 증액 계획(설문) — '실험'에서 '표준 인프라'로.",
    factStatus: "press",
    sourceIds: ["src-lowenstein-altdata-2024"],
  },
  {
    id: "recent-sma",
    kind: "process",
    title: "SMA(별도관리계좌) 확산",
    refId: "sma",
    evidence:
      "SMA 비중 2010년 3.4% → 2024년 7.1%(약 3,150억 달러), 2024년 신규 요청 약 50% 급증 — 통제력·투명성을 원하는 기관 수요.",
    factStatus: "press",
    sourceIds: ["src-dechert-sma-2025"],
  },
];
