export interface Project {
  id: number;
  title: string;
  mode: "yoo" | "ikki";
  desc: string;
  link: string; // 깃헙 혹은 배포 링크
  tags: string[];
  role: string; // 프로젝트에서 맡은 역할 (ex. Challenger)
  thumbnail?: string;
}

export const ALL_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Confessiones",
    mode: "yoo",
    desc: "1년 3개월의 실무 경험 동안의 기술 부채 기억 회고 레포지토리.",
    link: "https://github.com/ikki-rock/confessiones",
    tags: ["Next.js", "TypeScript", "TailwindCSS"],
    role: "Creator",
  },
  {
    id: 2,
    title: "Twenty Steps",
    mode: "ikki",
    desc: "계속된 관심에 의한 접속을 기다리는 인형. (MVP)",
    link: "https://github.com/ikki-rock/twenty-steps",
    tags: ["React", "Web Local Storage", "Framer Motion"],
    role: "Creator",
  },
];
