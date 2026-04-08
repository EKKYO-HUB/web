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

export async function generateStaticParams() {
  const projects = getPortfolioProjects();
  return projects.map((p) => ({ slug: p.slug }));
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

  return (
    <article>
      {/* Hero */}
      {project.coverImage ? (
        <div className="relative h-[50vh] min-h-[360px] w-full sm:h-[60vh]">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ekkyo-black/80 via-ekkyo-black/30 to-transparent" />

          {/* Back link over image */}
          <div className="absolute left-0 top-0 z-10 px-6 pt-24 sm:px-12">
            <Link
              href="/portfolio"
              className="text-xs tracking-widest text-white/70 transition-colors hover:text-white"
            >
              &larr; PORTFOLIO
            </Link>
          </div>

          {/* Title over image */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-10 sm:px-12 lg:px-20">
            <div className="mx-auto max-w-4xl">
              <p className="text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
                {project.category}
              </p>
              <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <p className="text-xs text-white/50">
                  {formatDate(project.date)}
                </p>
                <span className="text-white/20">|</span>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs tracking-wide text-white/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6 pb-4 pt-24 sm:px-12">
          <Link
            href="/portfolio"
            className="mb-12 inline-block text-xs tracking-widest text-ekkyo-gray transition-colors hover:text-ekkyo-black"
          >
            &larr; PORTFOLIO
          </Link>
          <div className="mx-auto max-w-4xl">
            <p className="text-xs tracking-wider text-ekkyo-gray">
              {project.category}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <p className="text-xs text-ekkyo-gray">
                {formatDate(project.date)}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs tracking-wide text-ekkyo-gray"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="border-b border-black/10 px-6 py-10 sm:px-12 sm:py-14">
        <p className="mx-auto max-w-3xl text-base leading-[1.9] text-ekkyo-gray sm:text-lg">
          {project.summary}
        </p>
      </div>

      {/* Body */}
      <div className="px-6 py-16 sm:px-12 sm:py-20">
        <div className="prose prose-neutral mx-auto max-w-3xl prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-16 prose-h2:border-l-2 prose-h2:border-ekkyo-accent prose-h2:pl-4 prose-h2:text-2xl prose-h2:sm:text-3xl prose-p:leading-[1.9] prose-p:text-ekkyo-black/80 prose-a:text-ekkyo-accent prose-a:underline-offset-4 prose-li:leading-[1.8] prose-strong:text-ekkyo-black">
          <MDXRemote source={project.content} />
        </div>
      </div>

      {/* Back to portfolio */}
      <div className="border-t border-black/10 px-6 py-12 text-center sm:px-12">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-ekkyo-accent transition-opacity hover:opacity-70"
        >
          &larr; ALL WORKS
        </Link>
      </div>
    </article>
  );
}
