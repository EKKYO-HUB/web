"use client";

/* ─────────────────────────────────────────────────────
   「耕せ」アーカイブ ── 区画（ワークショップ詳細）

   スクロール＝掘りさげる。ページを降りるほど土は深く、暗くなる。
   左端の深度計が現在の深さを示し、
   「種（ねらい）→ 根（当日の風景）→ 実り（ふりかえり）」の
   3つの地層を通って底へたどり着く。
   ───────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DAY_LABELS, type Workshop } from "@/content/summit2025";

const KANJI = "一二三四五六七八九十".split("");
function kanjiNo(n: number): string {
  if (n <= 10) return KANJI[n - 1];
  if (n < 20) return "十" + KANJI[n - 11];
  return "二十" + (n > 20 ? KANJI[n - 21] : "");
}

export default function PlotArchive({
  workshop: w,
  prev,
  next,
}: {
  workshop: Workshop;
  prev: Workshop | null;
  next: Workshop | null;
}) {
  const [depth, setDepth] = useState(0); // 0..1
  const rootRef = useRef<HTMLDivElement>(null);

  /* スクロール＝深度 */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setDepth(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* 発掘アニメーション（写真・地層見出し） */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll("[data-unearth]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.animationPlayState = "running";
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.25 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const day = DAY_LABELS[w.day];

  return (
    <div
      ref={rootRef}
      className="relative min-h-screen text-tagayase-paper"
      style={{
        background:
          "linear-gradient(180deg, #3F2F1D 0%, #2B1C12 30%, #1A100A 62%, #0D0805 100%)",
      }}
    >
      {/* ── 上部ナビ ── */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7">
        <Link
          href="/summit/2025"
          className="pointer-events-auto font-mincho text-xs tracking-[0.25em] text-tagayase-paper/70 transition-colors hover:text-tagayase-paper sm:text-sm"
        >
          ↑ 畑へ戻る
        </Link>
        <p className="font-mincho text-xs font-bold tracking-[0.3em] text-tagayase-paper/70">
          耕せ
        </p>
      </header>

      {/* ── 深度計（デスクトップ） ── */}
      <aside
        className="fixed left-7 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
        aria-hidden="true"
      >
        <div className="relative h-[56vh] w-px bg-tagayase-straw/25">
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <span
              key={t}
              className="absolute -left-1 h-px w-2 bg-tagayase-straw/40"
              style={{ top: `${t * 100}%` }}
            />
          ))}
          <div
            className="absolute -left-[3.5px] h-2 w-2 rounded-full bg-tagayase-akane transition-[top] duration-150 ease-out"
            style={{ top: `calc(${depth * 100}% - 4px)` }}
          />
        </div>
      </aside>

      {/* ══════════ 表土：題 ══════════ */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
        <div className="flex items-start justify-center gap-8 pt-10 sm:gap-14">
          {/* 区画の付け札 */}
          <div className="tagayase-vertical pt-3 font-mincho text-xs leading-[2.4] tracking-[0.3em] text-tagayase-straw sm:text-sm">
            <span className="text-tagayase-akane">{day.kanji}</span>
            <span className="ml-1 text-tagayase-straw/70">{day.date}</span>
            <span className="ml-1">第{kanjiNo(w.no)}区画</span>
          </div>
          {/* 縦書きの題 */}
          <h1
            className="tagayase-vertical max-h-[64svh] font-mincho font-bold leading-[1.65] tracking-[0.1em] [text-shadow:0_2px_24px_rgba(0,0,0,0.5)]"
            style={{ fontSize: "clamp(22px, 4.2vw, 44px)" }}
          >
            {w.title}
          </h1>
        </div>

        {(w.place || w.credits) && (
          <p className="absolute bottom-[18%] left-1/2 -translate-x-1/2 whitespace-nowrap text-xs tracking-[0.15em] text-tagayase-straw">
            {w.place && <span>会場　{w.place}</span>}
            {w.credits?.map((c) => (
              <span key={c.role + c.name} className="ml-4">
                {c.role}　{c.name}
              </span>
            ))}
          </p>
        )}

        {/* 掘りさげの合図 */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
          <p className="font-mincho text-[11px] tracking-[0.4em] text-tagayase-straw/90">
            掘りさげる
          </p>
          <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-tagayase-straw/70 to-transparent" />
        </div>
      </section>

      {/* ══════════ 地層一：種（ねらい） ══════════ */}
      <Stratum char="種" first>
        {w.concept.length > 0 ? (
          <div className="space-y-7 font-mincho text-[15px] leading-[2.5] tracking-[0.03em] text-tagayase-paper/85 sm:text-base">
            {w.concept.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : (
          <EmptyState text="この区画の種の記録は、いま耕されているところです。" />
        )}
      </Stratum>

      {/* ══════════ 地層二：根（当日の風景） ══════════ */}
      <Stratum char="根">
        {w.photos.length > 0 ? (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {w.photos.map((ph, i) => (
              <figure
                key={ph.src}
                data-unearth
                className="bg-[#F5EFE2] p-3 pb-4 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
                style={{
                  rotate: `${[-1.6, 1.2, -0.9, 1.8, -1.1, 0.8][i % 6]}deg`,
                  marginTop: i % 2 === 1 ? "3rem" : undefined,
                  opacity: 0,
                  animation:
                    "tagayase-unearth 1s cubic-bezier(0.22,1,0.36,1) forwards paused",
                  animationDelay: `${(i % 2) * 0.15}s`,
                }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={ph.src}
                    alt={ph.caption ?? w.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                {ph.caption && (
                  <figcaption className="pt-3 font-mincho text-[11px] leading-[1.8] tracking-[0.06em] text-[#241711]/70">
                    {ph.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        ) : (
          <div
            data-unearth
            className="mx-auto flex aspect-[4/3] max-w-md items-center justify-center border border-dashed border-tagayase-straw/30 p-8"
            style={{
              opacity: 0,
              animation:
                "tagayase-unearth 1s cubic-bezier(0.22,1,0.36,1) forwards paused",
            }}
          >
            <p className="text-center font-mincho text-xs leading-[2.4] tracking-[0.2em] text-tagayase-straw/80">
              この区画の写真は、
              <br />
              現像を待っています。
            </p>
          </div>
        )}
      </Stratum>

      {/* ══════════ 地層三：実り（ふりかえり） ══════════ */}
      <Stratum char="実り">
        {w.archive.length > 0 ? (
          <div
            data-unearth
            className="tagayase-grain bg-tagayase-paper px-7 py-12 text-[#241711] shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:px-12 sm:py-16"
            style={{
              opacity: 0,
              animation:
                "tagayase-unearth 1.1s cubic-bezier(0.22,1,0.36,1) forwards paused",
            }}
          >
            <div className="space-y-7 font-mincho text-[14px] leading-[2.5] tracking-[0.03em] text-[#241711]/85 sm:text-[15px]">
              {w.archive.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState text="この区画の実りは、まだ土の中で育っています。" />
        )}
      </Stratum>

      {/* ══════════ 底：次の区画へ ══════════ */}
      <footer className="relative px-6 pb-16 pt-24 sm:px-12">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-stretch justify-between gap-6 border-t border-tagayase-straw/20 pt-10">
            {prev ? (
              <Link
                href={`/summit/2025/${prev.slug}`}
                className="group max-w-[45%]"
              >
                <p className="text-[10px] tracking-[0.25em] text-tagayase-straw/60">
                  ← 隣の区画
                </p>
                <p className="mt-2 font-mincho text-sm leading-[1.8] text-tagayase-paper/80 transition-colors group-hover:text-tagayase-sprout">
                  {prev.label}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/summit/2025/${next.slug}`}
                className="group max-w-[45%] text-right"
              >
                <p className="text-[10px] tracking-[0.25em] text-tagayase-straw/60">
                  隣の区画 →
                </p>
                <p className="mt-2 font-mincho text-sm leading-[1.8] text-tagayase-paper/80 transition-colors group-hover:text-tagayase-sprout">
                  {next.label}
                </p>
              </Link>
            ) : (
              <span />
            )}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/summit/2025"
              className="inline-block border border-tagayase-straw/40 px-8 py-3.5 font-mincho text-xs tracking-[0.35em] text-tagayase-paper transition-colors hover:bg-tagayase-paper hover:text-tagayase-deep"
            >
              畑へ戻る
            </Link>
            <Image
              src="/images/logo/logo_SUMMIT2025.svg"
              alt="EKKYO.SUMMIT 2025 in 信州上田"
              width={110}
              height={75}
              className="mx-auto mt-14 h-auto w-[110px] opacity-70"
            />
            <p className="mt-5 text-[10px] leading-[2] tracking-[0.15em] text-tagayase-straw/50">
              EKKYO.SUMMIT 2025 in 信州上田「耕せ」
              <br />
              主催 一般社団法人EKKYO.HUB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── 地層セクション ── */
function Stratum({
  char,
  first,
  children,
}: {
  char: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`relative px-6 sm:px-12 ${first ? "pt-10" : "pt-28"} pb-24`}>
      {/* 地層の境目 */}
      <div className="mx-auto mb-20 max-w-2xl" aria-hidden="true">
        <svg
          viewBox="0 0 640 12"
          className="w-full text-tagayase-straw/25"
          preserveAspectRatio="none"
        >
          <path
            d="M0 6 Q40 1 80 6 T160 6 T240 5 T320 7 T400 6 T480 5 T560 7 T640 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-4xl font-bold tracking-[0.15em] sm:text-5xl">
          {char}
        </h2>
        {children}
      </div>
    </section>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <p className="font-mincho text-sm leading-[2.6] tracking-[0.15em] text-tagayase-straw/75">
      {text}
    </p>
  );
}
