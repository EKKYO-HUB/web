"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ─── Workshop data ─── */
const workshops = [
  { day: "DAY 01", title: '"嗜好"を"思考"する ～流れる時間の中で、私たちはどう嗜好するのか～' },
  { day: "DAY 01", title: "言葉の収穫ワークショップ" },
  { day: "DAY 01", title: "あ・る" },
  { day: "DAY 01", title: "わたしに影響をくれたもの" },
  { day: "DAY 01", title: "SNOB 編集部ごっこ" },
  { day: "DAY 01", title: "ととのい＝越境!? ～サウナで体感する、身体から始まる越境～" },
  { day: "DAY 01", title: "悩みのタネを芽吹かせて！ 転機ひらめきワークショップ" },
  { day: "DAY 02", title: 'EKKYO.FES「DJ night & Moroccan Bus night talk」～まだ耕したいあなたを載せて～' },
  { day: "DAY 02", title: '"社会課題"と"思考"を越境する ～僕たちの未来をつくる課題と思考法を考える～' },
  { day: "DAY 02", title: "NOEMA/NOESIS ～記憶と知覚のインスタレーション～" },
  { day: "DAY 02", title: "ディープウォーク in 菅平高原 ～46億年の地球の物語を歩く～" },
  { day: "DAY 02", title: "My \"Grapes\" Workshop ～組織視点で振返る意思決定の変遷～" },
  { day: "DAY 02", title: "『美味しいは、どこにある？』～五感と認知を探る日本酒テイスティングワークショップ～" },
  { day: "DAY 02", title: "火星の人" },
  { day: "DAY 03", title: "仮面舞踏会 ～耕す儀礼への招待状～" },
  { day: "DAY 03", title: "発酵から『いのち』と『世界』に出会い直す" },
  { day: "DAY 03", title: "発明の舞台裏を探る ～創造の苦しみと喜び～" },
  { day: "DAY 03", title: "「風邪ですね」に至る医者の思考を追体験！～自らの身体を通して『いのち』について考えよう～" },
];

/* ─── Sponsor data ─── */
const sponsors = {
  organizer: { label: "主催", items: ["EKKYO.HUB"] },
  support: { label: "後援", items: ["上田市", "SUNDRED株式会社"] },
  platinum: { label: "Platinum", items: ["日本たばこ産業株式会社"] },
  gold: { label: "Gold", items: ["一般社団法人Re-Generation"] },
  silver: {
    label: "Silver",
    items: [
      "株式会社ローンディール",
      "パーソルキャリア株式会社",
      "岡崎酒造株式会社",
      '民間文化施設「犀の角」',
      "有限会社ウッドベルファーム",
    ],
  },
  partners: {
    label: "協力 / 出展",
    items: [
      "TODAY'S BÁNH MÌ",
      "おでん屋 upmoat",
      "無能の人",
      "転機堂",
      "変化連",
      "駆動点 powered by Hive Japan",
      "n(e)ndo",
      "Viscoa",
      "Noema Lab",
      "NPO法人やまぼうし自然学校",
      "株式会社バリューブックス",
      "信州サウナ同盟",
      "ONYO Hotel and Lounge",
      "VALUEBOOKS Lab.",
      "SNOB",
      "「話」を売り買いするBAR『話場』",
    ],
  },
};

export default function Summit2025Page() {
  const [selectedWs, setSelectedWs] = useState<number | null>(null);

  const close = useCallback(() => setSelectedWs(null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (selectedWs !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedWs, close]);

  const days = ["DAY 01", "DAY 02", "DAY 03"];

  return (
    <>
      <article className="overflow-x-hidden">
        {/* Hero — matches [slug] template */}
        <div className="relative h-[55vh] min-h-[400px] w-full overflow-hidden sm:h-[65vh]">
          <Image
            src="/images/portfolio/summit-2025-ueda.jpg"
            alt="EKKYO.SUMMIT 2025 in 信州上田"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

          {/* Back link */}
          <div className="absolute left-0 top-0 z-10 px-6 pt-24 sm:px-12">
            <Link
              href="/portfolio"
              className="text-xs tracking-widest text-white/60 transition-colors hover:text-white"
            >
              &larr; PORTFOLIO
            </Link>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12 sm:px-12 lg:px-20">
            <div className="mx-auto max-w-4xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="bg-ekkyo-accent px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white">
                  SUMMIT
                </span>
                <span className="text-xs text-white/50">
                  2025年11月1日〜3日
                </span>
              </div>
              <h1 className="text-[clamp(1.3rem,4.5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-white">
                EKKYO.SUMMIT 2025 in 信州上田
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {["summit", "ueda", "nagano", "co-creation"].map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/20 px-2.5 py-0.5 text-[10px] tracking-wide text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="px-6 py-14 sm:px-12 sm:py-20">
          <p className="mx-auto max-w-3xl text-lg font-medium leading-[2] tracking-tight text-ekkyo-black sm:text-xl lg:text-2xl">
            「耕せ」をテーマに、長野県上田市で3日間開催。感性を耕し合い、まだ見ぬ「わたし」に会いに行く越境の祭典。
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto max-w-3xl px-6 sm:px-12">
          <div className="h-px w-16 bg-ekkyo-accent" />
        </div>

        {/* Concept */}
        <section className="px-6 py-20 sm:px-12 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
              CONCEPT
            </p>
            <div className="mt-8 space-y-6 text-base leading-[2.2] text-ekkyo-black/70 sm:text-lg">
              <p>
                「わたし」は、「わたし」を知っているだろうか。
                <br />
                心の奥底の声が、世間の雑音に埋もれはいないか。
                <br />
                掘り起こす前に、社会の&ldquo;なんとなく&rdquo;で着飾ってはいないか。
              </p>
              <p>
                誰かが決めた、解決すべき課題。
                <br />
                自己表現のために用意された様々なカタログ。
              </p>
              <p>
                社会の作った「らしさ」によって塗り固められ、
                <br />
                どこか「わたし」がそこにいない。
                <br />
                それでも、魂は叫ぶはずだ。
                <br />
                <strong className="text-ekkyo-black">
                  わたしはここにいる。ここに根を張ると。
                </strong>
              </p>
              <p>
                さあ今こそ、その声を聞き、感性を耕し合う時だ。
                <br />
                ぼくらの感性や好奇心は、問いを育む豊かな土壌になる。
                <br />
                そして、その問いから「わたしらしさ」が芽生えるだろう。
              </p>
              <p>
                衣食住を得るために働き、大地を耕すように、
                <br />
                人間は、自身の感性を深く、深く耕していくことで生きてゆく。
                <br />
                それはわたし自身の足で、未開の道を拓くための営みだ。
              </p>
              <p>
                風の人と土の人が越境して、新たな「風土」が生まれるように、
                <br />
                このEKKYO.SUMMITで、場所も、人も、自らさえも越境しよう。
                <br />
                熱い議論、予期せぬ出会い、そして本気の共創を通して、
                <br />
                <strong className="text-ekkyo-black">
                  まだ見ぬ「わたし」に会いに行こう。
                </strong>
              </p>
            </div>
          </div>
        </section>

        {/* Place */}
        <section className="bg-gray-50 px-6 py-20 sm:px-12 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
              PLACE
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              信州 上田
            </h2>
            <div className="mt-8 space-y-4 text-sm leading-[2] text-ekkyo-black/70 sm:text-base">
              <p>
                長野県東部に位置する上田市。日本最長の千曲川が中央を横断するように流れ、南北には美ヶ原と菅平、二つの高原が広がります。
              </p>
              <p>
                豊かな自然に抱かれたこのまちは、日本遺産にも認定された「信州の鎌倉」塩田平、信濃国分寺が築かれた古代、真田の城下町として歴史を刻んだ戦国、そして近代を支えた蚕糸業の発展と、数々の物語を重ねてきました。
              </p>
              <p>
                今回の舞台の中心は、上田の中心市街地・海野町商店街。古くから人と物が行き交い、商いと交流の拠点としてにぎわってきたこの通りは、いまも地元の暮らしと外からの訪れが交わり、新たな出会いと共創の芽を育んでいます。
              </p>
            </div>
          </div>
        </section>

        {/* Workshops */}
        <section className="px-6 py-20 sm:px-12 lg:py-28">
          <div className="mx-auto max-w-5xl">
            <p className="text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
              CONTENTS
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              ワークショップ
            </h2>

            <div className="mt-12 space-y-16">
              {days.map((day) => {
                const dayWs = workshops.filter((w) => w.day === day);
                return (
                  <div key={day}>
                    <h3 className="mb-6 border-b border-black/10 pb-3 text-sm font-semibold tracking-[0.2em] text-ekkyo-accent">
                      {day}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {dayWs.map((ws, i) => {
                        const globalIdx = workshops.indexOf(ws);
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedWs(globalIdx)}
                            className="group flex items-center gap-4 border border-black/10 p-5 text-left transition-all hover:border-ekkyo-accent hover:bg-ekkyo-accent/5"
                          >
                            <span className="flex-1 text-sm font-medium leading-snug tracking-tight">
                              {ws.title}
                            </span>
                            <span className="shrink-0 text-ekkyo-accent opacity-0 transition-opacity group-hover:opacity-100">
                              &rarr;
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sponsors */}
        <section className="bg-ekkyo-black px-6 py-20 sm:px-12 lg:py-28">
          <div className="mx-auto max-w-5xl">
            <p className="text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
              SPONSOR
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              協賛・協力
            </h2>

            <div className="mt-12 space-y-12">
              {/* Organizer & Support */}
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium tracking-[0.15em] text-white/40">
                    {sponsors.organizer.label}
                  </p>
                  <p className="mt-3 text-lg font-bold text-white">
                    {sponsors.organizer.items[0]}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium tracking-[0.15em] text-white/40">
                    {sponsors.support.label}
                  </p>
                  <div className="mt-3 space-y-1">
                    {sponsors.support.items.map((s) => (
                      <p key={s} className="text-sm text-white/80">
                        {s}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/10" />

              {/* Platinum / Gold / Silver */}
              {[sponsors.platinum, sponsors.gold, sponsors.silver].map(
                (tier) => (
                  <div key={tier.label}>
                    <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-ekkyo-accent">
                      {tier.label}
                    </p>
                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                      {tier.items.map((name) => (
                        <p
                          key={name}
                          className="text-sm text-white/70"
                        >
                          {name}
                        </p>
                      ))}
                    </div>
                  </div>
                )
              )}

              <div className="h-px bg-white/10" />

              {/* Partners */}
              <div>
                <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/40">
                  {sponsors.partners.label}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {sponsors.partners.items.map((name) => (
                    <p key={name} className="text-xs text-white/50">
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* External link */}
        <section className="border-t border-black/10 px-6 py-12 text-center sm:px-12">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="https://ekkyosummit2025.studio.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-ekkyo-accent transition-opacity hover:opacity-70"
            >
              公式サイト &rarr;
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-ekkyo-gray transition-colors hover:text-ekkyo-accent"
            >
              &larr; ALL WORKS
            </Link>
          </div>
        </section>
      </article>

      {/* Workshop slide panel */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 transition-opacity duration-300",
          selectedWs !== null
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={close}
      />
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          selectedWs !== null ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={close}
          className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center text-ekkyo-gray transition-colors hover:text-ekkyo-black"
          aria-label="Close"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="2" y1="2" x2="18" y2="18" />
            <line x1="18" y1="2" x2="2" y2="18" />
          </svg>
        </button>

        {selectedWs !== null && (
          <div className="flex flex-1 flex-col px-8 py-16 sm:px-12">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-ekkyo-accent">
              {workshops[selectedWs].day}
            </p>
            <h2 className="mt-4 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
              {workshops[selectedWs].title}
            </h2>
            <div className="mt-8 text-sm leading-[2] text-ekkyo-gray">
              <p>
                ワークショップの詳細は公式サイトをご覧ください。
              </p>
            </div>
            <div className="mt-auto pt-10">
              <Link
                href="https://ekkyosummit2025.studio.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-ekkyo-accent px-6 py-3 text-[11px] font-medium tracking-[0.15em] text-ekkyo-accent transition-all hover:bg-ekkyo-accent hover:text-white"
              >
                公式サイトで詳細を見る &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
