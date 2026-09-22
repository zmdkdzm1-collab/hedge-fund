import type { ApplicationGuide } from "../types";

/**
 * 한화생명 적용 가이드.
 * 모든 내용은 '검토 가능한 적용 제안'이며, 한화생명의 실제 내부 프로세스를 확인해 기술한 것이 아니다.
 * '투자 가설 모니터' 등 제안명은 본 가이드에서만 쓰는 자체 명칭으로, 실제 헤지펀드 전략명이 아니다.
 */
export const applicationGuides: ApplicationGuide[] = [
  {
    id: "guide-hypothesis",
    title: "투자 가설·반증 조건 표준화 — '투자 가설 모니터'(제안명)",
    stages: ["research", "committee", "monitoring"],
    roles: ["strategy", "review", "pm"],
    labels: ["process-ref", "adapt"],
    references: {
      managerIds: ["bridgewater", "pershing-square", "third-point"],
      processIds: ["hypothesis", "monitoring"],
      note: "가설의 논리와 '틀렸음을 보여줄 조건'을 진입 전에 문서화하는 글로벌 운용사들의 공통 규율",
    },
    problem:
      "투자심의 안건에 '기대 수익 논리'는 있으나 '어떤 일이 벌어지면 판단이 틀린 것인지'가 없어, 손실 국면에서 대응 기준이 사후적으로 만들어진다.",
    idea:
      "심의 안건 양식에 '핵심 가정'과 '반증 조건'(계량 지표 + 정성 조건)을 필수 항목으로 추가하고, 승인 시 반증 조건이 사후관리 시스템의 모니터링 항목으로 자동 등록되게 한다.",
    dataNeeded: ["안건별 핵심 가정·반증 조건 데이터베이스", "반증 조건과 연결할 시장·사업 지표 피드", "기존 심의 문서 양식"],
    owners: { execute: "투자전략·운용 부서(안건 작성), 투자심사(양식 관리)", approve: "투자심의기구(양식 개정 승인)" },
    expectedEffect: "손실 국면 대응의 일관성 확보, 사후 복기 품질 향상, '기다려 보자'식 의사결정 지연 감소.",
    limitations:
      "비유동성 장기자산에 가격 기준 반증 조건을 걸면 왜곡된다 — 자산 특성별로 사업 지표 기반 조건을 분리 설계해야 한다. 반증 조건의 형식화(복사-붙여넣기)를 막을 품질 관리가 필요하다.",
    pilot: "특정 자산군(예: 해외 크레딧 신규 안건) 1개 분기 심의 건에만 적용해 양식·운영 부담을 점검한 뒤 확대.",
    metrics: ["반증 조건 명시 안건 비율", "조건 발동 시 대응 완료까지 소요 일수", "복기 시 반증 조건 참조율"],
  },
  {
    id: "guide-knowledge",
    title: "전사 투자정보·과거 사례 통합 검색",
    stages: ["research", "committee"],
    roles: ["strategy", "pm", "review"],
    labels: ["process-ref", "adapt"],
    references: {
      managerIds: ["deshaw", "point72", "two-sigma"],
      processIds: ["research", "knowledge"],
      note: "리서치·데이터를 회사 공용 자산으로 축적하고 검색 가능하게 만드는 플랫폼 접근",
    },
    problem:
      "자산군·부서별로 검토 자료가 흩어져 있어, 유사 안건을 다시 검토할 때 과거의 분석·의사결정·결과를 찾지 못하고 처음부터 반복한다.",
    idea:
      "투자 검토·심의·사후관리 문서를 공통 포맷·태그(기업·산업·자산군·전략)로 축적하고, 전사 검색(한글·영문)을 제공한다. 축적이 안정되면 요약·유사 사례 추천 같은 AI 지원을 단계 도입한다.",
    dataNeeded: ["문서 표준 포맷·태그 체계", "과거 심의·검토 문서 아카이브", "사내 검색 인프라(권한 체계 포함)"],
    owners: { execute: "리서치·데이터 담당 조직(구축), 각 운용 부서(등록)", approve: "투자부문 경영진(표준·권한 정책)" },
    expectedEffect: "신규 검토 리드타임 단축, 담당자 교체 시 지식 손실 방지, 부서 간 중복 리서치 감소.",
    limitations:
      "등록 의무만 부과하면 형식적 문서가 쌓인다 — 검색 활용도가 보상받는 구조(심의 시 유사 사례 인용 의무화 등)와 병행해야 한다. 민감 정보 권한 관리가 전제다.",
    pilot: "최근 2년 대체투자 심의 문서만 우선 태깅해 검색 효용을 검증.",
    metrics: ["신규 안건의 과거 사례 인용률", "유사 사례 검색 소요 시간", "부서 외 문서 조회 비율"],
  },
  {
    id: "guide-crossexposure",
    title: "자산군 횡단 기업·산업·테마 중복노출 관리",
    stages: ["allocation", "risk-alm", "monitoring"],
    roles: ["risk", "executive", "pm"],
    labels: ["process-ref", "adapt"],
    references: {
      managerIds: ["citadel", "millennium"],
      processIds: ["allocation", "monitoring"],
      note: "멀티전략 플랫폼의 중앙 리스크 관리 — 전략·팀을 가로질러 같은 위험의 총량을 본다",
    },
    problem:
      "주식·채권·대체투자가 각자 기준으로 관리되어, 같은 기업(그룹)·산업·테마에 대한 전사 총노출이 즉시 파악되지 않는다. 위기 시 손실이 한꺼번에 드러난다.",
    idea:
      "기업·그룹 식별자와 산업·테마 태그를 전 자산군에 통일 적용하고, 전사 통합 노출 대시보드(발행사·산업·테마·국가 기준)를 구축한다. 임계치 초과 시 배분·심의 단계에서 자동 표시되게 한다.",
    dataNeeded: ["전 자산 포지션 데이터(위탁 포함)", "기업·그룹 식별자 매핑 테이블", "산업·테마 분류 체계"],
    owners: { execute: "리스크·ALM 조직(구축·운영)", approve: "리스크관리위원회(임계치·대응 규칙)" },
    expectedEffect: "숨은 집중위험의 사전 발견, 신규 안건 심의 시 전사 관점 제공, 위기 시 노출 파악 시간 단축.",
    limitations:
      "위탁운용·펀드형 자산은 룩스루(look-through) 데이터 확보가 관건 — 계약 단계에서 데이터 제공 조건을 넣어야 한다. K-ICS 등 규제 지표와의 정합성은 별도 검증이 필요하다.",
    pilot: "상위 20개 그룹사 익스포저만 우선 통합 집계해 수작업 대비 효용 검증.",
    metrics: ["통합 노출 리포트 생성 주기", "임계치 초과 발견→보고 소요 시간", "심의 안건 중 전사 노출 정보 첨부율"],
  },
  {
    id: "guide-review-link",
    title: "투자심의와 사후 결과의 연결 — 결정 단위 복기",
    stages: ["committee", "evaluation"],
    roles: ["review", "executive", "strategy"],
    labels: ["process-ref"],
    references: {
      managerIds: ["bridgewater", "aqr"],
      processIds: ["decision", "evaluation"],
      note: "결정 근거를 기록하고, 결과가 아니라 과정의 품질을 평가하는 복기 문화",
    },
    problem:
      "심의 기록과 사후 성과가 연결되어 있지 않아, 어떤 판단 패턴이 반복적으로 맞고 틀리는지 조직 차원에서 배우지 못한다. 결과가 좋으면 과정을 묻지 않는다.",
    idea:
      "심의 안건 ID와 사후 성과·이벤트를 연결하는 데이터 구조를 만들고, 종결(또는 연 1회) 시점에 '당시 가정 vs 실제'를 대조하는 표준 복기 리포트를 작성한다. 부결·보류 안건도 추적해 기회비용을 본다.",
    dataNeeded: ["심의 안건 데이터베이스(가정·반대 의견 포함)", "안건-자산 매핑", "성과·이벤트 이력"],
    owners: { execute: "투자심사(복기 주관), 운용 부서(작성)", approve: "투자심의기구(복기 결과 심의)" },
    expectedEffect: "의사결정 품질의 체계적 개선, 반복 실수 패턴 식별, 운과 실력의 구분.",
    limitations:
      "복기가 책임 추궁이 되면 기록이 방어적으로 변한다 — '과정 평가'와 '인사 평가'의 분리 원칙이 필요하다. 장기 자산은 중간 복기 시점 설계가 필요하다.",
    pilot: "작년 종결된 대체투자 10건으로 표준 복기 리포트 형식을 시험.",
    metrics: ["종결 건 복기 완료율", "복기에서 도출된 개선 과제의 반영 건수", "부결 안건 추적 비율"],
  },
  {
    id: "guide-alm-integrated",
    title: "자본·유동성·부채를 함께 보는 배분 의사결정",
    stages: ["allocation", "risk-alm"],
    roles: ["executive", "risk", "strategy"],
    labels: ["adapt", "suitability"],
    references: {
      managerIds: ["citadel", "millennium", "bridgewater"],
      processIds: ["allocation"],
      note: "위험을 '예산'으로 배분하고 소진을 관리하는 리스크 버짓 프레임 — 단, 보험사는 부채·자본 제약이 추가된다",
    },
    problem:
      "자산 배분 논의가 기대수익 중심으로 흐르면, 요구자본 소모·유동성·부채 듀레이션 대응이 사후 제약으로만 등장해 의사결정이 반복 수정된다.",
    idea:
      "배분 안건에 '위험 예산 사용량 + 요구자본 영향 + 유동성 소요 + 부채 대응 효과'를 표준 첨부로 요구하고, 같은 위험 예산으로 대안 배분과 비교하는 형식을 도입한다. 일반계정·특별계정은 목적이 다르므로 별도 예산 체계로 운영한다.",
    dataNeeded: ["전략·자산군별 위험 측정 체계", "요구자본 산출 데이터(정확한 계수는 관련 부서 검증)", "유동성 프로파일", "부채 현금흐름"],
    owners: { execute: "투자전략(안건), 리스크·ALM(독립 산출)", approve: "자산배분 관련 의사결정기구" },
    expectedEffect: "배분 논의의 왕복 감소, 자본 효율 관점의 일관된 비교, ALM 목적과 수익 목적의 명시적 절충.",
    limitations:
      "K-ICS 계수·규제 한도의 구체 수치는 본 가이드 범위 밖 — 관련 부서 검증 없이 인용하지 않는다. 헤지펀드식 레버리지 확대를 개선안으로 단순 제안하지 않는다.",
    pilot: "연간 SAA 수립 시 1개 자산군에 대해 '위험 예산·자본·유동성 통합 시트'를 병행 작성해 효용 검증.",
    metrics: ["배분 안건의 통합 정보 첨부율", "배분 결정 재수정 횟수", "위험 예산 사용률 보고 주기"],
  },
  {
    id: "guide-external-manager",
    title: "위탁운용사의 성과와 운용역량 분리 평가",
    stages: ["external-manager", "evaluation"],
    roles: ["review", "pm", "risk"],
    labels: ["process-ref", "adapt"],
    references: {
      managerIds: ["aqr", "millennium"],
      processIds: ["evaluation", "allocation"],
      note: "수익을 시장·팩터·실력으로 분해하는 성과귀속 + 멀티매니저의 '한도 부여-감시-회수' 프레임",
    },
    problem:
      "위탁운용사 평가가 절대 수익률 중심이면, 시장이 올려준 성과에 높은 보수를 지불하고, 시장이 꺾이면 실력 있는 운용사를 해지하는 역선택이 생긴다.",
    idea:
      "위탁 성과를 벤치마크·팩터 기여분과 초과성과로 분해해 평가하고, 계약 시 노출 한도·데이터 제공(룩스루)·보고 주기를 명시한다. 신규 배정·회수는 사전에 정한 규칙(성과+프로세스 실사)으로 운영한다.",
    dataNeeded: ["위탁 계좌별 수익률·포지션(룩스루)", "벤치마크·팩터 데이터", "운용사 프로세스 실사 기록"],
    owners: { execute: "위탁운용 담당(평가), 리스크(독립 검증)", approve: "위탁운용사 선정·해지 의사결정기구" },
    expectedEffect: "보수 대비 가치 판단의 정교화, 해지·증액 의사결정의 일관성, 운용사와의 정보 비대칭 축소.",
    limitations:
      "사모·대체 위탁은 벤치마크 설정 자체가 논점 — 자산군별로 분해 프레임을 다르게 설계해야 한다. 데이터 제공 조건은 협상력에 좌우된다.",
    pilot: "주식형 위탁 계좌부터 팩터 분해 리포트를 도입해 기존 평가와 비교.",
    metrics: ["초과성과 기준 평가 적용 계좌 비율", "룩스루 데이터 확보 계좌 비율", "해지·증액 결정의 규칙 부합률"],
  },
  {
    id: "guide-event-frame",
    title: "이벤트 안건 심사 프레임 — 성사확률·시점·실패손실",
    stages: ["research", "committee"],
    roles: ["review", "pm"],
    labels: ["process-ref", "suitability"],
    references: {
      managerIds: ["third-point", "man", "elliott"],
      processIds: ["hypothesis", "decision"],
      note: "Event-Driven 전략의 표준 사고: 성사확률 × 성공수익 − 실패확률 × 실패손실, 그리고 예상 소요 기간",
    },
    problem:
      "M&A 인수금융·브릿지론·구조화 딜처럼 '사건의 결과'에 의존하는 안건을, 일반 여신·채권과 같은 틀로 심사하면 꼬리 손실이 과소평가된다.",
    idea:
      "이벤트성 안건 전용 심사 시트를 도입한다: 성사 조건과 확률 근거 / 예상 완료 시점과 지연 시나리오 / 무산 시 손실 폭과 회수 경로 / 비대칭 보상 판단. 심의 후에는 진행 상황 추적 항목으로 자동 연결한다.",
    dataNeeded: ["딜 조건·일정 데이터", "유사 딜 성사·무산 사례", "무산 시 담보·회수 분석"],
    owners: { execute: "투자심사(시트 운영), 딜 담당 부서(작성)", approve: "투자심의기구" },
    expectedEffect: "비대칭 위험의 명시적 심사, 지연·무산 시나리오의 사전 준비, 심사 품질의 표준화.",
    limitations:
      "확률 추정의 근거 관리가 핵심 — 낙관 편향(딜 성사 압박)을 견제할 독립 검토가 필요하다. 이벤트 트레이딩 자체를 직접 수행하자는 제안이 아니다(별도 적합성 검토 필요).",
    pilot: "인수금융 신규 안건 3건에 시트를 병행 적용해 기존 심사와 결론 차이를 비교.",
    metrics: ["이벤트성 안건의 전용 시트 적용률", "무산·지연 발생 시 사전 시나리오 부합도", "심사 소요 시간 변화"],
  },
  {
    id: "guide-knowledge-asset",
    title: "투자 결과의 회사 지식화 — 원칙·체크리스트 축적",
    stages: ["evaluation", "monitoring"],
    roles: ["executive", "strategy", "review"],
    labels: ["process-ref", "adapt"],
    references: {
      managerIds: ["bridgewater", "man"],
      processIds: ["knowledge", "evaluation"],
      note: "판단 논리를 기록해 원칙으로 승격하는 접근(Bridgewater) + AI 를 업무에 단계적으로 통합하는 로드맵(Man)",
    },
    problem:
      "성공·실패의 교훈이 담당자 개인의 경험으로만 남아, 조직의 심사·운용 기준이 사람에 따라 달라지고 세대 교체 때 리셋된다.",
    idea:
      "복기에서 반복 확인된 패턴을 '심사 체크리스트'와 '운용 원칙'으로 승격하는 절차를 만들고, 개정 이력을 관리한다. 축적된 문서·판단 데이터가 안정되면 AI 검색·요약 지원을 얹는다(판단 주체가 아닌 보조로 한정).",
    dataNeeded: ["복기 리포트 아카이브", "체크리스트·원칙 문서의 버전 관리 체계", "활용도 측정 로그"],
    owners: { execute: "투자심사·리서치 총괄(승격 심사)", approve: "투자부문 경영진(원칙 개정 승인)" },
    expectedEffect: "심사 품질의 하한선 상승, 신규 인력의 학습 속도 개선, AI 도입 시 학습 재료 확보.",
    limitations:
      "원칙이 과도하게 늘면 형식주의가 된다 — 정기적인 폐기·통합 절차가 함께 필요하다. 과거 패턴에 없는 신규 상황에 대한 예외 처리 원칙도 정의해야 한다.",
    pilot: "최근 3년 복기 자료에서 반복 교훈 10개를 추출해 체크리스트 초안을 만들고 심사 실무에 시험 적용.",
    metrics: ["체크리스트 인용률", "원칙 개정·폐기 건수(신진대사)", "신규 인력 온보딩 기간"],
  },
];
