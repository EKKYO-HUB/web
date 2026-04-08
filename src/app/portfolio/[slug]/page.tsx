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
    <div className="mx-auto max-w-3xl px-6 py-20 sm:px-12">
      <Link
        href="/portfolio"
        className="mb-12 inline-block text-xs tracking-widest text-ekkyo-gray transition-colors hover:text-ekkyo-black"
      >
        &larr; PORTFOLIO
      </Link>

      {project.coverImage && (
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
            priority
          />
        </div>
      )}

      <div className="mb-10">
        <p className="text-xs tracking-wider text-ekkyo-gray">
          {project.category}
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-ekkyo-gray">{project.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <p className="text-xs text-ekkyo-gray">{formatDate(project.date)}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
              <span key={tag} className="text-xs tracking-wide text-ekkyo-gray">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="prose prose-neutral max-w-none">
        <MDXRemote source={project.content} />
      </div>
    </div>
  );
}
