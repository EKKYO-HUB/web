import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PressReleaseFrontmatter = {
  title: string;
  date: string;
  category: "event" | "partnership" | "award" | "coverage";
  coverImage?: string;
  summary: string;
  tags?: string[];
  status: "draft" | "published";
  externalUrl?: string;
};

export type PressRelease = PressReleaseFrontmatter & {
  slug: string;
  content: string;
};

const pressDir = path.join(process.cwd(), "src", "content", "press-releases");

export function getPressReleases(): PressRelease[] {
  if (!fs.existsSync(pressDir)) return [];

  const files = fs
    .readdirSync(pressDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.(mdx|md)$/, "");
      const filePath = path.join(pressDir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        content,
        ...(data as PressReleaseFrontmatter),
      };
    })
    .filter((p) => p.status !== "draft")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPressReleaseBySlug(
  slug: string
): PressRelease | undefined {
  const filePath = path.join(pressDir, `${slug}.mdx`);
  const fallbackPath = path.join(pressDir, `${slug}.md`);

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
    ...(data as PressReleaseFrontmatter),
  };
}
