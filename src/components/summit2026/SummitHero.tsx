"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import MamireroLogoLoop from "./MamireroLogoLoop";

/* ヒーロー: KV（琵琶湖）を全面に、白い「まみれろ」が溶けては戻る。
   KV・ロゴとも色には手を加えない（オーバーレイや着色なし）。

   到着演出は「読み込みが終わってから」始める:
   - KV画像の読み込み完了 ＋ フォント準備完了（最長 4s で必ず開始）を待ち、
     #top に .is-ready を付けて CSS アニメ（KV寄り／ベール／ロックアップ）を再生、
     SMIL（水面の揺らぎ・ロゴの結像）は beginElement() で同時に開始する
   - それまでは薄い水色のベールだけが見えている（重い処理は走らない）
   - 揺らぎが収まったら filter 自体を外して描画コストを 0 にする */

const SWAY_MS = 5800;
const VEIL_MS = 3200;

export default function SummitHero() {
  const [ready, setReady] = useState(false);
  const [veil, setVeil] = useState(true);
  const [sway, setSway] = useState(true);
  const started = useRef(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    setReady(true);
  }, []);

  // 画像とフォントが揃ったら開始（キャッシュ済みで onLoad が来ない場合にも対応）
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVeil(false);
      setSway(false);
      start();
      return;
    }
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const img = imgRef.current;
    const image = new Promise<void>((resolve) => {
      if (img && img.complete && img.naturalWidth > 0) resolve();
      else img?.addEventListener("load", () => resolve(), { once: true });
    });
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 4000));
    Promise.race([Promise.all([fonts, image]).then(() => undefined), timeout]).then(start);
  }, [start]);

  // 開始: SMIL を同時に走らせ、ベール／揺らぎの終了を予約
  useEffect(() => {
    if (!ready) return;
    for (const id of ["mamire-sway-anim", "mamire-intro-scale", "mamire-intro-blur"]) {
      const el = document.getElementById(id) as (SVGElement & { beginElement?: () => void }) | null;
      el?.beginElement?.();
    }
    const t1 = window.setTimeout(() => setVeil(false), VEIL_MS);
    const t2 = window.setTimeout(() => setSway(false), SWAY_MS + 200);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [ready]);

  return (
    <section
      id="top"
      className={cn(
        "relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-20",
        ready && "is-ready"
      )}
    >
      {/* 到着時の「水面の揺らぎ」フィルタ: 揺れの振幅がゆっくり収まっていく */}
      <svg aria-hidden focusable="false" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="mamire-water-sway" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.005 0.014" numOctaves="2" seed="9" result="w" />
            <feDisplacementMap in="SourceGraphic" in2="w" scale="0" xChannelSelector="R" yChannelSelector="G">
              <animate
                id="mamire-sway-anim"
                attributeName="scale"
                values="64;40;14;0"
                keyTimes="0;0.4;0.75;1"
                calcMode="spline"
                keySplines="0.3 0 0.4 1;0.3 0 0.4 1;0.3 0 0.4 1"
                dur="5.8s"
                begin="indefinite"
                fill="freeze"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      {/* キービジュアル（原色のまま・読み込み後にゆっくり寄りながら、水面のように揺れて現れる） */}
      <div className="mamire-kv-in absolute inset-0">
        <div className={cn("absolute inset-0 scale-[1.04]", sway && "mamire-water-sway")}>
          <Image
            ref={imgRef}
            src="/images/summit2026/kv.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* 到着時の白いベール（読み込み中はそのまま覆い、開始後に引いていく） */}
      {veil && (
        <div
          aria-hidden
          className="mamire-veil pointer-events-none absolute inset-0 z-20 bg-mamire-water-pale"
        />
      )}

      {/* まみれろ（溶けて戻るループ・原色のまま） */}
      <div className="relative">
        <MamireroLogoLoop className="h-[44svh] max-h-[500px] min-h-[280px] w-auto" />
      </div>

      {/* 大会ロックアップ（日付・会場はロゴ内に含まれる） */}
      <div className="mamire-rise-in relative mt-10 flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/summit2026/ekkyo-summit-2026.svg"
          alt="EKKYO.SUMMIT 2026 — 10.10 sat – 10.12 mon / LAKE BIWA, SHIGA"
          className="h-14 w-auto max-w-[86vw] sm:h-20 lg:h-24"
        />
      </div>

      {/* スクロール誘導 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[9px] tracking-[0.3em] text-mamire-ink/60">
            SCROLL
          </p>
          <div className="h-8 w-px bg-gradient-to-b from-mamire-ink/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
