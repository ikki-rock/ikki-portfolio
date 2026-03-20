"use server";

import { createClient } from "@/lib/supabase";
import { headers } from "next/headers";

export async function logVisit(path: string, visitorId: string) {
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

    // 3. DB 저장
    const supabase = await createClient();

    await supabase.from("page_visits").insert({
      page_path: path,
      // 실제 IP 대신 브라우저에서 발급한 무작위 ID를 저장
      visitor_id: visitorId,
    });
  } catch (error) {
    console.error("Analytics logging failed:", error);
  }
}
