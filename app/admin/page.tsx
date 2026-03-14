import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminHome() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">관리자 대시보드</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* 프로젝트 관리 카드 */}
        <Card>
          <CardHeader>
            <CardTitle>프로젝트 관리</CardTitle>
            <CardDescription>
              현재 5개의 프로젝트가 등록되어 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">프로젝트 추가하기</Button>
          </CardContent>
        </Card>

        {/* 금자 체중 관리 카드 */}
        <Card>
          <CardHeader>
            <CardTitle> 상태</CardTitle>
            <CardDescription>최근 기록: - </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              기록하기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
