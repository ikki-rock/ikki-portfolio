"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// 상태 타입 정의
interface ThemeContextType {
  isIkki: boolean;
  toggleMode: () => void;
}

// 1. 컨텍스트 생성
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. 프로바이더 정의 (컨텍스트 제공자)
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isIkki, setIsIkki] = useState(false);

  // 함수 재생성 방지(최적화)
  const toggleMode = useCallback(() => {
    setIsIkki((prev) => {
      const nextMode = !prev;
      // html태그의 클래스 직접 토글 (CSS 변수 제어)
      document.documentElement.classList.toggle("ikki-mode", nextMode);
      return nextMode;
    });
  }, []);

  // value 객체 박제 (리렌더링 방어)
  const value = useMemo(
    () => ({
      isIkki,
      toggleMode,
    }),
    [isIkki, toggleMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// 3. 컨텍스트 사용할 수 있는 호출함수 (커스텀 훅)
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeProvider 안에서 사용해주세요!");
  return context;
};
