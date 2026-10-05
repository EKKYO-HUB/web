"use client";

import { Fragment } from "react";
import Image from "next/image";
import AiPhoto from "./AiPhoto";
import MamireDialog, { MudMark } from "./MamireDialog";
import {
  dateOf,
  EXHIBITOR_IMAGES,
  PROFILES,
  peopleOf,
  type Program,
} from "@/content/summit2026";

/* プログラム詳細のポップアップ（土台は MamireDialog） */
export default function ProgramDialog({
  program,
  onClose,
}: {
  program: Program | null;
  onClose: () => void;
}) {
  if (!program) return null;
  const day = dateOf(program);
  const photos = peopleOf(program)
    .filter((n) => EXHIBITOR_IMAGES[n])
    .map((n) => ({ name: n, src: EXHIBITOR_IMAGES[n] }));
  const profiles = peopleOf(program)
    .filter((n) => PROFILES[n])
    .map((n) => ({ name: n, paras: PROFILES[n] }));

  return (
    <MamireDialog open onClose={onClose} labelledBy="program-dialog-title">
      {program.visual && (
        <Image
          src={program.visual.src}
          alt={program.visual.alt}
          width={program.visual.width}
          height={program.visual.height}
          sizes="(min-width: 640px) 576px, 100vw"
          className="-mx-6 -mt-8 mb-8 block w-[calc(100%+3rem)] max-w-none sm:-mx-10 sm:-mt-10 sm:w-[calc(100%+5rem)]"
        />
      )}
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-montserrat text-xl font-semibold tracking-wide">
          {day.date}
        </span>
        <span className="font-mincho text-sm text-mamire-ink/70">{day.weekday}</span>
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
      <MudMark />

      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-sm">
        <dt className="tracking-[0.2em] text-mamire-silt">会場</dt>
        <dd className="text-mamire-ink/85">{program.place ?? "調整中"}</dd>
        {program.by && (
          <>
            <dt className="tracking-[0.2em] text-mamire-silt">出展</dt>
            <dd className="text-mamire-ink/85">{program.by}</dd>
          </>
        )}
        {program.speakers && (
          <>
            <dt className="tracking-[0.2em] text-mamire-silt">登壇者</dt>
            <dd className="text-mamire-ink/85">{program.speakers}</dd>
          </>
        )}
        {program.acts && (
          <>
            <dt className="tracking-[0.2em] text-mamire-silt">出演</dt>
            <dd className="text-mamire-ink/85">{program.acts}</dd>
          </>
        )}
        {program.coop && (
          <>
            <dt className="tracking-[0.2em] text-mamire-silt">協力</dt>
            <dd className="text-mamire-ink/85">{program.coop}</dd>
          </>
        )}
        {program.credits?.map((c) => (
          <Fragment key={c.label}>
            <dt className="tracking-[0.2em] text-mamire-silt">{c.label}</dt>
            <dd className="text-mamire-ink/85">{c.value}</dd>
          </Fragment>
        ))}
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

      {program.messages?.map((m) => (
        <p
          key={m.text}
          className="mt-6 border-l-2 border-mamire-mud/60 pl-4 font-mincho text-base leading-[1.9] text-mamire-ink"
        >
          {m.text}
          {m.by && (
            <span className="mt-1 block font-sans text-[11px] tracking-[0.15em] text-mamire-silt">
              {m.by}
            </span>
          )}
        </p>
      ))}

      {program.note && (
        <div className="mt-6">
          <p className="text-[11px] tracking-[0.2em] text-mamire-silt">参加にあたって</p>
          <p className="mt-1.5 text-sm leading-[1.9] text-mamire-ink/80">{program.note}</p>
        </div>
      )}

      {program.flyer && (
        <a
          href={program.flyer.src}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block border border-mamire-silt/40 transition-opacity hover:opacity-85"
        >
          <Image
            src={program.flyer.src}
            alt={program.flyer.alt}
            width={program.flyer.width}
            height={program.flyer.height}
            sizes="(min-width: 640px) 496px, 100vw"
            className="block h-auto w-full"
          />
        </a>
      )}

      {profiles.length > 0 && (
        <div className="mt-6">
          <p className="text-[11px] tracking-[0.2em] text-mamire-silt">プロフィール</p>
          <div className="mt-1.5 space-y-4">
            {profiles.map((pr) => (
              <div key={pr.name} className="space-y-2 text-[13px] leading-[1.9] text-mamire-ink/70">
                {peopleOf(program).length > 1 && (
                  <p className="font-mincho text-sm font-bold text-mamire-ink">{pr.name}</p>
                )}
                {pr.paras.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </MamireDialog>
  );
}
