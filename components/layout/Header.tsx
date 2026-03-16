"use client";

import { useTheme } from "@/providers/ThemeProvider";
import ThemeToggle from "../shared/ThemeToggle";

export default function Header() {
  const { isIkki, toggleMode } = useTheme();

  return (
    <header className="h-20 bg-background/60 fixed top-0 left-0 w-full border-b border-accent z-50 backdrop-blur">
      {/* 64rem: 1024px (태블릿) */}
      <div className="mx-auto max-w-[64rem] w-full flex justify-between items-center h-full px-md">
        {/* 로고 영역 */}
        <h1 className="font-bold text-foreground text-h2 tracking-tighter cursor-pointer italic">
          {isIkki ? "IKKI" : "YOO"}
        </h1>
        {/* 오른쪽 토글 영역 */}
        <div>
          <ThemeToggle isIkki={isIkki} onToggle={toggleMode} />
        </div>
      </div>
    </header>
  );
}
