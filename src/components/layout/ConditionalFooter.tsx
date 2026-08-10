"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/* SUMMIT 2026 は没入型マイクロサイト（専用ミニフッターを持つ）のため
   共通フッターを出さない。それ以外のページではそのまま表示する。 */
export default function ConditionalFooter({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/summit/2026")) return null;
  return <>{children}</>;
}
