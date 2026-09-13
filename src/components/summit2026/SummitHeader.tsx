"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* SUMMIT 2026 専用ミニマルヘッダー（没入型）
   到着時（ヒーロー表示中）は出さず、ヒーローを抜けたあたりで上から滑り込む。
   左: 大会ロゴ / 右: EKKYO.HUBへの帰り道 + 参加申し込み（.mamire-cta＝スクロールで濁る） */
export default function SummitHeader({
  registrationUrl,
}: {
  registrationUrl: string | null;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setShown(window.scrollY > window.innerHeight * 0.7);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const cta =
    "mamire-cta px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-white sm:px-5";

  return (
    <header
      className={cn(
        "fixed top-0 z-50 h-14 w-full border-b border-mamire-silt/20 bg-mamire-water-pale/90 backdrop-blur-md transition-transform duration-500 ease-out",
        shown ? "translate-y-0" : "-translate-y-full"
      )}
      aria-hidden={!shown}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-10">
        <a href="#top" className="flex items-center" aria-label="EKKYO.SUMMIT 2026">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/summit2026/ekkyo-summit-2026.svg"
            alt="EKKYO.SUMMIT 2026"
            className="h-5 w-auto brightness-0 opacity-85 sm:h-6"
          />
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="hidden text-[11px] tracking-[0.12em] text-mamire-ink/60 transition-colors hover:text-mamire-ink sm:inline"
          >
            EKKYO.HUB &rarr;
          </Link>
          {registrationUrl ? (
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cta}
            >
              参加申し込み
            </a>
          ) : (
            <a href="#apply" className={cta}>
              参加申し込み
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
