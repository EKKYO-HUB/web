/* ──────────────────────────────────────────────────────────
   EKKYO.SUMMIT 2026「まみれろ」— プログラムデータ

   出典: ワークショップマスタ（Google スプレッドシート）2026-09-13 時点。
   掲載するのは 名称・日付・時間・会場・出展者・企画内容 のみ
   （「EKKYO担当者／掲載不要」列や他シートの内容は掲載しない）。
   変更があればこのファイルだけを更新すれば、タイムテーブル／プログラム欄に反映される。
   ────────────────────────────────────────────────────────── */

export type Program = {
  id: string;
  day: 1 | 2 | 3;
  /** "11:00–14:30" / "18:00–" */
  time: string;
  title: string;
  /** 会場（未定なら省略 → 「会場調整中」表示） */
  place?: string;
  /** 出展者（表示用。複数は「・」区切り） */
  by?: string;
  /** 協力（表示用） */
  coop?: string;
  /** 出展者一覧・写真に使う個人名。省略時は by（EKKYO.HUB 以外）を1名として扱う */
  people?: string[];
  /** 企画内容（段落の配列） */
  desc?: string[];
  /** タイムテーブルで常に一番右のレーンに置く（展示など終日もの） */
  pinRight?: boolean;
};

/* 出展者写真（名前 → public 配下のパス）。
   元素材 /Users/keys/Documents/co_ekkyo/1-1_名前.png（1080px正方形）→ sips で 900px JPEG */
export const EXHIBITOR_IMAGES: Record<string, string> = {
  木津裕人: "/images/summit2026/exhibitors/kizu-hiroto.jpg",
  武田萌花: "/images/summit2026/exhibitors/takeda-moka.jpg",
  田中律羽: "/images/summit2026/exhibitors/tanaka-ritsuha.jpg",
  鈴木智也: "/images/summit2026/exhibitors/suzuki-tomoya.jpg",
  大屋太亮: "/images/summit2026/exhibitors/oya-tasuke.jpg",
  佐藤健大郎: "/images/summit2026/exhibitors/sato-kentaro.jpg",
  平野真生: "/images/summit2026/exhibitors/hirano-masaki.jpg",
  琴川さくら: "/images/summit2026/exhibitors/kotokawa-sakura.jpg",
  琴川夕星: "/images/summit2026/exhibitors/kotokawa-yusei.jpg",
  竹本智志: "/images/summit2026/exhibitors/takemoto-satoshi.jpg",
  駒井健也: "/images/summit2026/exhibitors/komai-kenya.jpg",
};

/** プログラムに紐づく個人名（出展者一覧・写真用） */
export function peopleOf(p: Program): string[] {
  if (p.people) return p.people;
  if (p.by && p.by !== "EKKYO.HUB") return [p.by];
  return [];
}

export const PROGRAMS: Program[] = [
  /* ── 10.10（土） ── */
  {
    id: "ryuiki",
    day: 1,
    time: "11:00–14:30",
    title: "流域 / 境の起源 ～コモンへ～",
    place: "山門水源の森",
    by: "木津裕人",
  },
  {
    id: "kinomoto",
    day: 1,
    time: "11:00–14:30",
    title: "北国街道 木之本宿 一輪挿しを日々変えることについて",
    place: "木之本",
    by: "前川晋也",
  },
  {
    id: "opening",
    day: 1,
    time: "15:00–17:30",
    title: "OPENING ～君は琵琶湖だ～",
    place: "西浅井",
    by: "EKKYO.HUB",
    coop: "上田洋平",
  },
  {
    id: "kome",
    day: 1,
    time: "18:00–",
    title: "米まみれ ～そうだ、寿司握ろう。～",
    place: "あほうどり",
    by: "琴川夕星",
    desc: [
      "寿司を握るって、実はとても壮大な行為です。",
      "「ネタ（魚）」は、広大な海をめぐってきた生命の記憶。プランクトンから続く食物連鎖、緻密な生態系、何万キロもの海流の旅の果てに、いまここに辿り着く。「シャリ（米）」は、大地と天候の恵み。土の滋養、太陽の光、雨、そして季節の巡り。",
      "『海×大地』という本来ならば出会うはずのなかったふたつの物語を、ヒトの「手」でひとつに繋ぎ合わせる。拳頭握却宇宙一貫———寿司を握るということは、その手のなかに小宇宙を生み出すようなものです。そうだ、寿司握ろう。",
    ],
  },
  {
    id: "netsu",
    day: 1,
    time: "18:00–",
    title: "熱にまみれナイト！ サウナ&BBQ",
    place: "DEEP BANK",
  },
  {
    id: "sakaba",
    day: 1,
    time: "18:00–",
    title: "まみれ酒場",
    by: "福本和樹",
  },

  /* ── 10.11（日） ── */
  {
    id: "mame",
    day: 2,
    time: "8:30–9:30",
    title: "豆まみれ",
    place: "西浅井",
    by: "田中聡起",
  },
  {
    id: "passing-body",
    day: 2,
    time: "9:45–12:45",
    title: "A PASSING BODY",
    place: "西浅井",
    by: "佐藤健大郎",
  },
  {
    id: "quick",
    day: 2,
    time: "9:45–17:00",
    title: "quick-｜剥き出しの、",
    by: "武田萌花・岩見歩昂",
    people: ["武田萌花", "岩見歩昂"],
    pinRight: true,
  },
  {
    id: "guerrilla",
    day: 2,
    time: "13:00–14:00",
    title: "ゲリラ炊飯",
    place: "西浅井",
    by: "ONE SLASH",
  },
  {
    id: "ai-kidotai",
    day: 2,
    time: "14:00–15:00",
    title: "（仮）AI機動隊",
    place: "西浅井",
  },
  {
    id: "mizu",
    day: 2,
    time: "14:00–15:30",
    title: "水と生活環境 ～fishbowl～",
    place: "西浅井",
    by: "石川歩",
  },
  {
    id: "sado",
    day: 2,
    time: "14:00–15:30",
    title: "茶道から考える ～ More-than-Human Design ～",
    place: "西浅井",
    by: "琴川さくら",
  },
  {
    id: "yarasareru",
    day: 2,
    time: "15:00–16:00",
    title:
      "「やらされる」と「やりたい」のあいだ ――人はなぜ、組織で自ら動くのか？",
    place: "西浅井",
    by: "平野真生",
  },
  {
    id: "nanimono",
    day: 2,
    time: "15:00–16:00",
    title: "ナニモノ",
    place: "西浅井",
    by: "錦織史哉",
  },
  {
    id: "biwako-homeostasis",
    day: 2,
    time: "15:30–17:00",
    title: "400万歳の琵琶湖を診察しよう！ ～琵琶湖ホメオスタシス～",
    place: "西浅井",
    by: "福本和生",
  },
  {
    id: "fes",
    day: 2,
    time: "18:00–22:00",
    title: "EKKYO.FES ― 琵琶法師 / DJ / 泥染 / BBQ / フードペアリング / 焚き火",
    place: "DEEP BANK",
    by: "EKKYO.HUB・竹本智志",
    coop: "ONE SLASH",
    people: ["竹本智志"],
  },

  /* ── 10.12（月・祝） ── */
  {
    id: "closing",
    day: 3,
    time: "10:00–12:00",
    title: "CLOSING SESSION ― EKKYO.Conference #31「まみれろ」",
    place: "西浅井",
    by: "EKKYO.HUB",
    coop: "木村道徳・加藤大生",
  },
  {
    id: "biwako-taiken",
    day: 3,
    time: "13:00–17:00",
    title: "琵琶湖体験",
    place: "大津市和邇",
    by: "駒井健也",
    desc: [
      "琵琶湖に出て漁の体験をしていただき、とれた魚のことを知りながら琵琶湖周辺を散策します。必要に応じて琵琶湖の漁体験を踏まえたアート展の案内も行います。",
    ],
  },
  {
    id: "kido-sanpo",
    day: 3,
    time: "13:00–17:00",
    title: "（仮）木戸さんぽ",
    place: "大津市木戸",
    by: "山口裕也",
  },
];

/* ── タイムテーブル（PROGRAMS から自動生成） ── */
export type DayMeta = {
  day: 1 | 2 | 3;
  date: string;
  weekday: string;
  heading: string;
};

export const DAYS: Record<1 | 2 | 3, DayMeta> = {
  1: { day: 1, date: "10.10", weekday: "土", heading: "水辺へ" },
  2: { day: 2, date: "10.11", weekday: "日", heading: "まみれる" },
  3: { day: 3, date: "10.12", weekday: "月・祝", heading: "持ち帰る" },
};

const startMinutes = (time: string) => {
  const m = time.match(/^(\d{1,2}):(\d{2})/);
  return m ? Number(m[1]) * 60 + Number(m[2]) : 0;
};

export function programsOfDay(day: 1 | 2 | 3): Program[] {
  return PROGRAMS.filter((p) => p.day === day).sort(
    (a, b) => startMinutes(a.time) - startMinutes(b.time)
  );
}

/* よくある質問 */
export type FaqItem = { q: string; a: string[] };

export const FAQ: FaqItem[] = [
  {
    q: "対象年齢は何歳ですか？",
    a: [
      "高校生以上、年齢の上限はありません。20〜30代が多いですが、60代以上の「若者」の皆さまも大歓迎です。",
    ],
  },
  {
    q: "過去にEKKYO.HUBのイベントに参加したことがなくても大丈夫ですか？",
    a: [
      "実は、SUMMITに参加する方のほとんどが初参加です。",
      "EKKYO.HUBのイベントの中でもSUMMITはいちばんバラエティに富んでいて、初めての方ほど入りやすい場になっています。",
    ],
  },
  {
    q: "チケットの種類を教えてください。",
    a: [
      "今回は「1日券」と「通し券（3日間）」の2種類があります。",
      "1日だけの参加も可能ですが、3日通して参加いただくと満足度が300%になるように設計しています。",
    ],
  },
  {
    q: "宿はどうすれば良いですか？",
    a: [
      "別途費用が発生しますが、運営側での手配が可能です。お申し込みいただいた方に個別にご案内します。",
    ],
  },
  {
    q: "集合場所はどこですか？",
    a: [
      "JR湖西線・永原駅に集合します。京都駅から湖西線で乗り換えなしで来られます。集合時間や当日の流れは、お申し込みいただいた方にご案内します。",
    ],
  },
];

/* 主催者写真（サミットとは／主催の紹介に使用・16:9）
   元素材: /Users/keys/Documents/co_ekkyo/集合写真_16-9_summit-logo.png → sips で 2000px JPEG化 */
export const ORGANIZER_PHOTO = {
  src: "/images/summit2026/organizer.jpg",
  alt: "一般社団法人EKKYO.HUBのメンバー集合写真",
};

/* PROGRAMS の出展者に含まれないが出展者一覧に載せる人（EKKYO.HUB 運営メンバーなど）
   ※ 担当プログラムが決まったら PROGRAMS 側の host/image に移す */
export type ExtraExhibitor = { name: string; role?: string };
export const EXTRA_EXHIBITORS: ExtraExhibitor[] = [
  { name: "田中律羽", role: "EKKYO.HUB" },
  { name: "鈴木智也", role: "EKKYO.HUB" },
  { name: "大屋太亮", role: "EKKYO.HUB" },
];

/* タイムテーブルの概略図（timetable.png → JPEG） */
export const TIMETABLE_OVERVIEW = {
  src: "/images/summit2026/timetable-overview.jpg",
  alt: "EKKYO.SUMMIT 2026 タイムテーブル概略（3日間）",
  width: 1920,
  height: 1080,
};

/* チラシ。PDF本体は容量が大きいため外部（Google Drive など）に置き、URLをここに入れる */
export const FLYER_URL: string | null =
  "https://drive.google.com/file/d/1mELAv239QVvoaSP_o6nXKR-QDpC-Ao44/view";
export const FLYER_PREVIEW = {
  src: "/images/summit2026/flyer-back.jpg",
  alt: "EKKYO.SUMMIT 2026 チラシ（裏面）",
  width: 2000,
  height: 1414,
};
