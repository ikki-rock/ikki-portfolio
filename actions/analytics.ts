"use server";
import { createClient } from "@/lib/supabase";
import { headers } from "next/headers";

// actions/analytics.ts
export async function logVisit(path: string) {
  try {
    const headerList = await headers();
    const userAgent = headerList.get("user-agent")?.toLowerCase() || "";

    // 1. 봇 및 크롤러 필터링
    const botKeywords = [
      "bot",
      "crawler",
      "spider",
      "lighthouse",
      "slurp",
      "headless",
      "facebookexternalhit",
      "whatsapp",
    ];
    if (botKeywords.some((keyword) => userAgent.includes(keyword))) return;

    // 2. 정적 파일 및 시스템 경로 필터링
    const ignorePaths = ["/favicon.ico", "/robots.txt", "/sitemap.xml"];
    const ignoreExtensions = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".map"];

    if (
      ignorePaths.includes(path) ||
      ignoreExtensions.some((ext) => path.endsWith(ext))
    )
      return;

    // DB 저장
    const supabase = await createClient();
    const ip = headerList.get("x-forwarded-for") || "unknown";

    await supabase.from("page_visits").insert({
      page_path: path,
      ip_address: ip,
    });
  } catch (error) {
    // 분석 로깅 실패가 서비스 전체 에러로 이어지지 않게 조용히 처리
    console.error("Analytics logging failed:", error);
  }
}
