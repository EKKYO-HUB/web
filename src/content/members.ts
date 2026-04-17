export type Member = {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  bio: string;
  image?: string;
  group: "board" | "community";
  links: {
    label: string;
    url: string;
  }[];
};

export const members: Member[] = [
  {
    id: "ritsuha-tanaka",
    name: "田中 律羽",
    nameEn: "Ritsuha Tanaka",
    role: "代表理事 / Founder",
    group: "board",
    image: "/images/members/ritsuha-tanaka.jpg",
    bio: "1998年長野県松本市生まれ。2023年東北大学工学研究科応用化学専攻卒(工学修士)。在学中に技術の社会実装に興味を持ち留学し、UC BerkeleyのHaas MBAでデザイン思考を学び、デンマーク工科大学大学院のtechnology designクラスでは現地企業と大学共同でのスタートアップ立ち上げに参画(文科省トビタテ!留学JAPAN大学14期)。その後ドイツ・ベルリンに渡り、アクセラレータでの技術探索インターンを通して日欧のスタートアップエコシステムの構築に携わった。卒業後は大手日系メーカーにて、新事業開発の戦略、オープンイノベーション推進を経て経営戦略に従事。並行して、留学中に立ち上げた若者の越境と共創の場を創るクリエイティブユニットEKKYO.HUBの代表および一般社団法人EKKYO.HUBの代表理事を務めながら、さらなる越境への探求を進めている。",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/ritanoryokouki/" },
      { label: "Facebook", url: "https://www.facebook.com/profile.php?id=100016704302158" },
    ],
  },
  {
    id: "moka-takeda",
    name: "武田 萌花",
    nameEn: "Moka Takeda",
    role: "理事 / Art Director",
    group: "board",
    image: "/images/members/moka-takeda.jpg",
    bio: "1997年東京都出身。アーティスト。2024年東京藝術大学大学院 先端芸術表現専攻修了。「車窓風景」や「工事現場」など都市の日常的な風景から着想を得て、情報やイメージで氾濫した現代におけるリアリティとは何かを問うインスタレーション作品を発表している。主な展示歴・活動歴に「藝大アートプラザ・アートアワード2024」デジタルアート部門「JR東日本賞」受賞(2024)、「ヨーゼフ・ボイス ダイアローグ展」(GYRE gallery, 2024)、NTTインターコミュニケーション・センター【ICC】「エマージェンシーズ！045」(ICC, 2023)、他。",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/land.scape.laboratory/" },
      { label: "Facebook", url: "https://www.facebook.com/moka.takeda.38" },
      { label: "Note", url: "https://note.com/ekkyo_hub/n/ne06a25baf0cf" },
    ],
  },
  {
    id: "haruki-tabata",
    name: "田畑 春樹",
    nameEn: "Haruki Tabata",
    role: "理事 / BizDev",
    group: "board",
    image: "/images/members/haruki-tabata.jpg",
    bio: "1999年福岡県出身。立命館アジア太平洋大学 国際経営学部卒。大学在学中のバックパッカー旅を通じてアジア各国の孤児院やスラム、難民キャンプを訪れた経験から、途上国での子ども支援に関心を持つ。その後国際協力関連の学生活動を経て、大学3年時にITを通じて社会課題解決に取り組む株式会社STEAHを創業。本業の側、地域の子どものクリエイティビティと社会のクリエイティビティを連関させるE'muプロジェクトを発足し、ディレクターを務める。",
    links: [
      { label: "Website", url: "https://steah.co.jp/" },
      { label: "Instagram", url: "https://www.instagram.com/tabaharu_39/" },
      { label: "Facebook", url: "https://www.facebook.com/profile.php?id=100025912242470" },
      { label: "Note", url: "https://note.com/ekkyo_hub/n/n9a485ef6b6bc" },
    ],
  },
  {
    id: "tomoya-suzuki",
    name: "鈴木 智也",
    nameEn: "Tomoya Suzuki",
    role: "理事 / Researcher",
    group: "board",
    image: "/images/members/tomoya-suzuki.jpg",
    bio: "茨城県日立市出身。東北大学理学部物理学科4年。材料科学高等研究所(AIMR)光電子固体物性研究室所属。小学校時代はつくば市で過ごし、研究所への見学を通じて自然科学への憧れを募らせる。小学校6年生の時に島根県津和野市に移住。全校生徒7名の小学校を卒業後、廃校を食い止めるクラウドファンディングを行う。愛媛県の高校に進学し、一浪の末、東北大学理学部に進学。大学では国際交流・留学などを通じ見聞を広げる一方、学問知と社会変革の接続点を見出すためにEKKYO.HUBにジョイン。主に学際連携や内部創発、複数の学問を横断したアートプロジェクトのプロデュースなどに関わる。",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/tom___kix.s/" },
      { label: "Facebook", url: "https://www.facebook.com/profile.php?id=100078890260345" },
      { label: "Note", url: "https://note.com/ekkyo_hub/n/n5370db2984eb" },
    ],
  },
  {
    id: "hiroto-kizu",
    name: "木津 裕人",
    nameEn: "Hiroto Kizu",
    role: "理事 / Researcher",
    group: "board",
    bio: "2002年埼玉県出身。東北大学大学院理学研究科博士前期課程2年。宇宙が好き。大学入学後、人工衛星開発スタートアップでのインターンや学生火星探査ローバーの開発を経て、現在は独立系VCに従事。『EKKYO.SUMMIT2025 in信州上田』のプロジェクトマネージャーを務める。初期地球や火星における生命起源に関して研究中。",
    image: "/images/members/hiroto-kizu.jpg",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/keys_713/" },
      { label: "Facebook", url: "https://www.facebook.com/hiroto.keys/" },
    ],
  },
  {
    id: "tasuke-oya",
    name: "大屋 太亮",
    nameEn: "Tasuke Oya",
    role: "理事 / Researcher",
    group: "board",
    image: "/images/members/tasuke-oya.jpg",
    bio: "2001年生まれ、福岡県育ち。九州大学共創学部卒。専攻は文化人類学で、八女市の合鴨稲作農家をフィールドに、卒論はアイガモ稲作について執筆。2024年の糸島SUMMIT契機で参画。普段はIT企業のマーケターをしており、哲学も含めて個人的に学習中。",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/tasuke008/" },
      { label: "Facebook", url: "https://www.facebook.com/tasukeoya" },
    ],
  },
  {
    id: "takumi-hirasawa",
    name: "平澤 拓海",
    nameEn: "Takumi Hirasawa",
    role: "SUMMIT2025 Ambassador",
    group: "community",
    image: "/images/members/takumi-hirasawa.jpg",
    bio: "1997年長野県上田市出身。東北大学工学部卒業。エネルギーシステムを専攻しながら学生時代にCOP25に参加。2022年に環境省に入省し、気候変動対策に取り組んでいる。2024年からは地元に戻り、NPOにて脱炭素化に携わる傍ら、ゆるりと未来のことを話す「緑のフィーカの会」を開催している。",
    links: [],
  },
  {
    id: "sakura-kotokawa",
    name: "琴川 さくら",
    nameEn: "Sakura Kotokawa",
    role: "E'mu Project Director",
    group: "community",
    image: "/images/members/sakura-kotokawa.jpg",
    bio: "琴川さくらは、マルチスピーシーズ・コンヴィヴィアリティに情熱を持つ、ものづくりに精通したトランジションデザイナーです。彼女は人間と自然が調和して共存するようなコンヴィヴィアルな感覚をアートを通して作り出すことに努めています。ロンドン芸術大学と京都工芸繊維大学（2024）で芸術と工学の修士号を取得しており、修士研究では、子供たちと共同でアートプロジェクトを通じて非人間生物への共生を広げるツールを探求しました。さくらの活動はイギリス、フィンランド、クロアチア、日本など、世界各国で展開されており、アートとデザインを通じて地球と調和して共存できる未来を探求するためにさまざまなコミュニティと協力しています。",
    links: [
      { label: "Instagram (マロントマール)", url: "https://www.instagram.com/marrontmarc/" },
      { label: "Instagram", url: "https://www.instagram.com/kotokawa.glass/" },
    ],
  },
];
