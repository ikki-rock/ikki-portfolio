import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDashboardQuickStatus } from "./actions";
import ProjectItem from "./_components/ProjectItem";
import { fetchProjects } from "@/actions/projects";
import Link from "next/link";

export default async function AdminHome() {
  const status = await getDashboardQuickStatus();
  const recentProjects = await fetchProjects(3);
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">관리자 대시보드</h1>

      <div className="flex flex-col gap-8">
        {/* 통계 섹션 */}
        <section>
          <div className="grid gap-6 md:grid-cols-3">
            <Card size="default" className="shadow-md">
              <CardHeader>
                <CardTitle className="text-muted-foreground uppercase text-xs">
                  Total Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black italic">
                  {status.projectCount}
                </p>
              </CardContent>
            </Card>
            <Card size="sm">
              <CardHeader>
                <CardTitle>Last Updated</CardTitle>
                <CardDescription>{status.lastUpdate}</CardDescription>
              </CardHeader>
            </Card>
            <Card size="default" className="shadow-md">
              <CardHeader>
                <CardTitle className="text-muted-foreground uppercase text-xs">
                  People visit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-black italic">
                  {status.visitorCount}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* 프로젝트 리스트 섹션 */}
        <section className="gap-4 flex-col min-h-[50dvh] flex">
          <div className="flex Items-center justify-between">
            <h1>Recent Projects</h1>
            <Link
              href="/admin/projects"
              className="hover:underline underline-offset-4"
            >
              VIEW ALL →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3 flex-1">
            {recentProjects?.length > 0 ? (
              recentProjects.map((project) => (
                <ProjectItem key={project.id} project={project} />
              ))
            ) : (
              <div>아직 등록된 프로젝트가 없습니다.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
