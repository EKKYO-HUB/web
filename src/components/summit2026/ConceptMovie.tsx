"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/videos/summit2026/concept.mp4";
const POSTER = "/images/summit2026/concept-poster.jpg";
const YOUTUBE_URL = "https://youtu.be/UWFbagO2SpU";

/* コンセプトムービー。画面に入ると消音で自動再生、外れると停止。
   「音を出す」「全画面」だけの最小操作。reduced-motion では自動再生しない。 */
export default function ConceptMovie() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };

  const fullscreen = () => {
    const v = ref.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
    else v.webkitEnterFullscreen?.();
  };

  const btn =
    "whitespace-nowrap border border-mamire-water-pale/30 px-3 py-2 text-[11px] tracking-[0.15em] text-mamire-water-pale/80 transition-colors hover:border-mamire-water-pale hover:text-mamire-water-pale sm:px-4 sm:tracking-[0.2em]";

  return (
    <section id="movie" className="relative bg-mamire-water-deep">
      <div className="relative h-[62svh] w-full overflow-hidden sm:aspect-video sm:h-auto">
        <video
          ref={ref}
          src={SRC}
          poster={POSTER}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={togglePlay}
          className="h-full w-full cursor-pointer object-cover"
        />
        {/* 前セクション（薄い水）からムービーへ沈み込む */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-mamire-water-pale to-transparent" />

        {/* 自動再生しない環境の再生ボタン */}
        {!playing && !auto && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="再生"
            className="absolute inset-0 grid place-items-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full border border-mamire-water-pale/60 text-mamire-water-pale">
              ▶
            </span>
          </button>
        )}
      </div>

      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5 sm:px-12">
        <p className="font-mincho text-sm tracking-[0.2em] text-mamire-water-pale/70">
          コンセプトムービー
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={togglePlay} className={btn}>
            {playing ? "一時停止" : "再生"}
          </button>
          <button type="button" onClick={toggleSound} className={btn}>
            {muted ? "音を出す" : "消音"}
          </button>
          <button type="button" onClick={fullscreen} className={btn}>
            全画面
          </button>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={btn}
          >
            YouTubeで観る ↗
          </a>
        </div>
      </div>
    </section>
  );
}
