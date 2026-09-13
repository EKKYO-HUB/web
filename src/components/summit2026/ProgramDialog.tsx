"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import AiPhoto from "./AiPhoto";
import {
  DAYS,
  EXHIBITOR_IMAGES,
  peopleOf,
  type Program,
} from "@/content/summit2026";

/* プログラム詳細のポップアップ。
   水底（濃い緑）の幕の奥から、紙の質感の一枚が浮かび上がる。
   - body 直下へポータル（PageTransition の transform 対策）
   - Esc / 幕クリック / 閉じるボタンで閉じる。開いている間は背景スクロールを止める */
export default function ProgramDialog({
  program,
  onClose,
}: {
  program: Program | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!program) return;
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
  }, [program, onClose]);

  if (!program) return null;
  const day = DAYS[program.day];
  const photos = peopleOf(program)
    .filter((n) => EXHIBITOR_IMAGES[n])
    .map((n) => ({ name: n, src: EXHIBITOR_IMAGES[n] }));

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="program-dialog-title"
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
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-montserrat text-xl font-semibold tracking-wide">
              {day.date}
            </span>
            <span className="font-mincho text-sm text-mamire-ink/70">
              {day.weekday}
            </span>
            <span className="font-montserrat text-sm tracking-wide text-mamire-ink/60">
              {program.time}
            </span>
          </p>

          <h2
            id="program-dialog-title"
            className="mt-4 font-mincho text-2xl font-bold leading-snug tracking-wide sm:text-3xl"
          >
            {program.title}
          </h2>
          <svg aria-hidden width="30" height="14" viewBox="0 0 30 14" className="mt-3 text-mamire-mud/75">
            <path
              d="M4 7.5c1.5-3.8 6-5.5 11-5.2 5 .3 9.5 1.6 11 4.4 1 2-2.2 4.3-7.5 4.8-5.6.5-11.3-.4-13.6-2.1C4 8.9 3.8 8.2 4 7.5z"
              fill="currentColor"
              filter="url(#mamire-mud-mark)"
            />
          </svg>

          <dl className="mt-6 grid grid-cols-[4.5rem_1fr] gap-y-2 text-sm">
            <dt className="tracking-[0.2em] text-mamire-silt">会場</dt>
            <dd className="text-mamire-ink/85">{program.place ?? "調整中"}</dd>
            {program.by && (
              <>
                <dt className="tracking-[0.2em] text-mamire-silt">出展</dt>
                <dd className="text-mamire-ink/85">{program.by}</dd>
              </>
            )}
            {program.coop && (
              <>
                <dt className="tracking-[0.2em] text-mamire-silt">協力</dt>
                <dd className="text-mamire-ink/85">{program.coop}</dd>
              </>
            )}
          </dl>

          <div className="mt-6 flex gap-5">
            {photos.length > 0 && (
              <div className="flex shrink-0 flex-col gap-3">
                {photos.map((ph) => (
                  <AiPhoto
                    key={ph.name}
                    src={ph.src}
                    alt={ph.name}
                    className="h-24 w-24 sm:h-28 sm:w-28"
                    sizes="112px"
                  />
                ))}
              </div>
            )}
            <div className="min-w-0 space-y-3 text-sm leading-[2] text-mamire-ink/80">
              {program.desc ? (
                program.desc.map((t) => <p key={t}>{t}</p>)
              ) : (
                <p className="text-mamire-ink/55">企画内容は近日公開します。</p>
              )}
            </div>
          </div>

          {program.message && (
            <p className="mt-6 border-l-2 border-mamire-mud/60 pl-4 font-mincho text-base leading-[1.9] text-mamire-ink">
              {program.message}
            </p>
          )}

          {program.note && (
            <div className="mt-6">
              <p className="text-[11px] tracking-[0.2em] text-mamire-silt">参加にあたって</p>
              <p className="mt-1.5 text-sm leading-[1.9] text-mamire-ink/80">{program.note}</p>
            </div>
          )}

          {program.profile && (
            <div className="mt-6">
              <p className="text-[11px] tracking-[0.2em] text-mamire-silt">出展者プロフィール</p>
              <div className="mt-1.5 space-y-2 text-[13px] leading-[1.9] text-mamire-ink/70">
                {program.profile.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>
          )}

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
