"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { logVisit } from "@/actions/analytics";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // 개발 모드만 제외
    if (process.env.NODE_ENV === "development") return;

    // 관리자가 직접 접속했을 때를 위해 로컬스토리지 체크는 남겨두기
    if (localStorage.getItem("admin_ignore") === "true") return;

    logVisit(pathname);
  }, [pathname]);

  return null;
}
