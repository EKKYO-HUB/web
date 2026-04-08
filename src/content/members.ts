export type Member = {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  bio: string;
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
    role: "理事 / Researcher",
    bio: "2002年埼玉県出身。東北大学大学院理学研究科博士前期課程1年。宇宙が好き。初期火星における生命起源物質の形成過程に関して研究中。人工衛星開発スタートアップでの活動や学生火星探査ローバーの開発を経て、現在は独立系ベンチャーキャピタルで活動中。『EKKYO.SUMMIT2025 in信州上田』のプロジェクトマネージャーを務める。",
    image: "/images/members/hiroto-kizu.jpg",
    links: [
      { label: "Facebook", url: "https://www.facebook.com/hiroto.keys/" },
      { label: "Instagram", url: "https://www.instagram.com/keys_713/" },
    ],
  },
];
