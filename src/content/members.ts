export type Member = {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  affiliation: string[];
  bio?: string;
  image?: string;
  links: {
    label: string;
    url: string;
  }[];
};

export const members: Member[] = [
  {
    id: "hiroto-kizu",
    name: "木津 裕人",
    nameEn: "Hiroto Kizu",
    role: "理事",
    affiliation: [
      "東北大学大学院 理学研究科 地球物理学専攻 修士2年",
      "一般社団法人EKKYO.HUB 理事",
      "スパークル株式会社 アソシエイト",
    ],
    image: "/images/members/hiroto-kizu.jpg",
    links: [
      { label: "Facebook", url: "https://www.facebook.com/hiroto.keys/" },
      { label: "Instagram", url: "https://www.instagram.com/keys_713/" },
    ],
  },
];
