import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { logoutAction } from "../login/actions";

export const metadata: Metadata = {
  title: "IKKI ADMIN | 관리자 모드",
  robots: "noindex, nofollow", // 검색 엔진에 안 걸리게
};

interface SidebarItem {
  label: string;
  link: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: "Dashboard",
    link: "/admin",
  },
  { label: "Projects", link: "/admin/projects" },
  { label: "Settings", link: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-accent/30">
      {/* 사이드바 */}
      <aside className="w-64 p-6 flex flex-col gap-4 bg-accent">
        {/* 로고 */}
        <Link href={"/"}>
          <h1 className="text-xl font-bold tracking-tighter">IKKI ADMIN</h1>
        </Link>
        {/* 메인 리스트 */}
        <nav className="flex flex-col gap-2 mt-4 text-md font-medium">
          {SIDEBAR_ITEMS?.map((item) => (
            <Link
              key={item.link}
              href={item?.link}
              className="hover:text-foreground/40 transition-colors"
            >
              {item?.label}
            </Link>
          ))}
        </nav>

        {/* 하단 시스템 메뉴 */}
        <div className="flex flex-col justify-center mt-auto gap-2 border-t border-foreground/50 py-4 text-md">
          <Link href="/" className="hover:text-foreground/40 transition-colors">
            Home
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-left cursor-pointer  transition-colors
          text-destructive hover:text-destructive/40"
            >
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
