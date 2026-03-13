import { supabase } from "./supabase";
import { Project } from "../types/project";

export const fetchProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("데이터 호출 실패:", error);
    return [];
  }

  return data as Project[];
};
