"use server";
import { createClient } from "@/lib/supabase";
import { Project } from "@/types/project";
import { revalidatePath } from "next/cache";

// Read
export async function fetchProjects(limit?: number): Promise<Project[]> {
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
}

// Creat
export async function createProject(formData: FormData) {
  const supabase = await createClient();

  // 1. FormData에서 값 추출 (필드명은  form의 name 속성과 일치해야)
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const link = formData.get("link") as string;
  const role = formData.get("role") as string;
  const mode = formData.get("mode") as string;
  //  tags는 콤마(,)로 받아서 배열로 변환
  const tagsString = formData.get("tags") as string;
  const tags = tagsString ? tagsString.split(",").map((tag) => tag.trim()) : [];

  // 파일 가져오기 (input name="thumbnail" 기준)
  const file = formData.get("thumbnail") as File;
  let imageUrl = "";

  // 이미지 파일이 있다면 supabase storage에 업로드
  if (file && file.size > 0) {
    // 고유한 파일명 생성 (한글 파일명 방지를 위해 영어/숫자 조합 권장)
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `project-thumbs/${fileName}`; // 버킷 내부 폴더 구조 설정 가능

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("thumbnails")
      .upload(fileName, file);

    if (uploadError) {
      console.error("이미지 업로드 실패! ", uploadError.message);
      return { success: false, error: "이미지 업로드에 실패했습니다." };
    }

    // 업로드 성공 후 공용 URL(Public URL) 가져오기
    const { data: urlData } = supabase.storage
      .from("thumbnails")
      .getPublicUrl(fileName);

    imageUrl = urlData.publicUrl;
  }

  // 2. Supabase DB에 인서트
  const { data: resultData, error: dbError } = await supabase
    .from("projects")
    .insert([
      {
        title,
        desc,
        link,
        role,
        mode,
        tags,
        thumbnail: imageUrl,
        // created_at은 DB에서 자동으로 넣어줌
        // updated_at은 DB에서 자동으로 넣어줌 (직접 등록한 트리거)
      },
    ])
    .select();

  if (dbError) {
    console.error("프로젝트 등록 실패! 🤮", dbError.message);
    return { success: false, error: dbError.message };
  }

  // 3. 캐시 갱신 (이게 없으면 등록해도 화면에 안 나타남)
  revalidatePath("/admin/projects");
  revalidatePath("/"); // 메인 페이지의 프로젝트 그리드도 갱신

  return { success: true, data: resultData };
}

// Update
export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient();
  // TODO
  revalidatePath("/admin/projects");
}

// Delete
export async function deleteProject(id: string) {
  // TODO
  revalidatePath("/admin/projects");
}
