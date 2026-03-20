import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import VisitorTracker from "@/components/VisitorTracker";

export const metadata: Metadata = {
  title: "IKKI STUDIO | 프론트엔드 개발자 Yoo",
  description: "단순함을 지향하며, 종종 삐딱한 감성을 웹으로 시도합니다.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <VisitorTracker />
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}
