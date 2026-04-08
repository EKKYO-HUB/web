import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ProjectFrontmatter = {
  title: string;
  date: string;
  category: string;
  tags: string[];
  coverImage?: string;
  summary: string;
  status: "draft" | "completed" | "ongoing";
};

export type Project = ProjectFrontmatter & {
  slug: string;
  content: string;
};

const portfolioDir = path.join(process.cwd(), "src", "content", "portfolio");

export function getPortfolioProjects(): Project[] {
  if (!fs.existsSync(portfolioDir)) return [];

  const files = fs
    .readdirSync(portfolioDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const projects = files
    .map((filename) => {
      const slug = filename.replace(/\.(mdx|md)$/, "");
      const filePath = path.join(portfolioDir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        content,
        ...(data as ProjectFrontmatter),
      };
    })
    .filter((p) => p.status !== "draft")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  const filePath = path.join(portfolioDir, `${slug}.mdx`);
  const fallbackPath = path.join(portfolioDir, `${slug}.md`);

  const resolvedPath = fs.existsSync(filePath)
    ? filePath
    : fs.existsSync(fallbackPath)
      ? fallbackPath
      : null;

  if (!resolvedPath) return undefined;

  const raw = fs.readFileSync(resolvedPath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    content,
    ...(data as ProjectFrontmatter),
  };
}
