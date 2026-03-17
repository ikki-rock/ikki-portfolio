import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  // cookies()는 비동기 함수이므로 await 필요
  const cookieStore = await cookies();

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            // 서버 액션/미들웨어에서 쿠키를 구움
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // 서버 컴포넌트(RSC)에서 호출될 때는 무시됨
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // 서버 컴포넌트(RSC)에서 호출될 때는 무시됨
          }
        },
      },
    },
  );
}
