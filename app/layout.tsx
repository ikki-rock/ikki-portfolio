import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "IKKI STUDIO | 프론트엔드 개발자 Yoo",
  description: "단순함을 지향하며, 종종 삐딱한 감성을 웹으로 시도합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
