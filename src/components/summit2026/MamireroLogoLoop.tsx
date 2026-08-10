"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/* 「まみれろ」ロゴが泥/墨に塗れていくループ演出。
   - CSSマスク方式: ロゴSVG(フィルタ除去版)のアルファで染みレイヤーを型抜き
   - 動きは blob の transform のみ(パリンドローム9s・位相差)＝GPU合成で軽量
   - エッジの荒れは静的 feTurbulence + feDisplacementMap（640px以下は無効化）
   - reduced-motion: 半分塗れた静止状態 / mask非対応: 下地ロゴのみ表示 */

const STAIN_PRESETS = {
  mud: "#4A3423", // 泥・土
  sumi: "#1C1A17", // 墨・インク
} as const;

export type StainPreset = keyof typeof STAIN_PRESETS;

export default function MamireroLogoLoop({
  stain = "mud",
  className,
}: {
  stain?: StainPreset;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // 画面外では blob アニメを停止して電池を守る
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => setPaused(!e.isIntersecting),
      { rootMargin: "80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="まみれろ"
      data-mamire-paused={paused}
      className={cn("relative select-none", className)}
      style={{ "--stain": STAIN_PRESETS[stain] } as CSSProperties}
    >
      {/* エッジを荒らす静的フィルタ定義（動かさない） */}
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <filter id="mamire-rough" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="7"
              result="n"
            />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="9" />
          </filter>
        </defs>
      </svg>

      {/* 下地: 白いロゴ（シャドウ付きクロップ版） */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/summit2026/mamirero-crop.svg"
        alt=""
        draggable={false}
        className="mamire-logo-base h-full w-full object-contain"
      />

      {/* 染みレイヤー: ロゴ型に抜かれた泥/墨ブロブがループで満ち引きする */}
      <div
        aria-hidden
        className="mamire-stain-layer mamire-rough absolute inset-0 overflow-hidden"
      >
        <div className="mamire-blob mamire-blob-a" />
        <div className="mamire-blob mamire-blob-b" />
        <div className="mamire-blob mamire-blob-c" />
      </div>
    </div>
  );
}
