"use client";

import { logoutAction } from "@/app/login/actions";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileNav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="p-2 hover:bg-foreground/5 rounded-md cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] bg-accent border-r-foreground/10"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="text-xl font-black italic tracking-tighter uppercase">
            Menu
          </SheetTitle>
        </SheetHeader>
        <div onClick={() => setOpen(false)}>{children}</div>

        <div className="flex flex-col gap-8 absolute w-[300px] bottom-10 left-6 right-6 border-t pt-4">
          <Link
            href="/"
            className=" font-bold opacity-50 italic cursor-pointer"
            onClick={() => setOpen(false)}
          >
            BACK TO HOME
          </Link>
          <form action={logoutAction} onSubmit={() => setOpen(false)}>
            <button
              type="submit"
              className="text-left font-bold opacity-50 italic cursor-pointer  transition-colors
          text-destructive hover:text-destructive/40"
            >
              Logout
            </button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
