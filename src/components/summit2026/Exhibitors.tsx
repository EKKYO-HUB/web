import AiPhoto from "./AiPhoto";
import { DAYS, PROGRAMS, type Program } from "@/content/summit2026";

/* 出展者一覧。PROGRAMS の出展者を重複なくまとめ、担当プログラムを添える。
   写真 image があれば藍色＋波紋の演出（AiPhoto）で表示する。 */

type Exhibitor = {
  name: string;
  role?: string;
  image?: string;
  programs: Program[];
};

function collect(): Exhibitor[] {
  const map = new Map<string, Exhibitor>();
  for (const p of PROGRAMS) {
    if (!p.host) continue;
    const ex = map.get(p.host) ?? {
      name: p.host,
      role: p.hostRole,
      image: p.image,
      programs: [],
    };
    ex.programs.push(p);
    if (!ex.image && p.image) ex.image = p.image;
    map.set(p.host, ex);
  }
  return Array.from(map.values());
}

export default function Exhibitors() {
  const list = collect();
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
      {list.map((ex) => (
        <li key={ex.name} className="border-t border-mamire-mud/50 pt-5">
          {ex.image && (
            <AiPhoto
              src={ex.image}
              alt={ex.name}
              className="mb-4 aspect-square w-full"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            />
          )}
          <p className="font-mincho text-lg font-bold tracking-wide text-mamire-ink">
            {ex.role && (
              <span className="mr-2 text-[11px] font-normal tracking-[0.15em] text-mamire-silt">
                {ex.role}
              </span>
            )}
            {ex.name}
          </p>
          <ul className="mt-3 space-y-2">
            {ex.programs.map((p) => (
              <li key={p.id} className="text-sm leading-[1.8] text-mamire-ink/75">
                <span className="mr-2 font-montserrat text-[11px] tracking-wide text-mamire-ink/45">
                  {DAYS[p.day].date}
                </span>
                {p.title}
                {p.desc && (
                  <details className="group mt-1">
                    <summary className="cursor-pointer list-none text-[11px] tracking-[0.15em] text-mamire-silt underline decoration-mamire-silt/40 underline-offset-4 [&::-webkit-details-marker]:hidden">
                      <span className="group-open:hidden">企画内容を読む</span>
                      <span className="hidden group-open:inline">閉じる</span>
                    </summary>
                    <div className="mt-2 space-y-2 text-sm leading-[2] text-mamire-ink/80">
                      {p.desc.map((t) => (
                        <p key={t}>{t}</p>
                      ))}
                    </div>
                  </details>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
