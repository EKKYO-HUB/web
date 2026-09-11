"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ScheduleDay } from "@/content/summit2026";

/* 3日間のタイムテーブル。日付タブ → 時刻｜内容 の素朴なリスト。 */
export default function Timetable({ days }: { days: ScheduleDay[] }) {
  const [active, setActive] = useState<ScheduleDay["day"]>(days[0].day);
  const current = days.find((d) => d.day === active) ?? days[0];

  return (
    <div>
      {/* 日付タブ */}
      <div
        role="tablist"
        aria-label="開催日"
        className="flex gap-6 border-b border-mamire-silt/40 sm:gap-10"
      >
        {days.map((d) => {
          const on = d.day === active;
          return (
            <button
              key={d.day}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`timetable-day-${d.day}`}
              onClick={() => setActive(d.day)}
              className={cn(
                "-mb-px flex items-baseline gap-2 border-b-2 pb-4 pt-1 text-left transition-colors",
                on
                  ? "border-mamire-mud text-mamire-ink"
                  : "border-transparent text-mamire-ink/35 hover:text-mamire-ink/70"
              )}
            >
              <span className="font-montserrat text-2xl font-semibold tracking-wide sm:text-3xl">
                {d.date}
              </span>
              <span className="font-mincho text-sm">{d.weekday}</span>
            </button>
          );
        })}
      </div>

      {/* その日の内容（切替時にふわっと） */}
      <div
        key={current.day}
        id={`timetable-day-${current.day}`}
        role="tabpanel"
        className="mamire-fade-in"
      >
        <p className="mt-8 font-mincho text-lg font-bold tracking-wide text-mamire-mud">
          {current.heading}
        </p>
        <ol className="mt-4 divide-y divide-mamire-silt/30 border-b border-mamire-silt/40">
          {current.items.map((it, i) => (
            <li
              key={`${current.day}-${i}`}
              className="grid gap-1 py-6 sm:grid-cols-[120px_1fr] sm:gap-8"
            >
              <span className="font-montserrat text-base font-medium tabular-nums tracking-wide text-mamire-ink/70 sm:text-lg">
                {it.time}
              </span>
              <div>
                <p className="font-mincho text-lg font-bold text-mamire-ink sm:text-xl">
                  {it.title}
                </p>
                {(it.note || it.place) && (
                  <p className="mt-1.5 text-sm leading-[1.9] text-mamire-ink/60">
                    {it.note}
                    {it.note && it.place ? "　" : ""}
                    {it.place}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
