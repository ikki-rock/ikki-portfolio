"use server";

import { createClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const supabase = await createClient(); // 우리 아까 만든 비동기 클라이언트

  // 1. 폼 데이터에서 값 추출
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const link = formData.get("link") as string;
  const mode = formData.get("mode") as string;
  const tags = formData.get("tags") as string;
  const role = formData.get("role") as string;
  const thumbnail = formData.get("thumbnail") as string;

  // 2. Supabase DB에 데이터 삽입
  const { error } = await supabase.from("projects").insert([
    {
      title,
      mode,
      desc,
      link,
      tags,
      role,
      thumbnail,
    },
  ]);

  if (error) {
    console.error("Project 추가 실패:", error.message);
    throw new Error("프로젝트를 추가하는 중에 문제가 생겼어: " + error.message);
  }

  // 3. 데이터가 바뀌었으니 목록 페이지 캐시를 무효화함 (중요 😤)
  revalidatePath("/admin/projects");

  // 4. 등록 완료 후 다시 목록으로 이동
  redirect("/admin/projects");
}
