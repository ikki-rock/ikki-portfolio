import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
  compact?: boolean;
}

export default function ProjectCard({
  project,
  className,
  compact = false,
}: ProjectCardProps) {
  const Wrapper = project.link ? Link : "div";

  return (
    <Wrapper
      href={project.link || "#"}
      target={project.link ? "_blank" : undefined}
      rel={project.link ? "noopener noreferrer" : undefined}
      className={cn(
        "flex flex-col group transition-all",
        project.link ? "cursor-pointer" : "cursor-default",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full bg-neutral-100 rounded-sm border border-accent/10 mb-6 overflow-hidden transition-all duration-500 group-hover:border-accent/50",
          compact
            ? "aspect-video"
            : "max-h-[55dvh] aspect-[4/5] flex items-center justify-center",
        )}
      >
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
            <span className="text-4xl md:text-5xl font-black italic tracking-tighter">
              WIP
            </span>
            <span className="text-[10px] font-mono mt-2 uppercase tracking-[0.2em]">
              Under Construction
            </span>
          </div>
        )}

        {project.link && (
          <>
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-accent font-mono text-xs opacity-60">
          0{project.id} — {project.role}
        </span>
        <h4 className="text-2xl font-bold mt-2 group-hover:text-accent transition-colors duration-300 truncate">
          {project.title}
        </h4>
        <p
          className={cn(
            "text-foreground/60 mt-2 text-sm leading-relaxed",
            compact ? "line-clamp-2" : "max-w-[90%]",
          )}
        >
          {project.desc}
        </p>
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
}
