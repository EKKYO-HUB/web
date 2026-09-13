"use client";

import { useCallback, useState } from "react";
import AiPhoto from "./AiPhoto";
import MamireDialog, { MudMark } from "./MamireDialog";
import {
  DAYS,
  PROGRAMS,
  EXTRA_EXHIBITORS,
  EXHIBITOR_IMAGES,
  peopleOf,
  type Program,
} from "@/content/summit2026";

/* 出展者一覧。PROGRAMS の出展者（people）を重複なくまとめ、担当プログラムを添える。
   EXTRA_EXHIBITORS（運営メンバーなど）を末尾に加える。
   写真は EXHIBITOR_IMAGES にあれば藍色＋波紋の演出（AiPhoto）で表示。
   カードをクリックすると、その人のポップアップ（写真・プログラム・プロフィール・ひとこと）。 */

type Exhibitor = {
  name: string;
  role?: string;
  image?: string;
  programs: Program[];
};

function collect(): Exhibitor[] {
  const map = new Map<string, Exhibitor>();
  for (const p of PROGRAMS) {
    for (const name of peopleOf(p)) {
      const ex = map.get(name) ?? {
        name,
        image: EXHIBITOR_IMAGES[name],
        programs: [],
      };
      ex.programs.push(p);
      map.set(name, ex);
    }
  }
  for (const e of EXTRA_EXHIBITORS) {
    const ex = map.get(e.name);
    if (ex) {
      if (!ex.role) ex.role = e.role;
    } else {
      map.set(e.name, {
        name: e.name,
        role: e.role,
        image: EXHIBITOR_IMAGES[e.name],
        programs: [],
      });
    }
  }
  return Array.from(map.values());
}

const LIST = collect();

function ExhibitorDialog({
  ex,
  onClose,
}: {
  ex: Exhibitor | null;
  onClose: () => void;
}) {
  if (!ex) return null;
  const profiles = Array.from(
    new Set(ex.programs.flatMap((p) => p.profile ?? []))
  );
  const messages = Array.from(
    new Set(ex.programs.map((p) => p.message).filter((m): m is string => !!m))
  );

  return (
    <MamireDialog open onClose={onClose} labelledBy="exhibitor-dialog-title">
      <div className="flex gap-6">
        {ex.image && (
          <AiPhoto
            src={ex.image}
            alt={ex.name}
            className="h-28 w-28 shrink-0 sm:h-36 sm:w-36"
            sizes="144px"
          />
        )}
        <div className="min-w-0">
          {ex.role && (
            <p className="text-[11px] tracking-[0.2em] text-mamire-silt">{ex.role}</p>
          )}
          <h2
            id="exhibitor-dialog-title"
            className="mt-1 font-mincho text-2xl font-bold leading-snug tracking-wide sm:text-3xl"
          >
            {ex.name}
          </h2>
          <MudMark />
        </div>
      </div>

      {ex.programs.length > 0 && (
        <div className="mt-6">
          <p className="text-[11px] tracking-[0.2em] text-mamire-silt">プログラム</p>
          <ul className="mt-2 divide-y divide-mamire-silt/30 border-y border-mamire-silt/40">
            {ex.programs.map((p) => (
              <li key={p.id} className="py-3">
                <p className="font-montserrat text-[11px] tracking-wide text-mamire-ink/55">
                  {DAYS[p.day].date}
                  <span className="ml-1 font-mincho">{DAYS[p.day].weekday}</span>
                  <span className="ml-3">{p.time}</span>
                  <span className="ml-3 font-sans tracking-[0.1em]">
                    {p.place ?? "会場調整中"}
                  </span>
                </p>
                <p className="mt-1 font-mincho text-base font-bold leading-snug text-mamire-ink">
                  {p.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {messages.map((m) => (
        <p
          key={m}
          className="mt-6 border-l-2 border-mamire-mud/60 pl-4 font-mincho text-base leading-[1.9] text-mamire-ink"
        >
          {m}
        </p>
      ))}

      {profiles.length > 0 ? (
        <div className="mt-6">
          <p className="text-[11px] tracking-[0.2em] text-mamire-silt">プロフィール</p>
          <div className="mt-1.5 space-y-2 text-[13px] leading-[1.9] text-mamire-ink/70">
            {profiles.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-mamire-ink/55">プロフィールは近日公開します。</p>
      )}
    </MamireDialog>
  );
}

export default function Exhibitors() {
  const [selected, setSelected] = useState<Exhibitor | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:gap-y-12">
        {LIST.map((ex) => (
          <li key={ex.name}>
            <button
              type="button"
              onClick={() => setSelected(ex)}
              className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-mamire-mud"
            >
              {ex.image ? (
                <AiPhoto
                  src={ex.image}
                  alt={ex.name}
                  className="mb-4 aspect-square w-full"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 33vw, 50vw"
                />
              ) : (
                <div className="mb-4 border-t border-mamire-mud/50" />
              )}
              <p className="font-mincho text-base font-bold tracking-wide text-mamire-ink underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-mamire-mud/60 sm:text-lg">
                {ex.name}
              </p>
              {ex.role && (
                <p className="mt-0.5 text-[11px] tracking-[0.15em] text-mamire-silt">
                  {ex.role}
                </p>
              )}
              {ex.programs.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                  {ex.programs.map((p) => (
                    <li key={p.id} className="text-[13px] leading-[1.7] text-mamire-ink/70">
                      <span className="mr-2 font-montserrat text-[11px] tracking-wide text-mamire-ink/45">
                        {DAYS[p.day].date}
                      </span>
                      {p.title}
                    </li>
                  ))}
                </ul>
              )}
            </button>
          </li>
        ))}
      </ul>

      <ExhibitorDialog ex={selected} onClose={close} />
    </>
  );
}
