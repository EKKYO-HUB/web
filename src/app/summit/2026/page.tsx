import type { Metadata } from "next";
import Link from "next/link";
import SummitHeader from "@/components/summit2026/SummitHeader";
import SummitHero from "@/components/summit2026/SummitHero";
import StickyCta from "@/components/summit2026/StickyCta";
import ConceptPoem, { Stanza } from "@/components/summit2026/ConceptPoem";
import SummitSectionNav from "@/components/ui/SummitSectionNav";
import { shipporiMincho } from "./fonts";

/* ──────────────────────────────────────────────────────────
   申し込みURL — 決まり次第ここに入れるだけで、
   ヘッダー/追従/末尾すべてのCTAが有効化されます。
   例: const REGISTRATION_URL = "https://ekkyo-hub.peatix.com/...";
   ────────────────────────────────────────────────────────── */
const REGISTRATION_URL: string | null = null;

const EVENT = {
  dateLabel: "2026.10.10 – 12",
  dateFull: "2026年10月10日(土)〜12日(月・祝)",
  placeShort: "滋賀・琵琶湖",
};

/* ─── 開催概要（大型スペック表） ─── */
const OUTLINE = [
  { label: "名称", value: "EKKYO.SUMMIT 2026「まみれろ」" },
  { label: "日程", value: "2026年10月10日(土)〜12日(月・祝)" },
  { label: "会場", value: "琵琶湖 湖畔（米原駅集合予定）" },
  { label: "規模", value: "50〜70名程度" },
  {
    label: "対象",
    value: "高校生〜若手社会人を中心に、好奇心や探求心を持つすべての年代の方",
  },
  { label: "主催", value: "一般社団法人EKKYO.HUB" },
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
  { id: "program", label: "プログラム" },
  { id: "sponsor", label: "協賛" },
  { id: "access", label: "アクセス" },
  { id: "apply", label: "参加する" },
];

export const metadata: Metadata = {
  title: "EKKYO.SUMMIT 2026「まみれろ」in 琵琶湖",
  description:
    "EKKYO.HUBの年次フラグシップイベント「EKKYO.SUMMIT 2026『まみれろ』」。2026年10月10日〜12日、滋賀県・琵琶湖の湖畔で開催。越境と共創を通じて、まだ見ぬ「わたし」と出会う3日間。",
  alternates: { canonical: "https://www.ekkyo.jp/summit/2026" },
  openGraph: {
    title: "EKKYO.SUMMIT 2026「まみれろ」in 琵琶湖",
    description:
      "2026年10月10日〜12日、滋賀県・琵琶湖の湖畔で開催。越境と共創を通じて、まだ見ぬ「わたし」と出会う3日間。",
    url: "https://www.ekkyo.jp/summit/2026",
    type: "website",
    images: [{ url: "/images/og/OG.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EKKYO.SUMMIT 2026「まみれろ」in 琵琶湖",
    description:
      "2026年10月10日〜12日、滋賀県・琵琶湖の湖畔で開催。越境と共創を通じて、まだ見ぬ「わたし」と出会う3日間。",
    images: ["/images/og/OG.png"],
  },
};

/* 見出し（明朝・下に細罫線）。eyebrow は使わない */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-mincho text-3xl font-bold tracking-wide text-mamire-ink sm:text-4xl">
        {children}
      </h2>
      <div className="mt-5 h-px w-14 bg-mamire-mud/70" />
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
      name: "琵琶湖 湖畔（米原駅集合予定）",
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
      className={`${shipporiMincho.variable} mamire-noise -mt-[69px] bg-mamire-water-pale text-mamire-ink`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SummitHeader registrationUrl={REGISTRATION_URL} />

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
                  {h.current && (
                    <span className="w-full pt-1 text-[11px] tracking-[0.15em] text-mamire-mud/80 sm:w-auto sm:pl-4 sm:pt-0">
                      ── 今年、琵琶湖にて
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ════════ プログラム（近日公開） ════════ */}
        <section
          id="program"
          className="scroll-mt-[120px] px-6 py-24 sm:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-3xl">
            <SectionTitle>プログラム</SectionTitle>
            <p className="max-w-2xl text-sm leading-[2.2] text-mamire-ink/85 sm:text-base">
              いま、琵琶湖のほとりでフィールドワークを重ねながら、3日間のプログラムを紡いでいます。
              タイムテーブル、ワークショップ、フィールドワークの詳細は、決まり次第この場所で公開します。
            </p>
            <div className="mt-10 grid gap-px overflow-hidden border border-mamire-silt/40 bg-mamire-silt/40 sm:grid-cols-3">
              {[
                { title: "タイムテーブル", desc: "3日間の流れの全体像" },
                { title: "ワークショップ", desc: "土と水にまみれる体験" },
                { title: "フィールドワーク", desc: "湖畔をめぐる問いの旅" },
              ].map((c) => (
                <div key={c.title} className="bg-mamire-water-pale p-8">
                  <p className="font-mincho text-lg font-bold text-mamire-ink">
                    {c.title}
                  </p>
                  <p className="mt-2 text-sm leading-[1.9] text-mamire-ink/70">
                    {c.desc}
                  </p>
                  <p className="mt-5 text-[11px] tracking-[0.15em] text-mamire-mud">
                    近日公開
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ 協賛・パートナー ════════ */}
        <section
          id="sponsor"
          className="scroll-mt-[120px] bg-mamire-water/40 px-6 py-24 sm:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-3xl">
            <SectionTitle>協賛・パートナー募集</SectionTitle>
            <div className="space-y-6 text-sm leading-[2.2] text-mamire-ink/85 sm:text-base">
              <p>
                EKKYO.SUMMIT 2026「まみれろ」では、コンセプトに共感し、ともに場を創ってくださる協賛・パートナー企業の皆さまを募集しています。
              </p>
              <p>
                イベントページ・SNSでのロゴ掲出、SUMMITでのワークショップ開催や対談・スピーチ、出張越境カンファレンスなど、ご関心や規模に合わせて柔軟にご一緒できればと考えています。
              </p>
              <p>
                協賛プランの詳細・お見積りは個別にご案内いたしますので、まずはお気軽にお問い合わせください。
              </p>
            </div>
            <div className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 border border-mamire-ink bg-mamire-ink px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-mamire-water-pale transition-colors hover:bg-transparent hover:text-mamire-ink"
              >
                協賛について問い合わせる
                <span className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ════════ アクセス ════════ */}
        <section
          id="access"
          className="scroll-mt-[120px] px-6 py-24 sm:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-3xl">
            <SectionTitle>アクセス</SectionTitle>
            <div className="space-y-4 text-sm leading-[2.2] text-mamire-ink/85 sm:text-base">
              <p>
                会場は滋賀県・琵琶湖の湖畔。集合は
                <strong className="font-bold text-mamire-ink">米原駅</strong>
                を予定しています（東海道新幹線・JR各線が乗り入れ、東京・名古屋・京都・大阪からのアクセスも良好です）。
              </p>
              <p>
                詳細な会場・集合場所・当日のアクセス方法は、決まり次第こちらと参加者へのご案内でお知らせします。
              </p>
            </div>
            <div className="mt-8">
              <a
                href="https://www.google.com/maps/search/?api=1&query=米原駅"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-mamire-mud underline decoration-mamire-mud/40 underline-offset-4 transition-opacity hover:opacity-70"
              >
                米原駅を地図で見る &rarr;
              </a>
            </div>
          </div>
        </section>

      </ConceptPoem>

      {/* ════════ 参加する（水底） ════════ */}
      <section
        id="apply"
        className="scroll-mt-[120px] bg-mamire-water-deep px-6 pb-14 pt-24 text-center sm:px-12 lg:pt-32"
      >
        <h2 className="font-mincho text-3xl font-bold tracking-wide text-mamire-water-pale sm:text-4xl">
          ご参加をお待ちしています。
        </h2>
        <p className="mt-5 text-sm tracking-[0.18em] text-mamire-water-pale/70">
          {EVENT.dateFull} ／ {EVENT.placeShort}
        </p>
        <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-mamire-water-pale/60">
          {REGISTRATION_URL
            ? "まだ見ぬ「わたし」に会いに、琵琶湖へ。お申し込みをお待ちしています。"
            : "参加申し込みは近日公開予定です。最新情報はSNSでお知らせします。"}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {REGISTRATION_URL ? (
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-ekkyo-orange px-10 py-4 text-[12px] font-semibold tracking-[0.2em] text-white transition-colors hover:bg-ekkyo-orange-dark"
            >
              参加申し込み
              <span className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 bg-ekkyo-orange/90 px-10 py-4 text-[12px] font-semibold tracking-[0.2em] text-white">
              参加申し込み — 近日公開
            </span>
          )}
          <a
            href="https://www.instagram.com/ekkyo.hub/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-mamire-water-pale/30 px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-mamire-water-pale transition-colors hover:bg-mamire-water-pale hover:text-mamire-water-deep"
          >
            INSTAGRAM
          </a>
          <a
            href="https://note.com/ekkyo_hub"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-mamire-water-pale/30 px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-mamire-water-pale transition-colors hover:bg-mamire-water-pale hover:text-mamire-water-deep"
          >
            NOTE
          </a>
        </div>

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

      {/* 追従CTA（body直下へポータル） */}
      <StickyCta registrationUrl={REGISTRATION_URL} />
    </div>
  );
}
