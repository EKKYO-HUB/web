/* ──────────────────────────────────────────────────────────
   EKKYO.SUMMIT 2026「まみれろ」— プログラムデータ

   出典: ワークショップマスタ＋出展者フォーム回答（Google スプレッドシート）2026-09-13 時点。
   掲載するのは 名称・日付・時間・会場・出展者・企画内容 と、
   出展者フォーム（掲載可と明記）の 企画趣旨・プロフィール・ひとこと・参加にあたって のみ
   （「EKKYO担当者／掲載不要」列や予算・宿・連絡先などのシートは掲載しない）。
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
  /** 参加者へひとこと */
  message?: string;
  /** 出展者プロフィール（段落の配列） */
  profile?: string[];
  /** 参加にあたって（持ち物・定員など） */
  note?: string;
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
  岩見歩昂: "/images/summit2026/exhibitors/iwami-hotaka.jpg",
  福本和生: "/images/summit2026/exhibitors/fukumoto-kazuki.jpg",
  錦織史哉: "/images/summit2026/exhibitors/nishikori-fumiya.jpg",
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
    message: "このグローバルな時代だからこそ、日本人が寿司を握れると最強です。",
    profile: [
      "琴川 夕星（ことかわ ゆうせい）。MOON LLC.の代表。日本の観究者、コンセプター、ナラティビスト、アートディレクター、寿司職人、音楽プロデューサー、カフェ・ギャラリー運営、新概念クリエイター、辞書編集者、俳人、野点茶人、韻味研究家、楽器創作家、他。【自然】【時間】【波】の3つを軸に、科学や論理、精神、感性、種族、生命などの境界線を溶かしながら、日々世界の輪郭を眺めている。",
    ],
    note: "寿司の握り方を教えます（実践含む）。定員10名。ふきん・てぬぐいなど手を拭くものをご準備ください。",
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
    by: "福本和生",
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
    desc: [
      "「私達の身体は、誰のものなのか？」",
      "私の身体は、本当に私だけのものでしょうか。私がする動きは、すべて私自身が生み出したものなのでしょうか。私たちは、なぜ「自分らしさ」や「オリジナリティ」を求めるのでしょう。",
      "人や土地、環境との関わりの中で生まれる身体。その境界が曖昧になり、主語が少しずつ消えていく。そんな身体のあり方を、滋賀という土地から見つめる時間です。",
    ],
    message: "感覚の海にダイブしましょう！",
    profile: [
      "国内外のコンテンポラリーダンスの舞台公演に数多く出演（Centre National de la Danse パリ国立劇場、日仏文化会館、New York Japan Society 等）。2016年から滋賀県大津市に移住。比叡平ダンスクラブを立ち上げる。モダンダンス、武道のエッセンスを分解・再構築し、「関わり」の中で生まれるダンスを考察している。2024年から「滋賀県文化を活用した地域交流創出事業」に、はまダンスとして採択され、県内の地域の美をダンサーの視点から再発見する事業に携わっている。",
    ],
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
    desc: [
      "人間中心デザインが主流となって、もう長い時間が経ちました。今、わたしたちは次のフェーズへ移ろうとしています。More-than-Human Design ― 人間を超えた視野を持ち、デザインすること。地球というひとつの惑星の中で営みを持つわたしたちに、いま求められている態度です。",
      "このワークショップで使うのは茶道の「型」。誰もが使いこなせ、自由に発想を広げられる道具として型を捉え直す試みです。今回、その型として外での茶道、野点を選びました。茶碗、湯、道具、その場の空気。茶道の場にはもともと、人だけでなく多くの存在が招かれています。決められた所作をなぞりながら、そこに誰がいるのかを見つけ直してみたい。お茶の経験はもちろん問いません。",
      "目指すのは multispecies conviviality。人間を超えた存在たちとどう生きていけるかを、手を動かしながら一緒にデザインしませんか？ ※本ワークショップは博士研究の一環として実施されます。",
    ],
    message: "こどもも大人も大歓迎！一緒にティータイムを楽しみましょう",
    profile: [
      "【マロントマール】デザイン実践＆研究の非営利団体。こどもアトリエ食堂、Kids Design Labなど、子どもとともにデザインを考える場を各地でひらいている。代表・琴川さくらは京都工芸繊維大学博士後期課程にて、convivialityをテーマに研究。",
      "【MATCHAZ】世界各地でお茶会をひらく茶道ユニット。自然から学び、茶道を通して自然とつながる体験を届けている。京都・鴨川デルタでの野点茶会のほか、昨年はロンドンのハイドパーク、ブルームズベリー・スクエア・ガーデンでも野点を開催。",
    ],
  },
  {
    id: "yarasareru",
    day: 2,
    time: "15:00–16:00",
    title:
      "「やらされる」と「やりたい」のあいだ ――人はなぜ、組織で自ら動くのか？",
    place: "西浅井",
    by: "平野真生",
    desc: [
      "「もっと自由にやっていいよ」と言われても動けない。逆に、細かく決められているのに、なぜか夢中になれることもある。人の自発性と組織の管理は、単純な対立ではないのかもしれない。",
      "管理される私、動き出す私、そしてその間にいる他者。組織の「きれいな答え」から少しはみ出して、自発的に協働するとは何かを考える。",
    ],
  },
  {
    id: "nanimono",
    day: 2,
    time: "16:00–17:00",
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
    desc: [
      "琵琶の語り／メディアアート作品『容儀の拡張』WIP展示（竹本智志）",
      "中世の宗教楽器に端を発する琵琶は、歴史的経緯から、滋賀の土地と強いつながりがあります。平家物語から安土・桃山時代の軍記まで、この土地を舞台にした語りが幅広く受け継がれてきました。今回は、それらのうちから語りを一題ご披露いたします。",
      "また、これに加えて本年度制作しているメディアアート作品『容儀の拡張』のワークインプログレス展示を実施いたします。もはや修理が難しい古琵琶をサウンドモジュールに改造し、ありし日の琵琶法師たちの祈りの気配を現前させるサウンドインスタレーションです。当日の状況により、実演・稼働状況は異なりますのでご了承ください。",
    ],
    message: "滋賀の歴史に紐づく琵琶の美をぜひお楽しみください！",
    profile: [
      "竹本智志 ― 筑前琵琶の奏者、メディアアーティスト。古典が有する「形式の力」とその情感のあり方を探究し、国内外の公演を通じてその魅力を伝える。経験則と保守性が色濃く残る芸能の世界において、「語りもの」の芸能をアカデミックな観点から分析し、その本質を損なうことなく現代の感性に応答する伝え方を探る。また、日本古典芸能固有の価値を、西洋の音楽およびアートが基盤となった現代社会に再実装するべく、先端アートとの融合を通じて、分野の垣根を超えた制作の可能性を探究する。",
    ],
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
    by: "フィッシャーアーキテクト 駒井健也",
    people: ["駒井健也"],
    desc: [
      "琵琶湖に出て漁の体験をしていただき、とれた魚のことを知りながら琵琶湖周辺を散策します。必要に応じて琵琶湖の漁体験を踏まえたアート展の案内も行います。",
    ],
    message: "琵琶湖に沼りましょう！",
    profile: [
      "フィッシャーアーキテクト 代表。「琵琶湖の中から淡水の暮らしを届けます」という理念のもと、琵琶湖伝統漁法エリ漁を軸にしたマルシェ出店、漁体験、アート展の企画、琵琶湖暮らしの魅力を発信中。100名の書き手により出版された『100年後に読む琵琶湖日記』の発起人。",
    ],
    note: "船は定員9名です。",
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
