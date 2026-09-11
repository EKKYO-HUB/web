import type { FaqItem } from "@/content/summit2026";

/* よくある質問。<details> による素朴なアコーディオン（JS不要）。 */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-mamire-silt/30 border-y border-mamire-silt/40">
      {items.map((it) => (
        <details key={it.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden">
            <span className="font-montserrat text-lg font-semibold leading-7 text-mamire-mud">
              Q
            </span>
            <span className="flex-1 font-mincho text-base font-bold leading-7 text-mamire-ink sm:text-lg">
              {it.q}
            </span>
            <span
              aria-hidden
              className="mt-1 text-lg leading-none text-mamire-silt transition-transform duration-300 group-open:rotate-45"
            >
              ＋
            </span>
          </summary>
          <div className="mt-4 space-y-2 pl-9 text-sm leading-[2] text-mamire-ink/80 sm:pr-8">
            {it.a.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
