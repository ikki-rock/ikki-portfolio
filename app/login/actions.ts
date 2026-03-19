"use server";

import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export type ActionState = {
  error?: string;
  success?: boolean;
} | null;

export async function loginAction(
  prevState: ActionState, // any 대신 정확한 타입 사용
  formData: FormData,
): Promise<ActionState> {
  const supabase = await createClient(); // 😤 이제 여기서 쿠키를 제대로 구움

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // 성공하면 success 신호만 보냄
  return { success: true };
}

export async function logoutAction() {
  const supabase = await createClient();

  // 서버에서 세션을 안전하게 파괴한다! 🥊
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("로그아웃 중 사탄이 방해함:", error.message);
    return;
  }

  // 로그아웃 성공하면 바로 메인이나 로그인 페이지로 튕겨내기!
  redirect("/login");
}
