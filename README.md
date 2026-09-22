# Global Investment Playbook

글로벌 헤지펀드에서 찾는 보험사 투자 프로세스의 진화 — 한화생명 투자 임직원용 리서치 도구.

투자 프로세스 벤치마킹을 위한 내부 리서치 웹앱입니다. 헤지펀드 매수 추천 페이지가 아니며,
모든 성과 수치에는 기간·펀드명·수수료 기준·출처·검증일이 붙습니다.

**배포:** https://zmdkdzm1-collab.github.io/hedge-fund/

## 실행 방법

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 타입 체크 + 프로덕션 빌드 (dist/)
```

Node.js 18+ 필요. (이 PC에는 `C:\Users\infomax\.claude\tools\node-v20.18.0-win-x64` 포터블 설치본 사용)

## 구현된 기능

- **투자 프로세스 지도(홈)** — 8단계 순환 프로세스, 클릭 시 우측 상세 패널, 탐색 모드(프로세스별/전략별/운용사별), URL 상태 보존(`?mode=&step=`)
- **프로세스 상세** — 정의/문제/작동순서(설명용 표시)/참여자/입출력/운용사 사례(상태 라벨)/강점·실패조건/한화생명 적용/지표/출처
- **투자전략 탐색** — 투자전략 16종(상·하위 구분)과 운용방식·투자구조·기술 분류를 별도 탭으로 분리, 카드 라벨로 구분
- **전략 상세** — 30초 설명, 작동 방식+가상 사례(표시), 수익 원천, 실패 조건, 사용 운용사(대표/일부), 검증된 성과, 한화생명 참고(직접 적용/프로세스 참고 분리)
- **전략의 진화** — 2010~현재 5개 구간, 상단(전략)/하단(실행을 바꾼 기술) 2줄 구성, 확산·재부상·발전 구분, 최근 주목 전략·프로세스 섹션(자금 유입 근거 기반)
- **운용사 라이브러리** — 14개사, 자료 한정 표시, 데이터 주의(Citadel≠Citadel Securities, Pure Alpha≠All Weather, Medallion≠외부 펀드 등), 관심 저장(localStorage)
- **성과 비교** — 연간/YTD/장기·누적/검증 대기 탭 분리, 필터(연도·전략·운용사·수수료·자료유형·통화) URL 보존, 동일 기간 막대 차트, 최대 3개 펀드 비교(조건 차이 경고 포함), CSV 다운로드, 인쇄 스타일
- **한화생명 적용 가이드** — 업무 단계별·역할별 필터, 8개 과제 카드(9개 필드), 적용 방식 라벨(프로세스 참고/수정 필요/적합성 검토)
- **용어·출처** — 용어 39개(쉬운 정의·예시·혼동 주의), 본문 클릭형 툴팁(키보드·모바일 지원), 전체 출처 표(확인일 포함)
- **통합 검색** — 전략·운용사·프로세스·용어·펀드 한글/영문 검색

## 검증한 데이터 범위 (확인일 2026-09-22)

- **2025년 연간 성과 23건** — Reuters(재게시본)·Fortune·Man Group plc 공식 실적자료·PSH 공식 NAV 보고서 원문 확인
  - 공식: PSH +20.9%, Man AHL Alpha +5.5%, Man EDA +9.7% 등 Man 5개 상품
  - 보도: Citadel Wellington +10.2%, Millennium +10.5%, Pure Alpha II +34% 등
- **연도별 성과** — PSH 2021~2025(공식), Citadel Wellington 2022, AQR Helix 2022~2023(보도)
- **운용사 사실관계** — 14개사 공식 사이트 확인(Citadel 은 접근 제한 → 보도 기준으로 표시), 현 경영진·AUM·기준일 기록
- **타임라인 근거** — 시대별 확산·재부상 주장 20건 출처 확인 (행동주의 2014 캠페인 집계, 2022 SG CTA 지수, HFR 2025 자금 유입 등)

## 추가 확인이 필요한 자료 (앱에서 '검증 대기'로 분리됨)

- D. E. Shaw Composite 설정 이후 연환산(~12.9% net) — 원문 미확인
- TCI 2022년(-18%), 2025년 수치의 소수점 정밀도(FT 원문 미확인, '약 +27%' 권장)
- Bridgewater Pure Alpha 2026 상반기(+8.1%), 변동성 클래스(18% vol) 명시 여부
- Two Sigma 현 리더십(2026-03 Co-CEO 사임 이후 체제), Elliott·Third Point·RIEF 연간 성과
- 2025~26 행동주의 '부활' 근거 — 미확보로 '확인 필요' 표시

## 콘텐츠·수익률 수정 위치

| 내용 | 파일 |
|---|---|
| 성과 수치 | `src/data/performanceRecords.ts` |
| 출처(확인일 포함) | `src/data/sources.ts` |
| 운용사 | `src/data/managers.ts` |
| 펀드·프로그램 | `src/data/funds.ts` |
| 투자전략 | `src/data/strategies.ts` |
| 운용방식·구조·기술 | `src/data/operatingModels.ts` |
| 8단계 프로세스 | `src/data/processes.ts` |
| 타임라인·최근 주목 | `src/data/timeline.ts` |
| 적용 가이드 | `src/data/applicationGuides.ts` |
| 용어집 | `src/data/glossary.ts` |
| 마지막 검증일 | `src/lib/constants.ts` |

타입 정의는 `src/types.ts`. 모르는 값은 `null`(결측 수익률을 0%로 취급하지 않음),
검증되지 않은 수치는 `verificationStatus: "pending"`으로 저장하면 기본 표·차트에서 자동 제외됩니다.

## 배포

```bash
GHPAGES=1 npm run build   # base=/hedge-fund/ 로 빌드
# dist/ 를 gh-pages 브랜치로 푸시 (404.html = index.html 복사로 SPA 딥링크 지원)
```
