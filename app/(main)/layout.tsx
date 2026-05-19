import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import VisitorTracker from "@/components/VisitorTracker";

export const metadata: Metadata = {
  title: "IKKI STUDIO",
  description: "SIMPLE, FLEXIBLE, SECURE",
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
