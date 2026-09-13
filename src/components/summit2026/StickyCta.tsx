"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/* 画面下部に追従する参加申し込みCTA。
   - PageTransition(transform) の内側では position:fixed が祖先基準になるため、
     createPortal で body 直下に出す（既知の落とし穴への対処）
   - ヘッダーと同じく、到着時（ヒーロー表示中）は出さず、ヒーローを抜けると下から出る
   - 色は .mamire-cta（スクロールで泥に濁る） */
export default function StickyCta({
  registrationUrl,
}: {
  registrationUrl: string | null;
}) {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  if (!mounted) return null;

  const cls =
    "mamire-cta pointer-events-auto inline-flex w-full max-w-md items-center justify-center gap-2 px-8 py-4 text-[12px] font-semibold tracking-[0.2em] text-white shadow-lg shadow-mamire-ink/20 sm:w-auto";

  return createPortal(
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 transition-all duration-500 ease-out sm:bottom-6 sm:pb-0",
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
      aria-hidden={!shown}
    >
      {registrationUrl ? (
        <a
          href={registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          tabIndex={shown ? 0 : -1}
        >
          参加申し込み
          <span>&rarr;</span>
        </a>
      ) : (
        <a href="#apply" className={cls} tabIndex={shown ? 0 : -1}>
          参加申し込み — 近日公開
        </a>
      )}
    </div>,
    document.body
  );
}
