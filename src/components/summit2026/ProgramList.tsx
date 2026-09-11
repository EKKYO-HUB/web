import AiPhoto from "./AiPhoto";
import { DAYS, programsOfDay, type Program } from "@/content/summit2026";

/* プログラム・出展者の一覧（日ごと）。
   出展者写真 image があれば藍色＋波紋の演出（AiPhoto）で表示する。 */
function ProgramCard({ p }: { p: Program }) {
  return (
    <li className="flex gap-5 py-7 sm:gap-7">
      {p.image && (
        <AiPhoto
          src={p.image}
          alt={p.host ?? p.title}
          className="h-20 w-20 shrink-0 sm:h-28 sm:w-28"
          sizes="112px"
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="font-montserrat text-xs tracking-wide text-mamire-ink/55">
          {p.time}
          <span className="ml-3 font-sans text-[11px] tracking-[0.12em]">
            {p.place ?? "会場調整中"}
          </span>
        </p>
        <h3 className="mt-2 font-mincho text-lg font-bold leading-snug text-mamire-ink sm:text-xl">
          {p.title}
        </h3>
        {p.host && (
          <p className="mt-2 text-sm text-mamire-mud">
            {p.hostRole ? `${p.hostRole}：` : ""}
            {p.host}
          </p>
        )}
        {p.desc && (
          <details className="group mt-3">
            <summary className="cursor-pointer list-none text-[11px] tracking-[0.15em] text-mamire-silt underline decoration-mamire-silt/40 underline-offset-4 [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">企画内容を読む</span>
              <span className="hidden group-open:inline">閉じる</span>
            </summary>
            <div className="mt-3 space-y-2 text-sm leading-[2] text-mamire-ink/80">
              {p.desc.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </details>
        )}
      </div>
    </li>
  );
}

export default function ProgramList() {
  return (
    <div className="space-y-16">
      {([1, 2, 3] as const).map((d) => {
        const meta = DAYS[d];
        const items = programsOfDay(d);
        if (items.length === 0) return null;
        return (
          <section key={d} aria-label={`${meta.date} のプログラム`}>
            <p className="flex items-baseline gap-3 border-b border-mamire-silt/40 pb-3">
              <span className="font-montserrat text-2xl font-semibold tracking-wide text-mamire-ink">
                {meta.date}
              </span>
              <span className="font-mincho text-sm text-mamire-ink/70">
                {meta.weekday}
              </span>
              <span className="ml-auto font-mincho text-sm text-mamire-mud">
                {meta.heading}
              </span>
            </p>
            <ul className="divide-y divide-mamire-silt/30">
              {items.map((p) => (
                <ProgramCard key={p.id} p={p} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
