import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SummitHeader from "@/components/summit2026/SummitHeader";
import SummitHero from "@/components/summit2026/SummitHero";
import ConceptPoem, { Stanza } from "@/components/summit2026/ConceptPoem";
import ConceptMovie from "@/components/summit2026/ConceptMovie";
import EventMovie from "@/components/summit2026/EventMovie";
import Timetable from "@/components/summit2026/Timetable";
import Exhibitors from "@/components/summit2026/Exhibitors";
import { AiPhotoDefs } from "@/components/summit2026/AiPhoto";
import MamireDirt from "@/components/summit2026/MamireDirt";
import SummitSectionNav from "@/components/ui/SummitSectionNav";
import {
  ORGANIZER_PHOTO,
  TIMETABLE_OVERVIEW,
  FLYER_URL,
  FLYER_PREVIEW,
} from "@/content/summit2026";
import { shipporiMincho } from "./fonts";

const EVENT = {
  dateLabel: "2026.10.10 – 12",
  dateFull: "2026年10月10日(土)〜12日(月・祝)",
  placeShort: "滋賀・琵琶湖",
};

/* ─── 開催概要（大型スペック表） ─── */
const OUTLINE = [
  { label: "名称", value: "EKKYO.SUMMIT 2026「まみれろ」" },
  { label: "日程", value: "2026年10月10日(土)〜12日(月・祝)" },
  { label: "会場", value: "琵琶湖 湖畔（JR湖西線・永原駅 集合）" },
  { label: "規模", value: "約100名" },
  {
    label: "対象",
    value: "高校生〜若手社会人を中心に、好奇心や探求心を持つすべての年代の方",
  },
  { label: "主催", value: "一般社団法人EKKYO.HUB" },
  { label: "共催", value: "ONE SLASH株式会社" },
  {
    label: "協力",
    value: "一般社団法人こくりしが／DEEP BANK（西浅井町の貸切キャンプ場）",
  },
];

/* ─── これまでの歩み ─── */
const HISTORY = [
  { year: "2022", place: "Munich", theme: "共創" },
  { year: "2023", place: "Sendai", theme: "繋ぐ" },
  { year: "2024", place: "Itoshima", theme: "転べ" },
  { year: "2025", place: "Ueda", theme: "耕せ" },
  { year: "2026", place: "Biwako", theme: "まみれろ", current: true },
];

/* ─── ページ内ナビ ─── */
const SECTION_NAV = [
  { id: "concept", label: "コンセプト" },
  { id: "outline", label: "開催概要" },
  { id: "about", label: "サミットとは" },
  { id: "history", label: "これまで" },
  { id: "program", label: "タイムテーブル" },
  { id: "workshop", label: "出展者" },
];

export const metadata: Metadata = {
  title: "EKKYO.SUMMIT 2026「まみれろ」in 琵琶湖",
  description:
    "EKKYO.HUBの年次フラグシップイベント「EKKYO.SUMMIT 2026『まみれろ』」（2026年10月10日〜12日）。「まみれろ」をテーマに、滋賀県・琵琶湖の湖畔で3日間開催。水に、土に、人にまみれながら、まみれた生の豊かさを体現する越境の祝祭。",
  alternates: { canonical: "https://www.ekkyo.jp/summit/2026" },
  openGraph: {
    title: "EKKYO.SUMMIT 2026「まみれろ」in 琵琶湖",
    description:
      "2026年10月10日〜12日。「まみれろ」をテーマに、滋賀県・琵琶湖の湖畔で3日間開催。水に、土に、人にまみれながら、まみれた生の豊かさを体現する越境の祝祭。",
    url: "https://www.ekkyo.jp/summit/2026",
    type: "website",
    images: [{ url: "/images/og/OG.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EKKYO.SUMMIT 2026「まみれろ」in 琵琶湖",
    description:
      "2026年10月10日〜12日。「まみれろ」をテーマに、滋賀県・琵琶湖の湖畔で3日間開催。水に、土に、人にまみれながら、まみれた生の豊かさを体現する越境の祝祭。",
    images: ["/images/og/OG.png"],
  },
};

/* 見出し（明朝）。eyebrow・罫線は使わず、下に小さな泥の染みを一滴落とす */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-mincho text-3xl font-bold tracking-wide text-mamire-ink sm:text-4xl">
        {children}
      </h2>
      <svg
        aria-hidden
        width="30"
        height="14"
        viewBox="0 0 30 14"
        className="mt-4 text-mamire-mud/75"
      >
        <path
          d="M4 7.5c1.5-3.8 6-5.5 11-5.2 5 .3 9.5 1.6 11 4.4 1 2-2.2 4.3-7.5 4.8-5.6.5-11.3-.4-13.6-2.1C4 8.9 3.8 8.2 4 7.5z"
          fill="currentColor"
          filter="url(#mamire-mud-mark)"
        />
      </svg>
    </div>
  );
}

export default function Summit2026Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "EKKYO.SUMMIT 2026「まみれろ」",
    description:
      "EKKYO.HUBの年次フラグシップイベント。越境と共創を通じて、まだ見ぬ「わたし」と出会う3日間。",
    startDate: "2026-10-10",
    endDate: "2026-10-12",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "琵琶湖 湖畔（JR湖西線・永原駅 集合）",
      address: {
        "@type": "PostalAddress",
        addressRegion: "滋賀県",
        addressCountry: "JP",
      },
    },
    image: "https://www.ekkyo.jp/images/og/OG.png",
    url: "https://www.ekkyo.jp/summit/2026",
    organizer: {
      "@type": "Organization",
      name: "一般社団法人EKKYO.HUB",
      url: "https://www.ekkyo.jp",
    },
  };

  return (
    <div
      className={`${shipporiMincho.variable} mamire-noise -mt-[69px] bg-transparent text-mamire-ink`}
    >
      {/* 地の色は body に持たせ、その上に MamireDirt（汚れ）→ コンテンツの順で重なる */}
      <style
        dangerouslySetInnerHTML={{ __html: "body{background:#E6EDEA}" }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SummitHeader />
      {/* 藍色写真用の SVG フィルタ定義（ページに1回） */}
      <AiPhotoDefs />
      {/* スクロールで画面がまみれていく（body直下へポータル） */}
      <MamireDirt />

      {/* ════════ HERO: KVの上でまみれろが溶けては戻る ════════ */}
      <SummitHero />

      {/* ════════ ページ内ナビ（追従・現在地ハイライト） ════════ */}
      <SummitSectionNav items={SECTION_NAV} tone="mamire" offset={120} />

      <ConceptPoem>
        {/* ════════ コンセプト（詩・連ごとに浮かび上がる） ════════ */}
        <section
          id="concept"
          className="scroll-mt-[120px] px-6 py-28 sm:px-12 lg:py-36"
        >
          <div className="mx-auto max-w-2xl">
            <div className="space-y-10 font-mincho text-[15px] leading-[2.6] tracking-[0.04em] text-mamire-ink/85 sm:text-lg">
              <Stanza>
                <p>わかりやすい言葉に取りまとめるとき。</p>
                <p>綺麗な姿へ繕うとき。</p>
                <p>居心地が良いものを求めるとき。</p>
              </Stanza>
              <Stanza>
                <p>
                  削ぎ落とされてしまったものは、不便で分かりにくく、非合理的。
                  <br />
                  それはどことなく、身近なところにあるおぞましいもの、「穢れ」にも似ている。
                  <br />
                  僕たちは一生懸命、そんなものを排除する。徹底的に排除する。
                  <br />
                  そうして、今日の社会が目前に広がっている。
                </p>
              </Stanza>
              <Stanza>
                <p>
                  一方で、僕たちの目では穢れであるものが、
                  <br className="hidden sm:block" />
                  他の誰かにとっては、生きることと不可分なものである可能性はないだろうか？
                  <br />
                  こんなことを考えるとき、その「誰か」には何が当てはまるのだろうか？
                  <br />
                  また、僕たちは「誰か」との関係をどのように取りもち、考えていくことができるのだろうか？
                </p>
              </Stanza>
              <Stanza>
                <p>
                  僕たちは自分らしく生きることを認められている。
                  <br />
                  しかし、それと同時に僕たちの外側に「誰か」が存在し、「誰か」もまた生きている。
                </p>
              </Stanza>

              <Stanza className="!mt-16">
                <p className="text-2xl font-bold tracking-wide text-mamire-ink sm:text-3xl">
                  だからこそ、まみれろ。
                </p>
                <p className="mt-4">
                  「私は私」でありながら、私ならざるものの生を強く感じるために。
                </p>
              </Stanza>
              <Stanza className="!mt-14">
                <p className="text-2xl font-bold tracking-wide text-mamire-ink sm:text-3xl">
                  だからこそ、まみれろ。
                </p>
                <p className="mt-4">
                  綺麗な世界にて、僕たちから隠されてしまったものについてもう一度考えるために。
                </p>
              </Stanza>
              <Stanza className="!mt-14">
                <p className="text-2xl font-bold tracking-wide text-mamire-ink sm:text-3xl">
                  だからこそ、まみれろ。
                </p>
                <p className="mt-4">
                  他の誰でもなく自分自身の生そのものを、数多の存在に囲まれて「豊か」にするために。
                </p>
              </Stanza>

              <Stanza className="!mt-20">
                <p className="text-xl font-bold tracking-wide text-mamire-ink sm:text-2xl">
                  まみれた僕たちは、何者になりうるだろうか？
                </p>
              </Stanza>
            </div>
          </div>
        </section>

        {/* ════════ コンセプトムービー（詩のあとに沈む） ════════ */}
        <ConceptMovie />

        {/* ════════ 開催概要（大型スペック表） ════════ */}
        <section
          id="outline"
          className="scroll-mt-[120px] bg-mamire-water/40 px-6 py-24 sm:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-3xl">
            <SectionTitle>開催概要</SectionTitle>
            <dl className="divide-y divide-mamire-silt/30 border-y border-mamire-silt/40">
              {OUTLINE.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 py-7 sm:grid-cols-[160px_1fr] sm:gap-8"
                >
                  <dt className="font-mincho text-base font-bold tracking-[0.2em] text-mamire-mud">
                    {row.label}
                  </dt>
                  <dd className="text-sm leading-[2] text-mamire-ink/85 sm:text-base">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* チラシ（水に浮かべた紙のように、縁を揺らして地に馴染ませる） */}
            <figure className="mt-16">
              <div className="mamire-paper">
                {FLYER_URL ? (
                  <a href={FLYER_URL} target="_blank" rel="noopener noreferrer" className="block">
                    <Image
                      src={FLYER_PREVIEW.src}
                      alt={FLYER_PREVIEW.alt}
                      width={FLYER_PREVIEW.width}
                      height={FLYER_PREVIEW.height}
                      sizes="(min-width: 1024px) 768px, 100vw"
                      className="h-auto w-full"
                    />
                  </a>
                ) : (
                  <Image
                    src={FLYER_PREVIEW.src}
                    alt={FLYER_PREVIEW.alt}
                    width={FLYER_PREVIEW.width}
                    height={FLYER_PREVIEW.height}
                    sizes="(min-width: 1024px) 768px, 100vw"
                    className="h-auto w-full"
                  />
                )}
              </div>
              <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-2 text-[11px] tracking-[0.15em] text-mamire-silt">
                <span>チラシ</span>
                {FLYER_URL && (
                  <a
                    href={FLYER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mamire-mud underline decoration-mamire-mud/40 underline-offset-4 transition-opacity hover:opacity-70"
                  >
                    PDFを開く ↗
                  </a>
                )}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ════════ サミットとは ════════ */}
        <section
          id="about"
          className="scroll-mt-[120px] px-6 py-24 sm:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-3xl">
            <SectionTitle>EKKYO.SUMMITとは</SectionTitle>
            <div className="space-y-6 text-sm leading-[2.2] text-mamire-ink/85 sm:text-base">
              <p>
                EKKYO.SUMMITは、「若者という文化（＝越境）」を創る一般社団法人EKKYO.HUBの年次フラグシップイベントです。
                ラボやオフィスなど、安心できるいつもの居場所から飛び出して、日本各地の異なる地域に入り込む。
                背景の違う「よそ者（風の人）」と「地域の人（土の人）」が交わることで、新たな風土を巻き起こしてきました。
              </p>
              <p>
                偶発的な議論や出会いを生む、日本で最もカオスな場。
                地場産業と連関させたフィールドワーク。コンセプトに共感する企業・団体が出展する文化祭の側面。
                数ヶ月に及ぶフィールドワークの中から、会場も、コンセプトも、プログラムも紡がれていきます。
              </p>
              <p>
                5年目の舞台は、滋賀・琵琶湖。
                水と、そこに息づくあらゆるものにまみれる3日間です。
              </p>
            </div>

            {/* 主催: EKKYO.HUB（原色のまま） */}
            <figure className="mt-14">
              <div className="relative aspect-video w-full overflow-hidden bg-mamire-water">
                <Image
                  src={ORGANIZER_PHOTO.src}
                  alt={ORGANIZER_PHOTO.alt}
                  fill
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-[11px] tracking-[0.15em] text-mamire-silt">
                一般社団法人EKKYO.HUB
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ════════ これまでの歩み（編集的リスト） ════════ */}
        <section
          id="history"
          className="scroll-mt-[120px] bg-mamire-water/40 px-6 py-24 sm:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-3xl">
            <SectionTitle>これまでの歩み</SectionTitle>
            <ol className="divide-y divide-mamire-silt/30 border-y border-mamire-silt/40">
              {HISTORY.map((h) => (
                <li
                  key={h.year}
                  className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-6"
                >
                  <span
                    className={`font-montserrat text-xl font-semibold tracking-wide sm:text-2xl ${
                      h.current ? "text-mamire-mud" : "text-mamire-ink/40"
                    }`}
                  >
                    {h.year}
                  </span>
                  <span className="text-[11px] tracking-[0.2em] text-mamire-silt">
                    {h.place}
                  </span>
                  <span
                    className={`ml-auto font-mincho text-xl font-bold tracking-wide sm:text-2xl ${
                      h.current ? "text-mamire-mud" : "text-mamire-ink"
                    }`}
                  >
                    {h.theme}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ════════ タイムテーブル ════════ */}
        <section
          id="program"
          className="scroll-mt-[120px] px-6 py-24 sm:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-3xl">
            <SectionTitle>タイムテーブル</SectionTitle>
          </div>
          {/* 概略図（本文幅より大きく・白地は multiply で地に溶かす） */}
          <figure className="mx-auto mb-16 max-w-6xl">
            <Image
              src={TIMETABLE_OVERVIEW.src}
              alt={TIMETABLE_OVERVIEW.alt}
              width={TIMETABLE_OVERVIEW.width}
              height={TIMETABLE_OVERVIEW.height}
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="h-auto w-full mix-blend-multiply"
            />
          </figure>
          <div className="mx-auto max-w-3xl">
            <Timetable />
          </div>
        </section>

        {/* ════════ ワークショップ（担当者） ════════ */}
        <section
          id="workshop"
          className="scroll-mt-[120px] bg-mamire-water/40 px-6 py-24 sm:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-3xl">
            <SectionTitle>出展者</SectionTitle>
            <p className="mb-12 max-w-2xl text-sm leading-[2.2] text-mamire-ink/85 sm:text-base">
              湖畔の森から街道の宿、寿司、茶道、炊飯、フェスまで。
              土と水にまみれる場をひらく人たちです。
            </p>
            <Exhibitors />
          </div>
        </section>

      </ConceptPoem>

      {/* ════════ 結び（水底） ════════ */}
      <section
        id="thanks"
        className="scroll-mt-[120px] bg-mamire-water-deep px-6 pb-14 pt-24 text-center sm:px-12 lg:pt-32"
      >
        <h2 className="font-mincho text-3xl font-bold tracking-wide text-mamire-water-pale sm:text-4xl">
          ご参加ありがとうございました。
        </h2>
        <p className="mt-5 text-sm tracking-[0.18em] text-mamire-water-pale/70">
          {EVENT.dateFull} ／ {EVENT.placeShort}
        </p>
        <EventMovie />
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="https://www.instagram.com/ekkyo.hub/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-mamire-water-pale/30 px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-mamire-water-pale transition-colors hover:bg-mamire-water-pale hover:text-mamire-water-deep"
          >
            INSTAGRAM
          </a>
        </div>

        {/* クレジット */}
        <p className="mx-auto mt-16 max-w-2xl text-[11px] leading-[2.2] tracking-[0.15em] text-mamire-water-pale/55">
          主催　一般社団法人EKKYO.HUB
          <br />
          共催　ONE SLASH株式会社
          <br />
          協力　一般社団法人こくりしが／DEEP BANK（西浅井町の貸切キャンプ場）
        </p>

        {/* 専用ミニフッター */}
        <div className="mt-24 border-t border-mamire-water-pale/15 pt-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/"
              className="text-[11px] tracking-[0.15em] text-mamire-water-pale/60 transition-colors hover:text-mamire-water-pale"
            >
              &larr; EKKYO.HUB
            </Link>
            <p className="text-[11px] tracking-wide text-mamire-water-pale/40">
              &copy; 2026 一般社団法人EKKYO.HUB
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
