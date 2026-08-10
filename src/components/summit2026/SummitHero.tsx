import MamireroLogoLoop from "./MamireroLogoLoop";
import type { StainPreset } from "./MamireroLogoLoop";

/* ヒーロー: 濁り水の湖面に白い「まみれろ」が浮かび、泥/墨に塗れていく */
export default function SummitHero({ stain }: { stain: StainPreset }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-mamire-water px-6 pb-16 pt-20"
    >
      {/* 沈殿の気配（静的・極薄の染み） */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(closest-side, #5A4632 55%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-1/4 h-[28rem] w-[28rem] rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(closest-side, #3E4A45 50%, transparent 72%)",
        }}
      />

      {/* まみれろ（縦型ロゴ・塗れていくループ） */}
      <MamireroLogoLoop
        stain={stain}
        className="aspect-[644/1013] h-[46svh] max-h-[520px] min-h-[300px]"
      />

      {/* 大会ロックアップ + 開催情報 */}
      <div className="mt-10 flex flex-col items-center gap-5 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/summit2026/ekkyo-summit-2026.svg"
          alt="EKKYO.SUMMIT 2026"
          className="h-6 w-auto brightness-0 opacity-85 sm:h-8"
        />
        <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-mamire-ink">
          <span className="font-montserrat text-lg font-semibold tracking-wide sm:text-xl">
            2026.10.10 – 12
          </span>
          <span className="hidden h-4 w-px bg-mamire-ink/30 sm:block" />
          <span className="text-sm tracking-[0.15em] sm:text-base">
            滋賀・琵琶湖
          </span>
        </p>
      </div>

      {/* スクロール誘導 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[9px] tracking-[0.3em] text-mamire-ink/50">
            SCROLL
          </p>
          <div className="h-8 w-px bg-gradient-to-b from-mamire-ink/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
