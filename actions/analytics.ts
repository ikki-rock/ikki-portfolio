import { createClient } from "@/lib/supabase";
import { headers } from "next/headers";

// actions/analytics.ts
export async function logVisit(path: string) {
  const headerList = await headers();
  const userAgent = headerList.get("user-agent")?.toLowerCase() || "";

  // [수비] 봇이나 크롤러 단어가 포함되어 있으면 미저장
  const botKeywords = ["bot", "crawler", "spider", "lighthouse", "slurp"];
  if (botKeywords.some((keyword) => userAgent.includes(keyword))) {
    return;
  }

  const supabase = await createClient();
  const ip = headerList.get("x-forwarded-for") || "unknown";

  await supabase.from("page_visits").insert({
    page_path: path,
    ip_address: ip,
  });
}
