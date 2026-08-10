"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type NavItem = { id: string; label: string };

type Props = {
  items: NavItem[];
  /* mamire: SUMMIT 2026「水と汚れ」トーン（専用ヘッダー h-14 直下に付く） */
  tone?: "default" | "mamire";
  /* 固定ヘッダー+このナビの合計高。セクション判定と scroll-margin を揃える */
  offset?: number;
};

export default function SummitSectionNav({
  items,
  tone = "default",
  offset = 150,
}: Props) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const update = () => {
      // ページ最下部では最後のセクションをアクティブに（末尾の短いセクション対策）
      const atBottom =
        window.innerHeight + Math.ceil(window.scrollY) >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(els[els.length - 1].id);
        return;
      }
      // ナビ直下を最後に通過したセクションが現在地
      let current = "";
      for (const el of els) {
        if (el.getBoundingClientRect().top - offset <= 1) current = el.id;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items, offset]);

  const mamire = tone === "mamire";

  return (
    <nav
      className={cn(
        "sticky z-40 border-b backdrop-blur-md",
        mamire
          ? "top-14 border-mamire-silt/20 bg-mamire-water-pale/90"
          : "top-[88px] border-black/5 bg-white/95"
      )}
    >
      <div className="mx-auto max-w-7xl overflow-x-auto px-6 sm:px-12">
        <ul className="flex min-w-max gap-6 sm:gap-10">
          {items.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={cn(
                  "block border-b-2 py-4 text-[11px] font-medium tracking-[0.15em] transition-colors",
                  active === s.id
                    ? mamire
                      ? "border-mamire-mud text-mamire-mud"
                      : "border-ekkyo-accent text-ekkyo-accent"
                    : mamire
                      ? "border-transparent text-mamire-ink/50 hover:text-mamire-mud"
                      : "border-transparent text-ekkyo-black/50 hover:text-ekkyo-accent"
                )}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
