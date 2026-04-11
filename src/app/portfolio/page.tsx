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
  const spinouts = projects.filter((p) => p.category === "Project");
  const activities = projects.filter((p) => p.category !== "Project");

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-12">
      {/* Header */}
      <div className="mb-16">
        <h1 className="font-chunk text-4xl font-bold tracking-wide sm:text-5xl">
          PORTFOLIO
        </h1>
        <p className="mt-4 font-chunk text-ekkyo-gray">
          Projects and Events Archive.
        </p>
      </div>

      {/* Spinout Projects */}
      {spinouts.length > 0 && (
        <section className="mb-20">
          <div className="mb-10">
            <p className="font-chunk text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
              PROJECT
            </p>
            <h2 className="font-chunk mt-2 text-2xl font-bold tracking-wide sm:text-3xl">
              EKKYO.PROJECTS
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {spinouts.map((project) => (
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
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold leading-snug tracking-tight transition-colors group-hover:text-ekkyo-accent">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ekkyo-gray">
                    {project.summary}
                  </p>
                  <p className="mt-6 text-xs text-ekkyo-gray">
                    {project.dateLabel || formatDate(project.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Activities */}
      {activities.length > 0 && (
        <section className="border-t border-black/10 pt-20">
          <div className="mb-10">
            <p className="font-chunk text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
              ACTIVITY
            </p>
            <h2 className="font-chunk mt-2 text-2xl font-bold tracking-wide sm:text-3xl">
              ARCHIVES
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((project) => (
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
                  <p className="text-xs tracking-wider text-ekkyo-gray">
                    {project.category}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-ekkyo-accent">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ekkyo-gray">
                    {project.summary}
                  </p>
                  <p className="mt-6 text-xs text-ekkyo-gray">
                    {project.dateLabel || formatDate(project.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
