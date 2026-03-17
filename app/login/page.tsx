"use client";

import { useActionState, useEffect } from "react";
import { ActionState, loginAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  // 서버 액션 상태 관리
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    loginAction,
    null,
  );

  useEffect(() => {
    if (state?.success) {
      window.location.href = "/admin";
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-md bg-accent">
      <form
        action={formAction}
        className="w-full max-w-[22.5rem] flex flex-col gap-6"
      >
        <h1 className="text-h1 font-black tracking-tighter uppercase mb-4">
          Admin Login
        </h1>
        <Input
          type="email"
          name="email"
          placeholder="EMAIL"
          className="h-14 border-foreground focus:border-primary"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="PASSWORD"
          className="h-14 border-foreground focus:border-primary"
          required
        />

        {state?.error && (
          <p className="text-destructive text-sm">{state.error}</p>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="h-14 bg-foreground text-background font-bold uppercase hover:bg-primary transition-colors"
        >
          {isPending ? "CHECKING..." : "ENTER"}
        </Button>
      </form>
    </div>
  );
}
