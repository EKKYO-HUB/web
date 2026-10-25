"use client";

import { useState } from "react";

const VIDEO_ID = "6JRiI8_Wj9s";
const YOUTUBE_URL = `https://youtu.be/${VIDEO_ID}`;
const THUMB = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

/* 当日のムービー（YouTube）。最初はサムネイルだけを出し、押したときに
   プレーヤー（youtube-nocookie）を読み込んで再生する。ページの読み込みを重くしない。 */
export default function EventMovie() {
  const [playing, setPlaying] = useState(false);

  const btn =
    "whitespace-nowrap border border-mamire-water-pale/30 px-3 py-2 text-[11px] tracking-[0.15em] text-mamire-water-pale/80 transition-colors hover:border-mamire-water-pale hover:text-mamire-water-pale sm:px-4 sm:tracking-[0.2em]";

  return (
    <section
      id="event-movie"
      className="scroll-mt-[120px] border-t border-mamire-water-pale/10 bg-mamire-water-deep"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&playsinline=1`}
            title="EKKYO.SUMMIT 2026 まみれろ 当日のムービー"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="当日のムービーを再生"
            className="group absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={THUMB}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-mamire-water-deep/25 transition-colors group-hover:bg-mamire-water-deep/10" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-mamire-water-pale/70 bg-mamire-water-deep/40 pl-1 text-lg text-mamire-water-pale backdrop-blur-[2px] transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
                ▶
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-12">
        <p className="font-mincho text-sm tracking-[0.2em] text-mamire-water-pale/70">
          当日のムービー
        </p>
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
        >
          YouTubeで観る ↗
        </a>
      </div>
    </section>
  );
}
