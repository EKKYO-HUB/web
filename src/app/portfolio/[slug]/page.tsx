import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPortfolioProjects, getProjectBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

type Props = {
  params: { slug: string };
};

// Slugs with custom pages in app/portfolio/ are excluded
const customPages = ["summit-2025-ueda"];

export async function generateStaticParams() {
  const projects = getPortfolioProjects();
  return projects
    .filter((p) => !customPages.includes(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: project.coverImage
      ? { images: [{ url: project.coverImage }] }
      : undefined,
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const displayDate = project.dateLabel || formatDate(project.date);

  return (
    <article>
      {/* Hero */}
      {project.coverImage ? (
        <div className="relative h-[55vh] min-h-[400px] w-full sm:h-[65vh]">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

          {/* Back link */}
          <div className="absolute left-0 top-0 z-10 px-6 pt-24 sm:px-12">
            <Link
              href="/portfolio"
              className="text-xs tracking-widest text-white/60 transition-colors hover:text-white"
            >
              &larr; PORTFOLIO
            </Link>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12 sm:px-12 lg:px-20">
            <div className="mx-auto max-w-4xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="bg-ekkyo-accent px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white">
                  {project.category.toUpperCase()}
                </span>
                <span className="text-xs text-white/50">{displayDate}</span>
              </div>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/20 px-2.5 py-0.5 text-[10px] tracking-wide text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* No cover fallback */
        <div className="bg-ekkyo-black px-6 pb-16 pt-28 sm:px-12">
          <Link
            href="/portfolio"
            className="mb-10 inline-block text-xs tracking-widest text-white/50 transition-colors hover:text-white"
          >
            &larr; PORTFOLIO
          </Link>
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="bg-ekkyo-accent px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white">
                {project.category.toUpperCase()}
              </span>
              <span className="text-xs text-white/50">{displayDate}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              {project.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/20 px-2.5 py-0.5 text-[10px] tracking-wide text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Summary — large lead text */}
      <div className="px-6 py-14 sm:px-12 sm:py-20">
        <p className="mx-auto max-w-3xl text-lg font-medium leading-[2] tracking-tight text-ekkyo-black sm:text-xl lg:text-2xl">
          {project.summary}
        </p>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-6 sm:px-12">
        <div className="h-px w-16 bg-ekkyo-accent" />
      </div>

      {/* Body */}
      <div className="px-6 py-14 sm:px-12 sm:py-20">
        <div
          className="mx-auto max-w-3xl
            prose prose-lg
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-ekkyo-black
            prose-h2:mt-20 prose-h2:mb-6 prose-h2:border-l-[3px] prose-h2:border-ekkyo-accent prose-h2:pl-5 prose-h2:text-2xl prose-h2:sm:text-3xl
            prose-h3:mt-10 prose-h3:text-lg prose-h3:text-ekkyo-accent
            prose-p:text-base prose-p:leading-[2] prose-p:text-ekkyo-black/70
            prose-strong:text-ekkyo-black prose-strong:font-semibold
            prose-a:text-ekkyo-accent prose-a:font-medium prose-a:underline prose-a:underline-offset-4 prose-a:decoration-ekkyo-accent/30 hover:prose-a:decoration-ekkyo-accent
            prose-ul:my-6 prose-li:text-base prose-li:leading-[2] prose-li:text-ekkyo-black/70
            prose-li:marker:text-ekkyo-accent"
        >
          <MDXRemote source={project.content} />
        </div>
      </div>

      {/* Back to portfolio */}
      <div className="border-t border-black/10 px-6 py-14 text-center sm:px-12">
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-ekkyo-accent transition-all hover:gap-3"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            &larr;
          </span>
          ALL WORKS
        </Link>
      </div>
    </article>
  );
}
