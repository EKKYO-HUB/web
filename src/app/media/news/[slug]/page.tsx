import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getPressReleases,
  getPressReleaseBySlug,
} from "@/lib/press-releases";
import { formatDate } from "@/lib/utils";

type Props = {
  params: { slug: string };
};

const categoryLabel: Record<string, string> = {
  event: "EVENT",
  partnership: "PARTNERSHIP",
  award: "AWARD",
  coverage: "COVERAGE",
};

export async function generateStaticParams() {
  const releases = getPressReleases();
  return releases.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const release = getPressReleaseBySlug(params.slug);
  if (!release) return {};

  return {
    title: release.title,
    description: release.summary,
    alternates: {
      canonical: `https://www.ekkyo.jp/media/news/${params.slug}`,
    },
    openGraph: {
      title: release.title,
      description: release.summary,
      url: `https://www.ekkyo.jp/media/news/${params.slug}`,
      type: "article",
      ...(release.coverImage
        ? { images: [{ url: release.coverImage }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: release.title,
      description: release.summary,
      ...(release.coverImage ? { images: [release.coverImage] } : {}),
    },
  };
}

export default function PressReleasePage({ params }: Props) {
  const release = getPressReleaseBySlug(params.slug);
  if (!release) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: release.title,
    description: release.summary,
    datePublished: release.date,
    url: `https://www.ekkyo.jp/media/news/${params.slug}`,
    ...(release.coverImage
      ? { image: `https://www.ekkyo.jp${release.coverImage}` }
      : {}),
    author: {
      "@type": "Organization",
      name: "一般社団法人EKKYO.HUB",
      url: "https://www.ekkyo.jp",
    },
    publisher: {
      "@type": "Organization",
      name: "一般社団法人EKKYO.HUB",
      url: "https://www.ekkyo.jp",
      logo: {
        "@type": "ImageObject",
        url: "https://www.ekkyo.jp/images/logo/logo_丸_青背景.svg",
      },
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className={release.coverImage ? "" : "bg-ekkyo-black"}>
        {release.coverImage ? (
          <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden sm:h-[55vh]">
            <Image
              src={release.coverImage}
              alt={release.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            <div className="absolute left-0 top-0 z-10 px-6 pt-24 sm:px-12">
              <Link
                href="/media"
                className="text-xs tracking-widest text-white/60 transition-colors hover:text-white"
              >
                &larr; MEDIA
              </Link>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12 sm:px-12 lg:px-20">
              <div className="mx-auto max-w-4xl">
                <div className="mb-4 flex items-center gap-3">
                  <span className="bg-ekkyo-accent px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white">
                    {categoryLabel[release.category] ?? "NEWS"}
                  </span>
                  <span className="text-xs text-white/50">
                    {formatDate(release.date)}
                  </span>
                </div>
                <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {release.title}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-6 pb-16 pt-28 sm:px-12">
            <Link
              href="/media"
              className="mb-10 inline-block text-xs tracking-widest text-white/50 transition-colors hover:text-white"
            >
              &larr; MEDIA
            </Link>
            <div className="mx-auto max-w-4xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="bg-ekkyo-accent px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white">
                  {categoryLabel[release.category] ?? "NEWS"}
                </span>
                <span className="text-xs text-white/50">
                  {formatDate(release.date)}
                </span>
              </div>
              <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {release.title}
              </h1>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="px-6 py-14 sm:px-12 sm:py-20">
        <p className="mx-auto max-w-3xl text-lg font-medium leading-[2] tracking-tight text-ekkyo-black sm:text-xl">
          {release.summary}
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-6 sm:px-12">
        <div className="h-px w-16 bg-ekkyo-accent" />
      </div>

      {/* Body */}
      <div className="px-6 py-14 sm:px-12 sm:py-20">
        <div className="prose prose-lg mx-auto max-w-3xl prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-16 prose-h2:border-l-[3px] prose-h2:border-ekkyo-accent prose-h2:pl-5 prose-h2:text-2xl prose-p:leading-[1.9] prose-p:text-ekkyo-black/80 prose-a:text-ekkyo-accent prose-a:underline-offset-4 prose-li:leading-[1.8] prose-strong:text-ekkyo-black">
          <MDXRemote source={release.content} />
        </div>
      </div>

      {/* Back */}
      <div className="border-t border-black/10 px-6 py-14 text-center sm:px-12">
        <Link
          href="/media"
          className="group inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-ekkyo-accent transition-all hover:gap-3"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            &larr;
          </span>
          MEDIA
        </Link>
      </div>
    </article>
  );
}
