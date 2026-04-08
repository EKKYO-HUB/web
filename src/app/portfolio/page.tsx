import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPortfolioProjects } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "PORTFOLIO",
  description: "EKKYOの活動・プロジェクト一覧。",
};

export default function PortfolioPage() {
  const projects = getPortfolioProjects();

  const statusLabel: Record<string, string> = {
    completed: "完了",
    ongoing: "進行中",
    draft: "下書き",
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-12">
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          PORTFOLIO
        </h1>
        <p className="mt-4 text-ekkyo-gray">
          EKKYOのプロジェクトと活動の記録。
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-ekkyo-gray">プロジェクトがまだありません。</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group flex flex-col overflow-hidden border border-black/10 transition-all hover:border-ekkyo-black"
            >
              {project.coverImage && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-auto">
                  <div className="flex items-center justify-between">
                    <p className="text-xs tracking-wider text-ekkyo-gray">
                      {project.category}
                    </p>
                    <span className="rounded-full bg-ekkyo-black/5 px-2 py-0.5 text-xs text-ekkyo-gray">
                      {statusLabel[project.status] ?? project.status}
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-bold leading-snug tracking-tight transition-colors group-hover:opacity-70">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-ekkyo-gray">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs tracking-wide text-ekkyo-gray"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-xs text-ekkyo-gray">
                  {formatDate(project.date)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
