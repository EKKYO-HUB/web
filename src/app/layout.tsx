import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ekkyo.jp"),
  title: {
    default: "EKKYO.HUB | 越境",
    template: "%s | EKKYO.HUB",
  },
  description:
    "面白そうを開拓せよ、面白そうでは終わらせない。一般社団法人EKKYO.HUBは好奇心と創造性で領域を越えていくクリエイティブコミュニティです。",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/images/logo/logo_丸_青背景.svg",
    apple: "/images/logo/logo_丸_青背景.svg",
  },
  openGraph: {
    title: "EKKYO.HUB | 越境",
    description:
      "面白そうを開拓せよ、面白そうでは終わらせない。一般社団法人EKKYO.HUBは好奇心と創造性で領域を越えていくクリエイティブコミュニティです。",
    url: "https://www.ekkyo.jp",
    siteName: "EKKYO.HUB",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/images/og/OG.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable} ${montserrat.variable}`}>
      <body className="min-h-screen font-sans">
        <Header />
        <main className="pt-[69px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
