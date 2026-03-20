import Link from "next/link"; // 🔴 이동을 위해 Link 임포트
import { fetchProjects } from "@/actions/projects";

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="p-10 min-h-screen text-white flex flex-col gap-10">
      {/* 헤더 영역과 추가 버튼 */}
      <div className="flex justify-between items-end border-b-[12px] border-white pb-6">
        <h1 className="text-3xl tracking-tighter uppercase leading-[0.8]">
          PROJECTS ARCHIVE
        </h1>

        {/* 🔴 이게 바로 그 '누를 거'야! */}
        <Link
          href="/admin/projects/new"
          className="text-2xl uppercase px-8 py-4 mb-4"
        >
          ADD NEW +
        </Link>
      </div>

      {/* 프로젝트 리스트 */}
      <div className="grid gap-4">
        {projects.length === 0 ? (
          <p className="text-2xl font-bold opacity-30  uppercase">
            No projects found. Add your first work.
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="group border-b-2 border-white/20 py-8 transition-colors"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl uppercase ">{project.title}</h2>
                <span className="text-xl font-mono opacity-50 uppercase tracking-widest">
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
