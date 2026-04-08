import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPortfolioProjects } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "PORTFOLIO",
  description: "EKKYOの活動・プロジェクト一覧。",
};

const sectionOrder = [
  { key: "Project", label: "PROJECT", description: "スピンアウトプロジェクト" },
  { key: "Summit", label: "SUMMIT", description: "年次サミット" },
  { key: "Conference", label: "CONFERENCE", description: "越境カンファレンス" },
  { key: "Fundraising", label: "FUNDRAISING", description: "資金調達" },
];

export default function PortfolioPage() {
  const projects = getPortfolioProjects();

  const grouped = sectionOrder
    .map((section) => ({
      ...section,
      items: projects.filter((p) => p.category === section.key),
    }))
    .filter((section) => section.items.length > 0);

  // Collect categories not in sectionOrder
  const knownKeys = sectionOrder.map((s) => s.key);
  const others = projects.filter((p) => !knownKeys.includes(p.category));
  if (others.length > 0) {
    grouped.push({
      key: "Other",
      label: "OTHER",
      description: "その他",
      items: others,
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          PORTFOLIO
        </h1>
        <p className="mt-4 text-ekkyo-gray">
          EKKYOのプロジェクトと活動の記録。
        </p>
      </div>

      {/* Section nav */}
      <nav className="mb-16 flex flex-wrap gap-3">
        {grouped.map((section) => (
          <a
            key={section.key}
            href={`#${section.key.toLowerCase()}`}
            className="border border-ekkyo-black/15 px-4 py-2 text-[11px] font-medium tracking-[0.1em] text-ekkyo-black/70 transition-all hover:border-ekkyo-accent hover:text-ekkyo-accent"
          >
            {section.label}
            <span className="ml-2 text-ekkyo-gray">{section.items.length}</span>
          </a>
        ))}
      </nav>

      {/* Sections */}
      {grouped.map((section, sectionIdx) => (
        <section
          key={section.key}
          id={section.key.toLowerCase()}
          className={sectionIdx > 0 ? "mt-20 border-t border-black/10 pt-20" : ""}
        >
          <div className="mb-10">
            <p className="text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
              {section.label}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {section.description}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((project) => (
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
                    <h3 className="text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-ekkyo-accent">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-ekkyo-gray">
                      {project.summary}
                    </p>
                  </div>

                  <p className="mt-6 text-xs text-ekkyo-gray">
                    {project.dateLabel || formatDate(project.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
