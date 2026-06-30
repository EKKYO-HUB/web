"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type NavItem = { id: string; label: string };

export default function SummitSectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    // 固定ヘッダー(88px) + このコンテンツナビ(約57px)の合計。
    // scroll-margin と揃えて、ナビ直下に入ったセクションをアクティブにする。
    const STACK = 150;

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
        if (el.getBoundingClientRect().top - STACK <= 1) current = el.id;
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
  }, [items]);

  return (
    <nav className="sticky top-[88px] z-40 border-b border-black/5 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl overflow-x-auto px-6 sm:px-12">
        <ul className="flex min-w-max gap-6 sm:gap-10">
          {items.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={cn(
                  "block border-b-2 py-4 text-[11px] font-medium tracking-[0.15em] transition-colors",
                  active === s.id
                    ? "border-ekkyo-accent text-ekkyo-accent"
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
