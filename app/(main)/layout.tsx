import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import VisitorTracker from "@/components/VisitorTracker";

export const metadata: Metadata = {
  title: "IKKI",
  description: "Web Developer · Simple, Flexible",
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
