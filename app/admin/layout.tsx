import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IKKI ADMIN | 관리자 모드",
  robots: "noindex, nofollow", // 검색 엔진에 안 걸리게
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-accent">
      {/* 사이드바 */}
      <aside className="w-64 p-6 flex flex-col gap-4">
        <h1 className="text-xl font-bold tracking-tighter">IKKI ADMIN</h1>
        <nav className="flex flex-col gap-2 mt-4 text-sm font-medium">
          <a href="/admin" className="hover:text-accent transition-colors">
            Dashboard
          </a>
          <a
            href="/admin/projects"
            className="hover:text-accent transition-colors"
          >
            Projects
          </a>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
