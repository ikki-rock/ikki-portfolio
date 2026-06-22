# 🌿 PORTFOLIO

> "본질 중심의 단순함을 추구하는 개발자입니다."

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

### 1. 하이브리드 데이터 페칭 (Server-Client Hybrid)

- Security: NEXT*PUBLIC* 접두사를 제거한 서버 전용 환경 변수를 사용하여 Supabase API Key 노출을 원천 차단.

- Performance: 서버 컴포넌트에서 데이터를 Prefetch하여 초기 로딩 시 '깜빡임' 현상을 제거하고, 클라이언트 컴포넌트에서 Hydration을 통해 인터랙션을 부여하는 최적화된 흐름 설계.

### 2. 폴더 구조 (Forder-Structure)

- 기본적으로 co-location을 지키되, 두 곳 이상에서 쓰이는 actions나 components는 해당 바깥 폴더로 뺍니다.

```
.
├── app/          # Next.js App Router (Server Components / Page Routing)
├── components/   # UI 재사용을 위한 공통 컴포넌트 및 클라이언트 페이지 로직
├── hooks/        # UI 인터랙션 및 재사용 가능한 클라이언트 사이드 로직
├── lib/          # Supabase Client SDK 설정 및 공용 util 함수
├── actions/          # 서버 전용 데이터 페칭 로직 및 서버 액션
├── providers/    # 전역 테마(Theme) 및 상태 관리를 위한 Context Providers
├── types/        # TypeScript 인터페이스 및 타입 정의 전용 폴더
└── public/       # 이미지, 폰트 등 정적 자원 관리


```

### 3. 디자인 시스템 (Design System)

- Color: 'The Architect(Yoo)'와 'The Rebel(Ikki)' 두 테마를 위한 시맨틱 컬러 팔레트 구축.

- Design Tokens: Tailwind v4의 @theme 기능을 활용, 모드 전환 시 CSS 변수(--primary, --background)만 교체하는 효율적인 스위칭 구조.
