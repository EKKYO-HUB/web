import Image from "next/image";
import MamireroLogoLoop from "./MamireroLogoLoop";

/* ヒーロー: KV（歪む琵琶湖）を全面に、白い「まみれろ」が溶けては戻る */
export default function SummitHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-20"
    >
      {/* キービジュアル */}
      <div className="absolute inset-0">
        <Image
          src="/images/summit2026/kv.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* 可読性のための薄い引き締め + 次セクションへの沈み込み */}
        <div className="absolute inset-0 bg-mamire-water-deep/15" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-mamire-water-pale" />
      </div>

      {/* まみれろ（溶けて戻るループ） */}
      <div className="relative">
        <MamireroLogoLoop className="h-[46svh] max-h-[520px] min-h-[300px] w-auto drop-shadow-[0_10px_30px_rgba(20,35,40,0.35)]" />
      </div>

      {/* 大会ロックアップ + 開催情報（白・影付きでKVに乗せる） */}
      <div className="relative mt-8 flex flex-col items-center gap-4 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/summit2026/ekkyo-summit-2026.svg"
          alt="EKKYO.SUMMIT 2026"
          className="h-7 w-auto drop-shadow-[0_2px_10px_rgba(20,35,40,0.45)] sm:h-9"
        />
        <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white [text-shadow:0_1px_8px_rgba(20,35,40,0.5)]">
          <span className="font-montserrat text-lg font-semibold tracking-wide sm:text-xl">
            2026.10.10 – 12
          </span>
          <span className="hidden h-4 w-px bg-white/50 sm:block" />
          <span className="text-sm tracking-[0.15em] sm:text-base">
            滋賀・琵琶湖
          </span>
        </p>
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
