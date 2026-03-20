import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { logoutAction } from "../login/actions";
import MobileNav from "./_components/MobileNav";

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
  const NavLinks = (
    <nav className="flex flex-col gap-4 mt-8 text-lg uppercase tracking-tighter">
      {SIDEBAR_ITEMS.map((item) => (
        <Link
          key={item.link}
          href={item.link}
          className="px-4 hover:text-primary transition-all border-b border-foreground/5 pb-2"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
  return (
    <div className="flex h-full w-full bg-accent/30 flex-col md:flex-row">
      {/* 모바일 전용 헤더 */}
      <header className="flex h-16 items-center justify-between px-6 bg-accent md:hidden border-b border-foreground/10">
        <Link href="/">
          <h1 className="text-lg font-black tracking-tighter italic">
            IKKI ADMIN
          </h1>
        </Link>
        {/* 모바일 내비게이션 버튼 */}
        <MobileNav>{NavLinks}</MobileNav>
      </header>
      {/* 사이드바 */}
      <aside className="hidden md:flex w-64 p-6 flex flex-col gap-4 bg-accent flex-shrink-0">
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
      <main className="w-full p-4 md:p-8 h-dvh overflow-y-scroll">
        {children}
      </main>
    </div>
  );
}
