"use client";
import Image from "next/image";
import { Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/types/project";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface ProjectItemProps {
  project: Project;
  className?: string;
}

export default function ProjectItem({ project, className }: ProjectItemProps) {
  const { id, title, mode, desc, tags, role, thumbnail, updated_at } = project;

  return (
    <Link href={`/admin/projects/${id}/edit`} className="block h-full group">
      <Card
        className={cn(
          "group overflow-hidden border-2 transition-all hover:border-foreground/20 hover:shadow-lg h-full flex flex-col cursor-pointer",
          className,
        )}
      >
        {/* 🖼️ 1. 썸네일 섹션 (16:9 비율 고정) */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted border-b">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-muted-foreground/50 uppercase italic bg-secondary/30">
              No Preview Image 🐹
            </div>
          )}

          {/* 🏷️ Mode 배지 (yoo/ikki 구별) */}
          <div
            className={cn(
              "absolute top-3 left-3 px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-tighter shadow-sm border",
              mode === "yoo"
                ? "bg-blue-500 text-white border-blue-600"
                : "bg-green-500 text-white border-green-600",
            )}
          >
            {mode}
          </div>
        </div>

        {/* 📝 2. 정보 섹션 */}
        <CardHeader className="p-4 space-y-1 flex-1">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-base font-black leading-tight truncate uppercase italic group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <div className="p-1.5 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-foreground">
                <Edit2 size={14} />
              </div>
            </div>
          </div>
          <CardDescription className="line-clamp-2 text-[11px] leading-relaxed min-h-[32px]">
            {desc || "설명이 아직 비어있어, 이끼야! 😤"}
          </CardDescription>
        </CardHeader>

        {/* 🛠️ 3. 하단 메타 데이터 */}
        <CardContent className="p-4 pt-0 space-y-3">
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-bold px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded-sm uppercase tracking-tighter"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-dashed">
            <span className="text-[10px] font-medium text-muted-foreground uppercase">
              {role}
            </span>
            <span className="text-[9px] text-muted-foreground/60">
              {new Date(updated_at).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
