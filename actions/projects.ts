import { createClient } from "@/lib/supabase"; // 🔴 supabase 대신 함수를 가져옴
import { Project } from "@/types/project"; // 🔴 경로를 절대 경로로 깔끔하게 정리

export const fetchProjects = async (limit?: number): Promise<Project[]> => {
  // 🔴 비동기로 클라이언트를 생성 (이게 핵심!)
  const supabase = await createClient();

  let query = supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data as Project[];
};
