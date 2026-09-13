"use client";

import Image from "next/image";
import { useState, type CSSProperties, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/* 藍色のデュオトーン＋粒子ノイズをかけた写真。
   ホバー／タップした位置から【波紋】が広がるように原色へ戻る。
   仕組み: 藍フィルタ(#mamire-ai)を掛けた <Image> を下に、原色の <Image> を上に重ね、
   上の層を clip-path: circle() でポインタ位置から広げる。輪（波紋）は ::before/::after。
   フィルタ定義 <AiPhotoDefs/> はページに1回だけ置く。 */

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
  "1.12 0 0 0 -0.06 " +
  "1.12 0 0 0 -0.06 " +
  "1.12 0 0 0 -0.06 " +
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
        {/* チラシなど「水に浮く紙」用: 縁を大きめに揺らす */}
        <filter id="mamire-wet-edge" x="-6%" y="-8%" width="112%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves="2"
            seed="21"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        {/* 見出し下の「泥の一滴」用: 輪郭をわずかに揺らす */}
        <filter id="mamire-mud-mark" x="-20%" y="-30%" width="140%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.12"
            numOctaves="2"
            seed="4"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
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
  const [hover, setHover] = useState(false);
  const [locked, setLocked] = useState(false); // タップ端末用トグル
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [wave, setWave] = useState(0); // 波紋アニメを毎回やり直すためのキー

  const place = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: Math.round(((e.clientX - r.left) / r.width) * 100),
      y: Math.round(((e.clientY - r.top) / r.height) * 100),
    });
  };

  const on = hover || locked;

  return (
    <span
      className={cn(
        "ai-photo relative block overflow-hidden bg-mamire-water",
        on && "is-color",
        className
      )}
      style={{ "--rx": `${origin.x}%`, "--ry": `${origin.y}%` } as CSSProperties}
      onMouseEnter={(e) => {
        place(e);
        setWave((w) => w + 1);
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => {
        place(e);
        setWave((w) => w + 1);
        setLocked((v) => !v);
      }}
    >
      {/* 下: 藍色＋粒子 */}
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        priority={priority}
        className="ai-photo__mono object-cover"
      />
      {/* 上: 原色（ポインタ位置から円形に広がる） */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="ai-photo__color object-cover"
      />
      {/* 波紋（輪が2重で広がる） */}
      <span key={wave} className="ai-photo__wave" aria-hidden />
    </span>
  );
}
