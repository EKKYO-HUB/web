"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

/* 「まみれろ」共通のポップアップ土台。
   水底（濃い緑）の幕の奥から、紙の質感の一枚が浮かび上がる。
   - body 直下へポータル（PageTransition の transform 対策）
   - Esc / 幕クリック / 閉じるボタンで閉じる。開いている間は背景スクロールを止める */
export default function MamireDialog({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      {/* 幕（水底） */}
      <button
        type="button"
        aria-label="閉じる"
        onClick={onClose}
        className="mamire-dialog-veil absolute inset-0 bg-mamire-water-deep/75 backdrop-blur-[2px]"
      />

      {/* 一枚 */}
      <div className="mamire-dialog relative max-h-[88svh] w-full overflow-y-auto bg-mamire-water-pale px-6 pb-10 pt-8 text-mamire-ink sm:max-w-xl sm:px-10 sm:pb-12 sm:pt-10">
        <div className="relative z-10">
          {children}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="border border-mamire-ink/40 px-6 py-2.5 text-[11px] tracking-[0.2em] text-mamire-ink transition-colors hover:bg-mamire-ink hover:text-mamire-water-pale"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* 見出し下の泥の一滴（SectionTitle と同じ） */
export function MudMark({ className = "mt-3" }: { className?: string }) {
  return (
    <svg aria-hidden width="30" height="14" viewBox="0 0 30 14" className={`${className} text-mamire-mud/75`}>
      <path
        d="M4 7.5c1.5-3.8 6-5.5 11-5.2 5 .3 9.5 1.6 11 4.4 1 2-2.2 4.3-7.5 4.8-5.6.5-11.3-.4-13.6-2.1C4 8.9 3.8 8.2 4 7.5z"
        fill="currentColor"
        filter="url(#mamire-mud-mark)"
      />
    </svg>
  );
}
