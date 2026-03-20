import Link from "next/link";
import ProjectForm from "../../_components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="p-10 min-h-screen flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl  tracking-tighter uppercase ">
          프로젝트 추가하기
        </h1>
        <Link
          href="/admin/projects"
          className="text-xs hover:underline opacity-50 font-mono"
        >
          ← CANCEL & BACK
        </Link>
      </div>
      <ProjectForm />
    </div>
  );
}
