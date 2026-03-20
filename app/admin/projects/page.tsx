import Link from "next/link"; // 🔴 이동을 위해 Link 임포트
import { fetchProjects } from "@/actions/projects";
import ProjectItem from "../_components/ProjectItem";

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="min-h-screen flex flex-col gap-10">
      {/* 헤더 영역과 추가 버튼 */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl tracking-tighter font-bold">프로젝트 리스트</h1>
        <Link
          href="/admin/projects/new"
          className="fixed right-8 text-2xl uppercase hover:underline underline-offset-4"
        >
          ADD NEW +
        </Link>
      </div>

      {/* 프로젝트 리스트 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <p className="text-2xl font-bold opacity-30  uppercase">
            No projects found. Add your first work.
          </p>
        ) : (
          projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}
