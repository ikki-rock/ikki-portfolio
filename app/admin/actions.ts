import { createClient } from "@/lib/supabase";

export type QuickStatus = {
  projectCount: number | string;
  lastUpdate: string;
  visitorCount: number;
};

// TODO: try catch문 & error.tsx 연결
export async function getDashboardQuickStatus(): Promise<QuickStatus> {
  const supabase = await createClient();
  // 1. 세 개의 요청을 동시에 쏜다
  const [projectResult, updateResult] = await Promise.allSettled([
    // 전체 프로젝트 개수 쿼리
    supabase.from("projects").select("*", { count: "exact", head: true }),
    // 마지막 업데이트 날짜 쿼리 (가장 최근 1건)
    supabase
      .from("projects")
      .select("updated_at")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single(),
  ]);

  // 2. 요청 결과 분석
  const projectCount =
    projectResult.status === "fulfilled" && !projectResult.value.error
      ? (projectResult.value.count ?? 0)
      : "-";

  const lastUpdate =
    updateResult.status === "fulfilled" && !updateResult.value.error
      ? updateResult.value.data?.updated_at
      : null;

  // 3. TODO: 방문자수
  const visitorCount = 128;

  return {
    projectCount,
    lastUpdate: lastUpdate
      ? new Date(lastUpdate).toLocaleDateString()
      : "기록 없음",
    visitorCount,
  };
}
