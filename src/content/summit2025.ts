/**
 * EKKYO.SUMMIT 2025 in 信州上田 — アーカイブサイト用データ
 *
 * ── コンテンツの追加方法 ──────────────────────────────
 * 1. 写真: public/images/summit2025/<slug>/ に画像を置き、
 *    photos 配列に { src: "/images/summit2025/<slug>/01.jpg", caption: "..." } を追加。
 * 2. 狙い・コンセプト: concept に段落ごとの文字列配列を入れる。
 * 3. 当日の振り返り: archive に段落ごとの文字列配列を入れる。
 * 空のままの項目は、サイト上では「記録は準備中」の意匠で表示される。
 * ─────────────────────────────────────────────
 */

export type ArchivePhoto = {
  src: string;
  caption?: string;
};

export type Credit = {
  /** 主催 / 共催 / 協賛 / 協力 / 協賛・協力 など */
  role: string;
  name: string;
};

export type Workshop = {
  slug: string;
  day: 1 | 2 | 3;
  /** 区画番号（畑の通し番号） */
  no: number;
  /** 正式タイトル */
  title: string;
  /** 畑の芽に表示する短い名前（縦書き・9文字以内推奨） */
  label: string;
  /** 会場 */
  place?: string;
  /** 主催・共催・協賛・協力 */
  credits?: Credit[];
  /** 狙い・コンセプト（段落の配列） */
  concept: string[];
  /** 当日を振り返るアーカイブ（段落の配列） */
  archive: string[];
  photos: ArchivePhoto[];
};

export const DAY_LABELS: Record<1 | 2 | 3, { kanji: string; date: string }> = {
  1: { kanji: "一日目", date: "2025.11.01" },
  2: { kanji: "二日目", date: "2025.11.02" },
  3: { kanji: "三日目", date: "2025.11.03" },
};

/* 開催概要 */
export const SUMMIT_META = {
  title: "EKKYO.SUMMIT 2025 in 信州上田",
  theme: "耕せ",
  period: "2025.11.01 — 11.03",
  place: "長野県上田市・海野町商店街ほか",
};

/* 全体コンセプト（開催時のステートメント） */
export const MANIFESTO: string[][] = [
  [
    "「わたし」は、「わたし」を知っているだろうか。",
    "心の奥底の声が、世間の雑音に埋もれはいないか。",
    "掘り起こす前に、社会の“なんとなく”で着飾ってはいないか。",
  ],
  ["誰かが決めた、解決すべき課題。", "自己表現のために用意された様々なカタログ。"],
  [
    "社会の作った「らしさ」によって塗り固められ、",
    "どこか「わたし」がそこにいない。",
    "それでも、魂は叫ぶはずだ。",
    "わたしはここにいる。ここに根を張ると。",
  ],
  [
    "さあ今こそ、その声を聞き、感性を耕し合う時だ。",
    "ぼくらの感性や好奇心は、問いを育む豊かな土壌になる。",
    "そして、その問いから「わたしらしさ」が芽生えるだろう。",
  ],
  [
    "衣食住を得るために働き、大地を耕すように、",
    "人間は、自身の感性を深く、深く耕していくことで生きてゆく。",
    "それはわたし自身の足で、未開の道を拓くための営みだ。",
  ],
  [
    "風の人と土の人が越境して、新たな「風土」が生まれるように、",
    "このEKKYO.SUMMITで、場所も、人も、自らさえも越境しよう。",
    "熱い議論、予期せぬ出会い、そして本気の共創を通して、",
    "まだ見ぬ「わたし」に会いに行こう。",
  ],
];

/* クレジット（アーカイブ末尾用・コンパクト表記） */
export const CREDITS: { label: string; items: string[] }[] = [
  { label: "主催", items: ["一般社団法人EKKYO.HUB"] },
  { label: "後援", items: ["上田市", "SUNDRED株式会社"] },
  { label: "Platinum", items: ["日本たばこ産業株式会社"] },
  { label: "Gold", items: ["一般社団法人Re-Generation"] },
  {
    label: "Silver",
    items: [
      "株式会社ローンディール",
      "パーソルキャリア株式会社",
      "岡崎酒造株式会社",
      "民間文化施設「犀の角」",
      "有限会社ウッドベルファーム",
    ],
  },
  {
    label: "協力・出展",
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
];

export const WORKSHOPS: Workshop[] = [
  /* ─── DAY 1 ─── */
  {
    slug: "kamen-butokai",
    day: 1,
    no: 1,
    title: "仮面舞踏会 ～耕す儀礼への招待状～",
    label: "仮面舞踏会",
    place: "信州大学繊維学部講堂",
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "opening-session",
    day: 1,
    no: 2,
    title: "OPENING SESSION ～耕せ～",
    label: "開会式",
    place: "信州大学繊維学部講堂",
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "ekkyo-conference-28",
    day: 1,
    no: 3,
    title: "EKKYO.Conference #28 ～私たちはなぜ“わざわざ”嗜むのか？～",
    label: "わざわざ嗜む",
    place: "信州大学繊維学部講堂",
    credits: [{ role: "共催", name: "日本たばこ産業株式会社" }],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "kasei-no-hito",
    day: 1,
    no: 4,
    title: "火星の人",
    label: "火星の人",
    place: "万ぎくと熱い銭湯と町",
    credits: [{ role: "主催", name: "無能の人" }],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "snob-henshubu",
    day: 1,
    no: 5,
    title: "SNOB編集部ごっこ",
    label: "編集部ごっこ",
    place: "SNOB",
    credits: [{ role: "主催", name: "SNOB" }],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "a-ru",
    day: 1,
    no: 6,
    title: "あ・る",
    label: "あ・る",
    place: "ONYO",
    credits: [{ role: "主催", name: "ONYO & 話場" }],
    concept: [],
    archive: [],
    photos: [],
  },

  /* ─── DAY 2 ─── */
  {
    slug: "hakko-kara-deai-naosu",
    day: 2,
    no: 7,
    title: "発酵から『いのち』と『世界』に出会い直す",
    label: "発酵と出会い",
    place: "まちなかキャンパスうえだ",
    credits: [{ role: "主催", name: "n(e)ndo" }],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "hatsumei-no-butaiura",
    day: 2,
    no: 8,
    title: "発明の舞台裏を探る ～創造の苦しみと喜び～",
    label: "発明の舞台裏",
    place: "犀の角",
    credits: [{ role: "主催", name: "駆動点 by HIVE JAPAN" }],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "shakai-kadai-to-shiko",
    day: 2,
    no: 9,
    title: "“社会課題”と“思考”を越境する ～僕たちの未来をつくる課題と思考法を考える～",
    label: "社会課題と思考",
    place: "海野町会館",
    credits: [{ role: "主催", name: "一般社団法人Re-Generation" }],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "my-grapes",
    day: 2,
    no: 10,
    title: "My “Grapes” Workshop ～組織視点で振返る意思決定の変遷～",
    label: "意思決定の変遷",
    place: "犀の角",
    credits: [{ role: "主催", name: "Viscoa" }],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "lunch",
    day: 2,
    no: 11,
    title: "LUNCH",
    label: "昼餉",
    place: "上田市",
    credits: [
      { role: "協賛", name: "有限会社ウッドベルファーム" },
      { role: "協力", name: "万ぎく" },
    ],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "nayami-no-tane",
    day: 2,
    no: 12,
    title: "悩みのタネを芽吹かせて！ 転機ひらめきワークショップ",
    label: "悩みのタネ",
    place: "犀の角",
    credits: [{ role: "主催", name: "転機堂" }],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "kaze-desune",
    day: 2,
    no: 13,
    title:
      "「風邪ですね」に至る医者の思考を追体験！～自らの身体を通して『いのち』について考えよう～",
    label: "医者の思考",
    place: "まちなかキャンパスうえだ",
    credits: [{ role: "主催", name: "変化連" }],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "oishii-wa-doko",
    day: 2,
    no: 14,
    title: "“美味しい”は、どこにある？ ～五感と認知を探る～",
    label: "美味しいの在処",
    place: "海野町会館",
    credits: [
      { role: "主催", name: "佐々木優太朗" },
      { role: "協賛・協力", name: "岡崎酒造株式会社" },
    ],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "closing-session",
    day: 2,
    no: 15,
    title: "CLOSING SESSION ～柿の木を植えよう～",
    label: "柿の木を植える",
    place: "上田映劇",
    credits: [
      { role: "主催", name: "EKKYO.HUB" },
      { role: "共催", name: "LoanDEAL" },
    ],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "ekkyo-fes",
    day: 2,
    no: 16,
    title:
      "EKKYO.FES「DJ night＆Moroccan Bus night talk」 ～まだ耕したい、あなたを載せて～",
    label: "EKKYO.FES",
    place: "おでんや upmoat ＆ Today's banh mi",
    credits: [
      { role: "主催", name: "EKKYO.HUB" },
      { role: "協力", name: "おでんや upmoat ＆ Today's banh mi" },
    ],
    concept: [],
    archive: [],
    photos: [],
  },

  /* ─── DAY 3 ─── */
  {
    slug: "deep-walk",
    day: 3,
    no: 17,
    title: "ディープウォーク in 菅平高原 ～46億年の地球の物語を歩く～",
    label: "ディープウォーク",
    place: "菅平高原",
    credits: [
      { role: "主催", name: "平澤拓海" },
      { role: "協力", name: "NPO法人やまぼうし自然学校" },
    ],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "totonoi-ekkyo",
    day: 3,
    no: 18,
    title: "ととのい＝越境!? ～サウナで体感する、身体から始まる越境～",
    label: "ととのい＝越境",
    place: "上田市内清流",
    credits: [
      { role: "主催", name: "EKKYO.HUB" },
      { role: "協力", name: "信州サウナ同盟" },
    ],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "kotoba-no-shukaku",
    day: 3,
    no: 19,
    title: "言葉の収穫ワークショップ",
    label: "言葉の収穫",
    place: "バリューブックス上田原倉庫",
    credits: [
      { role: "主催", name: "EKKYO.HUB" },
      { role: "協力", name: "株式会社バリューブックス" },
    ],
    concept: [],
    archive: [],
    photos: [],
  },
  {
    slug: "noema-noesis",
    day: 3,
    no: 20,
    title: "NOEMA/NOESIS ～アート展示＆ギャラリートーク～",
    label: "アート展示",
    place: "犀の角",
    credits: [{ role: "主催", name: "Noema Lab by EKKYO.HUB" }],
    concept: [],
    archive: [],
    photos: [],
  },
];

export function getWorkshop(slug: string): Workshop | undefined {
  return WORKSHOPS.find((w) => w.slug === slug);
}

export function getAdjacent(slug: string): {
  prev: Workshop | null;
  next: Workshop | null;
} {
  const i = WORKSHOPS.findIndex((w) => w.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? WORKSHOPS[i - 1] : null,
    next: i < WORKSHOPS.length - 1 ? WORKSHOPS[i + 1] : null,
  };
}
