# 🌿 YOO PORTFOLIO

> "단순함을 지향하는 프론트엔드 개발자 Yoo입니다. 종종 삐딱한 감성을 웹으로 시도합니다."

🔗 **Live Demo** [https://ikki-portfolio.vercel.app](https://ikki-portfolio.vercel.app)

---

## 🚀 Tech Stack

- **Core**: Next.js 15+ (app router), TypeScript
- **Style**: Tailwind CSS v4
- **Backend**: Supabase (Database, Auth)
- **Test**: Vitest (TDD Approach)
- **Deploy**: Vercel

---

## 🏗️ Design System & Engineering

이 프로젝트는 단순한 구현을 넘어 **지속 가능한 구조**를 설계하는 데 집중합니다.

### 1. 하이브리드 데이터 페칭 (Server-Client Hybrid)

- Security: NEXT*PUBLIC* 접두사를 제거한 서버 전용 환경 변수를 사용하여 Supabase API Key 노출을 원천 차단.

- Performance: 서버 컴포넌트에서 데이터를 Prefetch하여 초기 로딩 시 '깜빡임(LCP)' 현상을 제거하고, 클라이언트 컴포넌트에서 Hydration을 통해 인터랙션을 부여하는 최적화된 흐름 설계.

### 2. 폴더 구조 (Forder-Structure)

```
.
├── app/          # Next.js App Router (Server Components / Page Routing)
├── components/   # UI 재사용을 위한 공통 컴포넌트 및 클라이언트 페이지 로직
├── hooks/        # UI 인터랙션 및 재사용 가능한 클라이언트 사이드 로직
├── lib/          # Supabase Client SDK 설정 및 서버 전용 데이터 페칭 로직
├── providers/    # 전역 테마(Theme) 및 상태 관리를 위한 Context Providers
├── types/        # TypeScript 인터페이스 및 타입 정의 전용 폴더
└── public/       # 이미지, 폰트 등 정적 자원 관리


```

### 3. 디자인 시스템 (Design System)

- Color: 'The Architect(Yoo)'와 'The Rebel(Ikki)' 두 테마를 위한 시맨틱 컬러 팔레트 구축.

- Design Tokens: Tailwind v4의 @theme 기능을 활용, 모드 전환 시 CSS 변수(--primary, --background)만 교체하는 효율적인 스위칭 구조.

---

## 📅 로드맵 (Roadmap)

- [x] Step 1. 파운데이션 정의: 컬러, 타이포, 간격 규칙 수립 및 8pt Grid 시스템 적용

- [x] Step 2. 디자인 토큰 추출: Tailwind v4 @theme 기반 시맨틱 변수 설정

- [x] Step 3. 전역 레이아웃 구성: Header, Main, Footer 및 Scroll-snap 기반 뼈대 작업

- [x] Step 4. 하이브리드 데이터 연동: 서버 컴포넌트 기반 Supabase 페칭 및 보안(API Key 은닉) 강화

- [x] Step 5. 클라이언트 안정성 확보: AbortController 등을 활용한 비동기 로직 클린업 및 에러 핸들링 구현

- [ ] Step 6. TDD 기반 로직 고도화 (진행 중): Vitest를 활용하여 테마 스위칭 및 프로젝트 필터링 로직에 Red-Green-Refactor 사이클 도입 시도

- [ ] Step 7. 인터랙션 디테일: Framer Motion을 활용한 프로젝트 카드 및 테마 전환 애니메이션 최적화

---

## 🧪 Test Strategy (TDD)

실무에서 접하기 어려웠던 TDD(Test-Driven Development) 프로세스를 프로젝트 전반에 이식. 단순한 코드 작성을 넘어 설계 단계부터의 개발 리듬 확보 및 안정성 검증에 집중함.

- Red-Green-Refactor 사이클 체득: 이론적인 개념을 실제 UI 구현 및 상태 관리 로직에 투입. 실패하는 테스트(Red)부터 리팩토링까지의 단계별 흐름을 직접 수행하며 개발 리듬감 확보.

- 실전적 도입 범위 탐색: 모든 요소에 대한 기계적 테스트가 아닌, 실질적인 확신이 필요한 구간을 식별. 생산성과 안정성 사이의 균형점을 찾아 향후 프로젝트의 표준 가이드라인으로 활용.
