"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/* 藍色のデュオトーン＋粒子ノイズをかけた写真。
   ホバー（タップ端末ではタップ）で汚れが上から洗い流されるように原色へ戻る。
   仕組み: 原色の <Image> の上に、同じ画像へ SVG フィルタ(#mamire-ai)を掛けたものを重ね、
   clip-path で上→下へ剥がす。フィルタ定義 <AiPhotoDefs/> はページに1回だけ置く。 */

export const AI_FILTER_ID = "mamire-ai";

/* 藍のデュオトーン: 影 #10305A → 光 #DCE6EC
   各行 = (光−影) × 輝度係数(0.2126, 0.7152, 0.0722) ＋ 影 */
const DUOTONE =
  "0.1701 0.5722 0.0578 0 0.063 " +
  "0.1518 0.5106 0.0516 0 0.188 " +
  "0.1216 0.4091 0.0413 0 0.353 " +
  "0 0 0 1 0";

/* 粒子: ノイズを中間グレー中心の細かな粒に（顔が読める強さに抑える） */
const GRAIN =
  "1.3 0 0 0 -0.15 " +
  "1.3 0 0 0 -0.15 " +
  "1.3 0 0 0 -0.15 " +
  "0 0 0 0 1";

export function AiPhotoDefs() {
  return (
    <svg
      aria-hidden
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter
          id={AI_FILTER_ID}
          colorInterpolationFilters="sRGB"
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values={DUOTONE}
            result="duo"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.1"
            numOctaves="2"
            seed="11"
            result="noise"
          />
          <feColorMatrix in="noise" type="matrix" values={GRAIN} result="grain" />
          <feBlend in="duo" in2="grain" mode="overlay" result="mixed" />
          <feComposite in="mixed" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export default function AiPhoto({
  src,
  alt,
  sizes = "(min-width: 1024px) 30vw, 50vw",
  className,
  priority,
}: Props) {
  const [color, setColor] = useState(false);

  return (
    <span
      className={cn(
        "ai-photo relative block overflow-hidden bg-mamire-water",
        color && "is-color",
        className
      )}
      onClick={() => setColor((c) => !c)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        priority={priority}
        className="ai-photo__mono object-cover"
      />
    </span>
  );
}
