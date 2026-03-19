export interface Project {
  id: number;
  title: string;
  mode: "yoo" | "ikki";
  desc: string;
  link: string;
  tags: string[];
  role: string;
  thumbnail?: string;
  created_at: string;
  updated_at: string;
}
