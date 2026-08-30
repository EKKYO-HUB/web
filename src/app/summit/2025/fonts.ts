import { Shippori_Mincho } from "next/font/google";

/* SUMMIT 2025「耕せ」アーカイブ専用の明朝体。
   このルート配下でのみ変数を付与するため、他ページのペイロードには影響しない。 */
export const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false, // 日本語グリフはCSS側のunicode-range分割に任せる
});
