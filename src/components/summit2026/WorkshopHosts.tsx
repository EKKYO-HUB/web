import AiPhoto from "./AiPhoto";
import type { WorkshopHost } from "@/content/summit2026";

/* ワークショップ担当者。写真は藍色＋粒子、ホバーで原色に戻る（AiPhoto）。 */
export default function WorkshopHosts({ hosts }: { hosts: WorkshopHost[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:gap-x-10 lg:gap-y-14">
      {hosts.map((h) => (
        <li key={h.id}>
          <AiPhoto
            src={h.image}
            alt={h.name}
            className="aspect-square w-full"
            sizes="(min-width: 768px) 30vw, 50vw"
          />
          <p className="mt-4 font-mincho text-lg font-bold tracking-wide text-mamire-ink">
            {h.name}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-mamire-ink/55">
            {h.role}
          </p>
          <p className="mt-2 text-sm leading-[1.8] text-mamire-mud">
            {h.workshop}
          </p>
        </li>
      ))}
    </ul>
  );
}
