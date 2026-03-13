"use client";

import { useCallback, useState } from "react";
import ThemeToggle from "../shared/ThemeToggle";

export default function Header() {
  const [isIkki, setIsIkki] = useState(false);

  const toggleMode = useCallback(() => {
    setIsIkki((prev) => {
      const nextMode = !prev;

      // document.documentElement === html태그
      document.documentElement.classList.toggle("ikki-mode", nextMode);

      return nextMode;
    });
  }, []);

  return (
    <header className="h-20 bg-background sticky top-0 border-b border-accent z-50">
      {/* 64rem: 1024px (태블릿) */}
      <div className="mx-auto max-w-[64rem] w-full flex justify-between items-center h-full px-md">
        {/* 로고 영역 */}
        <h1 className="font-bold text-foreground text-h2 tracking-tighter cursor-pointer">
          {isIkki ? "ikki" : "Yoo"}
        </h1>
        {/* 오른쪽 토글 영역 */}
        <div>
          <ThemeToggle isIkki={isIkki} onToggle={toggleMode} />
        </div>
      </div>
    </header>
  );
}
