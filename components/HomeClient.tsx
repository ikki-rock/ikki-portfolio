"use client";

import Footer from "@/components/layout/Footer";
import HeroCover from "@/components/home/HeroCover";
import ProjectCard from "@/components/home/ProjectCard";
import ProjectCarousel from "@/components/home/ProjectCarousel";
import { Project } from "@/types/project";

interface Props {
  initialProjects: Project[];
}

export default function HomeClient({ initialProjects }: Props) {
  return (
    <main className="snap-y snap-mandatory h-dvh overscroll-behavior-y-contain overflow-y-auto">
      <HeroCover />

      {/* section 2: Projects */}
      <section className="min-h-dvh md:h-dvh md:snap-start md:snap-always w-full py-20 md:py-0 md:overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="mx-auto max-w-[64rem] px-md h-full md:flex md:items-center">
          {/* Mobile: 세로 스냅 그리드 */}
          <div className="grid grid-cols-1 gap-y-0 md:hidden">
            {initialProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                className="h-dvh snap-start snap-always flex flex-col justify-center"
              />
            ))}
          </div>

          {/* Desktop: 좌우 슬라이드 캐러셀 (3개 초과 시 화살표 활성) */}
          <ProjectCarousel projects={initialProjects} />
        </div>
      </section>

      {/* section 3: Footer */}
      <section className="h-dvh snap-start snap-always flex items-center justify-center">
        <Footer />
      </section>
    </main>
  );
}
