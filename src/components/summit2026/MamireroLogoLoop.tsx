"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* 「まみれろ」ロゴが溶け出し、また元の姿に戻るループ演出。
   - ロゴの色は変えない（白いロゴのまま「形」だけが歪む）
   - 入場: 溶けきった状態から約2.6秒で「かたちを取り戻す」(没入導入)
   - 以後60秒ループに5種類の崩れ方：
       縦垂れ / 横流れ / ぼやっと滲み広がる / 細かく砕ける / 尾を引いて溶け落ちる
     各崩れの間の「元に戻っている時間」は約2.4秒（短め）
   - ノイズ特性(baseFrequency)は復元静止中に discrete 切替（切替は見えない）
   - reduced-motion: 変形なしの静止ロゴ / 画面外: pauseAnimations() */

const INTRO_DUR = "2.6s";

/* 60s ループ: 5ブロック×12s（静止2.4s → 立ち上がり4.8s → 復元4.8s） */
const SCALE_KEYTIMES =
  "0;0.04;0.12;0.2;0.24;0.32;0.4;0.44;0.52;0.6;0.64;0.72;0.8;0.84;0.92;1";
const SCALE_VALUES = "0;0;85;0;0;70;0;0;42;0;0;115;0;0;95;0";
const SCALE_SPLINES = Array(15).fill("0.4 0 0.4 1").join(";");

/* エピソードごとのノイズ特性（静止中に切替）
   1: 縦垂れ / 2: 横流れ / 3: 滲み用のゆるい歪み / 4: 細かく砕け / 5: 長い縦筋 */
const FREQ_KEYTIMES = "0;0.2;0.4;0.6;0.8;1";
const FREQ_VALUES =
  "0.02 0.007;0.005 0.022;0.011 0.004;0.05 0.04;0.017 0.003;0.02 0.007";

/* 崩れ3で強くぼかして「ぼやっと広がる」、崩れ5でも軽く滲ませる */
const BLUR_KEYTIMES = "0;0.44;0.52;0.6;0.84;0.92;1";
const BLUR_VALUES = "0;0;6.5;0;0;2.5;0";

const DUR = "60s";

export default function MamireroLogoLoop({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimate(false);
    }
  }, []);

  // 画面外では SMIL を停止して電池を守る
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        try {
          if (e.isIntersecting) svg.unpauseAnimations();
          else svg.pauseAnimations();
        } catch {
          /* no-op */
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 644 1013"
      className={cn("select-none", className)}
      role="img"
      aria-label="まみれろ"
    >
      <defs>
        <filter
          id="mamire-melt"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.014 0.005"
            numOctaves="2"
            seed="7"
            result="n"
          >
            {animate && (
              <animate
                attributeName="baseFrequency"
                values={FREQ_VALUES}
                keyTimes={FREQ_KEYTIMES}
                calcMode="discrete"
                begin={INTRO_DUR}
                dur={DUR}
                repeatCount="indefinite"
              />
            )}
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            xChannelSelector="R"
            yChannelSelector="G"
            scale={0}
            result="disp"
          >
            {animate && (
              <>
                {/* 入場: 溶けきった状態 → かたちを取り戻す */}
                <animate
                  attributeName="scale"
                  values="130;0"
                  calcMode="spline"
                  keySplines="0.2 0.6 0.3 1"
                  begin="0s"
                  dur={INTRO_DUR}
                  fill="freeze"
                />
                {/* 以後: 60秒×5パターンのループ */}
                <animate
                  attributeName="scale"
                  values={SCALE_VALUES}
                  keyTimes={SCALE_KEYTIMES}
                  calcMode="spline"
                  keySplines={SCALE_SPLINES}
                  begin={INTRO_DUR}
                  dur={DUR}
                  repeatCount="indefinite"
                />
              </>
            )}
          </feDisplacementMap>
          <feGaussianBlur in="disp" stdDeviation="0">
            {animate && (
              <>
                <animate
                  attributeName="stdDeviation"
                  values="7;0"
                  calcMode="spline"
                  keySplines="0.2 0.6 0.3 1"
                  begin="0s"
                  dur={INTRO_DUR}
                  fill="freeze"
                />
                <animate
                  attributeName="stdDeviation"
                  values={BLUR_VALUES}
                  keyTimes={BLUR_KEYTIMES}
                  calcMode="linear"
                  begin={INTRO_DUR}
                  dur={DUR}
                  repeatCount="indefinite"
                />
              </>
            )}
          </feGaussianBlur>
        </filter>
      </defs>
      <image
        href="/images/summit2026/mamirero-crop.svg"
        x="0"
        y="0"
        width="644"
        height="1013"
        filter="url(#mamire-melt)"
      />
    </svg>
  );
}
