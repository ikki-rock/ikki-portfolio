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

interface UpdateProjectData {
  title: string;
  desc?: string;
  link?: string;
  role?: string;
  mode: string;
  tags?: string[];
  thumbnail?: string;
}

// Update
export async function updateProject(id: number | string, formData: FormData) {
  const supabase = await createClient();

  try {
    const file = formData.get("thumbnail") as File;
    let imageUrl = "";

    // 1. 이미지가 새로 선택되었는지 확인 (파일이 있고, 크기가 0보다 커야 함)
    if (file && file.size > 0) {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error: storageError } = await supabase.storage
        .from("thumbnails")
        .upload(fileName, file);

      if (storageError)
        throw new Error("이미지 업로드 실패: " + storageError.message);

      // 새 이미지의 퍼블릭 URL 가져오기
      const { data: urlData } = supabase.storage
        .from("thumbnails")
        .getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }

    // 2. DB 업데이트 데이터 준비
    // 이미지를 새로 안 올렸으면(imageUrl이 비었으면) thumbnail 필드는 업데이트에서 제외하거나 기존값을 유지해야 함
    const title = formData.get("title");
    const desc = formData.get("desc");
    const link = formData.get("link");
    const role = formData.get("role");
    const mode = formData.get("mode");
    const tags = formData.get("tags");

    const updateData: Partial<UpdateProjectData> = {
      title: String(title || ""),
      desc: String(desc || ""),
      link: String(link || ""),
      role: String(role || ""),
      mode: String(mode || "yoo"),
      tags:
        typeof tags === "string" ? tags.split(",").map((t) => t.trim()) : [],
    };

    // 새 이미지가 있을 때만 thumbnail 경로 수정
    if (imageUrl) {
      updateData.thumbnail = imageUrl;
    }

    // 3. DB 업데이트 실행
    const { data, error: dbError } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", Number(id))
      .select();

    if (dbError) throw new Error("DB 업데이트 실패: " + dbError.message);

    if (!data || data.length === 0) {
      console.warn("⚠️ 업데이트된 행이 없어! ID를 확인해봐:", id);
      return { success: false, error: "수정할 프로젝트를 찾지 못했어." };
    }

    // 4. 캐시 갱신 및 결과 반환
    revalidatePath("/admin/projects");
    revalidatePath("/"); // 메인 페이지도 갱신!

    return { success: true };
  } catch (error: unknown) {
    console.error("Update Error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";
    return { success: false, error: errorMessage };
  }
}

// Delete
export async function deleteProject(id: number) {
  // TODO
  revalidatePath("/admin/projects");
}
