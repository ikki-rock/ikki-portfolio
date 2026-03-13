// 지금은 서버컴포넌트로 데이터 페칭을 대신 하여 이 훅은 안씀. (이 훅은 클라이언트방식일때 사용)
import { useState, useEffect, useMemo } from "react";
import { Project } from "../types/project";
import { fetchProjects } from "../lib/projects";

export const useProjects = (isIkki: boolean) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 컨트롤러 생성
    const controller = new AbortController();
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProjects();

        // 컴포넌트가 여전히 살아있을때만 업데이트
        if (!controller.signal.aborted) {
          setProjects(data);
          setIsLoading(false);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("데이터 호출 에러:", error);
          setIsLoading(false);
        }
      }
    };
    load();
    // 클린업 함수 (메모리 누수 방지)
    return () => {
      controller.abort();
    };
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => p.mode.includes(isIkki ? "ikki" : "yoo"));
  }, [isIkki, projects]);

  return { filteredProjects, isLoading };
};
