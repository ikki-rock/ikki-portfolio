"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import ProjectCard from "./ProjectCard";

const VISIBLE_COUNT = 3;
const GAP_PX = 48;

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  const canSlide = projects.length > VISIBLE_COUNT;
  const maxIndex = Math.max(0, projects.length - VISIBLE_COUNT);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => {
      const gaps = GAP_PX * (VISIBLE_COUNT - 1);
      setSlideWidth((el.clientWidth - gaps) / VISIBLE_COUNT);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goPrev = () => setIndex((prev) => Math.max(0, prev - 1));
  const goNext = () => setIndex((prev) => Math.min(maxIndex, prev + 1));

  if (projects.length === 0) {
    return (
      <p className="hidden md:block text-sm font-mono uppercase tracking-widest text-foreground/30 text-center py-20">
        No projects yet
      </p>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-3 w-full">
      <button
        type="button"
        onClick={goPrev}
        disabled={!canSlide || index === 0}
        aria-label="이전 프로젝트"
        className={cn(
          "shrink-0 flex items-center justify-center w-10 h-10 rounded-sm border border-accent/20 transition-all hover:border-accent/50 hover:text-accent",
          (!canSlide || index === 0) && "opacity-20 pointer-events-none",
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div ref={viewportRef} className="flex-1 overflow-hidden min-w-0">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            gap: GAP_PX,
            transform:
              slideWidth > 0
                ? `translateX(-${index * (slideWidth + GAP_PX)}px)`
                : undefined,
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="shrink-0"
              style={{ width: slideWidth > 0 ? slideWidth : undefined }}
            >
              <ProjectCard project={project} compact />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={goNext}
        disabled={!canSlide || index >= maxIndex}
        aria-label="다음 프로젝트"
        className={cn(
          "shrink-0 flex items-center justify-center w-10 h-10 rounded-sm border border-accent/20 transition-all hover:border-accent/50 hover:text-accent",
          (!canSlide || index >= maxIndex) && "opacity-20 pointer-events-none",
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
