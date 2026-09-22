import type { Term } from "../types";

export const glossary: Term[] = [
  {
    id: "alpha",
    nameKo: "알파",
    nameEn: "Alpha",
    definition: "시장 전체가 오르내린 효과를 제외하고, 운용사의 실력으로 만들어낸 초과수익을 말한다. 시장이 어떻게 움직이든 별도로 벌어들인 부분이다.",
    example: "시장이 5% 오른 해에 펀드가 8% 수익을 냈다면, 시장 효과를 뺀 약 3%p가 알파에 해당한다.",
    confusedWith: "베타는 시장을 따라가기만 해도 얻는 수익이고, 알파는 시장과 무관하게 실력으로 얻는 수익이라는 점이 다르다.",
    relatedPages: [
      { label: "성과 분석", path: "/performance" },
      { label: "헤지펀드 가이드", path: "/guide" }
    ]
  },
  {
    id: "beta",
    nameKo: "베타",
    nameEn: "Beta",
    definition: "펀드 수익률이 시장 전체 움직임에 얼마나 민감하게 반응하는지를 나타내는 수치다. 베타가 1이면 시장과 같이 움직이고, 0이면 시장과 무관하게 움직인다.",
    example: "베타가 1.5인 펀드는 시장이 10% 오를 때 대략 15% 오르고, 시장이 10% 내리면 대략 15% 내리는 경향이 있다.",
    confusedWith: "알파가 운용 실력에서 나오는 수익이라면, 베타는 시장에 올라타는 것만으로 얻는 수익이라는 점이 다르다.",
    relatedPages: [
      { label: "성과 분석", path: "/performance" }
    ]
  },
  {
    id: "long-short",
    nameKo: "롱숏",
    nameEn: "Long/Short",
    definition: "오를 것으로 보는 자산은 사고(롱), 내릴 것으로 보는 자산은 빌려서 파는(숏) 전략이다. 시장 방향과 별개로 종목 선택에서 수익을 노릴 수 있다.",
    example: "같은 업종에서 경쟁력 있는 A사 주식을 100억 원 사고, 경쟁에서 밀리는 B사 주식을 70억 원 공매도한다.",
    confusedWith: "롱숏이라고 해서 항상 시장중립은 아니며, 실제로는 롱 비중이 더 커서 시장이 하락하면 같이 손실을 보는 펀드가 많다.",
    relatedPages: [
      { label: "주식 롱숏 전략", path: "/strategies/equity-long-short" }
    ]
  },
  {
    id: "market-neutral",
    nameKo: "마켓 뉴트럴(시장중립)",
    nameEn: "Market Neutral",
    definition: "롱과 숏의 크기를 맞춰 시장이 오르든 내리든 영향을 거의 받지 않도록 설계한 전략이다. 수익의 원천을 시장 방향이 아니라 종목 간 상대적 우열에 둔다.",
    example: "주식 100억 원을 사고 동시에 다른 주식 100억 원을 공매도해 순노출을 0에 가깝게 유지한다.",
    confusedWith: "주식 롱숏 펀드가 모두 시장중립인 것은 아니며, 시장중립은 순노출을 의도적으로 0 근처로 관리하는 경우만을 가리킨다.",
    relatedPages: [
      { label: "주식 시장중립 전략", path: "/strategies/equity-market-neutral" },
      { label: "통계적 차익거래", path: "/strategies/stat-arb" }
    ]
  },
  {
    id: "global-macro-term",
    nameKo: "글로벌 매크로",
    nameEn: "Global Macro",
    definition: "금리, 환율, 원자재, 주가지수 등 거시경제 흐름에 대한 전망을 바탕으로 전 세계 여러 자산에 투자하는 전략이다. 개별 기업이 아니라 국가와 경제 전체를 본다.",
    example: "미국의 금리 인하를 예상하고 미 국채를 매수하면서, 달러 약세에 대비해 엔화를 함께 매수한다.",
    confusedWith: "CTA와 겹쳐 보이지만, 글로벌 매크로는 매니저의 거시경제 판단이 중심이고 CTA는 선물시장에서 규칙 기반으로 운용하는 경우가 많다는 점이 다르다.",
    relatedPages: [
      { label: "글로벌 매크로 전략", path: "/strategies/global-macro" },
      { label: "시스터매틱 매크로 전략", path: "/strategies/systematic-macro" }
    ]
  },
  {
    id: "relative-value-term",
    nameKo: "상대가치",
    nameEn: "Relative Value",
    definition: "서로 밀접하게 연결된 두 자산의 가격 차이가 비정상적으로 벌어졌을 때, 싼 쪽을 사고 비싼 쪽을 팔아 가격 차이가 정상으로 돌아오는 데서 수익을 얻는 전략이다.",
    example: "같은 회사가 발행한 두 채권의 금리 차이가 평소보다 크게 벌어지자, 싼 채권을 사고 비싼 채권을 판다.",
    confusedWith: "시장이 오를지 내릴지에 베팅하는 방향성 전략과 달리, 상대가치는 두 자산 사이의 가격 차이에만 베팅한다는 점이 다르다.",
    relatedPages: [
      { label: "상대가치 전략", path: "/strategies/relative-value" },
      { label: "통계적 차익거래", path: "/strategies/stat-arb" }
    ]
  },
  {
    id: "event-driven-term",
    nameKo: "이벤트 드리븐",
    nameEn: "Event Driven",
    definition: "인수합병, 분사, 구조조정, 파산 같은 기업의 특별한 사건 전후에 생기는 가격 왜곡에서 수익을 얻는 전략이다. 사건의 성사 여부와 조건이 수익을 좌우한다.",
    example: "A사가 B사를 주당 100달러에 인수한다고 발표했는데 B사 주가가 95달러라면, B사 주식을 사서 성사 시 5달러 차익을 노린다.",
    confusedWith: "행동주의는 펀드가 스스로 기업 변화를 만들어내는 반면, 이벤트 드리븐은 이미 발표되었거나 예상되는 사건에 대응한다는 점이 다르다.",
    relatedPages: [
      { label: "이벤트 드리븐 전략", path: "/strategies/event-driven" },
      { label: "합병차익거래", path: "/strategies/merger-arb" }
    ]
  },
  {
    id: "activism",
    nameKo: "행동주의",
    nameEn: "Activism",
    definition: "기업 지분을 상당량 매입한 뒤 경영진에게 배당 확대, 사업 매각, 지배구조 개선 등을 요구해 기업가치를 끌어올리는 전략이다. 투자자가 직접 변화를 만들어낸다.",
    example: "펀드가 한 제조업체 지분 7%를 확보한 뒤 비주력 사업 매각을 요구했고, 매각 발표 후 주가가 30% 올랐다.",
    confusedWith: "일반 이벤트 드리븐이 남이 만든 사건에 올라타는 것이라면, 행동주의는 수익의 계기가 되는 사건 자체를 펀드가 직접 만든다는 점이 다르다.",
    relatedPages: [
      { label: "행동주의 전략", path: "/strategies/activist" },
      { label: "이벤트 드리븐 전략", path: "/strategies/event-driven" }
    ]
  },
  {
    id: "cta",
    nameKo: "CTA(상품거래자문업자)",
    nameEn: "CTA (Commodity Trading Advisor)",
    definition: "본래 미국 규제상 선물과 옵션 운용을 자문하는 사업자 등록 분류를 뜻하며, 실무에서는 선물시장을 중심으로 운용하는 매니저를 넓게 부르는 말이다. 특정 전략이 아니라 매니저의 유형을 가리킨다.",
    example: "한 CTA는 추세추종으로 운용하지만, 다른 CTA는 금리 스프레드나 단기 패턴 매매처럼 전혀 다른 전략을 쓴다.",
    confusedWith: "CTA는 매니저 분류이고 추세추종은 전략 이름이므로, 모든 CTA가 추세추종을 하는 것은 아니며 매니지드 퓨처스도 추세추종과 완전히 같은 말이 아니다.",
    relatedPages: [
      { label: "추세추종 전략", path: "/strategies/trend-following" },
      { label: "대체 추세 전략", path: "/strategies/alt-trend" }
    ]
  },
  {
    id: "trend-following-term",
    nameKo: "추세추종",
    nameEn: "Trend Following",
    definition: "가격이 오르는 자산은 사고 내리는 자산은 파는 식으로, 이미 형성된 추세를 따라가는 규칙 기반 전략이다. 예측하기보다 추세가 확인되면 올라탄다.",
    example: "원유 선물 가격이 3개월 연속 상승 추세를 보이자 모델이 매수 포지션을 잡고, 추세가 꺾이면 자동으로 청산한다.",
    confusedWith: "매니지드 퓨처스는 선물 운용 전반을 가리키는 넓은 말이고, 추세추종은 그중 하나의 전략일 뿐이라는 점에서 정확히 같은 말이 아니다.",
    relatedPages: [
      { label: "추세추종 전략", path: "/strategies/trend-following" },
      { label: "대체 추세 전략", path: "/strategies/alt-trend" }
    ]
  },
  {
    id: "quantitative",
    nameKo: "퀀트(계량적 접근)",
    nameEn: "Quantitative",
    definition: "데이터와 수학적 모델을 활용해 투자 기회를 찾아내는 접근 방식이다. 사람의 감이 아니라 통계적으로 검증된 패턴에 의존한다.",
    example: "수천 개 종목의 재무 데이터와 가격 데이터를 분석해, 저평가되고 이익이 개선되는 종목을 모델이 골라낸다.",
    confusedWith: "퀀트는 분석 방법(계량 분석 활용)을 말하고 시스터매틱은 실행 방식(규칙 기반 매매)을 말하므로, 둘은 겹치는 경우가 많지만 같은 말은 아니다.",
    relatedPages: [
      { label: "통계적 차익거래", path: "/strategies/stat-arb" },
      { label: "헤지펀드 가이드", path: "/guide" }
    ]
  },
  {
    id: "systematic",
    nameKo: "시스터매틱(규칙 기반 운용)",
    nameEn: "Systematic",
    definition: "매매 결정을 사람의 그때그때 판단이 아니라 미리 정해둔 규칙과 모델에 따라 자동으로 실행하는 운용 방식이다. 같은 상황에서는 항상 같은 결정이 나온다.",
    example: "20일 이동평균선을 가격이 넘어서면 매수한다는 규칙을 정해두고, 조건이 충족될 때마다 예외 없이 실행한다.",
    confusedWith: "계량 분석을 참고하더라도 최종 매매 판단을 사람이 내리면 퀀트일 수는 있어도 시스터매틱은 아니라는 점에서, 두 개념은 구분된다.",
    relatedPages: [
      { label: "시스터매틱 매크로 전략", path: "/strategies/systematic-macro" },
      { label: "추세추종 전략", path: "/strategies/trend-following" }
    ]
  },
  {
    id: "discretionary",
    nameKo: "재량 운용",
    nameEn: "Discretionary",
    definition: "매니저가 정보를 종합해 그때그때 스스로 판단하고 매매를 결정하는 운용 방식이다. 규칙에 얽매이지 않고 상황에 맞게 유연하게 대응한다.",
    example: "중앙은행 총재의 발언 뉘앙스가 바뀐 것을 포착한 매니저가 예정에 없던 국채 매수를 결정한다.",
    confusedWith: "재량 운용도 데이터와 모델을 참고하는 경우가 많으며, 시스터매틱과의 차이는 최종 결정을 사람이 내리는지 여부에 있다.",
    relatedPages: [
      { label: "글로벌 매크로 전략", path: "/strategies/global-macro" }
    ]
  },
  {
    id: "quantamental-term",
    nameKo: "퀀터멘털",
    nameEn: "Quantamental",
    definition: "계량 모델(퀀트)과 기업 분석(펀더멘털)을 결합한 접근이다. 모델이 넓은 범위에서 후보를 걸러내고, 사람이 깊이 있는 분석으로 최종 판단하는 식이 대표적이다.",
    example: "모델이 3,000개 종목 중 유망한 50개를 추려주면, 애널리스트가 그중 10개를 골라 집중 투자한다.",
    confusedWith: "완전한 시스터매틱 운용과 달리, 퀀터멘털은 모델의 결과에 사람의 판단을 결합한다는 점이 다르다.",
    relatedPages: [
      { label: "주식 롱숏 전략", path: "/strategies/equity-long-short" },
      { label: "산업의 진화", path: "/evolution" }
    ]
  },
  {
    id: "multi-strategy-term",
    nameKo: "멀티스트래티지",
    nameEn: "Multi-Strategy",
    definition: "하나의 펀드 안에서 주식 롱숏, 채권 차익거래, 매크로 등 여러 전략을 동시에 운용하는 방식이다. 전략 간 분산으로 안정적인 수익을 추구한다.",
    example: "한 펀드가 자산의 40%는 주식 롱숏, 30%는 채권 상대가치, 30%는 매크로 전략에 배분해 운용한다.",
    confusedWith: "멀티스트래티지는 어떤 전략들을 담는지(전략 구성)를 말하고, 멀티매니저는 여러 운용팀을 두는 조직 구조를 말한다는 점에서 구분된다.",
    relatedPages: [
      { label: "멀티스트래티지 전략", path: "/strategies/multi-strategy" }
    ]
  },
  {
    id: "multi-manager-term",
    nameKo: "멀티매니저",
    nameEn: "Multi-Manager",
    definition: "하나의 펀드가 여러 독립적인 운용팀(포드)에 자본을 나누어 맡기고, 중앙에서 리스크를 통합 관리하는 조직 구조다. 각 팀은 서로 독립적으로 운용한다.",
    example: "한 펀드가 150개 운용팀에 자본을 배분하고, 손실 한도를 넘은 팀은 즉시 자본을 회수한다.",
    confusedWith: "멀티매니저는 조직 구조에 관한 말이고 멀티스트래티지는 전략 구성에 관한 말이므로, 한 팀이 여러 전략을 하는 멀티스트래티지 펀드는 멀티매니저가 아닐 수 있다.",
    relatedPages: [
      { label: "멀티스트래티지 전략", path: "/strategies/multi-strategy" },
      { label: "자본 배분 프로세스", path: "/process/allocation" }
    ]
  },
  {
    id: "pod",
    nameKo: "포드(운용팀 단위)",
    nameEn: "Pod",
    definition: "멀티매니저 펀드 안에서 독립적으로 운용하는 소규모 팀 단위를 말한다. 각 포드는 배정받은 자본과 리스크 한도 안에서 자기 전략을 운용한다.",
    example: "한 포드가 자본 5억 달러와 최대 손실 한도 5%를 배정받아 헬스케어 주식 롱숏을 운용한다.",
    confusedWith: "포드는 독립된 펀드가 아니라 회사의 리스크 한도 안에서 움직이는 내부 조직이며, 한도를 어기면 자본이 회수되거나 팀이 해체된다.",
    relatedPages: [
      { label: "멀티스트래티지 전략", path: "/strategies/multi-strategy" },
      { label: "자본 배분 프로세스", path: "/process/allocation" }
    ]
  },
  {
    id: "risk-budget",
    nameKo: "리스크 버짓(위험예산)",
    nameEn: "Risk Budget",
    definition: "펀드 전체가 감내할 수 있는 위험의 총량을 먼저 정하고, 이를 전략이나 팀별로 나누어 배분하는 관리 방식이다. 돈이 아니라 위험을 예산처럼 나눈다.",
    example: "펀드 전체 변동성 한도를 연 6%로 정하고, 그중 주식 전략에 2%p, 채권 전략에 1%p를 배분한다.",
    confusedWith: "자본 배분이 돈을 나누는 것이라면, 리스크 버짓은 각 전략이 쓸 수 있는 위험의 양을 나눈다는 점이 다르다.",
    relatedPages: [
      { label: "자본 배분 프로세스", path: "/process/allocation" }
    ]
  },
  {
    id: "gross-exposure",
    nameKo: "그로스 익스포저(총노출)",
    nameEn: "Gross Exposure",
    definition: "롱 포지션과 숏 포지션의 크기를 절대값으로 모두 더한 값이다. 펀드가 시장에 걸어둔 전체 판돈의 크기, 즉 레버리지 수준을 보여준다.",
    example: "자본 100억 원으로 롱 150억 원, 숏 100억 원을 잡으면 총노출은 250%다.",
    confusedWith: "넷 익스포저(롱에서 숏을 뺀 값)가 시장 방향에 대한 베팅 크기를 보여준다면, 그로스 익스포저는 전체 포지션 규모를 보여준다는 점이 다르다.",
    relatedPages: [
      { label: "성과 분석", path: "/performance" }
    ]
  },
  {
    id: "net-exposure",
    nameKo: "넷 익스포저(순노출)",
    nameEn: "Net Exposure",
    definition: "롱 포지션에서 숏 포지션을 뺀 값으로, 펀드가 시장 방향에 얼마나 베팅하고 있는지를 보여준다. 0에 가까울수록 시장 방향의 영향을 덜 받는다.",
    example: "롱 150억 원, 숏 100억 원이면 순노출은 자본 대비 50%로, 시장이 오르면 유리한 상태다.",
    confusedWith: "그로스 익스포저는 롱과 숏을 더한 전체 규모이고, 넷 익스포저는 둘의 차이인 방향성이라는 점에서 서로 다른 정보를 담는다.",
    relatedPages: [
      { label: "주식 시장중립 전략", path: "/strategies/equity-market-neutral" },
      { label: "성과 분석", path: "/performance" }
    ]
  },
  {
    id: "leverage",
    nameKo: "레버리지",
    nameEn: "Leverage",
    definition: "빌린 돈이나 파생상품을 이용해 자기자본보다 큰 규모의 포지션을 잡는 것이다. 수익과 손실이 모두 확대된다.",
    example: "자본 100억 원으로 300억 원어치 포지션을 잡으면 레버리지는 3배이며, 자산이 1% 움직일 때 자본은 3% 움직인다.",
    confusedWith: "레버리지가 높다고 항상 위험이 큰 것은 아니며, 가격 변동이 작은 차익거래 전략은 높은 레버리지를 써도 전체 위험이 낮을 수 있다.",
    relatedPages: [
      { label: "상대가치 전략", path: "/strategies/relative-value" },
      { label: "헤지펀드 가이드", path: "/guide" }
    ]
  },
  {
    id: "drawdown",
    nameKo: "드로다운(낙폭)",
    nameEn: "Drawdown",
    definition: "펀드 가치가 최고점에서 얼마나 떨어졌는지를 나타내는 하락 폭이다. 투자자가 실제로 겪는 고통의 크기를 보여주는 지표다.",
    example: "펀드 가치가 120에서 90까지 떨어졌다면 드로다운은 25%다.",
    confusedWith: "변동성이 수익률이 출렁이는 정도를 재는 것이라면, 드로다운은 고점 대비 실제로 잃은 폭을 잰다는 점이 다르다.",
    relatedPages: [
      { label: "성과 분석", path: "/performance" },
      { label: "성과 평가 프로세스", path: "/process/evaluation" }
    ]
  },
  {
    id: "sharpe-ratio",
    nameKo: "샤프비율",
    nameEn: "Sharpe Ratio",
    definition: "감수한 위험(변동성) 한 단위당 얼마나 초과수익을 냈는지 재는 지표다. 높을수록 위험 대비 효율이 좋은 운용이다.",
    example: "무위험수익률을 뺀 초과수익이 연 6%이고 변동성이 연 3%라면 샤프비율은 2.0이다.",
    confusedWith: "샤프비율은 무위험수익률 대비 초과수익을 재고, 인포메이션 레이쇼는 벤치마크 대비 초과수익을 잰다는 점이 다르다.",
    relatedPages: [
      { label: "성과 분석", path: "/performance" },
      { label: "성과 평가 프로세스", path: "/process/evaluation" }
    ]
  },
  {
    id: "information-ratio",
    nameKo: "인포메이션 레이쇼",
    nameEn: "Information Ratio",
    definition: "벤치마크 대비 초과수익을 그 초과수익의 변동성(추적오차)으로 나눈 지표다. 벤치마크를 얼마나 꾸준히 이기는지를 보여준다.",
    example: "벤치마크를 연평균 2%p 이기고 추적오차가 연 4%라면 인포메이션 레이쇼는 0.5다.",
    confusedWith: "샤프비율의 기준이 무위험수익률인 반면, 인포메이션 레이쇼의 기준은 벤치마크라는 점이 다르다.",
    relatedPages: [
      { label: "성과 평가 프로세스", path: "/process/evaluation" }
    ]
  },
  {
    id: "attribution",
    nameKo: "성과요인 분석(어트리뷰션)",
    nameEn: "Attribution",
    definition: "펀드의 수익이 어디에서 나왔는지를 시장 효과, 종목 선택, 환율 등 요인별로 분해해 설명하는 분석이다. 수익의 출처를 알아야 실력과 운을 구분할 수 있다.",
    example: "연 10% 수익 중 시장 상승 효과가 6%p, 종목 선택이 3%p, 환율 효과가 1%p였다고 분해한다.",
    confusedWith: "단순 수익률 보고가 얼마를 벌었는지만 알려준다면, 어트리뷰션은 왜 벌었는지를 설명한다는 점이 다르다.",
    relatedPages: [
      { label: "성과 평가 프로세스", path: "/process/evaluation" },
      { label: "성과 분석", path: "/performance" }
    ]
  },
  {
    id: "crowding",
    nameKo: "쏠림(크라우딩)",
    nameEn: "Crowding",
    definition: "여러 펀드가 비슷한 분석을 거쳐 같은 포지션에 몰려 있는 상태를 말한다. 한 곳이 급히 팔기 시작하면 모두가 동시에 빠져나가려 해 손실이 연쇄적으로 커질 수 있다.",
    example: "헤지펀드들이 공통으로 보유한 인기 종목에서 한 펀드가 급매도하자, 다른 펀드들의 손절이 이어지며 주가가 급락했다.",
    confusedWith: "유동성 부족과 관련은 있지만 다른 개념으로, 거래량이 많은 대형주에서도 포지션이 한쪽에 몰려 있으면 쏠림 위험은 발생한다.",
    relatedPages: [
      { label: "성과 분석", path: "/performance" },
      { label: "산업의 진화", path: "/evolution" }
    ]
  },
  {
    id: "liquidity",
    nameKo: "유동성",
    nameEn: "Liquidity",
    definition: "자산을 가격에 큰 영향을 주지 않고 빠르게 사고팔 수 있는 정도를 말한다. 유동성이 낮은 자산은 급하게 팔 때 제값을 받기 어렵다.",
    example: "대형주 100억 원어치는 하루면 팔 수 있지만, 같은 금액의 부실채권은 파는 데 몇 주가 걸리고 가격도 크게 깎인다.",
    confusedWith: "자산의 유동성(시장에서 팔기 쉬운 정도)과 펀드의 유동성(투자자가 환매할 수 있는 조건)은 구분해서 봐야 한다.",
    relatedPages: [
      { label: "헤지펀드 가이드", path: "/guide" },
      { label: "집행 프로세스", path: "/process/execution" }
    ]
  },
  {
    id: "slippage",
    nameKo: "슬리피지",
    nameEn: "Slippage",
    definition: "주문을 내기로 결정한 시점의 가격과 실제로 체결된 가격 사이의 차이를 말한다. 큰 주문일수록 시장 가격을 스스로 밀어 올리거나 내리며 비용이 커진다.",
    example: "주당 100원에 사려고 대량 주문을 냈지만 매수가 진행되며 가격이 밀려 평균 100.5원에 체결됐다.",
    confusedWith: "수수료가 명시적으로 청구되는 비용이라면, 슬리피지는 체결 과정에서 조용히 발생하는 숨은 거래비용이라는 점이 다르다.",
    relatedPages: [
      { label: "집행 프로세스", path: "/process/execution" }
    ]
  },
  {
    id: "backtest",
    nameKo: "백테스트",
    nameEn: "Backtest",
    definition: "투자 전략을 과거 데이터에 적용해 만약 그때 이 전략을 썼다면 어떤 성과가 났을지 모의로 검증하는 작업이다. 전략을 실제 자금에 적용하기 전의 필수 점검 절차다.",
    example: "새 추세추종 모델을 지난 20년치 선물 가격 데이터에 적용해 연평균 수익률과 최대 낙폭을 계산해 본다.",
    confusedWith: "백테스트 성과가 좋다고 실제 성과가 보장되는 것은 아니며, 과최적화나 데이터 오류 때문에 실전에서는 전혀 다른 결과가 나올 수 있다.",
    relatedPages: [
      { label: "헤지펀드 가이드", path: "/guide" },
      { label: "운용사 평가 프로세스", path: "/process/evaluation" }
    ]
  },
  {
    id: "overfitting",
    nameKo: "과최적화(오버피팅)",
    nameEn: "Overfitting",
    definition: "모델을 과거 데이터에 지나치게 딱 맞도록 다듬은 나머지, 과거의 우연한 패턴까지 학습해 미래에는 통하지 않게 되는 문제다. 백테스트는 화려한데 실전 성과는 나쁜 전형적인 원인이다.",
    example: "파라미터 수십 개를 조정해 백테스트 샤프비율 3.0을 만든 전략이 실제 운용에서는 손실을 냈다.",
    confusedWith: "룩어헤드 바이어스가 그 시점에 없던 정보를 쓰는 오류라면, 과최적화는 있던 정보에 모델을 과도하게 맞추는 오류라는 점이 다르다.",
    relatedPages: [
      { label: "헤지펀드 가이드", path: "/guide" }
    ]
  },
  {
    id: "look-ahead-bias",
    nameKo: "룩어헤드 바이어스(미래참조 오류)",
    nameEn: "Look-ahead Bias",
    definition: "백테스트에서 그 시점에는 알 수 없었던 미래의 정보를 사용해 성과가 실제보다 좋게 나오는 오류다. 데이터의 발표 시점을 정확히 지키지 않으면 발생한다.",
    example: "3월에 발표된 연간 실적 데이터를 1월 시점의 매매 판단에 사용해 백테스트 수익률이 부풀려졌다.",
    confusedWith: "생존편향이 표본에서 사라진 대상을 빠뜨리는 문제라면, 룩어헤드 바이어스는 정보를 아는 시점을 잘못 설정하는 문제라는 점이 다르다.",
    relatedPages: [
      { label: "헤지펀드 가이드", path: "/guide" }
    ]
  },
  {
    id: "survivorship-bias",
    nameKo: "생존편향",
    nameEn: "Survivorship Bias",
    definition: "이미 사라진 펀드나 상장폐지된 종목을 빼고 살아남은 것들만으로 분석해 성과가 실제보다 좋게 보이는 오류다. 실패 사례가 통계에서 조용히 빠지는 것이 원인이다.",
    example: "청산된 펀드를 제외하고 계산한 헤지펀드 평균 수익률이 실제보다 연 2%p가량 높게 나왔다.",
    confusedWith: "룩어헤드 바이어스가 정보의 시점 문제라면, 생존편향은 분석 대상 표본이 승자 위주로 구성되는 문제라는 점이 다르다.",
    relatedPages: [
      { label: "성과 분석", path: "/performance" },
      { label: "헤지펀드 가이드", path: "/guide" }
    ]
  },
  {
    id: "alm",
    nameKo: "자산부채종합관리(ALM)",
    nameEn: "ALM (Asset-Liability Management)",
    definition: "보험사나 연기금이 미래에 지급해야 할 부채의 시기와 성격에 맞추어 자산을 운용하는 관리 체계다. 수익률만 보는 것이 아니라 부채와의 궁합을 함께 본다.",
    example: "20년 뒤 보험금 지급이 집중되는 보험사가 장기채권 비중을 늘려 부채와 만기 구조를 맞춘다.",
    confusedWith: "일반적인 자산배분이 수익과 위험만 고려한다면, ALM은 부채의 금리 민감도와 지급 일정까지 함께 고려한다는 점이 다르다.",
    relatedPages: [
      { label: "헤지펀드 가이드", path: "/guide" },
      { label: "자본 배분 프로세스", path: "/process/allocation" }
    ]
  },
  {
    id: "capital-efficiency",
    nameKo: "자본 효율성",
    nameEn: "Capital Efficiency",
    definition: "같은 자본으로 더 많은 투자 목적을 달성하도록 자본의 활용도를 높이는 것을 말한다. 파생상품 등을 이용하면 적은 증거금으로 원하는 노출을 확보하고 남는 자본을 다른 곳에 쓸 수 있다.",
    example: "주가지수 선물을 이용해 자본 20억 원으로 100억 원 규모의 주식 노출을 확보하고, 남은 80억 원을 별도 전략에 투자한다.",
    confusedWith: "레버리지와 겹쳐 보이지만, 자본 효율성은 위험을 키우는 것 자체가 목적이 아니라 한정된 자본을 낭비 없이 쓰는 관점이라는 점이 다르다.",
    relatedPages: [
      { label: "헤지펀드 가이드", path: "/guide" },
      { label: "자본 배분 프로세스", path: "/process/allocation" }
    ]
  },
  {
    id: "portable-alpha-term",
    nameKo: "포터블 알파",
    nameEn: "Portable Alpha",
    definition: "선물 등 파생상품으로 시장 수익(베타)을 적은 자본으로 확보하고, 남는 자본을 시장과 무관한 알파 전략에 투자해 두 수익을 합치는 구조다. 시장 수익을 포기하지 않으면서 알파를 얹는 방식이다.",
    example: "주가지수 선물로 주식시장 노출을 유지하면서, 남은 현금으로 시장중립 헤지펀드에 투자해 지수 수익에 알파를 더한다.",
    confusedWith: "단순 헤지펀드 투자가 주식 비중을 줄여서 들어가는 것이라면, 포터블 알파는 시장 노출을 그대로 둔 채 그 위에 알파를 추가한다는 점이 다르다.",
    relatedPages: [
      { label: "헤지펀드 가이드", path: "/guide" },
      { label: "주식 시장중립 전략", path: "/strategies/equity-market-neutral" }
    ]
  },
  {
    id: "nav",
    nameKo: "순자산가치(NAV)",
    nameEn: "NAV (Net Asset Value)",
    definition: "펀드가 보유한 자산의 평가액에서 부채를 뺀 순수한 가치로, 보통 1좌당 금액으로 표시한다. 펀드 투자와 환매의 기준이 되는 가격이다.",
    example: "자산 1,050억 원에서 부채 50억 원을 뺀 1,000억 원을 총 100만 좌로 나누면 좌당 NAV는 10만 원이다.",
    confusedWith: "운용자산 규모(AUM)가 펀드가 굴리는 돈의 총량을 말한다면, NAV는 부채를 뺀 좌당 가치라는 점에서 구분된다.",
    relatedPages: [
      { label: "헤지펀드 가이드", path: "/guide" }
    ]
  },
  {
    id: "pass-through-fee",
    nameKo: "패스스루 수수료",
    nameEn: "Pass-through Fee",
    definition: "고정 비율의 관리보수 대신, 인건비와 인프라 등 운용에 든 실제 비용을 투자자에게 그대로 청구하는 수수료 방식이다. 대형 멀티매니저 펀드에서 널리 쓰인다.",
    example: "관리보수 2% 대신 실제 비용을 청구하는 펀드에서, 인재 영입이 많았던 해에는 비용이 자산의 5%에 달했다.",
    confusedWith: "전통적인 1~2% 고정 관리보수와 달리, 패스스루는 실제 지출에 따라 해마다 수수료 부담이 크게 달라진다는 점이 다르다.",
    relatedPages: [
      { label: "멀티스트래티지 전략", path: "/strategies/multi-strategy" },
      { label: "헤지펀드 가이드", path: "/guide" }
    ]
  },
  {
    id: "sma-term",
    nameKo: "별도관리계좌(SMA)",
    nameEn: "SMA (Separately Managed Account)",
    definition: "여러 투자자의 돈이 섞이는 펀드와 달리, 투자자 명의의 계좌에서 운용사가 맞춤형으로 운용하는 방식이다. 자산 소유권과 보유 내역의 투명성이 투자자에게 있다.",
    example: "한 보험사가 운용사와 SMA 계약을 맺고, 자사 계좌에서 투자 가이드라인을 직접 지정하며 보유 내역을 매일 확인한다.",
    confusedWith: "여러 투자자가 함께 들어가는 공동 펀드와 달리, SMA는 자산이 투자자 명의로 분리되어 통제권과 투명성이 훨씬 크다는 점이 다르다.",
    relatedPages: [
      { label: "헤지펀드 가이드", path: "/guide" },
      { label: "자본 배분 프로세스", path: "/process/allocation" }
    ]
  },
  {
    id: "vol-arb-term",
    nameKo: "변동성 차익거래",
    nameEn: "Volatility Arbitrage",
    definition: "옵션 가격에 반영된 예상 변동성(내재변동성)과 실제로 나타나는 변동성의 차이에서 수익을 얻는 전략이다. 가격의 방향이 아니라 출렁임의 크기에 베팅한다.",
    example: "옵션시장이 예상 변동성을 연 30%로 비싸게 반영하고 있을 때 옵션을 팔고, 실제 변동성이 20%에 그치면 그 차이만큼 수익이 난다.",
    confusedWith: "테일 리스크 헤지가 위기에 대비해 변동성을 사두는 전략이라면, 변동성 차익거래는 비싼 변동성을 파는 경우가 많아 방향이 반대일 수 있다.",
    relatedPages: [
      { label: "변동성 차익거래 전략", path: "/strategies/vol-arb" },
      { label: "디스퍼전 전략", path: "/strategies/dispersion" }
    ]
  }
];
