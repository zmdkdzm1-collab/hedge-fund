import type { InvestProcess } from "../types";

/**
 * 공통 투자 프로세스 8단계.
 * detail.steps 는 여러 운용사의 공개 자료·보도를 일반화한 "설명용 프로세스"이며,
 * 특정 운용사의 실제 내부 절차가 아니다. (화면에서 반드시 그렇게 표시)
 */
export const processes: InvestProcess[] = [
  {
    id: "research",
    order: 1,
    nameKo: "정보 수집·리서치",
    short: "투자 판단의 재료가 되는 데이터와 리서치를 모으고 정리한다",
    keywords: ["데이터 통합", "대체데이터", "리서치 플랫폼"],
    panel: {
      decides: "어떤 정보를, 어떤 품질 기준으로, 누구나 찾을 수 있는 형태로 모을지 결정한다.",
      whyImportant:
        "같은 정보라도 흩어져 있으면 판단에 쓰이지 못한다. 대형 운용사의 경쟁력 상당 부분은 특별한 정보가 아니라, 정보를 모으고 검증하고 재사용하는 체계에서 나온다.",
      flow: {
        input: "공시·실적·가격 데이터, 산업 자료, 대체데이터, 전문가 네트워크",
        judge: "데이터 품질 검증, 중복 제거, 태깅·연결(기업–산업–테마)",
        output: "검색 가능한 리서치 노트, 표준화된 데이터셋, 아이디어 후보",
      },
      hanwhaQuestion:
        "우리 회사의 자산군별 리서치와 과거 검토 자료는, 다른 부서 담당자가 10분 안에 찾아서 재사용할 수 있는가?",
    },
    detail: {
      definition:
        "투자 아이디어의 원재료가 되는 데이터·문서·전문가 의견을 수집하고, 검증·정리하여 조직 전체가 쓸 수 있게 만드는 단계다.",
      problem:
        "정보 자체는 넘치지만, 품질이 검증되지 않았거나 개인 PC와 이메일에 흩어져 있으면 조직의 판단에 쓰이지 못한다. 담당자가 바뀌면 지식이 사라지는 문제도 여기서 시작된다.",
      steps: [
        { actor: "데이터 조직", action: "가격·공시·거시지표·대체데이터를 수집하고 오류·결측을 점검", output: "품질 검증된 표준 데이터셋" },
        { actor: "애널리스트", action: "기업 실적, 산업 구조, 경쟁 환경을 조사하고 노트로 정리", output: "구조화된 리서치 노트" },
        { actor: "데이터 엔지니어", action: "기업–산업–테마–자산군을 연결하는 태그·식별자 부여", output: "검색·연결 가능한 리서치 데이터베이스" },
        { actor: "리서치 총괄", action: "커버리지 공백과 중복을 점검하고 우선순위 조정", output: "리서치 커버리지 계획" },
        { actor: "전체 운용 인력", action: "축적된 자료를 검색·인용하며 새 아이디어 후보 발굴", output: "투자 가설 후보 목록" },
      ],
      participants: [
        { role: "애널리스트", duty: "1차 정보 수집과 해석, 리서치 노트 작성" },
        { role: "데이터 엔지니어·데이터 사이언티스트", duty: "데이터 파이프라인 구축, 품질 관리, 대체데이터 검증" },
        { role: "리서치 총괄", duty: "커버리지 배분, 품질 기준 관리" },
        { role: "컴플라이언스", duty: "정보 취득 경로의 적법성 점검(내부자정보·전문가 네트워크 관리)" },
      ],
      inputsOutputs: {
        inputs: ["시장 가격·거래 데이터", "기업 공시·실적 자료", "산업·거시 리서치", "대체데이터(카드 결제, 위성사진, 웹 트래픽 등)", "전문가 인터뷰"],
        outputs: ["표준화된 데이터셋", "검색 가능한 리서치 노트", "아이디어 후보 목록", "데이터 품질 리포트"],
      },
      managerCases: [
        {
          managerId: "deshaw",
          text: "D. E. Shaw는 계량적·기술적 방법으로 시장 데이터를 체계적으로 분석하는 것을 회사의 핵심 접근으로 공개 설명한다.",
          status: "official",
          sourceId: "src-deshaw-site",
        },
        {
          managerId: "point72",
          text: "Point72는 섹터별 애널리스트 조직과 데이터 분석 조직을 함께 운영하며, 자체 아카데미로 애널리스트를 훈련시키는 구조를 공개하고 있다.",
          status: "official",
          sourceId: "src-point72-site",
        },
        {
          managerId: "two-sigma",
          text: "Two Sigma는 데이터 과학과 기술을 투자 프로세스의 중심에 두는 회사로 자사를 소개한다.",
          status: "official",
          sourceId: "src-twosigma-site",
        },
      ],
      strengths: [
        "같은 데이터를 여러 전략·부서가 재사용해 리서치 단가가 낮아진다",
        "판단의 근거가 기록되어 사후 복기가 가능해진다",
        "담당자 교체에도 지식이 조직에 남는다",
      ],
      failureModes: [
        "데이터 품질 검증 없이 양만 늘리면 잘못된 판단의 근거가 된다",
        "수집과 활용이 분리되어 '모으기만 하는' 데이터 창고가 된다",
        "대체데이터 취득 경로의 법적 리스크(개인정보·내부자정보)를 간과한다",
      ],
      hanwhaApplication: [
        "자산군별로 흩어진 리서치·심의 자료를 공통 포맷과 태그로 축적하는 전사 리서치 저장소 검토",
        "기업·산업·테마 식별자를 통일해 주식·채권·대체투자 검토 자료를 서로 연결",
        "위탁운용사 보고서와 내부 리서치를 같은 검색 체계에 통합",
      ],
      metrics: [
        "리서치 노트 재사용률(작성자 외 조회 비율)",
        "신규 검토 건에서 과거 유사 사례 검색에 걸리는 시간",
        "데이터 오류 발견 건수와 수정 소요 시간",
      ],
      sourceIds: ["src-deshaw-site", "src-point72-site", "src-twosigma-site"],
    },
    managerIds: ["deshaw", "two-sigma", "point72", "bridgewater"],
    relatedStrategyIds: ["stat-arb", "equity-market-neutral", "multi-strategy"],
    relatedTermIds: ["quantitative", "backtest", "crowding"],
  },
  {
    id: "hypothesis",
    order: 2,
    nameKo: "투자 가설·검증",
    short: "왜 수익이 나는지 논리를 세우고, 틀렸을 때의 조건을 미리 정한다",
    keywords: ["투자 가설", "반증 조건", "사전 검증"],
    panel: {
      decides: "이 투자가 '왜' 돈을 버는지, 어떤 일이 벌어지면 가설이 틀린 것인지 결정한다.",
      whyImportant:
        "가설과 반증 조건이 없으면 손실이 나도 '조금 더 기다려보자'가 반복된다. 좋은 운용사는 진입 전에 '무엇이 보이면 틀린 것'인지를 문서로 남긴다.",
      flow: {
        input: "리서치 노트, 밸류에이션·시나리오 분석, 과거 유사 사례",
        judge: "수익 원천 규명, 반대 논리 검토, 민감도·최악 시나리오 분석",
        output: "투자 가설서(논리·목표·반증 조건·모니터링 항목)",
      },
      hanwhaQuestion:
        "우리 투자심의 안건에는 '어떤 일이 벌어지면 이 판단이 틀린 것인지'가 명시되어 있는가?",
    },
    detail: {
      definition:
        "투자 아이디어를 '무엇이 어떻게 되면 수익이 난다'는 검증 가능한 문장으로 만들고, 반대 논리와 실패 조건까지 진입 전에 정리하는 단계다.",
      problem:
        "논리 없이 '좋아 보여서' 들어간 투자는 손실이 나도 언제 나가야 할지 알 수 없다. 가설이 문서화되지 않으면 성공해도 왜 성공했는지 배울 수 없다.",
      steps: [
        { actor: "애널리스트", action: "수익 원천과 촉매(catalyst)를 담은 투자 가설 초안 작성", output: "투자 가설서 초안" },
        { actor: "동료·시니어", action: "반대 논리 제시(레드팀), 핵심 가정 공격", output: "반론 목록과 보완 분석" },
        { actor: "애널리스트", action: "민감도 분석, 최악 시나리오에서의 손실 추정", output: "시나리오·손실 추정표" },
        { actor: "PM", action: "가설 채택 여부와 반증 조건(가설이 틀렸음을 보여줄 지표) 확정", output: "확정 가설서 + 모니터링 항목" },
      ],
      participants: [
        { role: "애널리스트", duty: "가설 작성과 근거 제시" },
        { role: "PM", duty: "가설 채택, 반증 조건 확정" },
        { role: "동료 리뷰어", duty: "반대 논리 제시" },
        { role: "리스크 조직", duty: "최악 시나리오 손실 추정의 독립 점검" },
      ],
      inputsOutputs: {
        inputs: ["리서치 노트", "재무 모델", "과거 유사 사례", "시장 컨센서스"],
        outputs: ["투자 가설서", "반증 조건 목록", "모니터링 지표 정의"],
      },
      managerCases: [
        {
          managerId: "bridgewater",
          text: "Bridgewater는 경제가 작동하는 원리에 대한 이해를 체계화하고, 이를 시스템으로 기록·검증하는 접근을 공개적으로 설명해 왔다.",
          status: "official",
          sourceId: "src-bw-site",
        },
        {
          managerId: "pershing-square",
          text: "Pershing Square는 소수 대형주에 대한 집중·장기 투자를 공식 자료에서 명시하며, 진입 전 수개월 단위의 심층 리서치로 알려져 있다.",
          status: "press",
          sourceId: "src-psh-site",
        },
        {
          managerId: "third-point",
          text: "Third Point는 기업 이벤트와 촉매를 중심으로 투자 논리를 구성하는 이벤트 드리븐 접근을 공개하고 있다.",
          status: "official",
          sourceId: "src-thirdpoint-site",
        },
      ],
      strengths: [
        "손절·증액 판단이 감정이 아닌 사전 기준으로 이뤄진다",
        "가설이 문서로 남아 성공·실패 모두 학습 자산이 된다",
        "반대 논리를 통과한 아이디어만 자본을 받는다",
      ],
      failureModes: [
        "반증 조건이 모호하면('시장 상황 악화 시') 실제로는 작동하지 않는다",
        "레드팀이 형식화되면 통과 의례가 된다",
        "장기 비유동성 투자에 단기 가격 기준 반증 조건을 걸면 오히려 왜곡된다",
      ],
      hanwhaApplication: [
        "투자심의 안건 양식에 '핵심 가정'과 '반증 조건' 필드를 표준 항목으로 추가하는 방안 검토",
        "반증 조건을 사후관리 시스템의 모니터링 지표와 연결",
        "비유동성 자산은 가격이 아닌 사업 지표(임대율·커버리지 비율 등) 기반 반증 조건 사용",
      ],
      metrics: [
        "반증 조건이 명시된 안건 비율",
        "반증 조건 발동 시 실제 대응(축소·재심의)까지 걸린 시간",
        "가설 적중률의 추적 가능 여부",
      ],
      sourceIds: ["src-bw-site", "src-thirdpoint-site"],
    },
    managerIds: ["bridgewater", "pershing-square", "third-point", "tci"],
    relatedStrategyIds: ["activist", "event-driven", "global-macro"],
    relatedTermIds: ["alpha", "drawdown", "overfitting"],
  },
  {
    id: "decision",
    order: 3,
    nameKo: "투자심의·의사결정",
    short: "누가, 어떤 기준으로, 어떤 기록을 남기며 투자를 결정하는지 정한다",
    keywords: ["투자위원회", "반대 의견", "의사결정 기록"],
    panel: {
      decides: "투자 실행 여부, 규모, 조건을 결정하고 그 근거를 기록한다.",
      whyImportant:
        "결정의 품질은 결과가 아니라 과정으로 관리해야 한다. 좋은 결정 과정은 반대 의견을 제도화하고, 나중에 복기할 수 있도록 판단 근거를 남긴다.",
      flow: {
        input: "투자 가설서, 리스크 분석, 포트폴리오 영향 분석",
        judge: "찬반 토론, 대안 비교, 승인 권한별 심의",
        output: "투자 결정(승인·조건부·부결)과 결정 근거 기록",
      },
      hanwhaQuestion:
        "우리 심의 기록만 보고, 1년 뒤 제3자가 '당시 무엇을 알았고 무엇을 걱정했는지' 재구성할 수 있는가?",
    },
    detail: {
      definition:
        "준비된 투자 가설을 놓고 실행 여부·규모·조건을 결정하는 단계다. 결정 자체만이 아니라, 반대 의견과 판단 근거를 어떻게 기록하는지가 핵심이다.",
      problem:
        "직급이 높은 사람의 확신이 근거를 이기는 회의, 결과가 좋으면 과정을 묻지 않는 문화에서는 의사결정 품질이 개선되지 않는다.",
      steps: [
        { actor: "제안 부서", action: "가설서·리스크 분석·포트폴리오 영향을 담은 안건 상정", output: "심의 안건" },
        { actor: "심의 참여자", action: "사전 검토 의견 제출(회의 전 서면)", output: "사전 질의·반대 의견" },
        { actor: "투자위원회", action: "찬반 토론, 대안(미실행·축소·조건부) 비교", output: "심의 논의 기록" },
        { actor: "의결권자", action: "승인·조건부 승인·부결 결정", output: "결정문 + 승인 조건" },
        { actor: "간사", action: "결정 근거, 반대 의견, 전제 조건을 구조화해 기록", output: "의사결정 기록(사후 복기용)" },
      ],
      participants: [
        { role: "투자위원회 위원", duty: "심의·의결" },
        { role: "제안 부서(운용·전략)", duty: "안건 상정과 소명" },
        { role: "투자심사·리스크", duty: "독립 검토 의견 제시" },
        { role: "간사 조직", duty: "논의·결정 근거 기록 관리" },
      ],
      inputsOutputs: {
        inputs: ["투자 가설서", "독립 리스크 의견", "포트폴리오 영향 분석", "과거 유사 안건 결과"],
        outputs: ["투자 결정문", "승인 조건", "반대 의견 기록", "사후 점검 항목"],
      },
      managerCases: [
        {
          managerId: "bridgewater",
          text: "Bridgewater는 '아이디어 성과주의(idea meritocracy)'를 표방하며, 직급이 아닌 논리와 신뢰도 기반으로 의견을 가중하는 의사결정 문화를 공개적으로 설명해 왔다.",
          status: "official",
          sourceId: "src-bw-site",
        },
        {
          managerId: "elliott",
          text: "Elliott은 복수의 시니어가 참여하는 집단적 리스크 검토와 상황별 유연한 대응을 강조하는 것으로 보도되어 왔다.",
          status: "press",
        },
      ],
      strengths: [
        "반대 의견이 기록되어 집단사고를 줄인다",
        "결정 근거가 남아 결과와 과정을 분리해 평가할 수 있다",
        "승인 조건이 사후관리로 자동 연결된다",
      ],
      failureModes: [
        "기록이 형식화되어 실제 논의와 따로 노는 경우",
        "심의가 거부권 행사장이 되어 속도가 죽는 경우",
        "결과가 좋았던 안건의 과정 문제를 덮는 경우",
      ],
      hanwhaApplication: [
        "심의 기록에 '반대 의견'과 '핵심 전제' 필드를 구조화하고 사후 복기 때 필수 참조하도록 연결",
        "부결·보류 안건도 추적해 '하지 않은 결정'의 기회비용을 평가",
        "승인 조건을 사후관리 시스템의 체크리스트로 자동 전환",
      ],
      metrics: [
        "결정 근거·반대 의견이 구조화되어 기록된 안건 비율",
        "승인 조건의 사후 이행 점검률",
        "심의 소요 기간(상정→결정)",
      ],
      sourceIds: ["src-bw-site"],
    },
    managerIds: ["bridgewater", "elliott", "pershing-square"],
    relatedStrategyIds: ["activist", "multi-strategy"],
    relatedTermIds: ["attribution", "risk-budget"],
  },
  {
    id: "allocation",
    order: 4,
    nameKo: "포트폴리오·위험 배분",
    short: "어디에 얼마의 자본과 위험을 배분할지, 중복 노출까지 보며 정한다",
    keywords: ["리스크 버짓", "자본 배분", "중복 노출"],
    panel: {
      decides: "전략·자산·매니저별로 자본과 위험 한도를 배분하고, 전체 포트폴리오의 노출 구조를 결정한다.",
      whyImportant:
        "개별 투자가 다 좋아도 같은 위험에 몰려 있으면 포트폴리오는 취약하다. 대형 멀티전략 운용사의 핵심 역량은 종목 선정보다 위험·자본 배분 체계에 있다는 평가가 많다.",
      flow: {
        input: "전략별 기대수익·위험, 상관관계, 유동성, 현재 노출 현황",
        judge: "리스크 버짓 배분, 한도 설정, 시나리오·스트레스 테스트",
        output: "전략·매니저별 자본/한도, 전사 노출 리포트",
      },
      hanwhaQuestion:
        "주식·채권·대체투자를 합쳤을 때, 같은 기업·산업·테마에 얼마나 중복 노출되어 있는지 즉시 확인할 수 있는가?",
    },
    detail: {
      definition:
        "개별 투자 판단과 별개로, 전체 포트폴리오 차원에서 자본과 위험을 어디에 얼마씩 배분할지 정하는 단계다. 위험을 '예산'처럼 배분하고 소진을 관리한다.",
      problem:
        "부서별로는 합리적인 투자가 전사적으로는 같은 금리·같은 산업·같은 기업에 몰릴 수 있다. 이 중복을 보지 못하면 위기 때 손실이 한꺼번에 난다.",
      steps: [
        { actor: "리스크 조직", action: "전략·자산군별 위험(변동성·최대손실 추정) 측정", output: "위험 측정 리포트" },
        { actor: "CIO·배분위원회", action: "전략별 리스크 버짓과 자본 배분 결정", output: "배분안" },
        { actor: "리스크 조직", action: "기업·산업·팩터 기준 중복 노출과 상관관계 점검", output: "중복 노출 리포트" },
        { actor: "리스크 조직", action: "스트레스 시나리오(금리 급등·신용 경색 등) 테스트", output: "시나리오 손실 추정" },
        { actor: "CIO", action: "한도 확정, 초과 시 자동 축소 규칙 승인", output: "한도 체계 + 대응 규칙" },
      ],
      participants: [
        { role: "CIO·자산배분위원회", duty: "배분 결정" },
        { role: "독립 리스크 조직", duty: "위험 측정, 한도 관리, 시나리오 분석" },
        { role: "각 전략 PM", duty: "전략별 기대수익·수용력 제시" },
        { role: "ALM·재무", duty: "부채 특성·자본 제약 반영" },
      ],
      inputsOutputs: {
        inputs: ["전략별 성과·위험 데이터", "상관관계 추정", "유동성 프로파일", "부채·자본 제약"],
        outputs: ["리스크 버짓 배분표", "한도 체계", "중복 노출 리포트", "스트레스 테스트 결과"],
      },
      managerCases: [
        {
          managerId: "citadel",
          text: "Citadel은 5개 코어 전략에 걸친 멀티전략 구조와 중앙화된 리스크 관리로 널리 알려져 있다 (공식 사이트는 접근 제한 — 언론 보도 기준).",
          status: "press",
          sourceId: "src-citadel-site",
        },
        {
          managerId: "millennium",
          text: "Millennium은 다수의 독립 운용팀에 자본을 배분하고 엄격한 위험 한도로 관리하는 멀티매니저 구조를 공개하고 있다.",
          status: "official",
          sourceId: "src-mlp-site",
        },
        {
          managerId: "aqr",
          text: "AQR은 위험 기반 배분과 분산을 계량적으로 설계하는 접근을 다수의 공개 리서치로 설명해 왔다.",
          status: "official",
          sourceId: "src-aqr-site",
        },
      ],
      strengths: [
        "위험이 한 곳에 몰리는 것을 구조적으로 방지한다",
        "성과가 좋은 전략에 체계적으로 자본을 옮길 수 있다",
        "위기 시 대응 규칙이 사전에 정해져 있다",
      ],
      failureModes: [
        "상관관계는 위기 때 변한다 — 평시 데이터 기반 분산이 무너질 수 있다",
        "한도가 너무 촘촘하면 수익 기회 자체를 죽인다",
        "비유동성 자산의 위험을 시가 기준으로만 측정하면 왜곡된다",
      ],
      hanwhaApplication: [
        "자산군을 가로지르는 기업·산업·테마 단위 통합 노출 대시보드 구축 검토",
        "위험 배분을 K-ICS 요구자본·유동성 제약과 함께 보는 통합 뷰 설계(구체 계수는 별도 검증)",
        "일반계정·특별계정의 목적 차이를 반영한 별도 리스크 버짓 체계",
      ],
      metrics: [
        "전 자산군 통합 노출 리포트 생성 주기(월→주→일)",
        "한도 초과 발생 건수와 해소 소요 시간",
        "스트레스 시나리오 손실 추정과 실제 손실의 사후 비교",
      ],
      sourceIds: ["src-citadel-site", "src-mlp-site", "src-aqr-site"],
    },
    managerIds: ["citadel", "millennium", "aqr", "balyasny"],
    relatedStrategyIds: ["multi-strategy", "arp", "systematic-macro"],
    relatedTermIds: ["risk-budget", "gross-exposure", "net-exposure", "crowding"],
  },
  {
    id: "execution",
    order: 5,
    nameKo: "투자 집행",
    short: "결정된 투자를 최소 비용·최소 시장 충격으로 실제 체결한다",
    keywords: ["거래비용", "슬리피지", "집행 알고리즘"],
    panel: {
      decides: "언제, 어떤 방식·경로로, 어떤 속도로 주문을 집행할지 결정한다.",
      whyImportant:
        "아무리 좋은 판단도 집행에서 비용이 새면 수익이 줄어든다. 회전율이 높은 전략일수록 거래비용 관리가 성과의 직접 변수다.",
      flow: {
        input: "투자 결정(종목·규모·기한), 시장 유동성 상황",
        judge: "집행 방식 선택(알고리즘·블록·분할), 시장 충격 추정",
        output: "체결 내역, 집행 품질 리포트(계획 대비 슬리피지)",
      },
      hanwhaQuestion:
        "우리 거래의 집행 비용(호가 스프레드·시장 충격)을 측정하고 있으며, 집행 방식을 개선한 적이 있는가?",
    },
    detail: {
      definition:
        "결정된 투자를 실제 시장에서 체결하는 단계다. 거래비용(수수료·스프레드·시장 충격)을 측정하고 줄이는 것이 핵심이다.",
      problem:
        "큰 주문은 가격을 밀어올리며 체결된다(시장 충격). 집행 품질을 측정하지 않으면 어디서 수익이 새는지 알 수 없다.",
      steps: [
        { actor: "PM", action: "목표 포지션과 집행 기한·제약 전달", output: "집행 지시" },
        { actor: "트레이딩 데스크", action: "유동성·변동성 상황에 맞춰 집행 전략 선택", output: "집행 계획(분할·알고리즘·블록)" },
        { actor: "집행 시스템", action: "주문 분할·라우팅, 실시간 체결 관리", output: "체결 내역" },
        { actor: "트레이딩 분석", action: "기준가 대비 슬리피지 측정, 집행 품질 분석", output: "거래비용 분석(TCA) 리포트" },
        { actor: "PM·데스크", action: "집행 방식 개선 사항 반영", output: "집행 정책 업데이트" },
      ],
      participants: [
        { role: "트레이딩 데스크", duty: "집행 전략 수립·실행" },
        { role: "PM", duty: "집행 제약·우선순위 지정" },
        { role: "트레이딩 분석(TCA)", duty: "집행 품질 측정" },
        { role: "미들·백오피스", duty: "체결 확인·결제·기록" },
      ],
      inputsOutputs: {
        inputs: ["투자 결정", "시장 유동성 데이터", "과거 집행 데이터"],
        outputs: ["체결 내역", "TCA 리포트", "집행 정책"],
      },
      managerCases: [
        {
          managerId: "man",
          text: "Man AHL은 시스템 전략의 성과에서 집행 기술이 중요한 부분임을 공개 자료에서 강조해 왔다.",
          status: "official",
          sourceId: "src-man-site",
        },
        {
          managerId: "rentec",
          text: "Renaissance는 거래비용과 시장 충격 관리가 고회전 계량 전략의 핵심임이 다수 보도·서적을 통해 알려져 있다.",
          status: "press",
          sourceId: "src-zuckerman-book",
        },
      ],
      strengths: [
        "측정 가능한 비용 절감이 그대로 수익률로 연결된다",
        "집행 데이터가 쌓여 전략 수용력(capacity) 판단에 쓰인다",
      ],
      failureModes: [
        "빨리 체결하려다 시장 충격을 키우거나, 아끼려다 기회를 놓치는 트레이드오프 관리 실패",
        "비유동 자산(사모·부동산)은 상장 자산과 전혀 다른 집행 리스크(딜 조건·시점)를 가진다",
      ],
      hanwhaApplication: [
        "상장 자산 거래의 집행 비용 측정 체계(TCA) 도입 검토",
        "대체투자는 '집행'을 딜 클로징 프로세스로 재정의하고 조건 협상 체크리스트 표준화",
        "위탁운용 거래의 집행 품질을 위탁사 평가 항목에 포함",
      ],
      metrics: ["평균 슬리피지(기준가 대비)", "대규모 주문의 시장 충격 추정치", "집행 정책 개선 반영 건수"],
      sourceIds: ["src-man-site", "src-zuckerman-book"],
    },
    managerIds: ["man", "rentec", "citadel", "two-sigma"],
    relatedStrategyIds: ["trend-following", "stat-arb"],
    relatedTermIds: ["slippage", "liquidity"],
  },
  {
    id: "monitoring",
    order: 6,
    nameKo: "모니터링·대응",
    short: "가설과 한도를 계속 감시하고, 조건이 깨지면 정해진 대로 대응한다",
    keywords: ["한도 관리", "가설 추적", "손실 통제"],
    panel: {
      decides: "무엇을 감시할지, 어떤 신호에 어떤 강도로 대응할지 결정한다.",
      whyImportant:
        "투자는 실행한 순간이 아니라 보유하는 내내 결정의 연속이다. 멀티매니저 운용사들은 손실 한도와 자동 축소 규칙으로 '작은 손실은 허용, 큰 손실은 차단'을 구조화했다.",
      flow: {
        input: "포지션·손익 데이터, 가설의 핵심 가정 지표, 한도 현황",
        judge: "한도 위반·반증 조건 발동 여부 판정",
        output: "대응 조치(유지·축소·청산·재심의), 조치 기록",
      },
      hanwhaQuestion:
        "투자 실행 후, 심의 때의 핵심 가정이 여전히 유효한지 정기적으로 점검하는 절차가 있는가?",
    },
    detail: {
      definition:
        "보유 중인 투자에서 가설의 전제가 유지되는지, 위험 한도가 지켜지는지 감시하고, 이상 신호에 사전에 정한 방식으로 대응하는 단계다.",
      problem:
        "손실 포지션일수록 '회복을 기다리는' 심리가 작동한다. 감시 항목과 대응 규칙이 사전에 없으면 대응은 늘 늦다.",
      steps: [
        { actor: "리스크 시스템", action: "포지션·손익·노출을 실시간 집계, 한도 대비 점검", output: "일일 리스크 리포트" },
        { actor: "PM", action: "가설의 핵심 가정 지표(실적·스프레드·정책 등) 추적", output: "가설 상태 업데이트" },
        { actor: "리스크 조직", action: "한도 위반·반증 조건 발동 시 통보 및 대응 요구", output: "조치 요구서" },
        { actor: "PM·CIO", action: "유지·축소·청산·재심의 결정", output: "대응 결정 기록" },
      ],
      participants: [
        { role: "독립 리스크 조직", duty: "한도 감시, 위반 통보(운용 조직에서 독립)" },
        { role: "PM", duty: "가설 상태 판단, 1차 대응" },
        { role: "CIO", duty: "중대 사안 최종 결정" },
        { role: "사후관리 조직", duty: "대체투자 자산의 사업 지표 추적" },
      ],
      inputsOutputs: {
        inputs: ["실시간 포지션·손익", "한도 체계", "가설서의 반증 조건", "시장·신용 이벤트"],
        outputs: ["리스크 리포트", "대응 조치 기록", "재심의 안건"],
      },
      managerCases: [
        {
          managerId: "millennium",
          text: "Millennium은 각 운용팀에 명확한 손실 한도를 부여하고, 한도 접근 시 자본을 축소하는 규율로 널리 알려져 있다.",
          status: "press",
        },
        {
          managerId: "balyasny",
          text: "Balyasny는 멀티매니저 구조에서 중앙 리스크 관리와 팀별 한도 운영을 병행하는 것으로 보도되어 왔다.",
          status: "press",
        },
      ],
      strengths: [
        "큰 손실을 구조적으로 차단해 복리 효과를 지킨다",
        "대응이 사람의 심리가 아니라 규칙에 의해 작동한다",
      ],
      failureModes: [
        "한도가 너무 타이트하면 일시적 변동에 좋은 포지션을 강제 청산한다",
        "비유동성 장기투자에 단기 시가 기준 손절 규칙을 일괄 적용하면 오히려 손실을 확정시킨다 — 자산 특성별 규칙 분리가 필수",
        "모니터링 항목이 너무 많아 정작 중요한 신호가 묻힌다",
      ],
      hanwhaApplication: [
        "심의 시 확정한 반증 조건·핵심 가정을 사후관리 시스템의 점검 항목으로 자동 등록",
        "상장 자산과 비유동 자산의 이상 신호 기준을 분리 설계(가격 기준 vs 사업 지표 기준)",
        "한도 위반·조건 발동 시 대응 기한과 보고 라인을 사전 규정",
      ],
      metrics: [
        "반증 조건 발동 건 중 기한 내 대응 완료 비율",
        "한도 위반 건수·지속 시간",
        "조기 경보로 손실을 축소한 사례 수(사후 추정)",
      ],
      sourceIds: ["src-mlp-site"],
    },
    managerIds: ["millennium", "balyasny", "citadel"],
    relatedStrategyIds: ["multi-strategy", "equity-long-short"],
    relatedTermIds: ["drawdown", "risk-budget", "crowding"],
  },
  {
    id: "evaluation",
    order: 7,
    nameKo: "성과평가·복기",
    short: "수익이 어디서 왜 났는지 분해하고, 판단 과정을 되돌아본다",
    keywords: ["성과귀속", "알파·베타 분해", "복기"],
    panel: {
      decides: "성과를 어떤 기준으로 분해·평가할지, 무엇을 잘했고 무엇이 운이었는지 판정한다.",
      whyImportant:
        "총수익률만 보면 시장이 올려준 것과 실력을 구분할 수 없다. 성과귀속과 복기가 없으면 조직은 같은 실수를 반복하고, 운을 실력으로 보상하게 된다.",
      flow: {
        input: "성과 데이터, 벤치마크·팩터, 당시 의사결정 기록",
        judge: "수익 원천 분해(시장·팩터·선택·타이밍), 과정 대비 결과 평가",
        output: "성과귀속 리포트, 복기 노트, 개선 과제",
      },
      hanwhaQuestion:
        "작년 성과 중 시장 덕분인 부분과 우리의 판단 덕분인 부분을 구분해 설명할 수 있는가?",
    },
    detail: {
      definition:
        "실현된 성과를 수익 원천별로 분해하고(성과귀속), 당시의 판단 과정과 비교해 무엇을 배울지 정리하는(복기) 단계다.",
      problem:
        "결과만 평가하면 좋은 과정의 나쁜 결과는 처벌되고, 나쁜 과정의 좋은 결과는 보상된다. 장기적으로 조직의 판단 품질이 나빠진다.",
      steps: [
        { actor: "성과분석 조직", action: "수익률을 시장(베타)·팩터·종목선택·타이밍으로 분해", output: "성과귀속 리포트" },
        { actor: "PM·애널리스트", action: "당시 가설서·심의 기록과 실제 결과 대조", output: "복기 노트(무엇이 맞고 틀렸나)" },
        { actor: "리서치 총괄", action: "반복되는 실수 패턴·강점 식별", output: "개선 과제 목록" },
        { actor: "경영진", action: "평가·보상에 과정 품질 반영", output: "평가 반영 결과" },
      ],
      participants: [
        { role: "독립 성과분석 조직", duty: "귀속 분석의 객관성 확보" },
        { role: "PM·애널리스트", duty: "복기 수행" },
        { role: "경영진", duty: "평가·보상 연계" },
      ],
      inputsOutputs: {
        inputs: ["거래·포지션 이력", "벤치마크·팩터 수익률", "의사결정 기록"],
        outputs: ["성과귀속 리포트", "복기 노트", "개선 과제"],
      },
      managerCases: [
        {
          managerId: "aqr",
          text: "AQR은 수익의 원천을 팩터로 분해해 설명하는 접근을 공개 리서치를 통해 지속적으로 발표해 왔다.",
          status: "official",
          sourceId: "src-aqr-site",
        },
        {
          managerId: "bridgewater",
          text: "Bridgewater는 실수를 기록하고 원인을 진단해 원칙으로 축적하는 문화를 공개적으로 설명해 왔다.",
          status: "official",
          sourceId: "src-bw-site",
        },
      ],
      strengths: [
        "실력과 운을 구분해 자본 배분·보상에 반영할 수 있다",
        "실수가 반복되지 않도록 조직 학습이 일어난다",
      ],
      failureModes: [
        "귀속 분석이 너무 복잡해 아무도 읽지 않는 리포트가 된다",
        "복기가 책임 추궁이 되면 솔직한 기록이 사라진다",
        "단기 성과 분해를 장기 전략 평가에 그대로 적용하는 오류",
      ],
      hanwhaApplication: [
        "자산군별 성과를 시장 기여분과 의사결정 기여분으로 분해하는 표준 리포트 설계",
        "심의 기록과 성과를 연결한 '결정 단위 복기' 절차 신설 검토",
        "위탁운용사 평가에 시장 효과를 제거한 초과성과 기준 적용",
      ],
      metrics: [
        "복기 완료율(종결 투자 건 대비)",
        "복기에서 도출된 개선 과제의 실제 반영 건수",
        "성과귀속 리포트의 의사결정 활용 빈도",
      ],
      sourceIds: ["src-aqr-site", "src-bw-site"],
    },
    managerIds: ["aqr", "bridgewater", "point72"],
    relatedStrategyIds: ["equity-market-neutral", "arp"],
    relatedTermIds: ["attribution", "alpha", "beta", "information-ratio"],
  },
  {
    id: "knowledge",
    order: 8,
    nameKo: "투자 지식 축적",
    short: "판단과 복기의 결과를 조직의 자산으로 만들어 다음 리서치로 연결한다",
    keywords: ["사례 데이터베이스", "판단의 데이터화", "AI 활용"],
    panel: {
      decides: "무엇을 어떤 형태로 남겨서, 다음 투자 판단이 더 나아지게 할지 결정한다.",
      whyImportant:
        "개인의 경험은 퇴사와 함께 사라진다. 선도 운용사들은 판단·복기·사례를 데이터로 축적하고, 최근에는 AI로 이를 검색·활용하는 단계로 나아가고 있다. 이 단계의 산출물이 다시 1단계(리서치)의 입력이 된다.",
      flow: {
        input: "가설서, 심의 기록, 복기 노트, 성과귀속 결과",
        judge: "표준화·태깅, 검색 체계 구축, 패턴 추출",
        output: "사례 데이터베이스, 원칙·체크리스트, 다음 리서치 과제",
      },
      hanwhaQuestion:
        "5년 전 유사한 투자를 검토했던 기록을, 지금 담당자가 찾아서 참고할 수 있는가?",
    },
    detail: {
      definition:
        "투자 과정에서 생긴 가설·결정·복기 기록을 조직 차원의 지식으로 구조화해, 다음 판단의 출발점을 높이는 단계다. 8단계의 끝이자 1단계의 시작이다.",
      problem:
        "대부분의 조직에서 투자 경험은 개인의 암묵지로만 남는다. 담당자가 바뀌면 같은 검토를 처음부터 반복하고, 같은 실수를 다시 한다.",
      steps: [
        { actor: "지식관리 조직", action: "가설서·심의·복기 기록을 표준 포맷으로 축적", output: "투자 사례 데이터베이스" },
        { actor: "데이터 조직", action: "기업·산업·전략·결과 태그로 검색 체계 구축", output: "검색 가능한 지식 베이스" },
        { actor: "리서치 총괄", action: "반복 패턴을 원칙·체크리스트로 승격", output: "투자 원칙·체크리스트" },
        { actor: "AI·기술 조직", action: "축적된 기록 기반 검색·요약·유사 사례 추천 도구 제공", output: "AI 리서치 지원 도구" },
        { actor: "전체 운용 인력", action: "신규 검토 시 유사 사례·원칙 참조", output: "다음 리서치·가설의 출발점 (→ 1단계로 순환)" },
      ],
      participants: [
        { role: "지식관리·데이터 조직", duty: "축적 체계 운영" },
        { role: "리서치 총괄", duty: "원칙 승격·품질 관리" },
        { role: "AI·기술 조직", duty: "검색·분석 도구 개발" },
      ],
      inputsOutputs: {
        inputs: ["가설서", "의사결정 기록", "복기 노트", "성과귀속 리포트"],
        outputs: ["사례 데이터베이스", "원칙·체크리스트", "AI 지원 도구", "다음 리서치 과제"],
      },
      managerCases: [
        {
          managerId: "bridgewater",
          text: "Bridgewater는 투자 판단의 논리를 시스템에 기록해 축적하는 접근을 오래 공개해 왔고, AI 전담 조직 AIA Labs 를 공식 소개하고 있다.",
          status: "official",
          sourceId: "src-bw-ai",
        },
        {
          managerId: "man",
          text: "Man Group은 사내 생성형 AI 포털(ManGPT)과 에이전트형 시그널 리서치(AlphaGPT) 등 AI 통합을 공개적으로 발표해 왔다.",
          status: "press",
          sourceId: "src-pionline-mangpt",
        },
      ],
      strengths: [
        "조직의 판단 품질이 개인이 아닌 시스템에 축적된다",
        "신규 인력의 학습 속도가 빨라진다",
        "AI 도구의 효과가 축적된 데이터 품질에 비례해 커진다",
      ],
      failureModes: [
        "기록 의무만 늘고 활용이 없으면 형식적 문서 작업이 된다",
        "과거 사례에 과도하게 의존해 새로운 상황을 과거 틀에 끼워 맞춘다",
        "AI 도구를 검증 없이 판단 주체로 격상시키는 오류",
      ],
      hanwhaApplication: [
        "투자 검토·심의·사후관리 문서의 표준 포맷과 태그 체계 정비부터 시작",
        "축적된 문서 기반 사내 검색·요약 도구를 소규모로 시범 도입",
        "AI 도구는 '판단 지원'으로 역할을 한정하고 검증 절차를 별도 설계",
      ],
      metrics: [
        "신규 검토 시 과거 사례 참조율",
        "지식 베이스 등록 건수와 조회수",
        "유사 사례 검색 소요 시간",
      ],
      sourceIds: ["src-bw-ai", "src-pionline-mangpt"],
    },
    managerIds: ["bridgewater", "man", "deshaw"],
    relatedStrategyIds: ["systematic-macro", "stat-arb"],
    relatedTermIds: ["backtest", "overfitting", "attribution"],
  },
];

export const processById = (id: string) => processes.find((p) => p.id === id);
