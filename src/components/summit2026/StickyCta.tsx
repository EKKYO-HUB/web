"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/* 画面下部に追従する参加申し込みCTA。
   PageTransition(transform) の内側では position:fixed が祖先基準になるため、
   createPortal で body 直下に出す（既知の落とし穴への対処）。 */
export default function StickyCta({
  registrationUrl,
}: {
  registrationUrl: string | null;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const cls =
    "pointer-events-auto inline-flex w-full max-w-md items-center justify-center gap-2 bg-ekkyo-orange px-8 py-4 text-[12px] font-semibold tracking-[0.2em] text-white shadow-lg shadow-ekkyo-orange/30 transition-colors hover:bg-ekkyo-orange-dark sm:w-auto";

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:bottom-6 sm:pb-0">
      {registrationUrl ? (
        <a
          href={registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
        >
          参加申し込み
          <span>&rarr;</span>
        </a>
      ) : (
        <a href="#apply" className={cls}>
          参加申し込み — 近日公開
        </a>
      )}
    </div>,
    document.body
  );
}
