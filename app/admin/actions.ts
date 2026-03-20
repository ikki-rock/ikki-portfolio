"use server";
import { createClient } from "@/lib/supabase";
import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";

export type QuickStatus = {
  projectCount: number | string;
  lastUpdate: string;
  visitorCount: number;
};

const getFulfilledValue = <T>(result: PromiseSettledResult<T>): T | null =>
  result.status === "fulfilled" ? result.value : null;

// TODO: error.tsx 연결
export async function getDashboardQuickStatus(): Promise<QuickStatus> {
  const supabase = await createClient();

  try {
    const results = await Promise.allSettled([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase
        .from("projects")
        .select("updated_at")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single(),
      supabase.from("page_visits").select("visitor_id"),
    ]);

    const projectRes = getFulfilledValue(
      results[0],
    ) as PostgrestResponse<undefined> | null;
    const updateRes = getFulfilledValue(results[1]) as PostgrestSingleResponse<{
      updated_at: string;
    }> | null;
    const visitRes = getFulfilledValue(results[2]) as PostgrestResponse<{
      visitor_id: string;
    }> | null;

    // 데이터 가공
    const projectCount = projectRes?.count ?? 0;
    const lastUpdateRaw = updateRes?.data?.updated_at;

    // [중복 제거 로직]
    // visitRes?.data가 있으면 그 안의 visitor_id들만 뽑아서 Set에 넣음
    const uniqueIPs = new Set((visitRes?.data || []).map((v) => v.visitor_id));
    const uniqueVisitorCount = uniqueIPs.size;

    return {
      projectCount,
      lastUpdate: lastUpdateRaw
        ? new Date(lastUpdateRaw).toLocaleDateString()
        : "기록 없음",
      visitorCount: uniqueVisitorCount,
    };
  } catch (error: unknown) {
    // 네트워크 장애 등 정말 심각한 에러만 여기서 잡음
    console.error("대시보드 로딩 중 예상치 못한 에러 발생", error);
    return {
      projectCount: 0,
      lastUpdate: "확인 불가",
      visitorCount: 0,
    };
  }
}
