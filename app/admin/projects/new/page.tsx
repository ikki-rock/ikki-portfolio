import { createProject } from "@/app/admin/projects/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewProjectPage() {
  return (
    <div className="p-10 min-h-screen flex flex-col gap-10">
      <h1 className="text-xl font-bold tracking-tighter text-foreground">
        Add New Project
      </h1>

      <form
        action={createProject}
        className="flex flex-col gap-2 max-w-[64rem] text-foreground"
      >
        {/* 기본 텍스트 필드들 */}
        <Input name="title" className="h-10" placeholder="프로젝트 제목" />
        <Input name="disc" className="h-10" placeholder="프로젝트 설명" />
        <Input name="link" className="h-10" placeholder="클릭 시 이동할 링크" />

        <Input name="role" className="h-10" placeholder="역할" />
        <Input name="thumbnail" className="h-10" placeholder="이미지 업로드" />

        {/* mode(유니온 타입) */}
        <Input name="mode" className="h-10" placeholder="모드" />

        {/* tags(배열 타입) */}
        <Input name="tags" className="h-10" placeholder="기술 태그" />

        <Button type="submit" className="mt-4">
          프로젝트 생성하기
        </Button>
      </form>
    </div>
  );
}
