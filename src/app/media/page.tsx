import type { Metadata } from "next";
import { getNoteArticles } from "@/lib/note";
import { getPressReleases } from "@/lib/press-releases";
import MediaFilter from "@/components/ui/MediaFilter";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "MEDIA",
  description:
    "EKKYO.HUBのメディア。プレスリリースやnoteで発信している記事の一覧です。",
};

export default async function MediaPage() {
  const [articles, pressReleases] = await Promise.all([
    getNoteArticles().catch(() => []),
    Promise.resolve(getPressReleases()),
  ]);

  const pressItems = pressReleases.slice(0, 3).map((pr) => ({
    slug: pr.slug,
    title: pr.title,
    date: pr.date,
    category: pr.category,
    coverImage: pr.coverImage,
    summary: pr.summary,
    externalUrl: pr.externalUrl,
  }));

  return (
    <div className="mx-auto max-w-6xl overflow-hidden px-6 py-20 sm:px-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          MEDIA
        </h1>
        <p className="mt-4 text-ekkyo-gray">思考と活動の記録。</p>
      </div>

      <MediaFilter articles={articles} pressReleases={pressItems} />
    </div>
  );
}
