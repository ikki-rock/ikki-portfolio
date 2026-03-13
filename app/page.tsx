"use client";
import Footer from "@/components/layout/Footer";
import { useTheme } from "@/providers/ThemeProvider";
import { useMemo } from "react";
import { ALL_PROJECTS } from "@/constants/projects";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { isIkki } = useTheme();

  // 모드에 따른 프로젝트 필터링 (Rebel vs Architect)
  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => p.mode.includes(isIkki ? "ikki" : "yoo"));
  }, [isIkki]);

  return (
    <main className="snap-y snap-mandatory scroll-smooth h-dvh overscroll-behavior-y-contain overflow-y-auto">
      {/* section 1: Hero Section */}
      <section className="snap-start h-dvh w-full flex flex-col justify-center items-center px-md relative">
        <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter">
          {isIkki ? "IKKI" : "YOO"}
        </h2>
        <p className="mt-4 text-accent font-mono tracking-widest uppercase text-xl">
          {isIkki ? "The Rebel" : "The Architect"}
        </p>
        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-foreground relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-accent animate-scroll-line"></div>
          </div>
        </div>
      </section>

      {/* section 2: Projects Grid */}
      <section className="min-h-dvh md:snap-start w-full py-20 scroll-mt-20">
        <div className="mx-auto max-w-[64rem] px-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-0 md:gap-x-12 md:gap-y-24">
            {filteredProjects?.map((project) => {
              // 링크 여부에 따라 태그 결정
              const Wrapper = project.link ? Link : "div";

              return (
                <Wrapper
                  key={project.id}
                  href={project.link || "#"}
                  target={project.link ? "_blank" : undefined}
                  rel={project.link ? "noopener noreferrer" : undefined}
                  className={`h-dvh md:h-auto snap-start md:snap-none flex flex-col justify-center group transition-all ${
                    project.link ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  {/* 프로젝트 썸네일 영역 */}
                  <div className="relative aspect-[4/5] md:aspect-video bg-neutral-100 rounded-sm border border-accent/10 mb-6 overflow-hidden transition-all duration-500 group-hover:border-accent/50 flex items-center justify-center">
                    {project.thumbnail ? (
                      // 1. 이미지가 있을 때
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      // 2. 이미지가 없을 때 (WIP 플레이스홀더)
                      <div className="flex flex-col items-center opacity-20  transition-opacity">
                        <span className="text-4xl md:text-6xl font-black italic tracking-tighter">
                          WIP
                        </span>
                        <span className="text-[10px] font-mono mt-2 uppercase tracking-[0.2em]">
                          Under Construction
                        </span>
                      </div>
                    )}

                    {/* 호버 오버레이 (링크 있을 때만) */}
                    {project.link && (
                      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
                    )}

                    {/* 링크가 있을 때만 나타나는 Rebel 화살표 */}
                    {project.link && (
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* 프로젝트 정보 */}
                  <div className="flex flex-col">
                    <span className="text-accent font-mono text-xs opacity-60">
                      0{project.id} — {project.role}
                    </span>
                    <h4 className="text-2xl md:text-3xl font-bold mt-2 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-foreground/60 mt-2 text-sm max-w-[90%] leading-relaxed">
                      {project.desc}
                    </p>

                    {/* 기술 스택 태그 */}
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-tighter px-2 py-0.5 border border-accent/20 rounded-sm opacity-50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Wrapper>
              );
            })}
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
