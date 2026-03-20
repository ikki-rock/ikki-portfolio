"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { logVisit } from "@/actions/analytics";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // 개발 환경이나 관리자 모드면 기록 안 함
    if (process.env.NODE_ENV === "development") return;
    if (localStorage.getItem("admin_ignore") === "true") return;

    // 1. 입장권(ID) 확인 및 발급
    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      // uuid 라이브러리 설치 안 했다면 브라우저 기본 기능 사용!
      visitorId = window.crypto.randomUUID();
      localStorage.setItem("visitor_id", visitorId);
    }

    // 2. 서버로 ID와 함께 전송 🥊 (인자 추가!)
    logVisit(pathname, visitorId);
  }, [pathname]);

  return null;
}
