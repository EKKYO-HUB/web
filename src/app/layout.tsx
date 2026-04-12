import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Montserrat } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageProgressBar from "@/components/ui/PageProgressBar";
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
    default: "EKKYO.HUB | 越境と共創で世界をもっと面白く",
    template: "%s | EKKYO.HUB",
  },
  description:
    "面白そうを開拓せよ、面白そうでは終わらせない。一般社団法人EKKYO.HUBは越境と共創を通じて、好奇心と創造性で領域を越えていくクリエイティブユニットです。",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logo/logo_丸_青背景.svg",
    apple: "/images/logo/logo_丸_青背景.svg",
  },
  alternates: {
    canonical: "https://www.ekkyo.jp",
  },
  openGraph: {
    title: "EKKYO.HUB | 越境と共創で世界をもっと面白く",
    description:
      "面白そうを開拓せよ、面白そうでは終わらせない。一般社団法人EKKYO.HUBは越境と共創を通じて、好奇心と創造性で領域を越えていくクリエイティブユニットです。",
    url: "https://www.ekkyo.jp",
    siteName: "EKKYO.HUB",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/images/og/OG.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EKKYO.HUB | 越境と共創で世界をもっと面白く",
    description:
      "面白そうを開拓せよ、面白そうでは終わらせない。一般社団法人EKKYO.HUBは越境と共創を通じて、好奇心と創造性で領域を越えていくクリエイティブユニットです。",
    images: ["/images/og/OG.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable} ${montserrat.variable}`}>
      <head>
        {/* Preconnect to image CDN for note.com thumbnails */}
        <link rel="preconnect" href="https://assets.st-note.com" />
        <link rel="dns-prefetch" href="https://assets.st-note.com" />
      </head>
      <body className="min-h-screen overflow-x-hidden font-sans">
        <PageProgressBar />
        <Header />
        <main className="pt-[69px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
