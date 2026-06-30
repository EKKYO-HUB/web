import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SummitSectionNav from "@/components/ui/SummitSectionNav";

/* ──────────────────────────────────────────────────────────
   申し込みURL — 申し込み開始時にここへURLを設定するだけで
   ページ内すべてのCTAが「近日公開」→「参加申し込み」に切り替わります。
   例: const REGISTRATION_URL = "https://ekkyo-hub.peatix.com/...";
   ────────────────────────────────────────────────────────── */
const REGISTRATION_URL: string | null = null;
const REGISTRATION_OPEN = REGISTRATION_URL !== null;

const EVENT = {
  name: "EKKYO.SUMMIT 2026",
  theme: "まみれろ",
  dateLabel: "2026.10.10 – 12",
  dateFull: "2026年10月10日(土)〜12日(月・祝)",
  place: "琵琶湖 湖畔（米原駅集合予定）",
  placeShort: "滋賀県・琵琶湖",
};

/* ─── これまでの歩み ─── */
const history = [
  { year: "2022", place: "Munich", theme: "共創" },
  { year: "2023", place: "Sendai", theme: "繋ぐ" },
  { year: "2024", place: "Itoshima", theme: "転べ" },
  { year: "2025", place: "Ueda", theme: "耕せ" },
  { year: "2026", place: "Biwako", theme: "まみれろ", current: true },
];

/* ─── 開催概要 ─── */
const overview = [
  { label: "イベント名称", value: "EKKYO.SUMMIT 2026「まみれろ」" },
  { label: "日程", value: "2026年10月10日(土)〜12日(月・祝)" },
  { label: "会場", value: "琵琶湖 湖畔（米原駅集合予定）" },
  { label: "想定参加者数", value: "50〜70名程度" },
  {
    label: "対象",
    value:
      "高校生〜若手社会人を中心に、好奇心や探求心を持つすべての年代の方",
  },
  { label: "主催", value: "一般社団法人EKKYO.HUB" },
];

/* ─── ページ内ナビ ─── */
const sectionNav = [
  { id: "concept", label: "CONCEPT" },
  { id: "overview", label: "開催概要" },
  { id: "history", label: "これまで" },
  { id: "contents", label: "コンテンツ" },
  { id: "sponsor", label: "協賛" },
  { id: "access", label: "アクセス" },
  { id: "apply", label: "参加する" },
];

export const metadata: Metadata = {
  title: "EKKYO.SUMMIT 2026「まみれろ」in 琵琶湖",
  description:
    "EKKYO.HUBの年次フラグシップイベント「EKKYO.SUMMIT 2026『まみれろ』」。2026年10月10日〜12日、滋賀県・琵琶湖の湖畔で開催。越境と共創を通じて、まだ見ぬ「わたし」と出会う3日間。",
  alternates: {
    canonical: "https://www.ekkyo.jp/summit/2026",
  },
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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ════════ HERO ════════ */}
      {/* TODO: キービジュアル確定後、この背景をブランドカラーから画像に差し替え */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-ekkyo-accent">
        {/* 装飾「!」ロゴマーク — 背景アクセント */}
        <div className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 sm:-right-8">
          <Image
            src="/images/logo/logo_mark_white.svg"
            alt=""
            width={720}
            height={720}
            className="h-auto w-[420px] opacity-[0.12] sm:w-[560px] lg:w-[720px]"
            priority
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 sm:px-12">
          <h1 className="text-[5rem] font-bold leading-[0.95] tracking-tight text-white sm:text-[8rem] lg:text-[11rem]">
            {EVENT.theme}
          </h1>

          <p className="mt-6 text-lg font-medium tracking-wide text-white/90 sm:text-xl">
            EKKYO.SUMMIT 2026
          </p>

          <div className="mt-4 flex flex-col gap-2 text-white sm:flex-row sm:items-center sm:gap-6">
            <p className="font-montserrat text-2xl font-semibold tracking-wide sm:text-3xl">
              {EVENT.dateLabel}
            </p>
            <span className="hidden h-5 w-px bg-white/40 sm:block" />
            <p className="text-lg tracking-wide sm:text-xl">{EVENT.placeShort}</p>
          </div>

          <p className="mt-8 max-w-xl text-sm leading-[2] text-white/80 sm:text-base">
            越境と共創を通じて、まだ見ぬ「わたし」と出会う3日間。
            <br className="hidden sm:block" />
            EKKYO.HUBの年次フラグシップイベント、今年の舞台は滋賀・琵琶湖。
          </p>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            {REGISTRATION_OPEN ? (
              <a
                href={REGISTRATION_URL!}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-white px-10 py-4 text-[12px] font-semibold tracking-[0.2em] text-ekkyo-accent transition-all hover:bg-white/90"
              >
                参加申し込み
                <span className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 bg-white px-10 py-4 text-[12px] font-semibold tracking-[0.2em] text-ekkyo-accent">
                参加申し込み — 近日公開
              </span>
            )}
            <a
              href="https://www.instagram.com/ekkyo.hub/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/40 px-10 py-4 text-[12px] font-medium tracking-[0.2em] text-white transition-all hover:bg-white hover:text-ekkyo-accent"
            >
              最新情報を受け取る
            </a>
          </div>
        </div>

        {/* スクロール誘導 */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
          <p className="text-[9px] tracking-[0.3em] text-white/60">SCROLL</p>
        </div>
      </section>

      {/* ════════ ページ内ナビ（追従・スクロールで現在地をハイライト） ════════ */}
      <SummitSectionNav items={sectionNav} />

      {/* ════════ CONCEPT ════════ */}
      <section id="concept" className="scroll-mt-[150px] px-6 py-24 sm:px-12 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            まみれろ
          </h2>

          <div className="mt-12 space-y-6 text-base leading-[2.2] text-ekkyo-black/70 sm:text-lg">
            <p>わかりやすい言葉に取りまとめるとき。</p>
            <p>綺麗な姿へ繕うとき。</p>
            <p>居心地が良いものを求めるとき。</p>
            <p>
              削ぎ落とされてしまったものは、不便で分かりにくく、非合理的。
              <br />
              それはどことなく、身近なところにあるおぞましいもの、「穢れ」にも似ている。
              <br />
              僕たちは一生懸命、そんなものを排除する。徹底的に排除する。
              <br />
              そうして、今日の社会が目前に広がっている。
            </p>
            <p>
              一方で、僕たちの目では穢れであるものが、他の誰かにとっては、生きることと不可分なものである可能性はないだろうか？
              <br />
              こんなことを考えるとき、その「誰か」には何が当てはまるのだろうか？
              <br />
              また、僕たちは「誰か」との関係をどのように取りもち、考えていくことができるのだろうか？
            </p>
            <p>
              僕たちは自分らしく生きることを認められている。
              <br />
              しかし、それと同時に僕たちの外側に「誰か」が存在し、「誰か」もまた生きている。
            </p>

            <p className="!mt-14 text-xl font-bold text-ekkyo-black sm:text-2xl">
              だからこそ、まみれろ。
            </p>
            <p>「私は私」でありながら、私ならざるものの生を強く感じるために。</p>

            <p className="!mt-14 text-xl font-bold text-ekkyo-black sm:text-2xl">
              だからこそ、まみれろ。
            </p>
            <p>
              綺麗な世界にて、僕たちから隠されてしまったものについてもう一度考えるために。
            </p>

            <p className="!mt-14 text-xl font-bold text-ekkyo-black sm:text-2xl">
              だからこそ、まみれろ。
            </p>
            <p>
              他の誰でもなく自分自身の生そのものを、数多の存在に囲まれて「豊か」にするために。
            </p>

            <p className="!mt-12 text-lg font-bold text-ekkyo-black sm:text-xl">
              まみれた僕たちは、何者になりうるだろうか？
            </p>
          </div>
        </div>
      </section>

      {/* ════════ 開催概要 ════════ */}
      <section
        id="overview"
        className="scroll-mt-[150px] bg-gray-50 px-6 py-24 sm:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            開催概要
          </h2>

          <dl className="mt-12 divide-y divide-black/10 border-t border-black/10">
            {overview.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 py-6 sm:grid-cols-[180px_1fr] sm:gap-6"
              >
                <dt className="text-sm font-semibold tracking-wide text-ekkyo-black">
                  {row.label}
                </dt>
                <dd className="text-sm leading-[1.9] text-ekkyo-black/70 sm:text-base">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ════════ これまでの歩み ════════ */}
      <section
        id="history"
        className="scroll-mt-[150px] px-6 py-24 sm:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            これまでの歩み
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-[2] text-ekkyo-gray">
            物理的な移動の「越境」から、「若者」という文化を創る精神的なムーブメントへ。
            毎年、舞台もテーマも変えながら、日本各地で最もカオスな場をつくってきました。
          </p>

          <ol className="mt-14 grid gap-4 sm:grid-cols-5">
            {history.map((h) => (
              <li
                key={h.year}
                className={
                  h.current
                    ? "flex flex-col border border-ekkyo-accent bg-ekkyo-accent p-6 text-white"
                    : "flex flex-col border border-black/10 p-6"
                }
              >
                <span
                  className={
                    h.current
                      ? "font-chunk text-2xl tracking-wide"
                      : "font-chunk text-2xl tracking-wide text-ekkyo-black/40"
                  }
                >
                  {h.year}
                </span>
                <span
                  className={
                    h.current
                      ? "mt-1 text-[11px] tracking-[0.15em] text-white/70"
                      : "mt-1 text-[11px] tracking-[0.15em] text-ekkyo-gray"
                  }
                >
                  {h.place}
                </span>
                <span className="mt-4 text-lg font-bold tracking-tight">
                  {h.theme}
                </span>
                {h.current && (
                  <span className="mt-3 inline-block w-fit bg-white px-2 py-0.5 text-[9px] font-semibold tracking-[0.15em] text-ekkyo-accent">
                    NOW
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ════════ コンテンツ（Coming Soon） ════════ */}
      <section
        id="contents"
        className="scroll-mt-[150px] bg-gray-50 px-6 py-24 sm:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            コンテンツ
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-[2] text-ekkyo-gray">
            数ヶ月に及ぶフィールドワークの中から、会場・コンセプト・プログラムを紡いでいきます。
            タイムテーブル、登壇者、ワークショップなどの詳細は決まり次第こちらで公開します。
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "タイムテーブル",
                desc: "3日間のセッション・プログラムの全体像",
              },
              {
                title: "登壇者・ゲスト",
                desc: "問いを携えて場をつくる多彩なメンバー",
              },
              {
                title: "ワークショップ",
                desc: "土にまみれ、本能を探る体験型プログラム",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="flex flex-col border border-black/10 bg-white p-8"
              >
                <span className="text-[11px] font-semibold tracking-[0.05em] text-ekkyo-accent">
                  近日公開
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.9] text-ekkyo-gray">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ 協賛・パートナー ════════ */}
      <section
        id="sponsor"
        className="scroll-mt-[150px] px-6 py-24 sm:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            協賛・パートナー募集
          </h2>
          <div className="mt-8 space-y-6 text-sm leading-[2.1] text-ekkyo-black/70 sm:text-base">
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

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-ekkyo-accent px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-white transition-all hover:bg-ekkyo-accent-dark"
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
        className="scroll-mt-[150px] bg-gray-50 px-6 py-24 sm:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            アクセス
          </h2>
          <div className="mt-8 space-y-4 text-sm leading-[2] text-ekkyo-black/70 sm:text-base">
            <p>
              会場は滋賀県・琵琶湖の湖畔。集合は<strong className="text-ekkyo-black">米原駅</strong>を予定しています（東海道新幹線・JR各線が乗り入れ、東京・名古屋・京都・大阪からのアクセスも良好です）。
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
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-ekkyo-accent transition-opacity hover:opacity-70"
            >
              米原駅を地図で見る &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ════════ 参加する（クロージングCTA） ════════ */}
      <section
        id="apply"
        className="scroll-mt-[150px] bg-ekkyo-accent px-6 py-24 text-center sm:px-12 lg:py-32"
      >
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          ご参加をお待ちしています。
        </h2>
        <p className="mt-4 text-sm tracking-[0.2em] text-white/80">
          {EVENT.dateFull} ／ {EVENT.placeShort}
        </p>
        <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-white/70">
          {REGISTRATION_OPEN
            ? "まだ見ぬ「わたし」に会いに、琵琶湖へ。お申し込みをお待ちしています。"
            : "参加申し込みは近日公開予定です。最新情報はSNSでお知らせします。"}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {REGISTRATION_OPEN ? (
            <a
              href={REGISTRATION_URL!}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white px-10 py-4 text-[12px] font-semibold tracking-[0.2em] text-ekkyo-accent transition-all hover:bg-white/90"
            >
              参加申し込み
              <span className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 bg-white px-10 py-4 text-[12px] font-semibold tracking-[0.2em] text-ekkyo-accent">
              参加申し込み — 近日公開
            </span>
          )}
          <a
            href="https://www.instagram.com/ekkyo.hub/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-white transition-all hover:bg-white hover:text-ekkyo-accent"
          >
            INSTAGRAM
          </a>
          <a
            href="https://note.com/ekkyo_hub"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-white transition-all hover:bg-white hover:text-ekkyo-accent"
          >
            NOTE
          </a>
        </div>
      </section>

      {/* ════════ 追従CTA（常時表示） ════════ */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:bottom-6 sm:pb-0">
        {REGISTRATION_OPEN ? (
          <a
            href={REGISTRATION_URL!}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex w-full max-w-md items-center justify-center gap-2 bg-ekkyo-orange px-8 py-4 text-[12px] font-semibold tracking-[0.2em] text-white shadow-lg shadow-ekkyo-orange/40 transition-all hover:bg-ekkyo-orange-dark sm:w-auto"
          >
            参加申し込み
            <span>&rarr;</span>
          </a>
        ) : (
          <a
            href="#apply"
            className="pointer-events-auto inline-flex w-full max-w-md items-center justify-center gap-2 bg-ekkyo-orange px-8 py-4 text-[12px] font-semibold tracking-[0.2em] text-white shadow-lg shadow-ekkyo-orange/40 transition-all hover:bg-ekkyo-orange-dark sm:w-auto"
          >
            参加申し込み — 近日公開
          </a>
        )}
      </div>
    </div>
  );
}
