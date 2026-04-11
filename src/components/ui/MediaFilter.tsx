"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type NoteArticle = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  creatorName?: string;
  contentSnippet?: string;
};

type PressItem = {
  slug: string;
  title: string;
  date: string;
  category: string;
  coverImage?: string;
  summary: string;
  externalUrl?: string;
};

type Filter = "all" | "news" | "note";

const categoryLabel: Record<string, string> = {
  event: "EVENT",
  partnership: "PARTNERSHIP",
  award: "AWARD",
  coverage: "COVERAGE",
};

function fmtDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function MediaFilter({
  articles,
  pressReleases,
}: {
  articles: NoteArticle[];
  pressReleases: PressItem[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [newsPage, setNewsPage] = useState(0);
  const [slideDir, setSlideDir] = useState(1);
  const newsPerPage = filter === "news" ? 10 : 3;

  const totalNewsPages = Math.ceil(pressReleases.length / newsPerPage);
  const pagedNews = pressReleases.slice(
    newsPage * newsPerPage,
    (newsPage + 1) * newsPerPage
  );

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "ALL", count: articles.length + pressReleases.length },
    { key: "news", label: "NEWS", count: pressReleases.length },
    { key: "note", label: "NOTE", count: articles.length },
  ];

  const showPress = filter === "all" || filter === "news";
  const showNote = filter === "all" || filter === "note";

  return (
    <>
      {/* Filter pills */}
      <div className="mb-12 flex flex-wrap gap-2">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => { setFilter(key); setNewsPage(0); }}
            className={cn(
              "px-4 py-2 text-[11px] font-medium tracking-[0.1em] transition-all",
              filter === key
                ? "bg-ekkyo-accent text-white"
                : "border border-ekkyo-black/15 text-ekkyo-black/70 hover:border-ekkyo-accent hover:text-ekkyo-accent"
            )}
          >
            {label}
            <span className="ml-2 opacity-60">{count}</span>
          </button>
        ))}
      </div>

      {/* Press Releases */}
      {showPress && pressReleases.length > 0 && (
        <section className={showNote ? "mb-16" : ""}>
          {filter === "all" && (
            <h2 className="mb-6 text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
              NEWS
            </h2>
          )}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={newsPage}
                initial={{ x: slideDir * 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: slideDir * -300, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="divide-y divide-black/10"
              >
                {pagedNews.map((pr) => (
                  <Link
                    key={pr.slug}
                    href={pr.externalUrl || `/media/news/${pr.slug}`}
                    {...(pr.externalUrl
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-start gap-5 py-6 transition-colors sm:items-center"
                  >
                    {pr.coverImage && (
                      <div className="relative hidden h-20 w-32 shrink-0 overflow-hidden bg-gray-100 sm:block">
                        <Image
                          src={pr.coverImage}
                          alt={pr.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="128px"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="bg-ekkyo-accent/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.1em] text-ekkyo-accent">
                          {categoryLabel[pr.category] ?? "NEWS"}
                        </span>
                        <span className="text-xs text-ekkyo-gray">
                          {fmtDate(pr.date)}
                        </span>
                      </div>
                      <h3 className="text-base font-bold leading-snug tracking-tight transition-colors group-hover:text-ekkyo-accent">
                        {pr.title}
                      </h3>
                    </div>
                    <span className="shrink-0 text-ekkyo-accent opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                      &rarr;
                    </span>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalNewsPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => { setSlideDir(-1); setNewsPage((p) => Math.max(0, p - 1)); }}
                disabled={newsPage === 0}
                className={cn(
                  "px-3 py-1.5 text-xs transition-colors",
                  newsPage === 0
                    ? "text-ekkyo-gray/30"
                    : "text-ekkyo-gray hover:text-ekkyo-accent"
                )}
              >
                &larr;
              </button>
              {Array.from({ length: totalNewsPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => { setSlideDir(i > newsPage ? 1 : -1); setNewsPage(i); }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center text-xs transition-all",
                    i === newsPage
                      ? "bg-ekkyo-accent text-white"
                      : "text-ekkyo-gray hover:text-ekkyo-accent"
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => { setSlideDir(1); setNewsPage((p) => Math.min(totalNewsPages - 1, p + 1)); }}
                disabled={newsPage === totalNewsPages - 1}
                className={cn(
                  "px-3 py-1.5 text-xs transition-colors",
                  newsPage === totalNewsPages - 1
                    ? "text-ekkyo-gray/30"
                    : "text-ekkyo-gray hover:text-ekkyo-accent"
                )}
              >
                &rarr;
              </button>
            </div>
          )}
        </section>
      )}

      {/* Note Articles */}
      {showNote && articles.length > 0 && (
        <section>
          {filter === "all" && (
            <h2 className="mb-6 text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
              NOTE ARTICLES
            </h2>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <h3 className="mt-2 flex-1 text-base font-bold leading-snug tracking-tight transition-colors group-hover:text-ekkyo-accent">
                    {article.title}
                  </h3>
                  {article.contentSnippet && (
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ekkyo-gray">
                      {article.contentSnippet}
                    </p>
                  )}
                  <p className="mt-4 text-xs text-ekkyo-gray">
                    {fmtDate(article.pubDate)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {((filter === "news" && pressReleases.length === 0) ||
        (filter === "note" && articles.length === 0)) && (
        <p className="text-ekkyo-gray">該当する記事がありません。</p>
      )}
    </>
  );
}
