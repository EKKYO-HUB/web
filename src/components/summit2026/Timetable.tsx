"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { DAYS, programsOfDay, type Program } from "@/content/summit2026";
import ProgramDialog from "./ProgramDialog";

/* 3日間のタイムテーブル（カレンダー型）。
   縦＝時間、横＝同時開催。重なるプログラムは同じ時間帯に横並びになり、
   共通の時刻線で「同じ時間に開いている」ことが文字ではなく配置で伝わる。
   - pinRight のもの（終日展示など）は常に一番右のレーン
   - 空いているレーンがあれば右へ広がる（例: 全体企画は3レーン分の幅）
   - 枠をクリックすると詳細ポップアップ
   狭い画面では横スクロール（min-width）で同じレイアウトを保つ。 */

const UNIT = 15; // 1行 = 15分
const COLS = 60; // 横の分割数（1〜6並列まで等分できる）
const OPEN_END = 180; // 「18:00–」のような終了未定は 3時間ぶん確保

type Item = Program & { start: number; end: number; open: boolean };
type Placed = Item & { col: number; span: number };

function parseTime(time: string) {
  const m = time.match(/^(\d{1,2}):(\d{2})\s*[–-]\s*(?:(\d{1,2}):(\d{2}))?/);
  if (!m) return { start: 0, end: 60, open: true };
  const start = Number(m[1]) * 60 + Number(m[2]);
  const open = m[3] === undefined;
  const end = open ? start + OPEN_END : Number(m[3]) * 60 + Number(m[4]);
  return { start, end: Math.max(end, start + UNIT), open };
}

const overlaps = (a: Item, b: Item) => a.start < b.end && b.start < a.end;

function layout(items: Program[]): Placed[] {
  const parsed: Item[] = items
    .map((p) => ({ ...p, ...parseTime(p.time) }))
    .sort((a, b) => a.start - b.start || b.end - a.end);

  // 重なりの連鎖ごとにまとめる
  const clusters: Item[][] = [];
  let cur: Item[] = [];
  let curEnd = -1;
  for (const p of parsed) {
    if (cur.length > 0 && p.start >= curEnd) {
      clusters.push(cur);
      cur = [];
      curEnd = -1;
    }
    cur.push(p);
    curEnd = Math.max(curEnd, p.end);
  }
  if (cur.length > 0) clusters.push(cur);

  const out: Placed[] = [];
  for (const c of clusters) {
    const lanes: Item[][] = [];
    const laneOf = new Map<Item, number>();
    // 通常のものを左から詰める
    for (const p of c.filter((x) => !x.pinRight)) {
      let i = lanes.findIndex((l) => l.every((q) => !overlaps(q, p)));
      if (i === -1) {
        i = lanes.length;
        lanes.push([]);
      }
      lanes[i].push(p);
      laneOf.set(p, i);
    }
    // 右固定のものは最後のレーンへ
    for (const p of c.filter((x) => x.pinRight)) {
      lanes.push([p]);
      laneOf.set(p, lanes.length - 1);
    }
    const k = lanes.length;
    const unit = Math.floor(COLS / k);
    for (const p of c) {
      const lane = laneOf.get(p)!;
      let n = 1;
      if (!p.pinRight) {
        for (let j = lane + 1; j < k; j++) {
          if (lanes[j].some((q) => overlaps(q, p))) break;
          n++;
        }
      }
      out.push({ ...p, col: lane * unit, span: unit * n });
    }
  }
  return out;
}

function DayGrid({
  day,
  onSelect,
}: {
  day: 1 | 2 | 3;
  onSelect: (p: Program) => void;
}) {
  const placed = layout(programsOfDay(day));
  if (placed.length === 0) {
    return (
      <p className="py-10 text-sm text-mamire-ink/60">
        プログラムは決まり次第公開します。
      </p>
    );
  }
  const dayStart = Math.floor(Math.min(...placed.map((p) => p.start)) / 60) * 60;
  const dayEnd = Math.ceil(Math.max(...placed.map((p) => p.end)) / 60) * 60;
  const rows = (dayEnd - dayStart) / UNIT;
  const hours: number[] = [];
  for (let h = dayStart; h <= dayEnd; h += 60) hours.push(h);
  const rowOf = (min: number) => (min - dayStart) / UNIT + 1;

  return (
    <div className="-mx-6 overflow-x-auto px-6 pt-3 sm:mx-0 sm:px-0">
      <div
        className="grid min-w-[720px]"
        style={{
          gridTemplateColumns: `3.5rem repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows + 1}, minmax(1.15rem, auto))`,
        }}
      >
        {/* 時刻線と時刻 */}
        {hours.map((h) => (
          <div key={h} className="contents">
            <div
              style={{ gridRow: rowOf(h), gridColumn: "1" }}
              className="-mt-2 pr-3 text-right font-montserrat text-[11px] tabular-nums text-mamire-ink/45"
            >
              {h / 60}:00
            </div>
            <div
              style={{ gridRow: rowOf(h), gridColumn: "2 / -1" }}
              className="border-t border-mamire-silt/30"
            />
          </div>
        ))}

        {/* プログラム（クリックで詳細） */}
        {placed.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect(p)}
            style={{
              gridRow: `${rowOf(p.start)} / ${rowOf(p.end)}`,
              gridColumn: `${p.col + 2} / span ${p.span}`,
            }}
            className="relative z-10 m-[3px] flex min-w-0 flex-col bg-mamire-water/45 px-3 py-2.5 text-left transition-colors hover:bg-mamire-water/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-mamire-mud"
          >
            <span className="font-montserrat text-[10px] tracking-wide text-mamire-ink/55">
              {p.time}
            </span>
            <span className="mt-1 font-mincho text-[13px] font-bold leading-snug text-mamire-ink">
              {p.title}
            </span>
            {p.by && (
              <span className="mt-1.5 text-[11px] text-mamire-mud">{p.by}</span>
            )}
            <span className="mt-auto pt-1.5 text-[10px] tracking-[0.1em] text-mamire-silt">
              {p.place ?? "会場調整中"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Timetable() {
  const [active, setActive] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<Program | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <div>
      {/* 日付タブ */}
      <div
        role="tablist"
        aria-label="開催日"
        className="flex gap-6 border-b border-mamire-silt/40 sm:gap-10"
      >
        {([1, 2, 3] as const).map((d) => {
          const meta = DAYS[d];
          const on = d === active;
          return (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`timetable-day-${d}`}
              onClick={() => setActive(d)}
              className={cn(
                "-mb-px flex items-baseline gap-2 border-b-2 pb-4 pt-1 text-left transition-colors",
                on
                  ? "border-mamire-mud text-mamire-ink"
                  : "border-transparent text-mamire-ink/35 hover:text-mamire-ink/70"
              )}
            >
              <span className="font-montserrat text-2xl font-semibold tracking-wide sm:text-3xl">
                {meta.date}
              </span>
              <span className="font-mincho text-sm">{meta.weekday}</span>
            </button>
          );
        })}
      </div>

      {/* その日のグリッド（切替時にふわっと） */}
      <div
        key={active}
        id={`timetable-day-${active}`}
        role="tabpanel"
        className="mamire-fade-in pt-10"
      >
        <DayGrid day={active} onSelect={setSelected} />
      </div>

      <ProgramDialog program={selected} onClose={close} />
    </div>
  );
}
