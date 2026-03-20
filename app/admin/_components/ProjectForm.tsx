"use client";

import { useState, useRef } from "react";
import { createProject, updateProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ImagePlus, X } from "lucide-react";
import { Project } from "@/types/project";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectFormProps {
  initialData?: Project;
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const [preview, setPreview] = useState<string | null>(
    initialData?.thumbnail || null,
  );
  const [mode, setMode] = useState(initialData?.mode || "yoo");

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 수정 모드인지 확인
  const isEditMode = !!initialData; // !!는 boolean으로 나타낼때.

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // 5MB 용량 체크 (5 * 1024 * 1024 bytes)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB를 넘을 수 없어! ");
        if (fileInputRef.current) fileInputRef.current.value = "";
        setPreview(null);
        return;
      }

      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  //   프로젝트 추가 래퍼 일반 함수
  async function handleSubmit(formData: FormData) {
    let result;
    if (isEditMode && initialData) {
      //수정 모드
      result = await updateProject(initialData.id, formData);
    } else {
      // 생성 모드
      result = await createProject(formData);
    }

    if (result.success) {
      alert(isEditMode ? "프로젝트 수정 성공!" : "프로젝트 추가 성공!");
      router.push("/admin/projects");
      router.refresh();
    } else {
      alert(`실패! ${result.error}`);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col gap-6 max-w-2xl text-foreground"
    >
      {/* 이미지 업로드 섹션 */}
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-widest opacity-60">
          Thumbnail (Max 5MB)
        </label>
        <div
          className="relative group border-2 border-dashed border-muted-foreground/20 rounded-xl overflow-hidden hover:border-primary/50 transition-colors bg-accent/5"
          style={{ aspectRatio: "16 / 9" }}
        >
          {preview ? (
            <>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
              <ImagePlus className="w-10 h-10 mb-2 opacity-20" />
              <span className="text-sm opacity-40">
                이미지를 선택하거나 드래그하세요
              </span>
              <span className="text-[10px] mt-1 opacity-30 text-destructive font-bold">
                ONLY JPG, PNG, WEBP (MAX 5MB)
              </span>
              <input
                type="file"
                name="thumbnail"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </label>
          )}
        </div>
      </div>

      {/* 텍스트 필드 그룹 */}
      <div className="grid gap-4">
        <div className="space-y-1">
          <Input
            name="title"
            defaultValue={initialData?.title}
            className="h-12 text-lg font-medium"
            placeholder="프로젝트 제목"
            required
          />
        </div>

        <div className="space-y-1">
          <Input
            name="desc"
            defaultValue={initialData?.desc}
            className="h-12"
            placeholder="프로젝트 설명 (간략히)"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            name="role"
            defaultValue={initialData?.role}
            placeholder="역할 (예: UI/UX Design)"
          />
          <Select
            defaultValue={mode}
            onValueChange={(value: string) => setMode(value as "yoo" | "ikki")}
          >
            <SelectTrigger className="h-12 uppercase border-2">
              {" "}
              {/* 1. 클릭하는 버튼 */}
              <SelectValue placeholder="SELECT MODE" />{" "}
              {/* 2. 지금 뭐가 선택됐는지 보여주는 글자 */}
            </SelectTrigger>
            <SelectContent>
              {" "}
              {/* 3. 펼쳐지는 박스 */}
              <SelectItem value="yoo">YOO</SelectItem>
              <SelectItem value="ikki">IKKI</SelectItem>
            </SelectContent>
          </Select>
          {/* 이 hidden input이 있어야 createProject(formData)에서 'mode'를 읽을 수 있음 */}
          <input type="hidden" name="mode" value={mode} />
        </div>

        <Input
          name="link"
          defaultValue={initialData?.link}
          placeholder="프로젝트 연결 링크 (https://...)"
        />

        <div className="space-y-1">
          <Input
            name="tags"
            defaultValue={initialData?.tags?.join(", ")}
            placeholder="기술 태그 (쉼표로 구분: React, Next.js, TS)"
          />
          <p className="text-[10px] opacity-40 ml-1 italic">
            * 쉼표(,)를 기준으로 자동 분리됩니다.
          </p>
        </div>
      </div>

      <Button
        type="submit"
        className="mt-4 h-14 text-lg  uppercase tracking-tighter hover:scale-[1.01] transition-transform cursor-pointer"
      >
        {isEditMode ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
}
