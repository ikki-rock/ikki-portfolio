import ProjectForm from "@/app/admin/_components/ProjectForm";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", Number(id))
    .single();

  // 데이터가 없거나 에러나면 404 페이지로!
  if (error || !project) {
    notFound();
  }
  return (
    <div className="p-10 min-h-screen flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl  tracking-tighter uppercase ">
          프로젝트 수정하기
        </h1>
        <Link
          href="/admin/projects"
          className="text-xs hover:underline opacity-50 font-mono"
        >
          ← CANCEL & BACK
        </Link>
      </div>
      <ProjectForm initialData={project} />
    </div>
  );
}
