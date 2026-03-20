// actions/analytics.ts (새로 생성)
"use server";

import { createClient } from "@/lib/supabase";
import { headers } from "next/headers";

export async function logVisit(path: string) {
  const supabase = await createClient();
  const headerList = await headers();

  // 접속자의 IP 주소 가져오기 (Vercel 환경 등에서 작동)
  const ip = headerList.get("x-forwarded-for") || "unknown";

  // 🥊 DB에 저장
  await supabase.from("page_visits").insert({
    page_path: path,
    ip_address: ip,
  });
}
