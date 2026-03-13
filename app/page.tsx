import { fetchProjects } from "@/lib/projects";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  // 서버에서 바로 DB 호출 (보안상 안전, 로딩 스피너 필요 없음)
  const allProjects = await fetchProjects();

  return <HomeClient initialProjects={allProjects} />;
}
