import type { Manager } from "../types";

/**
 * 운용사 데이터. 사실관계는 2026-09-22 원문 확인 결과를 기준으로 하며,
 * 확인하지 못한 값은 null 또는 dataCaveats 에 그 사실을 기록한다.
 */
export const managers: Manager[] = [
  {
    id: "citadel",
    nameEn: "Citadel",
    nameKo: "시타델",
    founded: 1990,
    hq: "마이애미(2022년 시카고에서 이전)",
    founder: "Kenneth C. Griffin",
    leadership: "창업자 Ken Griffin 이 CEO 겸 Co-CIO (언론 보도 기준)",
    leadershipAsOf: "2026-09",
    aum: "약 650억~770억 달러 (집계 기준에 따라 상이, 언론 보도)",
    aumAsOf: "2026년 상반기",
    intro:
      "1990년 설립된 멀티전략 헤지펀드의 대표 주자. 주식·채권/매크로·원자재·크레딧·퀀트의 5개 코어 전략을 중앙화된 리스크 관리 아래 운용하는 구조로 알려져 있으며, 2022년에는 연간 고객 순이익 160억 달러로 당시 업계 기록을 세웠다.",
    philosophy:
      "여러 전략에 걸친 분산과 최고 인재 확보, 그리고 강한 중앙 리스크 관리를 통해 시장 환경과 무관하게 수익을 추구하는 것으로 평가된다.",
    strategies: [
      { strategyId: "multi-strategy", role: "flagship", note: "Wellington 등" },
      { strategyId: "equity-market-neutral", role: "partial" },
      { strategyId: "relative-value", role: "partial" },
      { strategyId: "vol-arb", role: "partial" },
      { strategyId: "dispersion", role: "partial", note: "보도 기준" },
    ],
    modelIds: ["multi-manager", "quantamental"],
    processNotes: [
      {
        text: "5개 코어 전략에 걸친 멀티전략 구조와 중앙화된 리스크 관리가 회사의 핵심 구조로 알려져 있다 (공식 사이트는 확인 시도 시 접근 제한 — 언론 보도 기준).",
        status: "press",
        sourceId: "src-citadel-site",
      },
      {
        text: "2022년 Wellington +38.1%, 고객 순이익 160억 달러로 역대 최대 연간 이익 기록 (보도).",
        status: "press",
        sourceId: "src-forbes-citadel-2022",
      },
    ],
    referencePoints: [
      "전략 간 자본을 기민하게 재배분하는 중앙 배분 체계",
      "독립적이고 강한 권한을 가진 리스크 조직",
      "인재 밀도에 대한 집요한 투자",
    ],
    insurerAdjustments: [
      "높은 레버리지와 패스스루 수수료 구조는 보험사 계정에 그대로 적용할 수 없다 — 참고는 '배분·리스크 프로세스'에 한정",
      "단기 손실 한도 규율을 비유동성 자산에 일괄 적용하지 않도록 주의",
    ],
    dataCaveats: [
      "Citadel(헤지펀드)과 Citadel Securities(마켓메이커)는 같은 창업자의 별도 회사다 — 혼동 금지",
      "공식 사이트가 접근 제한(HTTP 403)이라 전략 설명·AUM 은 언론 보도 기준",
      "AUM 은 성과보수 인식 여부 등 집계 기준에 따라 편차가 크다",
    ],
    sourceIds: ["src-citadel-site", "src-wiki-citadel", "src-forbes-citadel-2022", "src-reuters-factbox-2025"],
    dataStatus: "limited",
  },
  {
    id: "millennium",
    nameEn: "Millennium Management",
    nameKo: "밀레니엄",
    founded: 1989,
    hq: "뉴욕",
    founder: "Israel A. Englander",
    leadership: "창업자 Israel Englander 가 Chairman & CEO (언론 보도 기준)",
    leadershipAsOf: "2026-09",
    aum: "약 920억 달러 (제3자 집계)",
    aumAsOf: "2026-07",
    intro:
      "1989년 설립된 대표적 멀티매니저 플랫폼. 공식 자료 기준으로 Fundamental Equity, Equity Arbitrage, Fixed Income, Commodities, Quantitative Strategies, Credit 6개 전략을 다수의 독립 운용팀이 수행하며, 중앙화된 리스크 관리가 이를 묶는다.",
    philosophy:
      "스타 매니저 한 명의 판단이 아니라, 수많은 독립 팀에 자본을 배분하고 엄격한 위험 규율로 관리하는 '플랫폼' 자체가 경쟁력이라는 접근이다.",
    strategies: [
      { strategyId: "multi-strategy", role: "flagship" },
      { strategyId: "equity-long-short", role: "partial", note: "다수의 주식 팀" },
      { strategyId: "equity-market-neutral", role: "partial" },
      { strategyId: "stat-arb", role: "partial" },
      { strategyId: "relative-value", role: "partial" },
      { strategyId: "vol-arb", role: "partial" },
      { strategyId: "merger-arb", role: "partial" },
      { strategyId: "global-macro", role: "partial" },
    ],
    modelIds: ["multi-manager"],
    processNotes: [
      {
        text: "공식 사이트에서 6개 전략과 '다수의 자율적 운용팀 + 중앙화된 리스크 관리' 구조를 확인.",
        status: "official",
        sourceId: "src-mlp-site",
      },
      {
        text: "각 운용팀에 명확한 손실 한도를 부여하고 한도 접근 시 자본을 회수하는 규율은 업계에 널리 알려져 있다 (보도·업계 통설).",
        status: "press",
      },
    ],
    referencePoints: [
      "팀 단위 손실 한도와 자동 자본 회수 규율",
      "운용(판단)과 리스크(감시)의 organizational 분리",
      "플랫폼 인프라(데이터·집행·컴플라이언스)의 공유",
    ],
    insurerAdjustments: [
      "단기 손절 규율은 유동성 높은 전략에 최적화된 것 — 보험사 장기·비유동 자산에는 사업 지표 기반 규칙으로 변형 필요",
      "위탁운용사 관리에 '한도 부여-감시-회수' 프레임을 적용하는 방식이 현실적",
    ],
    dataCaveats: [
      "AUM 약 920억 달러(표준 기준)와 약 2,380억 달러(옵션 명목가치 포함)는 다른 기준이다",
      "2025년 +10.5%는 회사 대표 수익률로 보도된 것 — 특정 비히클(Millennium International 등)·클래스는 원문에서 특정되지 않음",
    ],
    sourceIds: ["src-mlp-site", "src-wiki-millennium", "src-reuters-factbox-2025"],
    dataStatus: "sufficient",
  },
  {
    id: "deshaw",
    nameEn: "D. E. Shaw",
    nameKo: "디이쇼",
    founded: 1988,
    hq: "뉴욕",
    founder: "David E. Shaw",
    leadership: "집행위원회(Executive Committee) 집단 경영 체제 — 창업자는 일상 경영에서 물러남 (공식 사이트 기준)",
    leadershipAsOf: "2026-09",
    aum: "투자·약정 자본 1,000억 달러 이상 (공식, 일반적 AUM 보다 넓은 기준)",
    aumAsOf: "2026-06-01",
    intro:
      "1988년 설립된 계량 투자의 선구자. 공식 자료 기준으로 35년 이상 축적한 계량·컴퓨팅 기법의 시스템 전략과, 규율 있는 프로세스 기반의 재량 전략을 결합해 운용한다. 개발자·엔지니어만 750명 이상을 보유한 기술 중심 조직이다.",
    philosophy:
      "통계적으로 견고한 시장 비효율을 찾는 시스템 접근과 재량적 펀더멘털 리서치를 한 회사 안에서 결합하는 '하이브리드'가 특징이다.",
    strategies: [
      { strategyId: "multi-strategy", role: "flagship", note: "Composite 등" },
      { strategyId: "stat-arb", role: "partial" },
      { strategyId: "equity-market-neutral", role: "partial" },
      { strategyId: "relative-value", role: "partial" },
      { strategyId: "vol-arb", role: "partial" },
      { strategyId: "global-macro", role: "partial", note: "Oculus (매크로 중심, 보도 기준)" },
      { strategyId: "event-driven", role: "partial" },
    ],
    modelIds: ["quantamental", "systematic", "machine-learning"],
    processNotes: [
      {
        text: "공식 사이트에서 '시스템 전략 + 재량 전략의 결합', 대규모 엔지니어링 조직, 자체 기술 플랫폼 구축을 확인.",
        status: "official",
        sourceId: "src-deshaw-site",
      },
    ],
    referencePoints: [
      "계량 리서치의 검증 규율(과최적화·미래정보 차단)을 재량 판단에도 이식",
      "리서치·데이터 인프라를 회사 공용 자산으로 구축",
    ],
    insurerAdjustments: [
      "기술 인력 밀도가 전제인 모델 — 보험사는 '데이터 검증 규율'과 '리서치 축적 체계'부터 단계적으로 참고",
    ],
    dataCaveats: [
      "'투자·약정 자본 1,000억 달러+'는 표준 AUM 과 다른(더 넓은) 기준이다",
      "Composite(멀티전략)·Oculus(매크로) 등 개별 펀드 성과를 회사 전체 성과로 표시하지 않는다",
      "Composite 의 설정 이후 연환산 수익률(~12.9% 순, 2001~)은 검색 결과 수준 — 원문 미확인으로 '검증 대기'",
    ],
    sourceIds: ["src-deshaw-site", "src-reuters-factbox-2025"],
    dataStatus: "sufficient",
  },
  {
    id: "bridgewater",
    nameEn: "Bridgewater Associates",
    nameKo: "브리지워터",
    founded: 1975,
    hq: "웨스트포트(코네티컷)",
    founder: "Ray Dalio",
    leadership: "CEO Nir Bar Dea, Co-CIO Greg Jensen·Bob Prince·Karen Karniol-Tambour (공식 사이트 확인). 창업자 Ray Dalio 는 2022년 경영권 이양",
    leadershipAsOf: "2026-09",
    aum: "약 1,020억 달러 (언론 보도, 근사치)",
    aumAsOf: "2026",
    intro:
      "1975년 설립된 세계 최대급 매크로 운용사. 시장과 경제가 작동하는 인과관계를 체계화해 시스템으로 만드는 접근과, 'radical truth & transparency'로 알려진 조직 문화를 공식적으로 표방한다. 2023년 AI 전담 조직 AIA Labs 를 세우고 2024년 머신러닝 주도 펀드를 출시했다.",
    philosophy:
      "'경제라는 기계'의 인과관계를 이해하고 원칙으로 기록해 검증·개선한다는 접근. 사람의 판단을 시스템에 축적하는 것이 핵심이다.",
    strategies: [
      { strategyId: "global-macro", role: "flagship", note: "Pure Alpha" },
      { strategyId: "systematic-macro", role: "flagship" },
    ],
    modelIds: ["systematic", "expert-judgment-data", "machine-learning", "agentic-research"],
    processNotes: [
      {
        text: "공식 사이트에서 '인과관계 이해의 체계화 + 인간 판단과 기계 지능의 통합 + radical transparency' 접근을 확인.",
        status: "official",
        sourceId: "src-bw-site",
      },
      {
        text: "AIA Labs 를 'AI·머신러닝으로 시장 수익을 창출하는 전담 조직'으로 공식 소개. 2024년 7월 약 20억 달러 규모 머신러닝 주도 펀드 출시(보도).",
        status: "official",
        sourceId: "src-bw-ai",
      },
    ],
    referencePoints: [
      "투자 판단의 논리를 문서·시스템으로 남겨 조직 자산화하는 체계",
      "의견을 직급이 아닌 논리·신뢰도로 가중하는 의사결정 문화",
      "전문가 판단을 데이터화해 AI 로 확장하는 최신 실험",
    ],
    insurerAdjustments: [
      "Pure Alpha(액티브 매크로)와 All Weather(자산배분형)는 목적이 전혀 다른 상품 — 참고 대상도 구분해야 함",
      "radical transparency 문화의 직수입보다는 '판단 기록·복기의 제도화'라는 본질만 참고",
    ],
    dataCaveats: [
      "Pure Alpha 와 All Weather 를 구분한다. 2025년 +34%는 Pure Alpha II 기준 보도이며 변동성 클래스(18% vol 여부)는 원문에서 명시되지 않음",
      "Ray Dalio 를 현재 CEO·CIO 로 표기하지 않는다",
    ],
    sourceIds: ["src-bw-site", "src-bw-ai", "src-hedgeweek-bw-fund", "src-fortune-2025"],
    dataStatus: "sufficient",
  },
  {
    id: "aqr",
    nameEn: "AQR Capital Management",
    nameKo: "AQR",
    founded: 1998,
    hq: "그리니치(코네티컷)",
    founder: "Cliff Asness 외 공동창업",
    leadership: "Cliff Asness 가 Managing & Founding Principal·CIO 역할 (공식 사이트·보도 종합, 정확한 현재 직함은 재확인 필요)",
    leadershipAsOf: "2026-09",
    aum: "전사 약 1,890억 달러, 대체(헤지펀드) 부문 약 1,091억 달러 (업계 집계)",
    aumAsOf: "2026",
    intro:
      "1998년 설립된 학술 기반 퀀트 운용사. '경제 이론에 기반한 체계적 투자'를 공식 표방하며, 팩터 연구를 공개 리서치로 발표하는 개방적 접근으로 유명하다. 멀티전략 Apex, 롱숏 Delphi, 대체시장 추세추종 Helix 등이 2025년 성과로 주목받았다.",
    philosophy:
      "수익의 원천을 경제 이론과 데이터로 설명할 수 있어야 한다는 원칙. 검증 가능한 팩터를 낮은 비용으로 규율 있게 실행한다.",
    strategies: [
      { strategyId: "arp", role: "partial", note: "스타일 프리미아 연구·운용의 대표 주자" },
      { strategyId: "equity-long-short", role: "partial", note: "Delphi" },
      { strategyId: "equity-market-neutral", role: "partial", note: "Adaptive 등" },
      { strategyId: "trend-following", role: "partial", note: "매니지드 퓨처스" },
      { strategyId: "alt-trend", role: "partial", note: "Helix" },
      { strategyId: "multi-strategy", role: "partial", note: "Apex" },
      { strategyId: "systematic-macro", role: "partial" },
    ],
    modelIds: ["systematic", "machine-learning"],
    processNotes: [
      {
        text: "공식 사이트에서 'Systematic Investing Grounded in Economic Theory' 접근을 확인.",
        status: "official",
        sourceId: "src-aqr-site",
      },
      {
        text: "성과의 원천을 팩터로 분해해 설명하는 공개 리서치를 지속 발표 — 성과귀속·기대 관리의 모범 사례로 평가된다.",
        status: "general",
      },
    ],
    referencePoints: [
      "수익 원천의 팩터 분해와 투명한 설명",
      "백테스트 규율(과최적화 경계)에 대한 공개적 논의",
      "장기 부진 구간에서의 커뮤니케이션과 원칙 유지",
    ],
    insurerAdjustments: [
      "팩터 성과의 장기 사이클(수년 부진 가능)을 견딜 평가·보고 체계가 전제",
      "위탁운용사 평가에 '팩터로 설명되는 수익 vs 진짜 알파' 구분 프레임 적용",
    ],
    dataCaveats: [
      "전사 AUM(1,890억 달러)에는 롱온리 등 전통 전략이 포함 — 헤지펀드 부문과 구분",
      "개별 펀드 규모·성과는 언론·업계 집계 기준",
    ],
    sourceIds: ["src-aqr-site", "src-afi-aqr", "src-reuters-factbox-2025", "src-fortune-2025"],
    dataStatus: "sufficient",
  },
  {
    id: "man",
    nameEn: "Man Group / Man AHL",
    nameKo: "맨그룹 / 맨 AHL",
    founded: 1783,
    hq: "런던",
    founder: "1783년 설탕 중개업으로 출발 (현대적 운용사로는 20세기 후반 전환)",
    leadership: "CEO Robyn Grew (공식 사이트 확인)",
    leadershipAsOf: "2026-09",
    aum: "2,536억 달러 (공식)",
    aumAsOf: "2026-06-30",
    intro:
      "런던 상장(LSE) 세계 최대급 대체투자 운용사. 시스템/퀀트 엔진인 Man AHL·Man Numeric, 재량 운용, 기관 솔루션 등 복수의 운용 엔진을 보유한다. AHL 은 추세추종·시스템 운용의 대표 프로그램으로, 2014년부터 머신러닝 전략을 실운용해 왔다.",
    philosophy:
      "운용 기술(technology)을 성과의 핵심 원천으로 보는 접근. 계량 엔진과 재량 엔진을 그룹 차원에서 결합하고, AI 를 업무 전반에 통합하는 실험에 적극적이다.",
    strategies: [
      { strategyId: "trend-following", role: "flagship", note: "Man AHL" },
      { strategyId: "alt-trend", role: "partial", note: "AHL Evolution" },
      { strategyId: "systematic-macro", role: "partial" },
      { strategyId: "event-driven", role: "partial", note: "Man Event Driven Alternative" },
      { strategyId: "merger-arb", role: "partial" },
      { strategyId: "arp", role: "partial" },
      { strategyId: "equity-market-neutral", role: "partial", note: "Man Numeric" },
    ],
    modelIds: ["systematic", "discretionary", "machine-learning", "agentic-research"],
    processNotes: [
      {
        text: "공식 사이트에서 그룹 구조(AHL·Numeric·재량·솔루션), AUM, 기술 인력 600명+ 를 확인.",
        status: "official",
        sourceId: "src-man-site",
      },
      {
        text: "2023년 사내 생성형 AI 포털 ManGPT 도입, 2025년 에이전트형 AI 'AlphaGPT'가 퀀트 시그널을 자율 생성해 일부 실거래 승인 (보도).",
        status: "press",
        sourceId: "src-bloomberg-alphagpt-2025",
      },
    ],
    referencePoints: [
      "시스템 전략의 집행·거래비용 관리 기술",
      "AI 를 리서치 보조에서 시그널 생성까지 단계적으로 확장하는 로드맵",
      "상장사로서의 투명한 성과 공시(연차 실적 자료에 대표 펀드 성과표 공개)",
    ],
    insurerAdjustments: [
      "그룹 전체 성과(주주 관점)와 개별 전략 성과(투자자 관점)를 구분해서 볼 것",
      "AI 도입은 '업무 효율 → 리서치 보조 → 판단 지원'의 단계적 검증 경로가 참고할 만함",
    ],
    dataCaveats: [
      "Man Group plc(상장사) 실적과 AHL Alpha 등 개별 전략 성과는 전혀 다른 수치다",
      "AHL 은 그룹 내 시스템 운용 엔진이지 별도 회사가 아니다",
      "AHL Alpha 등 펀드명은 공식 실적 자료의 성과표로 확인 (사이트 상품 페이지는 미확인)",
    ],
    sourceIds: ["src-man-site", "src-man-fy2025", "src-bloomberg-alphagpt-2025", "src-pionline-mangpt"],
    dataStatus: "sufficient",
  },
  {
    id: "point72",
    nameEn: "Point72",
    nameKo: "포인트72",
    founded: 2014,
    hq: "스탬퍼드(코네티컷)",
    founder: "Steven A. Cohen",
    leadership: "Chairman & CEO Steven A. Cohen (본인 트레이딩은 2024년 중단 보도). 임원진 상세는 미확인",
    leadershipAsOf: "2026-09",
    aum: "약 585억 달러 (공식)",
    aumAsOf: "2026-07-01",
    intro:
      "SAC Capital 의 후신으로 2014년 출범(2018년 외부 자금 재유치). 섹터 전문 애널리스트를 체계적으로 훈련시키는 아카데미와, 펀더멘털·시스템(Cubist)·매크로·사모를 아우르는 멀티전략 구조가 특징이다.",
    philosophy:
      "깊은 펀더멘털 리서치를 조직적으로 훈련·확장하는 접근. 200개 이상의 운용팀이 플랫폼 인프라 위에서 움직인다.",
    strategies: [
      { strategyId: "equity-long-short", role: "flagship", note: "펀더멘털 주식이 핵심" },
      { strategyId: "multi-strategy", role: "flagship" },
      { strategyId: "equity-market-neutral", role: "partial", note: "Cubist Systematic Strategies" },
      { strategyId: "global-macro", role: "partial" },
    ],
    modelIds: ["multi-manager", "quantamental", "alt-data"],
    processNotes: [
      {
        text: "공식 사이트에서 사업 라인(Fundamental Equities, Cubist, Global Macro, Private Investments 등)과 운용팀 200개+ 를 확인.",
        status: "official",
        sourceId: "src-point72-site",
      },
    ],
    referencePoints: [
      "애널리스트 훈련 체계(아카데미)로 리서치 품질을 표준화",
      "펀더멘털 조직과 데이터 조직의 결합",
    ],
    insurerAdjustments: [
      "리서치 인력 훈련·평가 체계는 보험사 운용 인력 육성에 참고 가능",
      "SAC 시절의 규제 이슈와 조직 개편의 역사적 맥락을 함께 볼 것",
    ],
    dataCaveats: [
      "2025년 +17.5%는 회사 대표 수익률로 보도 — 플래그십 펀드의 정확한 법적 명칭은 원문에서 특정되지 않음",
    ],
    sourceIds: ["src-point72-site", "src-reuters-factbox-2025"],
    dataStatus: "sufficient",
  },
  {
    id: "balyasny",
    nameEn: "Balyasny Asset Management",
    nameKo: "밸리어스니",
    founded: 2001,
    hq: "시카고",
    founder: "Dmitry Balyasny (공동창업)",
    leadership: "Managing Partner & CIO Dmitry Balyasny (업계 통설 — 공식 페이지에서는 미확인)",
    leadershipAsOf: "2026-09",
    aum: "380억 달러 (공식)",
    aumAsOf: "2026-08-01",
    intro:
      "2001년 설립된 멀티전략 플랫폼. 공식 사이트에서 '모든 시장 환경에서 일관되고 비상관적인 수익'을 목표로 명시하며, 운용팀에 최신 도구·분석·AI 를 제공하는 것을 강조한다.",
    philosophy:
      "멀티전략 플랫폼 간 인재 경쟁 속에서 데이터·기술 투자와 리스크 규율로 차별화를 추구한다.",
    strategies: [
      { strategyId: "multi-strategy", role: "flagship" },
      { strategyId: "equity-long-short", role: "partial" },
      { strategyId: "global-macro", role: "partial" },
    ],
    modelIds: ["multi-manager", "alt-data", "machine-learning"],
    processNotes: [
      {
        text: "공식 사이트에서 멀티전략 구조, AUM, AI 도구 제공·연례 AI 해커톤을 확인.",
        status: "official",
        sourceId: "src-bam-site",
      },
      {
        text: "중앙 리스크 관리와 팀별 한도 운영을 병행하는 것으로 보도되어 왔다.",
        status: "press",
      },
    ],
    referencePoints: ["플랫폼형 리스크 관리와 데이터 인프라 투자", "AI 를 운용팀 지원 도구로 배치하는 접근"],
    insurerAdjustments: ["멀티전략 위탁 시 수수료(패스스루)·유동성 조건 실사가 필수"],
    dataCaveats: [
      "2025년 +16.7%는 회사 대표 수익률 보도 기준 — Atlas Enhanced 등 특정 펀드에 귀속시키지 않는다",
      "본사·창업 연도는 업계 통설 수준(공식 페이지 미기재)",
    ],
    sourceIds: ["src-bam-site", "src-reuters-factbox-2025"],
    dataStatus: "sufficient",
  },
  {
    id: "pershing-square",
    nameEn: "Pershing Square",
    nameKo: "퍼싱스퀘어",
    founded: 2004,
    hq: "뉴욕",
    founder: "William A. Ackman",
    leadership: "Bill Ackman 이 운용사(PSCM)의 CEO·PM (업계 통설 — 공식 페이지에서는 미확인)",
    leadershipAsOf: "2026-09",
    aum: "PSH 운용자산 약 192억 달러 (2025-12-31 공식 보고 기준)",
    aumAsOf: "2025-12-31",
    intro:
      "소수 대형주에 대한 집중 투자와 주주관여로 유명한 운용사. 상장 폐쇄형 펀드 Pershing Square Holdings(LSE: PSH)를 통해 성과가 월 단위로 공시되는, 성과 투명성이 높은 사례다.",
    philosophy:
      "지배적 시장 지위와 예측 가능한 현금흐름을 가진 소수 기업을 심층 분석해 크게 투자하고, 필요하면 이사회·경영진에 관여해 가치를 높인다.",
    strategies: [
      { strategyId: "activist", role: "flagship" },
      { strategyId: "event-driven", role: "partial" },
    ],
    modelIds: ["discretionary"],
    processNotes: [
      {
        text: "PSH 공식 자료에서 '소수 대형주에 대한 상당한(통상 비지배) 지분 집중' 전략과 장기 내재가치 성장 목표를 확인.",
        status: "official",
        sourceId: "src-psh-site",
      },
      {
        text: "연도별 NAV 수익률이 공식 공시된다 — 2021 +26.9%, 2022 -8.8%, 2023 +26.7%, 2024 +10.2%, 2025 +20.9% (net).",
        status: "official",
        sourceId: "src-psh-nav",
      },
    ],
    referencePoints: [
      "소수 안건 심층 분석·집중 투자 심의 구조",
      "월 단위 NAV 공시라는 성과 투명성",
      "장기 보유를 가능하게 하는 영구자본(상장 폐쇄형) 구조",
    ],
    insurerAdjustments: [
      "집중 포트폴리오의 변동성(2022년 -8.8% 등)을 감내할 계정 특성인지 검토 필요",
      "NAV 수익률과 주가 수익률의 괴리(할인율)를 반드시 구분",
    ],
    dataCaveats: [
      "PSH(상장 펀드)와 Pershing Square Capital Management(운용사)는 별개 실체다",
      "NAV 수익률과 상장주식(주가) 수익률을 혼동하지 않는다 — 본 서비스 수치는 NAV 기준",
      "2026년 YTD 는 -9.1%(2026-09-15 기준)로 2025년과 방향이 다름 — 단년 성과 해석 주의",
    ],
    sourceIds: ["src-psh-site", "src-psh-nav", "src-psh-dec2025"],
    dataStatus: "sufficient",
  },
  {
    id: "tci",
    nameEn: "TCI Fund Management",
    nameKo: "TCI",
    founded: 2003,
    hq: "런던",
    founder: "Sir Christopher Hohn",
    leadership: "창업자 Chris Hohn 이 PM (공식 사이트에서 창업자 확인)",
    leadershipAsOf: "2026-09",
    aum: "약 770억 달러 (제3자 집계 — 공식 사이트는 AUM 미공개)",
    aumAsOf: "2026",
    intro:
      "2003년 설립된 집중 가치투자·주주관여 운용사. 공식 자료 기준으로 '예측 가능한 현금흐름을 가진 고품질 기업'에 사모펀드식 심층 리서치로 집중 투자하며, 필요시 적극적 주주관여를 병행한다.",
    philosophy:
      "높은 진입장벽과 현금창출력을 가진 소수 기업을 매우 오래 보유하는 것. 집중이 알파의 원천이라는 접근을 공식적으로 밝힌다.",
    strategies: [{ strategyId: "activist", role: "flagship" }],
    modelIds: ["discretionary"],
    processNotes: [
      {
        text: "공식 사이트에서 집중·장기·주주관여 접근과 TCI Master Fund, 부동산 대출 펀드 운영을 확인.",
        status: "official",
        sourceId: "src-tci-site",
      },
      {
        text: "2025년 마스터펀드 약 +27.8% 보도(2차 인용 기반 — 소수점 신뢰도 낮음). 같은 해 투자자 순이익 189억 달러로 업계 연간 기록 경신 보도.",
        status: "press",
        sourceId: "src-disruption-tci",
      },
    ],
    referencePoints: [
      "'품질 기업 + 초장기 보유'라는 단순하지만 규율 있는 전략 정의",
      "집중 투자를 가능하게 하는 심층 실사 프로세스",
    ],
    insurerAdjustments: [
      "소수 종목 집중은 보험사 규제·리스크 한도와 충돌 가능 — 종목 수·비중 조정 필요",
      "AUM·성과가 공식 공개되지 않아 위탁 실사 시 정보 접근 조건 협상이 중요",
    ],
    dataCaveats: [
      "AUM 은 제3자 집계이며 공식 확인 아님",
      "2025년 수익률은 '약 +27%' 수준으로 해석 권장(원문 소수점 신뢰도 낮음)",
    ],
    sourceIds: ["src-tci-site", "src-wiki-tci", "src-disruption-tci"],
    dataStatus: "sufficient",
  },
  {
    id: "third-point",
    nameEn: "Third Point",
    nameKo: "서드포인트",
    founded: 1995,
    hq: "뉴욕",
    founder: "Daniel S. Loeb",
    leadership: "CEO·CIO Daniel S. Loeb (공식 사이트 확인)",
    leadershipAsOf: "2026-09",
    aum: "약 200억 달러 이상 (2025년 Birch Grove 크레딧 인수 반영 프로포마, 언론 보도)",
    aumAsOf: "2025-07",
    intro:
      "1995년 설립된 이벤트 드리븐·행동주의 운용사. 공식 자료 기준으로 주식·회사채·구조화·사모 크레딧·CLO·벤처에 걸쳐 기회주의적으로 투자하며, 자본구조 전반을 넘나드는 유연성이 특징이다.",
    philosophy:
      "기업 이벤트와 촉매를 중심으로 투자 논리를 구성하고, 상황에 따라 주식·크레딧을 오가며 기회를 잡는 접근이다.",
    strategies: [
      { strategyId: "event-driven", role: "flagship" },
      { strategyId: "activist", role: "partial" },
      { strategyId: "equity-long-short", role: "partial" },
    ],
    modelIds: ["discretionary"],
    processNotes: [
      {
        text: "공식 사이트에서 기회주의적 멀티에셋 접근(주식·크레딧·구조화·벤처)을 확인.",
        status: "official",
        sourceId: "src-thirdpoint-site",
      },
    ],
    referencePoints: [
      "이벤트·촉매 중심의 투자 가설 구성",
      "주식과 크레딧을 함께 보는 자본구조 통합 분석",
    ],
    insurerAdjustments: [
      "자본구조 통합 분석은 보험사 주식·채권 심사 조직의 협업 모델로 참고 가능",
    ],
    dataCaveats: [
      "2025년 연간 수익률은 이번 조사에서 검증된 수치가 없다 — 성과표에 미표시",
      "상장 피더(Third Point Investors Ltd)와 사모 펀드는 별개 — 전략 변경 이력이 있어 별도 확인 필요",
      "AUM 은 Birch Grove 인수(2025-03) 반영 여부에 따라 편차",
    ],
    sourceIds: ["src-thirdpoint-site", "src-wiki-thirdpoint"],
    dataStatus: "limited",
  },
  {
    id: "rentec",
    nameEn: "Renaissance Technologies",
    nameKo: "르네상스 테크놀로지",
    founded: 1982,
    hq: "이스트 서토킷(뉴욕주)",
    founder: "Jim Simons (2010년 CEO 퇴임, 2024년 5월 별세)",
    leadership: "CEO Peter Brown (2017년 이후 단독, 제3자 집계 기준)",
    leadershipAsOf: "2026-09",
    aum: "전사 800억 달러 이상 보도 (Medallion 은 내부 자본 전용 약 100억~150억 달러)",
    aumAsOf: "2026",
    intro:
      "수학자·과학자 중심의 계량 운용사. 공식 소개는 '수학적·통계적 방법을 투자 프로그램의 설계·실행에 활용한다'는 한 줄뿐이며, 전략은 극도로 비공개다. 내부 자본 전용 Medallion 펀드의 장기 성과는 업계에서 가장 유명한 기록으로 꼽힌다.",
    philosophy:
      "언어학·물리학·통계학 출신 연구자들이 가격 데이터의 미세한 패턴을 찾아 고회전으로 수익화하는 접근으로 알려져 있다(서적·보도 기준 — 회사는 확인하지 않음).",
    strategies: [{ strategyId: "stat-arb", role: "flagship", note: "Medallion (서적·보도 기준)" }],
    modelIds: ["systematic", "machine-learning"],
    processNotes: [
      {
        text: "공식 사이트는 계량적 접근 한 줄만 공개 — 내부 프로세스는 비공개.",
        status: "official",
        sourceId: "src-rentec-site",
      },
      {
        text: "Zuckerman 저서 기준 Medallion 1988~2018 연복리 약 63.3%(수수료 차감 전). 거래비용·시장충격 관리가 핵심이었다고 서술된다.",
        status: "press",
        sourceId: "src-cornell-medallion",
      },
    ],
    referencePoints: [
      "데이터 품질과 검증 규율에 대한 극단적 집착 (서적 기준)",
      "수용력을 지키기 위해 펀드 규모를 제한한 규율 (Medallion 외부 자금 반환)",
    ],
    insurerAdjustments: [
      "Medallion 의 성과는 외부 투자자가 접근할 수 없다 — 벤치마크가 아니라 '수용력 관리'의 교훈으로만 참고",
    ],
    dataCaveats: [
      "Medallion(내부 전용)과 RIEF 등 외부 투자자 대상 펀드는 전략·성과가 전혀 다르다",
      "장기 성과 수치는 서적(Zuckerman) 기반 추정 — 회사가 공식 확인한 적 없음",
      "창업자 Jim Simons 를 현재 경영진으로 표기하지 않는다",
    ],
    sourceIds: ["src-rentec-site", "src-wiki-rentec", "src-cornell-medallion", "src-zuckerman-book"],
    dataStatus: "limited",
  },
  {
    id: "two-sigma",
    nameEn: "Two Sigma",
    nameKo: "투시그마",
    founded: 2001,
    hq: "뉴욕",
    founder: "John Overdeck, David Siegel",
    leadership:
      "리더십 변동 중 — 2024-09 공동창업자가 물러나며 Carter Lyons·Scott Hoffman Co-CEO 취임, 2026-03 Hoffman 사임(보도). 이후 체제는 재확인 필요",
    leadershipAsOf: "2026-09",
    aum: "800억 달러 이상 (공식, 기준일 미표기)",
    aumAsOf: "2026-09 확인",
    intro:
      "2001년 설립된 데이터 과학 중심 퀀트 운용사. 공식 자료 기준으로 AI 가 내장된 기술 플랫폼, 약 640페타바이트의 데이터 자산, 생성형 AI 를 활용한 리서치를 3대 역량으로 내세운다.",
    philosophy:
      "'엄밀한 과학적 탐구로 남들이 찾지 못하는 가치를 발견한다'는 접근. 투자를 데이터·컴퓨팅 문제로 정의한다.",
    strategies: [
      { strategyId: "stat-arb", role: "partial" },
      { strategyId: "equity-market-neutral", role: "partial" },
      { strategyId: "multi-strategy", role: "partial" },
      { strategyId: "systematic-macro", role: "partial" },
    ],
    modelIds: ["systematic", "machine-learning", "alt-data"],
    processNotes: [
      {
        text: "공식 사이트에서 데이터 규모(약 640PB), AI 내장 플랫폼, 'AI 를 투자에 적용한 25년' 강조를 확인.",
        status: "official",
        sourceId: "src-twosigma-site",
      },
    ],
    referencePoints: [
      "데이터 자산을 회사의 해자(moat)로 정의하고 축적하는 전략",
      "리서치·기술 조직의 통합 운영",
    ],
    insurerAdjustments: [
      "창업자 간 지배구조 분쟁으로 리더십이 자주 바뀜 — 위탁 실사 시 거버넌스 리스크 점검 필수",
    ],
    dataCaveats: [
      "리더십 정보는 빠르게 낡는다 — 인용 전 재확인 필요",
      "Spectrum·Absolute Return 등 개별 펀드명은 이번 확인에서 공식 자료로 검증되지 않아 성과표에 미표시",
      "2025년 1월 SEC 와 9,000만 달러 제재 합의 보도(모델 취약점 관련) — 세부는 재확인 필요",
    ],
    sourceIds: ["src-twosigma-site", "src-businesswire-twosigma-2024", "src-bloomberg-twosigma-2026"],
    dataStatus: "limited",
  },
  {
    id: "elliott",
    nameEn: "Elliott Investment Management",
    nameKo: "엘리엇",
    founded: 1977,
    hq: "웨스트팜비치(플로리다, 뉴욕에서 이전)",
    founder: "Paul Singer",
    leadership: "Paul Singer(창업자·President·Co-CEO·Co-CIO), Jonathan Pollock(Co-CEO·Co-CIO) — 공식 사이트 확인",
    leadershipAsOf: "2026-09",
    aum: "약 800억 달러 (제3자 집계)",
    aumAsOf: "2026",
    intro:
      "1977년 130만 달러로 출발한 멀티전략·행동주의 운용사. 행동주의 주식, 부실채권·크레딧, 차익거래, 부동산, 사모까지 폭넓게 다루며, 세계 최대급 행동주의 투자자로 평가된다.",
    philosophy:
      "손실 회피를 최우선으로 하는 기회주의적 접근으로 알려져 있으며, 복잡한 상황(부실·분쟁·구조조정)에서 가치를 찾는 데 강점을 가진 것으로 평가된다.",
    strategies: [
      { strategyId: "activist", role: "flagship" },
      { strategyId: "event-driven", role: "partial", note: "부실채권·구조조정 등" },
      { strategyId: "multi-strategy", role: "partial" },
    ],
    modelIds: ["discretionary"],
    processNotes: [
      {
        text: "공식 'Who We Are' 페이지에서 Singer·Pollock 공동 경영 체제와 경영위원회 구조를 확인 (전략 상세 페이지는 이번 확인 범위 밖).",
        status: "official",
        sourceId: "src-elliott-site",
      },
      {
        text: "복수의 시니어가 참여하는 집단적 리스크 검토와 상황별 유연한 대응을 강조하는 것으로 보도되어 왔다.",
        status: "press",
      },
    ],
    referencePoints: [
      "복잡한 법률·구조 분석을 투자 우위로 전환하는 역량",
      "손실 회피 중심의 리스크 문화",
    ],
    insurerAdjustments: [
      "행동주의 캠페인의 평판·법률 리스크는 보험사가 직접 감당하기 어려움 — 위탁·공동투자 형태 검토",
    ],
    dataCaveats: [
      "연간 수익률은 이번 조사에서 검증된 수치가 없다 — 성과표에 미표시",
      "Elliott Investment Management(미국)와 Elliott Advisors(영국 계열)를 혼동하지 않는다",
    ],
    sourceIds: ["src-elliott-site", "src-wiki-elliott"],
    dataStatus: "limited",
  },
];

export const managerById = (id: string) => managers.find((m) => m.id === id);
