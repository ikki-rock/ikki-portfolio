import { render, screen } from "@testing-library/react";
import Home from "./page";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ALL_PROJECTS } from "@/constants/projects";
import { describe, it, expect, vi } from "vitest";

describe("Home Page 통합 테스트", () => {
  it("초기 렌더링 시 YOO 모드의 프로젝트만 보여야 한다", () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>,
    );

    // 1. Hero 섹션 텍스트 확인
    expect(screen.getByText("YOO")).toBeInTheDocument();
    expect(screen.getByText("The Architect")).toBeInTheDocument();

    // 2. YOO 모드 프로젝트 필터링 확인
    const yooProjects = ALL_PROJECTS.filter((p) => p.mode.includes("yoo"));
    yooProjects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it("썸네일이 없는 프로젝트는 WIP 문구를 표시해야 한다", () => {
    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>,
    );

    // ALL_PROJECTS 중 thumbnail이 없는 데이터가 있다면 WIP가 렌더링되었는지 확인
    const hasWip = ALL_PROJECTS.some((p) => !p.thumbnail);
    if (hasWip) {
      // WIP 문구가 최소 하나 이상 존재하는지 확인
      const wipElements = screen.getAllByText(/WIP/i);
      expect(wipElements.length).toBeGreaterThan(0);
    }
  });
});
