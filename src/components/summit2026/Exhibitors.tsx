import AiPhoto from "./AiPhoto";
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
   写真は EXHIBITOR_IMAGES にあれば藍色＋波紋の演出（AiPhoto）で表示する。 */

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

export default function Exhibitors() {
  const list = collect();
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:gap-y-12">
      {list.map((ex) => (
        <li key={ex.name}>
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
          <p className="font-mincho text-base font-bold tracking-wide text-mamire-ink sm:text-lg">
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
        </li>
      ))}
    </ul>
  );
}
