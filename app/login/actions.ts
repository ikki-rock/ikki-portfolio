"use server";

import { createClient } from "@/lib/supabase";

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
