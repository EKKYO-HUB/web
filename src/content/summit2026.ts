/* ──────────────────────────────────────────────────────────
   EKKYO.SUMMIT 2026「まみれろ」— プログラムデータ

   出典: ワークショップマスタ（Google スプレッドシート）2026-09-11 時点。
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
  /** 出展者・登壇者 */
  host?: string;
  /** 「協力」など host の前に付ける語 */
  hostRole?: string;
  /** 企画内容（段落の配列） */
  desc?: string[];
  /** 出展者写真（public/ 配下・正方形にトリミング）。あれば藍色演出で表示 */
  image?: string;
  /** タイムテーブルで常に一番右のレーンに置く（展示など終日もの） */
  pinRight?: boolean;
};

export const PROGRAMS: Program[] = [
  /* ── 10.10（土） ── */
  {
    id: "ryuiki",
    day: 1,
    time: "11:00–14:30",
    title: "流域 / 境の起源 ～コモンへ～",
    place: "山門水源の森",
    host: "木津裕人",
    image: "/images/summit2026/exhibitors/kizu-hiroto.jpg",
  },
  {
    id: "tsu",
    day: 1,
    time: "11:00–14:30",
    title: "津。@北国街道 木之本宿 ― 一輪挿しを日々変えることについて ―",
    place: "木之本",
    host: "前川晋也",
  },
  {
    id: "opening",
    day: 1,
    time: "15:00–17:30",
    title: "OPENING ～君は琵琶湖だ～",
    place: "西浅井",
    host: "上田洋平",
    hostRole: "協力",
  },
  {
    id: "kome",
    day: 1,
    time: "18:00–",
    title: "米まみれ ～そうだ、寿司握ろう。～",
    place: "あほうどり",
    host: "琴川夕星",
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
    title: "熱まみれ",
    place: "DEEP BANK",
  },
  {
    id: "hon",
    day: 1,
    time: "18:00–",
    title: "本まみれ",
  },

  /* ── 10.11（日） ── */
  {
    id: "mame",
    day: 2,
    time: "8:30–9:30",
    title: "豆まみれ",
    place: "西浅井",
    host: "田中聡起",
  },
  {
    id: "passing-body",
    day: 2,
    time: "9:45–12:45",
    title: "A PASSING BODY",
    place: "西浅井",
    host: "佐藤健大郎",
  },
  {
    id: "quick",
    day: 2,
    time: "9:45–17:00",
    title: "quick-｜剥き出しの、",
    host: "武田萌花",
    image: "/images/summit2026/exhibitors/takeda-moka.jpg",
    pinRight: true,
  },
  {
    id: "guerrilla",
    day: 2,
    time: "13:00–14:00",
    title: "ゲリラ炊飯",
    place: "西浅井",
    host: "ONE SLASH",
  },
  {
    id: "mizu",
    day: 2,
    time: "14:00–15:30",
    title: "水と生活環境 ～fishbowl～",
    place: "西浅井",
    host: "石川歩",
  },
  {
    id: "sado",
    day: 2,
    time: "14:00–15:30",
    title: "茶道から考える ～ More-than-Human Design ～",
    place: "西浅井",
    host: "琴川さくら",
  },
  {
    id: "yarasareru",
    day: 2,
    time: "15:00–16:00",
    title:
      "「やらされる」と「やりたい」のあいだ ――人はなぜ、組織で自ら動くのか？",
    place: "西浅井",
    host: "平野真生",
  },
  {
    id: "biwako-homeostasis",
    day: 2,
    time: "15:30–17:00",
    title: "（仮）400万歳の琵琶湖を診察しよう！ ～琵琶湖ホメオスタシス～",
    place: "西浅井",
    host: "福本和生",
  },
  {
    id: "fes",
    day: 2,
    time: "18:00–22:00",
    title: "EKKYO.FES ― 琵琶法師 / DJ / 泥染 / BBQ / フードペアリング / 焚き火",
    place: "DEEP BANK",
    host: "竹本智志",
  },

  /* ── 10.12（月・祝） ── */
  {
    id: "closing",
    day: 3,
    time: "10:00–12:00",
    title: "CLOSING SESSION ― EKKYO.Conference #31「まみれろ」",
    place: "西浅井",
    host: "上田洋平",
    hostRole: "協力",
  },
  {
    id: "biwako-taiken",
    day: 3,
    time: "13:00–17:00",
    title: "琵琶湖体験",
    place: "大津市和邇",
    host: "駒井健也",
  },
  {
    id: "kido-sanpo",
    day: 3,
    time: "13:00–17:00",
    title: "（仮）木戸さんぽ",
    place: "大津市木戸",
    host: "山口裕也",
  },
];

/* ── タイムテーブル（PROGRAMS から自動生成） ── */
export type ScheduleItem = {
  time: string;
  title: string;
  note?: string;
  place?: string;
};

export type ScheduleDay = {
  day: 1 | 2 | 3;
  date: string;
  weekday: string;
  heading: string;
  items: ScheduleItem[];
};

export const DAYS: Record<1 | 2 | 3, Omit<ScheduleDay, "items">> = {
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

export const SCHEDULE: ScheduleDay[] = ([1, 2, 3] as const).map((d) => ({
  ...DAYS[d],
  items: programsOfDay(d).map((p) => ({
    time: p.time,
    title: p.title,
    note: p.host ? `${p.hostRole ? `${p.hostRole}：` : ""}${p.host}` : undefined,
    place: p.place ?? "会場調整中",
  })),
}));

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
export type ExtraExhibitor = { name: string; role?: string; image: string };
export const EXTRA_EXHIBITORS: ExtraExhibitor[] = [
  { name: "田中律羽", role: "EKKYO.HUB", image: "/images/summit2026/exhibitors/tanaka-ritsuha.jpg" },
  { name: "鈴木智也", role: "EKKYO.HUB", image: "/images/summit2026/exhibitors/suzuki-tomoya.jpg" },
  { name: "大屋太亮", role: "EKKYO.HUB", image: "/images/summit2026/exhibitors/oya-tasuke.jpg" },
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
  src: "/images/summit2026/flyer-p1.jpg",
  alt: "EKKYO.SUMMIT 2026 チラシ（表面）",
  width: 1400,
  height: 990,
};
