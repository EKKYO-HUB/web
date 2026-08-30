import type { Metadata } from "next";
import { shipporiMincho } from "./fonts";

export const metadata: Metadata = {
  title: "耕せ | EKKYO.SUMMIT 2025 in 信州上田 ARCHIVE",
  description:
    "「耕せ」をテーマに信州上田で開催された越境の祭典、EKKYO.SUMMIT 2025のアーカイブ。土を耕すと、3日間・18のワークショップの記録が芽吹きます。",
  openGraph: {
    title: "耕せ | EKKYO.SUMMIT 2025 in 信州上田 ARCHIVE",
    description:
      "土を耕すと、記録が芽吹く。EKKYO.SUMMIT 2025（2025.11.01–03 / 信州上田）のアーカイブサイト。",
    images: [{ url: "/images/portfolio/summit-2025-ueda.jpg" }],
  },
};

/* 没入型マイクロサイト：共通ヘッダー/フッターは
   Header.tsx / ConditionalFooter.tsx 側で /summit/2025 を除外している。
   -mt-[69px] は共通レイアウトの main の pt-[69px] を打ち消すため。 */
export default function Summit2025ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${shipporiMincho.variable} tagayase-root -mt-[69px] bg-tagayase-deep font-mincho text-tagayase-paper`}
    >
      {children}
    </div>
  );
}
