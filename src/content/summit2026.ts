/* ──────────────────────────────────────────────────────────
   EKKYO.SUMMIT 2026「まみれろ」— プログラムデータ

   ※ SCHEDULE / WORKSHOP_HOSTS は現時点では【仮置き】です。
     確定次第このファイルだけを差し替えれば、ページ側は自動で反映されます。
   ────────────────────────────────────────────────────────── */

export type ScheduleItem = {
  /** "13:00" または "13:00–14:30" */
  time: string;
  title: string;
  /** 一言（任意） */
  note?: string;
  /** 場所（任意） */
  place?: string;
};

export type ScheduleDay = {
  day: 1 | 2 | 3;
  /** "10.10" */
  date: string;
  /** "土" / "日" / "月・祝" */
  weekday: string;
  /** その日を一言で */
  heading: string;
  items: ScheduleItem[];
};

export const SCHEDULE: ScheduleDay[] = [
  {
    day: 1,
    date: "10.10",
    weekday: "土",
    heading: "水辺へ",
    items: [
      { time: "12:30", title: "米原駅 集合", note: "受付のあと、会場へ移動します" },
      { time: "14:00", title: "オープニング", note: "「まみれろ」をひらく", place: "湖畔会場" },
      { time: "15:00", title: "フィールドワーク", note: "湖畔を歩き、水と土に触れる" },
      { time: "18:00", title: "夕食" },
      { time: "20:00", title: "焚き火のまわりで", note: "一日目の問いを持ち寄る" },
    ],
  },
  {
    day: 2,
    date: "10.11",
    weekday: "日",
    heading: "まみれる",
    items: [
      { time: "08:00", title: "朝食" },
      { time: "09:30", title: "ワークショップ（午前）", note: "出展団体によるプログラム" },
      { time: "12:00", title: "昼食" },
      { time: "13:30", title: "ワークショップ（午後）" },
      { time: "17:00", title: "湖畔で振り返り" },
      { time: "19:00", title: "夕食・交流" },
    ],
  },
  {
    day: 3,
    date: "10.12",
    weekday: "月・祝",
    heading: "持ち帰る",
    items: [
      { time: "08:00", title: "朝食" },
      { time: "09:30", title: "クロージング", note: "まみれた僕たちは、何者になりうるだろうか" },
      { time: "11:30", title: "解散", note: "米原駅へ移動" },
    ],
  },
];

export type WorkshopHost = {
  id: string;
  name: string;
  /** 肩書き・所属 */
  role: string;
  /** 担当ワークショップ */
  workshop: string;
  /** public/ 配下のパス。正方形にトリミングされます */
  image: string;
};

/* 仮置き: 表現の確認用に理事メンバーの写真を使用。確定後に差し替え。 */
export const WORKSHOP_HOSTS: WorkshopHost[] = [
  {
    id: "ritsuha-tanaka",
    name: "田中 律羽",
    role: "一般社団法人EKKYO.HUB 代表理事",
    workshop: "ワークショップ名 — 近日公開",
    image: "/images/members/ritsuha-tanaka.jpg",
  },
  {
    id: "moka-takeda",
    name: "武田 萌花",
    role: "アーティスト / EKKYO.HUB 理事",
    workshop: "ワークショップ名 — 近日公開",
    image: "/images/members/moka-takeda.jpg",
  },
  {
    id: "haruki-tabata",
    name: "田畑 春樹",
    role: "株式会社STEAH 代表 / EKKYO.HUB 理事",
    workshop: "ワークショップ名 — 近日公開",
    image: "/images/members/haruki-tabata.jpg",
  },
  {
    id: "tomoya-suzuki",
    name: "鈴木 智也",
    role: "EKKYO.HUB 理事",
    workshop: "ワークショップ名 — 近日公開",
    image: "/images/members/tomoya-suzuki.jpg",
  },
  {
    id: "takumi-hirasawa",
    name: "平澤 拓海",
    role: "EKKYO.HUB",
    workshop: "ワークショップ名 — 近日公開",
    image: "/images/members/takumi-hirasawa.jpg",
  },
  {
    id: "tasuke-oya",
    name: "大屋 太輔",
    role: "EKKYO.HUB",
    workshop: "ワークショップ名 — 近日公開",
    image: "/images/members/tasuke-oya.jpg",
  },
];

/* 主催者写真（サミットとは／主催の紹介に使用・16:9）
   元素材: /Users/keys/Documents/co_ekkyo/集合写真_16-9_summit-logo.png → sips で 2000px JPEG化 */
export const ORGANIZER_PHOTO = {
  src: "/images/summit2026/organizer.jpg",
  alt: "一般社団法人EKKYO.HUBのメンバー集合写真",
};
