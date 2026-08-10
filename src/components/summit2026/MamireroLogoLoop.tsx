"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* 「まみれろ」ロゴが溶け出し、また元の姿に戻るループ演出。
   - ロゴの色は変えない（白いロゴのまま「形」だけが歪む）
   - SVGフィルタ: feTurbulence(縦長ノイズ) + feDisplacementMap の
     scale を SMIL で 0付近 ⇄ 大 に往復させて「溶解→復元」を表現
   - 0%と100%を同値にした往復値でループの継ぎ目なし
   - reduced-motion: 変形なしの静止ロゴ / 画面外: pauseAnimations() */

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
        {/* 縦に伸びたノイズ(基底周波数 y < x)で、垂れ落ちるような歪みに */}
        <filter
          id="mamire-melt"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.007"
            numOctaves="2"
            seed="7"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            xChannelSelector="R"
            yChannelSelector="G"
            scale={animate ? 2 : 0}
          >
            {animate && (
              <animate
                attributeName="scale"
                values="2;58;16;74;2"
                keyTimes="0;0.3;0.52;0.8;1"
                calcMode="spline"
                keySplines="0.4 0 0.4 1;0.4 0 0.4 1;0.4 0 0.4 1;0.4 0 0.4 1"
                dur="10s"
                repeatCount="indefinite"
              />
            )}
          </feDisplacementMap>
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
