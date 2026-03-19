import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDashboardQuickStatus } from "./actions";

export default async function AdminHome() {
  const status = await getDashboardQuickStatus();
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">관리자 대시보드</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* 통계 섹션 */}
        <Card size="default" className="shadow-md">
          <CardHeader>
            <CardTitle className="text-muted-foreground uppercase text-xs">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black italic">{status.projectCount}</p>
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
            <p className="text-3xl font-black italic">{status.visitorCount}</p>
          </CardContent>
        </Card>
        {/* 프로젝트 관리 카드 */}
      </div>
    </div>
  );
}
