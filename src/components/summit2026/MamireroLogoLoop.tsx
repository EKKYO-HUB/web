"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* 「まみれろ」ロゴが溶け出し、また元の姿に戻るループ演出。
   - ロゴの色は変えない（白いロゴのまま「形」だけが歪む）
   - 60秒の1ループに5種類の崩れ方を配置：
       崩れ1(縦に垂れる) → 復元 → 崩れ2(横に流れる) → 復元 →
       崩れ3(ぼやっと滲み広がる) → 復元 → 崩れ4(細かく砕ける) → 復元 →
       崩れ5(長く尾を引いて溶け落ちる) → 復元 → …
   - ノイズの性質(baseFrequency)は「復元して静止している間」に離散的に
     切り替えるため、切り替え自体は見えない
   - reduced-motion: 変形なしの静止ロゴ / 画面外: pauseAnimations() */

/* 60s タイムライン（0..1）
   各エピソード: 静止 → ピーク → 静止。0%と100%は同値でループ継ぎ目なし */
const SCALE_KEYTIMES =
  "0;0.033;0.1;0.167;0.233;0.3;0.367;0.433;0.5;0.567;0.633;0.7;0.767;0.833;0.9;0.967;1";
const SCALE_VALUES = "0;0;85;0;0;70;0;0;42;0;0;115;0;0;95;0;0";
const SCALE_SPLINES = Array(16).fill("0.4 0 0.4 1").join(";");

/* エピソードごとのノイズ特性（静止中に discrete で切替）
   1: 縦に垂れる / 2: 横に流れる / 3: 滲み用のゆるい歪み /
   4: 細かく砕ける / 5: 長い縦筋で溶け落ちる */
const FREQ_KEYTIMES = "0;0.2;0.4;0.6;0.8;1";
const FREQ_VALUES =
  "0.02 0.007;0.005 0.022;0.011 0.004;0.05 0.04;0.017 0.003;0.02 0.007";

/* 崩れ3で強くぼかして「ぼやっと広がる」、崩れ5でも軽く滲ませる */
const BLUR_KEYTIMES = "0;0.433;0.5;0.567;0.833;0.9;0.967;1";
const BLUR_VALUES = "0;0;6.5;0;0;2.5;0;0";

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
            baseFrequency="0.02 0.007"
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
              <animate
                attributeName="scale"
                values={SCALE_VALUES}
                keyTimes={SCALE_KEYTIMES}
                calcMode="spline"
                keySplines={SCALE_SPLINES}
                dur={DUR}
                repeatCount="indefinite"
              />
            )}
          </feDisplacementMap>
          <feGaussianBlur in="disp" stdDeviation="0">
            {animate && (
              <animate
                attributeName="stdDeviation"
                values={BLUR_VALUES}
                keyTimes={BLUR_KEYTIMES}
                calcMode="linear"
                dur={DUR}
                repeatCount="indefinite"
              />
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
