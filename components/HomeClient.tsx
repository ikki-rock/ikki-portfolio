"use client";

import Footer from "@/components/layout/Footer";
import HeroCover from "@/components/home/HeroCover";
import ProjectCarousel from "@/components/home/ProjectCarousel";
import { Project } from "@/types/project";

interface Props {
  initialProjects: Project[];
}

export default function HomeClient({ initialProjects }: Props) {
  return (
    <main className="snap-y snap-mandatory h-dvh overscroll-behavior-y-contain overflow-y-auto">
      <HeroCover />

      {/* Projects: 모바일·데스크톱 공통 캐러셀 */}
      <section className="h-dvh snap-start snap-always w-full overflow-hidden flex items-center py-16 md:py-0">
        <div className="mx-auto max-w-[64rem] px-md w-full">
          <ProjectCarousel projects={initialProjects} />
        </div>
      </section>

      <section className="h-dvh snap-start snap-always flex items-center justify-center">
        <Footer />
      </section>
    </main>
  );
}
