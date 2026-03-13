# 🌿 YOO PORTFOLIO

> "단순함과 TDD를 지향하는 프론트엔드 개발자 Yoo입니다. 종종 삐딱한 감성을 웹으로 시도합니다."

🔗 **Live Demo** [https://ikki-portfolio.vercel.app](https://ikki-portfolio.vercel.app)

---

## 🚀 Tech Stack

- **Core**: Next.js 15+, TypeScript
- **Style**: Tailwind CSS v4
- **Backend**: Supabase (Database, Auth)
- **Test**: Vitest (TDD Approach)
- **Deploy**: Vercel

---

## 🏗️ Design System & Engineering

이 프로젝트는 단순한 구현을 넘어 **지속 가능한 구조**를 설계하는 데 집중합니다.

### 1. 파운데이션 정의 (Foundations)

- **Color**: '신뢰(Trust)'와 '이끼(Ikki)' 두 가지 테마를 위한 컬러 팔레트 구축.
- **Spacing**: 8pt Grid 시스템을 적용하여 4/8배수 기반의 일관된 여백 관리.
- **Typography**: 가독성을 고려한 Pretendard 폰트 및 8단위 기반 사이즈 규격화.

### 2. 디자인 토큰 추출 (Design Tokens)

- Tailwind v4의 `@theme` 기능을 활용하여 CSS 변수와 시스템 클래스를 일대일 매칭.
- 모드 전환 시 시맨틱 변수(`--primary`, `--background`)만 교체하는 효율적인 테마 스위칭 구조 설계.

---

## 📅 진행 단계 (Roadmap)

- [x] **Step 1. 파운데이션 정의**: 컬러, 타이포, 간격 규칙 수립
- [x] **Step 2. 디자인 토큰 추출**: 규칙 기반 코드 변수(Tokens) 설정
- [x] **Step 3. 전역 레이아웃 구성**: Header, Main, Footer 뼈대 작업
- [ ] **Step 4. 핵심 기능 구현**: 모드 전환(Theme Toggle) 로직 및 TDD 기반 컴포넌트 개발 (진행중)
- [ ] **Step 5. 데이터 연동**: Supabase를 통한 프로젝트 목록 동적 렌더링

---

## 🧪 Test Strategy (TDD)

- 모든 원자(Atom) 컴포넌트는 Vitest를 통해 **Red-Green-Refactor** 사이클을 거쳐 개발
- 실무에서 부족했던 테스트 코드 경험을 보완하며 견고한 UI 컴포넌트를 지향
- 단순 포트폴리오사이트 구축에는 오버 엔지니어링일 수 있으나 TDD를 체계적으로 연습하기 위해 채택
