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

## 🏗️ 폴더 구조 (Forder-Structure)

- 기본적으로 co-location을 지키되, 두 곳 이상에서 쓰이는 actions나 components는 해당 바깥 폴더로 뺍니다.

```
.
├── app/          # Next.js App Router (Server Components / Page Routing)
├── components/   # UI 재사용을 위한 공통 컴포넌트 및 클라이언트 페이지 로직
├── lib/          # Supabase Client SDK 설정 및 공용 util 함수
├── actions/      # 서버 전용 데이터 페칭 로직 및 서버 액션
├── types/        # TypeScript 인터페이스 및 타입 정의 전용 폴더
└── public/       # 이미지, 폰트 등 정적 자원 관리


```
