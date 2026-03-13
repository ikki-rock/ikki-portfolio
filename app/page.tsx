"use client";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/providers/ThemeProvider";
import { useMemo } from "react";

// 프로젝트 정의 (임시)
const ALL_PROJECTS = [
  {
    id: 1,
    title: "Twenty Steps",
    mode: "yoo",
    desc: "Architecture of Logic",
    color: "bg-blue-50",
  },
  {
    id: 2,
    title: "Art Garden",
    mode: "ikki",
    desc: "Artist's Interaction",
    color: "bg-green-50",
  },
  {
    id: 3,
    title: "System Design",
    mode: "yoo",
    desc: "Structured Components",
    color: "bg-gray-50",
  },
  {
    id: 4,
    title: "Dreamscape",
    mode: "ikki",
    desc: "Digital Forest",
    color: "bg-emerald-50",
  },
];

export default function Home() {
  const { isIkki } = useTheme();
  // 모드에 따른 프로젝트 필터링
  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => p.mode === (isIkki ? "ikki" : "yoo"));
  }, [isIkki]);

  return (
    // 전환: scroll snapping
    // 부모: snap-y mandatory로 자석 효과 활성화, 자식: snap-start
    <main className="snap-y snap-mandatory scroll-smooth h-dvh overscroll-behavior-y-contain overflow-y-auto">
      {/* section 1: Hero Section */}
      <section className="snap-start h-dvh w-full flex flex-col justify-center items-center">
        <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter">
          {isIkki ? "IKKI" : "YOO"}
        </h2>
        <p className="mt-4 text-accent font-mono tracking-widest uppercase text-lg">
          {isIkki ? "Artist Mode" : "Developer Mode"}
        </p>
      </section>
      {/* section 2: Projects Grid */}
      <section className="min-h-dvh md:snap-start w-full">
        <div className="mx-auto max-w-[64rem]">
          <h3 className="text-h2 font-bold mb-16 border-b border-accent/10 pb-4">
            Selected Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-0 md:gap-x-12 md:gap-y-24">
            {filteredProjects?.map((project) => (
              <div
                key={project.id}
                // [핵심]
                // 모바일에선 h-screen을 줘서 각 카드가 스냅 단위가 됨.
                // 데스크톱에선 h-auto를 줘서 그리드 안에서 자연스럽게 배치됨.
                className="h-screen md:h-auto snap-start md:snap-none flex flex-col justify-center"
              >
                <div className="aspect-[4/5] md:aspect-video bg-neutral-100 rounded-sm border border-accent/10 mb-6 transition-all hover:border-accent" />
                <span className="text-accent font-mono text-xs">
                  0{project.id}
                </span>
                <h4 className="text-2xl md:text-3xl font-bold mt-2">
                  {project.title}
                </h4>
                <p className="text-neutral-500 mt-2 text-sm">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* section 3: Footer */}
      <section className="h-dvh snap-start flex items-center justify-center">
        <Footer />
      </section>
    </main>
  );
}
