import Image from "next/image";
import MamireroLogoLoop from "./MamireroLogoLoop";
import ArrivalVeil from "./ArrivalVeil";

/* ヒーロー: KV（歪む琵琶湖）を全面に、白い「まみれろ」が溶けては戻る。
   KV・ロゴとも色には手を加えない（オーバーレイや着色なし）。 */
export default function SummitHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-20"
    >
      {/* 到着時の「水面の揺らぎ」フィルタ: 揺れの振幅がゆっくり収まっていく */}
      <svg aria-hidden focusable="false" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="mamire-water-sway" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.005 0.014" numOctaves="2" seed="9" result="w">
              <animate
                attributeName="baseFrequency"
                values="0.005 0.014;0.007 0.011;0.005 0.014"
                dur="6s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="w" scale="64" xChannelSelector="R" yChannelSelector="G">
              <animate
                attributeName="scale"
                values="64;40;14;0"
                keyTimes="0;0.4;0.75;1"
                calcMode="spline"
                keySplines="0.3 0 0.4 1;0.3 0 0.4 1;0.3 0 0.4 1"
                dur="5.8s"
                begin="0s"
                fill="freeze"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      {/* キービジュアル（原色のまま・到着時にゆっくり寄りながら、水面のように揺れて現れる） */}
      <div className="mamire-kv-in absolute inset-0">
        <div className="mamire-water-sway absolute inset-0 scale-[1.04]">
          <Image
            src="/images/summit2026/kv.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* 到着時の白いベール（水面を抜ける瞬間・演出後にDOMから除去される） */}
      <ArrivalVeil />

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
