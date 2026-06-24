"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import ProjectCard from "./ProjectCard";

const SWIPE_THRESHOLD_PX = 48;

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const blockClickRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [gapPx, setGapPx] = useState(16);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const indexRef = useRef(index);
  const maxIndexRef = useRef(0);
  const canSlideRef = useRef(false);
  const dragOffsetRef = useRef(0);

  const canSlide = projects.length > visibleCount;
  const maxIndex = Math.max(0, projects.length - visibleCount);

  indexRef.current = index;
  maxIndexRef.current = maxIndex;
  canSlideRef.current = canSlide;
  dragOffsetRef.current = dragOffset;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const updateBreakpoint = () => {
      const isDesktop = mq.matches;
      setVisibleCount(isDesktop ? 3 : 1);
      setGapPx(isDesktop ? 48 : 16);
    };

    updateBreakpoint();
    mq.addEventListener("change", updateBreakpoint);
    return () => mq.removeEventListener("change", updateBreakpoint);
  }, []);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => {
      const gaps = gapPx * (visibleCount - 1);
      setSlideWidth((el.clientWidth - gaps) / visibleCount);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, gapPx]);

  const goPrev = useCallback(() => {
    setIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((prev) => Math.min(maxIndexRef.current, prev + 1));
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let isHorizontal = false;

    const resetDrag = () => {
      dragOffsetRef.current = 0;
      setDragOffset(0);
      setIsDragging(false);
      isHorizontal = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!canSlideRef.current) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isHorizontal = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!canSlideRef.current) return;

      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      if (!isHorizontal) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        isHorizontal = Math.abs(dx) > Math.abs(dy);
      }

      if (!isHorizontal) return;

      e.preventDefault();
      setIsDragging(true);

      const atStart = indexRef.current === 0;
      const atEnd = indexRef.current >= maxIndexRef.current;
      let offset = dx;
      if ((atStart && dx > 0) || (atEnd && dx < 0)) {
        offset = dx * 0.25;
      }

      dragOffsetRef.current = offset;
      setDragOffset(offset);
    };

    const onTouchEnd = () => {
      if (!isHorizontal) return;

      const offset = dragOffsetRef.current;
      if (Math.abs(offset) > 10) {
        blockClickRef.current = true;
      }

      if (offset < -SWIPE_THRESHOLD_PX) {
        setIndex((prev) => Math.min(maxIndexRef.current, prev + 1));
      } else if (offset > SWIPE_THRESHOLD_PX) {
        setIndex((prev) => Math.max(0, prev - 1));
      }

      resetDrag();
    };

    const onClickCapture = (e: MouseEvent) => {
      if (!blockClickRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      blockClickRef.current = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  const slideStep = slideWidth + gapPx;
  const baseOffset = slideWidth > 0 ? index * slideStep : 0;

  if (projects.length === 0) {
    return (
      <p className="text-sm font-mono uppercase tracking-widest text-foreground/30 text-center py-20 w-full">
        No projects yet
      </p>
    );
  }

  return (
    <div className="flex items-center gap-2 md:gap-3 w-full">
      <button
        type="button"
        onClick={goPrev}
        disabled={!canSlide || index === 0}
        aria-label="이전 프로젝트"
        className={cn(
          "shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-sm border border-accent/20 transition-all hover:border-accent/50 hover:text-accent",
          (!canSlide || index === 0) && "opacity-20 pointer-events-none",
        )}
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <div
        ref={viewportRef}
        className="flex-1 overflow-hidden min-w-0 touch-pan-y"
      >
        <div
          className={cn(
            "flex",
            isDragging
              ? "transition-none"
              : "transition-transform duration-500 ease-out",
          )}
          style={{
            gap: gapPx,
            transform:
              slideWidth > 0
                ? `translateX(${-baseOffset + dragOffset}px)`
                : undefined,
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="shrink-0"
              style={{ width: slideWidth > 0 ? slideWidth : undefined }}
            >
              <ProjectCard project={project} compact={visibleCount > 1} />
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
          "shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-sm border border-accent/20 transition-all hover:border-accent/50 hover:text-accent",
          (!canSlide || index >= maxIndex) && "opacity-20 pointer-events-none",
        )}
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
}
