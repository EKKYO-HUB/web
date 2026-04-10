import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getNoteArticles } from "@/lib/note";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600; // 1時間ごとに再生成

export const metadata: Metadata = {
  title: "MEDIA",
  description:
    "EKKYO.HUBのメディア。noteで発信している記事の一覧です。",
};

export default async function MediaPage() {
  const articles = await getNoteArticles();

  return (
    <div className="mx-auto max-w-6xl overflow-hidden px-6 py-20 sm:px-12">
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          MEDIA
        </h1>
        <p className="mt-4 text-ekkyo-gray">
          思考と活動の記録。
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="text-ekkyo-gray">記事を取得できませんでした。</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.link}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden border border-black/10 transition-all hover:border-ekkyo-black"
            >
              {article.thumbnail ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] bg-ekkyo-black/5" />
              )}

              <div className="flex flex-1 flex-col p-5">
                {article.creatorName && (
                  <p className="text-xs tracking-wider text-ekkyo-gray">
                    {article.creatorName}
                  </p>
                )}
                <h2 className="mt-2 flex-1 text-base font-bold leading-snug tracking-tight transition-colors group-hover:text-ekkyo-accent">
                  {article.title}
                </h2>
                {article.contentSnippet && (
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ekkyo-gray">
                    {article.contentSnippet}
                  </p>
                )}
                <p className="mt-4 text-xs text-ekkyo-gray">
                  {formatDate(article.pubDate)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
