import Image from "next/image";
import MamireroLogoLoop from "./MamireroLogoLoop";

/* ヒーロー: KV（歪む琵琶湖）を全面に、白い「まみれろ」が溶けては戻る。
   KV・ロゴとも色には手を加えない（オーバーレイや着色なし）。 */
export default function SummitHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-20"
    >
      {/* キービジュアル（原色のまま・到着時にゆっくり寄りながら現れる） */}
      <div className="mamire-kv-in absolute inset-0">
        <Image
          src="/images/summit2026/kv.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* 次セクションへの沈み込み（最下端のみ） */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-mamire-water-pale" />
      </div>

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
